import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-surface rounded-3xl p-12 sm:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 gradient-mesh opacity-60" />
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4">
              Your Best Self <span className="text-gradient-primary">Starts Today</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed">
              Join thousands who've transformed their fitness with AI-powered plans, real-time tracking, and a community that cares.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="hero">
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
