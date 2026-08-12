"use client";

import Link from "next/link";

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
} from "react-icons/fi";

import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>


      <div className={styles.logo}>
        <h2>ERP</h2>
      </div>


      <nav>


        <h4 className={styles.title}>Main</h4>

        <Link href="/dashboard">
          <FiGrid />
          <span>Dashboard</span>
        </Link>

        {/* <Link href="/admin/applications">
          <FiHome />
          <span>Applications</span>
        </Link> */}

        <Link href="/admin/layouts">
          <FiLayers />
          <span>Layouts</span>
        </Link>



        <h4 className={styles.title}>Inventory</h4>

        <Link href="/admin/products/view">
          <FiShoppingBag />
          <span>Products</span>
        </Link>

        <Link href="/admin/categories">
          <FiBox />
          <span>Categories</span>
        </Link>

        <Link href="/admin/brand">
          <FiTag />
          <span>Brands</span>
        </Link>

        <Link href="/admin/units">
          <FiArchive />
          <span>Units</span>
        </Link>

        <Link href="/admin/inventory">
          <FiPackage />
          <span>Inventory</span>
        </Link>

        <Link href="/admin/suppliers">
          <FiTruck />
          <span>Suppliers</span>
        </Link>

        <Link href="/warehouse">
          <FiHome />
          <span>Warehouse</span>
        </Link>

        <Link href="/warehouse/stock">
          <FiPackage />
          <span>Stock</span>
        </Link>


        <h4 className={styles.title}>Sales</h4>

        <Link href="/customers">
          <FiUsers />
          <span>Customers</span>
        </Link>

        <Link href="/sales">
          <FiShoppingCart />
          <span>Sales Orders</span>
        </Link>

        <Link href="/invoices">
          <FiFileText />
          <span>Recurring Invoices</span>
        </Link>

        <Link href="/admin/invoice-templates">
          <FiClipboard />
          <span>Invoice Templates</span>
        </Link>

        <Link href="/admin/credit-notes">
          <FiCreditCard />
          <span>Credit Notes</span>
        </Link>

        <Link href="/admin/sales-quotes">
          <FiFileText />
          <span>Sales Quotes</span>
        </Link>

        <Link href="/admin/cash-sales">
          <FiDollarSign />
          <span>Cash Sales</span>
        </Link>

        <Link href="/admin/refunds">
          <FiRefreshCw />
          <span>Refunds</span>
        </Link>

        <Link href="/admin/delivery-notes">
          <FiClipboard />
          <span>Delivery Notes</span>
        </Link>

        <Link href="/admin/sales-analytics">
          <FiBarChart2 />
          <span>Sales Analytics</span>
        </Link>



        <h4 className={styles.title}>POS</h4>

        <Link href="/pos">
          <FiMonitor />
          <span>POS</span>
        </Link>

        <Link href="/admin/pos/orders">
          <FiMenu />
          <span>POS Orders</span>
        </Link>

        <Link href="/admin/pos/barcode-print">
          <FiGrid />
          <span>Barcode Print</span>
        </Link>

        <Link href="/admin/pos/qr-code-print">
          <FiGrid />
          <span>QR Code Print</span>
        </Link>

        <Link href="/admin/pos/print-settings">
          <FiPrinter />
          <span>Print Settings</span>
        </Link>



        <h4 className={styles.title}>Purchase</h4>

        <Link href="/purchases">
          <FiShoppingCart />
          <span>Purchases</span>
        </Link>

        <Link href="/admin/purchase-orders">
          <FiClipboard />
          <span>Purchase Orders</span>
        </Link>

        <Link href="/admin/purchase-return">
          <FiRefreshCw />
          <span>Purchase Return</span>
        </Link>

        <Link href="/admin/vendors">
          <FiUsers />
          <span>Vendors</span>
        </Link>

        <Link href="/admin/procurement">
          <FiBarChart2 />
          <span>Procurement Analytics</span>
        </Link>



        <h4 className={styles.title}>Finance</h4>

        <Link href="/admin/expenses">
          <FiDollarSign />
          <span>Expenses</span>
        </Link>

        <Link href="/admin/expense-category">
          <FiBox />
          <span>Expense Category</span>
        </Link>

        <Link href="/admin/payments">
          <FiCreditCard />
          <span>Payments</span>
        </Link>

        <Link href="/admin/cashflow">
          <FiTrendingUp />
          <span>Cashflow</span>
        </Link>

        <Link href="/admin/budget">
          <FiPieChart />
          <span>Budgeting</span>
        </Link>

        <Link href="/admin/taxes">
          <FiDollarSign />
          <span>Taxes</span>
        </Link>

        <Link href="/reports">
          <FiBarChart2 />
          <span>Reports</span>
        </Link>



        <h4 className={styles.title}>HRM</h4>

        <Link href="/admin/employees/view">
          <FiUserCheck />
          <span>Employees</span>
        </Link>

        {/* <Link href="/admin/departments">
          <FiBriefcase />
          <span>Departments</span>
        </Link> */}

        <Link href="/admin/designations">
          <FiUsers />
          <span>Designations / Roles</span>
        </Link>

        <Link href="/admin/attendance">
          <FiClipboard />
          <span>Attendance</span>
        </Link>

        <Link href="/admin/leave">
          <FiFileText />
          <span>Leave Management</span>
        </Link>

        <Link href="/admin/payroll">
          <FiDollarSign />
          <span>Payroll</span>
        </Link>



        <h4 className={styles.title}>System</h4>

        <Link href="/admin/settings">
          <FiSettings />
          <span>Settings</span>
        </Link>

        <Link href="/logout" className={styles.logout}>
          <FiLogOut />
          <span>Logout</span>
        </Link>

      </nav>

    </aside>
  );
}