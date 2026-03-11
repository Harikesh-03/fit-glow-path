import { motion } from "framer-motion";
import { Clock, Flame, Zap, TrendingUp } from "lucide-react";

const workouts = [
  {
    title: "HIIT Blast",
    duration: "25 min",
    calories: "320 kcal",
    level: "Intermediate",
    color: "neon-blue",
    icon: Zap,
    tags: ["Cardio", "Full Body"],
  },
  {
    title: "Strength Flow",
    duration: "45 min",
    calories: "450 kcal",
    level: "Advanced",
    color: "neon-green",
    icon: TrendingUp,
    tags: ["Strength", "Upper Body"],
  },
  {
    title: "Core Ignite",
    duration: "20 min",
    calories: "180 kcal",
    level: "Beginner",
    color: "neon-purple",
    icon: Flame,
    tags: ["Core", "Flexibility"],
  },
];

const WorkoutCardsSection = () => {
  return (
    <section id="workouts" className="py-28 relative">
      <div className="absolute inset-0 gradient-mesh-intense" />
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-4 block">Workouts</span>
          <h2 className="text-4xl sm:text-5xl font-display font-extrabold mb-4">
            Interactive <span className="text-gradient-primary">Workout Cards</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Browse AI-curated routines that adapt in real time. Tap a card to start your session.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {workouts.map((w, i) => (
            <motion.div
              key={w.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`glass-card p-6 cursor-pointer group relative overflow-hidden`}
            >
              {/* Glow accent on hover */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-${w.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl`} />

              <div className="flex items-center justify-between mb-5">
                <div className={`w-11 h-11 rounded-xl bg-${w.color}/15 flex items-center justify-center`}>
                  <w.icon className={`h-5 w-5 text-${w.color}`} />
                </div>
                <span className="text-xs font-bold text-muted-foreground bg-secondary px-3 py-1 rounded-full">{w.level}</span>
              </div>

              <h3 className="font-display font-bold text-xl text-foreground mb-3">{w.title}</h3>

              <div className="flex items-center gap-4 mb-5 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {w.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <Flame className="h-3.5 w-3.5" />
                  {w.calories}
                </span>
              </div>

              <div className="flex gap-2">
                {w.tags.map((tag) => (
                  <span key={tag} className="text-xs font-medium text-secondary-foreground bg-secondary/80 px-2.5 py-1 rounded-lg">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Hover gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t from-${w.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkoutCardsSection;
