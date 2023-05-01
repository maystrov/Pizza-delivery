import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";
import Categories from "../components/Categories";
import PizzaBlock from "../components/pizzaBlock/PizzaBlock";
import Skeleton from "../components/pizzaBlock/Skeleton";
import Sort from "../components/Sort";
import Pagination from "../components/pagination";
import { useNavigate } from "react-router-dom";
import { setFilter } from "../store/slices/filterSlice";
import { fetchPizzas, selectPizzaData } from "../store/slices/pizzaSlice";
import ErrorPage from "./ErrorPage";

export default function Home() {
  const { items: pizzas, status } = useSelector(selectPizzaData);

  const {
    categoryId,
    sortId,
    searchValue,
    currentPage: page,
  } = useSelector(({ filter }) => filter);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const sortItems = ["rating", "price", "price&order=desc", "title"];
  const baseUrl = "https://64307488b289b1dec4c8a50c.mockapi.io/items";
  const search = searchValue ? `&search=${searchValue}` : "";
  const category = categoryId ? `&category=${categoryId}` : "";

  const getPizzas = () => {
    dispatch(
      fetchPizzas({
        sortItems,
        baseUrl,
        search,
        category,
        page,
        sortId,
      })
    );
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(setFilter(params));
      isSearch.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    // if (!isSearch.current) {
    getPizzas();
    // }
    isSearch.current = false;
  }, [categoryId, sortId, searchValue, page]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        sortId,
        page,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortId, searchValue, page]);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" && <ErrorPage />}

      <div className="content__items">
        {status === "loading" &&
          [...new Array(6)].map((_, index) => <Skeleton key={index} className="pizza-block" />)}
        {status === "success" && pizzas.map((pizza) => <PizzaBlock key={pizza.title} {...pizza} />)}
      </div>
      <Pagination />
    </>
  );
}
