import { useState, useEffect } from "react";
import { HelpCircle, ArrowLeft, Target, LogOut } from "lucide-react";
import GridOverlay from "./GridOverlay";
import Landing from "./Landing";
import LoopInput from "./LoopInput";
import LoopList from "./LoopList";
import FocusMode from "./FocusMode";
import ShortcutsHelp from "./ShortcutsHelp";
import ReflectionModal from "./ReflectionModal";
import AuthPage from "./AuthPage";
import { useLoops } from "@/hooks/useLoops";
import { useAuth } from "@/hooks/useAuth";
import { BrutalistButton } from "./ui/brutalist-button";
import { toast } from "sonner";
import type { LoopCategory, ReflectionReason } from "@/types/loop";

const App = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const [showLanding, setShowLanding] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [focusTrigger, setFocusTrigger] = useState(0);
  const [focusMode, setFocusMode] = useState(false);
  const [reflectingLoopId, setReflectingLoopId] = useState<string | null>(null);

  const { openLoops, closedLoops, focusedLoops, loading, addLoop, toggleLoop, deleteLoop, toggleFocus, clearFocus } =
    useLoops(user?.id);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        if (e.key === "Escape") (e.target as HTMLInputElement).blur();
        return;
      }

      switch (e.key) {
        case "?":
          e.preventDefault();
          setShowHelp((prev) => !prev);
          break;
        case "n":
        case "N":
        case "Enter":
          e.preventDefault();
          setFocusTrigger((prev) => prev + 1);
          break;
        case "f":
        case "F":
          e.preventDefault();
          setFocusMode((prev) => !prev);
          break;
        case "Escape":
          if (showHelp) setShowHelp(false);
          else if (focusMode) setFocusMode(false);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showHelp, focusMode]);

  const handleAddLoop = async (text: string, category: LoopCategory) => {
    await addLoop(text, category);
    toast.success("Loop captured", { description: "Open loop added to your list" });
  };

  const handleToggleLoop = (id: string) => {
    const loop = [...openLoops, ...closedLoops].find((l) => l.id === id);
    if (!loop) return;

    if (!loop.completed) {
      // Opening the reflection modal before closing
      setReflectingLoopId(id);
    } else {
      // Reopening — no reflection needed
      toggleLoop(id);
      toast.success("Loop reopened", { description: "Back to open loops" });
    }
  };

  const handleReflectionSubmit = async (reason: ReflectionReason, note?: string) => {
    if (!reflectingLoopId) return;
    await toggleLoop(reflectingLoopId, reason, note);
    toast.success("Loop closed", { description: "One less thing on your mind" });
    setReflectingLoopId(null);
  };

  const handleDeleteLoop = async (id: string) => {
    await deleteLoop(id);
    toast.success("Loop deleted", { description: "Permanently removed" });
  };

  const handleFocus = async (id: string) => {
    const success = await toggleFocus(id);
    if (success === false) {
      toast.error("Max 3 focused loops", { description: "Remove one first" });
    }
  };

  const handleUnfocus = async (id: string) => {
    await toggleFocus(id);
  };

  // Auth loading
  if (authLoading) {
    return (
      <>
        <GridOverlay />
        <div className="min-h-screen flex items-center justify-center">
          <div className="border-4 border-primary bg-secondary px-6 py-3">
            <p className="text-xl font-bold font-mono animate-pulse">LOADING...</p>
          </div>
        </div>
      </>
    );
  }

  // Not logged in
  if (!user) {
    if (showLanding) {
      return (
        <>
          <GridOverlay />
          <Landing onEnterApp={() => setShowLanding(false)} />
        </>
      );
    }
    return <AuthPage />;
  }

  // Logged in
  if (showLanding) setShowLanding(false);

  const reflectingLoop = reflectingLoopId
    ? [...openLoops, ...closedLoops].find((l) => l.id === reflectingLoopId)
    : null;

  return (
    <>
      <GridOverlay />

      <div className="min-h-screen relative">
        <div className="brutalist-container py-12 relative z-10">
          {/* Header */}
          <header className="mb-12 flex items-center justify-between">
            <div>
              <div className="mb-4 inline-block border-4 border-primary bg-secondary px-4 py-2">
                <h1 className="text-2xl font-bold">[LOOP_CLOSING]</h1>
              </div>
              <p className="text-lg text-muted-foreground font-mono max-w-2xl">
                Capture fast. Review deliberately. Close with intention.
              </p>
            </div>

            <div className="flex gap-2">
              <BrutalistButton
                variant={focusMode ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setFocusMode(!focusMode)}
                aria-label="Toggle focus mode"
              >
                <Target size={24} />
              </BrutalistButton>
              <BrutalistButton
                variant="ghost"
                size="icon"
                onClick={() => setShowHelp(true)}
                aria-label="Show keyboard shortcuts"
              >
                <HelpCircle size={24} />
              </BrutalistButton>
              <BrutalistButton
                variant="ghost"
                size="icon"
                onClick={signOut}
                aria-label="Sign out"
              >
                <LogOut size={24} />
              </BrutalistButton>
            </div>
          </header>

          {focusMode ? (
            <FocusMode
              focusedLoops={focusedLoops}
              onToggle={handleToggleLoop}
              onDelete={handleDeleteLoop}
              onUnfocus={handleUnfocus}
              onExit={() => setFocusMode(false)}
            />
          ) : (
            <>
              {/* Input */}
              <div className="mb-16">
                <LoopInput onAdd={handleAddLoop} focusTrigger={focusTrigger} />
              </div>

              {/* Focus bar */}
              {focusedLoops.length > 0 && !focusMode && (
                <div className="mb-8 border-4 border-accent bg-accent/10 p-4 flex items-center justify-between">
                  <span className="font-mono font-bold text-accent">
                    ★ {focusedLoops.length}/3 LOOPS FOCUSED
                  </span>
                  <div className="flex gap-2">
                    <BrutalistButton variant="secondary" size="sm" onClick={() => setFocusMode(true)}>
                      ENTER FOCUS MODE
                    </BrutalistButton>
                    <BrutalistButton variant="ghost" size="sm" onClick={clearFocus}>
                      CLEAR
                    </BrutalistButton>
                  </div>
                </div>
              )}

              {/* Open Loops */}
              <LoopList
                loops={openLoops}
                onToggle={handleToggleLoop}
                onDelete={handleDeleteLoop}
                onFocus={handleFocus}
                onUnfocus={handleUnfocus}
                title="[OPEN_LOOPS]"
                emptyMessage="No open loops. Mind clear."
              />

              {/* Closed Loops */}
              {closedLoops.length > 0 && (
                <LoopList
                  loops={closedLoops}
                  onToggle={handleToggleLoop}
                  onDelete={handleDeleteLoop}
                  title="[CLOSED_LOOPS]"
                  emptyMessage="No closed loops yet."
                />
              )}
            </>
          )}
        </div>

        {/* Large decorative counter */}
        <div className="fixed bottom-8 right-8 text-8xl font-bold opacity-10 pointer-events-none select-none">
          {openLoops.length}
        </div>
      </div>

      {/* Reflection Modal */}
      {reflectingLoop && (
        <ReflectionModal
          loopText={reflectingLoop.text}
          onSubmit={handleReflectionSubmit}
          onCancel={() => setReflectingLoopId(null)}
        />
      )}

      {/* Help Modal */}
      {showHelp && <ShortcutsHelp onClose={() => setShowHelp(false)} />}
    </>
  );
};

export default App;
