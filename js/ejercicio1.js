"use strict";

//CONSTANTES
const ROW = 5;
const COLUMN = 5;
const NUM_MAX = 9;

let array = [];

//Función para generar números aleatorios
function random(){
    return Math.floor(Math.random() * NUM_MAX);
}

//Función para cargar una matriz
function load(array){

    for(let i = 0; i < ROW; i++){
        //Creamos un arreglo en la posición en la que nos encontramos
        array[i] = [];
        for(let j = 0; j < COLUMN; j++){

            array[i][j] = random();
        }
    }
}

//Función para devolver el máximo valor de una matriz
function maxValue(matriz){

    //Inicializamos variable con valor minimo
    let maxValue = 0;

    for(let i = 0; i < matriz.length; i++){
        for(let j = 0; j < matriz[i].length; j++){

            if(matriz[i][j] > maxValue){

                maxValue = matriz[i][j];
            }
        }
    }

    return maxValue;
}

//Función que imprime el máximo valor de las filas pares y las filas impares.
function maxValuesRow(matriz){
    let maxValuePar = 0;
    let maxValueImpar = 0;
    
    for(let i=0; i < matriz.length; i++){
        for(let j=0; j < matriz[i].length; j++){

            if(i%2==1){
                if(matriz[i][j] > maxValueImpar){
                    maxValueImpar = matriz[i][j];
                }
            }else{
                if(matriz[i][j] > maxValuePar){
                    maxValuePar = matriz[i][j];
                }
            }
        }
    }

    console.log(`El número máximo de las filas impares es: ${maxValueImpar}`);
    console.log(`El número máximo de las filas pares es: ${maxValuePar}`);
}

//Función para calcular el promedio de cada fila
function avgRow(matriz){

    let result = [];

    for(let i=0; i < matriz.length; i++){
        let accumulator = 0;
        for(let j=0; j < matriz[i].length; j++){
        accumulator += matriz[i][j];
        }
        result.push(accumulator/COLUMN);
    }

    return result;
}

//Carga la matriz
load(array);
//Imprime por consola
console.table(array);
//Maximo valor de la matriz
console.log(maxValue(array));
//Máximo valor de filas pares e impares
maxValuesRow(array);
//Promedio de filas de una matriz
let avg = avgRow(array);
console.table(avg);

