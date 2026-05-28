import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50">
      <Topbar onToggleSidebar={() => setCollapsed(!collapsed)} collapsed={collapsed} />
      <div className="flex flex-1 overflow-hidden mt-16">
        <Sidebar collapsed={collapsed} />
        <main className="flex-1 overflow-y-auto px-6 py-8 md:px-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
