import { motion } from "framer-motion";
import { Brain, Watch, Shield, Salad, Dumbbell, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Recommendations",
    description: "Adaptive plans that evolve with your fitness level, preferences, and progress data.",
    gradient: "from-neon-blue/20 to-neon-cyan/10",
    iconColor: "text-neon-blue",
  },
  {
    icon: Watch,
    title: "Wearable Sync",
    description: "Seamless integration with Apple Watch, Fitbit, Garmin and 50+ devices.",
    gradient: "from-neon-green/20 to-neon-cyan/10",
    iconColor: "text-neon-green",
  },
  {
    icon: Dumbbell,
    title: "Custom Workouts",
    description: "Personalized routines built around your goals, equipment, and time.",
    gradient: "from-neon-purple/20 to-neon-blue/10",
    iconColor: "text-neon-purple",
  },
  {
    icon: Salad,
    title: "Smart Nutrition",
    description: "Meal plans tailored to your dietary needs, allergies, and caloric targets.",
    gradient: "from-neon-green/20 to-neon-green/5",
    iconColor: "text-neon-green",
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    description: "Beautiful dashboards tracking strength, endurance, and body composition.",
    gradient: "from-neon-cyan/20 to-neon-blue/10",
    iconColor: "text-neon-cyan",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "End-to-end encryption, HIPAA-aligned practices, full data control.",
    gradient: "from-neon-blue/15 to-neon-purple/10",
    iconColor: "text-neon-blue",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-28 relative">
      <div className="absolute inset-0 gradient-mesh" />
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4 block">Features</span>
          <h2 className="text-4xl sm:text-5xl font-display font-extrabold mb-4">
            Everything You Need to <span className="text-gradient-primary">Perform</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A complete ecosystem designed to support every aspect of your fitness journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card-hover p-6 group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <f.icon className={`h-6 w-6 ${f.iconColor}`} />
              </div>
              <h3 className="font-display font-bold text-lg mb-2 text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
