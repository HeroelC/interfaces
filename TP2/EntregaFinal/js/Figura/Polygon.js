import { Line } from './Line.js';
import { Vertex } from './Vertex.js';

export class Polygon{

    constructor(){
        this.vertex = [];
        this.center = null;
    }

    draw(ctx, vertexColour = 'red', lineColour = 'yellow',
     centerColour = 'green'){
        /**********************************************************
         * Si el tamaño del arreglo de vertices es > 1
         * Se imprimen ambos vertices y se dibuja una linea entre ambos
         * Si el tamaño del arreglo de vertices es = 1
         * Se imprime solamente el vertice
         * Si existe el centro es que se cerro el poligono por lo tanto
         * Se dibuja el centro y la linea de cierre entre el primer
         * y ultimo punto
         ***********************************************************/
        if(this.vertex.length > 1){
            for(let i=0; i < this.vertex.length-1; i++){
                this.vertex[i].draw(ctx, vertexColour);
                this.vertex[i+1].draw(ctx, vertexColour);
                let line = new Line(this.vertex[i], this.vertex[i+1], lineColour);
                line.draw(ctx);
            }
            if(this.center != null){
                let line = new Line(this.vertex[0], this.vertex[this.vertex.length-1], lineColour);
                line.draw(ctx);
                /** Recalcula el centro por si hubo cambios **/
                this.center = this.calculateCenter();
                this.center.draw(ctx, centerColour, 7); 
            }
        }else if(this.vertex.length === 1){
            this.vertex[0].draw(ctx, vertexColour);
        }
    }

    //Funcion para añadir vertices
    addVertex(vertex){
        this.vertex.push(vertex);
    }

    //Función para eliminar un vertice
    deleteVertex(vertex){
        let posVertex = this.vertex.indexOf(vertex);
        this.vertex.splice(posVertex, 1);
        this.center = this.calculateCenter();
    }

    //Función para calcular el centro, retorna un vertice con X e Y
    calculateCenter(){
        let x = 0;
        let y = 0;

        for(let i=0; i < this.vertex.length; i++){
            x += this.vertex[i].x;
            y += this.vertex[i].y;
        }

        return new Vertex(x / this.vertex.length, y / this.vertex.length);
    }

    //Función para cerrar el poligono
    close(ctx){
        //Para cerrar el poligono se necesitan 3 o más puntos
        if(this.vertex.length >= 3){
            //Calcula el centro cuando cierra el poligono
            this.center = this.calculateCenter();
            //Se dibuja
            this.draw(ctx);
            return true;
        }else{
            return false;
        }
    }

    //Función para mover el poligono
    move(x, y){
        //Actualiza la posición de todos los vertices
        for(let i =0; i < this.vertex.length; i++){
            this.vertex[i].x += x - this.center.x;
            this.vertex[i].y += y - this.center.y;
        }
        //Setea el centro en la posicion que esta el mouse
        this.center.x = x;
        this.center.y = y;
    }
}