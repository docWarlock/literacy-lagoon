import React from 'react';

interface ScoreDisplayProps {
    score: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => (
    <div>
        <p>Score: {score}</p>
    </div>
);

export default ScoreDisplay;
