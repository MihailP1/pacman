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

  const [currentPacmanIndex, setPacmanIndex] = useState(490);
  const [prevPacmanIndex, setPrevPacmanIndex] = useState(490);
  const [squares, setSquares] = useState([]);
  const [start, setStart] = useState("prestart");
  const [layout, setLayout] = useState([]);
  const [count, setCount] = useState(0);
  const [ghost1Index, setGhost1Index] = useState(0);
  const [ghost1PrevIndex, setGhost1PrevIndex] = useState(0)
  const [ghost1PrevElem, setGhost1PrevElem] = useState(<div className="pac-dot" key={ghost1PrevIndex}></div>);
  
  

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
        board[currentPacmanIndex] = <div className="pac-man" key={currentPacmanIndex}></div>;
        board[ghost1Index] = <div className="ghost" key={ghost1Index}></div>;
        console.log("create board");
        
        return board;

      }

      setSquares(createBoard());
      
      setStart(true);


    } else if(start){
      console.log("action prev=" + prevPacmanIndex + ",current=" + currentPacmanIndex);
      squares[ghost1PrevIndex] = ghost1PrevElem;
      setGhost1PrevElem(squares[ghost1Index]);
      setGhost1PrevIndex(ghost1Index);
      squares[ghost1Index] = <div className="ghost" key={ghost1Index}></div>;
      setSquares(squares);
      if(prevPacmanIndex !== currentPacmanIndex){
        function action() {
          console.log("action");
          
          squares[prevPacmanIndex] = <div key={prevPacmanIndex}></div>;
          squares[currentPacmanIndex] = <div className="pac-man" key={currentPacmanIndex}></div>;
          setSquares(squares);
        }
        action();
      }
    }
    
  });
  

  useLayoutEffect(() => {
    if(start){
      console.log(ghost1Index);
      function moveGhost() {
        const width = 28;
        const directions = [-1, +1, width, -width];     
        let direction = directions[Math.floor(Math.random() * directions.length)];   
        switch(direction) {
          case -1:
            if (ghost1Index % width !== 0){setGhost1Index(ghost1Index + direction)}  else {setGhost1Index(ghost1Index)};
            break;
          case -28:
            if(ghost1Index - width >= 0){setGhost1Index(ghost1Index + direction)}  else {setGhost1Index(ghost1Index)};
            break;
          case 1:
            if (ghost1Index % width < width - 1) {setGhost1Index(ghost1Index + direction)}  else {setGhost1Index(ghost1Index)};
            break;
          case 28:
            if (ghost1Index + width < width * width) {setGhost1Index(ghost1Index + direction)}  else {setGhost1Index(ghost1Index)};
            break;
        }
        console.log(direction);
        
        

        setCount(count+1);
      }
      let timerId = setInterval(moveGhost, 100);
      return () => {
        clearInterval(timerId);
      }
    }
  });
 

  useLayoutEffect(() => {
    if(start){
      console.log("add event");
      console.log("prev=" + prevPacmanIndex + ",current=" + currentPacmanIndex);
      console.log("count:"+count);
      document.addEventListener("keydown", movePacman);

      function movePacman(e) {
        
        console.log("pacman move");
        const width = 28;

        switch(e.keyCode) {
          case 37:
            if(currentPacmanIndex % width !== 0){
              setPrevPacmanIndex(currentPacmanIndex);         
              setPacmanIndex(currentPacmanIndex-1);
              setCount(count + 1);
            }
            break;
          case 38:
            if(currentPacmanIndex - width > 0){
              setPrevPacmanIndex(currentPacmanIndex);
              console.log("set prev index"+prevPacmanIndex);
              setPacmanIndex(currentPacmanIndex-width);
              console.log("set current index" + currentPacmanIndex);
              setCount(count + 1);
            }
            break;
          case 39:
            if(currentPacmanIndex % width < width - 1){
              setPrevPacmanIndex(currentPacmanIndex);
              console.log("set prev index"+prevPacmanIndex);
              setPacmanIndex(currentPacmanIndex+1);
              console.log("set current index" + currentPacmanIndex);
              setCount(count + 1);
            }
            break;
          case 40:
            if(currentPacmanIndex + width < width * width){
              setPrevPacmanIndex(currentPacmanIndex);
              console.log("set prev index"+prevPacmanIndex);
              setPacmanIndex(currentPacmanIndex+width);
              console.log("set current index" + currentPacmanIndex);
              setCount(count + 1);
            }
            break;
        }   
      }


      return () => {
        document.removeEventListener("keydown", movePacman);
      }
    }
    
  });

  
  


  return (
    <div className="grid">{squares}</div>
  );
}


export default App;
