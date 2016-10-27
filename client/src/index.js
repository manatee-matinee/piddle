import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import './index.css';
import App from './components/App';
import Bill from './components/Bill';
import Home from './components/Home';
import Login from './components/Login';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="bill" component={Bill}>
        <Route path=":id" component={Bill} />
      </Route>
      <Route path="login" component={Login} />
    </Route>
  </Router>
  ),
  document.getElementById('root')
);
