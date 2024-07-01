import { GameObject } from "./GameObject";
import { Cactus } from "./Cactus";

export function manageCacti(gameObjects: GameObject[], canvasId: string, cactusImages: HTMLImageElement[], minDistance: number = 300, maxAttempts: number = 50) {
    const cacti = gameObjects.filter(obj => obj instanceof Cactus) as Cactus[];

    // Remove cacti that have gone off screen
    for (let i = cacti.length - 1; i >= 0; i--) {
        if (cacti[i].getX() < -cacti[i].getWidth()) {
            gameObjects.splice(gameObjects.indexOf(cacti[i]), 1);
        }
    }

    // Ensure there are between 1 and 3 cacti on screen
    const numberOfCacti = Math.floor(Math.random() * 3) + 1;
    while (cacti.length < numberOfCacti) {
        let attempt = 0;
        let x;
        let overlapping;
        do {
            x = 1920 + Math.random() * 1000; // Random initial x position
            overlapping = false;
            for (const cactus of cacti) {
                if (Math.abs(x - cactus.getX()) < minDistance) {
                    overlapping = true;
                    break;
                }
            }
            attempt++;
        } while (overlapping && attempt < maxAttempts);

        if (!overlapping) {
            const baseY = 450;
            const scale = 0.1 + Math.random() * (0.25 - 0.1);
            const baseHeight = cactusImages[0].height; // Assuming all cactus images have the same height


            // Adjust the y-coordinate to align with the ground level
            const adjustedY = baseY - (baseHeight * scale) + baseHeight * 0.25;

            const cactus = new Cactus(canvasId, cactusImages, x, adjustedY, scale, 5);
            gameObjects.push(cactus);
            cacti.push(cactus);
        }

        // Break the loop if max attempts were reached and couldn't place a new cactus
        if (attempt >= maxAttempts) {
            break;
        }
    }
}
