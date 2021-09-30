import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState, useLayoutEffect } from 'react';

function App() {
  return (
    <div className="App">
      <h1>PACMAN</h1>
      <Game />
    </div>
  );
}


function Game(){

  const [currentPacmanIndex, setPacmanIndex] = useState();
  const [prevPacmanIndex, setPrevPacmanIndex] = useState();
  const [squares, setSquares] = useState([]);
  //stages: "preparation" -> "game" -> "game over"
  const [stage, setStage] = useState();
  const [layout, setLayout] = useState([]);
  const [walls, setWalls] =useState([]);
  const [count, setCount] = useState(0);

  const [ghost1Index, setGhost1Index] = useState();
  const [ghost1PrevIndex, setGhost1PrevIndex] = useState()
  const [ghost1PrevElem, setGhost1PrevElem] = useState(<div className="wall" key={ghost1PrevIndex}></div>);
  const [ghost1Direction, setGhost1Direction] = useState(); 
  const [stepsToChangeGhost1, setStepsToChangeGhost1] = useState(3);
  const [ghost1Steps, setGhost1Steps] = useState(0);
  

  const [ghost2Index, setGhost2Index] = useState();
  const [ghost2PrevIndex, setGhost2PrevIndex] = useState()
  const [ghost2PrevElem, setGhost2PrevElem] = useState(<div className="wall" key={ghost2PrevIndex}></div>);
  const [ghost2Direction, setGhost2Direction] = useState(); 
  const [stepsToChangeGhost2, setStepsToChangeGhost2] = useState(3);
  const [ghost2Steps, setGhost2Steps] = useState(0);

  const [pacDots, setPacdots] = useState(1);
  //width of square
  const [width, setWidth] = useState(28);
  

  useLayoutEffect(() => {
    

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; 
    }
    function createLay(num) {
      
      const lay = [];
      let prevSquare = 15;
      lay.push(15);
      
      let directions = [-2, +2, -width*2, +width*2, -3, +3, -width*3, width*3];

      for(let i = 0; i < num; i++){
        
        let direction = getRandomInt(0, 4);
        
        
        
        if(lay.indexOf(prevSquare + directions[direction]) !== -1){
          direction = getRandomInt(0, 8);
        } 
        if(lay.indexOf(prevSquare + directions[direction]) !== -1){
          direction = getRandomInt(0, 8);
        } 

        
        switch(direction){
          
          
          case 0:
            if(prevSquare % width - 1 !== 0){
              prevSquare = prevSquare -1;
              lay.push(prevSquare);
              prevSquare = prevSquare - 1;
              lay.push(prevSquare);
            } 
            break;
          
          case 1:
            if(prevSquare % width < width - 2){
              prevSquare = prevSquare + 1;
              lay.push(prevSquare);
              prevSquare = prevSquare + 1;
              lay.push(prevSquare);
            } 
            break;
          
          case 2:
            if(prevSquare - width*2 >= 0){
              prevSquare = prevSquare - width;
              lay.push(prevSquare);
              prevSquare = prevSquare - width;
              lay.push(prevSquare);
            } 
            break;
          
          case 3:
            if(prevSquare + width*2 < width * width){
              prevSquare = prevSquare + width;
              lay.push(prevSquare);
              prevSquare = prevSquare + width;
              lay.push(prevSquare);
            }
            break;

          
        }
        
      }

      const finalLay = [];
      for(let i = 0; i < 784; i++) {
        if(lay.indexOf(i)!==-1){
          finalLay.push(0);
        } else  {
          finalLay.push(1);
        }
      }
      
      finalLay.forEach((element, index)=> {
        if(element == 0){
          let numOfNaighbors = 0;
          
          if(finalLay[index+1] ==0) numOfNaighbors++;
          if(finalLay[index-1] ==0) numOfNaighbors++;
          if(finalLay[index+28] ==0) numOfNaighbors++;
          if(finalLay[index-28] ==0) numOfNaighbors++;

          if(numOfNaighbors < 1) finalLay[index] = 1;
       }

      });
      return finalLay;
    }

      
    function getWalls(lay) {
      const walls = []
      lay.forEach((elem, index) => {
        if(elem === 1) walls.push(index);
      })
      return walls;
    }
    const finalMap = createLay(400);
    const finalWalls = getWalls(finalMap)
    setWalls(finalWalls);
    setLayout(finalMap);

    
    const directions = [-1, +1, width, -width];     
    setGhost1Direction(directions[Math.floor(Math.random() * directions.length)]); 

    setStage("preparation");
    
  }, []);


  useLayoutEffect(() => {
    if(stage === "preparation") {
      

      function createBoard() {
        const board = [];
        
        for(let i=0; i < layout.length; i++){
          if(layout[i] === 0) {
            board.push(<div className="pac-dot" key={i}></div>)
          } else if (layout[i] === 1) {
            board.push(<div className="wall" key={i}></div>)
          }   
        }
        
        
        board[currentPacmanIndex] = <div className="pac-man" key={currentPacmanIndex}>
          <div className = "pacman_eye"></div>
          <div className = "pacman_mouth"></div>
        </div>;
        board[ghost1Index] = <div className="ghost" key={ghost1Index}>
          <div className = "left_eye"></div>
          <div className = "right_eye"></div>
        </div>;
        board[ghost2Index] = <div className="ghost" key={ghost2Index}>
          <div className = "left_eye"></div>
          <div className = "right_eye"></div>
        </div>;
        
        
        
        
        return board;

      }
      
      for(let i = 0; i<300; i++){
        if(layout[i]==0){
          setGhost1Index(i);
          
          break;
        }
      }
      for(let i = 601; i<784; i++){
        if(layout[i]==0){
          setGhost2Index(i);
          
          break;
        }
      }
      for(let i = 301; i<500; i++){
        if(layout[i]==0){
          
          setPacmanIndex(i);
          
          break;
        }
      }

      setSquares(createBoard());
      
      function getPacdots() {
        const pacDots = [];
        for(let i = 0; i < layout.length; i++){
          if(layout[i] === 0) pacDots.push(i);
        }
        return pacDots;
      }
      setPacdots(getPacdots());

      
      setStage("game");
      
      


    } else if(stage === "game"){
      if(currentPacmanIndex === ghost1Index || currentPacmanIndex === ghost2Index) {
        setStage("game over");
      }
      squares[ghost1PrevIndex] = ghost1PrevElem;
      squares[ghost2PrevIndex] = ghost2PrevElem;
      setGhost1PrevElem(squares[ghost1Index]);
      setGhost1PrevIndex(ghost1Index);
      setGhost2PrevElem(squares[ghost2Index]);
      setGhost2PrevIndex(ghost2Index);
      squares[ghost1Index] = <div className="ghost" key={ghost1Index}>
        <div className = "left_eye"></div>
        <div className = "right_eye"></div>
      </div>;
      squares[ghost2Index] = <div className="ghost" key={ghost2Index}>
        <div className = "left_eye"></div>
        <div className = "right_eye"></div>
      </div>;
      setSquares(squares);
      if(prevPacmanIndex !== currentPacmanIndex){

        function action() {
          
          if(pacDots.indexOf(currentPacmanIndex)!==-1){
            pacDots.splice(pacDots.indexOf(currentPacmanIndex), 1);
            setPacdots(pacDots);
          }

          
          squares[prevPacmanIndex] = <div key={prevPacmanIndex}></div>;
          squares[currentPacmanIndex] = <div className="pac-man" key={currentPacmanIndex}>
            <div className = "pacman_eye"></div>
            <div className = "pacman_mouth"></div>
          </div>;
          
          setSquares(squares);
        }

        action();
        
      }
    }
    
  });
  

  useLayoutEffect(() => {
    if(stage === "game"){
      

      const ghost1States = {
        index: ghost1Index,
        prevIndex: ghost1PrevIndex,
        prevElem: ghost1PrevElem,
        direction: ghost1Direction,
        stepsToChange: stepsToChangeGhost1,
        steps: ghost1Steps
      };
      const ghost1Sets={
        setIndex: setGhost1Index,
        setPrevIndex: setGhost1PrevIndex,
        setPrevElem: setGhost1PrevElem,
        setDirection: setGhost1Direction,
        setStepToChange: setStepsToChangeGhost1,
        setSteps: setGhost1Steps
      };
      const ghost2States = {
        index: ghost2Index,
        prevIndex: ghost2PrevIndex,
        prevElem: ghost2PrevElem,
        direction: ghost2Direction,
        stepsToChange: stepsToChangeGhost2,
        steps: ghost2Steps
      };
      const ghost2Sets={
        setIndex: setGhost2Index,
        setPrevIndex: setGhost2PrevIndex,
        setPrevElem: setGhost2PrevElem,
        setDirection: setGhost2Direction,
        setStepToChange: setStepsToChangeGhost2,
        setSteps: setGhost2Steps
      };

      function moveGhost(states, sets){
        
        
        
        let way = Math.floor(Math.random() * 2);
        
        function getRandomInt(min, max) {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min)) + min; 
        }

        const directions = [-1, +1, width, -width]; 


        function changeDirection(direction){
          if(states.steps !== states.stepsToChange) {
            sets.setDirection(direction);
            sets.setSteps(states.steps + 1);
          } else if (states.steps === states.stepsToChange) {
              
              sets.setDirection(directions[Math.floor(Math.random() * directions.length)]);
              sets.setStepToChange(getRandomInt(2, 3));
              sets.setSteps(0);
          }
        } 

        switch(states.direction) {
           
          case -1:
            
            if (states.index % width !== 0 && walls.indexOf(states.index - 1) == -1) {
              
              sets.setIndex(states.index - 1);
              changeDirection(-1);   
              break;
            } else if(way === 0 && states.index - width >= 0 && walls.indexOf(states.index - width) == -1) {
              
              sets.setIndex(states.index - width);
              changeDirection(-28); 
              break;
            } else if (way === 1 && states.index + width < width * width && walls.indexOf(states.index + width)==-1) {
              
              sets.setIndex(states.index + width);
              changeDirection(28); 
              break;
            } else if (states.index % width < width - 1 && walls.indexOf(states.index + 1)==-1) {
              
              sets.setIndex(states.index + 1);
              changeDirection(1); 
              break;
            }
          case -28:
            if(states.index - width >= 0 && walls.indexOf(states.index - width)==-1) {
              
              sets.setIndex(states.index - width);
              changeDirection(-28); 
              break;
            } else if (way === 0 && states.index % width < width - 1 && walls.indexOf(states.index + 1)==-1) {
              
              sets.setIndex(states.index + 1);
              changeDirection(1); 
              break;
            } else if (way === 1 && states.index % width !== 0 && walls.indexOf(states.index - 1)==-1) {
              
              sets.setIndex(states.index - 1);
              changeDirection(-1); 
              break;
            } else if (states.index + width < width * width && walls.indexOf(states.index + width)==-1) {
              
              sets.setIndex(states.index + width);
              changeDirection(28); 
              break;
            }
            
            
          case 1:
            if (states.index % width < width - 1 && walls.indexOf(states.index + 1)==-1) {
             
              sets.setIndex(states.index + 1);
              changeDirection(1); 
              break;
            } else if(way === 0 && states.index - width >= 0 && walls.indexOf(states.index - width)==-1) {
              
              sets.setIndex(states.index - width);
              changeDirection(-28); 
              break;
            } else if (way === 1 && states.index + width < width * width && walls.indexOf(states.index + width)==-1) {
              
              sets.setIndex(states.index + width);
              changeDirection(28); 
              break;
            } else if (states.index % width !== 0 && walls.indexOf(states.index - 1)==-1) {
              
              sets.setIndex(states.index - 1);
              changeDirection(-1); 
              break;
            }
            
          case 28:
            if (states.index + width < width * width && walls.indexOf(states.index + width)==-1) {
              
              sets.setIndex(states.index + width);
              changeDirection(28); 
              break;
            } else if (way === 0 && states.index % width < width - 1 && walls.indexOf(states.index + 1)==-1) {
              
              sets.setIndex(states.index + 1);
              changeDirection(1); 
              break;
            } else if (way === 1 && states.index % width !== 0 && walls.indexOf(states.index - 1)==-1) {
              
              sets.setIndex(states.index - 1);
              changeDirection(-1); 
              break;
            } else if(states.index - width >= 0 && walls.indexOf(states.index - width)==-1) {
              
              sets.setIndex(states.index - width);
              changeDirection(-28); 
              break;
            }
            
          default:
            
            sets.setIndex(states.index);
            
           
            sets.setDirection(directions[Math.floor(Math.random() * directions.length)]);
            break;

        }
         
        
      }
      
      function moveGhosts() {
        moveGhost(ghost1States, ghost1Sets);
        moveGhost(ghost2States, ghost2Sets);
      }
      let timerId = setInterval(moveGhosts, 140);
      
      return () => {
        clearInterval(timerId);
        
      }

    }
  });
 
  
  useLayoutEffect(() => {
  
    if(stage === "game"){
      
      if(pacDots.length === 0) setStage("game over");
      document.addEventListener("keydown", movePacman);
      function movePacman(e) {
        
        
        

        switch(e.keyCode) {
          case 37:
            if(currentPacmanIndex % width !== 0 && walls.indexOf(currentPacmanIndex-1) == -1){
              setPrevPacmanIndex(currentPacmanIndex);         
              setPacmanIndex(currentPacmanIndex-1);
              setCount(count + 1);
            }
            break;
          case 38:
            if(currentPacmanIndex - width > 0 && walls.indexOf(currentPacmanIndex-width) == -1){
              setPrevPacmanIndex(currentPacmanIndex);
              
              setPacmanIndex(currentPacmanIndex-width);
              
              setCount(count + 1);
            }
            break;
          case 39:
            if(currentPacmanIndex % width < width - 1 && walls.indexOf(currentPacmanIndex + 1) == -1){
              setPrevPacmanIndex(currentPacmanIndex);
             
              setPacmanIndex(currentPacmanIndex+1);
              
              setCount(count + 1);
            }
            break;
          case 40:
            if(currentPacmanIndex + width < width * width && walls.indexOf(currentPacmanIndex + width )== -1){
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

  let game;
  if(stage !== "game over"){
    game = <div className = "grid">{squares}</div>;
  } else if (stage === "game over") {
    game = <div >GAME OVER</div>;
  }
  

  return (
    <div className = "game">
      {game}
      <div className = "game_data">{pacDots.length}</div>
    </div>
    
  );
}





export default App;

