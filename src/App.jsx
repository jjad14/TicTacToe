import { useState } from 'react';

import { GameBoard } from './components/GameBoard';
import { Player } from './components/Player';
import { Log } from './components/Log';

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
	const [gameTurns, setGameTurns] = useState([]);

	const activePlayer = deriveActivePlayer(gameTurns);

	const handleSelectSquare = (rowIndex, colIndex) => {
		// Update the game turns
		setGameTurns((prevTurns) => {
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

	return (
		<main>
			<div id='game-container'>
				<ol id='players' className='highlight-player'>
					<Player
						initialName='Player 1'
						symbol='X'
						isActive={activePlayer === 'X'}
					/>
					<Player
						initialName='Player 2'
						symbol='O'
						isActive={activePlayer === 'O'}
					/>
				</ol>
				<GameBoard
					onSelectSquare={handleSelectSquare}
					turns={gameTurns}
				/>
			</div>
			<Log turns={gameTurns} />
		</main>
	);
}

export default App;
