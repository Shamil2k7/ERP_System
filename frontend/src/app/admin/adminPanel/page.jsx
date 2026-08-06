import Sidebar from "@/components/adminPanel/Sidebar/Sidebar";
import Header from "@/components/adminPanel/Header/Header";
import DashboardHome from "@/components/adminPanel/DashboardHome/DashboardHome";

import "./adminpanel.module.css";

export default function AdminPage() {
  return (
    <div className="admin-layout">

      <Sidebar />

      <div className="admin-content">

        <Header />

        <main className="dashboard-area">
          <DashboardHome />
        </main>

      </div>

    </div>
  );
}