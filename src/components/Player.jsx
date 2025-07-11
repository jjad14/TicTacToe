import { useState } from 'react';

export const Player = ({ initialName, symbol, isActive, onNameChange }) => {
	// Keep track of the player name and whether or not it's being edited
	const [isEditing, setIsEditing] = useState(false);
	const [playerName, setPlayerName] = useState(initialName);

	const handleEditClick = () => {
		setIsEditing((editing) => !editing);

		if (isEditing) {
			onNameChange(symbol, playerName);
		}
	};

	// Default to showing the player name
	let editablePlayerName = <span className='player-name'>{playerName}</span>;

	// If the player is being edited, show an input field
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
			<button onClick={handleEditClick}>
				{isEditing ? 'Save' : 'Edit'}
			</button>
		</li>
	);
};
