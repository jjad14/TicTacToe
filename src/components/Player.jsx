import { useState } from 'react';

export const Player = ({ initialName, symbol, isActive }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [playerName, setPlayerName] = useState(initialName);

	let editablePlayerName = <span className='player-name'>{playerName}</span>;

	if (isEditing) {
		editablePlayerName = (
			<input
				type='text'
				required
				name='name'
				value={playerName}
				onChange={(e) => setPlayerName(e.target.value)}
			/>
		);
	}

	return (
		<li className={isActive ? 'active' : undefined}>
			<span className='player'>
				{editablePlayerName}
				<span className='player-symbol'>{symbol}</span>
			</span>
			<button onClick={() => setIsEditing((editing) => !editing)}>
				{isEditing ? 'Save' : 'Edit'}
			</button>
		</li>
	);
};
