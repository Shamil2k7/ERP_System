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
  FiPrinter,
  FiLayers,
  FiMenu,
  FiX,
} from "react-icons/fi";

import styles from "./Sidebar.module.css";

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  const isActivePath = (href) => {
    if (!pathname) return false;
    if (href === "/dashboard") {
      return (
        pathname === "/dashboard" ||
        pathname === "/admin/adminPanel" ||
        pathname === "/"
      );
    }

    // Special exact matches for nested section roots
    if (href === "/warehouse" && pathname !== "/warehouse") {
      return false;
    }

    return pathname === href || pathname.startsWith(href + "/");
  };

  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.logo}>
        <h2>ERP</h2>
        {onClose && (
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close menu">
            <FiX size={20} />
          </button>
        )}
      </div>

      <nav>
        <h4 className={styles.title}>Main</h4>

        <Link
          href="/dashboard"
          className={isActivePath("/dashboard") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiGrid />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/admin/layouts"
          className={isActivePath("/admin/layouts") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiLayers />
          <span>Layouts</span>
        </Link>

        <h4 className={styles.title}>Inventory</h4>

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
          href="/admin/inventory"
          className={isActivePath("/admin/inventory") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiPackage />
          <span>Inventory</span>
        </Link>

        <Link
          href="/admin/suppliers"
          className={isActivePath("/admin/suppliers") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiTruck />
          <span>Suppliers</span>
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
          href="/warehouse/stock"
          className={isActivePath("/warehouse/stock") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiPackage />
          <span>Stock</span>
        </Link>

        <h4 className={styles.title}>Sales</h4>

        <Link
          href="/customers"
          className={isActivePath("/customers") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiUsers />
          <span>Customers</span>
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
          href="/invoices"
          className={isActivePath("/invoices") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiFileText />
          <span>Recurring Invoices</span>
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
          href="/admin/refunds"
          className={isActivePath("/admin/refunds") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiRefreshCw />
          <span>Refunds</span>
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
          href="/purchases"
          className={isActivePath("/purchases") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiShoppingCart />
          <span>Purchases</span>
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

        <Link
          href="/reports"
          className={isActivePath("/reports") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiBarChart2 />
          <span>Reports</span>
        </Link>

        <h4 className={styles.title}>HRM</h4>

        <Link
          href="/admin/employees/view"
          className={isActivePath("/admin/employees/view") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiUserCheck />
          <span>Employees</span>
        </Link>

        <Link
          href="/admin/departments"
          className={isActivePath("/admin/departments") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiBriefcase />
          <span>Departments</span>
        </Link> */}

        <Link
          href="/admin/designations"
          className={isActivePath("/admin/designations") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiUsers />
          <span>Designations / Roles</span>
        </Link>

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

        <Link
          href="/admin/settings"
          className={isActivePath("/admin/settings") ? styles.active : ""}
          onClick={handleLinkClick}
        >
          <FiSettings />
          <span>Settings</span>
        </Link>

        <Link
          href="/logout"
          className={`${styles.logout} ${isActivePath("/logout") ? styles.active : ""}`}
          onClick={handleLinkClick}
        >
          <FiLogOut />
          <span>Logout</span>
        </Link>
      </nav>
    </aside>
  );
}