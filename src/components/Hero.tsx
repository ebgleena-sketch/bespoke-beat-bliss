import { Music, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/kantacanta-logo.png";
import musicArtwork from "@/assets/music-artwork.jpg";
const Hero = () => {
  const scrollToForm = () => {
    document.getElementById("order-form")?.scrollIntoView({
      behavior: "smooth"
    });
  };
  const pricingTiers = [{
    name: "Walk-Up Song",
    price: "$150",
    description: "Quick, powerful entrance music",
    features: ["30-60 seconds", "Lyrics provided", "AI-generated vocals", "High quality audio", "2 revisions included", "$20 per additional revision"]
  }, {
    name: "Personal Songs",
    price: "$250",
    description: "Wedding, proposal, birthday songs",
    features: ["1-2 minutes", "Full custom lyrics", "AI-generated vocals", "3-4 custom details", "High quality audio", "2 revisions for free", "$20 per additional revision"],
    popular: true
  }, {
    name: "Premium Song",
    price: "$385",
    description: "For truly unforgettable moments",
    features: ["2-3 minutes", "Full custom lyrics", "Professional mastering", "High quality audio", "4 revisions included", "$20 per additional revision", "Own the rights for +$150"]
  }, {
    name: "Brand/School Anthem",
    price: "$600+",
    description: "Commercial-ready production",
    features: ["Full-length song", "Commercial license included", "Multiple format deliveries", "Unlimited revisions", "Priority support", "Source files included"]
  }];
  return <section className="relative min-h-screen bg-primary py-12 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-background/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src={logo} alt="KantaCanta - Your Story. Your Song. Your Vibe." className="w-full max-w-5xl h-auto" />
          </div>

      {/* Music Artwork */}
      <div className="flex justify-center mb-12">
        <img 
          src={musicArtwork} 
          alt="Custom music creation" 
          className="w-full max-w-4xl h-auto rounded-2xl shadow-2xl"
        />
      </div>
        </div>
      </div>
    </section>;
};
export default Hero;