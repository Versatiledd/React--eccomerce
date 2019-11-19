import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";

const HatsPage = props => {
  console.log(props);
  return <div>{props.history.path}</div>;
};

function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/płaszcze" component={HatsPage} />
      </Switch>
    </>
  );
}

export default App;
