import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import LocalStorageContext from "../context/LocalStorageContext";
import "./Home.css";

const Home = ({ error, setError }) => {
  const { token, user } = useContext(LocalStorageContext);
  const location = useLocation();

  useEffect(() => {
    if (token) {
      setError(null);
    }
  }, [location.pathname]);

  return (
    <>
      <h1>Jobly</h1>
      <h2>All the jobs in one, convenient place</h2>
      {token ? (
        <p>Welcome back {user}!</p>
      ) : (
        <>
          <button>
            <Link to="/login">Login</Link>
          </button>
          <button>
            <Link to="/signup">Signup</Link>
          </button>
        </>
      )}
      {error && <p>{error}</p>}
    </>
  );
};

export default Home;
