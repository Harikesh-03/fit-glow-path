import { motion } from "framer-motion";
import { Trophy, Flame, Users, Target, Medal, Swords, Crown, Star } from "lucide-react";

const badges = [
  { icon: Flame, label: "7-Day Streak", desc: "Work out 7 days straight", color: "text-neon-green", bg: "bg-neon-green/15" },
  { icon: Trophy, label: "First 5K", desc: "Complete your first 5K run", color: "text-neon-blue", bg: "bg-neon-blue/15" },
  { icon: Medal, label: "Iron Will", desc: "30 workouts in a month", color: "text-neon-purple", bg: "bg-neon-purple/15" },
  { icon: Star, label: "Top Performer", desc: "Rank top 10 in a challenge", color: "text-neon-cyan", bg: "bg-neon-cyan/15" },
];

const leaderboard = [
  { rank: 1, name: "Sarah M.", points: 12_450, avatar: "SM", badge: Crown },
  { rank: 2, name: "James K.", points: 11_890, avatar: "JK" },
  { rank: 3, name: "Alex R.", points: 10_320, avatar: "AR" },
  { rank: 4, name: "You", points: 9_870, avatar: "YO", highlight: true },
];

const GamificationSection = () => {
  return (
    <section id="community" className="py-28 relative">
      <div className="absolute inset-0 gradient-mesh" />
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-4 block">Community</span>

            <h2 className="text-4xl sm:text-5xl font-display font-extrabold mb-4">
              Stay Motivated. <span className="text-gradient-primary">Stay Ahead.</span>
            </h2>
            <p className="text-muted-foreground mb-10 max-w-md leading-relaxed">
              Earn badges, compete in challenges, climb leaderboards, and connect with a community that pushes you forward.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {badges.map((b, i) => (
                <motion.div
                  key={b.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card-hover p-4 group"
                >
                  <div className={`w-10 h-10 rounded-xl ${b.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <b.icon className={`h-5 w-5 ${b.color}`} />
                  </div>
                  <span className="text-sm font-bold text-foreground block">{b.label}</span>
                  <span className="text-xs text-muted-foreground">{b.desc}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 neon-border"
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
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex items-center gap-4 p-3.5 rounded-xl transition-all duration-300 ${
                    user.highlight
                      ? "bg-primary/10 border border-primary/30 glow-primary-sm"
                      : "bg-secondary/40 hover:bg-secondary/60"
                  }`}
                >
                  <span className={`font-display font-extrabold text-lg w-6 text-center ${
                    user.rank === 1 ? "text-neon-green" : user.rank === 2 ? "text-neon-blue" : user.rank === 3 ? "text-neon-purple" : "text-primary"
                  }`}>
                    {user.rank}
                  </span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${
                    user.highlight ? "bg-primary/20 text-primary" : "bg-secondary text-secondary-foreground"
                  }`}>
                    {user.avatar}
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-foreground text-sm block">{user.name}</span>
                    {user.highlight && <span className="text-xs text-primary">That's you!</span>}
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-display font-bold text-foreground">{user.points.toLocaleString()}</span>
                    <span className="text-xs text-muted-foreground block">pts</span>
                  </div>
                  {"badge" in user && user.badge && <user.badge className="h-4 w-4 text-neon-green" />}
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
