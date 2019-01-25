import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import reducer from "../reducers";

export default function configureStore() {
  const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk, /* logger */)
  );
  window.store = store;
  return store;
}
