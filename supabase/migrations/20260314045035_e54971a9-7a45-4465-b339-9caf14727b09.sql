
-- Timestamp update function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- ========== PROFILES ==========
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
  height_cm NUMERIC,
  weight_kg NUMERIC,
  fitness_goal TEXT CHECK (fitness_goal IN ('lose_weight', 'build_muscle', 'improve_endurance', 'stay_active', 'flexibility')),
  experience_level TEXT CHECK (experience_level IN ('beginner', 'intermediate', 'advanced')) DEFAULT 'beginner',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ========== WORKOUT PLANS ==========
CREATE TABLE public.workout_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')) DEFAULT 'beginner',
  duration_weeks INT DEFAULT 4,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.workout_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own plans" ON public.workout_plans FOR SELECT USING (auth.uid() = user_id OR is_public = true);
CREATE POLICY "Users can create their own plans" ON public.workout_plans FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own plans" ON public.workout_plans FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own plans" ON public.workout_plans FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_workout_plans_updated_at BEFORE UPDATE ON public.workout_plans
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ========== WORKOUT EXERCISES ==========
CREATE TABLE public.workout_exercises (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  plan_id UUID NOT NULL REFERENCES public.workout_plans(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sets INT DEFAULT 3,
  reps INT DEFAULT 10,
  duration_seconds INT,
  rest_seconds INT DEFAULT 60,
  day_of_week INT CHECK (day_of_week BETWEEN 1 AND 7),
  sort_order INT DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.workout_exercises ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view exercises in their plans" ON public.workout_exercises
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.workout_plans wp WHERE wp.id = plan_id AND (wp.user_id = auth.uid() OR wp.is_public = true))
  );
CREATE POLICY "Users can insert exercises in their plans" ON public.workout_exercises
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.workout_plans wp WHERE wp.id = plan_id AND wp.user_id = auth.uid())
  );
CREATE POLICY "Users can update exercises in their plans" ON public.workout_exercises
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.workout_plans wp WHERE wp.id = plan_id AND wp.user_id = auth.uid())
  );
CREATE POLICY "Users can delete exercises in their plans" ON public.workout_exercises
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.workout_plans wp WHERE wp.id = plan_id AND wp.user_id = auth.uid())
  );

-- ========== WORKOUT LOGS ==========
CREATE TABLE public.workout_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES public.workout_plans(id) ON DELETE SET NULL,
  exercise_name TEXT NOT NULL,
  sets_completed INT,
  reps_completed INT,
  weight_kg NUMERIC,
  duration_seconds INT,
  calories_burned INT,
  notes TEXT,
  logged_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.workout_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own logs" ON public.workout_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own logs" ON public.workout_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own logs" ON public.workout_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own logs" ON public.workout_logs FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_workout_logs_user_date ON public.workout_logs(user_id, logged_at DESC);
