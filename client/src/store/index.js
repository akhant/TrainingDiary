import { createStore, applyMiddleware } from "redux";
import reducer from "../reducers";
import thunk from 'redux-thunk';

import logger from "../middlewares/logger";
import fetchData from "../middlewares/dataService";

export default function configureStore() {
  const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk, logger, fetchData)
  );
  window.store = store;

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers", () => {
      const nextRootReducer = require("../reducers/index");
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
