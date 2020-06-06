import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "./components/Nav";
import LandingPage from "./sections/LandingPage";
import Login from "./sections/Login";
import Signup from "./sections/Signup";
import Profile from "./sections/Profile";
import Inventory from "./sections/Inventory";
import PrivateRoute from "./components/ProtectedRout";
import HomeProfile from "./sections/HomeProfile";
import "./App.css";
import axios from "axios";
axios.defaults.withCredentials = true;

function App() {
  const [auth, setAuth] = useState(localStorage.getItem("user") ? true : false);

  const [userData, setUserData] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : ""
  );
  useEffect(() => {
    const getUserStatus = async () => {
      try {
        await axios.get(
          "http://ec2-34-234-204-188.compute-1.amazonaws.com/users/status"
        );
        return;
      } catch (err) {
        return;
      }
    };
    getUserStatus();
  }, []);

  return (
    <Router>
      <div className="App">
        <NavBar
          userData={userData}
          isAuth={auth}
          onAuth={(data) => setAuth(data)}
        />

        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route
            exact
            path="/login"
            component={(props) => (
              <Login
                {...props}
                onAuth={(data) => setAuth(data)}
                userData={setUserData}
              />
            )}
          ></Route>
          <Route path="/signup">
            <Signup />
          </Route>{" "}
          <PrivateRoute
            auth={auth}
            exact
            path="/profile"
            component={(props) => <Profile userData={userData} {...props} />}
          />
          <PrivateRoute
            auth={auth}
            exact
            path="/inventory"
            component={(props) => <Inventory {...props} />}
          />
          <PrivateRoute
            exact
            path="/inventory/:homeId"
            component={HomeProfile}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
