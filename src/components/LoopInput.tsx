import { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";
import { BrutalistButton } from "./ui/brutalist-button";

interface LoopInputProps {
  onAdd: (text: string) => void;
  focusTrigger?: number;
}

const LoopInput = ({ onAdd, focusTrigger }: LoopInputProps) => {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focusTrigger && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focusTrigger]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
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
    </form>
  );
};

export default LoopInput;
