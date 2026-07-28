import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";

function MainLayout() {
  return (
    <div>
      <Navbar />
      <hr />
      <Outlet />
      <hr />
      <h2>Footer</h2>
    </div>
  );
}

export default MainLayout;
