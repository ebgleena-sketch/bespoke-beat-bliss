import { Music, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/kantacanta-logo.png";

const Hero = () => {
  const scrollToForm = () => {
    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-primary">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-background/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex justify-center mb-8">
            <img 
              src={logo} 
              alt="KantaCanta - Your Story. Your Song. Your Vibe." 
              className="w-full max-w-2xl h-auto"
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-secondary leading-tight">
            Create the Perfect Song for{" "}
            <span className="text-background font-extrabold">
              Every Special Moment
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-background/90 max-w-2xl mx-auto">
            From walk-up songs to wedding marches, birthday celebrations to brand anthems — 
            we craft personalized songs that make your moments unforgettable.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              className="bg-secondary hover:bg-secondary/90 text-white transition-smooth shadow-glow text-lg px-8 py-6"
              onClick={scrollToForm}
            >
              <Music className="w-5 h-5 mr-2" />
              Create Your Song
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 border-2 border-background bg-background/10 text-background hover:bg-background hover:text-primary"
              onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Pricing
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
