import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import JudgeShowcase from "@/components/JudgeShowcase";
import UnderratedPicks from "@/components/UnderratedPicks";
import HowItWorks from "@/components/HowItWorks";
import HowWeVerify from "@/components/HowWeVerify";
import Testimonials from "@/components/Testimonials";
import Partners from "@/components/Partners";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <JudgeShowcase />
      <UnderratedPicks />
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
