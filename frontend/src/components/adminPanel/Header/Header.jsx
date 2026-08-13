"use client";

import Link from "next/link";
import {
  FiMenu,
  FiSearch,
  FiBell,
  FiSettings,
  FiMoon,
  FiGlobe,
  FiChevronDown,
  FiUser,
} from "react-icons/fi";
import { useSettings } from "@/context/SettingsContext";

import styles from "./Header.module.css";

export default function Header({ toggleSidebar }) {
  const { settings } = useSettings();

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
            <h4>Admin</h4>
            <span>Administrator</span>
          </div>

          <FiChevronDown />

        </div>

      </div>

    </header>
  );
}