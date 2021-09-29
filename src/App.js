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
  const [start, setStart] = useState("prestart");
  const [layout, setLayout] = useState([]);
  const [walls, setWalls] =useState([]);
  const [count, setCount] = useState(0);
  const [ghost1Index, setGhost1Index] = useState();
  const [ghost1PrevIndex, setGhost1PrevIndex] = useState()
  const [ghost1PrevElem, setGhost1PrevElem] = useState(<div className="wall" key={ghost1PrevIndex}></div>);
  const [ghost2Index, setGhost2Index] = useState();
  const [ghost2PrevIndex, setGhost2PrevIndex] = useState()
  const [ghost2PrevElem, setGhost2PrevElem] = useState(<div className="wall" key={ghost2PrevIndex}></div>);
  const [pacDots, setPacdots] = useState(1);
  

  useLayoutEffect(() => {
    
/*    function createLayout(num) {
      const lay =[];
      for(let i=0; i < num; i++){
        lay.push(0);
        
      } 
      return lay;  
    }
*/  
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; 
    }
    function createLay(num) {
      
      const lay = [];
      let prevSquare = 15;
      lay.push(15);
      let width = 28;
      let directions = [-2, +2, -width*2, +width*2, -3, +3, -width*3, width*3];

      for(let i = 0; i < num; i++){
        
        let direction = getRandomInt(0, 4);
        
        console.log("count:" + i)
        
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


/*    function createWalls(num) {

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
            if (layout[index+28] !==0 && index + width + width < width * width){
              layout[index+28] =0;
            } else if(layout[index-28] !==0 && index - width -width >= 0){
              layout[index-28] =0;
            } else if(layout[index-28] ===0 && index - width >= 0){
              layout[index-56] =0;
            } else if(layout[index+1] !==0 && index % width < width - 2) {
              layout[index+1] = 0;
            } else if (layout[index-1] !==0 && index % width !== 1){
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

    function getWalls(finalMap) {
      finalMap.forEach((elem, index)=>{
        if(elem == 1 && walls.indexOf(index)==-1){
          walls.push(index);
        } else if(elem==0 && walls.indexOf(index)!=-1){
          walls.splice(walls.indexOf(index), 1);
        }
      })
      return walls;
    }
    const initLayout = createLayout(784);
    const walls = createWalls(700);
    setWalls(walls);
    const mapWithWalls = addWallsToLayout(initLayout);
    const improvedMap1 = improveMap(mapWithWalls);
    const improvedMap2 = improveMap(improvedMap1)
  


    setWalls(getWalls(improvedMap2));
    setLayout(improvedMap2);

    
*/

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

      
      setStart(true);
      
      


    } else if(start){
      
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
    if(start){
      
      function moveGhost1() {
        const width = 28;
        const directions = [-1, +1, width, -width];     
        let direction = directions[Math.floor(Math.random() * directions.length)];   
        let arr =walls;
        let nextIndex = ghost1Index + direction;
        switch(direction) {
          case -1:
            
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
        
        let nextIndex = ghost2Index + direction;
        switch(direction) {
          case -1:
            
            if (ghost2Index % width !== 0 && walls.indexOf(nextIndex)==-1) {setGhost2Index(nextIndex)}  else {setGhost2Index(ghost2Index)};
            break;
          case -28:
            if(ghost2Index - width >= 0 && walls.indexOf(nextIndex)==-1) {setGhost2Index(nextIndex)}  else {setGhost2Index(ghost2Index)};
            break;
          case 1:
            if (ghost2Index % width < width - 1 && walls.indexOf(nextIndex)==-1) {setGhost2Index(nextIndex)}  else {setGhost2Index(ghost2Index)};
            break;
          case 28:
            if (ghost2Index + width < width * width && walls.indexOf(nextIndex)==-1) {setGhost2Index(nextIndex)}  else {setGhost2Index(ghost2Index)};
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
      
      
      document.addEventListener("keydown", movePacman);
      function movePacman(e) {
        
        
        const width = 28;

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

  
  


  return (
    <div className = "game">
      <div className = "grid">{squares}</div>
      <div className = "game_data">{pacDots.length}</div>
    </div>
    
  );
}


export default App;
