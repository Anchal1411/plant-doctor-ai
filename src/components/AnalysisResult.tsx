import { CheckCircle2, AlertTriangle, Pill, Star, Info } from "lucide-react";
import { AnalysisData } from "@/pages/Index";

interface AnalysisResultProps {
  data: AnalysisData;
}

const AnalysisResult = ({ data }: AnalysisResultProps) => {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Status Card */}
      <div
        className={`rounded-2xl p-6 mb-6 ${
          data.isHealthy
            ? "bg-success/10 border-2 border-success/30"
            : "bg-destructive/10 border-2 border-destructive/30"
        }`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`w-14 h-14 rounded-xl flex items-center justify-center ${
              data.isHealthy ? "bg-success" : "bg-destructive"
            }`}
          >
            {data.isHealthy ? (
              <CheckCircle2 className="w-7 h-7 text-success-foreground" />
            ) : (
              <AlertTriangle className="w-7 h-7 text-destructive-foreground" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-display font-bold text-foreground">
                {data.isHealthy ? "Healthy Plant" : data.diseaseName}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  data.isHealthy
                    ? "bg-success/20 text-success"
                    : "bg-destructive/20 text-destructive"
                }`}
              >
                {Math.round(data.confidence * 100)}% confidence
              </span>
            </div>
            <p className="text-muted-foreground">{data.description}</p>
          </div>
        </div>
      </div>

      {/* Cures Section */}
      {!data.isHealthy && data.cures && data.cures.length > 0 && (
        <div className="bg-card rounded-2xl shadow-card border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Pill className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-display font-semibold text-foreground">
              Treatment Options
            </h3>
          </div>

          <div className="space-y-4">
            {data.cures.map((cure, index) => (
              <div
                key={index}
                className={`rounded-xl p-4 transition-all ${
                  cure.isRecommended
                    ? "bg-primary/5 border-2 border-primary/30"
                    : "bg-muted border border-border"
                }`}
              >
                <div className="flex items-start gap-3">
                  {cure.isRecommended && (
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                      <Star className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground">{cure.name}</h4>
                      {cure.isRecommended && (
                        <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">
                      {cure.description}
                    </p>
                    {cure.isRecommended && cure.reason && (
                      <div className="flex items-start gap-2 mt-3 p-3 bg-primary/10 rounded-lg">
                        <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-foreground">
                          <span className="font-medium">Why recommended:</span>{" "}
                          {cure.reason}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Healthy Plant Tips */}
      {data.isHealthy && (
        <div className="bg-card rounded-2xl shadow-card border border-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-success" />
            </div>
            <h3 className="text-xl font-display font-semibold text-foreground">
              Keep Your Plant Healthy
            </h3>
          </div>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-success">•</span>
              Continue regular watering schedule
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">•</span>
              Ensure adequate sunlight exposure
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">•</span>
              Monitor for any signs of stress or disease
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">•</span>
              Maintain proper soil nutrition
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AnalysisResult;
