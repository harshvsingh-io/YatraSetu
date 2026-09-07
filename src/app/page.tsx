import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import UnderratedPicks from "@/components/UnderratedPicks";
import FeatureShowcase from "@/components/FeatureShowcase";
import Partners from "@/components/Partners";
import HowItWorks from "@/components/HowItWorks";
import HowWeVerify from "@/components/HowWeVerify";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <UnderratedPicks />
      <FeatureShowcase />
      <Partners />
      <HowItWorks />
      <HowWeVerify />
      <Testimonials />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
