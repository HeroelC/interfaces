"use strict";

document.addEventListener('DOMContentLoaded', () => {
    let messiCard = document.getElementById('messi-card');

    messiCard.onclick = (e) => {
        let option = randomNumber();
        switch (option) {
            case 0:
                messiCard.classList.remove(messiCard.classList.value);
                messiCard.classList.add('translacion');
                break;
            case 1:
                messiCard.classList.remove(messiCard.classList.value);
                messiCard.classList.add('escalado');
                break;
            case 2:
                messiCard.classList.remove(messiCard.classList.value);
                messiCard.classList.add('rotacion');
                break
        }
    }
});

function randomNumber() {
    return Math.floor(Math.random() * 3);
}