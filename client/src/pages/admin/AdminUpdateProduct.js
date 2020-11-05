import React from "react";
import AdminNav from "../../components/nav/AdminNav";
import ContainerUpdate from "./ecommerce/updateProduct/containerUpdate";

const AdminProducts = () => {
  return (
    <div className="main-container">
      <AdminNav />
      <div
        style={{
          minWidth: "80%",
          minHeight: "100vh",
        }}
      >
        <ContainerUpdate />
      </div>
    </div>
  );
};

export default AdminProducts;
