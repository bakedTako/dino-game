import { GameObject } from "./GameObject";

export class Gravity {
    private gravity: number;

    constructor(gravity: number = 9.8) {
        this.gravity = gravity;
    }

    public applyTo(gameObject: GameObject): void {
        gameObject.vy += this.gravity;
    }
}
