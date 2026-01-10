import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { analyzeRexFeedback, TypebotPayload } from '@/lib/gemini';
import { generateAllPdfs } from '@/lib/pdf';
import { createClient } from '@supabase/supabase-js';

// Supabase client pour le storage
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Mapper les données brutes Typebot vers notre structure
function mapTypebotPayload(body: Record<string, unknown>): TypebotPayload {
  return {
    // Identification
    prenom: (body.prenom || body['Group #7'] || '') as string,
    nom: (body.nom || body['Group #7 (1)'] || '') as string,
    email: (body.email || body['Group #7 (2)'] || '') as string,
    metier: (body.metier || body['Group #7 (3)'] || '') as string,
    manager_nom: (body.manager_nom || body['Group #7 (4)'] || '') as string,
    manager_email: (body.manager_email || body['Group #7 (5)'] || '') as string,
    mode_anonyme: body.mode_anonyme === true || body.mode_anonyme === 'true',
    rdv_souhaite: body.rdv_souhaite === true || body.rdv_souhaite === 'true',

    // Thématique 1 - Relation Manager
    t1_relation_ressenti: (body.t1_relation_ressenti || body['Group #14'] || '') as string,
    t1_relation_detail: (body.t1_relation_detail || body['Group #14 (7)'] || '') as string,

    // Thématique 2 - Charge de travail
    t2_charge_ressenti: (body.t2_charge_ressenti || body['Group #9'] || '') as string,
    t2_charge_detail: (body.t2_charge_detail || body['Group #9 (6)'] || '') as string,

    // Thématique 3 - Objectifs
    t3_objectifs_ressenti: (body.t3_objectifs_ressenti || body['Group #11'] || '') as string,
    t3_objectifs_detail: (body.t3_objectifs_detail || body['Group #11 (5)'] || '') as string,

    // Thématique 4 - Motivation
    t4_motivation_ressenti: (body.t4_motivation_ressenti || body['Group #12'] || '') as string,
    t4_motivation_detail: (body.t4_motivation_detail || body['Group #12 (5)'] || '') as string,

    // Thématique 5 - Développement
    t5_developpement_ressenti: (body.t5_developpement_ressenti || '') as string,
    t5_developpement_detail: (body.t5_developpement_detail || '') as string,

    // Thématique 6 - Équipe
    t6_equipe_ressenti: (body.t6_equipe_ressenti || '') as string,
    t6_equipe_detail: (body.t6_equipe_detail || body['THÉMATIQUE T6 - EXPRESSION LIBRE'] || '') as string,

    // Contexte
    priorite_principale: (body.priorite_principale || body['THÉMATIQUE T6 - EXPRESSION LIBRE (2)'] || '') as string,
    attente_manager: (body.attente_manager || '') as string,
    projet_focus: (body.projet_focus || '') as string,
    positif: (body.positif || body['THÉMATIQUE T6 - EXPRESSION LIBRE (1)'] || '') as string,

    // Conversation brute
    conversation: (body.conversation || '') as string,
  };
}

export async function POST(request: NextRequest) {
  try {
    // 1. Récupérer et valider le payload
    const body = await request.json();
    console.log('Webhook REX reçu:', JSON.stringify(body, null, 2));

    // Extraire le body réel (peut être imbriqué selon la source)
    const rawData = body.body || body;
    const payload = mapTypebotPayload(rawData);

    // Validation des champs obligatoires
    if (!payload.prenom || !payload.email || !payload.manager_email) {
      return NextResponse.json(
        { error: 'Champs obligatoires manquants: prenom, email, manager_email' },
        { status: 400 }
      );
    }

    console.log('Payload mappé:', payload);

    // 2. Trouver ou créer le manager (Profile)
    let manager = await prisma.profile.findFirst({
      where: { email: payload.manager_email },
    });

    if (!manager) {
      // Créer une organisation par défaut si nécessaire
      let org = await prisma.organization.findFirst({
        where: { domain: payload.manager_email.split('@')[1] },
      });

      if (!org) {
        org = await prisma.organization.create({
          data: {
            name: `Organisation ${payload.manager_email.split('@')[1]}`,
            domain: payload.manager_email.split('@')[1],
            plan: 'free',
          },
        });
      }

      // Créer le profil manager avec un ID généré
      manager = await prisma.profile.create({
        data: {
          id: `manager_${Date.now()}`,
          email: payload.manager_email,
          fullName: payload.manager_nom,
          role: 'MANAGER',
          organizationId: org.id,
        },
      });
    }

    // 3. Créer l'entrée REX brute
    const rexEntry = await prisma.rexEntry.create({
      data: {
        sessionId: `typebot_${Date.now()}`,
        content: rawData as object,
        isAnonymous: payload.mode_anonyme,
      },
    });

    console.log('RexEntry créée:', rexEntry.id);

    // 4. Analyser avec Gemini
    console.log('Analyse Gemini en cours...');
    const analysis = await analyzeRexFeedback(payload);
    console.log('Analyse terminée. Actions générées:', analysis.analyse_manager.plan_action.length);

    // 5. Générer les PDFs
    console.log('Génération des PDFs...');
    const pdfs = await generateAllPdfs(analysis, payload);
    console.log('PDFs générés');

    // 6. Upload des PDFs vers Supabase Storage
    const timestamp = Date.now();
    const collaborateurPath = `rex/${timestamp}/collaborateur_${payload.prenom}_${payload.nom}.pdf`;
    const managerPath = `rex/${timestamp}/manager_${payload.prenom}_${payload.nom}.pdf`;

    const [collabUpload, managerUpload] = await Promise.all([
      supabase.storage.from('documents').upload(collaborateurPath, pdfs.collaborateur.buffer!, {
        contentType: 'application/pdf',
      }),
      supabase.storage.from('documents').upload(managerPath, pdfs.manager.buffer!, {
        contentType: 'application/pdf',
      }),
    ]);

    if (collabUpload.error) {
      console.error('Erreur upload PDF collaborateur:', collabUpload.error);
    }
    if (managerUpload.error) {
      console.error('Erreur upload PDF manager:', managerUpload.error);
    }

    // Récupérer les URLs publiques
    const { data: collabUrl } = supabase.storage.from('documents').getPublicUrl(collaborateurPath);
    const { data: managerUrl } = supabase.storage.from('documents').getPublicUrl(managerPath);

    // 7. Créer le rapport REX
    const rexReport = await prisma.rexReport.create({
      data: {
        managerId: manager.id,
        organizationId: manager.organizationId!,
        summary: analysis.analyse_manager.resume_executif,
        themes: analysis.analyse_manager.analyse_par_thematique as object,
        recommendations: analysis.analyse_manager.points_prioritaires as object,
        managerKit: analysis.analyse_manager.kit_manager as object,
        climateScore: calculateClimateScore(analysis),
        status: 'GENERATED',
        pdfUrl: managerUrl?.publicUrl,
        entries: {
          connect: { id: rexEntry.id },
        },
      },
    });

    console.log('RexReport créé:', rexReport.id);

    // 8. TODO: Envoyer les emails (optionnel pour MVP)
    // await sendCollaborateurEmail(payload.email, analysis, collabUrl?.publicUrl);
    // await sendManagerEmail(payload.manager_email, analysis, managerUrl?.publicUrl);

    return NextResponse.json({
      success: true,
      message: 'REX traité avec succès',
      data: {
        reportId: rexReport.id,
        entryId: rexEntry.id,
        actionsCount: analysis.analyse_manager.plan_action.length,
        pdfs: {
          collaborateur: collabUrl?.publicUrl,
          manager: managerUrl?.publicUrl,
        },
      },
    });

  } catch (error) {
    console.error('Erreur webhook REX:', error);
    return NextResponse.json(
      {
        error: 'Erreur lors du traitement du REX',
        details: error instanceof Error ? error.message : 'Erreur inconnue',
      },
      { status: 500 }
    );
  }
}

// Calculer un score de climat basé sur les statuts des thématiques
function calculateClimateScore(analysis: { analyse_manager: { analyse_par_thematique: Array<{ statut: string }> } }): number {
  const statutScores: Record<string, number> = {
    'positif': 10,
    'neutre': 7,
    'attention': 4,
    'critique': 2,
  };

  const thematiques = analysis.analyse_manager.analyse_par_thematique;
  if (thematiques.length === 0) return 5;

  const total = thematiques.reduce((sum, t) => sum + (statutScores[t.statut] || 5), 0);
  return Math.round((total / thematiques.length) * 10) / 10;
}

// Health check GET
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Webhook REX actif',
    timestamp: new Date().toISOString(),
  });
}
