import React from "react";
import { withRouter } from "react-router-dom";
import "./empty.scss";

const EmptyTrash = ({ history }) => {
  return (
    <div className="wrapper-empty">
      <h2 className="title">Twój koszyk jest pusty</h2>
      <span className="inspiration">Szukasz inspiracji?</span>
      <button className="btn-main" onClick={() => history.push("/")}>
        Przejdź do strony głównej
      </button>
    </div>
  );
};

export default withRouter(EmptyTrash);
