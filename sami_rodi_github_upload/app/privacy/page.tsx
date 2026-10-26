import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { BRAND } from "@/lib/config";

export const metadata: Metadata = { title: "Privacy Policy | SamiRodi" };

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy">
      <h2>What we collect</h2>
      <p>When you submit the contact form we collect your name, email, and any optional details you provide (phone, country, customer type, interest, system size, message) and your consent to be contacted.</p>
      <h2>How we use it</h2>
      <p>We use this information only to respond to your enquiry, provide quotes, and discuss partnerships. We do not sell your data.</p>
      <h2>Storage and processors</h2>
      <p>Submissions are stored in a database (Supabase) and notification emails are sent through an email provider (Resend). We also use privacy-friendly analytics (Vercel Analytics).</p>
      <h2>Your rights</h2>
      <p>You can ask us to access, correct or delete your data at any time at {BRAND.contactEmail}.</p>
      <h2>Retention</h2>
      <p>We keep enquiry data only as long as needed to respond and follow up.</p>
    </LegalPage>
  );
}
