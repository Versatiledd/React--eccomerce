import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import ShopPage from "./pages/shop/ShopPage";
import Header from "./components/header/header";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/shop" component={ShopPage} />
      </Switch>
    </>
  );
}

export default App;
