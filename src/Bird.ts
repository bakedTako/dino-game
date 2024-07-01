import { GameObject } from "./GameObject";

export class Birds extends GameObject {

    private speed = 0;
    private LastWingFlapTime: number = 0;
    private WingFlapInterval: number = 200;
    private MaxCactusCount = 3;

    constructor(canvasId: string, images: HTMLImageElement[], x: number, y: number, scale: number, speed: number) {
        super(canvasId, images, x, y, scale);
        this.speed = speed;
    }

    public update() {
        // console.log('current index : ', this.animation.currentIndex);
        super.update();
        this.vy = 0;
        this.vx = - this.speed;

        if (this.x < - this.getWidth()) {
            this.x = Date.now() % 1920 + 1920;
        }

        const currentTime = Date.now();
        if (currentTime - this.LastWingFlapTime >= this.WingFlapInterval) {
            this.switchWings(); // Switch legs
            this.LastWingFlapTime = currentTime;
        }
    }

    public switchWings(): void {
        this.animation.currentIndex = (this.animation.currentIndex === 0) ? 1 : 0;
    }
}