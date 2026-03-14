import { useState, useEffect } from "react";
import { useProfile, useUpdateProfile } from "@/hooks/useProfile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Save } from "lucide-react";

const Profile = () => {
  const { data: profile, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();

  const [form, setForm] = useState({
    display_name: "",
    bio: "",
    height_cm: "",
    weight_kg: "",
    fitness_goal: "",
    experience_level: "",
    gender: "",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        display_name: profile.display_name || "",
        bio: profile.bio || "",
        height_cm: profile.height_cm?.toString() || "",
        weight_kg: profile.weight_kg?.toString() || "",
        fitness_goal: profile.fitness_goal || "",
        experience_level: profile.experience_level || "beginner",
        gender: profile.gender || "",
      });
    }
  }, [profile]);

  const handleSave = async () => {
    try {
      await updateProfile.mutateAsync({
        display_name: form.display_name.trim() || null,
        bio: form.bio.trim() || null,
        height_cm: form.height_cm ? Number(form.height_cm) : null,
        weight_kg: form.weight_kg ? Number(form.weight_kg) : null,
        fitness_goal: form.fitness_goal || null,
        experience_level: form.experience_level || "beginner",
        gender: form.gender || null,
      });
      toast.success("Profile updated!");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <h1 className="text-3xl font-heading font-bold mb-6">Edit Profile</h1>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Personal Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Display Name</Label>
                  <Input
                    value={form.display_name}
                    onChange={(e) => setForm({ ...form, display_name: e.target.value })}
                    maxLength={100}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select value={form.gender} onValueChange={(v) => setForm({ ...form, gender: v })}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Bio</Label>
                <Textarea
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  placeholder="Tell us about yourself..."
                  maxLength={500}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Fitness Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Height (cm)</Label>
                  <Input
                    type="number"
                    value={form.height_cm}
                    onChange={(e) => setForm({ ...form, height_cm: e.target.value })}
                    min={50}
                    max={300}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Weight (kg)</Label>
                  <Input
                    type="number"
                    value={form.weight_kg}
                    onChange={(e) => setForm({ ...form, weight_kg: e.target.value })}
                    min={20}
                    max={500}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Fitness Goal</Label>
                  <Select value={form.fitness_goal} onValueChange={(v) => setForm({ ...form, fitness_goal: v })}>
                    <SelectTrigger><SelectValue placeholder="Select goal" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lose_weight">Lose Weight</SelectItem>
                      <SelectItem value="build_muscle">Build Muscle</SelectItem>
                      <SelectItem value="improve_endurance">Improve Endurance</SelectItem>
                      <SelectItem value="stay_active">Stay Active</SelectItem>
                      <SelectItem value="flexibility">Flexibility</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Experience Level</Label>
                  <Select value={form.experience_level} onValueChange={(v) => setForm({ ...form, experience_level: v })}>
                    <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleSave} disabled={updateProfile.isPending} className="gap-2">
            <Save className="w-4 h-4" />
            {updateProfile.isPending ? "Saving..." : "Save Profile"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
