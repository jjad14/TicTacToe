export const Log = ({ turns, players }) => {
	return (
		<>
			<h2>Game Log</h2>
			<ol id='log'>
				{turns.map((turn) => (
					<li key={`${turn.square.row}${turn.square.col}`}>
						{players[turn.player]} ({turn.player}) selected{' '}
						{turn.square.row}, {turn.square.col}
					</li>
				))}
			</ol>
		</>
	);
};
