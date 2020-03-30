'use strict'


var gDifficulty = 16;
var gRightAnswerCounter = 0;
var gNumsArray = createNumbersArray(gDifficulty);
var gTimerInterval;
var gTimerCounter = '0';
var gMiliSec = '000';
var gSec = '0';
var gTimerDigits;



function initGame() {

    gRightAnswerCounter = 0;
    gNumsArray = createNumbersArray(gDifficulty)
    printBoard()
    resetTimer()

    var timerDiv = document.querySelector('.timerDiv')
    timerDiv.innerHTML = `<div class='timerDiv'><h2>Time:</h2><p1 class='timer'>0:000</p1></div>`
}

function printBoard() {

    var boardSize = Math.sqrt(gDifficulty);
    var htmlStr = '';

    for (var i = 0; i < boardSize; i++) {
        htmlStr += '<tr>';

        for (var j = 0; j < boardSize; j++) {
            console.log
            htmlStr += `<td class='cell' onclick='cellClicked(this)'>${pullRandomNumber()}</td>`

        }
        htmlStr += '</tr>';
    }

    var elTbody = document.querySelector('.board')
    elTbody.innerHTML = htmlStr;
}

function cellClicked(cell) {

    var cellNum = cell.innerText;

    if (cellNum == gRightAnswerCounter + 1) {
        if (gRightAnswerCounter === 0) {
            var x = 1;
            gTimerInterval = setInterval(renderTimer, 10);

        }
        gRightAnswerCounter++;
        cell.classList.add('clicked');

    }
    if (gRightAnswerCounter === gDifficulty) {
        cell.classList.add('clicked');
        clearInterval(gTimerInterval);
        var timerDiv = document.querySelector('.timerDiv')
        timerDiv.innerHTML = `<div class='timerDiv'>
        <h2>Congradulations!<br>your time is:</h2>
        <p1 class='timer'>${gTimerDigits}</p1>
        <hr>
        <button class="button reset-button" onclick="initGame()">RESET GAME</button></div>`
    }
}

function renderTimer() {

    gMiliSec++
    if (gMiliSec < 10) gMiliSec = '0' + gMiliSec;
    gTimerDigits = gSec + '.0' + gMiliSec

    if (gMiliSec === 100) {
        gSec++

        if (gSec < 10) gSec = '0' + gSec;
        gMiliSec = 0;

    }
    var timerOnPage = document.querySelector('.timer')
    timerOnPage.innerText = gTimerDigits
}

function resetTimer() {

    var timerOnPage = document.querySelector('.timer')
    clearInterval(gTimerInterval);
    timerOnPage.innerText = '00.000';
    gMiliSec = 0;
    gSec = 0;
}

function createNumbersArray(num) {

    var questionIndxArray = []
    for (var i = 0; i < num; i++) {
        questionIndxArray.push(i + 1);
    }
    return questionIndxArray;
}

function pullRandomNumber() {

    var randomNum = getRndInteger(0, gNumsArray.length - 1);
    var randomIndx = gNumsArray.splice(randomNum, 1);
    return randomIndx[0];
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function easyLevel(thisButton) {

    var mediumButton = document.querySelector('.medium');
    var hardButton = document.querySelector('.hard');

    thisButton.classList.add('selected');
    mediumButton.classList.remove('selected');
    hardButton.classList.remove('selected');

    gDifficulty = 16;
    initGame()

}

function mediumLevel(thisButton) {

    var easyButton = document.querySelector('.easy');
    var hardButton = document.querySelector('.hard');

    thisButton.classList.add('selected');
    easyButton.classList.remove('selected');
    hardButton.classList.remove('selected');

    gDifficulty = 25;
    initGame()

}

function hardLevel(thisButton) {

    var easyButton = document.querySelector('.easy');
    var mediumButton = document.querySelector('.medium');

    thisButton.classList.add('selected');
    easyButton.classList.remove('selected');
    mediumButton.classList.remove('selected');

    gDifficulty = 36;
    initGame()

}

