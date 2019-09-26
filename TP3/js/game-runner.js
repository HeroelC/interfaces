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
    let points = document.getElementById('points');

    //** NPC OBJECT **/
    let npc = document.getElementById('npc');

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
        console.log(e.layerY);
        console.log(e.layerX);
    }

    setInterval(update, 100);

    function update() {

        if(!gameOver){
            let w1 = player.offsetWidth;
            let h1 = player.offsetHeight;
            let x1 = player.offsetLeft;
            let y1 = player.offsetTop;

            let w2 = npc.offsetWidth;
            let h2 = npc.offsetHeight;
            let x2 = npc.offsetLeft;
            let y2 = npc.offsetTop;

            if(isGameOver(x1, y1, w1, h1, x2, y2, w2, h2)){
                gameOver = true;
            }

        }

    }

    function isGameOver(x1, y1, w1, h1, x2, y2, w2, h2){
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

