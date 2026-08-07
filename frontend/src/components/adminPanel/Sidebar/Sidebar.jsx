"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiGrid,
  FiHome,
  FiUsers,
  FiShoppingBag,
  FiBox,
  FiTag,
  FiPackage,
  FiArchive,
  FiTruck,
  FiShoppingCart,
  FiClipboard,
  FiFileText,
  FiCreditCard,
  FiRefreshCw,
  FiBarChart2,
  FiDollarSign,
  FiPieChart,
  FiTrendingUp,
  FiBriefcase,
  FiUserCheck,
  FiSettings,
  FiLogOut,
  FiMonitor,
} from "react-icons/fi";

import styles from "./Sidebar.module.css";

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  const isActive = (path) => {
    if (!pathname) return false;
    if (path === "/dashboard" && (pathname === "/dashboard" || pathname === "/admin/adminPanel")) {
      return true;
    }
    if (path === "/") return pathname === "/";
    return pathname === path || (path !== "/" && pathname.startsWith(path));
  };

  const linkClass = (path) => {
    return isActive(path) ? styles.active : "";
  };

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.logo}>
        <h2>Dreams ERP</h2>
      </div>

      <nav>
        {/* Main */}
        <h4 className={styles.title}>Main</h4>

        <Link href="/dashboard" className={linkClass("/dashboard")} onClick={handleLinkClick}>
          <FiGrid />
          Dashboard
        </Link>

        <Link href="/pos" className={linkClass("/pos")} onClick={handleLinkClick}>
          <FiMonitor />
          POS System
        </Link>

        {/* Inventory */}
        <h4 className={styles.title}>Inventory</h4>

        <Link href="/warehouse" className={linkClass("/warehouse")} onClick={handleLinkClick}>
          <FiHome />
          Warehouse Management
        </Link>

        <Link href="/warehouse/stock" className={linkClass("/warehouse/stock")} onClick={handleLinkClick}>
          <FiPackage />
          Stock Inventory
        </Link>

        <Link href="/warehouse/transfer" className={linkClass("/warehouse/transfer")} onClick={handleLinkClick}>
          <FiRefreshCw />
          Stock Transfer
        </Link>

        {/* Sales */}
        <h4 className={styles.title}>Sales</h4>

        <Link href="/sales" className={linkClass("/sales")} onClick={handleLinkClick}>
          <FiShoppingCart />
          Sales Management
        </Link>

        <Link href="/customers" className={linkClass("/customers")} onClick={handleLinkClick}>
          <FiUsers />
          Customer Directory
        </Link>

        <Link href="/invoices" className={linkClass("/invoices")} onClick={handleLinkClick}>
          <FiFileText />
          Invoices & Billing
        </Link>

        {/* Purchasing */}
        <h4 className={styles.title}>Purchase</h4>

        <Link href="/purchases" className={linkClass("/purchases")} onClick={handleLinkClick}>
          <FiShoppingBag />
          Purchase Orders
        </Link>

        {/* Reports & Analytics */}
        <h4 className={styles.title}>Reports & Analytics</h4>

        <Link href="/reports" className={linkClass("/reports")} onClick={handleLinkClick}>
          <FiBarChart2 />
          Reports & Analytics
        </Link>

        {/* System Settings */}
        <h4 className={styles.title}>System</h4>

        <Link href="/settings" className={linkClass("/settings")} onClick={handleLinkClick}>
          <FiSettings />
          Settings
        </Link>

        <Link href="/auth/login" className={`${linkClass("/auth/login")} ${styles.logout}`} onClick={handleLinkClick}>
          <FiLogOut />
          Logout
        </Link>
      </nav>
    </aside>
  );
}
