import React from "react";
import NeetpgDashboardHero from "../../components/dashboard/neetpg/NeetpgDashboardHero";
import NeetpgCounsellingInfo from "../../components/dashboard/neetpg/NeetpgCounsellingInfo";
import NeetpgUpdates from "../../components/dashboard/neetpg/NeetpgUpdates";

function NeetpgDashboard() {
  return (
    <div>
      <NeetpgDashboardHero />
      <NeetpgUpdates />
      <NeetpgCounsellingInfo />
    </div>
  );
}

export default NeetpgDashboard;
