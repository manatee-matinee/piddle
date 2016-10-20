import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Bill from './Bill';
import Home from './Home';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="bill" component={Bill}/>
    </Route>
  </Router>
  ),

  document.getElementById('root')
);
 
 //  <Route path="*" component={App}/>