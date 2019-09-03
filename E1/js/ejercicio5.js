"use strict";

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');    

degrade();

/*
    canvas.width: Ancho de la etiqueta canvas.
    canvas.height Alto de la etiqueta canvas.
*/

//Función para generar un degrade de negro a blanco mediante filas
function degrade(){

    //Creación de imagen
    let image = ctx.createImageData(canvas.width, canvas.height);

    let middle = image.width / 2; 

    for(let i = 0; i < middle; i++){
        //Formula: Valor de la fila [i] / Alto de la imagen  [image.height] * Valor máximo de color [255]
        let colorRow = (i / middle) * 255;
        for(let j = 0; j < image.height; j++){
            setPixel(image, i, j, colorRow, colorRow, 0);
        }
    }

    for(let i = middle; i <image.width; i++){
        let colorRow =  255 * ((1-(i-middle)/middle));
        for(let j = 0; j < image.height; j++){
            setPixel(image, i, j, 255, colorRow, 0);
        }
    }
    //Dibujar la imagen resultante
    ctx.putImageData(image, 0, 0);
}

//Función para setear el color de cada pixel de una imagen, default alpha 255.
function setPixel(imageData, x, y, r, g, b, a = 255){
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
