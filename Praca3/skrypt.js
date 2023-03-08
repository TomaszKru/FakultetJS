"use strict"
let pole = document.getElementById("stoper"); 
let sekundy = 0;
let setnesekundy = 0;
let interval  
let pracaStopera = 0 //Zmienna ta określać będzie czy stoper dizała czy nie 

//Ustawienie czasu na 00:00
pole.innerHTML=`${String(sekundy).padStart(2,"0")}:${String(setnesekundy).padStart(2,"0")}`;

function czas(){
    pole.innerHTML=`${String(sekundy).padStart(2,"0")}:${String(setnesekundy).padStart(2,"0")}`;
    setnesekundy = setnesekundy + 1;
    if (setnesekundy === 100){
        setnesekundy = 0;
        sekundy = sekundy + 1;
    }
};

// Funkcja ma za zadanie reset timera (ustawienie na 00:00)
function zeruj(){
    sekundy = 0;
    setnesekundy = 0;
    pole.innerHTML=`${String(sekundy).padStart(2,"0")}:${String(setnesekundy).padStart(2,"0")}`;
}


document.body.addEventListener('keydown', function(event){
    if(event.key === " " && pracaStopera === 0){
        interval = setInterval(czas,10);
        pracaStopera = 1;
    }
    else if(event.key === "Escape"){
        clearInterval(interval);
        pracaStopera = 0;
        zeruj();
    }
    else if(event.key === " " && pracaStopera === 1){
        clearInterval(interval);
        pracaStopera = 0;
    }
});