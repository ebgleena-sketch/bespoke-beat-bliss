import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import Hero from "@/components/Hero";
import Occasions from "@/components/Occasions";
import HowItWorks from "@/components/HowItWorks";
import SampleSongs from "@/components/SampleSongs";
import Pricing from "@/components/Pricing";
import OrderForm from "@/components/OrderForm";

const Index = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const payment = searchParams.get("payment");
    if (payment === "success") {
      toast.success("🎵 Payment successful! We'll be in touch within 24 hours to start your song.");
    } else if (payment === "cancelled") {
      toast.info("Order cancelled. Feel free to place your order whenever you're ready.");
    }
  }, [searchParams]);

  return (
    <main className="min-h-screen">
      <Hero />
      <Occasions />
      <HowItWorks />
      <SampleSongs />
      <Pricing />
      <OrderForm />
      
      {/* Footer */}
      <footer className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] border-t border-white/10 py-8">
        <div className="container mx-auto px-4 text-center text-gray-300 space-y-2">
          <p>© 2024 KantaCanta. Making every moment unforgettable.</p>
          <p>
            <a href="mailto:contact@kantacanta.com" className="text-secondary hover:underline">
              contact@kantacanta.com
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
