import { useState } from 'react';

import './App.css';

  const isWinner = (board) => {
    const WINNERS = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
    ]

    for(const [x, y, z] of WINNERS){
      if(
        board[x] !== null &&
        board[x] === board[y] &&
        board[y] === board[z] 
      ){
        return board[x]
      }
    }

    return null
  }

export default function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )
  const [isPlayerX, setIsPlayerX] = useState(true)
  const winner = isWinner(board);

  const renderMessage = () => {
    if(winner){
      return `Winner! Player ${winner} wins!`
    }

    if(!board.includes(null)){
      return `Draw! No one Wins`
    }

    return `It is Player ${isPlayerX ? 'X' : 'O'}'s turn.`
  }

  return (
    <div className='app'>
      <h1>{renderMessage()}</h1>
      <div className='board'>
        {board.map((_, index) => (
          <Cell 
          key={index}
          mark={board[index]}
          disabled={board[index] !== null || winner}
          onClick={() => {
            const currPlayer = !isPlayerX ? 'O' : 'X'

            const newBoard = board.slice()
            newBoard[index] = currPlayer
            setBoard(newBoard)
            setIsPlayerX(!isPlayerX)
          }}
          />
        ))}
      </div>
      <button
      onClick={() => {
        const confirm = window.confirm(
          'Reset the game?'
        )

        if(confirm){
          setBoard(Array(9).fill(null))
          setIsPlayerX(false)
        }
      }}
      >Reset</button>
    </div>
  )
}

const Cell = ({ mark, disabled, onClick }) => {
  return (
    <button
      className='cell'
      disabled={disabled}
      onClick={onClick}
    >
      <span>{mark}</span>
    </button>
  )
}