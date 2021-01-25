import React, { useState } from 'react';
import './App.css';
import Board from '../board/Board';

function App() {
  const myMaze = [ 
    [false,false,false,false,false,false,false,false,false], 
    [false,true,false,true,true,false,true,true,false], 
    [false,true,false,false,true,false,true,false,false], 
    [true,true,false,true,true,true,true,true,false], 
    [false,true,false,true,false,true,false,true,false], 
    [false,true,true,true,false,true,true,true,false], 
    [false,false,false,false,false,true,false,false,false]
  ];
  const [maze, exitFinder] = useState(myMaze);
  const [x, setX] = useState('');
  const [y, setY] = useState('');

  const wayOut = (maze, entryPoint) => {
    let allWay = [];
    const passedPoitns = [];
    let exit = false;
    const xLineLengh = maze[0].length - 1;
    const yLineLengh = maze.length - 1;
    if (!maze[y][x]) {
      alert(`this cell isn't walkable`);
      return false;
    }
    const nextCellTest = (x, y, way) => {
      if (exit) return false;
      if (way.length > 1) {
        for (let i = 0; i < passedPoitns.length; i++) {
          if (passedPoitns[i].x === x && passedPoitns[i].y === y) return false
        }
      }
      if (!maze[y]) return false;
      return maze[y][x];
    }
    const mole = (point, way) => {
      const x = point.x;
      const y = point.y;
      if (way.length > 0) {
        if (x === 0 || x === xLineLengh || y === 0 || y === yLineLengh) {
          way.push(point);
          allWay = way;
          exit = true;
          return allWay;
        }
      };
      way.push(point);
      passedPoitns.push(point);
      if (nextCellTest(x, y + 1, way)) {
        const nextPoint = {x: x, y: y + 1}
        mole(nextPoint, [...way])
      }
      if (nextCellTest(x - 1, y, way)) {
        const nextPoint = {x: x - 1, y: y}
        mole(nextPoint, [...way])
      }
      if (nextCellTest(x, y - 1, way)) {
        const nextPoint = {x: x, y: y -1}
        mole(nextPoint, [...way])
      }
      if (nextCellTest(x + 1, y, way)) {
        const nextPoint = {x: x + 1, y: y}
        mole(nextPoint, [...way])
      }
    }
    mole(entryPoint, []);
    return exit ? allWay : 'There is no way out';
  }

  const handleClick = () => {
    const newMaze = [...maze];
    const entryPoint = {};
    entryPoint.x = +x;
    entryPoint.y = +y;
    const way = wayOut(newMaze, entryPoint);
    if (!way) return;
    for (let i = 0; i < way.length; i++) {
      newMaze[way[i].y][way[i].x] = '*';
    }
    exitFinder(newMaze)
  }

  return (
    <div className="common-wrapp">
      <div className="search-wrapp">
        <div className="inputs-wrapp">
          <input 
            type="text" 
            className="coord" 
            placeholder={('X')} 
            value={x}
            onChange={e => setX(e.target.value)}
          />
          <input 
            type="text" 
            className="coord" 
            placeholder={('Y')} 
            value={y}
            onChange={e => setY(e.target.value)}
          />
          <button 
            type="button" 
            className="input-button" 
            onClick={() => handleClick()}
          >
            {('Show me the way')}
          </button>       
        </div>
        <Board
          value = {maze} 
        />
      </div>
    </div>
  );
}

export default App;
