import React from "react";
import { Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import createBrowserHistory from "history/createBrowserHistory";
import Main from "./Main";
import Statistic from "./Statistic";
import configureStore from "../store";
import Header from "./Header";
import "../assets/js";
import "../assets/styles/bootstrap.css";
import "../assets/styles/styles.sass";

const history = createBrowserHistory();

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Header />
        <Route path="/" exact component={Main} />
        <Route path="/statistic" component={Statistic} />
      </div>
    </Router>
  </Provider>
);

export default App;
