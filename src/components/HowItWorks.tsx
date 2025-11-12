import { Upload, Wand2, Music, Download } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Share Your Vision",
    description: "Fill out our form with details about your special moment, upload reference songs, and share your lyrics or let us write them.",
  },
  {
    icon: Wand2,
    title: "We Create Magic",
    description: "Our team crafts a personalized song tailored to your story, style preferences, and occasion.",
  },
  {
    icon: Music,
    title: "Review & Refine",
    description: "Listen to your custom song and request any adjustments to make it absolutely perfect.",
  },
  {
    icon: Download,
    title: "Download & Enjoy",
    description: "Get your final song in high quality, ready to make your special moment truly unforgettable.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to your perfect personalized song
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative group"
              >
                <div className="bg-card border border-border rounded-2xl p-6 h-full shadow-soft hover:shadow-glow transition-smooth">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-warm flex items-center justify-center shadow-glow">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-semibold text-primary">
                        Step {index + 1}
                      </div>
                      <h3 className="text-xl font-bold text-card-foreground">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
