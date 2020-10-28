import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import RedirectUser from "./RedirectUser";
import { currentAdmin } from "../../functions/auth";
import { useHistory } from "react-router-dom";

const AdminRoute = ({ children, ...rest }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [okay, setOkay] = useState(false);

  const [count, setCount] = useState(5);
  let history = useHistory();

  useEffect(() => {
    if (currentUser && currentUser.token) {
      currentAdmin(currentUser.token)
        .then((res) => {
          console.log("Witaj admin", res);
          setOkay(true);
        })
        .catch((err) => {
          const interval = setInterval(() => {
            setCount((count) => --count);
          }, 200);
          console.log(count);

          count === 0 && history.push("/");

          setOkay(false);
          return () => clearInterval(interval);
        });
    }
    return () => {};
  }, [currentUser, okay, count]);

  return <>{okay && <Route {...rest} />}</>;
};

export default AdminRoute;
