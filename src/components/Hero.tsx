import { Button } from "@/components/ui/button";
import logo from "@/assets/kantacanta-logo.png";

const Hero = () => {
  const scrollToForm = () => {
    document.getElementById("order-form")?.scrollIntoView({
      behavior: "smooth"
    });
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] py-8 overflow-hidden">
      {/* Navigation */}
      <nav className="container mx-auto px-4 mb-12">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-6 py-2 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-all"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="px-6 py-2 text-gray-300 font-medium hover:text-white transition-all"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="px-6 py-2 text-gray-300 font-medium hover:text-white transition-all"
            >
              Testimonials
            </button>
            <button 
              onClick={() => scrollToSection('order-form')}
              className="px-6 py-2 text-gray-300 font-medium hover:text-white transition-all"
            >
              Contact
            </button>
          </div>
          
          {/* Get Started Button */}
          <Button 
            onClick={scrollToForm}
            className="px-8 py-6 rounded-full bg-gradient-warm text-white font-semibold text-lg hover:opacity-90 transition-all hover:scale-105 shadow-glow"
          >
            Get Started
          </Button>
        </div>
      </nav>

      {/* Main Content - Red Card with Logo */}
      <div className="container mx-auto px-4 flex justify-center items-center">
        <div className="bg-primary rounded-3xl p-12 md:p-16 lg:p-20 max-w-3xl w-full shadow-2xl">
          {/* Icon - Blue squares and circles */}
          <div className="flex justify-center mb-8">
            <div className="grid grid-cols-2 gap-2">
              <div className="w-12 h-12 bg-secondary rounded-sm"></div>
              <div className="w-12 h-12 bg-secondary rounded-sm"></div>
              <div className="w-10 h-10 bg-secondary rounded-full mx-auto"></div>
              <div className="w-10 h-10 bg-secondary rounded-full mx-auto"></div>
            </div>
          </div>

          {/* Logo Text */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center mb-6 font-serif">
            KantaCanta
          </h1>

          {/* Tagline */}
          <p className="text-secondary/80 text-center text-lg md:text-xl tracking-widest font-medium">
            YOUR STORY. YOUR SONG. YOUR VIBE.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
