import logo from "@/assets/kantacanta-logo.png";
import heroBanner from "@/assets/kanta-hero-banner.png";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Hero Banner Image */}
      <div className="w-full">
        <img 
          src={heroBanner} 
          alt="KantaCanta - Custom Music Creation" 
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Logo overlay */}
      <div className="bg-primary py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <img 
              src={logo} 
              alt="KantaCanta - Your Story. Your Song. Your Vibe." 
              className="w-full max-w-5xl h-auto mix-blend-multiply" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;