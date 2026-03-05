import { Check, Trash2, Star, StarOff } from "lucide-react";
import { Loop, CATEGORIES, REFLECTION_REASONS } from "@/types/loop";
import { BrutalistButton } from "./ui/brutalist-button";

interface LoopItemProps {
  loop: Loop;
  onToggle: () => void;
  onDelete: () => void;
  onFocus?: () => void;
  onUnfocus?: () => void;
  showCategory?: boolean;
}

const LoopItem = ({ loop, onToggle, onDelete, onFocus, onUnfocus, showCategory = true }: LoopItemProps) => {
  const cat = CATEGORIES.find((c) => c.value === loop.category);
  const reason = REFLECTION_REASONS.find((r) => r.value === loop.reflection_reason);

  return (
    <div
      className={`border-4 ${
        loop.is_focused && !loop.completed
          ? "border-accent bg-accent/10"
          : loop.completed
          ? "border-muted bg-muted/20"
          : "border-primary bg-card"
      } p-6 flex items-start gap-4 group hover:translate-x-1 transition-transform`}
    >
      {/* Checkbox */}
      <button
        onClick={onToggle}
        className={`flex-shrink-0 w-8 h-8 border-4 ${
          loop.completed ? "border-primary bg-secondary" : "border-primary bg-background"
        } flex items-center justify-center hover:bg-secondary transition-colors focus:outline-none focus:ring-4 focus:ring-ring`}
        aria-label={loop.completed ? "Mark as open" : "Mark as completed"}
        aria-pressed={loop.completed}
      >
        {loop.completed && <Check size={20} className="text-primary" strokeWidth={4} />}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          {showCategory && cat && (
            <span className="text-xs font-mono font-bold border-2 border-muted px-2 py-0.5 text-muted-foreground">
              {cat.emoji} {cat.label}
            </span>
          )}
          {loop.is_focused && !loop.completed && (
            <span className="text-xs font-mono font-bold border-2 border-accent px-2 py-0.5 text-accent">
              ★ FOCUS
            </span>
          )}
        </div>
        <p
          className={`text-lg font-mono break-words mt-1 ${
            loop.completed ? "line-through text-muted-foreground" : "text-foreground font-bold"
          }`}
        >
          {loop.text}
        </p>

        {/* Reflection info on closed loops */}
        {loop.completed && reason && (
          <p className="text-sm text-muted-foreground mt-2 font-mono">
            {reason.emoji} {reason.label}
            {loop.reflection_note && ` — "${loop.reflection_note}"`}
          </p>
        )}

        {loop.completed_at && (
          <p className="text-sm text-muted-foreground mt-1">
            Closed {new Date(loop.completed_at).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Focus button */}
      {!loop.completed && (onFocus || onUnfocus) && (
        <BrutalistButton
          variant="ghost"
          size="icon"
          onClick={loop.is_focused ? onUnfocus : onFocus}
          className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label={loop.is_focused ? "Remove from focus" : "Add to focus"}
        >
          {loop.is_focused ? <StarOff size={20} /> : <Star size={20} />}
        </BrutalistButton>
      )}

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
