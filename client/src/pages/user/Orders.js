import React from "react";
import UserNav from "../../components/nav/UserNav";
import "./history.scss";

const Orders = () => {
  return (
    <div className="main-container">
      <UserNav />
      <div
        style={{
          minWidth: "80%",
        }}
      >
        user buying products
      </div>
    </div>
  );
};

export default Orders;
