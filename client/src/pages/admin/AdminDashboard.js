import React from "react";
import AdminNav from "../../components/nav/AdminNav";
import "./admin.scss";

const AdminDashboard = () => {
  return (
    <div className="main-container">
      <AdminNav />
      <div
        style={{
          minWidth: "80%",
        }}
      >
        Tutaj nastąpi zarządzanie sklepem internetowym
      </div>
    </div>
  );
};

export default AdminDashboard;
