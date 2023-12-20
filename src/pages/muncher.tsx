import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import GameComponent from '../components/Game/archive/GameComponent';

const Muncher: React.FC = () => {
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('easy');
    const [gameStarted, setGameStarted] = useState<boolean>(false);

    const handleDifficultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDifficulty(event.target.value);
    };

    const startGame = () => {
        setGameStarted(true);
        // Additional logic to initialize the game with selected difficulty
    };

    return (
        <div>
            <Navbar />
            <h1>Spalding Muncher</h1>

            {!gameStarted && (
                <div>
                    <p>Choose Difficulty:</p>
                    <select value={selectedDifficulty} onChange={handleDifficultyChange}>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                    <button onClick={startGame}>Start Game</button>
                </div>
            )}

            {gameStarted && <GameComponent difficulty={selectedDifficulty} />}
        </div>
    );
};

export default Muncher;
