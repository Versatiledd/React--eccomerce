import React from "react";
import { Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import RedirectUser from "./RedirectUser";

const UserRoute = ({ children, ...rest }) => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser && currentUser.token ? (
    <Route {...rest} render={() => children} />
  ) : (
    <RedirectUser />
  );
};

export default UserRoute;
