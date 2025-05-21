import { useState } from 'react';

import { GameBoard } from './components/GameBoard';
import { Player } from './components/Player';
import { Log } from './components/Log';
import { GameOver } from './components/GameOver';

import { WINNING_COMBINATIONS } from './winning-combinations';

const initialGameBoard = [
	[null, null, null],
	[null, null, null],
	[null, null, null]
];

const deriveActivePlayer = (gameTurns) => {
	let currentPlayer = 'X';

	// If the first turn is X, the next turn is O
	if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
		currentPlayer = 'O';
	}

	return currentPlayer;
};

function App() {
	// Keep track of the game turns
	const [players, setPlayers] = useState({ X: 'Player 1', O: 'Player 2' });
	const [gameTurns, setGameTurns] = useState([]);

	// Determine the active player based on the current game turns
	const activePlayer = deriveActivePlayer(gameTurns);

	// Default game board
	let gameBoard = [...initialGameBoard.map((arr) => [...arr])];

	// Extract each turn to reconstruct the game board
	for (const turn of gameTurns) {
		const { square, player } = turn;
		const { row, col } = square;

		gameBoard[row][col] = player;
	}

	let winner = null;

	// Iterate through the winning combinations for a match (Winner)
	for (const combination of WINNING_COMBINATIONS) {
		const firstSquareSymbol =
			gameBoard[combination[0].row][combination[0].column];
		const secondSquareSymbol =
			gameBoard[combination[1].row][combination[1].column];
		const thirdSquareSymbol =
			gameBoard[combination[2].row][combination[2].column];

		// If all three squares have the same symbol then there is a winner
		if (
			firstSquareSymbol &&
			firstSquareSymbol === secondSquareSymbol &&
			firstSquareSymbol === thirdSquareSymbol
		) {
			winner = players[firstSquareSymbol];
		}
	}

	const hasDraw = gameTurns.length === 9 && !winner;

	const handleSelectSquare = (rowIndex, colIndex) => {
		// Update the game turns
		setGameTurns((prevTurns) => {
			// Determine the active player based on the previous game turns
			const currentPlayer = deriveActivePlayer(prevTurns);

			// Update the game turns with the new turn
			const updatedTurns = [
				{
					square: { row: rowIndex, col: colIndex },
					player: currentPlayer
				},
				...prevTurns
			];

			return updatedTurns;
		});
	};

	// Restart the game
	const handleRestartGame = () => {
		// Reset the game board
		setGameTurns([]);
	};

	// Update player names
	const handlePlayerNamesChange = (symbol, newName) => {
		setPlayers((prevPlayers) => {
			return {
				...prevPlayers,
				[symbol]: newName
			};
		});
	};

	return (
		<main>
			<div id='game-container'>
				<ol id='players' className='highlight-player'>
					<Player
						initialName='Player 1'
						symbol='X'
						isActive={activePlayer === 'X'}
						onNameChange={handlePlayerNamesChange}
					/>
					<Player
						initialName='Player 2'
						symbol='O'
						isActive={activePlayer === 'O'}
						onNameChange={handlePlayerNamesChange}
					/>
				</ol>
				{(winner || hasDraw) && (
					<GameOver winner={winner} onRestart={handleRestartGame} />
				)}
				<GameBoard
					onSelectSquare={handleSelectSquare}
					board={gameBoard}
				/>
			</div>
			<Log turns={gameTurns} />
		</main>
	);
}

export default App;
