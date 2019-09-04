"use strict";

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');   
let filtro = document.getElementById('filtro');

document.addEventListener('DOMContentLoaded', () => {
    //Añade funcionalidad al click sobre las imagenes del ejercicio 6
    document.querySelectorAll('.imgOption').forEach(element => {
        element.addEventListener('click', loadImgCanvas);
    });
    filtro.addEventListener('click', greyFilter);
});

function loadImgCanvas(){

    let imagen = new Image();
    imagen.crossOrigin = 'Anonymous';
    //Valor del source de la imagen que se hace click
    imagen.src = this.getAttribute('src');
    
    //Carga asincronica de la imagen
    imagen.onload = function(){

        //Añade los atributos de ancho y alto de la imagén al canvas. 
        canvas.width = this.width;
        canvas.height = this.height;
    
        ctx.drawImage(this,0, 0);
    }
    filtro.removeAttribute('hidden');
}

//Obtener cantidad de rojo de un pixel
function getRed(imageData, x, y){
    let index = (x + y *  imageData.width) * 4;
    return imageData.data[index+0];
}

//Obtener cantidad de verde de un pixel
function getGreen(imageData, x, y){
    let index = (x + y * imageData.width) * 4;
    return imageData.data[index+1];
}

//Obtener cantidad de azul de un pixel
function getBlue(imageData, x, y){
    let index = (x + y * imageData.width) * 4;
    return imageData.data[index+2];
}

//Función para setear el color de cada pixel de una imagen
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

//Función para aplicar el filtro de grises a una imagen del canvas
function greyFilter(){

    //Obtiene la imagen dibujada en canvas
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < imageData.width; i++){
        for(let j = 0; j < imageData.height; j++){

            let red = getRed(imageData, i, j);
            let green = getGreen(imageData, i, j);
            let blue = getBlue(imageData, i, j);       

            let grey = (red + green + blue) / 3;

            setPixel(imageData, i, j, grey, grey, grey);
        }
    }
    //Dibujar imagen en canvas
    ctx.putImageData(imageData, 0, 0);
}

