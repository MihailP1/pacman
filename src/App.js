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
  const [walls, setWalls] =useState([]);
  const [count, setCount] = useState(0);
  const [ghost1Index, setGhost1Index] = useState(300);
  const [ghost1PrevIndex, setGhost1PrevIndex] = useState(300)
  const [ghost1PrevElem, setGhost1PrevElem] = useState(<div className="pac-dot" key={ghost1PrevIndex}></div>);
  const [ghost2Index, setGhost2Index] = useState(100);
  const [ghost2PrevIndex, setGhost2PrevIndex] = useState(100)
  const [ghost2PrevElem, setGhost2PrevElem] = useState(<div className="pac-dot" key={ghost2PrevIndex}></div>);
  

  useLayoutEffect(() => {
    function createLayout(num) {
      const lay =[];
      for(let i=0; i < num; i++){
        lay.push(0);
        
      } 
      return lay;  
    }

    function createWalls(num) {

      function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; 
      }
      
      const walls = [];
      for (let i=0; i<num; i++){
        let square = getRandomInt(0, 784);
        
        if(walls.indexOf(square)==-1){
          walls.push(square);
          
        }
      }
      
      return walls;
      
    }

    function addWallsToLayout(layout) {
      
      walls.forEach(element => layout[element] = 1);
      return layout;
    }


    function improveMap(layout) {
      for(let i = 0; i< 28; i++){
        layout[i] = 1;
      }
      for(let i = layout.length - 28; i< layout.length; i++){
        layout[i] = 1;
      }
      for(let i = 0; i< layout.length - 28; i=i+28){
        layout[i] = 1;
      }
      for(let i = 27; i< layout.length; i=i+28){
        layout[i] = 1;
      }

      layout.forEach((element, index)=> {
        if(element == 0){
          let numOfNaighbors = 0;
          
          if(layout[index+1] ==0) numOfNaighbors++;
          if(layout[index-1] ==0) numOfNaighbors++;
          if(layout[index+28] ==0) numOfNaighbors++;
          if(layout[index-28] ==0) numOfNaighbors++;
          
          if(numOfNaighbors == 1) {
            const width = 28;
            if (layout[index+28] !==0 && index + width < width * width){
              layout[index+28] =0;
            } else if(layout[index-28] !==0 && index - width >= 0){
              layout[index-28] =0;
            } else if(layout[index-28] ===0 && index - width >= 0){
              layout[index-56] =0;
            } else if(layout[index+1] !==0 && index % width < width - 1) {
              layout[index+1] = 0;
            } else if (layout[index-1] !==0 && index % width !== 0){
              layout[index-1] =0;
            }  else {
              layout[index]=1;
            }
          } else if (numOfNaighbors == 0){
            layout[index]=1;
          };
          
        }
      });
      
      return layout;
    }
    
    const layout = createLayout(784);
    const walls = createWalls(700);
    setWalls(walls);
    const mapWithWalls = addWallsToLayout(layout);
    const improvedMap1 = improveMap(mapWithWalls);
    const improvedMap2 = improveMap(improvedMap1)
    
    
    setLayout(improvedMap2);
    setStart(false);
  }, []);


  useLayoutEffect(() => {
    if(start === false){
      

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
        
        board[currentPacmanIndex] = <div className="pac-man" key={currentPacmanIndex}></div>;
        board[ghost1Index] = <div className="ghost" key={ghost1Index}></div>;
        board[ghost2Index] = <div className="ghost" key={ghost2Index}></div>;
        console.log("create board");
        
        return board;

      }

      setSquares(createBoard());
      
      setStart(true);


    } else if(start){
      
      squares[ghost1PrevIndex] = ghost1PrevElem;
      squares[ghost2PrevIndex] = ghost2PrevElem;
      setGhost1PrevElem(squares[ghost1Index]);
      setGhost1PrevIndex(ghost1Index);
      setGhost2PrevElem(squares[ghost2Index]);
      setGhost2PrevIndex(ghost2Index);
      squares[ghost1Index] = <div className="ghost" key={ghost1Index}></div>;
      squares[ghost2Index] = <div className="ghost" key={ghost2Index}></div>;
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
      
      function moveGhost1() {
        const width = 28;
        const directions = [-1, +1, width, -width];     
        let direction = directions[Math.floor(Math.random() * directions.length)];   
        let arr =walls;
        let nextIndex = ghost1Index + direction;
        switch(direction) {
          case -1:
            console.log(squares[ghost1Index + direction]);
            console.log("ghost:" + ghost1Index);
            console.log(direction);
            
            if (ghost1Index % width !== 0 && arr.indexOf(nextIndex)==-1) {setGhost1Index(nextIndex)}  else {setGhost1Index(ghost1Index)};
            break;
          case -28:
            if(ghost1Index - width >= 0 && arr.indexOf(nextIndex)==-1) {setGhost1Index(nextIndex)}  else {setGhost1Index(ghost1Index)};
            break;
          case 1:
            if (ghost1Index % width < width - 1 && arr.indexOf(nextIndex)==-1) {setGhost1Index(nextIndex)}  else {setGhost1Index(ghost1Index)};
            break;
          case 28:
            if (ghost1Index + width < width * width && arr.indexOf(nextIndex)==-1) {setGhost1Index(nextIndex)}  else {setGhost1Index(ghost1Index)};
            break;
        }
              
        setCount(count+1);
      }
      function moveGhost2() {
        const width = 28;
        const directions = [-1, +1, width, -width];     
        let direction = directions[Math.floor(Math.random() * directions.length)];   
        let arr =walls;
        let nextIndex = ghost2Index + direction;
        switch(direction) {
          case -1:
            console.log(squares[ghost2Index + direction]);
            console.log("ghost:" + ghost2Index);
            console.log(direction);
            
            if (ghost2Index % width !== 0 && arr.indexOf(nextIndex)==-1) {setGhost2Index(nextIndex)}  else {setGhost2Index(ghost2Index)};
            break;
          case -28:
            if(ghost2Index - width >= 0 && arr.indexOf(nextIndex)==-1) {setGhost2Index(nextIndex)}  else {setGhost2Index(ghost2Index)};
            break;
          case 1:
            if (ghost2Index % width < width - 1 && arr.indexOf(nextIndex)==-1) {setGhost2Index(nextIndex)}  else {setGhost2Index(ghost2Index)};
            break;
          case 28:
            if (ghost2Index + width < width * width && arr.indexOf(nextIndex)==-1) {setGhost2Index(nextIndex)}  else {setGhost2Index(ghost2Index)};
            break;
        }
        setCount(count+1);
      }
      function moveGhosts() {
        moveGhost1();
        moveGhost2();
      }
      let timerId = setInterval(moveGhosts, 100);
      
      return () => {
        clearInterval(timerId);
        
      }

    }
  });
 

  useLayoutEffect(() => {
    if(start){
      console.log("add event");
      
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
              
              setPacmanIndex(currentPacmanIndex-width);
              
              setCount(count + 1);
            }
            break;
          case 39:
            if(currentPacmanIndex % width < width - 1){
              setPrevPacmanIndex(currentPacmanIndex);
             
              setPacmanIndex(currentPacmanIndex+1);
              
              setCount(count + 1);
            }
            break;
          case 40:
            if(currentPacmanIndex + width < width * width){
              setPrevPacmanIndex(currentPacmanIndex);
              
              setPacmanIndex(currentPacmanIndex+width);
              
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
