import { Loop } from "@/types/loop";
import LoopItem from "./LoopItem";

interface LoopListProps {
  loops: Loop[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  title: string;
  emptyMessage: string;
}

const LoopList = ({ loops, onToggle, onDelete, title, emptyMessage }: LoopListProps) => {
  return (
    <section className="mb-12">
      <div className="mb-6 inline-block border-4 border-primary bg-secondary px-4 py-2">
        <h2 className="text-xl font-bold">
          {title} ({loops.length})
        </h2>
      </div>

      {loops.length === 0 ? (
        <div className="border-4 border-muted bg-muted/20 p-12 text-center">
          <p className="text-xl text-muted-foreground font-mono">{emptyMessage}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {loops.map((loop) => (
            <LoopItem
              key={loop.id}
              loop={loop}
              onToggle={() => onToggle(loop.id)}
              onDelete={() => onDelete(loop.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default LoopList;
