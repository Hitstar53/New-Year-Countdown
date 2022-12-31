// countdown timer
let dayBox = document.getElementById("day-box");
let hrBox = document.getElementById("hr-box");
let minBox = document.getElementById("min-box");
let secBox = document.getElementById("sec-box");
//let endDate = new Date(2023, 0, 1, 00, 00);
let endDate = new Date(2022, 11, 31, 20, 47);
let endTime = endDate.getTime();

function countdown() {
    let todayDate = new Date();
    let todayTime = todayDate.getTime();
    let remainingTime = endTime - todayTime;
    let oneMin = 60 * 1000;
    let oneHr = 60 * oneMin;
    let oneDay = 24 * oneHr;

    let addZeroes = (num) => (num < 10 ? `0${num}` : num);

    if (endTime < todayTime) {
        clearInterval(i);
        document.querySelector(
            ".celebration"
        ).innerHTML = `<h2>Happy New Year Everyone!</h2>`;
        runConfetti();
    } else {
        let daysLeft = Math.floor(remainingTime / oneDay);
        let hrsLeft = Math.floor((remainingTime % oneDay) / oneHr);
        let minsLeft = Math.floor((remainingTime % oneHr) / oneMin);
        let secsLeft = Math.floor((remainingTime % oneMin) / 1000);

        dayBox.textContent = addZeroes(daysLeft);
        hrBox.textContent = addZeroes(hrsLeft);
        minBox.textContent = addZeroes(minsLeft);
        secBox.textContent = addZeroes(secsLeft);
    }
}

let i = setInterval(countdown, 1000);
countdown();

//confetti animation
var canvas = document.getElementById("confetti-canvas");
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;
var ctx = canvas.getContext("2d");
var confetti = [];
// Create a function to generate a random number between a given range
function random(min, max) {
    return Math.random() * (max - min) + min;
}
// Create a Confetti object constructor
class Confetti {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.rotation = random(0, 360);
        this.scale = random(0.2, 1);
        this.speed = random(2, 6);
    }
    // Create a method to draw a single confetti object on the canvas
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.scale(this.scale, this.scale);
        ctx.fillStyle = this.color;
        ctx.fillRect(-10, -10, 20, 20);
        ctx.restore();
    }
    // Create a method to update the confetti's position and rotation
    update() {
        this.y += this.speed;
        // If the confetti has fallen off the bottom of the screen, reset its position to the top
        if (this.y > canvas.height) {
            this.y = -10;
            this.x = random(0, canvas.width);
        }
        this.rotation += 0.1;
    }
}
// Create a function to create a new confetti object and add it to the confetti array
function createConfetti() {
    var confettis = new Confetti(random(0, canvas.width), -10, "#" + Math.floor(random(0, 16777215)).toString(16));
    confetti.push(confettis);
}
// Create a function to draw all of the confetti on the canvas
function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < confetti.length; i++) {
        confetti[i].draw();
    }
}
// Create a function to update all of the confetti's positions and rotations
function updateConfetti() {
    for (var i = 0; i < confetti.length; i++) {
        confetti[i].update();
    }
}
// Create a function to run the confetti animation
function runConfetti() {
    setInterval(createConfetti, 50);
    // Draw and update the confetti every 20 milliseconds
    setInterval(function () {
        drawConfetti();
        updateConfetti();
    }, 20);
}