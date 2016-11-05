import React, { Component } from 'react';

import Upload from "./Upload.jsx";
import Draw from "./Draw.jsx";

class OCR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shared: {
        file: null,
        data: null
      }
    }
  }
  
  update(data) {
    this.setState({shared: data})
  }
  
  render() {
    return (
      <div>
        <Upload update={this.update.bind(this)}/>
        <Draw data={this.state.shared}/>
      </div>
    );
  }
}

export default OCR;

