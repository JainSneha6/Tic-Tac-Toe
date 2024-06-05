import {useState} from 'react';

import Player from "./assets/components/Player"
import GameBoard from "./assets/components/GameBoard"
import Log from './assets/components/Log';
import { WINNING_COMBINATIONS } from './winning-combinations.js';
import GameOver from './assets/components/GameOver.jsx';

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';
  if(gameTurns.length>0 && gameTurns[0].player==='X'){
    currentPlayer='O';
  }
  return currentPlayer;
}

const PLAYERS = {
  X:'Player 1',
  O:'Player 2'
};

const INITIAL_GAME_BOARD = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
];

function deriveWinner(gameBoard,players){
  let winner;

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSqaureSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSqaureSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

    for(const turn of gameTurns){
        const {square,player} = turn;
        const {row,col} = square;

        gameBoard[row][col]=player;
    }
    return gameBoard;
}

function App() {

  const [players,setPlayers] = useState(PLAYERS);

  const [gameTurns,setGameTurns] =useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard,players);
  const hasDraw = gameTurns.length === 9 && !winner;


  function handleSquare(rowIndex, colIndex){
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);
    
      const updatedTurns = [
        {square:{row:rowIndex,col:colIndex}, player:currentPlayer},
        ...prevTurns,];
      return updatedTurns;
    });
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol,newName){
    setPlayers(prevPlayers=>{
      return {
        ...prevPlayers,
        [symbol]:newName
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
            playerName={PLAYERS.X}
            playerSymbol="X" 
            isActive={activePlayer==='X'}
            onChangeName={handlePlayerNameChange}/>
          <Player 
            playerName={PLAYERS.O} 
            playerSymbol="O"
            isActive={activePlayer==='O'}
            onChangeName={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner = {winner} onRestart = {handleRestart}/>}
        <GameBoard onSelectSquare={handleSquare} board = {gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App;
