import React from "react";
import UserNav from "../../components/nav/UserNav";
import RecentOrders from "./RecentOrders";
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
        <RecentOrders />
      </div>
    </div>
  );
};

export default Orders;
