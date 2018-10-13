import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import Header from "./components/Header";
import reducers from "./reducers/index";

import "./css/index.css";

const store = createStore(
  reducers /* preloadedState, */,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(
  <Provider store={store}>
    <Header />
  </Provider>,
  document.getElementById("root"),
);
