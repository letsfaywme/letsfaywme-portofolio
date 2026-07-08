import ClientLayout from "./ClientLayout";
import Cursor from "@/app/components/ui/Cursor";
import Loader from "@/app/components/ui/Loader";
import ScrollProgress from "@/app/components/ui/ScrollProgress";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import HeroSection from "@/app/components/sections/HeroSection";
import AboutSection from "@/app/components/sections/AboutSection";
import SkillsSection from "@/app/components/sections/SkillsSection";
import EducationSection from "@/app/components/sections/EducationSection";
import ExperienceSection from "@/app/components/sections/ExperienceSection";
import CertificatesSection from "@/app/components/sections/CertificatesSection";
import TestimonialsSection from "@/app/components/sections/TestimonialsSection";
import ProjectsSection from "@/app/components/sections/ProjectsSection";
import LocationSection from "@/app/components/sections/LocationSection";
import ContactSection from "@/app/components/sections/ContactSection";

export default function Home() {
  return (
    <ClientLayout>
      <ScrollProgress />
      <Cursor />
      <Loader />

      <Navbar />

      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <EducationSection />
        <ExperienceSection />
        <CertificatesSection />
        <TestimonialsSection />
        <ProjectsSection />
        <LocationSection />
        <ContactSection />
      </main>

      <Footer />
    </ClientLayout>
  );
}
