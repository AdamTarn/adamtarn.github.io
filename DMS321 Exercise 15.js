"use strict";
let $ = document.querySelector.bind(document);
let noun = ["Potato", "Alligator", "Tree"];
let verb = ["run", "sleep", "eat"];
let adjective = ["Brave", "Beautiful", "Bussin"]

function choose(list){
    let index = Math.floor(Math.random()*list.length);
    return list[index];
}
function makeSentence(){
let adj = choose(adjective);
let subj = choose(noun);
let v = choose(verb);
let obj = choose(noun);
$("#text").innerHTML += "The " + adj + " " + subj + " " + v + " "+ obj + "<br>";
console.log("The " + adj + " " + subj + " " + v + " "+ obj);
}
function showVocab(){
    let s = "";
    s += "Nouns: <ul>"
    for (let i = 0; i<noun.length; i++){
        s += "<li>" + noun[i] + "</li>";
    }
    s += "</ul>";
    s += "Adjectives: <ul>";
    for (let i = 0; i<adjective.length; i++){
        s += "<li>" + adjective[i] + "</li>";
    }
    s += "</ul>";
    s += "Verbs: <ul>"
    for (let i = 0; i<verb.length; i++){
        s += "<li>" + verb[i] + "</li>";
    }
    s += "</ul>";
    $("#vocab").innerHTML += s;
}
window.onload = function(){
    $("#generate").addEventListener("click",makeSentence);
    $("#vocabulary").addEventListener("click",showVocab);
}