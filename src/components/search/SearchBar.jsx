import React, { useCallback, useState } from "react";
import "./SearchBar.scss";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { changeSearchValue } from "../../store/slices/filterSlice";
import debounce from "lodash.debounce";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const searchValue = useSelector((store) => store.filter.searchValue);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  const updateSearchValue = useCallback(
    debounce((value) => {
      dispatch(changeSearchValue(value));
    }, 500),
    []
  );

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Поиск..."
        value={value}
        onChange={handleInputChange}
      />
      <button className="search-button" type="button">
        <FaSearch />
      </button>
    </div>
  );
};
export default SearchBar;
