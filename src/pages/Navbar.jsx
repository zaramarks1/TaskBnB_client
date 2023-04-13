import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "../css/navbar.css"
import { useState, useEffect } from "react";
import authService from "../service/auth.service";

function Navbar() {

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = authService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    authService.logout();
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
            <Link to= "/viewUnits">View all units</Link>
        </li>

        {currentUser ? (
          <>
         
          <li>
           <Link to="/addUnit">Add Unit</Link>
         </li>

        <li>
          <a href="/login" className="nav-link" onClick={logOut}>
            Logout
          </a>
        </li>

        </>
        ) : (
          <>
          <li>
          <Link to= "/register">Sign up</Link>
          </li>

          <li>
          <Link to= "/login">Login</Link>
          </li>
          </>

      )}
       
      </ul>
    </nav>
  );
}

export default Navbar;