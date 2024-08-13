import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import handleSignup from "../auth/handleSignup";
import LocalStorageContext from "../context/LocalStorageContext";

const SignupForm = () => {
  const { user, setLoggedInUser, setToken, setUserData, setAppliedJobs } =
    useContext(LocalStorageContext);

  const INITIAL_STATE = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [error, setError] = useState("");

  if (user) {
    return <Navigate to="/" />;
  }
  
  const handleChange = ({ target: { name, value } }) => {
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignup({
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
        {[
          { name: "username", type: "text" },
          { name: "password", type: "password" },
          { name: "firstName", type: "text" },
          { name: "lastName", type: "text" },
          { name: "email", type: "email" },
        ].map((field) => (
          <div key={field.name}>
            <input
              type={field.type}
              name={field.name}
              placeholder={field.name[0].toUpperCase() + field.name.slice(1)}
              value={formData[field.name]}
              onChange={handleChange}
              autoComplete={field.name}
              required
            />
          </div>
        ))}
        <button>Submit</button>
      </form>
      {error && <p>{error}</p>}
    </>
  );
};

export default SignupForm;
