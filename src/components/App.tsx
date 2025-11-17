import { useState, useEffect } from "react";
import { HelpCircle, ArrowLeft } from "lucide-react";
import GridOverlay from "./GridOverlay";
import Landing from "./Landing";
import LoopInput from "./LoopInput";
import LoopList from "./LoopList";
import ShortcutsHelp from "./ShortcutsHelp";
import { useLoops } from "@/hooks/useLoops";
import { BrutalistButton } from "./ui/brutalist-button";
import { toast } from "sonner";

const App = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [focusTrigger, setFocusTrigger] = useState(0);
  
  const { openLoops, closedLoops, addLoop, toggleLoop, deleteLoop } = useLoops();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        if (e.key === "Escape") {
          (e.target as HTMLInputElement).blur();
        }
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
        case "Escape":
          if (showHelp) {
            setShowHelp(false);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showHelp]);

  const handleAddLoop = (text: string) => {
    addLoop(text);
    toast.success("Loop captured", {
      description: "Open loop added to your list",
    });
  };

  const handleToggleLoop = (id: string) => {
    toggleLoop(id);
    const loop = [...openLoops, ...closedLoops].find((l) => l.id === id);
    if (loop) {
      toast.success(loop.completed ? "Loop reopened" : "Loop closed", {
        description: loop.completed ? "Back to open loops" : "One less thing on your mind",
      });
    }
  };

  const handleDeleteLoop = (id: string) => {
    deleteLoop(id);
    toast.success("Loop deleted", {
      description: "Permanently removed",
    });
  };

  if (showLanding) {
    return (
      <>
        <GridOverlay />
        <Landing onEnterApp={() => setShowLanding(false)} />
      </>
    );
  }

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
            
            <div className="flex gap-4">
              <BrutalistButton
                variant="ghost"
                size="icon"
                onClick={() => setShowLanding(true)}
                aria-label="Back to landing"
              >
                <ArrowLeft size={24} />
              </BrutalistButton>
              <BrutalistButton
                variant="ghost"
                size="icon"
                onClick={() => setShowHelp(true)}
                aria-label="Show keyboard shortcuts"
              >
                <HelpCircle size={24} />
              </BrutalistButton>
            </div>
          </header>

          {/* Input */}
          <div className="mb-16">
            <LoopInput onAdd={handleAddLoop} focusTrigger={focusTrigger} />
          </div>

          {/* Open Loops */}
          <LoopList
            loops={openLoops}
            onToggle={handleToggleLoop}
            onDelete={handleDeleteLoop}
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
        </div>

        {/* Large decorative counter */}
        <div className="fixed bottom-8 right-8 text-8xl font-bold opacity-10 pointer-events-none select-none">
          {openLoops.length}
        </div>
      </div>

      {/* Help Modal */}
      {showHelp && <ShortcutsHelp onClose={() => setShowHelp(false)} />}
    </>
  );
};

export default App;
