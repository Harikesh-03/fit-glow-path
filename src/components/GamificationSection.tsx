import { motion } from "framer-motion";
import { Trophy, Flame, Users, Target, Medal, Swords } from "lucide-react";

const badges = [
  { icon: Flame, label: "7-Day Streak", color: "text-orange-400" },
  { icon: Trophy, label: "First 5K", color: "text-yellow-400" },
  { icon: Medal, label: "Iron Will", color: "text-primary" },
  { icon: Target, label: "Goal Crusher", color: "text-accent" },
];

const leaderboard = [
  { rank: 1, name: "Sarah M.", points: 12_450, avatar: "SM" },
  { rank: 2, name: "James K.", points: 11_890, avatar: "JK" },
  { rank: 3, name: "Alex R.", points: 10_320, avatar: "AR" },
  { rank: 4, name: "You", points: 9_870, avatar: "YO", highlight: true },
];

const GamificationSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-6">
              <Swords className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">Gamification</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4">
              Stay Motivated. <span className="text-gradient-primary">Stay Ahead.</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md leading-relaxed">
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
                  className="glass-surface rounded-xl p-4 flex items-center gap-3 hover:border-primary/30 transition-all"
                >
                  <b.icon className={`h-8 w-8 ${b.color}`} />
                  <span className="text-sm font-medium text-foreground">{b.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-surface rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="font-display font-semibold text-foreground">Weekly Leaderboard</h3>
            </div>

            <div className="space-y-3">
              {leaderboard.map((user) => (
                <div
                  key={user.rank}
                  className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
                    user.highlight
                      ? "bg-primary/10 border border-primary/30"
                      : "bg-muted/30"
                  }`}
                >
                  <span className={`font-display font-bold text-lg w-6 text-center ${
                    user.rank === 1 ? "text-yellow-400" : user.rank === 2 ? "text-secondary-foreground/60" : user.rank === 3 ? "text-orange-400" : "text-primary"
                  }`}>
                    {user.rank}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-secondary-foreground">
                    {user.avatar}
                  </div>
                  <span className="flex-1 font-medium text-foreground text-sm">{user.name}</span>
                  <span className="text-sm text-muted-foreground font-display">{user.points.toLocaleString()} pts</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GamificationSection;
