"use strict";

document.addEventListener('DOMContentLoaded', () => {

    let gameRunner = document.getElementById('game-runner');
    let gameOver = false;

    /** SCENE OBJECT **/
    let building = document.getElementById('building');
    let backgroundSky = document.getElementById('background-sky');
    let ground = document.getElementById('ground');

    //** PLAYER OBJECT **/
    let player = document.getElementById('player');
    let playerWidth = player.offsetWidth;
    let playerHeight = player.offsetHeight;
    let playerPosX;
    let playerPosY;
    let points = document.getElementById('points');

    //** NPC OBJECT **/
    let npc = document.getElementById('npc');
    let npcWidth = npc.offsetWidth;
    let npcHeight = npc.offsetHeight;
    let npcPosX;
    let npcPosY;
    /** 
     * Si el player se encuentra saltando evita que comience
     * otra animación de salto.
     * **/
    let activeJump = true;

    document.onkeyup = e => {
        if (e.code == 'Space') {
            if (activeJump) {
                activeJump = false;
                player.classList.add('player-jump');
                setTimeout(() => {
                    player.classList.remove('player-jump');
                    activeJump = true;
                }, 1000);
            }
        }
    }
    
    document.onclick = e => {
        gameOver = false;
        window.requestAnimationFrame(gameLoop);
    }

    let gameLoop = () => {
        if (!gameOver) {

            //Actualizar juego
            update();

            /** Función para saber si el juego debe terminar **/
            if (isGameOver(playerPosX, playerPosY, playerWidth,
                    playerHeight, npcPosX, npcPosY, npcWidth,
                    npcHeight)) {
                gameOver = true;
            }
            if (isGameOver(playerPosX, playerPosY, playerWidth,
                    playerHeight, npcPosX, npcPosY, npcWidth,
                    npcHeight)) {
                gameOver = true;
                window.cancelAnimationFrame(gameLoop);
            }
            window.requestAnimationFrame(gameLoop);
        }
    }

    window.requestAnimationFrame(gameLoop);

    function isGameOver(x1, y1, w1, h1, x2, y2, w2, h2) {
        if (isCollision(x1, y1, w1, h1, x2, y2, w2, h2)) {
            /** DETENCIÓN DE ANIMACIONES DEL FONDO **/
            building.classList.remove('building-animation');
            backgroundSky.classList.remove('background-sky-animation');
            ground.classList.remove('ground-animation');
            /** DETENCION DE ANIMACION DE NPC **/
            npc.classList.remove('npc-run');
            /** DETENCIÓN DE ANIMACIÓN DE CORRER DEL PLAYER**/
            player.classList.remove('player-run-right');
            player.classList.add('player-dead');
            return true;
        } else {
            let point = parseInt(points.innerHTML) + 1;
            points.innerHTML = point;
            return false;
        }
    }

    /** Función para actualizar los objetos del juego
     * - PLAYER: posX e posY
     * - NPC: posX e posY
     * - 
     * **/
    function update() {
        playerPosX = player.offsetLeft;
        playerPosY = player.offsetTop;

        npcPosX = npc.offsetLeft;
        npcPosY = npc.offsetTop;
    }
});

function isCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
    if (x1 < x2 + w2 &&
        x1 + w1 > x2 &&
        y1 < y2 + h2 &&
        h1 + y1 > y2) {
        return true;
    } else {
        return false;
    }
}