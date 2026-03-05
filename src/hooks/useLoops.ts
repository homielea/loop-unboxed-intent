import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Loop, LoopCategory, ReflectionReason } from "@/types/loop";

export const useLoops = (userId: string | undefined) => {
  const [loops, setLoops] = useState<Loop[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLoops = useCallback(async () => {
    if (!userId) return;
    const { data, error } = await supabase
      .from("loops")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setLoops(data as Loop[]);
    }
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchLoops();
  }, [fetchLoops]);

  // Real-time subscription
  useEffect(() => {
    if (!userId) return;
    const channel = supabase
      .channel("loops-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "loops", filter: `user_id=eq.${userId}` }, () => {
        fetchLoops();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [userId, fetchLoops]);

  const addLoop = async (text: string, category: LoopCategory = "other") => {
    if (!userId) return;
    await supabase.from("loops").insert({ text, category, user_id: userId });
  };

  const toggleLoop = async (id: string, reflectionReason?: ReflectionReason, reflectionNote?: string) => {
    const loop = loops.find((l) => l.id === id);
    if (!loop) return;

    const updates: Record<string, unknown> = {
      completed: !loop.completed,
      completed_at: !loop.completed ? new Date().toISOString() : null,
    };

    if (!loop.completed && reflectionReason) {
      updates.reflection_reason = reflectionReason;
      updates.reflection_note = reflectionNote || null;
    }

    if (loop.completed) {
      // Reopening — clear reflection
      updates.reflection_reason = null;
      updates.reflection_note = null;
    }

    await supabase.from("loops").update(updates).eq("id", id);
  };

  const deleteLoop = async (id: string) => {
    await supabase.from("loops").delete().eq("id", id);
  };

  const toggleFocus = async (id: string) => {
    const loop = loops.find((l) => l.id === id);
    if (!loop) return;

    const focusedCount = loops.filter((l) => l.is_focused && !l.completed).length;
    if (!loop.is_focused && focusedCount >= 3) return false; // max 3

    await supabase.from("loops").update({ is_focused: !loop.is_focused }).eq("id", id);
    return true;
  };

  const clearFocus = async () => {
    const focusedIds = loops.filter((l) => l.is_focused).map((l) => l.id);
    if (focusedIds.length === 0) return;
    await supabase.from("loops").update({ is_focused: false }).in("id", focusedIds);
  };

  const openLoops = loops.filter((l) => !l.completed);
  const closedLoops = loops.filter((l) => l.completed);
  const focusedLoops = loops.filter((l) => l.is_focused && !l.completed);

  return {
    loops, openLoops, closedLoops, focusedLoops,
    loading, addLoop, toggleLoop, deleteLoop, toggleFocus, clearFocus,
  };
};
