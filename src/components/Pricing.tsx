import { Check, ShieldCheck } from "lucide-react";
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className="relative bg-background border-2 border-background/20 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-smooth flex flex-col"
            >
              <div className="mb-4">
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

              <ul className="space-y-2 flex-1">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full mt-6 bg-primary hover:bg-primary/90 text-background"
                onClick={scrollToForm}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 space-y-4">
          <p className="text-lg text-white font-semibold">
            Extra $150 to own the rights to the song
          </p>
          <div className="flex items-center justify-center gap-2 text-green-400">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-sm font-medium">Secured payment via Stripe</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
