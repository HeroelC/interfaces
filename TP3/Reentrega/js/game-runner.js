"use strict";

document.addEventListener('DOMContentLoaded', () => {

    /** VARIABLES DEL JUEGO **/
    let gameOver = true;

    /** SCENE OBJECT **/
    let backgroundSky = document.getElementById('background-sky');
    let ground = document.getElementById('ground');
    let backgroundTree = document.getElementById('background-sky-arbol');
    let backgroundBush = document.getElementById('background-sky-maleza');
    let backgroundSpider = document.getElementById('background-sky-aracnidos');

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

    /** COIN OBJECT **/
    let coin = document.getElementById('coin');
    let coinWidth = coin.offsetWidth;
    let coinHeight = coin.offsetHeight;
    let coinPosX;
    let coinPosY;

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
                }, 900);
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

            coin.classList.add('coin-animated');

            //Actualizar juego
            update();

            /** Función para saber si recolecto una moneda **/
            if (grabCoin(playerPosX, playerPosY, playerWidth, playerHeight,
                    coinPosX, coinPosY, coinWidth, coinHeight)) {
                    increasePoints(100);
                    coin.classList.remove('coin-animated');
            }

            /** Función para saber si el juego debe terminar **/
            if (isGameOver(playerPosX, playerPosY, playerWidth,
                    playerHeight, npcPosX, npcPosY, npcWidth,
                    npcHeight)) {
                gameOver = true;
                window.cancelAnimationFrame(gameLoop);
            } else if (isWonGame()) {
                stopGame();
                let info = document.getElementById('info-primary');
                info.innerHTML = "WIN";
                info.classList.remove('no-visibility');
                gameOver = true;
                window.cancelAnimationFrame(gameLoop);
            } else {
                window.requestAnimationFrame(gameLoop);
            }
        } else {
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

    function grabCoin(playerPosX, playerPosY, playerWidth, playerHeight,
        coinPosX, coinPosY, coinWidth, coinHeight) {
            return isCollision(playerPosX, playerPosY, playerWidth, playerHeight,
                coinPosX, coinPosY, coinWidth, coinHeight);
    }

    function stopGame() {
        /** DETENCIÓN DE ANIMACIONES DEL FONDO **/
        backgroundSky.classList.remove('background-sky-animation');
        ground.classList.remove('ground-animation');
        backgroundBush.classList.remove('background-sky-maleza-animation');
        backgroundSpider.classList.remove('background-sky-aracnidos-animation');
        backgroundTree.classList.remove('background-sky-arbol-animation');
        /** DETENCION DE ANIMACION DE NPC **/
        npc.classList.remove('npc-run');
        /** DETENCIÓN DE ANIMACIÓN DE CORRER DEL PLAYER**/
        player.classList.remove('player-run-right');
        let gameInfo = document.getElementById('game-info');
        gameInfo.classList.remove('no-visibility');
        /** DETENCION DE ANIMACION DE MONEDA **/
        coin.classList.remove('coin-animated');
    }

    /** Función para actualizar los objetos del juego
     * - PLAYER: posX e posY
     * - NPC: posX e posY
     * - COIN: posX e posY
     * **/
    function update() {
        playerPosX = player.offsetLeft;
        playerPosY = player.offsetTop;

        /** Colision mas amigable **/
        npcPosX = npc.offsetLeft;
        npcPosY = npc.offsetTop + 50;

        coinPosX = coin.offsetLeft;
        coinPosY = coin.offsetTop;
    }

    /** Función para saber si se gano el juego**/
    function isWonGame() {
        return points.innerHTML >= 500;
    }

    /** Funcion para el manejo de la puntuacion **/
    function increasePoints(numberOfPoints = 0) {
        let point = parseInt(points.innerHTML) + numberOfPoints;
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
        backgroundSky.classList.add('background-sky-animation');
        ground.classList.add('ground-animation');
        backgroundBush.classList.add('background-sky-maleza-animation');
        backgroundSpider.classList.add('background-sky-aracnidos-animation');
        backgroundTree.classList.add('background-sky-arbol-animation');
        /** Animar personaje **/
        player.classList.remove('player-dead');
        player.classList.add('player-run-right');
        /** Animar NPC **/
        npc.classList.add('npc-run');
        /** Animar COIN**/
        coin.classList.add('coin-animated');
        /** Llamar al Loop del juego de nuevo**/
        gameOver = false;
        window.requestAnimationFrame(gameLoop);
    }
});

function isCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 &&
        h1 + y1 > y2;
}