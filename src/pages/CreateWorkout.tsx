import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCreateWorkoutPlan } from "@/hooks/useWorkouts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { ArrowLeft, Dumbbell } from "lucide-react";

const CreateWorkout = () => {
  const navigate = useNavigate();
  const createPlan = useCreateWorkoutPlan();
  const [form, setForm] = useState({
    title: "",
    description: "",
    difficulty: "beginner",
    duration_weeks: 4,
    is_public: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error("Plan title is required");
      return;
    }
    try {
      const plan = await createPlan.mutateAsync({
        title: form.title.trim(),
        description: form.description.trim() || null,
        difficulty: form.difficulty,
        duration_weeks: form.duration_weeks,
        is_public: form.is_public,
      });
      toast.success("Workout plan created!");
      navigate(`/workouts/${plan.id}`);
    } catch {
      toast.error("Failed to create plan");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Dumbbell className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-3xl font-heading font-bold">New Workout Plan</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label>Plan Title *</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g., Full Body Strength"
                  maxLength={200}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe your workout plan..."
                  maxLength={1000}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Difficulty</Label>
                  <Select value={form.difficulty} onValueChange={(v) => setForm({ ...form, difficulty: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Duration (weeks)</Label>
                  <Input
                    type="number"
                    value={form.duration_weeks}
                    onChange={(e) => setForm({ ...form, duration_weeks: parseInt(e.target.value) || 4 })}
                    min={1}
                    max={52}
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={form.is_public}
                  onCheckedChange={(v) => setForm({ ...form, is_public: v })}
                />
                <Label>Make this plan public</Label>
              </div>
              <Button type="submit" disabled={createPlan.isPending} className="w-full">
                {createPlan.isPending ? "Creating..." : "Create Plan"}
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default CreateWorkout;
