export const Log = ({ turns }) => {
	return (
		<>
			<h2>Game Log</h2>
			<ol id='log'>
				{turns.map((turn) => (
					<li key={`${turn.square.row}${turn.square.col}`}>
						{turn.player} selected {turn.square.row},{' '}
						{turn.square.col}
					</li>
				))}
			</ol>
		</>
	);
};
