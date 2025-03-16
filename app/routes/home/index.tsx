import Footer from "./layout/footer";
import Header from "./layout/header";
import CtaSection from "./sections/cta";
import HeroSection from "./sections/hero";
import PricingSection from "./sections/pricing";
import SolutionsSection from "./sections/solutions";

export default function Home() {
  return (
    <div className="bg-white font-sans text-gray-800">
      <Header />
      <HeroSection />
      <SolutionsSection />
      <PricingSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
