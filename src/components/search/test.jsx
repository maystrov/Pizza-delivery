import React, { useState } from "react";
import debounce from "lodash.debounce";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // debounce используется здесь, чтобы запросы к API не отправлялись слишком часто
  const handleChange = debounce((value) => {
    setSearchTerm(value);
    // Ваш код для отправки запросов к API с использованием значения `searchTerm`
  }, 500);

  const handleInputChange = (event) => {
    const { value } = event.target;
    handleChange(value);
  };

  return <input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Search" />;
};
