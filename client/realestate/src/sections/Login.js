import React, { useState } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import { useForm } from "react-hook-form"; //form validation library
const Login = (props) => {
  const [errorMessage, setErrorMessage] = useState();
  const { onAuth, userData } = props;
  const { register, handleSubmit, errors } = useForm();
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/profile" } };

  if (localStorage.getItem("user")) {
    history.push("/profile");
  }
  const loginHandler = async (formData) => {
    const options = {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(formData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(
      "http://ec2-54-172-55-44.compute-1.amazonaws.com/users/login",
      options
    );
    const data = await res.json();
    console.log("response in login....", data.response);

    onAuth(true);
    userData(data.response);
    localStorage.setItem("user", JSON.stringify(data.response));

    // push to the page you came from to login
    console.log("from here...", from);
    history.push(from);
    setErrorMessage(data.message);
  };

  return (
    <div className="formContainer">
      <section className="formImage"></section>
      <div className="loginForm">
        {" "}
        {errorMessage ? (
          <div style={{ color: "#bb0000" }}>{errorMessage}</div>
        ) : (
          ""
        )}
        <h3>Login</h3>
        <form onSubmit={handleSubmit(loginHandler)}>
          <div>
            <i className="far fa-envelope icon"></i>
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
          </div>
          <div>
            <i className="fa fa-lock icon"></i>
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
          </div>
          <div id="btnLinksContainer">
            <button className="submitButton">Login</button>
            <div className="links">
              <div>
                <a href="/">Forgot password?</a>
              </div>
              <div>
                <Link to="/signup">Don't have an account?</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
