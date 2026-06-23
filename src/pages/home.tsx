import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { RoomsSection } from "@/components/RoomsSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { useGsapAnimations } from "@/hooks/useGsapAnimations";

export default function Home() {
  useGsapAnimations();

  return (
    <div className="min-h-[100dvh] w-full bg-[#FFF8EF] text-[#222020] overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <RoomsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
