"use client";

import { ChildProps } from "@/types";
import React from "react";
import { Sidebar, Topbar } from "./admin_components";

const AdminLayout = ({ children }: ChildProps) => {
  return (
    <div className="flex w-full">
      <Sidebar />
      <main className="flex-1 min-h-screen overflow-y-auto bg-herowhite">
        <Topbar />
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
