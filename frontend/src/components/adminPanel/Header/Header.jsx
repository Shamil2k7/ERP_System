"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FiMenu,
  FiSearch,
  FiBell,
  FiSettings,
  FiMoon,
  FiGlobe,
  FiChevronDown,
} from "react-icons/fi";
import { useSettings } from "@/context/SettingsContext";

import styles from "./Header.module.css";

export default function Header({ toggleSidebar }) {
  const { settings } = useSettings();
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to parse user in Header", err);
    }
  }, []);

  return (
    <header className={styles.header}>

      {/* Left */}

      <div className={styles.left}>

        <button
          className={styles.menuBtn}
          onClick={toggleSidebar}
        >
          <FiMenu />
        </button>

        <div className={styles.searchBox}>
          <FiSearch />
          <input
            type="text"
            placeholder={`Search ${settings?.companyName ? settings.companyName + "..." : "..."}`}
          />
        </div>

      </div>

      {/* Right */}

      <div className={styles.right}>

        <button className={styles.iconBtn} title="Language">
          <FiGlobe />
        </button>

        <button className={styles.iconBtn} title="Theme">
          <FiMoon />
        </button>

        <button className={styles.iconBtn} title="Notifications">
          <FiBell />
          <span className={styles.badge}>5</span>
        </button>

        <Link href="/admin/settings" className={styles.iconBtn} title="Settings">
          <FiSettings />
        </Link>

        <div className={styles.profile}>

          <img
            src="https://i.pravatar.cc/150?img=68"
            alt="profile"
          />

          <div>
            <h4>{user?.fullName || "Admin"}</h4>
            <span>{user?.role || "Administrator"}</span>
          </div>

          <FiChevronDown />

        </div>

      </div>

    </header>
  );
}