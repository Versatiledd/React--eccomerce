import React from "react";
import UserNav from "../../components/nav/UserNav";
import "./history.scss";

const Wishlist = () => {
  return (
    <div className="main-container">
      <UserNav />
      <div
        style={{
          minWidth: "80%",
        }}
      >
        Wishlist
      </div>
    </div>
  );
};

export default Wishlist;
