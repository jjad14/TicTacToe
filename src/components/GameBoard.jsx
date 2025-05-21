import { useState } from 'react';

const initialGameBoard = [
	[null, null, null],
	[null, null, null],
	[null, null, null]
];

export const GameBoard = ({ onSelectSquare, activePlayerSymbol }) => {
	const [gameBoard, setGameBoard] = useState(initialGameBoard);

	const handleSelectSquare = (rowIndex, colIndex) => {
		setGameBoard((prevGameBoard) => {
			const newGameBoard = [
				...prevGameBoard.map((innerArr) => [...innerArr])
			];

			newGameBoard[rowIndex][colIndex] = activePlayerSymbol;
			return newGameBoard;
		});

		onSelectSquare();
	};

	return (
		<ol id='game-board'>
			{gameBoard.map((row, rowIndex) => (
				<li key={rowIndex}>
					<ol>
						{row.map((playerSymbol, colIndex) => (
							<li key={colIndex}>
								<button
									onClick={() =>
										handleSelectSquare(rowIndex, colIndex)
									}>
									{playerSymbol}
								</button>
							</li>
						))}
					</ol>
				</li>
			))}
		</ol>
	);
};
