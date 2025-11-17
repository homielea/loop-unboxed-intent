import { useState, useEffect } from "react";
import { Loop } from "@/types/loop";

const STORAGE_KEY = "loop-closing-data";

export const useLoops = () => {
  const [loops, setLoops] = useState<Loop[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setLoops(parsed);
      } catch (error) {
        console.error("Failed to parse stored loops:", error);
      }
    }
  }, []);

  // Save to localStorage whenever loops change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(loops));
  }, [loops]);

  const addLoop = (text: string) => {
    const newLoop: Loop = {
      id: `loop-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setLoops((prev) => [newLoop, ...prev]);
    return newLoop;
  };

  const toggleLoop = (id: string) => {
    setLoops((prev) =>
      prev.map((loop) =>
        loop.id === id
          ? {
              ...loop,
              completed: !loop.completed,
              completedAt: !loop.completed ? Date.now() : undefined,
            }
          : loop
      )
    );
  };

  const deleteLoop = (id: string) => {
    setLoops((prev) => prev.filter((loop) => loop.id !== id));
  };

  const openLoops = loops.filter((l) => !l.completed);
  const closedLoops = loops.filter((l) => l.completed);

  return {
    loops,
    openLoops,
    closedLoops,
    addLoop,
    toggleLoop,
    deleteLoop,
  };
};
