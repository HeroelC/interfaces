export class Vertex{

    /*******************************************************************
     * 
    ********************************************************************/
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.radius = 10;
    }

    //Dibuja el vertice como un circulo, color por defecto rojo
    draw(ctx, colour = 'red', radius = 10){
        this.radius = radius;
        ctx.beginPath();
        ctx.fillStyle = colour;
        ctx.strokeStyle= 'white';
        ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    move(x, y){
        this.x = x;
        this.y = y;
    }

    isSelected(x, y){
        let distancia = Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2));
        if(distancia < this.radius){
            return true;
        }else{
            return false;
        }
    }
}