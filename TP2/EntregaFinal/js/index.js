"use strict";

import {
    Vertex
} from './Figura/Vertex.js';
import {
    Polygon
} from './Figura/Polygon.js';

/** 
 * Constantes de mensajes del sistema 
 **/
const POLYGON_MIN_POINTS = "Para cerrar un poligono se necesitan al menos 3 puntos";
const MESSAGE_VOID = " ";

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

/** Variable para reconocer si se debe o no crear un nuevo poligono**/
let createPolygon = true;

/**Variables para crear y almacenar poligonos **/
let polygon;
let polygons = [];

/** Variables para almacenar objetos actuales seleccionados **/
let polygonActually = null;
let vertexPolygonActually = null;

/**
 * Variable para definir si se debe empezar a crear otro poligono
 */
let modeCreatePolygon = false;

/******************************************************************
 * Variable para verificar si se esta presionando la tecla C 
 *******************************************************************/
let keyPressVerify = false;

let colourActualy = 1;
/***********************************************************************
 * Variable de los botones
 ***********************************************************************/

let btnClosePolygon = document.getElementById('closePolygon');
let btnClearScreen = document.getElementById('clearScreen');
let btnOpenPolygon = document.getElementById('openPolygon');

let errorMessage = document.getElementById('errorMessage');

/***********************************************************************
 * posX mouse click in canvas => event.layerX
 * posY mouse click in canvas => event.layerY
 ***********************************************************************/

addEventListener('DOMContentLoaded', () => {

    canvas.onclick = e => {
        if (modeCreatePolygon) {
            if (createPolygon === true) {
                polygon = new Polygon();
                let vertex = new Vertex(e.layerX, e.layerY);
                polygon.addVertex(vertex);
                polygon.draw(ctx);
                createPolygon = false;
            } else {
                let vertex = new Vertex(e.layerX, e.layerY);
                polygon.addVertex(vertex);
                polygon.draw(ctx);
            }
        }
    }

    canvas.onmousedown = e => {
        for (let i = 0; i < polygons.length; i++) {
            if (polygons[i].center.isSelected(e.layerX, e.layerY)) {
                polygonActually = polygons[i];
                break;
            }
        }

        for (let i = 0; i < polygons.length; i++) {
            for (let j = 0; j < polygons[i].vertex.length; j++) {
                if (polygons[i].vertex[j].isSelected(e.layerX, e.layerY)) {
                    vertexPolygonActually = polygons[i].vertex[j];
                }
            }
        }
    }

    /******************************************************************
     * Si el objeto actual(poligono/vertice) no esta nulo se actualiza 
     * con las coord X e Y del mouse, luego de los cambios actualizar
     ******************************************************************/

    canvas.onmousemove = e => {
        if (polygonActually != null) {
            polygonActually.move(e.layerX, e.layerY);
            update();
        }
        if (vertexPolygonActually != null) {
            vertexPolygonActually.x = e.layerX;
            vertexPolygonActually.y = e.layerY;
            update();
        }
    }
    /******************************************************************
     * Al soltar el mouse vuelve a null el objecto "seleccionado",
     * intentar que cuando se suelta el click no lo marque 
     ******************************************************************/
    canvas.onmouseup = e => {
        polygonActually = null;
        vertexPolygonActually = null;
    }
    /******************************************************************
     * 
     ******************************************************************/
    canvas.ondblclick = e => {
        for (let i = 0; i < polygons.length; i++) {
            for (let j = 0; j < polygons[i].vertex.length; j++) {
                if (polygons[i].vertex[j].isSelected(e.layerX, e.layerY)) {
                    polygons[i].deleteVertex(polygons[i].vertex[j]);
                    update();
                    break;
                }
            }
        }
    }
    /** **/
    canvas.onkeydown = e => {
        if (e.code == 'KeyC') {
            keyPressVerify = true;
            canvas.onwheel = e => {
                if (keyPressVerify) {
                    e.preventDefault();
                    if (e.deltaY > 0) {
                        colourActualy = 0;
                        update();
                    } else {
                        colourActualy = 2;
                        update();
                    }
                }
            }
        }
    }

    canvas.onkeyup = e => {
        keyPressVerify = false;
        colourActualy = 1;
        update();
    }
    /**********************************************************
     * Añade funcionalidad a los botones:
     * --Abrir poligono
     * --Cerrar poligono
     * --Limpiar pantalla
     *********************************************************/
    btnClosePolygon.addEventListener('click', closePolygon);
    btnClearScreen.addEventListener('click', clearScreen);
    btnOpenPolygon.addEventListener('click', openPolygon);
});

//Funcion para cerrar poligono
function closePolygon() {
    /*************************************************************************
     * Llamar a función que cierre el poligono:
     * Si retorna true se agrega el poligono al array
     *  
     * Reiniciar el boolean createPolygon, para que se vuelva a crear poligono
     ************************************************************************/
    if (polygon.close(ctx)) {
        polygons.push(polygon);
        createPolygon = true;
        modeCreatePolygon = false;
        btnOpenPolygon.removeAttribute('hidden');
        btnClosePolygon.setAttribute('hidden', "");
        errorMessage.innerHTML = MESSAGE_VOID;
    } else {
        errorMessage.innerHTML = POLYGON_MIN_POINTS;
    }
}

function update() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < polygons.length; i++) {
        switch (colourActualy) {
            case 0:
                polygons[i].draw(ctx, '#FE2E2E', '#F4FA58', '#2EFE2E');
                break;
            case 1:
                polygons[i].draw(ctx);
                break;
            case 2:
                polygons[i].draw(ctx, '#610B0B', '#5E610B', '#0A2A0A');
                break;
        }
    }
}

/** Función para limpiar la pantalla
 * - Se limpia el arreglo que contiene los poligonos
 * **/
function clearScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    polygons = [];
    polygon = null;
    createPolygon = true;
    modeCreatePolygon = false;
    btnOpenPolygon.removeAttribute('hidden');
    btnClosePolygon.setAttribute('hidden', "");
    /** Limpia los mensajes por si hubo algún error **/
    errorMessage.innerHTML = MESSAGE_VOID;
}

function openPolygon() {
    modeCreatePolygon = true;
    btnClosePolygon.removeAttribute('hidden');
    btnOpenPolygon.setAttribute('hidden', "");
}