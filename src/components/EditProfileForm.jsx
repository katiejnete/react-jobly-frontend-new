import React, { useState, useContext } from "react";
import handleEditProfile from "../auth/handleEditProfile";
import LocalStorageContext from "../context/LocalStorageContext";

const EditProfileForm = () => {
  const { setLoggedInUser, userData, setUserData, token } = useContext(LocalStorageContext);
  const { username, firstName, lastName, email } = userData;
  const INITIAL_STATE = {
    username,
    firstName,
    lastName,
    email,
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditProfile(formData, token, setLoggedInUser, setError, setUserData);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        {[
          { name: "username", type: "text" },
          { name: "firstName", type: "text" },
          { name: "lastName", type: "text" },
          { name: "email", type: "email" },
        ].map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name}>{field.name[0].toUpperCase() + field.name.slice(1)} </label>
            <input
              id={field.name}
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required
              disabled={field.name === "username"}

            />
          </div>
        ))}
        <button>Submit</button>
      </form>
      {error && <p>{error}</p>}
    </>
  );
};

export default EditProfileForm;
