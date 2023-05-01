import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ErrorPage from "./ErrorPage";
import "../scss/components/_product.scss";
import { typesName } from "../components/pizzaBlock/PizzaBlock";

export default function Pizza() {
  const [pizza, setPizza] = useState();
  const [loading, setIsLoading] = useState(true);
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const responce = await axios.get(`https://64307488b289b1dec4c8a50c.mockapi.io/items/${id}`);
        setPizza(responce.data);
      } catch (error) {
        alert("Не могу загрузить страницу " + error.code);
      }
      setIsLoading(false);
    };
    fetchPizza();
  }, []);

  console.log(pizza);

  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (!pizza) {
    return <ErrorPage />;
  }

  return (
    <div className="product">
      <div className="top">
        <img src={pizza.imageUrl} alt="Pizza title" />

        <div className="all-desc">
          <h2 className="title">{pizza.title}</h2>

          <h3 className="description">
            Пикантная пепперони, увеличенная порция моцареллы, томаты, фирменный томатный соус,
            дрожжевое тесто. Самая популярная пицца 20 столетия.
          </h3>

          <div className="pizza-block__selector">
            <ul>
              {pizza.types.map((type, i) => (
                <li
                  onClick={() => setActiveType(i)}
                  key={Math.random()}
                  className={activeType === i ? "active" : ""}
                >
                  {typesName[type]}
                </li>
              ))}
            </ul>
            <ul>
              {pizza.sizes.map((size, i) => (
                <li
                  onClick={() => setActiveSize(i)}
                  key={Math.random()}
                  className={activeSize === i ? "active" : ""}
                >
                  {size} см.
                </li>
              ))}
            </ul>
          </div>

          <h3 className="price">{pizza.price}</h3>
        </div>
      </div>

      <div className="cart__bottom-buttons">
        <Link to="/" className="button button--outline button--add go-back-btn">
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 13L1 6.93015L6.86175 1"
              stroke="#D3D3D3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span>Вернуться назад</span>
        </Link>
        <div className="button pay-btn">
          <span>Добавить в корзину</span>
        </div>
      </div>
    </div>
  );
}
