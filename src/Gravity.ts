import { GameObject } from "./GameObject";
import { Player } from "./Player";

export class Gravity {
    private gravity: number;

    constructor(gravity: number = 9.8) {
        this.gravity = gravity;
    }

    public applyTo(gameObject: GameObject): void {
        if (gameObject instanceof Player) {
            gameObject.vy += this.gravity;
        }
    }
}
