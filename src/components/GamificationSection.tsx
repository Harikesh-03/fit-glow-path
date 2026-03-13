import { motion } from "framer-motion";
import { Trophy, Flame, Users, Target, Medal, Crown, Star, Heart } from "lucide-react";

const badges = [
  { icon: Flame, label: "7-Day Streak", desc: "Work out 7 days straight", color: "text-coral", bg: "bg-coral/8" },
  { icon: Trophy, label: "First 5K", desc: "Complete your first 5K run", color: "text-ocean", bg: "bg-ocean/8" },
  { icon: Medal, label: "Iron Will", desc: "30 workouts in a month", color: "text-lavender", bg: "bg-lavender/8" },
  { icon: Star, label: "Top Performer", desc: "Rank top 10 in a challenge", color: "text-amber", bg: "bg-amber/8" },
];

const leaderboard = [
  { rank: 1, name: "Sarah M.", points: 12_450, avatar: "SM", badge: Crown },
  { rank: 2, name: "James K.", points: 11_890, avatar: "JK" },
  { rank: 3, name: "Alex R.", points: 10_320, avatar: "AR" },
  { rank: 4, name: "You", points: 9_870, avatar: "YO", highlight: true },
];

const GamificationSection = () => {
  return (
    <section id="community" className="py-24 relative">
      <div className="absolute inset-0 gradient-mesh" />
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="accent-dot" />
              <span className="text-xs font-bold text-accent uppercase tracking-[0.15em]">Community & Challenges</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold mb-4 text-foreground">
              Better together.{" "}
              <span className="text-gradient-warm">Always.</span>
            </h2>
            <p className="text-muted-foreground mb-10 max-w-md leading-relaxed">
              Earn badges, join group challenges, and cheer each other on. Because the best motivation comes from people who get it.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {badges.map((b, i) => (
                <motion.div
                  key={b.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="card-elevated-hover p-4 group"
                >
                  <div className={`w-10 h-10 rounded-xl ${b.bg} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300`}>
                    <b.icon className={`h-5 w-5 ${b.color}`} />
                  </div>
                  <span className="text-sm font-bold text-foreground block">{b.label}</span>
                  <span className="text-xs text-muted-foreground">{b.desc}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card-elevated p-6 shadow-soft-lg"
          >
            <div className="flex items-center gap-2 mb-6">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="font-display font-bold text-foreground">Weekly Leaderboard</h3>
              <span className="ml-auto text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">Week 11</span>
            </div>

            <div className="space-y-3">
              {leaderboard.map((user, i) => (
                <motion.div
                  key={user.rank}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`flex items-center gap-4 p-3.5 rounded-xl transition-all duration-300 ${
                    user.highlight
                      ? "bg-primary/5 border border-primary/20"
                      : "bg-muted/40 hover:bg-muted/70"
                  }`}
                >
                  <span className={`font-display font-extrabold text-lg w-6 text-center ${
                    user.rank === 1 ? "text-amber" : user.rank === 2 ? "text-ocean" : user.rank === 3 ? "text-coral" : "text-primary"
                  }`}>
                    {user.rank}
                  </span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${
                    user.highlight ? "bg-primary/10 text-primary" : "bg-secondary text-secondary-foreground"
                  }`}>
                    {user.avatar}
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-foreground text-sm block">{user.name}</span>
                    {user.highlight && <span className="text-xs text-primary">That's you! 🎉</span>}
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-display font-bold text-foreground">{user.points.toLocaleString()}</span>
                    <span className="text-xs text-muted-foreground block">pts</span>
                  </div>
                  {"badge" in user && user.badge && <user.badge className="h-4 w-4 text-amber" />}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GamificationSection;
