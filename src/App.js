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
  const [ghost1Index, setGhost1Index] = useState(0);
  
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


  useEffect(() => {
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
        board[pacmanIndexes] = <div className="pac-man" key={pacmanIndexes}></div>;
        board[ghost1Index] = <div className="ghost" key={ghost1Index}></div>;
        console.log("create board");
        
        return board;

      }

      setSquares(createBoard());
      
      setStart(true);


    } else if(start){
      console.log("action prev=" + prevIndex + ",current=" + pacmanIndexes);
      squares[ghost1Index-1] = <div key={prevIndex}></div>;
      squares[ghost1Index] = <div className="ghost" key={ghost1Index}></div>;
      setSquares(squares);
      if(prevIndex !== pacmanIndexes){
        function action() {
          console.log("action");
          
          squares[prevIndex] = <div key={prevIndex}></div>;
          squares[pacmanIndexes] = <div className="pac-man" key={pacmanIndexes}></div>;
          setSquares(squares);
        }
        action();
      }
    }
    
  });
  

 
 

  useEffect(() => {
    if(start){
      console.log("add event");
      console.log("prev=" + prevIndex + ",current=" + pacmanIndexes);
      console.log("count:"+count);
      document.addEventListener("keydown", movePacman);

      function movePacman(e) {
        
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
          setCount(count + 1);
        } else if (e.keyCode === 39){
          setPrevindex(pacmanIndexes);
          console.log("set prev index"+prevIndex);
          setPacmanIndex(pacmanIndexes+1);
          console.log("set current index" + pacmanIndexes);
          setCount(count + 1);
        } else if (e.keyCode === 40){
          setPrevindex(pacmanIndexes);
          console.log("set prev index"+prevIndex);
          setPacmanIndex(pacmanIndexes+width);
          console.log("set current index" + pacmanIndexes);
          setCount(count + 1);
        }
        
      }
      return () => {
        document.removeEventListener("keydown", movePacman);
      }
    }
    
  });

  useEffect(() => {
    if(start){
      console.log(ghost1Index);
      function moveGhost() {
        setGhost1Index(ghost1Index+1);
        setCount(count+1);
      }
      let timerId = setInterval(moveGhost, 1000);
      return () => {
        clearInterval(timerId);
      }
    }
  });
  


  return (
    <div className="grid">{squares}</div>
  );
}


export default App;
