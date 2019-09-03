"use strict";

//CONSTANTES
const WIDTH = 200;
const HEIGHT = 100;

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

//Función para crear una imagen
function createImageRandom(){
    //Creamos la imagén desde 0, params width, height
    let imageData = ctx.createImageData(WIDTH, HEIGHT);

    for(let i = 0; i < WIDTH; i++){
        for(let j = 0; j < HEIGHT; j++){
            /*Seteo el color del pixel en cada posicion.
             Params Object type imageData, X, Y, R, G, B, A */
            setPixel(imageData, i, j, randomColor(), randomColor(), randomColor(), 255);
        }
    }
    //Dibuja imagen en el canvas
    ctx.putImageData(imageData, 0, 0);
}

//Función para setear el color de cada pixel de una imagen
function setPixel(imageData, x, y, r, g, b, a){
    /*
        Convertir matriz a arreglo 
        let indice = (X + Y * imageData.width) * 4
        El 4 representa los colores RGBA de cada pixel de la imagen
    */

   let index = (x + y * imageData.width) * 4;
   imageData.data[index+0] = r;
   imageData.data[index+1] = g;
   imageData.data[index+2] = b;
   imageData.data[index+3] = a;
}

//Función para crear colores al azar
function randomColor(){
    return Math.floor(Math.random() * 256);
}

createImageRandom();