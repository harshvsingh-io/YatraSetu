import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Partners from "@/components/Partners";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/components/Toast";

export default function Home() {
  return (
    <ToastProvider>
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <Partners />
        <HowItWorks />
        <Testimonials />
        <CTASection />
        <Footer />
      </main>
    </ToastProvider>
  );
}
