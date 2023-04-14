"use strict"
let $ = document.querySelector.bind(document);
let chips = 0;
let chipPlus = 1;
let autoChipPlus = 0;
let dealerPrice = 10;
let bet = 0;
let cursorPrice = 500;
let currentNumber = 0;
let randomNumber = 0;
chips = parseInt(localStorage.getItem("Total"));
chipPlus = parseInt(localStorage.getItem("Cursor"));
autoChipPlus = parseInt(localStorage.getItem("Dealer"));
cursorPrice = parseInt(localStorage.getItem("CursorCost"));
dealerPrice = parseInt(localStorage.getItem("DealerCost"));
    setInterval(function(){
        chips += autoChipPlus;
        changeChipCount();
        localStorage.setItem("Total",chips);
        localStorage.setItem("Cursor",chipPlus);
        localStorage.setItem("Dealer",autoChipPlus);
        localStorage.setItem("CursorCost",cursorPrice);
        localStorage.setItem("DealerCost",dealerPrice);
        

    }, 1000);
    function changeChipCount(){
        $("#ChipCount").innerHTML ="Total Chip Count: " + chips;
    }
    function changeDealerCount(){
        $("#DealerCount").innerHTML ="Total Number of Dealers: " + autoChipPlus;
    }
    function changeCost(){
        $("#DealerCost").innerHTML ="Dealer Cost: " + dealerPrice + " chips";
    }
    function CursorUpgrade(){
        if(chips>=cursorPrice){
            chips -= cursorPrice;
            chipPlus *= 2;
            if (chipPlus >= 10){
                cursorPrice = 1000;
                $("#cursorPrice").innerHTML="Upgrade Cursor Price: "+cursorPrice;
            }
            if (chipPlus >= 50){
                cursorPrice = 10000;
                $("#cursorPrice").innerHTML="Upgrade Cursor Price: "+cursorPrice;

            }
            if (chipPlus >= 100){
                cursorPrice = 100000;
                $("#cursorPrice").innerHTML="Upgrade Cursor Price: "+cursorPrice;

            }
            if (chipPlus >= 500){
                cursorPrice = 1000000;
                $("#cursorPrice").innerHTML="Upgrade Cursor Price: "+cursorPrice;

            }
            $("#cpc").innerHTML ="Current Chips/Click: "+chipPlus;
            $("#noCursor").innerHTML ="";
            changeChipCount();
        }else{$("#noCursor").innerHTML ="You Do Not Have Enough Chips.";
             }
    }
    function WheelSpin(){
        if(chips >= bet){
            if(currentNumber!=0){
            randomNumber = Math.floor(Math.random()*5)+1;
                if(currentNumber == randomNumber){
                    chips+= bet * 5;
                    changeChipCount();
                    $("#result2").innerHTML ="You Win " + bet *5 + " chips!"
                }else{
                    chips-= bet;
                    changeChipCount();
                    $("#result2").innerHTML ="You lose " + bet + " chips."}
            }else{$("#result2").innerHTML ="You Did Not Pick a Number.";
                 }
        }else{$("#result2").innerHTML ="You Do Not Have Enough Chips.";
             }
    }
    function CoinToss(){
        if(chips>= bet){
        let result = Math.random();
        if (result < 0.5) {
            chips -= bet
            changeChipCount();
            $("#result1").innerHTML ="You lose " + bet + " chips.";
        } else {
            chips += bet
            changeChipCount();
            $("#result1").innerHTML ="You Win " + bet + " chips!";
    }
        }else{$("#result1").innerHTML ="You Do Not Have Enough Chips.";
         }
    }
    function chipClick(){
        chips += chipPlus;
        changeChipCount();
    }
    function dealerClick(){
        if(chips >= dealerPrice){
        chips -= dealerPrice;
        autoChipPlus++;
            if (autoChipPlus >=10){
                dealerPrice = 100;
            }
            if (autoChipPlus >=100){
                dealerPrice = 1000;
            }
            if (autoChipPlus >=1000){
                dealerPrice = 10000;
            }
            if (autoChipPlus >=10000){
                dealerPrice = 100000;
            }
        changeChipCount();
        changeDealerCount();
        changeCost();
            $("#noDeal").innerHTML ="";
        }else{$("#noDeal").innerHTML ="You Do Not Have Enough Chips.";
             }
    }
    function bet10Click(){
        bet = 10;
        $("#currentBet").innerHTML ="Current Bet: " + bet;
    }
    function bet100Click(){
        bet = 100;
        $("#currentBet").innerHTML ="Current Bet: " + bet;
    }
    function bet1000Click(){
        bet = 1000;
        $("#currentBet").innerHTML ="Current Bet: " + bet;
    }
    function bet10000Click(){
        bet = 10000;
        $("#currentBet").innerHTML ="Current Bet: " + bet;
    }
    function pick1(){
        currentNumber = 1;
        $("#currentNumber").innerHTML ="Current Number: "+ currentNumber
    }
    function pick2(){
        currentNumber = 2;
        $("#currentNumber").innerHTML ="Current Number: "+ currentNumber
    }
    function pick3(){
        currentNumber = 3;
        $("#currentNumber").innerHTML ="Current Number: "+ currentNumber
    }
    function pick4(){
        currentNumber = 4;
        $("#currentNumber").innerHTML ="Current Number: "+ currentNumber
    }
    function pick5(){
        currentNumber = 5;
        $("#currentNumber").innerHTML ="Current Number: "+ currentNumber
    }
    window.onload = function(){
        $("#Chip").addEventListener("click",chipClick);
        $("#Dealer").addEventListener("click",dealerClick);
        $("#bet10").addEventListener("click",bet10Click);
        $("#bet100").addEventListener("click",bet100Click);
        $("#bet1000").addEventListener("click",bet1000Click);
        $("#bet10000").addEventListener("click",bet10000Click);
        $("#Flip").addEventListener("click",CoinToss);
        $("#Cursor").addEventListener("click",CursorUpgrade);
        $("#pick1").addEventListener("click",pick1);
        $("#pick2").addEventListener("click",pick2);
        $("#pick3").addEventListener("click",pick3);
        $("#pick4").addEventListener("click",pick4);
        $("#pick5").addEventListener("click",pick5);
        $("#Wheel").addEventListener("click",WheelSpin);
}