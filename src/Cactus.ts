import { GameObject } from "./GameObject";

export class Cactus extends GameObject {
    private speed = 0;
    private images:  HTMLImageElement[];

    constructor(canvasId: string, images: HTMLImageElement[], x: number, y: number, scale: number, speed: number) {
        super(canvasId, images, x, y, scale);
        this.speed = speed;
        this.images = images;
    }

    public update() {
        super.update();
        this.vy = 0;
        this.vx = -this.speed;

        if (this.x < -this.getWidth()) {
            this.respawn(this.images); // Ensure to pass images array for respawn
        }
    }

    private respawn(images: HTMLImageElement[]) {
        // Randomize new position and image index for respawn
        this.x = 1920 + Math.random() * 1000; // New random x position off screen to the right
        this.animation.currentIndex = Math.floor(Math.random() * images.length); // Randomize cactus image
    }
}
