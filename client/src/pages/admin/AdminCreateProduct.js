import React from "react";
import AdminNav from "../../components/nav/AdminNav";
import CreateProduct from "./ecommerce/createProduct/CreateProduct";

const AdminCreateProduct = () => {
  return (
    <div className="main-container">
      <AdminNav />
      <div
        style={{
          minWidth: "80%",
          minHeight: "100vh",
        }}
      >
        <CreateProduct />
      </div>
    </div>
  );
};

export default AdminCreateProduct;
