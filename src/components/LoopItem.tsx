import { Check, Trash2 } from "lucide-react";
import { Loop } from "@/types/loop";
import { BrutalistButton } from "./ui/brutalist-button";

interface LoopItemProps {
  loop: Loop;
  onToggle: () => void;
  onDelete: () => void;
}

const LoopItem = ({ loop, onToggle, onDelete }: LoopItemProps) => {
  return (
    <div
      className={`border-4 ${
        loop.completed ? "border-muted bg-muted/20" : "border-primary bg-card"
      } p-6 flex items-start gap-4 group hover:translate-x-1 transition-transform`}
    >
      {/* Checkbox */}
      <button
        onClick={onToggle}
        className={`flex-shrink-0 w-8 h-8 border-4 ${
          loop.completed
            ? "border-primary bg-secondary"
            : "border-primary bg-background"
        } flex items-center justify-center hover:bg-secondary transition-colors focus:outline-none focus:ring-4 focus:ring-ring`}
        aria-label={loop.completed ? "Mark as open" : "Mark as completed"}
        aria-pressed={loop.completed}
      >
        {loop.completed && <Check size={20} className="text-primary" strokeWidth={4} />}
      </button>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-lg font-mono break-words ${
            loop.completed
              ? "line-through text-muted-foreground"
              : "text-foreground font-bold"
          }`}
        >
          {loop.text}
        </p>
        {loop.completedAt && (
          <p className="text-sm text-muted-foreground mt-2">
            Closed {new Date(loop.completedAt).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Delete */}
      <BrutalistButton
        variant="ghost"
        size="icon"
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
        aria-label="Delete loop"
      >
        <Trash2 size={20} />
      </BrutalistButton>
    </div>
  );
};

export default LoopItem;
