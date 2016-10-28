import React from 'react';
import { Link } from 'react-router';
import './Home.css';

const Home = () => (
  <div>
    <Link to="/bill">Create Bill</Link>
    <br />
    <Link to="/login">Login</Link>
    <br />
    <Link to="/signup">Signup</Link>
  </div>
);

export default Home;
