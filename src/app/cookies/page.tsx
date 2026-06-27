import { LegalPageLayout } from '@/components/LegalPageLayout'

export default function CookiesPage() {
  return (
    <LegalPageLayout title="Cookie Policy" lastUpdated="27 June 2026">
      <p>
        This Cookie Policy explains how Young AI Explorers uses cookies and similar technologies when you visit our website.
      </p>

      <h2>1. What Are Cookies?</h2>
      <p>
        Cookies are small text files stored on your device. They help websites remember your preferences and keep you signed in securely.
      </p>

      <h2>2. Cookies We Use</h2>
      <ul>
        <li><strong>Essential cookies:</strong> authentication session tokens (Supabase) required to log in and access your dashboard.</li>
        <li><strong>Preference cookies:</strong> theme selection (light/dark mode) stored in localStorage under the key &quot;theme&quot;.</li>
        <li><strong>Functional cookies:</strong> remember your country and curriculum settings linked to your account.</li>
      </ul>

      <h2>3. Third-Party Cookies</h2>
      <p>
        We use Supabase for authentication and database services. Supabase may set cookies necessary for secure sessions. We do not use advertising or tracking cookies.
      </p>

      <h2>4. Managing Cookies</h2>
      <p>
        You can control cookies through your browser settings. Disabling essential cookies will prevent you from signing in. You can toggle dark/light mode at any time using the theme button in the navigation bar.
      </p>

      <h2>5. Updates</h2>
      <p>
        We may update this policy as our platform evolves. Check this page for the latest version.
      </p>

      <h2>6. Contact</h2>
      <p>
        Questions: <a href="mailto:hello@youngaiexplorers.com" className="text-brand-gold hover:underline">hello@youngaiexplorers.com</a>
      </p>
    </LegalPageLayout>
  )
}
