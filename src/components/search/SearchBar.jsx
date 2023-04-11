import React from "react";
import "./youtube.scss";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="search-container">
      <input type="text" className="search-input" placeholder="Поиск..." />
      <button className="search-button" type="submit">
        <FaSearch />
      </button>
    </div>
  );
};
export default SearchBar;
