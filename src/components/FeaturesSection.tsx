import { motion } from "framer-motion";
import { Brain, Watch, Shield, Salad, Dumbbell, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Recommendations",
    description: "Adaptive plans that evolve with your fitness level, preferences, and progress data.",
  },
  {
    icon: Watch,
    title: "Wearable Integration",
    description: "Seamless sync with Apple Watch, Fitbit, Garmin and more for real-time tracking.",
  },
  {
    icon: Dumbbell,
    title: "Custom Workouts",
    description: "Personalized routines built around your goals, equipment, and available time.",
  },
  {
    icon: Salad,
    title: "Nutrition Plans",
    description: "Meal plans tailored to your dietary needs, allergies, and caloric targets.",
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    description: "Beautiful dashboards tracking every metric — strength, endurance, body composition.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "End-to-end encryption, HIPAA-aligned practices, and full control over your data.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative gradient-mesh">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4">
            Everything You Need to <span className="text-gradient-primary">Perform</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A complete ecosystem designed to support every aspect of your fitness journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group glass-surface rounded-2xl p-6 hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:glow-primary-sm transition-all">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2 text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
