import React from "react";
import NeetpgDashboardHero from "../../components/dashboard/neetpg/NeetpgDashboardHero";
import NeetPgPredictorCTA from "../../components/dashboard/neetpg/NeetPgPredictorCTA";
import NeetpgUpdates from "../../components/dashboard/neetpg/NeetpgUpdates";
import NeetpgDataInsights from "../../components/dashboard/neetpg/NeetpgDataInsights";
import NeetpgCounsellingInfo from "../../components/dashboard/neetpg/NeetpgCounsellingInfo";

function NeetpgDashboard() {
  return (
    <div>
      <NeetpgDashboardHero />
      <NeetPgPredictorCTA />
      <NeetpgUpdates />
      <NeetpgDataInsights />
      <NeetpgCounsellingInfo />
    </div>
  );
}

export default NeetpgDashboard;
