
class draw {
    protected canvas: HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D | null;

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');
    }

    // This method can be overridden by subclasses
    protected drawImage(imageSource: string): void {
        const image = new Image();
        if (this.ctx==null) {
            console.error('Canvas 2D context is not supported');
            return;
        }
        image.src = imageSource;
        image.onload = () => {
            this.ctx?.drawImage(image, 0, 0);
        };
    }
}

export class drawDino extends draw {
    constructor(canvasId: string) {
        super(canvasId); // Call the constructor of the base class

        // Call the drawImage method of the base class with the specific image source
        this.drawImage('assets/imgs/dino-stationary.png');
    }
}
export class drawBird extends draw {
    constructor(canvasId: string) {
        super(canvasId); // Call the constructor of the base class

        // Call the drawImage method of the base class with the specific image source
        this.drawImage('assets/imgs/ground.png');
    }
}
export class drawCactus extends draw {
    constructor(canvasId: string) {
        super(canvasId); // Call the constructor of the base class

        // Call the drawImage method of the base class with the specific image source
        this.drawImage('assets/imgs/cactus');
    }
}
export class drawBg extends draw {
    constructor(canvasId: string) {
        super(canvasId); // Call the constructor of the base class

        // Call the drawImage method of the base class with the specific image source
        this.drawImage('assets/ground.jpg');
    }
}