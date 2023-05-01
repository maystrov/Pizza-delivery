import React from "react";
import cartEmptyImg from "../assets/img/empty-cart.png";
import { Link } from "react-router-dom";

export default function CartEmpty() {
  return (
    <div>
      <div className="cart cart--empty">
        <h2>Корзина пустая</h2>
        <h3>Ваша корзина еще пуста, но это легко исправить 😉.</h3>
        <h3>Чтобы заказать пиццу, перейдите на главную страницу.</h3>

        <img src={cartEmptyImg} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>На главную</span>
        </Link>
      </div>
    </div>
  );
}
