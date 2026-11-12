import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Leaf, LogOut, Camera, Upload, Loader2 } from "lucide-react";
import ImageUploader from "@/components/ImageUploader";
import AnalysisResult from "@/components/AnalysisResult";
import CommonDiseases from "@/components/CommonDiseases";
import PreventionTips from "@/components/PreventionTips";
import HeroSection from "@/components/HeroSection";

export interface AnalysisData {
  isHealthy: boolean;
  diseaseName?: string;
  confidence: number;
  description: string;
  cures: {
    name: string;
    description: string;
    isRecommended: boolean;
    reason?: string;
  }[];
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const handleImageSelect = (imageData: string) => {
    setSelectedImage(imageData);
    setAnalysisResult(null);
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setAnalyzing(true);
    try {
      const response = await supabase.functions.invoke("analyze-plant", {
        body: { image: selectedImage },
      });

      if (response.error) {
        throw new Error(response.error.message || "Analysis failed");
      }

      setAnalysisResult(response.data);
      toast({
        title: "Analysis Complete",
        description: response.data.isHealthy
          ? "Your plant appears to be healthy!"
          : `Disease detected: ${response.data.diseaseName}`,
      });
    } catch (error: any) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    navigate("/auth");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-hero leaf-pattern">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-nature flex items-center justify-center shadow-soft">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-display font-bold text-foreground">PlantDoc</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user.email}
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        {!selectedImage && <HeroSection />}

        {/* Upload Section */}
        <section className="mb-12">
          {!selectedImage ? (
            <ImageUploader onImageSelect={handleImageSelect} />
          ) : (
            <div className="max-w-2xl mx-auto">
              <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden animate-scale-in">
                <div className="aspect-video relative">
                  <img
                    src={selectedImage}
                    alt="Selected plant"
                    className="w-full h-full object-contain bg-muted"
                  />
                </div>
                <div className="p-6 flex flex-col sm:flex-row gap-4">
                  {!analysisResult ? (
                    <>
                      <Button
                        variant="hero"
                        size="lg"
                        className="flex-1"
                        onClick={analyzeImage}
                        disabled={analyzing}
                      >
                        {analyzing ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Camera className="w-5 h-5" />
                            Analyze Plant
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={resetAnalysis}
                        disabled={analyzing}
                      >
                        Choose Another
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full"
                      onClick={resetAnalysis}
                    >
                      <Upload className="w-5 h-5" />
                      Analyze Another Plant
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Analysis Result */}
        {analysisResult && (
          <section className="mb-12 animate-slide-up">
            <AnalysisResult data={analysisResult} />
          </section>
        )}

        {/* Common Diseases Section */}
        {!selectedImage && (
          <>
            <CommonDiseases />
            <PreventionTips />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="w-5 h-5 text-primary" />
            <span className="font-display font-semibold text-foreground">PlantDoc</span>
          </div>
          <p className="text-sm text-muted-foreground">
            AI-powered plant disease detection for healthier crops
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
