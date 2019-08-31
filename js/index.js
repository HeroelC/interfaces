"use strict";

//Se ejecuta loadStart cuando termina de cargar el contenido de la página
document.addEventListener('DOMContentLoaded', loadStart);

let content = document.getElementById('content');

//Función para cargar el inicio
function loadStart(){

  fetch('inicio.html').then(response => {
    if(response.ok){
      response.text().then(t => {
        content.innerHTML = t;
        //Añade la funcionalidad de navegación
        document.querySelectorAll('.ejercicio').forEach(e => e.addEventListener('click', loadDynamic));
      });
    }else{
      content.innerHTML = "No sé encontro el contenido";
    }
  })
  .catch(error => {
    content.innerHTML = "No sé pudo conectar con el servidor";
  });
}

function loadDynamic(){

  //Guardo el valor que tiene el atributo href que estoy haciendo click
  let url = this.getAttribute('href');
  
  //Redireccionamiento a el HTML para que cargue el JS. 
  location.href = url;
}