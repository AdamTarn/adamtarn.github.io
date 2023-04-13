const { JSDOM } = require('jsdom');
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

let $ = document.querySelector.bind(document);

let noun = [ "cat", "dog", "rock", "house" ];
let verb = [ "looks at", "talks to", "helps", "steals" ];
let adjective = [ "big", "small", "blue", "red" ];
let picnum = 0;

function choose(l)
    {
    return l[Math.floor(Math.random()*l.length)];
    }

function generate()
    {
    let a = choose(adjective);
    let n1 = choose(noun);
    let v = choose(verb);
    let n2 = choose(noun);
    $("#text").innerHTML += `The ${a} ${n1} ${v} the ${n2}.<br>`;
    }

function vocabulary()
    {
    let text = '<h1>nouns</h1><ul>';
    for (let i=0; i < noun.length; i++)
        text += '<li>' + noun[i];
    text += '</ul>\n';
    text += '<h1>adjectives</h1><ul>'
    for (let i=0; i < adjective.length; i++)
        text += '<li>' + adjective[i];
    text += '</ul>\n';
    text += '<h1>verbs</h1><ul>'
    for (let i=0; i < verb.length; i++)
        text += '<li>' + verb[i];
    text += '</ul>\n';
    $("#vocab").innerHTML = text;
    }

window.onload = function () {
    $("#generate").addEventListener('click',generate);
    $("#vocabulary").addEventListener('click',vocabulary);
    }