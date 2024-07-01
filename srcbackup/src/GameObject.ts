import { RepeatedDraw } from "./Draw";
import { Ground } from "./Ground";

export class GameObject {
    protected x: number;
    protected y: number;
    protected vx: number;
    public vy: number;
    protected width: number;
    protected height: number;
    protected scale: number;
    protected animation: RepeatedDraw;

    constructor(canvasId: string, images: HTMLImageElement[], x: number, y: number, width: number, height: number, scale: number = 1) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.width = width;
        this.height = height;
        this.scale = scale;
        this.animation = new RepeatedDraw(canvasId, images, x, y, scale);
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public setX(x: number): void {
        this.x = x;
    }

    public setY(y: number): void {
        this.y = y;
    }

    public getWidth(): number {
        return this.width;
    }

    public setWidth(width: number): void {
        this.width = width;
    }

    public getHeight(): number {
        return this.height;
    }

    public setHeight(height: number): void {
        this.height = height;
    }

    public getScale(): number {
        return this.scale;
    }

    public setScale(scale: number): void {
        this.x = scale;
    }

    public update(): void {
        this.x += this.vx;
        this.y += this.vy;
    }

    public startAnimation(interval: number): void {
        this.animation.startDrawing(interval);
    }

    public stopAnimation(): void {
        this.animation.stopDrawing();
    }

    public draw(): void {
        this.animation.draw(this.x,this.y);
    }

    public intersectsGround(ground: Ground): boolean {
        return this.y + this.height * this.scale >= ground.getY();
    }
}