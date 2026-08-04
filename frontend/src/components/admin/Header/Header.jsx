"use client";

import { FiBell, FiSearch, FiUser } from "react-icons/fi";
import styles from "@/styles/admin.module.css";

export default function Header() {
  return (
    <header className={styles.header}>

      <div className={styles.search}>
        <FiSearch />
        <input placeholder="Search..." />
      </div>

      <div className={styles.headerRight}>
        <FiBell size={20} />
        <FiUser size={22} />
      </div>

    </header>
  );
}