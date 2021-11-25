import "./index.less";
import "../src/config/style/index.less";
import "./assets/css/flex.css";
import React from "react";
import ReactDOM from "react-dom";
import Main from "./views/main/main.js";
import Login from "./views/login/login.js";
import reduce from "./config/reduce/index.js";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

let store = createStore(reduce);
const App = function () {
  return (
    <Router>

      {/* <Redirect path="/" to="/main" /> */}
      <Route path="/main" component={Main} />
      <Route path="/login" component={Login} />
    </Router>
  );
};
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
if (module.hot) {
  module.hot.accept();
}
