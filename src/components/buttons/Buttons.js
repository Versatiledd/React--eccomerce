import React from "react";
import "./button.style.scss";

const Button = ({ children, color, ...otherProps }) => {
  return (
    <button className={`${color ? "color" : "btn"}`} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
