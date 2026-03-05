import { Loop } from "@/types/loop";
import LoopItem from "./LoopItem";
import { BrutalistButton } from "./ui/brutalist-button";
import { X, Target } from "lucide-react";

interface FocusModeProps {
  focusedLoops: Loop[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUnfocus: (id: string) => void;
  onExit: () => void;
}

const FocusMode = ({ focusedLoops, onToggle, onDelete, onUnfocus, onExit }: FocusModeProps) => {
  return (
    <div className="min-h-[60vh] flex flex-col">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="inline-block border-4 border-primary bg-accent px-4 py-2 mb-4">
            <h2 className="text-xl font-bold text-accent-foreground flex items-center gap-2">
              <Target size={24} />
              [TODAY'S_3]
            </h2>
          </div>
          <p className="text-muted-foreground font-mono">
            {focusedLoops.length}/3 loops selected. Do these. Nothing else.
          </p>
        </div>
        <BrutalistButton variant="ghost" size="icon" onClick={onExit} aria-label="Exit focus mode">
          <X size={24} />
        </BrutalistButton>
      </div>

      {focusedLoops.length === 0 ? (
        <div className="border-4 border-muted bg-muted/20 p-12 text-center flex-1 flex items-center justify-center">
          <div>
            <p className="text-2xl font-bold mb-2">NO FOCUSED LOOPS</p>
            <p className="text-muted-foreground font-mono">
              Exit focus mode and star up to 3 loops to focus on today.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {focusedLoops.map((loop, i) => (
            <div key={loop.id} className="relative">
              <div className="absolute -left-12 top-6 text-4xl font-bold text-muted-foreground/30 select-none hidden md:block">
                {String(i + 1).padStart(2, "0")}
              </div>
              <LoopItem
                loop={loop}
                onToggle={() => onToggle(loop.id)}
                onDelete={() => onDelete(loop.id)}
                onUnfocus={() => onUnfocus(loop.id)}
                showCategory
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FocusMode;
