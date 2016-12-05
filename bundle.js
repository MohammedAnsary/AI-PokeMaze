/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var gen_maze_1 = __webpack_require__(1);
	var pokeMaze = gen_maze_1.GenMaze(3, 3);
	console.log(pokeMaze.knowledgeBase);
	// console.log('Strategy: BF');
	// Search(pokeMaze, 'BF', false);
	//
	// console.log('Strategy: UC');
	// Search(pokeMaze, 'UC', false);
	//
	// console.log('Strategy: DF');
	// Search(pokeMaze, 'DF', false);
	//
	// console.log('Strategy: ID');
	// Search(pokeMaze, 'ID', false);
	//
	// console.log('Strategy: GR1');
	// Search(pokeMaze, 'GR1', false);
	//
	// console.log('Strategy: AS1');
	// Search(pokeMaze, 'AS1', false);
	//
	// console.log('Strategy: GR2');
	// Search(pokeMaze, 'GR2', false);
	//
	// console.log('Strategy: AS2');
	// Search(pokeMaze, 'AS2', false);
	//
	// console.log('Strategy: GR3');
	// Search(pokeMaze, 'GR3', false);
	// console.log('Strategy: AS3');
	// Search(pokeMaze, 'AS3', true);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var maze_1 = __webpack_require__(2);
	exports.GenMaze = function (M, N) {
	    var maze = new maze_1.Maze();
	    maze.genMaze(M, N);
	    return maze;
	};


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var cell_1 = __webpack_require__(3);
	var position_1 = __webpack_require__(4);
	var direction_1 = __webpack_require__(5);
	// M rows and N cols
	var Maze = (function () {
	    function Maze() {
	        this.knowledgeBase = '';
	    }
	    Maze.prototype.genMaze = function (M, N) {
	        var startI = Math.floor(Math.random() * (M));
	        var startJ = Math.floor(Math.random() * (N));
	        var endI = Math.floor(Math.random() * (M));
	        var endJ = Math.floor(Math.random() * (N));
	        while (startI == endI && startJ == endJ) {
	            endI = Math.floor(Math.random() * (M));
	            endJ = Math.floor(Math.random() * (N));
	        }
	        console.log(M + " " + N);
	        this.steps = Math.floor(Math.random() * (M * N * 0.2)) + 1;
	        this.pokePositions = [];
	        this.maze = [];
	        // make max pokemon number 1/4 maze;
	        var maxPokemon = Math.floor(M * N * 0.25);
	        for (var i = 0; i < M; ++i) {
	            this.maze[i] = [];
	            for (var j = 0; j < N; ++j) {
	                this.maze[i][j] = new cell_1.Cell(new position_1.Position(i, j));
	                if (this.maze[i][j].isPokemons)
	                    if (this.pokePositions.length < maxPokemon && i != startI && j != startJ) {
	                        this.pokePositions.push(this.maze[i][j].position);
	                        this.knowledgeBase += "pokemon(loc(" + i + ", " + j + ")).\n";
	                    }
	                    else {
	                        this.maze[i][j].isPokemons = false;
	                    }
	            }
	        }
	        var position = new position_1.Position(0, 0);
	        var history = [position];
	        while (history.length != 0) {
	            var c = position.col;
	            var r = position.row;
	            var cell = this.maze[r][c];
	            cell.isVisted = true;
	            var check = [];
	            if (c > 0 && !this.maze[r][c - 1].isVisted) {
	                check.push(direction_1.Direction.Left);
	            }
	            if (r > 0 && !this.maze[r - 1][c].isVisted) {
	                check.push(direction_1.Direction.Up);
	            }
	            if (c < N - 1 && !this.maze[r][c + 1].isVisted) {
	                check.push(direction_1.Direction.Right);
	            }
	            if (r < M - 1 && !this.maze[r + 1][c].isVisted) {
	                check.push(direction_1.Direction.Down);
	            }
	            if (check.length != 0) {
	                var moveDirection = check[Math.floor(Math.random() * check.length)];
	                if (moveDirection == direction_1.Direction.Left) {
	                    this.maze[r][c].isLeft = false;
	                    c -= 1;
	                    this.maze[r][c].isRight = false;
	                    this.knowledgeBase += "path(loc(" + r + ", " + (c + 1) + "), loc(" + r + ", " + c + "))).\n";
	                }
	                if (moveDirection == direction_1.Direction.Up) {
	                    this.maze[r][c].isUp = false;
	                    r -= 1;
	                    this.maze[r][c].isDown = false;
	                    this.knowledgeBase += "path(loc(" + (r + 1) + ", " + c + "), loc(" + r + ", " + c + "))).\n";
	                }
	                if (moveDirection == direction_1.Direction.Right) {
	                    this.maze[r][c].isRight = false;
	                    c += 1;
	                    this.maze[r][c].isLeft = false;
	                    this.knowledgeBase += "path(loc(" + r + ", " + (c - 1) + "), loc(" + r + ", " + c + "))).\n";
	                }
	                if (moveDirection == direction_1.Direction.Down) {
	                    this.maze[r][c].isDown = false;
	                    r += 1;
	                    this.maze[r][c].isUp = false;
	                    this.knowledgeBase += "path(loc(" + (r - 1) + ", " + c + "), loc(" + r + ", " + c + "))).\n";
	                }
	                position = new position_1.Position(r, c);
	                history.push(position);
	            }
	            else {
	                position = history.shift();
	            }
	        }
	        this.knowledgeBase += "at(loc(" + startI + ", " + startJ + "), " + this.steps + ", s0),\n";
	        this.knowledgeBase += "end(loc(" + endI + ", " + endJ + ")).";
	        this.start = this.maze[startI][startJ];
	        this.end = this.maze[endI][endJ];
	        this.start.isStart = true;
	        this.end.isEnd = true;
	    };
	    return Maze;
	}());
	exports.Maze = Maze;
	//# sourceMappingURL=maze.js.map

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	var Cell = (function () {
	    function Cell(pos) {
	        this.isRight = true;
	        this.isLeft = true;
	        this.isUp = true;
	        this.isDown = true;
	        this.isVisted = false;
	        this.isPokemons = (Math.random() > 0.6) ? true : false;
	        this.pokemonNumber = Math.floor(Math.random() * 151) + 1;
	        this.position = pos;
	        this.isStart = false;
	        this.isEnd = false;
	    }
	    Cell.prototype.print = function () {
	        return "rightwall: " + this.isRight + ", leftwall: " + this.isLeft + ", upperwall: " + this.isUp + ", downwall: " + this.isDown + ", number: " + this.pokemonNumber;
	    };
	    return Cell;
	}());
	exports.Cell = Cell;


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	var Position = (function () {
	    function Position(row, col) {
	        this.row = row;
	        this.col = col;
	    }
	    return Position;
	}());
	exports.Position = Position;


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	(function (Direction) {
	    Direction[Direction["Up"] = 1] = "Up";
	    Direction[Direction["Down"] = 2] = "Down";
	    Direction[Direction["Left"] = 3] = "Left";
	    Direction[Direction["Right"] = 4] = "Right";
	})(exports.Direction || (exports.Direction = {}));
	var Direction = exports.Direction;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map