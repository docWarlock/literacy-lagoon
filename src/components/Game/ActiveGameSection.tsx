// import React from 'react';
//
// interface ActiveGameSectionProps {
//     currentChallenge: string;
//     difficulty: string;
//     score: number;
//     lives: number;
//     gameBoard: string[][];
//     playerPosition: { x: number; y: number };
//     handleMove: (direction: string) => void;
//     handleEnterPress: () => void;
// }
//
// const ActiveGameSection: React.FC<ActiveGameSectionProps> = ({
//                                                                  currentChallenge,
//                                                                  difficulty,
//                                                                  score,
//                                                                  lives,
//                                                                  gameBoard,
//                                                                  playerPosition,
//                                                                  handleMove,
//                                                                  handleEnterPress,
//                                                              }) => (
//     <>
//         {/* ... (JSX for active game section) */}
//     </>
// );
//
// export default ActiveGameSection;

import React from 'react';

interface ActiveGameSectionProps {
    currentChallenge: string;
    difficulty: string;
    score: number;
    lives: number;
    gameBoard: string[][];
    playerPosition: { x: number; y: number };
    handleMove: (direction: string) => void;
    handleEnterPress: () => void;
}

const ActiveGameSection: React.FC<ActiveGameSectionProps> = ({
                                                                 currentChallenge,
                                                                 difficulty,
                                                                 score,
                                                                 lives,
                                                                 gameBoard,
                                                                 playerPosition,
                                                                 handleMove,
                                                                 handleEnterPress,
                                                             }) => {
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleEnterPress();
        }
    };

    const handleKeyUp = (event: React.KeyboardEvent) => {
        const direction = event.key;
        handleMove(direction);
    };

    return (
        <>
            {/* ... (JSX for active game section) */}
            <div tabIndex={0} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
                {/* ... (other JSX for game elements) */}
            </div>
        </>
    );
};

export default ActiveGameSection;