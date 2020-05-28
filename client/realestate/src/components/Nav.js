import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "../sections/Login";
import Signup from "../sections/Signup";
import Profile from "../sections/Profile";
import Inventory from "../sections/Inventory";
import { ProtectedRoute } from "./ProtectedRout";

const Nav = () => {
  const [userId, setUserId] = useState("");
  return (
    <div className="Nav">
      <Router>
        {userId ? (
          <ul>
            <Link to="/">Home</Link>
            <Link to="/inventory">Inventory</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/logout">Log out</Link>
          </ul>
        ) : (
          <ul>
            <Link to="/">Home</Link>
            <Link to="/inventory">Inventory</Link>

            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </ul>
        )}

        <div>
          <Switch>
            <Route exact path="/" />
            <Route path="/login">
              <Login setUserId={setUserId} />
            </Route>
            <Route path="/signup">
              <Signup setUserId={setUserId} />
            </Route>{" "}
            />
            <ProtectedRoute path="/profile">
              <Profile userId={userId} />
            </ProtectedRoute>{" "}
            />
            <ProtectedRoute path="/inventory">
              <Inventory userId={userId} />
            </ProtectedRoute>{" "}
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default Nav;
