import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import RedirectUser from "./RedirectUser";
import { currentAdmin } from "../../functions/auth";
import { useHistory } from "react-router-dom";

const AdminRoute = ({ children, ...rest }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [okay, setOkay] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.token) {
      currentAdmin(currentUser.token)
        .then((res) => {
          console.log("Witaj admin", res.data);
          setOkay(true);
        })
        .catch((err) => {
          setOkay(false);
        });
    }
    return () => {};
  }, [currentUser]);

  return (
    <>{okay ? <Route {...rest} render={() => children} /> : <RedirectUser />}</>
  );
};

export default AdminRoute;
