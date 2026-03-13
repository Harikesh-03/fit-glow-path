import { motion } from "framer-motion";
import { Brain, Watch, Shield, Salad, Dumbbell, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Smart Recommendations",
    description: "Plans that learn from your habits, evolve with your progress, and actually understand your goals.",
    color: "text-ocean",
    bg: "bg-ocean/8",
  },
  {
    icon: Watch,
    title: "Wearable Sync",
    description: "Connects effortlessly with Apple Watch, Fitbit, Garmin, and 50+ devices you already own.",
    color: "text-teal",
    bg: "bg-teal/8",
  },
  {
    icon: Dumbbell,
    title: "Custom Workouts",
    description: "Routines built around your life — your goals, your equipment, your available time.",
    color: "text-lavender",
    bg: "bg-lavender/8",
  },
  {
    icon: Salad,
    title: "Nutrition Guidance",
    description: "Meal ideas that respect your dietary preferences, allergies, and caloric needs. No one-size-fits-all.",
    color: "text-emerald",
    bg: "bg-emerald/8",
  },
  {
    icon: BarChart3,
    title: "Progress You Can See",
    description: "Clean dashboards showing your real gains — strength, endurance, body composition, all in one place.",
    color: "text-coral",
    bg: "bg-coral/8",
  },
  {
    icon: Shield,
    title: "Your Data, Your Rules",
    description: "End-to-end encryption and HIPAA-aligned practices. We take your privacy seriously.",
    color: "text-ocean",
    bg: "bg-ocean/8",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 gradient-mesh" />
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="accent-dot" />
            <span className="text-xs font-bold text-primary uppercase tracking-[0.15em]">What We Offer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold mb-4 text-foreground">
            Everything to help you <span className="text-gradient-primary">thrive</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            We built every feature with real people in mind — because fitness should feel human, not robotic.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="card-elevated-hover p-6 group"
            >
              <div className={`w-11 h-11 rounded-xl ${f.bg} flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300`}>
                <f.icon className={`h-5 w-5 ${f.color}`} />
              </div>
              <h3 className="font-display font-bold text-base mb-2 text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
