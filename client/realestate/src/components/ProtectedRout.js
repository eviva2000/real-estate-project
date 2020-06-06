import React, { useEffect } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;
const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  const history = useHistory();

  // check if the user is already logged in
  useEffect(() => {
    const userStatus = async () => {
      try {
        const response = await axios.get("http://localhost:9090/users/session");
        const data = response.data;
        console.log(data.data);
        localStorage.setItem("user", JSON.stringify(data.data));
      } catch (err) {
        localStorage.removeItem("user");
        return;
      }
    };

    userStatus();
  }, [history]);

  return (
    <Route
      {...rest}
      render={(props) =>
        auth === true || localStorage.getItem("user") ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
export default PrivateRoute;
