import React, { useState } from "react";
import "./SearchForm.css";

const SearchForm = ({ setSearch }) => {
  const INITIAL_STATE = { search: "" };
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(formData["search"]);
    setFormData(INITIAL_STATE);
  };
  
  return (
    <div className="search-form-box">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          placeholder="Enter search term.."
          value={formData.search}
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchForm;
