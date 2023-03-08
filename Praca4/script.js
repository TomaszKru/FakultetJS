"use strict";

let przycisk = document.getElementById("przycisk");

przycisk.addEventListener("click", function(){
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "quiz.json");
    xhr.send();
    xhr.responseType= "json";
    xhr.addEventListener("load", function(){
        if(xhr.status===200){
            if(!xhr.response){
                alert("błąd");
            }else{
                let odpowiedzTab=[];
                przycisk.remove();
                let h1 = document.createElement("h1");
                let tytul = document.createTextNode(xhr.response.title);
                h1.append(tytul);
                document.body.append(h1);
                for (let i=0; i<xhr.response.entries.length; i++) {
                    let pytanie = xhr.response.entries[i].q;
                    let odpowiedz = xhr.response.entries[i].a;
                    odpowiedzTab.push(odpowiedz);
                    let p = document.createElement("p");
                    let input = document.createElement("input");
                    input.id=`input${i}`;
                    let tresc = document.createTextNode(pytanie);
                    p.append(tresc);
                    document.body.append(p);
                    document.body.append(input);
                }
                let przyciskSprawdz=document.createElement("button");
                przyciskSprawdz.type = 'button';
                przyciskSprawdz.innerText = 'Sprawdź';
                document.body.append(przyciskSprawdz);

                let liczbaPytan;
                przyciskSprawdz.addEventListener("click", function(){
                    let poprawneOdpowiedzi=0;
                   for (let i=0; i<odpowiedzTab.length; i++){
                       let input = document.getElementById(`input${i}`);
                       liczbaPytan=odpowiedzTab.length;
                       let poprawna = odpowiedzTab[i];
                       if (poprawna===input.value.trim()){
                           poprawneOdpowiedzi=poprawneOdpowiedzi+1;
                           input.style.backgroundColor='green';
                       }else{
                        input.style.backgroundColor='pink';
                       }
                   }
                   alert(`Poprawne odpowiedzi ${poprawneOdpowiedzi}/${liczbaPytan}`);
                });
                
            }
            

        }
    });
});