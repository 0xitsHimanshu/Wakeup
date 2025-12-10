'use client'

import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { BentoGrid } from "@/components/bento-grid";
import { FAQSection } from "@/components/faq-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { Leva } from "leva";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Leva hidden />
      <BentoGrid />
      <FAQSection />
      <CTASection />
      <Footer />
    </>
  );
}
