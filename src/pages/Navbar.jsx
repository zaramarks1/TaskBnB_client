import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "../css/navbar.css"

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {/* <li>
          <Link to="/test2">Test 2</Link>
        </li> */}
        <li>
          <Link to="/addUnit">Add Unit</Link>
        </li>
        <li>
            <Link to= "/viewUnits">View all units</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;