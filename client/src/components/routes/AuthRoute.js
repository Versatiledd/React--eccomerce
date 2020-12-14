import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import RedirectUser from "./RedirectUser";

const AuthRoute = ({ children, ...rest }) => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser && currentUser.token ? (
    <RedirectUser />
  ) : (
    <Route {...rest} render={() => children} />
  );
};

export default AuthRoute;
