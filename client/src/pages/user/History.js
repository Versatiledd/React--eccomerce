import React from "react";
import UserNav from "../../components/nav/UserNav";
import "./history.scss";

const History = () => {
  return (
    <div className="main-container">
      <UserNav />
      <div
        style={{
          minWidth: "80%",
        }}
      >
        to jest komponent z linku
      </div>
    </div>
  );
};

export default History;
