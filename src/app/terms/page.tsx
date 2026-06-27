import { LegalPageLayout } from '@/components/LegalPageLayout'
import { IP_OWNERSHIP_NOTICE } from '@/data/legal'

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms of Service" lastUpdated="27 June 2026">
      <p>
        By using Young AI Explorers, you agree to these Terms of Service. If you are under 18, a parent or guardian must agree on your behalf.
      </p>

      <h2>1. The Service</h2>
      <p>
        Young AI Explorers provides online lessons, quizzes, badges, community features, an AI assistant (Vision Vee), and optional Match Quiz functionality for educational purposes.
      </p>

      <h2>2. Accounts</h2>
      <ul>
        <li>You must provide accurate registration information.</li>
        <li>Students under 13 should register with parental consent.</li>
        <li>You are responsible for keeping your password secure.</li>
        <li>We may suspend accounts that violate these terms or harm other users.</li>
      </ul>

      <h2>3. Acceptable Use</h2>
      <ul>
        <li>Use the Platform for learning and educational purposes only.</li>
        <li>Do not share personal contact information in community feeds.</li>
        <li>Do not attempt to bypass security, scrape data, or misuse the AI assistant.</li>
        <li>Respect other explorers — no bullying, harassment, or inappropriate content.</li>
      </ul>

      <h2>4. Intellectual Property</h2>
      <p>
        {IP_OWNERSHIP_NOTICE} You may not reproduce or distribute materials without written permission, except for personal classroom use by registered educators.
      </p>

      <h2>5. AI Assistant</h2>
      <p>
        Vision Vee provides educational guidance for learning support only. Responses may occasionally be inaccurate. Parents should supervise younger children&apos;s use of AI features.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>
        The Platform is provided &quot;as is&quot; for educational purposes. We are not liable for indirect damages arising from use of the service, to the fullest extent permitted by law.
      </p>

      <h2>7. Changes</h2>
      <p>
        We may update these terms. Continued use after changes constitutes acceptance. Material changes will be communicated via the Platform or email.
      </p>

      <h2>8. Contact</h2>
      <p>
        <a href="mailto:hello@youngaiexplorers.com" className="text-brand-gold hover:underline">hello@youngaiexplorers.com</a>
      </p>
    </LegalPageLayout>
  )
}
