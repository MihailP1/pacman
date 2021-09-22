import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState, useLayoutEffect } from 'react';

function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}



function Game(){

  const [pacmanIndexes, setPacmanIndex] = useState(490);
  const [prevIndex, setPrevindex] = useState(490);
  const [squares, setSquares] = useState([]);
  const [start, setStart] = useState("prestart");
  const [layout, setLayout] = useState([]);
  const [count, setCount] = useState(0);
  
  useLayoutEffect(() => {
    function createLayout(num) {
      const lay =[];
      for(let i=0; i < num; i++){
        lay.push(0);
        
      }    
      return lay;  
    }

    setLayout(createLayout(784));
    setStart(false);
  }, []);


  useLayoutEffect(() => {
    if(start === false){
      

      function createBoard() {
        const board = [];
        console.log(layout);
        for(let i=0; i < layout.length; i++){
          if(layout[i] === 0) {
            board.push(<div className="pac-dot" key={i}></div>)
          } else if (layout[i] === 1) {
            board.push(<div className="wall" key={i}></div>)
          } else if (layout[i] === 3) {
            board.push(<div className="power-pellet" key={i}></div>)
          }   
        }
        console.log(board);
        board[pacmanIndexes] = <div className="pac-man" key="pacman"></div>;
        console.log("create board");
        
        return board;

      }

      setSquares(createBoard());
      
      setStart(true);


    } else if(start){
      if(prevIndex !== pacmanIndexes){
        function action() {
          const board = squares;
          board[prevIndex] = <div key={prevIndex}></div>;
          board[pacmanIndexes] = <div className="pac-man" key={pacmanIndexes}></div>;
          setSquares(board);
        }
        action();
      }
    }
    
  });
  

 
 

  useLayoutEffect(() => {
    if(start){
      console.log("add event");
      
      document.addEventListener("keyup", movePacman);

      function movePacman(e) {
        console.log("prev=" + prevIndex + ",current=" + pacmanIndexes);
        console.log("count:"+count);
        console.log("pacman move");
        const width = 28;
        if (e.keyCode === 37){  
          setPrevindex(pacmanIndexes);
          
          setPacmanIndex(pacmanIndexes-1);
          setCount(count + 1);
          
          
        } else if (e.keyCode === 38){
          setPrevindex(pacmanIndexes);
          console.log("set prev index"+prevIndex);
          setPacmanIndex(pacmanIndexes-width);
          console.log("set current index" + pacmanIndexes);
          
        } else if (e.keyCode === 39){
          setPrevindex(pacmanIndexes);
          console.log("set prev index"+prevIndex);
          setPacmanIndex(pacmanIndexes+1);
          console.log("set current index" + pacmanIndexes);
          
        } else if (e.keyCode === 40){
          setPrevindex(pacmanIndexes);
          console.log("set prev index"+prevIndex);
          setPacmanIndex(pacmanIndexes+width);
          console.log("set current index" + pacmanIndexes);
          
        }
        
      }
      return () => {
        document.removeEventListener("keyup", movePacman);
      }
    }
    
  });

  


  return (
    <div className="grid">{squares}</div>
  );
}


export default App;
