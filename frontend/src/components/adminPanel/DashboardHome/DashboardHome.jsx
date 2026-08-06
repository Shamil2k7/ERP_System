"use client";

import CategoryChart from "../CategoryChart/CategoryChart";
import RecentOrders from "../RecentOrders/RecentOrders";
import RevenueExpenseChart from "../RevenueExpenseChart/RevenueExpenseChart";
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

      {/* <InventoryChart /> */}

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


