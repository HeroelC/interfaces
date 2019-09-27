"use strict";

document.addEventListener('DOMContentLoaded', () => {
    let divEjercicio2 = document.getElementById('ejercicio2');
    
    divEjercicio2.onclick = (e) => {
        console.log(randomNumber());
    }

});

function randomNumber(){
    return Math.floor(Math.random() * 10);
}