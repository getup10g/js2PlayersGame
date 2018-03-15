/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function Furry(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.score = 0;
}

function Target() {
    this.x = randomNumber();
    this.y = randomNumber();
}

function randomNumber() {
    return Math.floor((Math.random() * 10));
}

function Game() {
    this.board = document.querySelectorAll("#board div");
    this.score1El = document.querySelector("#score1 strong");
    this.score2El = document.querySelector("#score2 strong");
    this.player1 = new Furry(0, 0, "right");
    this.player2 = new Furry(9, 9, "left");
    self = this;
    this.startGame();
    document.addEventListener('keydown', this.turnFurry);

}

Game.prototype.startGame = function () {
    this.showCoin();
    this.showFurry(self.player1);
    this.showFurry(self.player2);
    this.player1Interval = 0;
    this.player2Interval = 0;

    this.player1Interval = setInterval(function () {
        if (self.checkFurryColision(self.player1) !== "stillPlaying") {
            clearInterval(self.player1Interval);
            self.score1El.innerText = "Losser";
            self.gameOver();
        } else {
            self.moveFurry(self.player1);
        }
    }, 250);

    this.player2Interval = setInterval(function () {
        if (self.checkFurryColision(self.player2) !== "stillPlaying") {
            clearInterval(self.player2Interval);
            self.score2El.innerText = "Losser";
            self.gameOver();
        } else {
            self.moveFurry(self.player2);
        }
    }, 250);
};
Game.prototype.calculatePosition = function (player) {
    return player.x + (10 * player.y);
};
Game.prototype.showCoin = function () {
    this.coin = new Target();
    this.board[this.calculatePosition(this.coin)].classList.add("coin");
};
Game.prototype.showFurry = function (player) {
    this.board[this.calculatePosition(player)].classList.add("furry");
};
Game.prototype.hideVisibleFurry = function (player) {
    if (this.board[this.calculatePosition(player)].classList = "furry") {
        this.board[this.calculatePosition(player)].classList.remove("furry");
    }
};
Game.prototype.checkCoinColision = function (player) {
    if (this.calculatePosition(player) === this.calculatePosition(this.coin)) {
        this.board[this.calculatePosition(this.coin)].classList.remove("coin");
        player.score++;
        if(player===this.player1){
            this.score1El.innerText = this.player1.score;
        } else {
            this.score2El.innerText = this.player2.score;
        }


        this.showCoin();
    }
};
Game.prototype.turnFurry = function (event) {
    switch (event.which) {
        case 38:
            self.player1.direction = "up";
            break;
        case 37:
            self.player1.direction = "left";
            break;
        case 39:
            self.player1.direction = "right";
            break;
        case 40:
            self.player1.direction = "down";
            break;
        case 87:
            self.player2.direction = "up";
            break;
        case 65:
            self.player2.direction = "left";
            break;
        case 68:
            self.player2.direction = "right";
            break;
        case 83:
            self.player2.direction = "down";
            break;
    }
};
Game.prototype.moveFurry = function (player) {
    this.hideVisibleFurry(player);
    switch (player.direction) {
        case"right":
            player.x++;
            break;
        case"left":
            player.x--;
            break;
        case"up":
            player.y--;
            break;
        case"down":
            player.y++;
            break;
    }
    self.checkCoinColision(self.player1);
    self.checkCoinColision(self.player2);
    if (this.checkFurryColision(self.player1) === "stillPlaying") {
        self.showFurry(self.player1);
    }
    if (this.checkFurryColision(self.player2) === "stillPlaying") {
        self.showFurry(self.player2);
    }
};
Game.prototype.checkFurryColision = function (player) {
    this.playerXNtEn = player.x >= 0;
    this.playerXToMCH = player.x <= 9;
    this.playerYNtEn = player.y >= 0;
    this.playerYToMCH = player.y <= 9;

    if (this.playerXNtEn && this.playerXToMCH && this.playerYNtEn
        && this.playerYToMCH) {
        return "stillPlaying";
    } else {
        return "playerIsDead";
    }
};
Game.prototype.gameOver = function () {
    if (self.checkFurryColision(self.player1) !== "stillPlaying"){
        if (self.checkFurryColision(self.player2) !== "stillPlaying"){
            document.getElementById('board').style.display="none";
            document.getElementById('score2').style.display="none";
            document.getElementById('score1').style.display="none";
            document.getElementById('over').classList.remove("invisible");

        }
    }
};
document.addEventListener("DOMContentLoaded", function () {
    new Game
});







/***/ })
/******/ ]);