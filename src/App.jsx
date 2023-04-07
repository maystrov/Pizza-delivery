import "../src/scss/app.scss";
import Categories from "./components/Categories";
import Header from "./components/Header";
import PizzaBlock from "./components/PizzaBlock";
import Sort from "./components/Sort";
// import pizzas from "./assets/pizzas.json";
import { useEffect, useState } from "react";

function App() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetch("https://64307488b289b1dec4c8a50c.mockapi.io/items")
      .then((res) => res.json())
      .then((data) => setPizzas(data))
      .catch((error) => prompt(error.message));
  }, []);

  return (
    <div className="App">
      <div className="wrapper">
        <Header />

        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {pizzas.map((obj) => (
                <PizzaBlock {...obj} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
