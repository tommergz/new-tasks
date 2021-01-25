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
    let passedPoitns = [];
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
    const mole = (point, way, directions) => {
      const x = point.x;
      const y = point.y;
      if (way.length > 0) {
        if (x === 0 || x === xLineLengh || y === 0 || y === yLineLengh) {
          way.push(point);
          if (allWay.length === 0) {
            allWay = way
          } else {
            allWay = allWay > way ? way : allWay
          };
          exit = true;
          return allWay;
        }
      };
      way.push(point);
      passedPoitns.push(point);
      if (nextCellTest(x + directions[0], y + directions[1], way)) {
        const nextPoint = {x: x + directions[0], y: y + directions[1]}
        mole(nextPoint, [...way], directions)
      }
      if (nextCellTest(x + directions[2], y + directions[3], way)) {
        const nextPoint = {x: x + directions[2], y: y + directions[3]}
        mole(nextPoint, [...way], directions)
      }
      if (nextCellTest(x + directions[4], y + directions[5], way)) {
        const nextPoint = {x: x + directions[4], y: y + directions[5]}
        mole(nextPoint, [...way], directions)
      }
      if (nextCellTest(x + directions[6], y + directions[7], way)) {
        const nextPoint = {x: x + directions[6], y: y + directions[7]}
        mole(nextPoint, [...way], directions)
      }
    }
    mole(entryPoint, [], [0, -1, 1, 0, 0, 1, -1, 0]);
    passedPoitns = [];
    exit = false;
    mole(entryPoint, [], [1, 0, 0, 1, -1, 0, 0, -1]);
    passedPoitns = [];
    exit = false;
    mole(entryPoint, [], [0, 1, -1, 0, 0, -1, 1, 0]);
    passedPoitns = [];
    exit = false;
    mole(entryPoint, [], [-1, 0, 0, -1, 1, 0, 0, 1]);
    return exit ? allWay : false;
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
