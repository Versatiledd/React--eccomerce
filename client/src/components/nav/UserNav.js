import React from "react";
import { Link } from "react-router-dom";

const UserNav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/moje-zakupy">Historia zakupów</Link>
        </li>
        <li>
          <Link to="/moje-zakupy">Resetowanie hasła</Link>
        </li>
        <li>
          <Link to="/moje-zakupy">Ustawienia konta</Link>
        </li>
      </ul>
    </nav>
  );
};

export default UserNav;
