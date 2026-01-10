import { RexAnalysis, TypebotPayload } from './gemini';

const HTML2PDF_API_KEY = process.env.HTML2PDF_API_KEY;

interface PdfResult {
  collaborateur: {
    html: string;
    filename: string;
    buffer?: Buffer;
  };
  manager: {
    html: string;
    filename: string;
    buffer?: Buffer;
  };
}

function getStatutBadge(statut: string): string {
  const badges: Record<string, { color: string; text: string }> = {
    'positif': { color: '#10b981', text: 'POSITIF' },
    'neutre': { color: '#6366f1', text: 'NEUTRE' },
    'attention': { color: '#f59e0b', text: 'ATTENTION' },
    'critique': { color: '#ef4444', text: 'CRITIQUE' }
  };
  const badge = badges[statut] || badges['neutre'];
  return `<span style="background: ${badge.color}; color: white; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: 600;">${badge.text}</span>`;
}

export function generateCollaborateurHtml(
  analysis: RexAnalysis,
  payload: TypebotPayload
): string {
  const synthese = analysis.synthese_collaborateur;
  const dateStr = new Date().toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Synthèse REX - ${payload.prenom}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      color: #1a1a1a;
      background: #ffffff;
      padding: 60px 80px;
    }
    .header {
      border-bottom: 4px solid #6B9078;
      padding-bottom: 30px;
      margin-bottom: 50px;
    }
    .header h1 {
      font-size: 36px;
      font-weight: 700;
      color: #6B9078;
      margin-bottom: 10px;
    }
    .header .subtitle {
      font-size: 18px;
      color: #64748b;
    }
    .section {
      margin-bottom: 40px;
    }
    .section-title {
      font-size: 24px;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #e2e8f0;
    }
    .content-box {
      background: #F4F7F5;
      border-left: 4px solid #6B9078;
      padding: 25px;
      margin-bottom: 20px;
      border-radius: 8px;
    }
    .content-box p {
      font-size: 16px;
      line-height: 1.8;
      color: #334155;
      margin-bottom: 15px;
    }
    .content-box p:last-child { margin-bottom: 0; }
    .footer {
      margin-top: 60px;
      padding-top: 30px;
      border-top: 2px solid #e2e8f0;
      text-align: center;
      color: #64748b;
      font-size: 14px;
    }
    .highlight {
      background: #fef3c7;
      padding: 20px;
      border-radius: 8px;
      border-left: 4px solid #f59e0b;
      margin: 30px 0;
    }
    .highlight p {
      color: #92400e;
      font-size: 16px;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${synthese.titre}</h1>
    <p class="subtitle">Votre retour d'expérience du ${dateStr}</p>
  </div>

  <div class="section">
    <div class="content-box">
      <p>${synthese.message_remerciement}</p>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">Ce que nous avons compris</h2>
    <div class="content-box">
      <p>${synthese.ce_que_nous_avons_compris.replace(/\n/g, '</p><p>')}</p>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">Prochaines étapes</h2>
    <div class="content-box">
      <p>${synthese.prochaines_etapes}</p>
    </div>
  </div>

  ${payload.rdv_souhaite ? `
  <div class="highlight">
    <p>✓ Vous avez demandé un rendez-vous : votre manager va vous contacter prochainement pour échanger sur ces points.</p>
  </div>
  ` : ''}

  <div class="section">
    <div class="content-box">
      <p>${synthese.message_cloture}</p>
    </div>
  </div>

  <div class="footer">
    <p><strong>Claovia REX</strong> - Système de feedback collaborateur</p>
    <p>Ce document est confidentiel et destiné uniquement à ${payload.prenom} ${payload.nom}</p>
  </div>
</body>
</html>`;
}

export function generateManagerHtml(
  analysis: RexAnalysis,
  payload: TypebotPayload
): string {
  const analyse = analysis.analyse_manager;
  const dateStr = new Date().toLocaleDateString('fr-FR');

  // Génération HTML des thématiques
  const thematiquesHTML = analyse.analyse_par_thematique.map(t => `
    <div class="thematique-card">
      <div class="thematique-header">
        <h3>${t.thematique}</h3>
        ${getStatutBadge(t.statut)}
      </div>
      <div class="thematique-body">
        <p><strong>Ressenti exprimé :</strong> ${t.ressenti}</p>
        <p><strong>Synthèse :</strong> ${t.synthese}</p>
        ${t.signaux_faibles ? `<p><strong>⚠ Signaux faibles :</strong> ${t.signaux_faibles}</p>` : ''}
        ${t.impact_potentiel ? `<p><strong>Impact potentiel :</strong> ${t.impact_potentiel}</p>` : ''}
      </div>
    </div>
  `).join('');

  // Génération HTML des points prioritaires
  const prioritairesHTML = analyse.points_prioritaires.map((p, i) => `
    <div class="priorite-item priorite-${p.priorite}">
      <div class="priorite-numero">${i + 1}</div>
      <div class="priorite-content">
        <div class="priorite-badge">${p.priorite.toUpperCase()}</div>
        <h4>${p.point}</h4>
        <p><strong>Thématique :</strong> ${p.thematique}</p>
        <p><strong>Pourquoi prioritaire :</strong> ${p.pourquoi_prioritaire}</p>
      </div>
    </div>
  `).join('');

  // Génération HTML du plan d'action
  const planActionHTML = analyse.plan_action.map(action => `
    <div class="action-card priorite-${action.priorite}">
      <div class="action-header">
        <div class="action-id">Action #${action.id}</div>
        <div class="action-priorite-badge">${action.priorite.toUpperCase()}</div>
      </div>
      <h4 class="action-titre">${action.action}</h4>
      <div class="action-details">
        <div class="action-detail"><strong>Thématique :</strong> ${action.thematique}</div>
        <div class="action-detail"><strong>Échéance :</strong> ${action.echeance_recommandee}</div>
        <div class="action-detail"><strong>Qui :</strong> ${action.qui}</div>
        <div class="action-detail"><strong>Comment :</strong> ${action.comment}</div>
        <div class="action-detail"><strong>Ressources nécessaires :</strong> ${action.ressources_necessaires}</div>
        <div class="action-detail"><strong>Indicateurs de succès :</strong> ${action.indicateurs_succes}</div>
        <div class="action-detail warning"><strong>⚠ Risque si non traité :</strong> ${action.risque_si_non_traite}</div>
      </div>
    </div>
  `).join('');

  // Génération HTML des emails
  const emailsHTML = analyse.kit_manager.emails_prerediges.map(email => `
    <div class="kit-item">
      <h4>${email.type.replace(/_/g, ' ').toUpperCase()}</h4>
      <p><strong>Objet :</strong> ${email.objet}</p>
      <div class="email-body">${email.corps.replace(/\n/g, '<br>')}</div>
    </div>
  `).join('');

  // Génération HTML des messages Slack
  const slackHTML = analyse.kit_manager.messages_slack.map(msg => `
    <div class="kit-item">
      <h4>Slack - ${msg.type.replace(/_/g, ' ')}</h4>
      <div class="slack-message">${msg.contenu}</div>
    </div>
  `).join('');

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>REX Manager - ${payload.prenom} ${payload.nom}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', -apple-system, sans-serif; line-height: 1.6; color: #1a1a1a; padding: 40px 60px; font-size: 14px; }
    .cover { text-align: center; padding: 100px 0; border-bottom: 6px solid #6B9078; margin-bottom: 60px; }
    .cover h1 { font-size: 48px; font-weight: 700; color: #6B9078; margin-bottom: 20px; }
    .cover .subtitle { font-size: 24px; color: #64748b; margin-bottom: 10px; }
    .cover .meta { font-size: 16px; color: #94a3b8; margin-top: 40px; }
    .section { margin-bottom: 50px; page-break-inside: avoid; }
    .section-title { font-size: 28px; font-weight: 700; color: #1e293b; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 3px solid #e2e8f0; }
    .subsection-title { font-size: 20px; font-weight: 600; color: #334155; margin: 30px 0 15px 0; }
    .resume-executif { background: #F4F7F5; padding: 30px; border-radius: 10px; border-left: 6px solid #6B9078; margin-bottom: 40px; }
    .resume-executif p { font-size: 16px; line-height: 1.8; color: #1e293b; margin-bottom: 15px; }
    .thematique-card { background: #ffffff; border: 2px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
    .thematique-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #e2e8f0; }
    .thematique-header h3 { font-size: 18px; font-weight: 600; color: #1e293b; }
    .thematique-body p { margin-bottom: 10px; font-size: 14px; }
    .priorite-item { display: flex; gap: 20px; padding: 20px; border-radius: 8px; margin-bottom: 15px; }
    .priorite-item.priorite-urgente { background: #fef2f2; border-left: 6px solid #ef4444; }
    .priorite-item.priorite-haute { background: #fef3c7; border-left: 6px solid #f59e0b; }
    .priorite-item.priorite-moyenne { background: #eff6ff; border-left: 6px solid #3b82f6; }
    .priorite-numero { flex-shrink: 0; width: 40px; height: 40px; background: #6B9078; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 18px; }
    .priorite-content { flex: 1; }
    .priorite-content h4 { font-size: 16px; margin-bottom: 10px; }
    .priorite-badge { display: inline-block; padding: 4px 12px; border-radius: 4px; font-size: 11px; font-weight: 700; margin-bottom: 10px; }
    .priorite-urgente .priorite-badge { background: #ef4444; color: white; }
    .priorite-haute .priorite-badge { background: #f59e0b; color: white; }
    .priorite-moyenne .priorite-badge { background: #3b82f6; color: white; }
    .action-card { background: #ffffff; border: 2px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
    .action-card.priorite-urgent { border-left: 6px solid #ef4444; }
    .action-card.priorite-important { border-left: 6px solid #f59e0b; }
    .action-card.priorite-moyen_terme { border-left: 6px solid #3b82f6; }
    .action-header { display: flex; justify-content: space-between; margin-bottom: 15px; }
    .action-id { font-size: 12px; font-weight: 600; color: #64748b; }
    .action-priorite-badge { padding: 4px 12px; border-radius: 4px; font-size: 11px; font-weight: 700; background: #6B9078; color: white; }
    .action-titre { font-size: 16px; font-weight: 600; margin-bottom: 15px; }
    .action-details { display: grid; gap: 12px; }
    .action-detail { font-size: 13px; padding: 10px; background: #f8fafc; border-radius: 4px; }
    .action-detail.warning { background: #fef2f2; border-left: 3px solid #ef4444; }
    .kit-section { background: #f8fafc; padding: 30px; border-radius: 10px; margin-bottom: 30px; }
    .kit-item { background: white; padding: 20px; border-radius: 6px; margin-bottom: 20px; border: 1px solid #e2e8f0; }
    .kit-item h4 { font-size: 16px; color: #6B9078; margin-bottom: 12px; }
    .email-body, .slack-message { background: #f1f5f9; padding: 15px; border-radius: 4px; font-family: monospace; font-size: 12px; margin-top: 10px; white-space: pre-wrap; }
    .footer { margin-top: 80px; padding-top: 30px; border-top: 2px solid #e2e8f0; text-align: center; color: #64748b; font-size: 12px; }
    .page-break { page-break-after: always; }
  </style>
</head>
<body>
  <div class="cover">
    <h1>REX Manager</h1>
    <p class="subtitle">Retour d'Expérience Collaborateur</p>
    <p class="meta">
      <strong>Collaborateur :</strong> ${payload.prenom} ${payload.nom}${payload.mode_anonyme ? ' (MODE ANONYME)' : ''}<br>
      <strong>Métier :</strong> ${payload.metier}<br>
      <strong>Manager :</strong> ${payload.manager_nom}<br>
      <strong>Date :</strong> ${dateStr}<br>
      ${payload.rdv_souhaite ? '<strong style="color: #ef4444;">⚠ RDV SOUHAITÉ</strong>' : ''}
    </p>
  </div>

  <div class="section">
    <h2 class="section-title">Résumé Exécutif</h2>
    <div class="resume-executif">
      <p>${analyse.resume_executif.replace(/\n/g, '</p><p>')}</p>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">Points Prioritaires</h2>
    ${prioritairesHTML}
  </div>

  <div class="page-break"></div>

  <div class="section">
    <h2 class="section-title">Analyse par Thématique</h2>
    ${thematiquesHTML}
  </div>

  <div class="page-break"></div>

  <div class="section">
    <h2 class="section-title">Plan d'Action (${analyse.plan_action.length} actions)</h2>
    ${planActionHTML}
  </div>

  <div class="page-break"></div>

  <div class="section">
    <h2 class="section-title">Kit Manager Complet</h2>
    <h3 class="subsection-title">📧 Emails pré-rédigés</h3>
    <div class="kit-section">${emailsHTML}</div>
    <h3 class="subsection-title">💬 Messages Slack</h3>
    <div class="kit-section">${slackHTML}</div>
  </div>

  <div class="footer">
    <p><strong>Claovia REX</strong> - Document confidentiel</p>
  </div>
</body>
</html>`;
}

export async function generatePdf(html: string): Promise<Buffer> {
  if (!HTML2PDF_API_KEY) {
    throw new Error('HTML2PDF_API_KEY non configurée');
  }

  const response = await fetch('https://api.html2pdf.app/v1/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': HTML2PDF_API_KEY,
    },
    body: JSON.stringify({
      html,
      format: 'A4',
      printBackground: true,
      landscape: false,
    }),
  });

  if (!response.ok) {
    throw new Error(`Erreur génération PDF: ${response.status} ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export async function generateAllPdfs(
  analysis: RexAnalysis,
  payload: TypebotPayload
): Promise<PdfResult> {
  const timestamp = Date.now();

  const collaborateurHtml = generateCollaborateurHtml(analysis, payload);
  const managerHtml = generateManagerHtml(analysis, payload);

  const [collaborateurBuffer, managerBuffer] = await Promise.all([
    generatePdf(collaborateurHtml),
    generatePdf(managerHtml),
  ]);

  return {
    collaborateur: {
      html: collaborateurHtml,
      filename: `REX_Synthese_${payload.prenom}_${payload.nom}_${timestamp}.pdf`,
      buffer: collaborateurBuffer,
    },
    manager: {
      html: managerHtml,
      filename: `REX_Manager_${payload.prenom}_${payload.nom}_${timestamp}.pdf`,
      buffer: managerBuffer,
    },
  };
}
