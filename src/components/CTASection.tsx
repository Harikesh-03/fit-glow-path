import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-elevated p-10 sm:p-16 text-center relative overflow-hidden shadow-soft-lg"
        >
          {/* Soft background wash */}
          <div className="absolute inset-0 bg-gradient-hero opacity-60" />

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 mb-6"
            >
              <Heart className="h-3.5 w-3.5 text-accent fill-accent/20" />
              <span className="text-xs font-bold text-accent uppercase tracking-wider">Free to start — no card required</span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold mb-4 text-foreground">
              Ready to feel the{" "}
              <span className="text-gradient-warm">difference?</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-10 leading-relaxed">
              Join 50,000+ people who chose a fitness platform that feels personal. Start today — your future self will thank you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="accent">
                Start Your Free Trial
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
