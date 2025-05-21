export const GameOver = ({ winner }) => {
	return (
		<div id='game-over'>
			<h2>Game Over!</h2>

			{winner && <p>{winner} wins!</p>}
			{!winner && <p>It's a draw!</p>}
			<p>
				<button>Play Again</button>
			</p>
		</div>
	);
};
