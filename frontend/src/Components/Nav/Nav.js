/*import React from "react";
import './nav.css';
import {Link} from  "react-router-dom";

function Nav() {
  return (
    <div>
       <ul className="home-ul">
        <li className="home-ll">
            <Link to="/mainhome"className="active home-a">
            <h1>Home</h1>
            </Link>
        </li>
        <li className="home-ll">
        <Link to="/Room"className="active home-a">
            <h1>ADD Booking Request</h1>
            </Link>
        </li>
        <li className="home-ll">
        <Link to="/Room"className="active home-a">
            <h1>Booking details</h1>
            </Link>
        </li>
       </ul>
        </div>
  );
}

export default Nav*/


import React from "react";
import './nav.css';
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      <ul className="home-ul">
        <li className="home-ll">
          <Link to="/mainhome" className="active home-a">
            <h1>Home</h1>
          </Link>
        </li>
        <li className="home-ll">
          <Link to="/addroom" className="active home-a">
            <h1>ADD Booking Request</h1>
          </Link>
        </li>
        <li className="home-ll">
          <Link to="/roomdetails" className="active home-a">
            <h1>Booking details</h1>
          </Link>
        </li>
        <li className="home-ll">
          <Link to="/regi" className="active home-a">
            <button>Register</button>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav;