-- Create category enum
CREATE TYPE public.loop_category AS ENUM ('work', 'personal', 'project', 'health', 'finance', 'other');

-- Create reflection reason enum
CREATE TYPE public.reflection_reason AS ENUM ('forgot', 'blocked', 'too_big', 'not_important', 'waiting', 'scared');

-- Create loops table
CREATE TABLE public.loops (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  category loop_category DEFAULT 'other',
  completed BOOLEAN NOT NULL DEFAULT false,
  reflection_reason reflection_reason,
  reflection_note TEXT,
  is_focused BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ
);

-- Enable RLS
ALTER TABLE public.loops ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view own loops" ON public.loops FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own loops" ON public.loops FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own loops" ON public.loops FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own loops" ON public.loops FOR DELETE USING (auth.uid() = user_id);

-- Index for performance
CREATE INDEX idx_loops_user_id ON public.loops(user_id);
CREATE INDEX idx_loops_completed ON public.loops(user_id, completed);
CREATE INDEX idx_loops_focused ON public.loops(user_id, is_focused) WHERE is_focused = true;