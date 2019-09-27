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

        if(e.code == 'Enter'){
            if(gameOver){
                resetGame();
            }
        }
    }

    let gameLoop = () => {
        if (!gameOver) {

            //Actualizar juego
            update();

            increasePoints();

            if(points.innerHTML >= 1000){
                window.cancelAnimationFrame(gameLoop);
            }
            
            /** Función para saber si el juego debe terminar **/
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
            setTimeout(() => {
                player.classList.add('player-dead-img');
                let gameInfo = document.getElementById('game-info');
                gameInfo.classList.remove('no-visibility');
            }, 2000);
            return true;
        } else {
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

    /** Funcion para el manejo de la puntuacion **/
    function increasePoints(){
            let point = parseInt(points.innerHTML) + 1;
            points.innerHTML = point;
    }

    /** Función para poder volver a jugar **/
    function resetGame(){
        /** Reiniciar puntos del juego **/
        points.innerHTML = 0;
        /** Sacar carteles de información **/
        let gameInfo = document.getElementById('game-info');
        gameInfo.classList.add('no-visibility');
        /** Animar fondo **/
        building.classList.add('building-animation');
        backgroundSky.classList.add('background-sky-animation');
        ground.classList.add('ground-animation');
        /** Animar personaje **/
        player.classList.remove('player-dead');
        player.classList.remove('player-dead-img');
        player.classList.add('player-run-right');
        /** Animar NPC **/
        npc.classList.add('npc-run');
        /** Llamar al Loop del juego de nuevo**/        
        gameOver = false;
        window.requestAnimationFrame(gameLoop);
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