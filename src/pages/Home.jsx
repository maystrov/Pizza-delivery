import React, { useState, useEffect, useRef } from "react";
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
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

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

  const fetchPizzas = () => {
    setIsLoading(true);
    axios
      .get(`${baseUrl}?limit=6&page=${page}${category}&sortby=${sortItems[sortId]}${search}`)
      .then((response) => {
        setPizzas(response.data);
        setIsLoading(false);
      })
      .catch((error) => alert(error.message + " (loading error)"));
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(setFilter(params));
      isSearch.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    }
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
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} className="pizza-block" />)
          : pizzas.map((pizza) => <PizzaBlock key={pizza.title} {...pizza} />)}
      </div>
      <Pagination />
    </>
  );
}
