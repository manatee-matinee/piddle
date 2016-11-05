import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './App.css';
import NavBar from '../NavBar/NavBar';

/**
 * @class App
 * @param {object} props
 * @param {object} props.children
 */
const App = ({ children }) => (
  <div className="App container">
    <NavBar />
    <Row>
      <Col />
      <Col>
        {children}
      </Col>
      <Col />
    </Row>
  </div>
);

App.propTypes = {
  children: React.PropTypes.element,
};

export default App;
