import React from "react";
import NeetpgHero from "../components/ui/neetpg/NeetpgHero";
import NeetpgFeatures from "../components/ui/neetpg/NeetpgFeatures";
import NeetpgOverview from "../components/ui/neetpg/NeetpgOverview";
import NeetpgFaqs from "../components/ui/neetpg/NeetpgFaqs";

function NeetpgPage() {
  return (
    <div>
      <NeetpgHero />
      <NeetpgFeatures />
      <NeetpgOverview />
      <NeetpgFaqs />
    </div>
  );
}

export default NeetpgPage;
