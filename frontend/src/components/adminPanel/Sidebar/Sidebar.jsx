
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
} from "react-icons/fi";

import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>

      <div className={styles.logo}>
        <h2>Dreams ERP</h2>
      </div>

      <nav>

        {/* Main */}

        <h4 className={styles.title}>Main</h4>

        <Link href="/admin">
          <FiGrid />
          Dashboard
        </Link>

        <Link href="/admin/applications">
          <FiHome />
          Applications
        </Link>

        <Link href="/admin/layouts">
          <FiPackage />
          Layouts
        </Link>

        {/* Inventory */}

        <h4 className={styles.title}>Inventory</h4>

        <Link href="/admin/products">
          <FiShoppingBag />
          Products
        </Link>

        <Link href="/admin/categories">
          <FiBox />
          Categories
        </Link>

        <Link href="/admin/brands">
          <FiTag />
          Brands
        </Link>

        <Link href="/admin/units">
          <FiArchive />
          Units
        </Link>

        <Link href="/admin/inventory">
          <FiPackage />
          Inventory
        </Link>

        <Link href="/admin/suppliers">
          <FiTruck />
          Suppliers
        </Link>

        <Link href="/admin/warehouse">
          <FiHome />
          Warehouse
        </Link>

        <Link href="/admin/stock">
          <FiPackage />
          Stock
        </Link>

        {/* Sales */}

        <h4 className={styles.title}>Sales</h4>

        <Link href="/admin/customers">
          <FiUsers />
          Customers
        </Link>

        <Link href="/admin/sales-orders">
          <FiShoppingCart />
          Sales Orders
        </Link>

        <Link href="/admin/invoices">
          <FiFileText />
          Recurring Invoices
        </Link>

        <Link href="/admin/invoice-templates">
          <FiClipboard />
          Invoice Templates
        </Link>

        <Link href="/admin/credit-notes">
          <FiCreditCard />
          Credit Notes
        </Link>

        <Link href="/admin/sales-quotes">
          <FiFileText />
          Sales Quotes
        </Link>

        <Link href="/admin/cash-sales">
          <FiDollarSign />
          Cash Sales
        </Link>

        <Link href="/admin/refunds">
          <FiRefreshCw />
          Refunds
        </Link>

        <Link href="/admin/delivery-notes">
          <FiClipboard />
          Delivery Notes
        </Link>

        <Link href="/admin/sales-analytics">
          <FiBarChart2 />
          Sales Analytics
        </Link>

        {/* Purchase */}

        <h4 className={styles.title}>Purchase</h4>

        <Link href="/admin/purchases">
          <FiShoppingCart />
          Purchases
        </Link>

        <Link href="/admin/purchase-orders">
          <FiClipboard />
          Purchase Orders
        </Link>

        <Link href="/admin/purchase-return">
          <FiRefreshCw />
          Purchase Return
        </Link>

        <Link href="/admin/vendors">
          <FiUsers />
          Vendors
        </Link>

        <Link href="/admin/procurement">
          <FiBarChart2 />
          Procurement Analytics
        </Link>

        {/* Finance */}

        <h4 className={styles.title}>Finance</h4>

        <Link href="/admin/expenses">
          <FiDollarSign />
          Expenses
        </Link>

        <Link href="/admin/expense-category">
          <FiBox />
          Expense Category
        </Link>

        <Link href="/admin/payments">
          <FiCreditCard />
          Payments
        </Link>

        <Link href="/admin/cashflow">
          <FiTrendingUp />
          Cashflow
        </Link>

        <Link href="/admin/budget">
          <FiPieChart />
          Budgeting
        </Link>

        <Link href="/admin/taxes">
          <FiDollarSign />
          Taxes
        </Link>

        <Link href="/admin/reports">
          <FiBarChart2 />
          Reports
        </Link>

        {/* HR */}

        <h4 className={styles.title}>HRM</h4>

        <Link href="/admin/employees">
          <FiUserCheck />
          Employees
        </Link>

        <Link href="/admin/departments">
          <FiBriefcase />
          Departments
        </Link>

        <Link href="/admin/designations">
          <FiUsers />
          Designations / Roles
        </Link>

        <Link href="/admin/attendance">
          <FiClipboard />
          Attendance
        </Link>

        <Link href="/admin/leave">
          <FiFileText />
          Leave Management
        </Link>

        <Link href="/admin/payroll">
          <FiDollarSign />
          Payroll
        </Link>

        {/* System */}

        <h4 className={styles.title}>System</h4>

        <Link href="/admin/settings">
          <FiSettings />
          Settings
        </Link>

        <Link href="/logout">
          <FiLogOut />
          Logout
        </Link>

      </nav>
    </aside>
  );
}
