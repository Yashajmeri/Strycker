import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./NavLinks.css";
import { AuthConetxt } from "../context/auth-context";

function NavLinks(props) {
  const auth = useContext(AuthConetxt);
  return (
    <ul className={props.class}>
      <li>
        <NavLink to="/" className="navbar" exact>
          
          Home
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          {" "}
          <NavLink to="/places/new" className="navbar" exact>
            Post
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/places`} className="navbar" exact>
            Profile
          </NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          {" "}
          <NavLink to="/auth" className="navbar" exact>
            Login
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          {" "}
          {/* <NavLink to="/auth" exact>
          Login
        </NavLink> */}
          {/* <button onClick={auth.logout}>Logout</button> */}
          <NavLink to="/auth" onClick={auth.logout} className="navbar" exact>
            Logout
          </NavLink>
        </li>
      )}
    </ul>
  );
}

export default NavLinks;
