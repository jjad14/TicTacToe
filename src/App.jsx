import { useState } from 'react';

import { GameBoard } from './components/GameBoard';
import { Player } from './components/Player';
import { Log } from './components/Log';

function App() {
	// Keep track of the game turns
	const [gameTurns, setGameTurns] = useState([]);
	// Keep track of the active player
	const [activePlayer, setActivePlayer] = useState('X');

	const handleSelectSquare = (rowIndex, colIndex) => {
		// Check who's turn it is
		setActivePlayer((prevActivePlayer) =>
			prevActivePlayer === 'X' ? 'O' : 'X'
		);

		// Update the game turns
		setGameTurns((prevTurns) => {
			let currentPlayer = 'X';

			// If the first turn is X, the next turn is O
			if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
				currentPlayer = 'O';
			}

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
			<Log />
		</main>
	);
}

export default App;
