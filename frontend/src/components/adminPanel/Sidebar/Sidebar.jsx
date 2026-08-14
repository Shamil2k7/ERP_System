"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSettings } from "@/context/SettingsContext";

import {
  FiGrid,
  FiMapPin,
  FiBarChart2,
  FiUserCheck,
  FiClock,
  FiSettings,
  FiUsers,
  FiPackage,
  FiShoppingCart,
  FiBriefcase,
  FiMonitor,
  FiMenu,
  FiRefreshCw,
  FiShoppingBag,
  FiBox,
  FiTag,
  FiArchive,
  FiHome,
  FiClipboard,
  FiTruck,
  FiFileText,
  FiCreditCard,
  FiLogOut,
  FiX,
} from "react-icons/fi";

import styles from "./Sidebar.module.css";

// ─── ROLE MENU CONFIGURATION ──────────────────────────────────────────────────

const ROLE_MENUS = {
  super_admin: [
    {
      title: "Super Admin",
      items: [
        { href: "/dashboard", label: "Dashboard", icon: FiGrid },
        { href: "/admin/branches", label: "Branches", icon: FiMapPin },
        { href: "/admin/add-admin", label: "Add Admin", icon: FiUserCheck },
        { href: "/admin/business-type", label: "Business Type", icon: FiBriefcase },
        { href: "/admin/employees/view", label: "Employees", icon: FiUserCheck },
        { href: "/admin/employees/add", label: "Add Employee", icon: FiUsers },
        { href: "/admin/designations", label: "Roles", icon: FiBriefcase },
        { href: "/reports", label: "Report", icon: FiBarChart2 },
        { href: "/admin/settings", label: "Settings", icon: FiSettings },
      ],
    },
  ],

  admin: [
    {
      title: "Admin",
      items: [
        { href: "/dashboard", label: "Dashboard", icon: FiGrid },
        { href: "/admin/branches", label: "Branches", icon: FiMapPin },
        { href: "/admin/business-type", label: "Business Type", icon: FiBriefcase },
        { href: "/admin/employees/view", label: "Employees", icon: FiUserCheck },
        { href: "/reports", label: "Reports", icon: FiBarChart2 },
        { href: "/admin/audit-logs", label: "Audit Log", icon: FiClock },
        { href: "/admin/settings", label: "Settings", icon: FiSettings },
      ],
    },
  ],

  branch_manager: [
    {
      title: "Branch Manager",
      items: [
        { href: "/dashboard", label: "Dashboard", icon: FiGrid },
        { href: "/customers", label: "Customers", icon: FiUsers },
        { href: "/warehouse/stock", label: "Inventory", icon: FiPackage },
        { href: "/sales", label: "Sales Orders", icon: FiShoppingCart },
        { href: "/purchases", label: "Purchases", icon: FiShoppingCart },
        { href: "/admin/departments", label: "Departments", icon: FiBriefcase },
        { href: "/admin/designations", label: "Designations / Roles", icon: FiUsers },
        { href: "/admin/employees/view", label: "Employees", icon: FiUserCheck },
        { href: "/admin/settings", label: "Settings", icon: FiSettings },
      ],
    },
    {
      title: "Others",
      items: [
        { href: "/invoices", label: "Invoice", icon: FiFileText },
        { href: "/invoices", label: "Invoice Templates", icon: FiClipboard },
        { href: "/invoices", label: "Credit Notes", icon: FiCreditCard },
      ],
    },
  ],

  cashier: [
    {
      title: "Cashier",
      items: [
        { href: "/pos", label: "POS", icon: FiMonitor },
        { href: "/pos", label: "POS Orders", icon: FiMenu },
        { href: "/admin/pos/barcode-print", label: "Barcode Prints", icon: FiGrid },
        { href: "/pos", label: "Refunds", icon: FiRefreshCw },
        { href: "/admin/settings", label: "Settings", icon: FiSettings },
      ],
    },
  ],

  inventory_manager: [
    {
      title: "Inventory Manager",
      items: [
        { href: "/warehouse/stock", label: "Stock", icon: FiPackage },
        { href: "/admin/products/view", label: "Products", icon: FiShoppingBag },
        { href: "/admin/categories", label: "Categories", icon: FiBox },
        { href: "/admin/brand", label: "Brand", icon: FiTag },
        { href: "/admin/units", label: "Units", icon: FiArchive },
        { href: "/warehouse", label: "Warehouse", icon: FiHome },
        { href: "/purchases", label: "Purchase Order", icon: FiClipboard },
        { href: "/admin/suppliers", label: "Suppliers", icon: FiTruck },
        { href: "/admin/settings", label: "Settings", icon: FiSettings },
      ],
    },
    {
      title: "Others",
      items: [
        { href: "/invoices", label: "Invoice", icon: FiFileText },
        { href: "/invoices", label: "Invoice Templates", icon: FiClipboard },
        { href: "/invoices", label: "Credit Notes", icon: FiCreditCard },
      ],
    },
  ],
};

const normalizeRole = (roleStr) => {
  if (!roleStr) return "admin";
  const r = roleStr.toLowerCase().trim();
  if (r.includes("super") || r.includes("sooper")) return "super_admin";
  if (r.includes("branch")) return "branch_manager";
  if (r.includes("cashier")) return "cashier";
  if (r.includes("inventory") || r.includes("stock")) return "inventory_manager";
  if (r.includes("admin")) return "admin";
  return "admin";
};

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const { settings, logoUrl } = useSettings();
  const [userRoleKey, setUserRoleKey] = useState("admin");

  useEffect(() => {
    const checkUserRole = () => {
      try {
        const stored = localStorage.getItem("user");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed?.role) {
            setUserRoleKey(normalizeRole(parsed.role));
          }
        }
      } catch (err) {
        console.error("Failed to parse user role in Sidebar", err);
      }
    };

    checkUserRole();
    window.addEventListener("storage", checkUserRole);
    return () => window.removeEventListener("storage", checkUserRole);
  }, []);

  const isActivePath = (href) => {
    if (!href) return false;
    return pathname === href || pathname.startsWith(href + "/");
  };

  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/auth/login";
    }
  };

  const currentRoleSections = ROLE_MENUS[userRoleKey] || ROLE_MENUS.admin;

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.logo}>
        <div className={styles.logoBrand}>
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={settings?.companyName || "Company Logo"}
              className={styles.logoImg}
            />
          ) : (
            <h2>{settings?.companyName || "ERP"}</h2>
          )}
        </div>
        {onClose && (
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close menu">
            <FiX size={20} />
          </button>
        )}
      </div>

      <nav>
        {currentRoleSections.map((section, idx) => (
          <div key={idx}>
            <h4 className={styles.title}>{section.title}</h4>
            {section.items.map((item) => {
              const IconComp = item.icon;
              return (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  className={isActivePath(item.href) ? styles.active : ""}
                  onClick={handleLinkClick}
                >
                  <IconComp />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        ))}

        <a
          href="/logout"
          className={`${styles.logout} ${isActivePath("/logout") ? styles.active : ""}`}
          onClick={handleLogout}
        >
          <FiLogOut />
          <span>Logout</span>
        </a>
      </nav>
    </aside>
  );
}