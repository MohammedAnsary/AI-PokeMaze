import { Cell } from "./cell";
import { Position } from "./position";
import { Direction } from "../datastructures/direction";
// M rows and N cols
export class Maze {
  maze:Cell[][];
  start:Cell;
  end:Cell;
  steps:number;
  knowledgeBase:string = '';
  pokePositions:Position[];

  genMaze(M,N) {
    const startI = Math.floor(Math.random() * (M ));
    const startJ = Math.floor(Math.random() * (N));
    let endI = Math.floor(Math.random() * (M));
    let endJ = Math.floor(Math.random() * (N));
    while(startI == endI && startJ == endJ) {
        endI = Math.floor(Math.random() * (M));
        endJ = Math.floor(Math.random() * (N));
    }
    console.log(`${M} ${N}`);
    this.steps = Math.floor(Math.random() * (M * N * 0.2)) + 1;
    this.knowledgeBase += `steps(${this.steps}).\n`;
    this.pokePositions = [];
    this.maze = [];

    // make max pokemon number 1/4 maze;
    let maxPokemon:number = Math.floor( M * N * 0.25 );
    for( let i = 0; i < M; ++i) {
      this.maze[i] = [];
      for( let j = 0; j < N; ++j) {
        this.maze[i][j] = new Cell(new Position(i, j));
        if(this.maze[i][j].isPokemons)
          if(this.pokePositions.length < maxPokemon && i != startI && j != startJ){
            this.pokePositions.push(this.maze[i][j].position);
            this.knowledgeBase += `pokemon(loc(${i}, ${j}), s0).\n`;
          } else {
            this.maze[i][j].isPokemons = false;
          }

      }
    }
    let position = new Position(0, 0);
    let history = [position];
    while (history.length != 0) {
      let c = position.col;
      let r = position.row;
      let cell = this.maze[r][c];
      cell.isVisted = true;
      let check = [];
      if( c > 0 && !this.maze[r][c - 1].isVisted) { check.push(Direction.Left)}
      if( r > 0 && !this.maze[r - 1][c].isVisted) { check.push(Direction.Up)}
      if( c < N - 1 && !this.maze[r][c + 1].isVisted) { check.push(Direction.Right)}
      if( r < M - 1 && !this.maze[r + 1][c].isVisted) { check.push(Direction.Down)}
      if( check.length !=0){
        const moveDirection = check[Math.floor(Math.random() * check.length)];
        if(moveDirection == Direction.Left){
          this.maze[r][c].isLeft = false;
          c -= 1;
          this.maze[r][c].isRight = false;
          this.knowledgeBase += `path(loc(${r}, ${c + 1}), loc(${r}, ${c})).\n`;
        }

        if(moveDirection == Direction.Up){
          this.maze[r][c].isUp = false;
          r -= 1;
          this.maze[r][c].isDown = false;
           this.knowledgeBase += `path(loc(${r + 1}, ${c}), loc(${r}, ${c})).\n`;
        }

        if(moveDirection == Direction.Right){
          this.maze[r][c].isRight = false;
          c += 1;
          this.maze[r][c].isLeft = false;
          this.knowledgeBase += `path(loc(${r}, ${c - 1}), loc(${r}, ${c})).\n`;
        }

        if(moveDirection == Direction.Down){
          this.maze[r][c].isDown = false;
          r += 1;
          this.maze[r][c].isUp = false;
          this.knowledgeBase += `path(loc(${r - 1}, ${c}), loc(${r}, ${c})).\n`;
        }
        position = new Position(r, c);

        history.push(position);

      } else {
        position = history.shift();
      }
    }

    this.knowledgeBase += `at(loc(${startI}, ${startJ}), ${this.steps}, s0).\n`;
    this.knowledgeBase += `end(loc(${endI}, ${endJ})).`;
    this.start = this.maze[startI][startJ];
    this.end = this.maze[endI][endJ];
    this.start.isStart = true;
    this.end.isEnd = true;
  }
}
