import React, { useContext } from "react";
// import NavLinks from './NavLinks'
import { NavLink } from "react-router-dom";
import "./RightMenu.css";
import { AuthConetxt } from "../context/auth-context";
function RightMenu(props) {
  const menuHandler = () => {
    props.settoggle(!props.toggle);
  };
  const auth = useContext(AuthConetxt);
  const closeHandelr =()=> {
    props.settoggle(!props.toggle);
  }
  return (
    <div className={`rightmenu ${props.toggle ? "active" : ""}` } onClick={closeHandelr}>
      <ul className="linko">
        <li onClick={menuHandler}>
          <NavLink to="/"  className="navbar" exact>
            Home
          </NavLink>
        </li>
        {auth.isLoggedIn && (
          <li onClick={menuHandler}>
            {" "}
            <NavLink to="/places/new" className="navbar" exact>
              Post
            </NavLink>
          </li>
        )}

        {auth.isLoggedIn && (
          <li onClick={menuHandler}>
            <NavLink to={`/${auth.userId}/places`} className="navbar" exact>
              Profile
            </NavLink>
          </li>
        )}

        {!auth.isLoggedIn && (
          <li onClick={menuHandler}>
            {" "}
            <NavLink to="/auth" className="navbar" exact>
              Login
            </NavLink>
          </li>
        )}

        {auth.isLoggedIn && (
          <li onClick={menuHandler} >
            {" "}
            <NavLink to="/auth" onClick={auth.logout} className="navbar" exact>
          Logout
        </NavLink>
        {/* <div onClick={menuHandler}><button onClick={auth.logout}>Logout</button></div> */}
            
          </li>
        )}
      </ul>
    </div>
  );
}

export default RightMenu;
