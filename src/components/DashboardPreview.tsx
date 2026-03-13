import { motion } from "framer-motion";
import { Activity, Flame, Footprints, Heart, Moon, TrendingUp } from "lucide-react";

const stats = [
  { icon: Flame, label: "Calories", value: "2,340", unit: "kcal", change: "+12%", color: "text-coral" },
  { icon: Footprints, label: "Steps", value: "12,847", unit: "", change: "+8%", color: "text-ocean" },
  { icon: Heart, label: "Avg HR", value: "72", unit: "bpm", change: "-3%", color: "text-lavender" },
  { icon: Moon, label: "Sleep", value: "7.5", unit: "hrs", change: "+5%", color: "text-teal" },
];

const weekData = [
  { day: "Mon", value: 75 },
  { day: "Tue", value: 88 },
  { day: "Wed", value: 62 },
  { day: "Thu", value: 94 },
  { day: "Fri", value: 80 },
  { day: "Sat", value: 70 },
  { day: "Sun", value: 55 },
];

const DashboardPreview = () => {
  return (
    <section className="py-24 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="accent-dot" />
            <span className="text-xs font-bold text-primary uppercase tracking-[0.15em]">Your Dashboard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold mb-4 text-foreground">
            See your progress, <span className="text-gradient-warm">feel the difference</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            A clean, honest view of your fitness journey. No vanity metrics — just the numbers that matter.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-elevated p-6 sm:p-8 max-w-4xl mx-auto shadow-soft-lg"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center">
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground">Today's Overview</h3>
                <p className="text-xs text-muted-foreground">March 13, 2026</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1.5 rounded-full">Live</span>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-muted/50 rounded-xl p-4"
              >
                <s.icon className={`h-4 w-4 ${s.color} mb-2`} />
                <div className="text-2xl font-display font-extrabold text-foreground">
                  {s.value}<span className="text-sm font-normal text-muted-foreground ml-1">{s.unit}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                  <span className="text-xs font-bold text-accent flex items-center gap-0.5">
                    <TrendingUp className="h-3 w-3" />
                    {s.change}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mini bar chart */}
          <div>
            <h4 className="font-display font-semibold text-sm text-foreground mb-4">Weekly Activity</h4>
            <div className="flex items-end gap-3 h-32">
              {weekData.map((d, i) => (
                <motion.div
                  key={d.day}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${d.value}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5, ease: "easeOut" }}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <div
                    className="w-full rounded-lg bg-gradient-to-t from-primary/50 to-primary/15 min-h-[4px]"
                    style={{ height: `${d.value}%` }}
                  />
                  <span className="text-xs text-muted-foreground font-medium">{d.day}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardPreview;
