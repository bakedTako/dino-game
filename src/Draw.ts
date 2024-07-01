class Draw {
    protected canvas: HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D | null;

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');
    }

    protected drawImage(image: HTMLImageElement, cordx: number, cordy: number, scale: number): void {
        if (this.ctx === null) {
            console.error('Canvas 2D context is not supported');
            return;
        }
        // this.ctx.font = '10px Arial';
        // this.ctx.fillText(`${cordx}, ${cordy}`, cordx, cordy - 10);
        const width = image.width * scale;
        const height = image.height * scale;
        this.ctx.drawImage(image, cordx, cordy, width, height);
        // this.ctx.strokeStyle = 'green';
        // this.ctx.strokeRect(cordx, cordy, width, height);
    }
}

export class RepeatedDraw extends Draw {
    protected intervalId: number | null = null;
    protected images: HTMLImageElement[];
    public currentIndex: number = 0;
    protected x: number;
    protected y: number;
    protected scale: number;

    constructor(canvasId: string, images: HTMLImageElement[], x: number, y: number, scale: number) {
        super(canvasId);
        this.images = images;
        this.x = x;
        this.y = y;
        this.scale = scale;
    }

    public startDrawing(interval: number): void {
        if (this.images.length === 0) return;

        this.intervalId = window.setInterval(() => {
            const image = this.images[this.currentIndex];
            this.drawImage(image, this.x, this.y, this.scale);
            this.currentIndex = (this.currentIndex + 1) % this.images.length;
        }, interval);
    }

    public stopDrawing(): void {
        if (this.intervalId !== null) {
            window.clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    public draw( x : number, y : number, scale : number): void {
        const image = this.images[this.currentIndex];
        this.drawImage(image, x, y, this.scale);
    }
}