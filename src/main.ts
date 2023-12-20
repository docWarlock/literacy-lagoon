// main.ts

interface Config extends Phaser.Types.Core.GameConfig {
    scene: Phaser.Scene;
}

class MainScene extends Phaser.Scene {
    private currentRoom: number = 1;

    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
        // Load assets (images, sounds, etc.)
    }

    create() {
        // Set up the initial room
        this.createRoom(this.currentRoom);
    }

    update() {
        // Game update logic
    }

    createRoom(roomNumber: number): void {
        // Create the room layout and elements based on the roomNumber

        // Add spelling test logic
        const spellingTest = prompt("Enter a word to spell:");

        // Check if the spelling is correct (You can implement a more sophisticated logic here)
        if (spellingTest?.toLowerCase() === this.getCorrectWordForRoom(roomNumber)) {
            alert("Correct! You can move to the next room.");
            // Transition to the next room
            this.currentRoom++;
            this.createRoom(this.currentRoom);
        } else {
            alert("Incorrect! Try again.");
            // Handle incorrect spelling, maybe provide hints or allow retries
        }
    }

    private getCorrectWordForRoom(roomNumber: number): string {
        // Define correct words for each room
        switch (roomNumber) {
            case 1:
                return "word1";
            case 2:
                return "word2";
            // Add more cases as needed
            default:
                return "defaultWord";
        }
    }
}

const config: Config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: MainScene,
};

const game = new Phaser.Game(config);
