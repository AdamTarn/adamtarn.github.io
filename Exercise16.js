"use strict";

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
    console.log(`The ${a} ${n1} ${v} the ${n2}.`);
    }

function vocabulary()
    {
    let text = 'nouns\n';
    for (let i=0; i < noun.length; i++)
        text += noun[i] + '\n';
    text += 'adjectives\n'
    for (let i=0; i < adjective.length; i++)
        text += adjective[i] + '\n';
    text += 'verbs\n'
    for (let i=0; i < verb.length; i++)
        text += verb[i] + '\n';
    console.log(text);
    }

generate();
vocabulary();
