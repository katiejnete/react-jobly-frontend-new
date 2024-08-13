import React, {useContext} from "react";
import { NavLink } from "react-router-dom";
import handleLogout from "../auth/handleLogout";
import LocalStorageContext from "../context/LocalStorageContext";
import "./NavBar.css";

const NavBar = () => {
  const {token, user, setLoggedInUser, setToken, setUserData, setAppliedJobs} = useContext(LocalStorageContext);

  return (
    <nav>
      {token ? (
        <>
          <NavLink to="/companies">Companies</NavLink>
          <NavLink  to="/jobs">Jobs</NavLink>
          <NavLink  to="/profile">Profile</NavLink>
          <NavLink onClick={() => handleLogout(setLoggedInUser, setToken, setUserData, setAppliedJobs)} to="/">Logout {user}</NavLink>
        </>
      ) : (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Signup</NavLink>
        </>
      )}
    </nav>
  );
};

export default NavBar;
