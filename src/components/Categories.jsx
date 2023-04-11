import React, { useState } from "react";

export default function Categories({ categoryId, changeCategory }) {
  const categories = ["Все", "Мясные", "Вегетарианские", "Гриль", "Острые", "Закрытые"];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => (
          <li
            key={category}
            onClick={() => changeCategory(i)}
            className={categoryId === i ? "active list-item" : "list-item"}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
