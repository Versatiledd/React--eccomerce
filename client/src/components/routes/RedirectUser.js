import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const RedirectUser = () => {
  const [count, setCount] = useState(5);
  let history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => --count);
    }, 1000);
    console.log(count);

    count === 0 && history.push("/");
    return () => clearInterval(interval);
  }, [count]);

  return <div>Redirect to homepage in {count} seconds. You are not log in</div>;
};

export default RedirectUser;
