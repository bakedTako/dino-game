import { RepeatedDraw } from './Draw';

export class Background extends RepeatedDraw {
    private elements: { image: HTMLImageElement, x: number, y: number, scale: number, speed: number, width: number }[];

    constructor(canvasId: string, images: HTMLImageElement[], x: number, y: number, scale: number) {
        super(canvasId, images, x, y, scale);
        this.elements = [];
    }

    public addElement(image: HTMLImageElement, x: number, y: number, scale: number, speed: number): void {
        const width = image.width * scale;
        this.elements.push({ image, x, y, scale, speed, width });
    }

    public update(): void {
        for (const element of this.elements) {
            element.x -= element.speed;

            // If the element is out of the canvas, reset its position to loop it around
            if (element.x <= -element.width) {
                element.x += element.width
            }
        }
    }

    public drawElements(): void {
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the entire canvas

            for (const element of this.elements) {
                this.drawImage(element.image, element.x, element.y, element.scale);
                // Draw a second instance of the element for seamless looping
                this.drawImage(element.image, element.x + element.width, element.y, element.scale);
                // If the element is partly out of the canvas on the left, draw it again on the right
                if (element.x + element.width < this.canvas.width) {
                    this.drawImage(element.image, element.x + element.width, element.y, element.scale);
                }
                // If the element is partly out of the canvas on the right, draw it again on the left
                if (element.x < 0) {
                    this.drawImage(element.image, element.x + element.width, element.y, element.scale);
                }
            }
        }
    }
}