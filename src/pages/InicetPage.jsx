import React from "react";
import InicetHero from "../components/ui/inicet/InicetHero";
import InicetFeatures from "../components/ui/inicet/InicetFeatures";
import InicetOverview from "../components/ui/inicet/InicetOverview";
import InicetFaqs from "../components/ui/inicet/InicetFaqs";

function InicetPage() {
  return (
    <div>
      <InicetHero />
      <InicetFeatures />
      <InicetOverview />
      <InicetFaqs />
    </div>
  );
}

export default InicetPage;
