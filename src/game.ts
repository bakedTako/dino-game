import { RepeatedDraw } from "./Draw";
import { Ground } from "./Ground";
import { GameObject } from "./GameObject";
import { Gravity } from "./Gravity";
import { Player } from "./Player";
import { Dino } from "./Dino";
import { Birds } from "./Bird";
import { Background } from "./Background";
import { gameLoop } from "./GameLoop";

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
    'assets/dino/bird1.png',
    'assets/dino/bird2.png',
    'assets/imgs/ground.png',
    'assets/dino/gay.png',
];

preloadImages(ImagePaths, (images) => {
    const canvasId = 'game-canvas';
    const dinoImages: HTMLImageElement[] = [
        images[0],
        images[1],
        images[2],
        images[3],
        images[4]
        // images[5]
    ];
    const cactusImages: HTMLImageElement[] = [
        images[6],
        images[7],
        images[8],
        images[9]
    ];
    const birdImages: HTMLImageElement[] = [
        images[10],
        images[11]
    ]
    const backgroundAssets: HTMLImageElement[] = [
        images[12],
        images[13]
    ];
    const background = new Background(canvasId, backgroundAssets, 0, 0, 1);

    background.addElement(backgroundAssets[0], 0, 500, 1, 5); // Ground
    background.addElement(backgroundAssets[1], 0, 0, 1, 1)

    const ground = new Ground(0, 520, 1920, 0.01); // Adjust dimensions as per your game's ground setup
    const dino = new Dino(canvasId, dinoImages, 20, 20, 0.18);
    const gravity = new Gravity(0.08);
    // const cactus = new Cactus(canvasId, cactusImages, 1920, 450, 0.25, 10);
    const bird = new Birds(canvasId, birdImages, 3000, 50, 0.25, 5);

    // dino.startAnimation(10000); // Start dino animation

    const gameObjects: GameObject[] = [dino, bird];

    gameLoop(gameObjects, gravity, ground, background, 'game-canvas', cactusImages);
});
