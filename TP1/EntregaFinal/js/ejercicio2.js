"use strict";

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let btnSubmit = document.getElementById('submit');

btnSubmit.addEventListener('click', () => {

    //Evita que el boton recargue la página
    event.preventDefault();

    ctx.beginPath();

    //Obtener valores del formulario
    let width = document.getElementById('width').value;
    let height = document.getElementById('height').value; 
    let color = document.getElementById('color').value;

    let mensaje = document.getElementById('mensaje');

    if(width <= canvas.width && height <= canvas.height){
        createRect(10, 10, width, height, color);
        //Limpiar por si hubo mensaje de error
        mensaje.innerHTML = "";
    }else{
        //Mensaje de error
        mensaje.innerHTML = "Las dimensiones exceden el tamaño del canvas";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
 
});

function createRect(x, y, width, height, color){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;
    ctx.fillRect(10, 10, width, height);
}