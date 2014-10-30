/// <reference path="createjs-2013.12.12.min.js" />
var stage;
var count = 0;

//create variables for images
var seven = "img/7.png";
var bar = "img/bar.png";
var bell = "img/bell.png";
var banana = "img/banana.png";
var blank = "img/blank.png";
var cherry = "img/cherry.png";
var grapes = "img/grapes.png";
var orange = "img/orange.png";
var bet1 = "img/bet_1_button.png";
var bet5 = "img/bet_5_button.png";
var bet10 = "img/bet_10_button.png";
var power = "img/power_button.png";
var reset = "img/reset_button.png";
var machine = "img/slot_machine.png";
var spin = "img/spin_button.png";

function init()
{
    stage = new createjs.Stage(document.getElementById('myCanvas'));
    createjs.Ticker.addEventListener("tick", handleTick);
    createjs.Ticker.setFPS(60);
    drawSlotMachine();
}

function handleTick(e)
{
    stage.update();
}

function drawSlotMachine()
{
    //draw machine as inital image
    var slotMachine = new createjs.Bitmap(machine);

    //draw buttons on machine
    var bet1btn = new createjs.Bitmap(bet1);
    bet1btn.x = 163;
    bet1btn.y = 423;
    bet1btn.addEventListener('click', function () { betAmount = 1; });

    var bet5btn = new createjs.Bitmap(bet5);
    bet5btn.x = 223;
    bet5btn.y = 423;
    bet5btn.addEventListener('click', function () { betAmount = 5; });

    var bet10btn = new createjs.Bitmap(bet10);
    bet10btn.x = 283;
    bet10btn.y = 423;
    bet10btn.addEventListener('click', function () { betAmount = 10; });

    var resetbtn = new createjs.Bitmap(reset);
    resetbtn.x = 43;
    resetbtn.y = 423;
    resetbtn.addEventListener('click', function () { alert('reset'); });

    var spinbtn = new createjs.Bitmap(spin);
    spinbtn.x = 393;
    spinbtn.y = 420;
    spinbtn.addEventListener('click', function () { alert(betAmount); });

    var powerbtn = new createjs.Bitmap(power);
    powerbtn.x = 415;
    powerbtn.y = 48;
    powerbtn.addEventListener('click', function () { alert('power'); });

    stage.addChild(slotMachine, bet1btn, bet5btn, bet10btn, resetbtn, spinbtn, powerbtn);
    stage.update();
}