import { ArrowRight, Zap, X, Check } from "lucide-react";
import { BrutalistButton } from "./ui/brutalist-button";

interface LandingProps {
  onEnterApp: () => void;
}

const Landing = ({ onEnterApp }: LandingProps) => {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative border-b-4 border-primary">
        <div className="brutalist-container py-20 relative z-10">
          <div className="max-w-4xl">
            {/* Marker */}
            <div className="mb-8 inline-block border-4 border-primary bg-secondary px-4 py-2">
              <span className="text-sm font-bold">[SECTION_01]</span>
            </div>
            
            {/* Main Headline - Asymmetric */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-none glitch">
              CLOSE
              <br />
              <span className="ml-12 md:ml-24">YOUR</span>
              <br />
              <span className="text-secondary">LOOPS</span>
            </h1>
            
            {/* Manifesto */}
            <div className="border-l-8 border-primary pl-6 mb-12 max-w-2xl">
              <p className="text-xl md:text-2xl mb-4 font-bold">
                Every unfinished task drains your mental bandwidth.
              </p>
              <p className="text-lg md:text-xl text-muted-foreground">
                Open loops = scattered attention. 
                <br />
                This tool helps you capture, confront, and close them.
                <br />
                Fast. Deliberate. No fluff.
              </p>
            </div>

            {/* CTA */}
            <BrutalistButton 
              variant="secondary" 
              size="lg"
              onClick={onEnterApp}
              className="group"
            >
              START CLOSING
              <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={28} />
            </BrutalistButton>
          </div>
        </div>

        {/* Large decorative text */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[20vw] font-bold opacity-5 pointer-events-none select-none">
          LOOP
        </div>
      </section>

      {/* How It Works Section */}
      <section className="min-h-screen flex items-center relative border-b-4 border-primary">
        <div className="brutalist-container py-20 relative z-10 w-full">
          <div className="mb-8 inline-block border-4 border-primary bg-background px-4 py-2">
            <span className="text-sm font-bold">[SECTION_02]</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold mb-16">
            HOW IT
            <br />
            <span className="ml-16">WORKS</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl">
            {/* Step 1 */}
            <div className="border-4 border-primary bg-card p-8 hard-shadow">
              <div className="text-6xl font-bold text-secondary mb-4">01</div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Zap size={28} />
                CAPTURE
              </h3>
              <p className="text-lg">
                Brain dump everything. Todos, ideas, promises. Get it out of your head, fast.
              </p>
            </div>

            {/* Step 2 */}
            <div className="border-4 border-primary bg-card p-8 hard-shadow md:mt-12">
              <div className="text-6xl font-bold text-secondary mb-4">02</div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <X size={28} />
                REVIEW
              </h3>
              <p className="text-lg">
                See all your open loops in one place. No hiding. Face them head-on.
              </p>
            </div>

            {/* Step 3 */}
            <div className="border-4 border-primary bg-card p-8 hard-shadow md:mt-24">
              <div className="text-6xl font-bold text-secondary mb-4">03</div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Check size={28} />
                CLOSE
              </h3>
              <p className="text-lg">
                Mark as done with intention. Feel the weight lift. Move forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="min-h-screen flex items-center relative">
        <div className="brutalist-container py-20 relative z-10">
          <div className="mb-8 inline-block border-4 border-primary bg-secondary px-4 py-2">
            <span className="text-sm font-bold">[SECTION_03]</span>
          </div>

          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-7xl font-bold mb-12">
              ANTI-
              <br />
              <span className="ml-12">PRODUCTIVITY</span>
              <br />
              <span className="text-accent">THEATER</span>
            </h2>

            <div className="space-y-6 text-xl border-l-8 border-primary pl-8">
              <p className="font-bold">No gamification.</p>
              <p className="font-bold">No streaks.</p>
              <p className="font-bold">No artificial dopamine hits.</p>
              <p className="mt-8">
                Just you, your commitments, and the satisfaction of actually finishing what you started.
              </p>
            </div>

            <div className="mt-16">
              <BrutalistButton 
                variant="primary" 
                size="lg"
                onClick={onEnterApp}
              >
                ENTER APP
                <ArrowRight className="ml-3" size={28} />
              </BrutalistButton>
            </div>
          </div>
        </div>

        {/* Vertical accent line */}
        <div className="absolute right-20 top-0 bottom-0 w-2 bg-accent hidden lg:block" />
      </section>
    </div>
  );
};

export default Landing;
