import React from "react";
import { withRouter } from "react-router-dom";
import "./menu-items.styles.scss";

const MenuItems = ({ title, imgUrl, size, history, linkUrl, match }) => {
  return (
    <div
      className={`${size} menu-item`}
      onClick={() => history.push(`${match.url}${linkUrl}`)}
    >
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imgUrl})`
        }}
      ></div>
      <div className="content">
        <h2 className="title">{title.toUpperCase()}</h2>
        <span className="subtitle">Kup teraz</span>
      </div>
    </div>
  );
};

export default withRouter(MenuItems);
