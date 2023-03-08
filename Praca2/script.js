"use strict"
document.getElementById("liczba").focus();
let input = document.getElementById("liczba");
let przycisk = document.getElementById("przycisk");
let div = document.getElementById("div");

//zatwierdzanie enterem
input.addEventListener("keydown", function(event){
    if (event.key === "Enter"){
        przycisk.click();
    }
});

przycisk.addEventListener('click', function(){
    let liczbaLiczb = input.value;
    //sprawdzenie poprawności wprowadzonych danych
    if(Number.isNaN(Number(liczbaLiczb)) || Number(liczbaLiczb)>100 || liczbaLiczb<1){
        alert("To nie jest liczba z zakresu 1-100");
    }else{
        //usunięcie starego elementu i stworzenie nowego
        let usun = document.getElementById("div");
        usun.remove(); 
        let div = document.createElement("div");
        div.id="div";
        //tworzenie tabeli
        let table = document.createElement("table");
        let row = document.createElement("tr");
        let th = document.createElement("th");
        let tekst = document.createTextNode(" ");
        th.append(tekst);
        row.append(th);
        for (let y=1;y<=liczbaLiczb;y++){
            let th=document.createElement("th");
            let tekst = document.createTextNode(`${y}`);
            th.append(tekst);
            row.append(th);
        }
        table.append(row);
        for(let i=1; i<=liczbaLiczb; i++){
            let row = document.createElement("tr");
            let th = document.createElement("th");
            let tekst = document.createTextNode(`${i}`);
            th.append(tekst);
            row.append(th);
            for(let x=1; x<=liczbaLiczb;x++){
                let cell = document.createElement("td");
                let tekst = document.createTextNode(`${i * x}`);
                cell.append(tekst);
                row.append(cell);
            }
            table.append(row);
            div.append(table);
            document.body.append(div);
        
        }
    }
    
})
