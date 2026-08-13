"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/adminPanel/Sidebar/Sidebar";
import Header from "@/components/adminPanel/Header/Header";
import { SettingsProvider } from "@/context/SettingsContext";
import styles from "./AppLayout.module.css";

export default function AppLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Exclude public landing page and auth routes from ERP sidebar/topbar shell
  const isPublicPage =
    pathname === "/" ||
    pathname.startsWith("/auth");

  if (isPublicPage) {
    return <SettingsProvider>{children}</SettingsProvider>;
  }

  return (
    <SettingsProvider>
      <div className={styles.appWrapper}>
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        {sidebarOpen && (
          <div className={styles.overlay} onClick={closeSidebar} />
        )}

        <div className={styles.mainContent}>
          <Header toggleSidebar={toggleSidebar} />
          <main className={styles.pageBody}>{children}</main>
        </div>
      </div>
    </SettingsProvider>
  );
}

