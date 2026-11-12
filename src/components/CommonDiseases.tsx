import { Bug, Droplets, Sun, Wind } from "lucide-react";

const diseases = [
  {
    name: "Rice Blast",
    crop: "Rice",
    icon: Wind,
    description:
      "A fungal disease caused by Magnaporthe oryzae. Shows diamond-shaped lesions on leaves with gray centers and brown margins.",
    symptoms: ["Diamond-shaped leaf spots", "Gray lesions with brown borders", "Wilting of infected parts"],
  },
  {
    name: "Late Blight",
    crop: "Potato/Tomato",
    icon: Droplets,
    description:
      "Caused by Phytophthora infestans. Appears as water-soaked spots that turn brown. Common in humid conditions.",
    symptoms: ["Water-soaked dark spots", "White fuzzy growth on undersides", "Rapid plant decay"],
  },
  {
    name: "Cotton Leaf Curl",
    crop: "Cotton",
    icon: Bug,
    description:
      "A viral disease spread by whiteflies. Causes upward curling of leaves and stunted growth in cotton plants.",
    symptoms: ["Upward leaf curling", "Vein thickening", "Stunted plant growth"],
  },
  {
    name: "Wheat Rust",
    crop: "Wheat",
    icon: Sun,
    description:
      "Fungal infection causing orange-brown pustules on leaves and stems. Can devastate wheat crops if untreated.",
    symptoms: ["Orange-brown pustules", "Yellow halos around spots", "Reduced grain quality"],
  },
  {
    name: "Bacterial Leaf Blight",
    crop: "Rice",
    icon: Droplets,
    description:
      "Caused by Xanthomonas oryzae. Creates yellow-orange stripes along leaf margins that eventually turn white.",
    symptoms: ["Wavy yellow margins", "Graying leaf tips", "Bacterial ooze droplets"],
  },
  {
    name: "Powdery Mildew",
    crop: "Multiple Crops",
    icon: Wind,
    description:
      "Fungal disease appearing as white powdery coating on leaves. Common in cucurbits, grapes, and various vegetables.",
    symptoms: ["White powdery coating", "Yellowing leaves", "Distorted growth"],
  },
];

const CommonDiseases = () => {
  return (
    <section className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-foreground mb-3">
          Common Indian Crop Diseases
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Learn about prevalent plant diseases affecting crops in India. Early identification
          is key to effective treatment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {diseases.map((disease, index) => {
          const Icon = disease.icon;
          return (
            <div
              key={disease.name}
              className="bg-card rounded-2xl shadow-card border border-border p-6 hover:shadow-elevated transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground text-lg">
                    {disease.name}
                  </h3>
                  <span className="text-sm text-primary font-medium">{disease.crop}</span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-4">{disease.description}</p>
              <div className="border-t border-border pt-4">
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                  Key Symptoms
                </h4>
                <ul className="space-y-1">
                  {disease.symptoms.map((symptom, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
                      {symptom}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CommonDiseases;
