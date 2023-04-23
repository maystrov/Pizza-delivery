import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";
import axios from "axios";
import Categories from "../components/Categories";
import PizzaBlock from "../components/pizzaBlock/PizzaBlock";
import Skeleton from "../components/pizzaBlock/Skeleton";
import Sort from "../components/Sort";
import Pagination from "../components/pagination";
import { useNavigate } from "react-router-dom";
import { setFilter } from "../store/slices/filterSlice";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [pizzas, setPizzas] = useState([]);
  const dispatch = useDispatch();

  // Use only necessary values from the store
  const {
    categoryId,
    sortId,
    searchValue,
    currentPage: page,
  } = useSelector(({ filter }) => filter);

  const sortItems = ["rating", "price", "price&order=desc", "title"];
  const baseUrl = "https://64307488b289b1dec4c8a50c.mockapi.io/items";
  const search = searchValue ? `&search=${searchValue}` : "";
  const category = categoryId ? `&category=${categoryId}` : "";

  const navigate = useNavigate();

  useEffect(() => {
    const params = qs.parse(window.location.search.substring(1));
    // Use setFilter only if params exist
    if (params) {
      dispatch(setFilter(params));
    }
  }, [dispatch]); // Dispatch to be added as a dependency to avoid any warnings

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baseUrl}?limit=6&page=${page}${category}&sortby=${sortItems[sortId]}${search}`)
      .then((response) => {
        setPizzas(response.data);
        setIsLoading(false);
      })
      .catch((error) => alert(error.message + " (loading error)"));
  }, [categoryId, sortId, searchValue, page, category, search]);

  useEffect(() => {
    // Update URL query string on changes to the filter
    const queryString = qs.stringify({
      categoryId,
      sortId,
      page,
    });
    navigate(`?${queryString}`);
  }, [categoryId, sortId, page, navigate]);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? Array.from({ length: 6 }, (_, index) => (
              <Skeleton key={index} className="pizza-block" />
            ))
          : pizzas.map((pizza) => <PizzaBlock key={pizza.title} {...pizza} />)}
      </div>
      <Pagination />
    </>
  );
}
