"use strict";

document.addEventListener('DOMContentLoaded', () => {

    /** VARIABLES DEL JUEGO **/
    let gameRunner = document.getElementById('game-runner');
    let gameOver = true;
    let startGameOption = false;

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

    document.onkeypress = (e) => {
        e = e || window.event;
        let charCode = e.keyCode || e.which;
        if (charCode === 32) {
            e.preventDefault();
            return false;
        }
    }

    document.onkeyup = e => {
            if (e.code == 'Space') {
                if (activeJump && !gameOver) {
                    activeJump = false;
                    player.classList.add('player-jump');
                    setTimeout(() => {
                        player.classList.remove('player-jump');
                        activeJump = true;
                    }, 1000);
                }
            }
        
        if (e.code == 'Enter') {
            if (gameOver) {
                resetGame();
            }
        }
    }

    let gameLoop = () => {
        if (!gameOver) {

            //Actualizar juego
            update();

            increasePoints();

            /** Función para saber si el juego debe terminar **/
            if (isGameOver(playerPosX, playerPosY, playerWidth,
                    playerHeight, npcPosX, npcPosY, npcWidth,
                    npcHeight)) {
                gameOver = true;
                window.cancelAnimationFrame(gameLoop);
            }

            if (isWonGame()) {
                stopGame();
                let info = document.getElementById('info-primary');
                info.innerHTML = "WIN";
                info.classList.remove('no-visibility');
                gameOver = true;
                window.cancelAnimationFrame(gameLoop);
            }

            window.requestAnimationFrame(gameLoop);
        }else{
            stopGame();
        }
    }

    window.requestAnimationFrame(gameLoop);

    function isGameOver(x1, y1, w1, h1, x2, y2, w2, h2) {
        if (isCollision(x1, y1, w1, h1, x2, y2, w2, h2)) {
            stopGame();
            /** Añade la animación de muerte **/
            player.classList.add('player-dead');
            setTimeout(() => {
                player.classList.remove('player-dead');
            }, 2000);
            /** Información al usuario **/
            let infoEndGame = document.getElementById('info-primary');
            infoEndGame.innerHTML = "GAME OVER";
            infoEndGame.classList.remove('no-visibility');
            return true;
        } else {
            return false;
        }
    }

    function stopGame() {
        /** DETENCIÓN DE ANIMACIONES DEL FONDO **/
        building.classList.remove('building-animation');
        backgroundSky.classList.remove('background-sky-animation');
        ground.classList.remove('ground-animation');
        /** DETENCION DE ANIMACION DE NPC **/
        npc.classList.remove('npc-run');
        /** DETENCIÓN DE ANIMACIÓN DE CORRER DEL PLAYER**/
        player.classList.remove('player-run-right');
        let gameInfo = document.getElementById('game-info');
        gameInfo.classList.remove('no-visibility');
    }

    /** Función para actualizar los objetos del juego
     * - PLAYER: posX e posY
     * - NPC: posX e posY
     * - 
     * **/
    function update() {
        playerPosX = player.offsetLeft;
        playerPosY = player.offsetTop;

        /** Colision mas amigable **/
        npcPosX = npc.offsetLeft;
        npcPosY = npc.offsetTop + 50;
    }

    /** Función para saber si se gano el juego**/
    function isWonGame() {
        return points.innerHTML >= 2000;
    }

    /** Funcion para el manejo de la puntuacion **/
    function increasePoints() {
        let point = parseInt(points.innerHTML) + 1;
        points.innerHTML = point;
    }

    /** Función para poder volver a jugar **/
    function resetGame() {
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
        player.classList.add('player-run-right');
        /** Animar NPC **/
        npc.classList.add('npc-run');
        /** Llamar al Loop del juego de nuevo**/
        gameOver = false;
        window.requestAnimationFrame(gameLoop);
    }
});

function isCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 &&
        h1 + y1 > y2;
}