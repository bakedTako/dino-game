import { GameObject } from "./GameObject";

// Check for collision between two game objects

export function checkCollision(obj1: GameObject, obj2: GameObject): boolean {
    const rect1 = {
        x: obj1.getX(),
        y: obj1.getY(),
        width: obj1.getWidth() * obj1.getScale(),
        height: obj1.getHeight() * obj1.getScale()
    };

    const rect2 = {
        x: obj2.getX(),
        y: obj2.getY(),
        width: obj2.getWidth() * obj2.getScale(),
        height: obj2.getHeight() * obj2.getScale()
    };

    // Draw bounding boxes for debugging
    const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
        ctx.strokeStyle = 'red';
        ctx.strokeRect(rect1.x, rect1.y, rect1.width, rect1.height);
        ctx.strokeStyle = 'blue';
        ctx.strokeRect(rect2.x, rect2.y, rect2.width, rect2.height);
    }
    return rect1.x <= rect2.x + rect2.width &&
        rect1.x + rect1.width >= rect2.x &&
        rect1.y <= rect2.y + rect2.height &&
        rect1.y + rect1.height >= rect2.y;
}
