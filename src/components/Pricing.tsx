import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";


const pricingTiers = [
  {
    name: "Walk-Up Song",
    price: "$99",
    originalPrice: "$150",
    introductory: true,
    description: "Quick, powerful entrance music",
    features: [
      "30-60 seconds",
      "Lyrics provided",
      "AI-generated vocals",
      "High quality audio",
      "2 revisions included",
      "$20 per additional revision"
    ]
  },
  {
    name: "Personal Songs",
    price: "$150",
    originalPrice: "$250",
    introductory: true,
    description: "Wedding, proposal, birthday songs",
    features: [
      "1-2 minutes",
      "Full custom lyrics",
      "AI-generated vocals",
      "3-4 custom details",
      "High quality audio",
      "2 revisions included",
      "$20 per additional revision"
    ],
    popular: true
  },
  {
    name: "Professional Sonic Branding/Jingle",
    price: "$600+",
    description: "Commercial-ready production",
    features: [
      "Full-length song",
      "Commercial license included",
      "Multiple format deliveries",
      "20 revisions",
      "Priority support",
      "Source files included"
    ],
    blueButton: true
  }
];

const Pricing = () => {
  const scrollToForm = () => {
    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Perfect Package
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            From quick personalized moments to full commercial productions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`relative bg-background border-2 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-smooth ${
                tier.popular ? "border-secondary scale-105" : "border-background/20"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-secondary rounded-full shadow-lg">
                  <span className="text-sm font-semibold text-background">Most Popular</span>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-foreground/70 text-sm mb-3">
                    {tier.description}
                  </p>
                  <div className="flex items-center gap-2">
                    {tier.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        {tier.originalPrice}
                      </span>
                    )}
                    <span className="text-3xl font-bold text-secondary">
                      {tier.price}
                    </span>
                  </div>
                  {tier.introductory && (
                    <span className="text-xs text-secondary font-semibold">
                      Introductory Price
                    </span>
                  )}
                </div>

                <ul className="space-y-2">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    tier.popular
                      ? "bg-secondary hover:bg-secondary/90 text-background shadow-lg"
                      : tier.blueButton
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-primary hover:bg-primary/90 text-background"
                  }`}
                  onClick={scrollToForm}
                >
                  Get Started
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-white font-semibold">
            Extra $150 to own the rights to the song
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
