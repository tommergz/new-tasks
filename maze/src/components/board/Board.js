import React from 'react';
import './Board.css';

class Board extends React.Component {
  render() {
    return (
      <div className="canvas-wrapp">
        {this.props.value.map((el, i) => {
          return <div className="element-wrapp" key={i}>
            { 
              el.map((el, i) => {
                let cell = ' ';
                if (!el) {
                  cell = 'X'
                } else {
                  if (el === '*') {
                    cell = '*'
                  }
                }
                return <span key={i+1}>{cell}</span>
              })
            } 
          </div>                                                
        })}
      </div>
    )
  }
}   

export default Board;