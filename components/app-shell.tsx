"use client";

import { useState } from "react";
import { AppSidebar } from "./app-sidebar";
import { AppHeader } from "./app-header";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-black text-white">
      <AppSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="flex flex-1 flex-col md:pl-64">
        <AppHeader onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
