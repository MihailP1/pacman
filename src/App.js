import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}



function Game(){

  const [pacmanIndexes, setPacmanIndex] = useState([null,490]);
  
  const [squares, setSquares] = useState([]);
  

  function action() {
    const board = squares;
    const prevSquare = pacmanIndexes[0];
    const currentSquare = pacmanIndexes[1];
    board[prevSquare] = <div key={currentSquare}></div>;
    board[currentSquare] = <div className="pac-man" key="pacman"></div>;
    console.log("action");
    console.log(board);
    setSquares(board);
  }
  

  function movePacman(e) {
    
    console.log("key");
    const width = 28;
    switch(e.keyCode){
      case 37:
        console.log(pacmanIndexes);
        setPacmanIndex(1);
        
        break;
      case 38:
        console.log(pacmanIndexes);
        setPacmanIndex(2);
        
        break;
      case 39:
        console.log(pacmanIndexes);
        setPacmanIndex(3);
        
        break;
      case 40:
        console.log(pacmanIndexes);
        setPacmanIndex(4);
        
        break;
    }
    

  }
  
  useEffect(() => {
    
    function createLayout(num) {
      const layout =[];
      for(let i=0; i < num; i++){
        layout.push(0);
        
      }
      console.log(layout);
      return layout;
      
    }

    const layout = createLayout(784);
    

    function createBoard() {

      const board = [];
      for(let i=0; i < layout.length; i++){
        if(layout[i] === 0) {
          board.push(<div className="pac-dot" key={i}></div>)
        } else if (layout[i] === 1) {
          board.push(<div className="wall" key={i}></div>)
        } else if (layout[i] === 3) {
          board.push(<div className="power-pellet" key={i}></div>)
        }
        
      }
      console.log(pacmanIndexes);
      const prevSquare = pacmanIndexes[0];
      const currentSquare = pacmanIndexes[1];
      board[prevSquare] = <div key={currentSquare}></div>;
      board[currentSquare] = <div className="pac-man" key="pacman"></div>;
      console.log(board);
  
      return board;
    }
    setSquares(createBoard());
    
  }, []);

 
 

  useEffect(() => {
    
    document.addEventListener("keyup", movePacman);
  });
  return (
    <div className="grid">{squares}</div>
  );
}


export default App;
