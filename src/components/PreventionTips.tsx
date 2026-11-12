import { Shield, Droplet, Sprout, Bug, Sun, Wind, Leaf, CheckCircle } from "lucide-react";

const tips = [
  {
    icon: Sprout,
    title: "Use Certified Seeds",
    description:
      "Always plant disease-free, certified seeds from reputable sources. This prevents introducing pathogens into your fields.",
  },
  {
    icon: Droplet,
    title: "Proper Irrigation",
    description:
      "Avoid overwatering and ensure proper drainage. Fungal diseases thrive in wet conditions. Water at the base of plants.",
  },
  {
    icon: Wind,
    title: "Adequate Spacing",
    description:
      "Maintain proper plant spacing for good air circulation. Crowded plants create humid conditions that promote disease.",
  },
  {
    icon: Sun,
    title: "Crop Rotation",
    description:
      "Rotate crops annually to break disease cycles. Don't plant the same crop family in the same location consecutively.",
  },
  {
    icon: Bug,
    title: "Pest Management",
    description:
      "Control insect vectors that spread diseases. Use integrated pest management (IPM) techniques for sustainable control.",
  },
  {
    icon: Shield,
    title: "Soil Health",
    description:
      "Maintain healthy soil with proper pH and nutrients. Healthy plants are more resistant to diseases.",
  },
  {
    icon: Leaf,
    title: "Remove Infected Parts",
    description:
      "Promptly remove and destroy infected plant parts. Don't compost diseased material as it can spread pathogens.",
  },
  {
    icon: CheckCircle,
    title: "Regular Monitoring",
    description:
      "Inspect crops regularly for early signs of disease. Early detection allows for timely intervention.",
  },
];

const PreventionTips = () => {
  return (
    <section className="mb-12">
      <div className="bg-gradient-nature rounded-3xl p-8 md:p-12 text-primary-foreground">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/20 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Shield className="w-4 h-4" />
            Prevention Guide
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
            Prevent Crop Diseases
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Follow these best practices to keep your crops healthy and minimize disease risk.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <div
                key={tip.title}
                className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 hover:bg-primary-foreground/20 transition-all duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{tip.title}</h3>
                <p className="text-primary-foreground/80 text-sm">{tip.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PreventionTips;
