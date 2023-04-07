import React, { useState } from "react";

export default function Categories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const categories = ["Все", "Мясные", "Вегетарианские", "Гриль", "Острые", "Закрытые"];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => (
          <li
            key={category}
            onClick={() => handleClick(i)}
            className={activeIndex === i ? "active" : ""}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
