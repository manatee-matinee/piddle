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
<<<<<<< b853ab5bbd406b9df48653ce5c27f7b5da5b98d1
      <Route path="bill" component={Bill}>
        <Route path=":id" component={Bill} />
      </Route>
=======
      <Route path="bill" component={Bill} />
>>>>>>> Create route and home-link to login page
      <Route path="login" component={Login} />
    </Route>
  </Router>
  ),
  // eslint-disable-next-line no-undef
  document.getElementById('root')
);
