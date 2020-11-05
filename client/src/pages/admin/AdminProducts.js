import React from "react";
import AdminNav from "../../components/nav/AdminNav";
import ProductList from "./ecommerce/productList/ProductList";

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
        <ProductList />
      </div>
    </div>
  );
};

export default AdminProducts;
