import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCategory, selectFilter } from "../store/slices/filterSlice";

export default function Categories() {
  const categories = ["Все", "Мясные", "Вегетарианские", "Гриль", "Острые", "Закрытые"];

  const { categoryId } = useSelector(selectFilter);
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => (
          <li
            key={category}
            onClick={() => dispatch(changeCategory(i))}
            className={categoryId === i ? "active list-item" : "list-item"}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
