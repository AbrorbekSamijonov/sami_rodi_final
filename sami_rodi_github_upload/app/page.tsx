import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import ScienceChartsLazy from "@/components/ScienceChartsLazy";
import Benefits from "@/components/Benefits";
import Research from "@/components/Research";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import PatentBand from "@/components/PatentBand";
import Market from "@/components/Market";
import BusinessModel from "@/components/BusinessModel";
import Traction from "@/components/Traction";
import Team from "@/components/Team";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <PatentBand />
        <Problem />
        <HowItWorks />
        <ScienceChartsLazy />
        <Benefits />
        <Research />
        <Market />
        <BusinessModel />
        <Traction />
        <Team />
        <Pricing />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
