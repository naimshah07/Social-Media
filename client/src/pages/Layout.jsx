import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { dummyUserData } from "../assets/assets";
import Loading from "../components/Loading";

const Layout = () => {
  const user = dummyUserData;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) return <Loading />;

  return (
    <div className="w-full flex h-screen">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 bg-slate-50 relative">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute top-3 right-3 p-2 z-50 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden"
        >
          {sidebarOpen ? <X /> : <Menu />}
        </button>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
