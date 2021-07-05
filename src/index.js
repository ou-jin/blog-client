import './index.less'
import '../src/config/style/index.less'
import './assets/css/flex.css'
import React from 'react';
import ReactDOM from 'react-dom';
import Main from './views/main/main.js'
import Login from './views/login/login.js'
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";
const App = function () {
    return <Router>
        <Route path="/main"  component={Main} />
        <Route path="/login"  component={Login} />
    </Router>
}
ReactDOM.render(
    <App/>,
    document.getElementById("root")
);
if (module.hot) {
    module.hot.accept();
}