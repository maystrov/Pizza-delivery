import React, { useState, useEffect } from "react";

import Categories from "../components/Categories";
import PizzaBlock from "../components/pizzaBlock/PizzaBlock";
import Skeleton from "../components/pizzaBlock/Skeleton";
import Sort from "../components/Sort";

export default function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortId, setSortId] = useState(0);

  console.log(sortId);

  const sortItems = ["rating", "price", "price&order=desc", "title"];
  const baseUrl = "https://64307488b289b1dec4c8a50c.mockapi.io/items";

  useEffect(() => {
    setIsLoading(true);
    fetch(
      categoryId === 0
        ? `${baseUrl}?sortby=${sortItems[sortId]}`
        : `${baseUrl}?category=${categoryId}&sortby=${sortItems[sortId]}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPizzas(data);
        setIsLoading(false);
        window.scrollTo(0, 0);
      })
      .catch((error) => alert(error.message));
  }, [categoryId, sortId]);

  return (
    <>
      <div className="content__top">
        <Categories categoryId={categoryId} changeCategory={(id) => setCategoryId(id)} />
        <Sort sortId={sortId} changeSortId={(value) => setSortId(value)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} className="pizza-block" />)
          : pizzas.map((pizza) => <PizzaBlock key={pizza.title} {...pizza} />)}
      </div>
    </>
  );
}
