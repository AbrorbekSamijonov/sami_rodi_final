import Link from "next/link";
import Logo from "./Logo";
import Footer from "./Footer";

export default function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <header className="bg-navy py-5 text-white">
        <div className="mx-auto flex max-w-content items-center justify-between px-5 sm:px-8">
          <Link href="/" aria-label="SamiRodi home"><Logo /></Link>
          <Link href="/" className="text-sm text-slate-300 hover:text-amber">← Back to site</Link>
        </div>
      </header>
      <main id="main" className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <h1 className="font-display text-4xl font-bold text-navy">{title}</h1>
        
        <div className="mt-8 space-y-5 leading-relaxed text-slate-700 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-navy">{children}</div>
      </main>
      <Footer />
    </>
  );
}
