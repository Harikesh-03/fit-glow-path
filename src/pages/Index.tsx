import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import WorkoutCardsSection from "@/components/WorkoutCardsSection";
import DashboardPreview from "@/components/DashboardPreview";
import GamificationSection from "@/components/GamificationSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <WorkoutCardsSection />
      <DashboardPreview />
      <GamificationSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
