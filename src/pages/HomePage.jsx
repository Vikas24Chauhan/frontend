import React from "react";
import Hero from "../components/ui/home/Hero";
import Chaos from "../components/ui/home/Chaos";
import Features from "../components/ui/home/Features";
import SupportSection from "../components/ui/home/SupportSection";
import HomeFaqs from "../components/ui/home/HomeFaqs";
import { pageSEO } from "../seo/pageSEO";
import SEO from "../seo/SEO";

function HomePage() {
  const seo = pageSEO["/"];

  return (
    <div>
      <SEO {...seo} />

      <Hero />
      <Chaos />
      <Features />
      <SupportSection />
      <HomeFaqs />
    </div>
  );
}

export default HomePage;
