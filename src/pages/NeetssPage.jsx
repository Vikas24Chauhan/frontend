import React from "react";
import NeetssHero from "../components/ui/neetss/NeetssHero";
import NeetssFeatures from "../components/ui/neetss/NeetssFeatures";
import NeetssOverview from "../components/ui/neetss/NeetssOverview";
import NeetssFaqs from "../components/ui/neetss/NeetssFaqs";

function NeetssPage() {
  return (
    <div>
      <NeetssHero />
      <NeetssFeatures />
      <NeetssOverview />
      <NeetssFaqs />
    </div>
  );
}

export default NeetssPage;
