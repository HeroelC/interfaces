export class Line{

    constructor(vertex1, vertex2, colour){
        this.vertex1 = vertex1;
        this.vertex2 = vertex2;
        this.colour = colour;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.strokeStyle = this.colour;
        ctx.lineWidth = 2;
        ctx.moveTo(this.vertex1.x, this.vertex1.y);
        ctx.lineTo(this.vertex2.x, this.vertex2.y);
        ctx.stroke();
        ctx.closePath();
    }
}