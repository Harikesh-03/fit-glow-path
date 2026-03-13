import { motion } from "framer-motion";
import { Clock, Flame, Zap, TrendingUp, Heart } from "lucide-react";

const workouts = [
  {
    title: "HIIT Blast",
    duration: "25 min",
    calories: "320 kcal",
    level: "Intermediate",
    accent: "bg-ocean",
    accentLight: "bg-ocean/8",
    accentText: "text-ocean",
    icon: Zap,
    tags: ["Cardio", "Full Body"],
    trainer: "Coach Maya",
  },
  {
    title: "Strength Flow",
    duration: "45 min",
    calories: "450 kcal",
    level: "Advanced",
    accent: "bg-emerald",
    accentLight: "bg-emerald/8",
    accentText: "text-emerald",
    icon: TrendingUp,
    tags: ["Strength", "Upper Body"],
    trainer: "Coach Jordan",
  },
  {
    title: "Core Ignite",
    duration: "20 min",
    calories: "180 kcal",
    level: "Beginner",
    accent: "bg-coral",
    accentLight: "bg-coral/8",
    accentText: "text-coral",
    icon: Heart,
    tags: ["Core", "Flexibility"],
    trainer: "Coach Priya",
  },
];

const WorkoutCardsSection = () => {
  return (
    <section id="workouts" className="py-24 relative">
      <div className="absolute inset-0 gradient-mesh-intense" />
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="accent-dot" />
            <span className="text-xs font-bold text-accent uppercase tracking-[0.15em]">Handpicked Workouts</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold mb-4 text-foreground">
            Crafted by real trainers,{" "}
            <span className="text-gradient-fresh">for real people</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Every workout is designed by certified coaches who care about your form, safety, and progress.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {workouts.map((w, i) => (
            <motion.div
              key={w.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="card-elevated-hover p-6 cursor-pointer group relative overflow-hidden"
            >
              {/* Top accent bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${w.accent} rounded-t-2xl`} />

              <div className="flex items-center justify-between mb-5 pt-1">
                <div className={`w-11 h-11 rounded-xl ${w.accentLight} flex items-center justify-center`}>
                  <w.icon className={`h-5 w-5 ${w.accentText}`} />
                </div>
                <span className="text-xs font-semibold text-muted-foreground bg-secondary px-3 py-1 rounded-full">{w.level}</span>
              </div>

              <h3 className="font-display font-bold text-xl text-foreground mb-1">{w.title}</h3>
              <p className="text-xs text-muted-foreground mb-4">by {w.trainer}</p>

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
                  <span key={tag} className="text-xs font-medium text-secondary-foreground bg-secondary px-2.5 py-1 rounded-lg">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkoutCardsSection;
