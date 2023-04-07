import "../src/scss/app.scss";
import Categories from "./components/Categories";
import Header from "./components/Header";
import PizzaBlock from "./components/PizzaBlock";
import Sort from "./components/Sort";

function App() {
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
              <PizzaBlock title="Mexican" price={155} />
              <PizzaBlock title="Ananas" price={170} />
              <PizzaBlock title="Four cheeses" price={180} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
