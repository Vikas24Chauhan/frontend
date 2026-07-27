import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";

function MainLayout() {
  return (
    <div>
      <Navbar />

      <hr />

      <Outlet />
    </div>
  );
}

export default MainLayout;
