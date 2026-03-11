import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import heroImage from "@/assets/hero-fitness.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Athlete running with digital data trails" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
        <div className="absolute inset-0 gradient-mesh" />
      </div>

      <div className="container relative z-10 pt-24">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-6">
              <Zap className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">AI-Powered Fitness Platform</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-[1.05] tracking-tight mb-6">
              Train Smarter.
              <br />
              <span className="text-gradient-primary">Live Stronger.</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg mb-10 leading-relaxed">
              Personalized workouts, smart nutrition plans, and real-time wearable sync — all adapting to your unique goals and progress.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero">
                Start Free Trial
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="heroOutline">
                Watch Demo
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-16 flex items-center gap-8 text-sm text-muted-foreground"
          >
            {[
              { value: "50K+", label: "Active Users" },
              { value: "98%", label: "Goal Success" },
              { value: "4.9★", label: "App Rating" },
            ].map((stat) => (
              <div key={stat.label}>
                <span className="block text-2xl font-display font-bold text-foreground">{stat.value}</span>
                <span>{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
