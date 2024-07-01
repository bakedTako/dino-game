import { GameObject } from "./GameObject";

export class Player extends GameObject {
    constructor(canvasId: string, images: HTMLImageElement[], x: number, y: number, scale: number = 1) {
        super(canvasId, images, x, y, scale);
    }
}
