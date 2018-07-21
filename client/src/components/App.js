import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Provider, connect } from "react-redux";
import "semantic-ui-css/semantic.min.css";
import decode from "jwt-decode";
import Main from "./Main";
import Statistic from "./pages/Statistic";
import configureStore from "../store";
import Header from "./Header";
import UserRoute from "../routes/UserRoute";
import GuestRoute from "../routes/GuestRoute";
import ConfirmedRoute from "../routes/ConfirmedRoute";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import ConfirmationPage from "./ConfirmationPage";
import HomePage from "./HomePage";
import { userLoggedIn } from "../AC/auth";
import "../assets/js";
import "../assets/styles/bootstrap.css";
import "../assets/styles/styles.sass";

const store = configureStore();

if (localStorage.bookwormJWT) {
  const payload = decode(localStorage.bookwormJWT);
  const user = {
    token: localStorage.bookwormJWT,
    email: payload.email,
    confirmed: payload.confirmed
  };
  store.dispatch(userLoggedIn(user));
}

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <Header />
        
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route exact path="/confirmation" component={ConfirmationPage} />
          <GuestRoute path="/signup" exact component={SignupPage} />
          <GuestRoute path="/login" exact component={LoginPage} />
          <UserRoute path="/dashboard" exact component={Main} />
          <ConfirmedRoute path="/statistic" exact component={Statistic} />

          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  </Provider>
);

export default App;
