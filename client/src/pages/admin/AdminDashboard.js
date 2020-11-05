import React from "react";
import AdminNav from "../../components/nav/AdminNav";

import RecentOrders from "./dashboard/RecentOrders";
import SalesReport from "./dashboard/SalesReport";
import TopSelingProducts from "./dashboard/TopSellingProducts";

const AdminDashboard = () => {
  return (
    <div className="main-container">
      <AdminNav />
      <div
        style={{
          minWidth: "80%",
          minHeight: "100vh",
        }}
      >
        <SalesReport />
        <TopSelingProducts />
        <RecentOrders />
      </div>
    </div>
  );
};

export default AdminDashboard;
