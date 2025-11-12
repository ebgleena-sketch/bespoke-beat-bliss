import Hero from "@/components/Hero";
import Occasions from "@/components/Occasions";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import OrderForm from "@/components/OrderForm";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <Occasions />
      <HowItWorks />
      <Pricing />
      <OrderForm />
      
      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 Custom Songs. Making every moment unforgettable.</p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
