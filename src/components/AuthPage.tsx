import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { BrutalistButton } from "./ui/brutalist-button";
import { toast } from "sonner";
import GridOverlay from "./GridOverlay";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast.success("Check your email to confirm your account");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Auth failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) throw result.error;
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <GridOverlay />
      <div className="min-h-screen flex items-center justify-center relative">
        <div className="w-full max-w-md mx-4 relative z-10">
          {/* Header */}
          <div className="mb-8 inline-block border-4 border-primary bg-secondary px-4 py-2">
            <h1 className="text-2xl font-bold">[LOOP_CLOSING]</h1>
          </div>
          <p className="text-lg text-muted-foreground font-mono mb-8">
            {isSignUp ? "Create your account" : "Sign in to sync your loops"}
          </p>

          {/* Google */}
          <BrutalistButton
            variant="secondary"
            size="lg"
            className="w-full mb-6"
            onClick={handleGoogle}
            disabled={loading}
          >
            CONTINUE WITH GOOGLE
          </BrutalistButton>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-1 bg-primary" />
            <span className="text-sm font-bold text-muted-foreground">OR</span>
            <div className="flex-1 h-1 bg-primary" />
          </div>

          {/* Email form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="EMAIL"
              required
              className="w-full h-14 px-6 text-lg font-mono border-4 border-primary bg-background focus:outline-none focus:ring-4 focus:ring-secondary placeholder:text-muted-foreground"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="PASSWORD"
              required
              minLength={6}
              className="w-full h-14 px-6 text-lg font-mono border-4 border-primary bg-background focus:outline-none focus:ring-4 focus:ring-secondary placeholder:text-muted-foreground"
            />
            <BrutalistButton
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {isSignUp ? "SIGN UP" : "SIGN IN"}
            </BrutalistButton>
          </form>

          {/* Toggle */}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="mt-6 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors underline"
          >
            {isSignUp ? "Already have an account? Sign in" : "Need an account? Sign up"}
          </button>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
