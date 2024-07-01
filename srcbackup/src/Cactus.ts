import { GameObject } from "./GameObject";

export class Cactus extends GameObject{

    private speed = 0;
    private MaxCactusCount = 3;

    constructor(canvasId: string, images: HTMLImageElement[], x: number, y: number, width: number, height: number, scale: number, speed : number){
        super(canvasId, images, x, y, width, height, scale);
        this.speed = speed;
    }

    public update() {
        console.log(this.animation.currentIndex);
        super.update();
        this.vy = 0;
        this.vx = - this.speed;

        if (this.x<50) {
            this.x = Date.now() % 1920 + 1920;
            if (this.animation.currentIndex < 3) {
                this.animation.currentIndex += 1;
            } else this.animation.currentIndex = 0;
        }
    }
}