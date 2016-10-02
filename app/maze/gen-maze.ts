import { Cell } from "./cell";
import { Position } from "./position";
// M rows and N cols
export const GenMaze = (M, N) => {
  console.log(`${M} ${N}`);
  let maze:Cell[][] = [];
  for( let i = 0; i < M; ++i){
    maze[i] = [];
    for( let j = 0; j < N; ++j){
      maze[i][j] = new Cell();
    }
  }
  let position = new Position(0, 0);
  let history = [position];
  while (history.length != 0){
    // debugger;
    let c = position.col;
    let r = position.row;
    let cell = maze[r][c];
    // debugger;
    cell.isVisted = true;
    cell.isPokemons = (Math.random() > 0.5)? true : false ;
    let check = [];
    if( c > 0 && !maze[r][c - 1].isVisted) { check.push("L")}
    if( r > 0 && !maze[r - 1][c].isVisted) { check.push("U")}
    if( c < N - 1 && !maze[r][c + 1].isVisted) { check.push("R")}
    if( r < M - 1 && !maze[r + 1][c].isVisted) { check.push("D")}
    // debugger;
    // console.log(`check list : ${check}`)
    if( check.length !=0){
      const  moveDirection = check[Math.floor(Math.random() * check.length)];
      // console.log(`moveDirection : ${moveDirection}`)
      if(moveDirection == "L"){
        maze[r][c].isLeft = false;
        c -= 1;
        maze[r][c].isRight = false;
      }

      if(moveDirection == "U"){
        maze[r][c].isUp = false;
        r -= 1;
        maze[r][c].isDown = false;
      }

      if(moveDirection == "R"){
        maze[r][c].isRight = false;
        c += 1;
        maze[r][c].isLeft = false;
      }

      if(moveDirection == "D"){
        maze[r][c].isDown = false;
        r += 1;
        maze[r][c].isUp = false;
      }
      //  These two lines are incorrect because here we manipulate the same reference
      //  over and over again so the history array always has a reference to one position only
      //  and not a sequence of positions
      //
      //  position.row = r;
      //  position.col = c;
      //
      //  Correction
      position = new Position(r, c);

      history.push(position);

    } else {
      //  Here we should save the removed position to backtrack otherwise we will get stuck at a certain
      //  position untill the history array is emptied.
      //
      //  history.shift();
      //  Correction
      position = history.pop();
    }

  }
  return maze;
}
