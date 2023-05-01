import "../src/scss/app.scss";
import React from "react";
import Header from "./components/Header";
import ErrorPage from "./pages/ErrorPage";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Pizza from "./pages/Pizza";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="cart" element={<Cart />} />
              <Route path="pizzas/:id" element={<Pizza />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
