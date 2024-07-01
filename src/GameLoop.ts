import { Ground } from "./Ground";
import { GameObject } from "./GameObject";
import { Gravity } from "./Gravity";
import { Dino } from "./Dino";
import { Background } from "./Background";
import { manageCacti } from "./ManageCacti";
import { checkCollision } from "./CheckCollision";
import { updateGame } from "./Score";

let lastFrameTime = performance.now()

// Centralized game loop function
export function gameLoop(gameObjects: GameObject[], gravity: Gravity, ground: Ground, background: Background, canvasId: string, cactusImages: HTMLImageElement[]) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    // Set ground for Dino if it exists in gameObjects
    const dino = gameObjects.find(obj => obj instanceof Dino) as Dino | undefined;
    if (dino) {
        dino.setGround(ground);
    }

    let gameRunning = true;

    function loop() {
        const currentTime = performance.now();
        const deltaTime = (currentTime - lastFrameTime) / 1000; // Convert to seconds
        lastFrameTime = currentTime;

        if (ctx && gameRunning) {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
            background.update();
            background.drawElements();

            const minDistanceBetweenCacti = 400; // Change this value to adjust the minimum distance
            const maxAttemptsToPlaceCacti = 50; // Maximum number of attempts to place a cactus
            manageCacti(gameObjects, canvasId, cactusImages, minDistanceBetweenCacti, maxAttemptsToPlaceCacti);

            for (const obj of gameObjects) {
                gravity.applyTo(obj);
                obj.update();
                obj.draw(); // Draw the object
            }

            if (dino) {
                for (const obj of gameObjects) {
                    console.log(obj);
                    if (obj !== dino && checkCollision(dino, obj)) {
                        gameRunning = false;
                        console.log("Collision detected! Game over.");
                        break;
                    }
                }
            }

        }

        if (gameRunning) {
            updateGame(deltaTime);
            requestAnimationFrame(loop);
        }
    }

    loop();
}
