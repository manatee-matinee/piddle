import React, { Component } from 'react';
import logo from './logo.svg';
import './Home.css';
import { Link } from 'react-router';

class Home extends Component {
  render() {
    return (
      <Link to='/bill'>Create Bill</Link>
    );
  }
}

export default Home;
