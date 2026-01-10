import { GoogleGenerativeAI } from '@google/generative-ai';

// Lazy initialization pour éviter les erreurs au build time
let genAIInstance: GoogleGenerativeAI | null = null;

function getGenAI(): GoogleGenerativeAI {
  if (!genAIInstance) {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      throw new Error('GOOGLE_GENERATIVE_AI_API_KEY non configurée');
    }
    genAIInstance = new GoogleGenerativeAI(apiKey);
  }
  return genAIInstance;
}

// Types pour le feedback structuré
export interface TypebotPayload {
  prenom: string;
  nom: string;
  email: string;
  metier: string;
  manager_nom: string;
  manager_email: string;
  mode_anonyme: boolean;
  rdv_souhaite?: boolean;
  // Thématiques
  t1_relation_ressenti?: string;
  t1_relation_detail?: string;
  t2_charge_ressenti?: string;
  t2_charge_detail?: string;
  t3_objectifs_ressenti?: string;
  t3_objectifs_detail?: string;
  t4_motivation_ressenti?: string;
  t4_motivation_detail?: string;
  t5_developpement_ressenti?: string;
  t5_developpement_detail?: string;
  t6_equipe_ressenti?: string;
  t6_equipe_detail?: string;
  // Contexte
  priorite_principale?: string;
  attente_manager?: string;
  projet_focus?: string;
  positif?: string;
  // Conversation brute (si disponible)
  conversation?: string;
}

export interface ThematiqueAnalysis {
  thematique: string;
  statut: 'positif' | 'neutre' | 'attention' | 'critique';
  ressenti: string;
  synthese: string;
  signaux_faibles: string;
  impact_potentiel: string;
}

export interface ActionPlan {
  id: number;
  action: string;
  thematique: string;
  priorite: 'urgent' | 'important' | 'moyen_terme';
  echeance_recommandee: string;
  qui: string;
  comment: string;
  ressources_necessaires: string;
  indicateurs_succes: string;
  risque_si_non_traite: string;
}

export interface RexAnalysis {
  synthese_collaborateur: {
    titre: string;
    message_remerciement: string;
    ce_que_nous_avons_compris: string;
    prochaines_etapes: string;
    message_cloture: string;
  };
  analyse_manager: {
    resume_executif: string;
    analyse_par_thematique: ThematiqueAnalysis[];
    points_prioritaires: Array<{
      priorite: 'urgente' | 'haute' | 'moyenne';
      thematique: string;
      point: string;
      pourquoi_prioritaire: string;
    }>;
    plan_action: ActionPlan[];
    kit_manager: {
      emails_prerediges: Array<{
        type: string;
        objet: string;
        corps: string;
      }>;
      guide_reunion: {
        preparation: {
          checklist: string[];
          points_a_preparer: string[];
          documents: string[];
        };
        deroule: Array<{
          etape: string;
          duree: string;
          objectif: string;
          script: string;
        }>;
        questions_par_thematique: Record<string, string[]>;
        posture: {
          a_faire: string[];
          a_eviter: string[];
        };
        post_reunion: {
          checklist: string[];
        };
      };
      messages_slack: Array<{
        type: string;
        contenu: string;
      }>;
      invitations_calendrier: Array<{
        type: string;
        titre: string;
        duree: string;
        description: string;
        ordre_du_jour?: string[];
        frequence?: string;
      }>;
    };
  };
}

function buildPromptContext(data: TypebotPayload): string {
  return `
COLLABORATEUR : ${data.prenom} ${data.nom}
MÉTIER : ${data.metier}
MANAGER : ${data.manager_nom}
MODE ANONYME : ${data.mode_anonyme ? 'OUI' : 'NON'}
RDV SOUHAITÉ : ${data.rdv_souhaite ? 'OUI' : 'NON'}

PRIORITÉ PRINCIPALE : ${data.priorite_principale || 'Non spécifiée'}
ATTENTE VIS-À-VIS DU MANAGER : ${data.attente_manager || 'Non spécifiée'}
PROJET EN FOCUS : ${data.projet_focus || 'Non spécifié'}
POINTS POSITIFS : ${data.positif || 'Aucun point positif mentionné'}

--- FEEDBACK PAR THÉMATIQUE ---

1. RELATION MANAGER
Ressenti : ${data.t1_relation_ressenti || 'Non renseigné'}
Détail : ${data.t1_relation_detail || 'Aucun commentaire'}

2. CHARGE DE TRAVAIL
Ressenti : ${data.t2_charge_ressenti || 'Non renseigné'}
Détail : ${data.t2_charge_detail || 'Aucun commentaire'}

3. OBJECTIFS
Ressenti : ${data.t3_objectifs_ressenti || 'Non renseigné'}
Détail : ${data.t3_objectifs_detail || 'Aucun commentaire'}

4. MOTIVATION
Ressenti : ${data.t4_motivation_ressenti || 'Non renseigné'}
Détail : ${data.t4_motivation_detail || 'Aucun commentaire'}

5. DÉVELOPPEMENT
Ressenti : ${data.t5_developpement_ressenti || 'Non renseigné'}
Détail : ${data.t5_developpement_detail || 'Aucun commentaire'}

6. ÉQUIPE
Ressenti : ${data.t6_equipe_ressenti || 'Non renseigné'}
Détail : ${data.t6_equipe_detail || 'Aucun commentaire'}

${data.conversation ? `\n--- CONVERSATION COMPLÈTE ---\n${data.conversation}` : ''}
`;
}

const SYSTEM_PROMPT = `Tu es un expert RH et coach professionnel spécialisé dans l'analyse de feedback collaborateur.

Ta mission : analyser le retour d'expérience d'un collaborateur et générer un package complet de livrables.

Tu dois retourner UN SEUL objet JSON avec la structure EXACTE suivante :

{
  "synthese_collaborateur": {
    "titre": "Merci pour votre retour, [PRENOM]",
    "message_remerciement": "[Message chaleureux et personnalisé]",
    "ce_que_nous_avons_compris": "[Reformulation empathique en 3-5 points de ce que le collaborateur a exprimé]",
    "prochaines_etapes": "[Explication des prochaines étapes, notamment échange avec le manager]",
    "message_cloture": "[Message de clôture bienveillant]"
  },

  "analyse_manager": {
    "resume_executif": "[Résumé en 2-3 paragraphes des points clés du feedback]",

    "analyse_par_thematique": [
      {
        "thematique": "Relation Manager",
        "statut": "positif|neutre|attention|critique",
        "ressenti": "[ressenti exprimé]",
        "synthese": "[Analyse détaillée de cette thématique]",
        "signaux_faibles": "[Signaux faibles détectés]",
        "impact_potentiel": "[Impact si non traité]"
      }
    ],

    "points_prioritaires": [
      {
        "priorite": "urgente|haute|moyenne",
        "thematique": "[thématique concernée]",
        "point": "[description du point]",
        "pourquoi_prioritaire": "[justification]"
      }
    ],

    "plan_action": [
      {
        "id": 1,
        "action": "[Description précise de l'action]",
        "thematique": "[thématique concernée]",
        "priorite": "urgent|important|moyen_terme",
        "echeance_recommandee": "[ex: Immédiat, 1 semaine, 1 mois]",
        "qui": "[parties prenantes]",
        "comment": "[étapes concrètes pour mettre en oeuvre]",
        "ressources_necessaires": "[ressources humaines, budget, outils, etc.]",
        "indicateurs_succes": "[comment mesurer le succès]",
        "risque_si_non_traite": "[conséquences potentielles]"
      }
    ],

    "kit_manager": {
      "emails_prerediges": [
        {
          "type": "remerciement_collaborateur",
          "objet": "[objet de l'email]",
          "corps": "[corps complet de l'email, personnalisé]"
        },
        {
          "type": "planification_reunion",
          "objet": "[objet]",
          "corps": "[corps personnalisé]"
        },
        {
          "type": "suivi_1_semaine",
          "objet": "[objet]",
          "corps": "[corps personnalisé]"
        }
      ],

      "guide_reunion": {
        "preparation": {
          "checklist": ["[point 1]", "[point 2]"],
          "points_a_preparer": ["[point 1]", "[point 2]"],
          "documents": ["[doc 1]", "[doc 2]"]
        },
        "deroule": [
          {
            "etape": "Introduction",
            "duree": "5 min",
            "objectif": "[objectif de cette étape]",
            "script": "[script suggéré]"
          }
        ],
        "questions_par_thematique": {
          "relation_manager": ["[question 1]", "[question 2]"],
          "charge_travail": ["[question 1]", "[question 2]"],
          "objectifs": ["[question 1]", "[question 2]"],
          "motivation": ["[question 1]", "[question 2]"],
          "developpement": ["[question 1]", "[question 2]"],
          "equipe": ["[question 1]", "[question 2]"]
        },
        "posture": {
          "a_faire": ["[conseil 1]", "[conseil 2]"],
          "a_eviter": ["[piège 1]", "[piège 2]"]
        },
        "post_reunion": {
          "checklist": ["[action 1]", "[action 2]"]
        }
      },

      "messages_slack": [
        {
          "type": "accuse_reception",
          "contenu": "[message Slack prêt à copier-coller]"
        },
        {
          "type": "planification",
          "contenu": "[message]"
        }
      ],

      "invitations_calendrier": [
        {
          "type": "reunion_debriefing_rex",
          "titre": "[titre de l'événement]",
          "duree": "60 min",
          "description": "[description complète pour l'invitation]",
          "ordre_du_jour": ["[point 1]", "[point 2]"]
        }
      ]
    }
  }
}

RÈGLES STRICTES :

1. PERSONNALISATION obligatoire :
   - Utilise le prénom du collaborateur
   - Adapte le ton au contexte
   - Référence les éléments spécifiques du feedback

2. ACTIONNABLE :
   - Chaque action doit être concrète et réalisable
   - Évite le jargon
   - Privilégie les verbes d'action

3. BIENVEILLANCE :
   - Ton positif et orienté solutions
   - Pas de jugement
   - Focus sur l'amélioration continue

4. FORMAT JSON strict :
   - Retourne UNIQUEMENT le JSON
   - Pas de texte avant ou après
   - Respecte exactement la structure donnée

5. ANALYSE COMPLÈTE :
   - Génère les 6 thématiques dans analyse_par_thematique
   - Au moins 3 points prioritaires
   - Au moins 5 actions dans le plan_action
   - Kit manager complet avec emails, guide réunion, messages Slack
`;

export async function analyzeRexFeedback(payload: TypebotPayload): Promise<RexAnalysis> {
  const model = getGenAI().getGenerativeModel({
    model: 'gemini-1.5-pro',
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 16000,
      responseMimeType: 'application/json',
    },
  });

  const promptContext = buildPromptContext(payload);

  const prompt = `${SYSTEM_PROMPT}

---

Analyse ce retour d'expérience et génère le JSON complet avec synthèse collaborateur, analyse manager, plan d'action et kit manager COMPLET.

${promptContext}`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Parse le JSON (Gemini devrait retourner du JSON pur grâce à responseMimeType)
    let cleanedText = text;

    // Nettoyer si markdown code blocks présents
    if (text.includes('```json')) {
      cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    } else if (text.includes('```')) {
      cleanedText = text.replace(/```\n?/g, '').trim();
    }

    const parsed = JSON.parse(cleanedText) as RexAnalysis;

    // Validation basique
    if (!parsed.synthese_collaborateur || !parsed.analyse_manager) {
      throw new Error('Structure JSON invalide : champs obligatoires manquants');
    }

    return parsed;
  } catch (error) {
    console.error('Erreur analyse Gemini:', error);
    throw new Error(`Impossible d'analyser le feedback: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
  }
}
