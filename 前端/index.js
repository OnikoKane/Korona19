import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import Page from './SearchPage';

let hist = createBrowserHistory();

ReactDOM.render(
    <Router history={hist}>
        <Switch>
            <Route path="/search" component={Page} />
            <Route path="/" component={App} />
        </Switch>
    </Router>,
  document.getElementById('root')
);
//
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
