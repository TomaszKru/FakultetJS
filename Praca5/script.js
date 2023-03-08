"use strict";

let nazwaObiektu = document.getElementById("input");
let przycisk = document.getElementById("przycisk");
let odnosniki = document.getElementById("ul");
let map = L.map('map',{
    zoom:7 
});

let tl = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
map.addLayer(tl);

let xhr =new XMLHttpRequest();
let url = `https://nominatim.openstreetmap.org/search.php?q=lubelskie&format=json&limit=1&polygon_geojson=1`
xhr.open("GET", url);
xhr.send();
xhr.responseType="json";
let lubelskieWspol;
xhr.addEventListener("load",function(){
    let lubwsp = xhr.response[0];
    lubelskieWspol=lubwsp.geojson.coordinates;
    map.fitBounds(L.geoJSON(turf.polygon(lubwsp.geojson.coordinates)).getBounds());
    })
przycisk.addEventListener('click', function(){
    while(odnosniki.firstChild){
        odnosniki.removeChild(odnosniki.firstChild);
    }
    let xhr =new XMLHttpRequest();
    let url = `https://nominatim.openstreetmap.org/search.php?q=${nazwaObiektu.value}&format=json&limit=50&polygon_geojson=1`
    xhr.open("GET", url);
    xhr.send();
    xhr.responseType="json";
    xhr.addEventListener("load",function(){
        let obiekt = xhr.response;
        for (let el of obiekt) {
            let poligon;
            if(el.geojson.type === "Polygon"){
                if(turf.booleanWithin(turf.polygon(el.geojson.coordinates),turf.polygon(lubelskieWspol))){
                    poligon=turf.polygon(el.geojson.coordinates);
                }
            }else if(el.geojson.type === "MultiPolygon"){
                let x = 0;
                for(let wsp in el.geojson.coordinates){
                    if(!(turf.booleanWithin(turf.polygon(el.geojson.coordinates[wsp]),turf.polygon(lubelskieWspol)))){
                        x=1;
                    }
                }
                if(x===0){
                    poligon=turf.multiPolygon(el.geojson.coordinates);
                }
            }
            if(poligon){
                let btn = document.createElement("button");
                btn.appendChild(document.createTextNode(el.display_name));
                btn.addEventListener("click", function(){
                    let geojson = L.geoJSON(poligon);
                    geojson.addTo(map);
                })
                odnosniki.appendChild(btn);

            }
            
        }
        
    });   
});
