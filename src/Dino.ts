import { Ground } from "./Ground";
import { Gravity } from "./Gravity";
import { Player } from "./Player";

export class Dino extends Player {
    private ground: Ground | null;
    private gravity: Gravity;
    private walkingAnimationInterval: number = 200; // Interval in milliseconds for switching legs
    private lastLegSwitchTime: number = 0; // Timestamp of the last leg switch
    private isJumping: boolean = false;
    private isDucking: boolean = false;
    private jumpVelocity: number = -8; // Initial velocity for jumping
    private duckHeight: number; // Height of the Dino when ducking
    private originalHeight: number; // Original height of the Dino

    constructor(canvasId: string, images: HTMLImageElement[], x: number, y: number, scale: number) {
        super(canvasId, images, x, y, scale);
        this.ground = null;
        this.gravity = new Gravity(0.1);
        this.originalHeight = images[0].height * scale;
        this.duckHeight = images[3].height * scale;
        this.addKeyListeners(); // Add event listeners for key presses
    }

    public setGround(ground: Ground): void {
        this.ground = ground;
    }

    public update(): void {
        super.update(); // Call base class update method

        if (this.ground) {
            if (!this.intersectsGround(this.ground)) {
                this.gravity.applyTo(this); // Apply gravity to dino
                this.isJumping = true; // Set jumping flag to true while in the air
            } else {
                this.vy = 0; // Stop vertical movement when on the ground
                this.setY(this.ground.getY() - this.getHeight() * this.getScale()); // Snap to ground level
                if (this.isJumping) {
                    this.animation.currentIndex = 0;
                }
                this.isJumping = false; // Set jumping flag to false when on the ground

                // Check if enough time has passed to switch legs
                const currentTime = Date.now();
                if (currentTime - this.lastLegSwitchTime >= this.walkingAnimationInterval) {
                    this.switchLeg(); // Switch legs
                    this.lastLegSwitchTime = currentTime; // Update last switch time
                }
            }
        }
    }

    private switchLeg(): void {
        // Toggle between images
        if (!this.isDucking) {
            this.animation.currentIndex = (this.animation.currentIndex === 0) ? 1 : 0;
        } else {
            this.animation.currentIndex = (this.animation.currentIndex === 3) ? 4 : 3;
        }
    }

    public draw(): void {
        if (this.isDucking) {
            // Temporarily adjust height for ducking
            if (this.animation.currentIndex === 0 || this.animation.currentIndex === 1 ) {this.animation.currentIndex = 3} // 
            const originalY = this.y;
            this.setHeight(this.duckHeight);
            this.setY(originalY + this.originalHeight - this.duckHeight); // Adjust position to match new height
        }
        else 
        if (this.isJumping) {
            this.animation.currentIndex = 2; // jumping sprite
        }

        super.draw(); // Draw the current leg image

        if (this.isDucking) {
            // Revert to original height after drawing
            this.setY(this.y - this.originalHeight + this.duckHeight);
        }
    }

    private addKeyListeners(): void {
        window.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    this.jump();
                break;
                case 'ArrowDown':
                    this.duck();
                break;
            }
        });

        window.addEventListener('keyup', (event) => {
            if (event.key === 'ArrowDown') {
                this.standUp();
            }
        });
    }

    private jump(): void {
        if (!this.isJumping) {
            this.vy = this.jumpVelocity;
            this.isJumping = true;
            this.animation.currentIndex = 2;
        }
    }

    private duck(): void {
        // if (this.isJumping && this.vy<0 && this.ground) {
        //     this.vy += 8;
        // }
        if (!this.isJumping) {
            this.isDucking = true;
        }
    }

    private standUp(): void {
        this.isDucking = false;
        this.animation.currentIndex = 0;
    }
}
