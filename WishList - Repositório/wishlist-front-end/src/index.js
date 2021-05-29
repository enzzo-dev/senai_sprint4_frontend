import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';

import './index.css';

import App from './pages/Login/App';
import Desejos from './pages/Desejos/Desejos';
import NotFound from './pages/NotFound/notFound'

import reportWebVitals from './reportWebVitals';

const routing = (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/notfound" component={NotFound} />
        <Route exact path="/" component={App} /> {/* Login */}
        <Route exact path="/desejos" component={Desejos}/> {/*Desejos */}

        {/*Rediriciona para uma página com erro 404 */}
        <Redirect to = "/notfound" />
      </Switch>
    </div>
  </BrowserRouter>
)

ReactDOM.render(
  routing
  ,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
