import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-fitness.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-hero">
      {/* Soft decorative shapes */}
      <div className="absolute top-20 right-[10%] w-72 h-72 rounded-full bg-ocean/5 blur-[80px]" />
      <div className="absolute bottom-32 left-[5%] w-56 h-56 rounded-full bg-emerald/5 blur-[60px]" />
      <div className="absolute top-1/2 right-[30%] w-40 h-40 rounded-full bg-coral/4 blur-[50px]" />

      <div className="container relative z-10 pt-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-8"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary tracking-wide">Built by fitness lovers, for fitness lovers</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold leading-[1.1] tracking-tight mb-6 text-foreground">
              Your fitness journey,{" "}
              <span className="text-gradient-primary">made personal.</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg mb-10 leading-relaxed font-body">
              Workouts that adapt to you, nutrition that fits your life, and a community that actually cares. No generic plans — just real results.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/auth">
                <Button variant="hero">
                  Start Your Journey
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="heroOutline">
                <Play className="h-4 w-4" />
                See How It Works
              </Button>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-14 flex items-center gap-8"
            >
              {[
                { value: "50K+", label: "Happy Members" },
                { value: "98%", label: "Goal Success" },
                { value: "4.9★", label: "App Store" },
              ].map((stat, i) => (
                <div key={stat.label} className="relative">
                  <span className="block text-2xl font-display font-extrabold text-foreground">{stat.value}</span>
                  <span className="text-xs text-muted-foreground font-medium mt-0.5">{stat.label}</span>
                  {i < 2 && <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-px h-8 bg-border" />}
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-soft-lg">
              <img src={heroImage} alt="Person working out with energy and determination" className="w-full h-[520px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent" />
            </div>
            {/* Floating stats card */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-6 card-elevated p-4 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <span className="text-accent font-bold text-sm">🔥</span>
              </div>
              <div>
                <p className="text-sm font-display font-bold text-foreground">342 cal burned</p>
                <p className="text-xs text-muted-foreground">Today's workout</p>
              </div>
            </motion.div>
            {/* Floating community card */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -top-2 -right-4 card-elevated p-3 flex items-center gap-2"
            >
              <div className="flex -space-x-2">
                {["bg-ocean/20", "bg-coral/20", "bg-emerald/20"].map((bg, i) => (
                  <div key={i} className={`w-7 h-7 rounded-full ${bg} border-2 border-card flex items-center justify-center text-[10px] font-bold text-muted-foreground`}>
                    {["S", "J", "A"][i]}
                  </div>
                ))}
              </div>
              <p className="text-xs font-medium text-muted-foreground">+2.4k active now</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
