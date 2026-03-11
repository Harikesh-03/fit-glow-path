import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-28 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-12 sm:p-16 text-center relative overflow-hidden neon-border glow-multi"
        >
          {/* Background orbs */}
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-neon-blue/10 blur-[80px]" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-neon-green/8 blur-[60px]" />

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 mb-6"
            >
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span className="text-xs font-bold text-accent uppercase tracking-wider">Free to start</span>
            </motion.div>

            <h2 className="text-4xl sm:text-5xl font-display font-extrabold mb-4">
              Your Best Self <span className="text-gradient-primary">Starts Today</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-10 leading-relaxed">
              Join 50,000+ athletes who've transformed their fitness with AI-powered plans, real-time tracking, and a community that cares.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="neonGreen">
                Start Free — No Card Required
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
