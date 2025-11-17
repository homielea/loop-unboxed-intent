import { X } from "lucide-react";
import { BrutalistButton } from "./ui/brutalist-button";

interface ShortcutsHelpProps {
  onClose: () => void;
}

const ShortcutsHelp = ({ onClose }: ShortcutsHelpProps) => {
  const shortcuts = [
    { key: "?", description: "Show/hide this help" },
    { key: "N or Enter", description: "Focus input to add new loop" },
    { key: "Escape", description: "Close dialog or clear input" },
    { key: "Space", description: "Toggle loop completion (when focused)" },
    { key: "Delete", description: "Delete loop (when focused)" },
  ];

  return (
    <div 
      className="fixed inset-0 bg-background/90 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-title"
    >
      <div className="border-4 border-primary bg-card max-w-2xl w-full hard-shadow">
        {/* Header */}
        <div className="border-b-4 border-primary p-6 flex items-center justify-between bg-secondary">
          <h2 id="shortcuts-title" className="text-2xl font-bold">
            [KEYBOARD_SHORTCUTS]
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-primary hover:text-primary-foreground transition-colors border-2 border-primary"
            aria-label="Close shortcuts help"
          >
            <X size={24} />
          </button>
        </div>

        {/* Shortcuts List */}
        <div className="p-8">
          <div className="space-y-4">
            {shortcuts.map((shortcut, index) => (
              <div 
                key={index}
                className="flex items-center gap-6 pb-4 border-b-2 border-muted last:border-0"
              >
                <kbd className="inline-flex items-center justify-center min-w-[80px] px-4 py-2 text-lg font-bold border-4 border-primary bg-secondary text-secondary-foreground">
                  {shortcut.key}
                </kbd>
                <span className="text-lg">{shortcut.description}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t-4 border-primary">
            <BrutalistButton 
              variant="primary" 
              onClick={onClose}
              className="w-full"
            >
              GOT IT
            </BrutalistButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortcutsHelp;
