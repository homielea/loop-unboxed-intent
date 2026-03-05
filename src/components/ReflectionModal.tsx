import { useState } from "react";
import { X } from "lucide-react";
import { BrutalistButton } from "./ui/brutalist-button";
import { REFLECTION_REASONS, type ReflectionReason } from "@/types/loop";

interface ReflectionModalProps {
  loopText: string;
  onSubmit: (reason: ReflectionReason, note?: string) => void;
  onCancel: () => void;
}

const ReflectionModal = ({ loopText, onSubmit, onCancel }: ReflectionModalProps) => {
  const [selectedReason, setSelectedReason] = useState<ReflectionReason | null>(null);
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    if (!selectedReason) return;
    onSubmit(selectedReason, note.trim() || undefined);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/60">
      <div className="w-full max-w-lg mx-4 border-4 border-primary bg-background p-8 hard-shadow relative">
        {/* Close */}
        <button onClick={onCancel} className="absolute top-4 right-4" aria-label="Cancel">
          <X size={24} />
        </button>

        {/* Header */}
        <div className="mb-6 inline-block border-4 border-primary bg-secondary px-3 py-1">
          <h2 className="text-lg font-bold">[WHY_OPEN?]</h2>
        </div>

        <p className="font-mono text-muted-foreground mb-2 text-sm">Closing:</p>
        <p className="font-mono font-bold mb-6 text-lg truncate">{loopText}</p>

        <p className="font-mono font-bold mb-4">Why did this stay open?</p>

        {/* Reason tags */}
        <div className="flex flex-wrap gap-3 mb-6">
          {REFLECTION_REASONS.map((r) => (
            <button
              key={r.value}
              onClick={() => setSelectedReason(r.value)}
              className={`border-4 px-4 py-2 font-mono text-sm font-bold transition-all ${
                selectedReason === r.value
                  ? "border-primary bg-secondary text-secondary-foreground"
                  : "border-muted bg-background text-foreground hover:border-primary"
              }`}
            >
              {r.emoji} {r.label}
            </button>
          ))}
        </div>

        {/* Optional note */}
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="ANYTHING ELSE? (OPTIONAL)"
          className="w-full h-12 px-4 text-sm font-mono border-4 border-muted bg-background focus:outline-none focus:ring-4 focus:ring-secondary focus:border-primary placeholder:text-muted-foreground mb-6"
        />

        {/* Actions */}
        <div className="flex gap-4">
          <BrutalistButton
            variant="secondary"
            size="lg"
            className="flex-1"
            onClick={handleSubmit}
            disabled={!selectedReason}
          >
            CLOSE LOOP
          </BrutalistButton>
          <BrutalistButton variant="ghost" size="lg" onClick={onCancel}>
            CANCEL
          </BrutalistButton>
        </div>
      </div>
    </div>
  );
};

export default ReflectionModal;
