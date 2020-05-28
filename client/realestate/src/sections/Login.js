import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form"; //form validation library
import Auth from "../components/Auth";
const Login = (props) => {
  const [errorMessage, setErrorMessage] = useState();

  const { register, handleSubmit, errors } = useForm();
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/profile" } };

  const loginHandler = async (formData) => {
    const options = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    };
    const res = await fetch("http://localhost:9090/users/login", options);
    const data = await res.json();
    console.log("response....", data);
    props.setUserId(data.userId);
    if (data.status === 200) {
      return Auth.login(() => {
        history.replace(from);
      });
    }
    setErrorMessage(data.message);
  };

  return (
    <div>
      {" "}
      {errorMessage ? (
        <div style={{ color: "#bb0000" }}>{errorMessage}</div>
      ) : (
        ""
      )}
      <h3>login form</h3>
      <form onSubmit={handleSubmit(loginHandler)}>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          ref={register({
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            },
          })}
        />
        {errors.email && <small>* Invalid email address </small>}

        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          ref={register({
            required: true,
            pattern: {
              value: /^(?=.*\d)(?=.*[a-zA-Z]).{5,}$/,
            },
          })}
        />
        {errors.password && (
          <small>* Minimum 5 alpha numberic charecters </small>
        )}

        <button>Login</button>
      </form>
    </div>
  );
};
export default Login;
