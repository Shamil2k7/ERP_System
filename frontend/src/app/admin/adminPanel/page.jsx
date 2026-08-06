

import styles from "./adminpanel.module.css";

import Sidebar from "@/components/adminPanel/Sidebar/Sidebar";
import Header from "@/components/adminPanel/Header/Header";
import DashboardHome from "@/components/adminPanel/DashboardHome/DashboardHome";

export default function AdminPage() {
  return (
    <div className={styles.adminLayout}>
      <Sidebar />

      <div className={styles.adminContent}>
        <Header />

        <main className={styles.dashboardArea}>
          <DashboardHome />
        </main>
      </div>
    </div>
  );
}
