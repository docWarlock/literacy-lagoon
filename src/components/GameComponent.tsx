import React, { useState, useEffect } from 'react';
import ScoreDisplay from './ScoreDisplay';

interface GameComponentProps {
    difficulty: string;
}

const GameComponent: React.FC<GameComponentProps> = ({ difficulty }) => {
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [playerPosition, setPlayerPosition] = useState({ x: 2, y: 2 });
    const [currentLevel, setCurrentLevel] = useState(1);
    const [currentChallenge, setCurrentChallenge] = useState('');
    const [gameBoard, setGameBoard] = useState<string[][]>(createRandomGameBoard());
    const [completedChallenges, setCompletedChallenges] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    // List of 26 challenges, each corresponding to a letter in the alphabet
    const alphabetChallenges = Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index));

    useEffect(() => {
        // Add event listeners for arrow keys and Enter key
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                handleEnterPress();
            } else {
                handleKeyPress(event.key);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            // Remove event listeners on component unmount
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [playerPosition, gameOver]);

    const handleKeyPress = (key: string) => {
        if (gameOver) {
            return;
        }

        // Handle arrow key presses
        switch (key) {
            case 'ArrowUp':
                handleMove('up');
                break;
            case 'ArrowDown':
                handleMove('down');
                break;
            case 'ArrowLeft':
                handleMove('left');
                break;
            case 'ArrowRight':
                handleMove('right');
                break;
            default:
                break;
        }
    };

    const handleEnterPress = () => {
        if (gameOver) {
            startNewGame();
            return;
        }

        const letterInSquare = gameBoard[playerPosition.y][playerPosition.x];

        // If the square is empty or has a red '❌', do nothing
        if (!letterInSquare || letterInSquare === '❌') {
            return;
        }

        // If the square contains the challenge letter, gain a point and clear the square
        if (letterInSquare === currentChallenge) {
            handleCorrectAnswer();
        } else {
            // If the square contains something other than the challenge letter, lose a life
            handleIncorrectAnswer();
        }
    };

    const handleCorrectAnswer = () => {
        // Logic to handle correct answer
        setScore((prevScore) => prevScore + 1);

        // Increment challenges completed counter
        setCompletedChallenges((prevCompleted) => prevCompleted + 1);

        // Clear the square
        clearSquare();

        // Check if the player has completed the required number of challenges
        if (completedChallenges === 0) {
            // Generate a new challenge and game board
            generateNewBoard();
        } else {
            // Optionally, you can advance the level or change the challenge here
            // For example:
            // if (score % 5 === 0) {
            //   advanceLevel();
            //   selectRandomChallenge();
            // }

            // Generate a new challenge
            selectRandomChallenge();
        }
    };

    const handleIncorrectAnswer = () => {
        // Logic to handle incorrect answer
        if (lives > 0) {
            setLives((prevLives) => prevLives - 1);
        }

        // Optionally, you can end the game if lives reach 0
        if (lives === 1) {
            setGameOver(true);
        } else {
            // Change the square to red
            setGameBoard((prevGameBoard) => {
                const newGameBoard = [...prevGameBoard];
                newGameBoard[playerPosition.y][playerPosition.x] = '❌';
                return newGameBoard;
            });
        }
    };

    const handleMove = (direction: string) => {
        if (gameOver) {
            return;
        }

        // Logic to handle player movement
        switch (direction) {
            case 'up':
                setPlayerPosition((prevPosition) => ({ ...prevPosition, y: Math.max(0, prevPosition.y - 1) }));
                break;
            case 'down':
                setPlayerPosition((prevPosition) => ({ ...prevPosition, y: Math.min(4, prevPosition.y + 1) }));
                break;
            case 'left':
                setPlayerPosition((prevPosition) => ({ ...prevPosition, x: Math.max(0, prevPosition.x - 1) }));
                break;
            case 'right':
                setPlayerPosition((prevPosition) => ({ ...prevPosition, x: Math.min(5, prevPosition.x + 1) }));
                break;
            default:
                break;
        }
    };

    const hasChallengeLettersLeft = (): boolean => {
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 6; col++) {
                if (gameBoard[row][col] === currentChallenge) {
                    return true; // Challenge letter found, there are still challenge letters left
                }
            }
        }
        // If no challenge letters found, generate a new game board
        return false;
    };

    const selectRandomChallenge = () => {
        if (!hasChallengeLettersLeft()) {
            // Regenerate a new game board if there are no challenge letters left
            setGameBoard(createRandomGameBoard());
        }

        const randomIndex = Math.floor(Math.random() * alphabetChallenges.length);
        setCurrentChallenge(alphabetChallenges[randomIndex]);
    };

    const generateNewBoard = () => {
        // Reset challenges completed counter
        setCompletedChallenges(0);

        // Generate a new challenge
        selectRandomChallenge();

        // Generate a new game board
        setGameBoard(createRandomGameBoard());
    };

    const clearSquare = () => {
        // Set the square to an empty string
        setGameBoard((prevGameBoard) => {
            const newGameBoard = [...prevGameBoard];
            newGameBoard[playerPosition.y][playerPosition.x] = '';
            return newGameBoard;
        });
    };

    const startNewGame = () => {
        setGameOver(false);
        setScore(0);
        setLives(3);
        setCurrentLevel(1);
        generateNewBoard();
    };

    useEffect(() => {
        if (!currentChallenge) {
            selectRandomChallenge();
        }
    }, [currentChallenge]);

    // Function to create a random game board with letters
    function createRandomGameBoard(): string[][] {
        const newGameBoard: string[][] = [];

        for (let row = 0; row < 5; row++) {
            const newRow: string[] = [];
            for (let col = 0; col < 6; col++) {
                newRow.push(getRandomLetter());
            }
            newGameBoard.push(newRow);
        }

        // Set the player's starting position to an empty string
        newGameBoard[playerPosition.y][playerPosition.x] = '';

        return newGameBoard;
    }

    // Function to get a random uppercase letter
    function getRandomLetter(): string {
        const randomCharCode = Math.floor(Math.random() * 26) + 65;
        return String.fromCharCode(randomCharCode);
    }

    return (
        <div>
            <h2>Level: {currentLevel}</h2>
            {gameOver ? (
                <div>
                    <h3>Game Over</h3>
                    <button onClick={startNewGame}>Start New Challenge</button>
                </div>
            ) : (
                <>
                    <h3>Challenge: Find the letter {currentChallenge}</h3>
                    <p>Difficulty: {difficulty}</p>
                    <ScoreDisplay score={score} />
                    <div>
                        <p>Lives: {lives}</p>
                    </div>
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
                                            {rowIndex === playerPosition.y && colIndex === playerPosition.x
                                                ? '👾'
                                                : letter}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <p>Controls:</p>
                        <button onClick={() => handleMove('up')}>Up</button>
                        <button onClick={() => handleMove('down')}>Down</button>
                        <button onClick={() => handleMove('left')}>Left</button>
                        <button onClick={() => handleMove('right')}>Right</button>
                        <button onClick={handleEnterPress}>Enter</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default GameComponent;
