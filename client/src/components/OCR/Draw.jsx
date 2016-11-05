import React from 'react';

class Draw extends React.Component {
  constructor(props) {
    super(props);
    this.context = null;
  }

  componentDidUpdate() {
    this.updateCanvas();
  }
  
  processClick(e) {
    //turns canvas clicks into x and y coords
    e.preventDefault();
    e.stopPropagation();
    const bound = this.refs.canvas.getBoundingClientRect();
    const myX = e.clientX - bound.left;
    const myY = e.clientY - bound.top;
    this.checkWord(myX, myY);
  }
  
  checkWord(x, y) {
    //takes coords of clicks, iterates through data for matching word
    var data = this.props.data.data[0].slice(1);
    for (var word of data) {
      let x1 = word.bounds[0].x;
      let x2 = word.bounds[0].x;
      let y1 = word.bounds[0].x; 
      let y2 = word.bounds[0].x;
      for (var bound of word.bounds) {
        if (bound.x < x1) {
          x1 = bound.x;
        } else if (bound.x > x2) {
          x2 = bound.x;
        }
        if (bound.y < y1) {
          y1 = bound.y;
        } else if (bound.y > y2) {
          y2 = bound.y;
        }
      }
      
      if (x > x1 && x < x2 && y > y1 && y < y2) {
        //FIXME
        console.log(word.desc);
        break;
      }
    }
  }
  
  loadImg() {
    //controls all image drawing
    const ctx = this.context;
    const file = this.props.data.file;
    const img = new Image;
    const that = this;
    
    img.src = (window.URL ? URL : webkitURL).createObjectURL(file);
    img.onload = function() {
      let x = img.width;
      let y = img.height;
      ctx.canvas.width = x;
      ctx.canvas.height = y;
      ctx.drawImage(img, 0, 0, x, y);
      that.drawBoxes();
    };
  }
  
  updateCanvas() {
    //prepare canvas context, clears it before calling helpers
    const ctx = this.refs.canvas.getContext('2d');
    ctx.canvas.width = 0;
    ctx.canvas.height = 0;
    ctx.clearRect(0, 0, 0, 0);
    this.refs.canvas.onmousedown = this.processClick.bind(this);
    this.context = ctx;
    this.loadImg();
  }
  
  drawBoxes() {
    //draws red boxes around recognized words
    const ctx = this.context;
    var data = this.props.data.data[0].slice(1);
    ctx.strokeStyle = 'rgba(255,0,0,0.8)';
    ctx.lineWidth = '2';
    for (var word of data) {
      ctx.beginPath();
      for (var bound of word.bounds) {
        ctx.lineTo(bound.x, bound.y);
      }
      ctx.lineTo(word.bounds[0].x, word.bounds[0].y);
      ctx.stroke();
    }
  }
  
  render() {
    return (
      <canvas ref="canvas"/>
    );
  }
}

export default Draw;