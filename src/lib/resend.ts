import { Resend } from 'resend'

// Initialisation lazy pour éviter les erreurs au build time
let resendInstance: Resend | null = null

function getResend(): Resend {
  if (!resendInstance) {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey || apiKey === 're_123456789') {
      throw new Error('RESEND_API_KEY non configurée ou invalide')
    }
    resendInstance = new Resend(apiKey)
  }
  return resendInstance
}

interface ManagerEmailParams {
  to: string
  managerName: string
  reportId: string
  summary: string
  pdfUrl: string
}

export async function sendManagerReportEmail(params: ManagerEmailParams) {
  const { to, managerName, reportId, summary } = params

  const appUrl = process.env.NEXT_PUBLIC_APP_URL

  await getResend().emails.send({
    from: 'Claovia <notifications@claovia.com>',
    to,
    subject: '🎯 Nouveau REX disponible',
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1F3027;">Bonjour ${managerName},</h1>
        <p>Un nouveau retour d'expérience vient d'être analysé pour votre équipe.</p>
        
        <div style="background: #F4F7F5; padding: 20px; border-radius: 12px; margin: 20px 0;">
          <h3 style="color: #6B9078; margin-top: 0;">Synthèse rapide</h3>
          <p style="color: #4B5563;">${summary}</p>
        </div>
        
        <div style="margin: 30px 0;">
          <a href="${appUrl}/rex/${reportId}" 
             style="background: #6B9078; color: white; padding: 14px 28px; 
                    border-radius: 8px; text-decoration: none; display: inline-block;">
            Voir le rapport complet
          </a>
        </div>
        
        <p style="color: #9CA3AF; font-size: 14px;">
          Le rapport PDF est également disponible en téléchargement dans votre dashboard.
        </p>
        
        <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">
        
        <p style="color: #9CA3AF; font-size: 12px;">
          Claovia - L'assistant IA du manager de proximité
        </p>
      </div>
    `,
  })
}

interface CollaboratorEmailParams {
  to: string
  collaboratorName: string
  summary: string
}

export async function sendCollaboratorConfirmationEmail(params: CollaboratorEmailParams) {
  const { to, collaboratorName, summary } = params

  await getResend().emails.send({
    from: 'Claovia <notifications@claovia.com>',
    to,
    subject: '✅ Votre retour a bien été pris en compte',
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1F3027;">Merci ${collaboratorName} !</h1>
        <p>Votre retour d'expérience a été transmis à votre manager.</p>
        
        <div style="background: #F4F7F5; padding: 20px; border-radius: 12px; margin: 20px 0;">
          <h3 style="color: #6B9078; margin-top: 0;">Ce que nous avons compris</h3>
          <p style="color: #4B5563;">${summary}</p>
        </div>
        
        <p>Votre manager reviendra vers vous prochainement pour en discuter.</p>
        
        <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">
        
        <p style="color: #9CA3AF; font-size: 12px;">
          Claovia - Votre parole compte
        </p>
      </div>
    `,
  })
}
