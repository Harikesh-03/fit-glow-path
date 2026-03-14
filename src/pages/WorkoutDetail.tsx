import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useWorkoutPlanWithExercises, useAddExercise, useDeleteWorkoutPlan, useLogWorkout } from "@/hooks/useWorkouts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { ArrowLeft, Plus, Trash2, Play, Dumbbell } from "lucide-react";

const WorkoutDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading } = useWorkoutPlanWithExercises(id);
  const addExercise = useAddExercise();
  const deletePlan = useDeleteWorkoutPlan();
  const logWorkout = useLogWorkout();

  const [exerciseForm, setExerciseForm] = useState({
    name: "", sets: 3, reps: 10, rest_seconds: 60, day_of_week: 1,
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddExercise = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!exerciseForm.name.trim() || !id) return;
    try {
      await addExercise.mutateAsync({
        plan_id: id,
        name: exerciseForm.name.trim(),
        sets: exerciseForm.sets,
        reps: exerciseForm.reps,
        rest_seconds: exerciseForm.rest_seconds,
        day_of_week: exerciseForm.day_of_week,
      });
      setExerciseForm({ name: "", sets: 3, reps: 10, rest_seconds: 60, day_of_week: 1 });
      setDialogOpen(false);
      toast.success("Exercise added!");
    } catch {
      toast.error("Failed to add exercise");
    }
  };

  const handleLogExercise = async (exerciseName: string, sets: number, reps: number) => {
    try {
      await logWorkout.mutateAsync({
        plan_id: id || null,
        exercise_name: exerciseName,
        sets_completed: sets,
        reps_completed: reps,
      });
      toast.success(`Logged ${exerciseName}!`);
    } catch {
      toast.error("Failed to log workout");
    }
  };

  const handleDelete = async () => {
    if (!id || !confirm("Delete this plan and all its exercises?")) return;
    try {
      await deletePlan.mutateAsync(id);
      toast.success("Plan deleted");
      navigate("/dashboard");
    } catch {
      toast.error("Failed to delete plan");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Plan not found</p>
      </div>
    );
  }

  const { plan, exercises } = data;
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-heading font-bold">{plan.title}</h1>
            {plan.description && (
              <p className="text-muted-foreground mt-1">{plan.description}</p>
            )}
            <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
              <span className="capitalize px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                {plan.difficulty}
              </span>
              <span>{plan.duration_weeks} weeks</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="w-4 h-4" /> Add Exercise
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Exercise</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddExercise} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Exercise Name *</Label>
                    <Input
                      value={exerciseForm.name}
                      onChange={(e) => setExerciseForm({ ...exerciseForm, name: e.target.value })}
                      placeholder="e.g., Bench Press"
                      maxLength={200}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-2">
                      <Label>Sets</Label>
                      <Input type="number" value={exerciseForm.sets}
                        onChange={(e) => setExerciseForm({ ...exerciseForm, sets: parseInt(e.target.value) || 3 })}
                        min={1} max={20}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Reps</Label>
                      <Input type="number" value={exerciseForm.reps}
                        onChange={(e) => setExerciseForm({ ...exerciseForm, reps: parseInt(e.target.value) || 10 })}
                        min={1} max={100}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Rest (s)</Label>
                      <Input type="number" value={exerciseForm.rest_seconds}
                        onChange={(e) => setExerciseForm({ ...exerciseForm, rest_seconds: parseInt(e.target.value) || 60 })}
                        min={0} max={600}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Day of Week</Label>
                    <div className="flex gap-2 flex-wrap">
                      {days.map((day, i) => (
                        <button
                          type="button"
                          key={day}
                          onClick={() => setExerciseForm({ ...exerciseForm, day_of_week: i + 1 })}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            exerciseForm.day_of_week === i + 1
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button type="submit" disabled={addExercise.isPending} className="w-full">
                    {addExercise.isPending ? "Adding..." : "Add Exercise"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {exercises.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Dumbbell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No exercises yet. Add your first exercise above!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {days.map((day, dayIndex) => {
              const dayExercises = exercises.filter((ex) => ex.day_of_week === dayIndex + 1);
              if (dayExercises.length === 0) return null;
              return (
                <div key={day}>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">{day}</h3>
                  <div className="space-y-2">
                    {dayExercises.map((ex) => (
                      <Card key={ex.id}>
                        <CardContent className="py-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                              <Dumbbell className="w-4 h-4 text-accent" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{ex.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {ex.sets} sets × {ex.reps} reps • {ex.rest_seconds}s rest
                              </p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="gap-1 text-accent"
                            onClick={() => handleLogExercise(ex.name, ex.sets || 3, ex.reps || 10)}
                          >
                            <Play className="w-3 h-3" /> Log
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutDetail;
