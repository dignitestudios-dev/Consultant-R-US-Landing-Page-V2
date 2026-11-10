import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ProductDemo } from "@/components/product-demo";
import { TrustBar } from "@/components/trust-bar";
import { AudienceSection } from "@/components/audience";
import { HowItWorks } from "@/components/how-it-works";
import { AppSection } from "@/components/app-section";
import { FaqSection } from "@/components/faq";
import { DemoSection } from "@/components/demo-form";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top" className="flex-1">
        <Hero />
        <ProductDemo />
        <TrustBar />
        <AudienceSection />
        <HowItWorks />
        <AppSection />
        <FaqSection />
        <DemoSection />
      </main>
      <Footer />
    </>
  );
}
