//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Drawing

/// <reference path="easeljs-0.7.1.min.js" />
var stage;
var count = 0;

//create variables for images
var seven = new createjs.Bitmap("img/7.png");
var bar = new createjs.Bitmap("img/bar.png");
var bell = new createjs.Bitmap("img/bell.png");
var banana = new createjs.Bitmap("img/banana.png");
var blank = new createjs.Bitmap("img/blank.png");
var cherry = new createjs.Bitmap("img/cherry.png");
var grapes = new createjs.Bitmap("img/grapes.png");
var orange = new createjs.Bitmap("img/orange.png");
var bet1 = new createjs.Bitmap("img/bet_1_button.png");
var bet1hover = new createjs.Bitmap("img/bet_1_hover.png");
var bet5 = new createjs.Bitmap("img/bet_5_button.png");
var bet5hover = new createjs.Bitmap("img/bet_5_hover.png");
var bet10 = new createjs.Bitmap("img/bet_10_button.png");
var bet10hover = new createjs.Bitmap("img/bet_10_hover.png");
var power = new createjs.Bitmap("img/power_button.png");
var powerhover = new createjs.Bitmap("img/power_hover.png");
var reset = new createjs.Bitmap("img/reset_button.png");
var resethover = new createjs.Bitmap("img/reset_hover.png");
var slotMachine = new createjs.Bitmap("img/slot_machine.png");
var spin = new createjs.Bitmap("img/spin_button.png");
var spinhover = new createjs.Bitmap("img/spin_hover.png");
var jackpotText = new createjs.Text(0, "34px Lucida Console", "#FF0000");
var betText = new createjs.Text(0, "34px Lucida Console", "#FF0000");
var creditsText = new createjs.Text(0, "34px Lucida Console", "#FF0000");

function initialize()
{
    stage = new createjs.Stage(document.getElementById('myCanvas'));
    createjs.Ticker.addEventListener("tick", handleTick);
    createjs.Ticker.setFPS(60);
    stage.enableMouseOver(20);
    drawSlotMachine();
}

function handleTick()
{
    stage.update();
}

function drawSlotMachine()
{
    //draw buttons on machine
    bet1.x = 163;
    bet1.y = 423;
    bet1hover.x = 163;
    bet1hover.y = 423;

    bet5.x = 223;
    bet5.y = 423;
    bet5hover.x = 223;
    bet5hover.y = 423;

    bet10.x = 283;
    bet10.y = 423;
    bet10hover.x = 283;
    bet10hover.y = 423;

    reset.x = 43;
    reset.y = 423;
    resethover.x = 43;
    resethover.y = 423;

    spin.x = 393;
    spin.y = 420;
    spinhover.x = 393;
    spinhover.y = 420;

    power.x = 415;
    power.y = 48;
    powerhover.x = 415;
    powerhover.y = 48;

    //draw text
    jackpotText.text = jackpot.toString();
    jackpotText.x = 66;
    jackpotText.y = 340;
    jackpotText.textBaseline = "alphabetic";

    betText.text = playerBet.toString();
    betText.x = 228;
    betText.y = 340;
    betText.textBaseline = "alphabetic";

    creditsText.text = playerMoney.toString();
    creditsText.x = 324;
    creditsText.y = 340;
    creditsText.textBaseline = "alphabetic";

    stage.addChild(slotMachine, bet1, bet5, bet10, reset, spin, power, betText, jackpotText, creditsText);
}

//event listeners
bet1.addEventListener('mouseover', function () { stage.addChild(bet1hover) });
bet1.addEventListener('mouseout', function () { stage.removechild(bet1hover) });

bet5.addEventListener('mouseover', function () { stage.addChild(bet5hover) });
bet5.addEventListener('mouseout', function () { stage.removechild(bet5hover) });

bet10.addEventListener('mouseover', function () { stage.addChild(bet10hover) });
bet10.addEventListener('mouseout', function () { stage.removechild(bet10hover) });

reset.addEventListener('mouseover', function () { stage.addChild(resethover) });
reset.addEventListener('mouseout', function () { stage.removechild(resethover) });

spin.addEventListener('mouseover', function () { stage.addChild(spinhover) });
spin.addEventListener('mouseout', function () { stage.removechild(spinhover) });

power.addEventListener('mouseover', function () { stage.addChild(powerhover) });
power.addEventListener('mouseout', function () { stage.removechild(powerhover) });

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Logic

/// <reference path="jquery.js" />
var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var turn = 0;
var playerBet = 0;
var winNumber = 0;
var lossNumber = 0;
var spinResult;
var fruits = "";
var winRatio = 0;

/* Tally Variables */
var grapes = 0;
var bananas = 0;
var oranges = 0;
var cherries = 0;
var bars = 0;
var bells = 0;
var sevens = 0;
var blanks = 0;

/* Utility function to show Player Stats */
function showPlayerStats() {
    winRatio = winNumber / turn;
    $("#jackpot").text("Jackpot: " + jackpot);
    $("#playerMoney").text("Player Money: " + playerMoney);
    $("#playerTurn").text("Turn: " + turn);
    $("#playerWins").text("Wins: " + winNumber);
    $("#playerLosses").text("Losses: " + lossNumber);
    $("#playerWinRatio").text("Win Ratio: " + (winRatio * 100).toFixed(2) + "%");
}

/* Utility function to reset all fruit tallies */
function resetFruitTally() {
    grapes = 0;
    bananas = 0;
    oranges = 0;
    cherries = 0;
    bars = 0;
    bells = 0;
    sevens = 0;
    blanks = 0;
}

/* Utility function to reset the player stats */
function resetAll() {
    playerMoney = 1000;
    winnings = 0;
    jackpot = 5000;
    turn = 0;
    playerBet = 0;
    winNumber = 0;
    lossNumber = 0;
    winRatio = 0;
}


/* Check to see if the player won the jackpot */
function checkJackPot() {
    /* compare two random values */
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);
    if (jackPotTry == jackPotWin) {
        alert("You Won the $" + jackpot + " Jackpot!!");
        playerMoney += jackpot;
        jackpot = 1000;
    }
}

/* Utility function to show a win message and increase player money */
function showWinMessage() {
    playerMoney += winnings;
    $("div#winOrLose>p").text("You Won: $" + winnings);
    resetFruitTally();
    checkJackPot();
}

/* Utility function to show a loss message and reduce player money */
function showLossMessage() {
    playerMoney -= playerBet;
    $("div#winOrLose>p").text("You Lost!");
    resetFruitTally();
    jackpot += parseInt(playerBet);
}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    }
    else {
        return !value;
    }
}

/* When this function is called it determines the betLine results.
e.g. Bar - Orange - Banana */
function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                betLine[spin] = "blank";
                blanks++;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                betLine[spin] = "Grapes";
                grapes++;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                betLine[spin] = "Banana";
                bananas++;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                betLine[spin] = "Orange";
                oranges++;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                betLine[spin] = "Cherry";
                cherries++;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                betLine[spin] = "Bar";
                bars++;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                betLine[spin] = "Bell";
                bells++;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                betLine[spin] = "Seven";
                sevens++;
                break;
        }
    }
    return betLine;
}

/* This function calculates the player's winnings, if any */
function determineWinnings() {
    if (blanks == 0) {
        if (grapes == 3) {
            winnings = playerBet * 10;
        }
        else if (bananas == 3) {
            winnings = playerBet * 20;
        }
        else if (oranges == 3) {
            winnings = playerBet * 30;
        }
        else if (cherries == 3) {
            winnings = playerBet * 40;
        }
        else if (bars == 3) {
            winnings = playerBet * 50;
        }
        else if (bells == 3) {
            winnings = playerBet * 75;
        }
        else if (sevens == 3) {
            winnings = playerBet * 100;
        }
        else if (grapes == 2) {
            winnings = playerBet * 2;
        }
        else if (bananas == 2) {
            winnings = playerBet * 2;
        }
        else if (oranges == 2) {
            winnings = playerBet * 3;
        }
        else if (cherries == 2) {
            winnings = playerBet * 4;
        }
        else if (bars == 2) {
            winnings = playerBet * 5;
        }
        else if (bells == 2) {
            winnings = playerBet * 10;
        }
        else if (sevens == 2) {
            winnings = playerBet * 20;
        }
        else if (sevens == 1) {
            winnings = playerBet * 5;
        }
        else {
            winnings = playerBet * 1;
        }
        winNumber++;
        showWinMessage();
    }
    else {
        lossNumber++;
        showLossMessage();
    }
}

/* When the player clicks the spin button the game kicks off */
function spin() {
    if (playerMoney == 0) {
        if (confirm("You ran out of Money! \nDo you want to play again?")) {
            resetAll();
            showPlayerStats();
        }
    }
    else if (betAmount > playerMoney) {
        alert("You don't have enough Money to place that bet.");
    }
    else if (betAmount < 0) {
        alert("All bets must be a positive $ amount.");
    }
    else if (betAmount <= playerMoney) {
        spinResult = Reels();
        fruits = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];
        $("div#result>p").text(fruits);
        determineWinnings();
        turn++;
        showPlayerStats();
    }
    else {
        alert("Please enter a valid bet amount");
    }
};