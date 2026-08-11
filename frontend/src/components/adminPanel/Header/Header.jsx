"use client";

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

import styles from "./Header.module.css";

export default function Header({ toggleSidebar }) {
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
            placeholder="Search..."
          />
        </div>

      </div>

      {/* Right */}

      <div className={styles.right}>

        <button className={styles.iconBtn}>
          <FiGlobe />
        </button>

        <button className={styles.iconBtn}>
          <FiMoon />
        </button>

        <button className={styles.iconBtn}>
          <FiBell />
          <span className={styles.badge}>5</span>
        </button>

        <button className={styles.iconBtn}>
          <FiSettings />
        </button>

        <div className={styles.profile}>

          <img
            src="https://i.pravata"
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