import React from 'react';
import { Link, browserHistory } from 'react-router';
import './Home.css';

const Home = () => (
  <div>
    {
      /**
       * @todo Convert this navigation to component
       */
    }
    <Link to="/bill">Create Bill</Link>
    <br />
    <Link to="/login">Login</Link>
    <br />
    <Link to="/signup">Signup</Link>
    <br />
    <Link to="/profile">Profile</Link>
    <br />
    <button
      onClick={() => {
        // eslint-disable-next-line no-undef
        localStorage.removeItem('piddleToken');
        browserHistory.push('/');
      }}
    >Log out</button>
  </div>
);

export default Home;
