import { Leaf, Sparkles, Shield, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="text-center mb-12 animate-fade-in">
      <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
        <Sparkles className="w-4 h-4" />
        AI-Powered Analysis
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4">
        Detect Plant Diseases
        <br />
        <span className="text-gradient">Instantly</span>
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
        Upload a photo of your plant and let our AI analyze its health.
        Get instant diagnosis and treatment recommendations.
      </p>
      
      <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
            <Shield className="w-4 h-4 text-success" />
          </div>
          <span>Accurate Detection</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary" />
          </div>
          <span>Instant Results</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
            <Leaf className="w-4 h-4 text-accent" />
          </div>
          <span>Expert Recommendations</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
