import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { useWorkoutPlans, useWorkoutLogs } from "@/hooks/useWorkouts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link, useNavigate } from "react-router-dom";
import {
  Dumbbell, Plus, LogOut, User, Activity, Flame,
  Calendar, TrendingUp, Clock
} from "lucide-react";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { data: profile } = useProfile();
  const { data: plans = [] } = useWorkoutPlans();
  const { data: logs = [] } = useWorkoutLogs();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const thisWeekLogs = logs.filter((log) => {
    const logDate = new Date(log.logged_at);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return logDate >= weekAgo;
  });

  const totalCalories = thisWeekLogs.reduce((sum, l) => sum + (l.calories_burned || 0), 0);
  const totalMinutes = thisWeekLogs.reduce((sum, l) => sum + Math.round((l.duration_seconds || 0) / 60), 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Dumbbell className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-heading font-bold">PulseFit</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/profile">
              <Button variant="ghost" size="sm" className="gap-2">
                <User className="w-4 h-4" />
                {profile?.display_name || "Profile"}
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-foreground">
            Hey, {profile?.display_name || "Athlete"} 👋
          </h1>
          <p className="text-muted-foreground mt-1">Here's your weekly overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-heading font-bold">{thisWeekLogs.length}</p>
                  <p className="text-xs text-muted-foreground">Workouts this week</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-heading font-bold">{totalCalories}</p>
                  <p className="text-xs text-muted-foreground">Calories burned</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-heading font-bold">{totalMinutes}</p>
                  <p className="text-xs text-muted-foreground">Minutes active</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Workout Plans */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-heading font-semibold">Your Workout Plans</h2>
            <Link to="/workouts/new">
              <Button size="sm" className="gap-2">
                <Plus className="w-4 h-4" /> New Plan
              </Button>
            </Link>
          </div>

          {plans.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Dumbbell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-heading font-semibold text-lg mb-2">No plans yet</h3>
                <p className="text-muted-foreground mb-4">Create your first workout plan to get started</p>
                <Link to="/workouts/new">
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" /> Create Plan
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {plans.map((plan) => (
                <Link key={plan.id} to={`/workouts/${plan.id}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg font-heading">{plan.title}</CardTitle>
                        <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary capitalize">
                          {plan.difficulty}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {plan.description || "No description"}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {plan.duration_weeks} weeks
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" /> {plan.is_public ? "Public" : "Private"}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        {logs.length > 0 && (
          <div>
            <h2 className="text-xl font-heading font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-2">
              {logs.slice(0, 5).map((log) => (
                <Card key={log.id}>
                  <CardContent className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Dumbbell className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{log.exercise_name}</p>
                        <p className="text-xs text-muted-foreground">
                          {log.sets_completed}×{log.reps_completed}
                          {log.weight_kg ? ` @ ${log.weight_kg}kg` : ""}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(log.logged_at).toLocaleDateString()}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
