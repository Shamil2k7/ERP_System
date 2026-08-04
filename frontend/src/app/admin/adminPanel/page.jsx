import DashboardCards from "@/components/admin/DashboardCards/DashboardCard";
import RecentOrders from "@/components/admin/RecentOrders/RecentOrders";


export default function AdminDashboard() {
  return (
    <>
      <DashboardCards />
      {/* <SalesChart /> */}
      <RecentOrders />
      {/* <TopProducts /> */}
    </>
  );
}