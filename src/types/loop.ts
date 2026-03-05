import type { Database } from "@/integrations/supabase/types";

export type LoopCategory = Database["public"]["Enums"]["loop_category"];
export type ReflectionReason = Database["public"]["Enums"]["reflection_reason"];

export interface Loop {
  id: string;
  user_id: string;
  text: string;
  category: LoopCategory | null;
  completed: boolean;
  reflection_reason: ReflectionReason | null;
  reflection_note: string | null;
  is_focused: boolean;
  created_at: string;
  completed_at: string | null;
}

export const CATEGORIES: { value: LoopCategory; label: string; emoji: string }[] = [
  { value: "work", label: "WORK", emoji: "💼" },
  { value: "personal", label: "PERSONAL", emoji: "🏠" },
  { value: "project", label: "PROJECT", emoji: "🔧" },
  { value: "health", label: "HEALTH", emoji: "💪" },
  { value: "finance", label: "FINANCE", emoji: "💰" },
  { value: "other", label: "OTHER", emoji: "📌" },
];

export const REFLECTION_REASONS: { value: ReflectionReason; label: string; emoji: string }[] = [
  { value: "forgot", label: "I forgot about it", emoji: "🧠" },
  { value: "blocked", label: "I was blocked", emoji: "🚧" },
  { value: "too_big", label: "Too big / overwhelming", emoji: "🏔️" },
  { value: "not_important", label: "Not actually important", emoji: "🤷" },
  { value: "waiting", label: "Waiting on someone", emoji: "⏳" },
  { value: "scared", label: "Avoiding it (fear)", emoji: "😰" },
];
