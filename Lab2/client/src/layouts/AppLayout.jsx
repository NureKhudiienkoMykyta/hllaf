import React from "react";
import Header from "../components/Header/Header";
import { Outlet } from "react-router";

function AppLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
