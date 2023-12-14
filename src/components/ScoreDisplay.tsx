import React from 'react';

interface ScoreDisplayProps {
    score: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
    return (
        <div>
            <p>Score: {score}</p>
        </div>
    );
};

export default ScoreDisplay;
