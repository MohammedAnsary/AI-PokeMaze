import { Cell } from "./cell";
import { Position } from "./position";
// M rows and N cols
export class Maze {
  maze:Cell[][];
  start:Position;
  end:Position;
  steps:number;
  genMaze(M,N) {
    console.log(`${M} ${N}`);
    this.maze=[];
    for( let i = 0; i < M; ++i) {
      this.maze[i] = [];
      for( let j = 0; j < N; ++j) {
        this.maze[i][j] = new Cell();
      }
    }
    let position = new Position(0, 0);
    let history = [position];
    while (history.length != 0) {
      let c = position.col;
      let r = position.row;
      let cell = this.maze[r][c];
      cell.isVisted = true;
      cell.isPokemons = (Math.random() > 0.5)? true : false ;
      let check = [];
      if( c > 0 && !this.maze[r][c - 1].isVisted) { check.push("L")}
      if( r > 0 && !this.maze[r - 1][c].isVisted) { check.push("U")}
      if( c < N - 1 && !this.maze[r][c + 1].isVisted) { check.push("R")}
      if( r < M - 1 && !this.maze[r + 1][c].isVisted) { check.push("D")}
      if( check.length !=0){
        const  moveDirection = check[Math.floor(Math.random() * check.length)];
        if(moveDirection == "L"){
          this.maze[r][c].isLeft = false;
          c -= 1;
          this.maze[r][c].isRight = false;
        }

        if(moveDirection == "U"){
          this.maze[r][c].isUp = false;
          r -= 1;
          this.maze[r][c].isDown = false;
        }

        if(moveDirection == "R"){
          this.maze[r][c].isRight = false;
          c += 1;
          this.maze[r][c].isLeft = false;
        }

        if(moveDirection == "D"){
          this.maze[r][c].isDown = false;
          r += 1;
          this.maze[r][c].isUp = false;
        }
        position = new Position(r, c);

        history.push(position);

      } else {
        position = history.shift();
      }

    }
    this.start = new Position(Math.floor(Math.random() * M-1), Math.floor(Math.random() * N-1));
    this.end = new Position(Math.floor(Math.random() * M-1), Math.floor(Math.random() * N-1));
    while(this.start.row == this.end.row && this.start.col == this.end.col) {
      this.end = new Position(Math.floor(Math.random() * M-1), Math.floor(Math.random() * N-1));
    }
    this.steps = Math.floor(Math.random() * 10)+1;


  }
}
