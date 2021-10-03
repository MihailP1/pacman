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
  
  const [ghost1Direction, setGhost1Direction] = useState(1); 
  const [stepsToChangeGhost1, setStepsToChangeGhost1] = useState(3);
  const [ghost1Steps, setGhost1Steps] = useState(0);
  

  const [ghost2Index, setGhost2Index] = useState();
  const [ghost2PrevIndex, setGhost2PrevIndex] = useState()
 
  const [ghost2Direction, setGhost2Direction] = useState(1); 
  const [stepsToChangeGhost2, setStepsToChangeGhost2] = useState(3);
  const [ghost2Steps, setGhost2Steps] = useState(0);

  const [ghost3Index, setGhost3Index] = useState();
  const [ghost3PrevIndex, setGhost3PrevIndex] = useState()
 
  const [ghost3Direction, setGhost3Direction] = useState(1); 
  const [stepsToChangeGhost3, setStepsToChangeGhost3] = useState(3);
  const [ghost3Steps, setGhost3Steps] = useState(0);

  const [ghost4Index, setGhost4Index] = useState();
  const [ghost4PrevIndex, setGhost4PrevIndex] = useState()
  
  const [ghost4Direction, setGhost4Direction] = useState(1); 
  const [stepsToChangeGhost4, setStepsToChangeGhost4] = useState(3);
  const [ghost4Steps, setGhost4Steps] = useState(0);

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
        if(element === 0){
          let numOfNaighbors = 0;
          
          if(finalLay[index+1] ===0) numOfNaighbors++;
          if(finalLay[index-1] ===0) numOfNaighbors++;
          if(finalLay[index+28] ===0) numOfNaighbors++;
          if(finalLay[index-28] ===0) numOfNaighbors++;

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
          <div className = "pacman_eye right_eye"></div>
          <div className = "pacman_mouth right_mouth"></div>
        </div>;

        function createGhost(ghostIndex){
          board[ghostIndex] = <div className="ghost" key={ghostIndex}>
          <div className = "left_eye"></div>
          <div className = "right_eye"></div>
        </div>;
        }

        createGhost(ghost1Index);
        createGhost(ghost2Index);
        createGhost(ghost3Index);
        createGhost(ghost4Index);
        
        return board;

      }
      
      for(let i = 0; i<200; i++){
        if(layout[i]===0){
          setGhost1Index(i);
          
          break;
        }
      }
      for(let i = 400; i > 201; i--){
        if(layout[i]===0){
          setGhost2Index(i);
          
          break;
        }
      }
      for(let i = 401; i<600; i++){
        if(layout[i]===0){
          setGhost3Index(i);
          
          break;
        }
      }
      for(let i = layout.length; i > 601; i--){
        if(layout[i]===0){
          setGhost4Index(i);
          
          break;
        }
      }
      for(let i = 301; i<500; i++){
        if(layout[i]===0){
          
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
      if(currentPacmanIndex === ghost1Index || currentPacmanIndex === ghost2Index || currentPacmanIndex === ghost3Index || currentPacmanIndex === ghost4Index) {
        setStage("game over");
      }
      const ghost1States = {
        index: ghost1Index,
        prevIndex: ghost1PrevIndex,
        
        setPrevIndex: setGhost1PrevIndex
      };
      const ghost2States = {
        index: ghost2Index,
        prevIndex: ghost2PrevIndex,
        
        setPrevIndex: setGhost2PrevIndex
      };
      const ghost3States = {
        index: ghost3Index,
        prevIndex: ghost3PrevIndex,
        
        setPrevIndex: setGhost3PrevIndex
      };
      const ghost4States = {
        index: ghost4Index,
        prevIndex: ghost4PrevIndex,
        
        setPrevIndex: setGhost4PrevIndex
      };
      function renderGhost(states) {
        
        if(pacDots.indexOf(states.prevIndex) !== -1) {
          squares[states.prevIndex] = <div className="pac-dot" key={states.prevIndex}></div>
        } else if (pacDots.indexOf(states.prevIndex) === -1) {
          squares[states.prevIndex] = <div key={states.prevIndex}></div>
        }
        
        
        
        states.setPrevIndex(states.index);
        
        squares[states.index] = <div className="ghost" key={states.index}>
          <div className = "left_eye"></div>
          <div className = "right_eye"></div>
        </div>;
        
      }

      renderGhost(ghost1States);
      renderGhost(ghost2States);
      renderGhost(ghost3States);
      renderGhost(ghost4States);

      setSquares(squares);

      if(prevPacmanIndex !== currentPacmanIndex){

        function action() {
          
          if(pacDots.indexOf(currentPacmanIndex)!==-1){
            pacDots.splice(pacDots.indexOf(currentPacmanIndex), 1);
            setPacdots(pacDots);
          }

          
          squares[prevPacmanIndex] = <div key={prevPacmanIndex}></div>;
          if(currentPacmanIndex - prevPacmanIndex === 1) {
            squares[currentPacmanIndex] = 
            <div className="pac-man" key={currentPacmanIndex}>
              <div className = "pacman_eye right_eye"></div>
              <div className = "pacman_mouth right_mouth"></div>
            </div>;
          } else if(currentPacmanIndex - prevPacmanIndex === -1) {
            squares[currentPacmanIndex] = 
            <div className="pac-man" key={currentPacmanIndex}>
              <div className = "pacman_eye left_eye"></div>
              <div className = "pacman_mouth left_mouth"></div>
            </div>;
          } else if(currentPacmanIndex - prevPacmanIndex === 28) {
            squares[currentPacmanIndex] = 
            <div className="pac-man" key={currentPacmanIndex}>
              <div className = "pacman_eye down_eye"></div>
              <div className = "pacman_mouth down_mouth"></div>
            </div>;
          } else if(currentPacmanIndex - prevPacmanIndex === -28) {
            squares[currentPacmanIndex] = 
            <div className="pac-man" key={currentPacmanIndex}>
              <div className = "pacman_eye up_eye"></div>
              <div className = "pacman_mouth up_mouth"></div>
            </div>;
          } else if(prevPacmanIndex === undefined) {
            squares[currentPacmanIndex] = 
            <div className="pac-man" key={currentPacmanIndex}>
              <div className = "pacman_eye right_eye"></div>
              <div className = "pacman_mouth right_mouth"></div>
            </div>;
          }
          
          
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
        direction: ghost1Direction,
        stepsToChange: stepsToChangeGhost1,
        steps: ghost1Steps
      };
      const ghost1Sets={
        setIndex: setGhost1Index,
        setDirection: setGhost1Direction,
        setStepToChange: setStepsToChangeGhost1,
        setSteps: setGhost1Steps
      };
      const ghost2States = {
        index: ghost2Index,
        direction: ghost2Direction,
        stepsToChange: stepsToChangeGhost2,
        steps: ghost2Steps
      };
      const ghost2Sets={
        setIndex: setGhost2Index,
        setDirection: setGhost2Direction,
        setStepToChange: setStepsToChangeGhost2,
        setSteps: setGhost2Steps
      };
      const ghost3States = {
        index: ghost3Index,
        direction: ghost3Direction,
        stepsToChange: stepsToChangeGhost3,
        steps: ghost3Steps
      };
      const ghost3Sets={
        setIndex: setGhost3Index,
        setDirection: setGhost3Direction,
        setStepToChange: setStepsToChangeGhost3,
        setSteps: setGhost3Steps
      };
      const ghost4States = {
        index: ghost4Index,
        direction: ghost4Direction,
        stepsToChange: stepsToChangeGhost4,
        steps: ghost4Steps
      };
      const ghost4Sets={
        setIndex: setGhost4Index,
        setDirection: setGhost4Direction,
        setStepToChange: setStepsToChangeGhost4,
        setSteps: setGhost4Steps
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
            
          

        }
         
        
      }
      
      function moveGhosts() {
        moveGhost(ghost1States, ghost1Sets);
        moveGhost(ghost2States, ghost2Sets);
        moveGhost(ghost3States, ghost3Sets);
        moveGhost(ghost4States, ghost4Sets);
      }
      let timerId = setInterval(moveGhosts, 100);
      
      return () => {
        clearInterval(timerId);
        
      }

    }
  });
 
  
  useLayoutEffect(() => {
  
    if(stage === "game"){
      
      if(pacDots.length === 0) setStage("game over");

      document.addEventListener("keyup", movePacman);
      
      function movePacman(e) {

        switch(e.keyCode) {
          case 37:
            if(currentPacmanIndex % width !== 0 && walls.indexOf(currentPacmanIndex-1) === -1){
              setPrevPacmanIndex(currentPacmanIndex);         
              setPacmanIndex(currentPacmanIndex-1);
              setCount(count + 1);
            }
            break;
          case 38:
            if(currentPacmanIndex - width > 0 && walls.indexOf(currentPacmanIndex-width) === -1){
              setPrevPacmanIndex(currentPacmanIndex);
              
              setPacmanIndex(currentPacmanIndex-width);
              
              setCount(count + 1);
            }
            break;
          case 39:
            if(currentPacmanIndex % width < width - 1 && walls.indexOf(currentPacmanIndex + 1) === -1){
              setPrevPacmanIndex(currentPacmanIndex);
             
              setPacmanIndex(currentPacmanIndex+1);
              
              setCount(count + 1);
            }
            break;
          case 40:
            if(currentPacmanIndex + width < width * width && walls.indexOf(currentPacmanIndex + width )=== -1){
              setPrevPacmanIndex(currentPacmanIndex);
              
              setPacmanIndex(currentPacmanIndex+width);
              
              setCount(count + 1);
            }
            break;
        }   
      }


      return () => {
        document.removeEventListener("keyup", movePacman);
      }
    } 
    
  });

  
 
      
  
  const handlerPacMovement = function movePacman(e) {

    switch(e.target.className) {
      case "left":
        if(currentPacmanIndex % width !== 0 && walls.indexOf(currentPacmanIndex-1) === -1){
          setPrevPacmanIndex(currentPacmanIndex);         
          setPacmanIndex(currentPacmanIndex-1);
         
        }
        break;
      case "up":
        if(currentPacmanIndex - width > 0 && walls.indexOf(currentPacmanIndex-width) === -1){
          setPrevPacmanIndex(currentPacmanIndex);
          
          setPacmanIndex(currentPacmanIndex-width);
          
          
        }
        break;
      case "right":
        if(currentPacmanIndex % width < width - 1 && walls.indexOf(currentPacmanIndex + 1) === -1){
          setPrevPacmanIndex(currentPacmanIndex);
          
          setPacmanIndex(currentPacmanIndex+1);
          
          
        }
        break;
      case "down":
        if(currentPacmanIndex + width < width * width && walls.indexOf(currentPacmanIndex + width )=== -1){
          setPrevPacmanIndex(currentPacmanIndex);
          
          setPacmanIndex(currentPacmanIndex+width);
          
          
        }
        break;
    }   
  }

  

  let game;
  let movementButtons;
  let newGame = "change map";
  if(stage !== "game over"){
    game = <div className = "grid">{squares}</div>;
    
    movementButtons = 
    <div className = "movement_buttons">
      <button className = "up" onClick = {(e) => handlerPacMovement(e)}>↑</button>
      <div>
        <button className = "left" onClick = {(e) => handlerPacMovement(e)}>←</button>
        <button className = "down" onClick = {(e) => handlerPacMovement(e)}>↓</button>
        <button className = "right" onClick = {(e) => handlerPacMovement(e)}>→</button>
      </div>
    </div>;
  } else if (stage === "game over") {
    game = <div className = "gameover_text">GAME OVER</div>;
    newGame = "new game";
  }
  
  
  return (
    <div className = "game">
      {game}
      <div className = "game_data">remain dots: {pacDots.length}</div>
      <button className = "change_map_button" onClick = {() => window.location.reload()}>{newGame}</button>
      {movementButtons}
      
    </div>
    
  );
}





export default App;

