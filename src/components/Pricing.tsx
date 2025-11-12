import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";


const pricingTiers = [
  {
    name: "Personal Song",
    priceRange: "$100–$250",
    description: "Great for special celebrations",
    features: [
      "1–2 minutes",
      "Full custom lyrics",
      "AI-generated vocals",
      "3–4 custom details",
      "High-quality audio",
      "1 revision included",
    ],
    popular: true,
  },
  {
    name: "Premium Song",
    priceRange: "$300–$600",
    description: "For truly unforgettable moments",
    features: [
      "2–3 minutes",
      "Full custom lyrics",
      "Custom prompt tuning",
      "Professional mastering",
      "Lyric video included",
      "2 revisions included",
    ],
  },
  {
    name: "Brand/School Anthem",
    priceRange: "$600–$1200",
    description: "Commercial-ready production",
    features: [
      "Full-length song",
      "Commercial license included",
      "Multiple format deliveries",
      "Unlimited revisions",
      "Priority support",
      "Source files included",
    ],
  },
];

const Pricing = () => {
  const scrollToForm = () => {
    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Choose Your Perfect Package
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From quick personalized moments to full commercial productions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`relative bg-card border-2 rounded-2xl p-8 shadow-soft hover:shadow-glow transition-smooth ${
                tier.popular ? "border-primary scale-105" : "border-border"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-warm rounded-full shadow-glow">
                  <span className="text-sm font-semibold text-white">Most Popular</span>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-card-foreground mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {tier.description}
                  </p>
                  <div className="text-3xl font-bold bg-gradient-warm bg-clip-text text-transparent">
                    {tier.priceRange}
                  </div>
                </div>

                <ul className="space-y-3">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-card-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    tier.popular
                      ? "bg-gradient-warm hover:opacity-90 shadow-glow"
                      : "bg-secondary hover:bg-secondary/80"
                  }`}
                  onClick={scrollToForm}
                >
                  Get Started
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
