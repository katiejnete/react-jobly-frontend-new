import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import handleLogin from "../auth/handleLogin";
import LocalStorageContext from "../context/LocalStorageContext";

const LoginForm = () => {
  const { user, setLoggedInUser, setToken, setUserData, setAppliedJobs } =
    useContext(LocalStorageContext);

  const INITIAL_STATE = {
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [error, setError] = useState("");

  if (user) {
    return <Navigate to="/" />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({
      formData,
      setLoggedInUser,
      setToken,
      setError,
      setUserData,
      setAppliedJobs,
    });
    setFormData(INITIAL_STATE);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {["username", "password"].map((name) => (
          <div key={name}>
            <input
              type={name === "password" ? "password" : "text"}
              name={name}
              placeholder={name[0].toUpperCase() + name.slice(1)}
              value={formData[name]}
              onChange={handleChange}
              autoComplete={name}
              required
            />
          </div>
        ))}
        <button>Submit</button>
      </form>
    </>
  );
};

export default LoginForm;
