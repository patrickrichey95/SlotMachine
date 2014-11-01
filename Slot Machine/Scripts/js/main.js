/// <reference path="jquery.js" />
/// <reference path="easeljs-0.7.1.min.js" />

/* File: main.js
 * Author: Tom Tsiliopulous
 * Last Modified By: Patrick Richey
 * Last Modified Date: October 31, 2014
 * Description: This program runs all logic behind the slot machine, 
 * as well as drawing all images to the screen
 */

//--------------------------------------------------------------------------------
//Drawing

var stage;
var count = 0;

//create variables for images
//--------------------------------------------------------------------------------
var seven = new createjs.Bitmap("img/7.png");
var bar = new createjs.Bitmap("img/bar.png");
var bell = new createjs.Bitmap("img/bell.png");
var banana = new createjs.Bitmap("img/banana.png");
var blank = new createjs.Bitmap("img/blank.png");
var cherry = new createjs.Bitmap("img/cherry.png");
var grape = new createjs.Bitmap("img/grapes.png");
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
var reel1, reel2, reel3;
var reels = [reel1, reel2, reel3];

//initializes the canvas and starts creating the slot machine graphic
function initialize()
{
    stage = new createjs.Stage(document.getElementById('myCanvas'));
    createjs.Ticker.addEventListener("tick", handleTick);
    createjs.Ticker.setFPS(60);
    drawSlotMachine();
    drawReels();
    stage.enableMouseOver(20);
}

//handles updating and draws stats
function handleTick()
{
    drawStats();
    stage.update();
}

//draws all necessary elements of the slot machine (including buttons and other images)
function drawSlotMachine()
{
    //set default image
    reels[0] = new createjs.Bitmap("img/spin.png");
    reels[1] = new createjs.Bitmap("img/spin.png");
    reels[2] = new createjs.Bitmap("img/spin.png");

    //draw button co-ordinates on machine
    //--------------------------------------------------------------------------------
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

    jackpotText.x = 66;
    jackpotText.y = 313;

    betText.x = 228;
    betText.y = 313;

    creditsText.x = 324;
    creditsText.y = 313;

    //event listeners - change images when user hovers over them
    //--------------------------------------------------------------------------------
    bet1.addEventListener('mouseover', function () { stage.addChild(bet1hover) });
    bet1.addEventListener('mouseout', function () { stage.removeChild(bet1hover) });

    bet5.addEventListener('mouseover', function () { stage.addChild(bet5hover) });
    bet5.addEventListener('mouseout', function () { stage.removeChild(bet5hover) });

    bet10.addEventListener('mouseover', function () { stage.addChild(bet10hover) });
    bet10.addEventListener('mouseout', function () { stage.removeChild(bet10hover) });

    reset.addEventListener('mouseover', function () { stage.addChild(resethover) });
    reset.addEventListener('mouseout', function () { stage.removeChild(resethover) });

    spin.addEventListener('mouseover', function () { stage.addChild(spinhover) });
    spin.addEventListener('mouseout', function () { stage.removeChild(spinhover) });

    power.addEventListener('mouseover', function () { stage.addChild(powerhover) });
    power.addEventListener('mouseout', function () { stage.removeChild(powerhover) });

    //button press handling
    //--------------------------------------------------------------------------------
    //spin button clicked
    spin.addEventListener("click", function () {
        //if user runs out of money
        if (playerMoney == 0) {
            if (confirm("You ran out of Money! \nDo you want to play again?")) {
                resetAll();
                showPlayerStats();
            }
        }
        //if user tries to bet more than they have
        else if (playerBet > playerMoney) {
            alert("You don't have enough Money to place that bet.");
        }
        //if bet not a valid number
        else if (playerBet <= 0) {
            alert("Must bet at least $1");
        }
        //if player bet is affordable, run the simulation
        else if (playerBet <= playerMoney) {
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
    });

    //bet 1 button clicked
    bet1.addEventListener("click", function () {
        playerBet = 1;
    });

    //bet 5 button clicked
    bet5.addEventListener("click", function () {
        playerBet = 5;
    });

    //bet 10 button clicked
    bet10.addEventListener("click", function () {
        playerBet = 10;
    });

    //reset button clicked
    reset.addEventListener("click", function () {
        if (confirm("Are you sure you wish to reset? Click OK to reset, or click Cancel.")) {
            window.location = "index.html";
        }
    });

    //power button clicked
    power.addEventListener("click", function () {
        if (confirm("Are you sure you wish to quit? Clicking OK will close the window.")) {
            window.location = "http://webdesign4.georgianc.on.ca/~200257310/portfolio/";

        }
    });

    //draw slot machine images
    stage.addChild(slotMachine, bet1, bet5, bet10, reset, spin, power, betText, jackpotText, creditsText);
}

//sets location of reel images, and draws them
function drawReels() {
    //add reel co-ordinates to machine
    reels[0].x = 70;
    reels[0].y = 175;
    reels[1].x = 195;
    reels[1].y = 175;
    reels[2].x = 325;
    reels[2].y = 175;

    //draw reel images
    stage.addChild(reels[0], reels[1], reels[2]);
}

//draw various stats to the screen and keep them updated
function drawStats() {
    //remove current text
    stage.removeChild(jackpotText);
    stage.removeChild(betText);
    stage.removeChild(creditsText);

    //update text values
    jackpotText.text = jackpot.toString();
    betText.text = playerBet.toString();
    creditsText.text = playerMoney.toString();

    //redraw text
    stage.addChild(jackpotText);
    stage.addChild(betText);
    stage.addChild(creditsText);
}


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
                reels[spin] = blank;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                betLine[spin] = "Grapes";
                grapes++;
                reels[spin] = grape;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                betLine[spin] = "Banana";
                bananas++;
                reels[spin] = banana;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                betLine[spin] = "Orange";
                oranges++;
                reels[spin] = orange;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                betLine[spin] = "Cherry";
                cherries++;
                reels[spin] = cherry;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                betLine[spin] = "Bar";
                bars++;
                reels[spin] = bar;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                betLine[spin] = "Bell";
                bells++;
                reels[spin] = bell;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                betLine[spin] = "Seven";
                sevens++;
                reels[spin] = seven;
                break;
        }
    }
    drawReels();
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