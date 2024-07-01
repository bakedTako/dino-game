import { RepeatedDraw } from "./Draw";
import { Ground } from "./Ground";
import { GameObject } from "./GameObject";
import { Gravity } from "./Gravity";
import { Player } from "./Player";
import { Dino } from "./Dino";
import { Cactus } from "./cactus";

// Preload images
function preloadImages(imagePaths: string[], callback: (images: HTMLImageElement[]) => void) {
    const images: HTMLImageElement[] = [];
    let loadedImagesCount = 0;

    imagePaths.forEach(path => {
        const img = new Image();
        img.src = path;
        img.onload = () => {
            loadedImagesCount++;
            if (loadedImagesCount === imagePaths.length) {
                callback(images);
            }
        };
        img.onerror = () => {
            console.error(`Failed to load image at path: ${path}`);
        };
        images.push(img);
    });
}


// Centralized game loop function
function gameLoop(gameObjects: GameObject[], gravity: Gravity, ground: Ground, canvasId: string) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    // Set ground for Dino if it exists in gameObjects
    const dino = gameObjects.find(obj => obj instanceof Dino) as Dino | undefined;
    if (dino) {
        dino.setGround(ground);
    }

    function loop() {
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas

            for (const obj of gameObjects) {
                gravity.applyTo(obj);
                console.log(obj)
                // Apply gravity

                // Check and resolve collisions with ground for Dino only
                // if (obj instanceof Dino && obj.intersectsGround(ground)) {
                //     obj.update(); // Update Dino's position and stop falling
                // } else {
                //     obj.update(); // Update position for other game objects
                // }

                obj.update()    

                obj.draw(); // Draw the object
            }
        }

        requestAnimationFrame(loop);
    }

    loop();
}

// Example usage

const ImagePaths: string[] = [
    'assets/dino/LeftLeg.png',
    'assets/dino/RightLeg.png',
    'assets/dino/BothLegs.png',
    'assets/dino/RightCrouch.png',
    'assets/dino/LeftCrouch.png',
    'assets/dino/ded.png',
    'assets/dino/cactus.png',
    'assets/dino/cactus1.png',
    'assets/dino/cactus2.png',
    'assets/dino/cactus3.png',
    
];

preloadImages(ImagePaths, (images) => {
    const dinoImages : HTMLImageElement[] = [
        images[0],
        images[1],
        images[2],
        images[3],
        images[4]
        // images[5]
    ];
    const cactusImages : HTMLImageElement[] = [
        images[6],
        images[7],
        images[8],
        images[9]
    ];
    const dino = new Dino('game-canvas', dinoImages, 20, 300, 50, 50, 0.25);
    const ground = new Ground(0, 450, 1920, 1); // Adjust dimensions as per your game's ground setup
    const gravity = new Gravity(0.08);
    const cactus = new Cactus('game-canvas', cactusImages, 1920, 450, 50, 50, 0.25, 5);

    // dino.startAnimation(10000); // Start dino animation

    const gameObjects: GameObject[] = [dino, cactus];

    gameLoop(gameObjects, gravity, ground, 'game-canvas');
});
