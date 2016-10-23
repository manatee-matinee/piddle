import React from 'react';
import logo from './../../logo.svg';
import './App.css';

const App = ({ children }) => (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Welcome to Piddle.me</h2>
    </div>
    {children}
  </div>
);

App.propTypes = {
  children: React.PropTypes.element,
};

export default App;
