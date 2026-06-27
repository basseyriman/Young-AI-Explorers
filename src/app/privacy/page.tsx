import { LegalPageLayout } from '@/components/LegalPageLayout'
import { PLATFORM_OPERATOR_NOTICE, PLATFORM_AUDIENCE_LINE } from '@/data/legal'

export default function PrivacyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="27 June 2026">
      <p>
        Young AI Explorers (&quot;we&quot;, &quot;our&quot;, &quot;the Platform&quot;) is committed to protecting the privacy of children, parents, educators, and all users. This policy explains how we collect, use, and safeguard personal information.
      </p>

      <h2>1. Who We Are</h2>
      <p>
        {PLATFORM_OPERATOR_NOTICE}, {PLATFORM_AUDIENCE_LINE}
      </p>

      <h2>2. Information We Collect</h2>
      <ul>
        <li><strong>Account data:</strong> name, email, country, role (student, parent, teacher), and nickname.</li>
        <li><strong>Learning data:</strong> lesson progress, quiz scores, badges, and curriculum preferences.</li>
        <li><strong>Community data:</strong> aggregated trending topics by country; individual ideas only when sharing is enabled.</li>
        <li><strong>Technical data:</strong> session cookies, authentication tokens, and basic usage logs via Supabase.</li>
      </ul>

      <h2>3. How We Use Information</h2>
      <ul>
        <li>Deliver personalised learning journeys and parent-controlled curriculum.</li>
        <li>Enable community features and Match Quiz with privacy-safe nicknames.</li>
        <li>Power Vision Vee, our AI assistant, with child-appropriate guardrails.</li>
        <li>Improve the platform and comply with legal obligations.</li>
      </ul>

      <h2>4. Children&apos;s Privacy (COPPA-aligned)</h2>
      <p>
        We design the Platform to meet the UK Age Appropriate Design Code (Children&apos;s Code) and COPPA-aligned principles for users in the United States. Student accounts require:
      </p>
      <ul>
        <li>Verified parent or guardian email at signup</li>
        <li>Documented parent consent before account creation</li>
        <li>Email verification before accessing lessons</li>
        <li>Default <strong>Private</strong> sharing until a parent changes settings</li>
      </ul>
      <p>
        Parents and guardians control sharing levels (Private, Region, or Global), can disable Match Quiz, manage which topics appear in a child&apos;s curriculum, and approve custom topics suggested by Vision Vee. We do not sell personal data.
      </p>

      <h2>5. Data Retention</h2>
      <p>
        We retain account and learning data only while the account is active and as needed to provide the service:
      </p>
      <ul>
        <li><strong>Active accounts:</strong> progress, badges, curriculum settings, and community contributions are kept for the life of the account.</li>
        <li><strong>Inactive accounts:</strong> after 24 months with no login, we may anonymise or delete non-essential data after notifying the account holder or parent email on file.</li>
        <li><strong>Deletion requests:</strong> parents may request full account deletion at any time via hello@youngaiexplorers.com — we aim to complete requests within 30 days.</li>
        <li><strong>Community posts:</strong> ideas shared publicly may remain in aggregated trend statistics after account deletion, without personal identifiers.</li>
      </ul>

      <h2>6. Data Storage & Security</h2>
      <p>
        Data is stored on Supabase infrastructure with row-level security (RLS). Authentication uses industry-standard secure sessions. We retain data only as long as necessary to provide the service.
      </p>

      <h2>7. Your Rights</h2>
      <p>
        Under GDPR and UK data protection law, you may request access, correction, or deletion of your data by contacting hello@youngaiexplorers.com. Parents may manage child accounts via the Parent Dashboard.
      </p>

      <h2>8. Contact</h2>
      <p>
        Questions about this policy: <a href="mailto:hello@youngaiexplorers.com" className="text-brand-gold hover:underline">hello@youngaiexplorers.com</a>
      </p>
    </LegalPageLayout>
  )
}
