// GameBoard.tsx
import React from 'react';

interface GameBoardProps {
    gameBoard: string[][];
    playerPosition: { x: number; y: number };
}

const createRandomGameBoard = (challengeLetter: string): string[][] => {
    const newGameBoard: string[][] = [];

    for (let row = 0; row < 5; row++) {
        const newRow: string[] = [];
        for (let col = 0; col < 6; col++) {
            // Place the challenge letter in a specific position
            if (row === 2 && col === 2) {
                newRow.push(challengeLetter);
            } else {
                newRow.push(getRandomLetter());
            }
        }
        newGameBoard.push(newRow);
    }

    return newGameBoard;
};

const getRandomLetter = (): string => {
    const randomCharCode = Math.floor(Math.random() * 26) + 65;
    return String.fromCharCode(randomCharCode);
};

const GameBoard: React.FC<GameBoardProps> = ({ gameBoard, playerPosition }) => (
    <div>
        <p>Game Board</p>
        <table>
            <tbody>
            {gameBoard.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {row.map((letter, colIndex) => (
                        <td
                            key={colIndex}
                            style={{ border: '1px solid black', width: '40px', height: '40px' }}
                        >
                            {rowIndex === playerPosition.y && colIndex === playerPosition.x ? '👾' : letter}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);

export { GameBoard, createRandomGameBoard };
