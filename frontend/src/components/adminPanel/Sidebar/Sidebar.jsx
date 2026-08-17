"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSettings } from "@/context/SettingsContext";

import {
  FiPieChart,
  // FiDollarSign,
  FiPrinter,
  FiTrendingUp,
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
  FiDollarSign,
  // FiTrendingUp,
  // FiPieChart,
  // FiPrinter,
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
        { href: "/admin/managers", label: "Manager", icon: FiUserCheck },
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
        { href: "/admin/managers", label: "Manager", icon: FiUserCheck },
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
        <h4 className={styles.title}>Super Admin</h4>

        <Link
          href="/admin/add-admin"
          className={isActivePath("/admin/add-admin") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiUserCheck />
          <span>Add Admin</span>
        </Link>

        <Link
          href="/admin/business-type"
          className={isActivePath("/admin/business-type") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiBriefcase />
          <span>Business Type</span>
        </Link>

        <h4 className={styles.title}>Admin</h4>

        <Link
          href="/dashboard"
          className={isActivePath("/dashboard") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiGrid />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/admin/branches"
          className={isActivePath("/admin/branches") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiMapPin />
          <span>Branches</span>
        </Link>

        <Link
          href="/reports"
          className={isActivePath("/reports") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiBarChart2 />
          <span>Reports</span>
        </Link>

        <Link
          href="/admin/managers"
          className={isActivePath("/admin/managers") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiUserCheck />
          <span>Manager</span>
        </Link>

        <Link
          href="/admin/audit-logs"
          className={isActivePath("/admin/audit-logs") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiClock />
          <span>Audit Logs</span>
        </Link>
        

        <Link
          href="/settings/landing"
          className={isActivePath("/settings/landing") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiSettings />
          <span>Settings Landing</span>
        </Link>
        <Link
          href="/admin/settings"
          className={isActivePath("/admin/settings") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiSettings />
          <span>Settings</span>
        </Link>



        <h4 className={styles.title}>Branch Manager</h4>

        <Link
          href="/dashboard"
          className={isActivePath("/dashboard") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiGrid />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/customers"
          className={isActivePath("/customers") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiUsers />
          <span>Customers</span>
        </Link>

        <Link
          href="/admin/inventory"
          className={isActivePath("/admin/inventory") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiPackage />
          <span>Inventory</span>
        </Link>

        <Link
          href="/sales"
          className={isActivePath("/sales") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiShoppingCart />
          <span>Sales Orders</span>
        </Link>

        <Link
          href="/purchases"
          className={isActivePath("/purchases") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiShoppingCart />
          <span>Purchases</span>
        </Link>

        <Link
          href="/admin/departments"
          className={isActivePath("/admin/departments") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiBriefcase />
          <span>Departments</span>
        </Link>



        <Link
          href="/admin/designations"
          className={isActivePath("/admin/designations") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiUsers />
          <span>Designations / Roles</span>
        </Link>

        <Link
          href="/admin/employees/view"
          className={isActivePath("/admin/employees/view") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiUserCheck />
          <span>Employees</span>
        </Link>


        <h4 className={styles.title}>Cashier</h4>

        <Link
          href="/pos"
          className={isActivePath("/pos") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiMonitor />
          <span>POS</span>
        </Link>

        <Link
          href="/admin/pos/orders"
          className={isActivePath("/admin/pos/orders") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiMenu />
          <span>POS Orders</span>
        </Link>

        <Link
          href="/admin/pos/barcode-print"
          className={isActivePath("/admin/pos/barcode-print") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiGrid />
          <span>Barcode Print</span>
        </Link>

        <Link
          href="/admin/refunds"
          className={isActivePath("/admin/refunds") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiRefreshCw />
          <span>Refunds</span>
        </Link>

        <h4 className={styles.title}>Inventory Manager</h4>
        <Link
          href="/admin/products/view"
          className={isActivePath("/admin/products/view") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiShoppingBag />
          <span>Products</span>
        </Link>

        <Link
          href="/admin/categories"
          className={isActivePath("/admin/categories") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiBox />
          <span>Categories</span>
        </Link>

        <Link
          href="/admin/brand"
          className={isActivePath("/admin/brand") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiTag />
          <span>Brands</span>
        </Link>

        <Link
          href="/admin/units"
          className={isActivePath("/admin/units") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiArchive />
          <span>Units</span>
        </Link>




        <Link
          href="/warehouse/stock"
          className={isActivePath("/warehouse/stock") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiPackage />
          <span>Stock</span>
        </Link>

        <Link
          href="/warehouse"
          className={isActivePath("/warehouse") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiHome />
          <span>Warehouse</span>
        </Link>

        <Link
          href="/admin/purchase-orders"
          className={isActivePath("/admin/purchase-orders") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiClipboard />
          <span>Purchase Orders</span>
        </Link>

        <Link
          href="/admin/suppliers"
          className={isActivePath("/admin/suppliers") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiTruck />
          <span>Suppliers</span>
        </Link>

        <h4 className={styles.title}>Other</h4>

         <Link
          href="/invoices"
          className={isActivePath("/invoices") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiFileText />
          <span>Invoices</span>
        </Link>



       

        <Link
          href="/admin/invoice-templates"
          className={isActivePath("/admin/invoice-templates") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiClipboard />
          <span>Invoice Templates</span>
        </Link>

        <Link
          href="/admin/credit-notes"
          className={isActivePath("/admin/credit-notes") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiCreditCard />
          <span>Credit Notes</span>
        </Link>

        <Link
          href="/admin/sales-quotes"
          className={isActivePath("/admin/sales-quotes") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiFileText />
          <span>Sales Quotes</span>
        </Link>

        <Link
          href="/admin/cash-sales"
          className={isActivePath("/admin/cash-sales") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiDollarSign />
          <span>Cash Sales</span>
        </Link>



        <Link
          href="/admin/delivery-notes"
          className={isActivePath("/admin/delivery-notes") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiClipboard />
          <span>Delivery Notes</span>
        </Link>

        <Link
          href="/admin/sales-analytics"
          className={isActivePath("/admin/sales-analytics") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiBarChart2 />
          <span>Sales Analytics</span>
        </Link>

        <h4 className={styles.title}>POS</h4>


        <Link
          href="/admin/pos/qr-code-print"
          className={isActivePath("/admin/pos/qr-code-print") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiGrid />
          <span>QR Code Print</span>
        </Link>

        <Link
          href="/admin/pos/print-settings"
          className={isActivePath("/admin/pos/print-settings") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiPrinter />
          <span>Print Settings</span>
        </Link>

        <h4 className={styles.title}>Purchase</h4>





        <Link
          href="/admin/purchase-return"
          className={isActivePath("/admin/purchase-return") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiRefreshCw />
          <span>Purchase Return</span>
        </Link>

        <Link
          href="/admin/vendors"
          className={isActivePath("/admin/vendors") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiUsers />
          <span>Vendors</span>
        </Link>

        <Link
          href="/admin/procurement"
          className={isActivePath("/admin/procurement") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiBarChart2 />
          <span>Procurement Analytics</span>
        </Link>

        <h4 className={styles.title}>Finance</h4>

        <Link
          href="/admin/expenses"
          className={isActivePath("/admin/expenses") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiDollarSign />
          <span>Expenses</span>
        </Link>

        <Link
          href="/admin/expense-category"
          className={isActivePath("/admin/expense-category") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiBox />
          <span>Expense Category</span>
        </Link>

        <Link
          href="/admin/payments"
          className={isActivePath("/admin/payments") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiCreditCard />
          <span>Payments</span>
        </Link>

        <Link
          href="/admin/cashflow"
          className={isActivePath("/admin/cashflow") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiTrendingUp />
          <span>Cashflow</span>
        </Link>

        <Link
          href="/admin/budget"
          className={isActivePath("/admin/budget") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiPieChart />
          <span>Budgeting</span>
        </Link>

        <Link
          href="/admin/taxes"
          className={isActivePath("/admin/taxes") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiDollarSign />
          <span>Taxes</span>
        </Link>



        <h4 className={styles.title}>HRM</h4>



        

        <Link
          href="/admin/attendance"
          className={isActivePath("/admin/attendance") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiClipboard />
          <span>Attendance</span>
        </Link>

        <Link
          href="/admin/leave"
          className={isActivePath("/admin/leave") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiFileText />
          <span>Leave Management</span>
        </Link>

        <Link
          href="/admin/payroll"
          className={isActivePath("/admin/payroll") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiDollarSign />
          <span>Payroll</span>
        </Link>

        <h4 className={styles.title}>System</h4>
      </nav>
    </aside>
  );
}
