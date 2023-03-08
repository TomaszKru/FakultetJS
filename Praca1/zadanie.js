"use strict"

let przycisk = document.getElementById("przycisk");
let r = document.getElementById("rok");
let d = document.getElementById("dzien");
let m = document.getElementById("miesiac")
let p = document.getElementById("plec")
function rozszyfrujPesel(){
    document.getElementById("blad").style.display='none';
    let pesel = document.getElementById("pesel");
    if(String(pesel.value).length !== 11){
      document.getElementById("blad").style.display='';
    }

    if(Number.isNaN(Number(pesel.value))){
        document.getElementById("blad").style.display='';
    }
    let tablicaPesel = pesel.value.split("");
    let tablicaWag = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    let suma =0;
    for(let i=0; i<tablicaWag.length; i++){
        suma = suma + (tablicaPesel[i] * tablicaWag[i]);
    }
    let cyfra = String(suma).split("");
    let cyfraKontrolna=Number(pesel.value.substr(10,1));
    if(cyfraKontrolna !== (10 - Number(cyfra[cyfra.length-1]))){
        document.getElementById("blad").style.display='';
    }
    let miesiac = pesel.value.substr(2,2);
    let rok = pesel.value.substr(0,2);
    if(Number(miesiac)<=12){
        r.innerText=Number('19' + rok);
    }else if(Number(miesiac)<=32 || Number(miesiac)>=21){
        r.innerText=Number('20' + rok);
    }
    
    if(miesiac<=12){
        m.innerText=Number(miesiac);
    }else if(miesiac>=21 || miesiac<=32){
        m.innerText=Number(miesiac)-20;
    }else{
        document.getElementById("blad").style.display='';
    }
    let dzien = Number(pesel.value.substr(4,2));
    if(dzien>31 || dzien<1){
        document.getElementById("blad").style.display='';
    }
    d.innerText=dzien;
    let plec = pesel.value.substr(9,1);
    if(Number(plec) % 2 === 0){
        p.innerText="kobieta";
    }else{
        p.innerText="mężczyzna";
    }
}

przycisk.onclick=rozszyfrujPesel;