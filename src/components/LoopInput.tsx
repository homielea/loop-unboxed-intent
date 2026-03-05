import { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";
import { BrutalistButton } from "./ui/brutalist-button";
import { CATEGORIES, type LoopCategory } from "@/types/loop";

interface LoopInputProps {
  onAdd: (text: string, category: LoopCategory) => void;
  focusTrigger?: number;
}

const LoopInput = ({ onAdd, focusTrigger }: LoopInputProps) => {
  const [text, setText] = useState("");
  const [category, setCategory] = useState<LoopCategory>("other");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focusTrigger && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focusTrigger]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim(), category);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-3">
      <div className="flex gap-4">
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="WHAT'S ON YOUR MIND?"
          className="flex-1 h-14 px-6 text-lg font-mono border-4 border-primary bg-background focus:outline-none focus:ring-4 focus:ring-secondary placeholder:text-muted-foreground"
          aria-label="New loop input"
        />
        <BrutalistButton
          type="submit"
          variant="secondary"
          size="icon"
          disabled={!text.trim()}
          aria-label="Add loop"
        >
          <Plus size={28} />
        </BrutalistButton>
      </div>

      {/* Category selector */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() => setCategory(cat.value)}
            className={`border-2 px-3 py-1 font-mono text-xs font-bold transition-all ${
              category === cat.value
                ? "border-primary bg-secondary text-secondary-foreground"
                : "border-muted text-muted-foreground hover:border-primary hover:text-foreground"
            }`}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>
    </form>
  );
};

export default LoopInput;
