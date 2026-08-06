"use client";

import KPISection from "./KPISection";
import SalesChart from "./SalesChart";
import RevenueExpenseChart from "./RevenueExpenseChart";
import CategoryChart from "./CategoryChart";
import InventoryChart from "./InventoryChart";
import RecentOrders from "./RecentOrders";
import LowStockTable from "./LowStockTable";
import BestSellingProducts from "./BestSellingProducts";
import TopSuppliers from "./TopSuppliers";

import styles from "./DashboardHome.module.css";

export default function DashboardHome() {
  return (
    <main className={styles.dashboard}>

      <div className={styles.welcome}>
        <div>
          <h2>Welcome Back, Admin</h2>
          <p>Retail ERP Dashboard Overview</p>
        </div>

        <button>Generate Report</button>
      </div>

      {/* <KPISection /> */}

      {/* <SalesChart /> */}

      <div className={styles.twoColumn}>
        <RevenueExpenseChart />
        <CategoryChart />
      </div>

      <InventoryChart />

      <div className={styles.twoColumn}>
        <RecentOrders />
        {/* <LowStockTable /> */}
      </div>

      <div className={styles.twoColumn}>
        {/* <BestSellingProducts /> */}
        {/* <TopSuppliers /> */}
      </div>

    </main>
  );
}