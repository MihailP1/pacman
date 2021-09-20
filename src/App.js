import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

function Game(){
 
  function createLayout(num) {
    const layout =[];
    for(let i=0; i < num; i++){
      layout.push(0);
      
    }
    return layout;
  }
  const layout = createLayout(784);

  function createBoard() {
    const squares =[]
    for(let i=0; i < layout.length; i++){
      if(layout[i] === 0) {
        squares.push(<div className="pac-dot" key={i}></div>)
      } else if (layout[i] === 1) {
        squares.push(<div className="wall" key={i}></div>)
      } else if (layout[i] === 3) {
        squares.push(<div className="power-pellet" key={i}></div>)
      }
    }
    return squares;
  }
  const board = createBoard();
  return (
    <div className="grid">{board}</div>
  );
}
export default App;
