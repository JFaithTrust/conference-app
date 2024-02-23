"use client";

import { ChildProps } from "@/types";
import React, { useEffect, useState } from "react";
import { Sidebar, Topbar } from "./admin_components";

const AdminLayout = ({ children }: ChildProps) => {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    if (window.localStorage !== undefined) {
      const role = localStorage.getItem("role");
      setUserRole(role as string);
    }
  }, []);

  if (userRole === "USER") window.location.replace("/");

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
