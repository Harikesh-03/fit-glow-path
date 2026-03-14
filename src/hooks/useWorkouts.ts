import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

export const useWorkoutPlans = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["workout_plans", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("workout_plans")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
};

export const useWorkoutPlanWithExercises = (planId: string | undefined) => {
  return useQuery({
    queryKey: ["workout_plan", planId],
    queryFn: async () => {
      if (!planId) return null;
      const [planRes, exercisesRes] = await Promise.all([
        supabase.from("workout_plans").select("*").eq("id", planId).single(),
        supabase.from("workout_exercises").select("*").eq("plan_id", planId).order("sort_order"),
      ]);
      if (planRes.error) throw planRes.error;
      if (exercisesRes.error) throw exercisesRes.error;
      return { plan: planRes.data, exercises: exercisesRes.data };
    },
    enabled: !!planId,
  });
};

export const useCreateWorkoutPlan = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (plan: Omit<TablesInsert<"workout_plans">, "user_id">) => {
      if (!user) throw new Error("Not authenticated");
      const { data, error } = await supabase
        .from("workout_plans")
        .insert({ ...plan, user_id: user.id })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workout_plans", user?.id] });
    },
  });
};

export const useDeleteWorkoutPlan = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (planId: string) => {
      const { error } = await supabase.from("workout_plans").delete().eq("id", planId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workout_plans", user?.id] });
    },
  });
};

export const useAddExercise = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (exercise: TablesInsert<"workout_exercises">) => {
      const { data, error } = await supabase
        .from("workout_exercises")
        .insert(exercise)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["workout_plan", data.plan_id] });
    },
  });
};

export const useLogWorkout = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (log: Omit<TablesInsert<"workout_logs">, "user_id">) => {
      if (!user) throw new Error("Not authenticated");
      const { data, error } = await supabase
        .from("workout_logs")
        .insert({ ...log, user_id: user.id })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workout_logs"] });
    },
  });
};

export const useWorkoutLogs = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["workout_logs", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("workout_logs")
        .select("*")
        .eq("user_id", user.id)
        .order("logged_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
};
