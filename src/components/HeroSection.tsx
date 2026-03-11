import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Play } from "lucide-react";
import heroImage from "@/assets/hero-fitness.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-neon-blue/10 blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-neon-green/8 blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-neon-purple/5 blur-[150px]" />
      </div>

      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Athlete running with digital data trails" className="w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      </div>

      <div className="container relative z-10 pt-24">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-8 glow-primary-sm"
            >
              <Zap className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary tracking-wider uppercase">AI-Powered Fitness</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold leading-[1.05] tracking-tight mb-6">
              Train Smarter.
              <br />
              <span className="text-gradient-primary">Live Stronger.</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg mb-10 leading-relaxed font-body">
              Personalized workouts, smart nutrition plans, and real-time wearable sync — all adapting to your unique goals and progress.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero">
                Start Free Trial
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="heroOutline">
                <Play className="h-4 w-4" />
                Watch Demo
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-20 flex items-center gap-10"
          >
            {[
              { value: "50K+", label: "Active Users" },
              { value: "98%", label: "Goal Success" },
              { value: "4.9★", label: "App Rating" },
            ].map((stat, i) => (
              <div key={stat.label} className="relative">
                <span className="block text-3xl font-display font-extrabold text-gradient-primary">{stat.value}</span>
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">{stat.label}</span>
                {i < 2 && <div className="absolute -right-5 top-1/2 -translate-y-1/2 w-px h-8 bg-border" />}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
