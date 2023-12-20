import React from 'react';

interface GameOverSectionProps {
    startNewGame: () => void;
}

const GameOverSection: React.FC<GameOverSectionProps> = ({ startNewGame }) => (
    <div>
        <h3>Game Over</h3>
        <button onClick={startNewGame}>Start New Challenge</button>
    </div>
);

export default GameOverSection;
