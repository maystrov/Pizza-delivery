import React, { useEffect, useRef, useState } from "react";
import { changeSort, selectFilter } from "../store/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Sort() {
  const [open, setOpen] = useState(false);
  const popupRef = useRef(null);

  const sortNames = ["популярности", "цене (возрастание)", "цене (убывание)", "названию"];

  const { sortId } = useSelector(selectFilter);
  const dispatch = useDispatch();

  const handleSelectItemClick = (i) => {
    dispatch(changeSort(i));
    setOpen(false);
  };

  useEffect(() => {
    const handlePopupClick = (e) => {
      const path = e.composedPath();
      if (!path.includes(popupRef.current)) setOpen(false);
    };
    document.body.addEventListener("click", handlePopupClick);
  }, []);

  return (
    <div ref={popupRef} className="sort">
      <div onClick={() => setOpen(!open)} className="sort__label">
        <svg
          className={!open ? "icon-rotated" : ""}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span>{sortNames[sortId]}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortNames.map((item, i) => (
              <li
                onClick={() => handleSelectItemClick(i)}
                key={i}
                className={sortId === i ? "active" : ""}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
