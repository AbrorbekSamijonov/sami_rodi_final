import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Terms | SamiRodi" };

export default function Terms() {
  return (
    <LegalPage title="Terms of Use">
      <h2>Use of this site</h2>
      <p>This website provides general information about SamiRodi products. Content is provided as-is and may change without notice.</p>
      <h2>No offer</h2>
      <p>Information on this site, including prices and performance figures, is illustrative unless confirmed in a written quote.</p>
      <h2>Intellectual property</h2>
      <p>The foundation patent referenced on this site is owned by Oles Honchar Dnipro National University. All other content and branding are the property of SamiRodi.</p>
      <h2>Liability</h2>
      <p>Content is provided without warranty to the extent permitted by law.</p>
    </LegalPage>
  );
}
