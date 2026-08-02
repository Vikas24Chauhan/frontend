import React from "react";
import NeetugHero from "../components/ui/neetug/NeetugHero";
import NeetugFeatures from "../components/ui/neetug/NeetugFeatures";
import NeetugOverview from "../components/ui/neetug/NeetugOverview";
import NeetugFaqs from "../components/ui/neetug/NeetugFaqs";

function NeetugPage() {
  return (
    <div>
      <NeetugHero />
      <NeetugFeatures />
      <NeetugOverview />
      <NeetugFaqs />
    </div>
  );
}

export default NeetugPage;
