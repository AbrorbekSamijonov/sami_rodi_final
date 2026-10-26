import Link from "next/link";
import Logo from "@/components/Logo";

export default function NotFound() {
  return (
    <main className="cell-grid relative flex min-h-screen flex-col items-center justify-center bg-navy px-6 text-center text-white">
      <Logo />
      <p className="mt-10 font-display text-7xl font-bold text-amber-light">404</p>
      <h1 className="mt-3 font-display text-2xl font-semibold">This page is in the shade.</h1>
      <p className="mt-2 text-slate-300">We couldn&apos;t find what you were looking for.</p>
      <Link href="/" className="mt-8 btn-brass">
        Back to home
      </Link>
    </main>
  );
}
