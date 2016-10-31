import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import './Jumbotron.css';

const jumbotronInstance = (
  <Jumbotron>
    <h1>Piddle</h1>
    <p className="lead">Split the bill like a pro.</p>
    <p><Button bsStyle="primary">Learn more</Button></p>
  </Jumbotron>
);

export default jumbotronInstance;
