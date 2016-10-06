import { SearchProblem } from '../datastructures/search-problem';
import { Operator } from '../datastructures/operator';
import { Node } from '../datastructures/node';
import { State } from '../datastructures/state';
import { Direction } from '../datastructures/direction';
import { GenMaze } from '../maze/gen-maze';
import { Cell } from '../maze/cell';
import { Maze } from '../maze/maze';

export const  genPokeProblem = (grid:Maze):SearchProblem => {
    const maze:Cell[][] = grid.maze;
    const iState:State = new State({
          cell: grid.start,
          dir: grid.dir,
          hatch: grid.steps,
          pokeNumber: grid.pokeNumber
      });

    const moveForward = (state:State) => {
      let cell:Cell = state.val['cell'];
      let dir:Direction = state.val['dir'];
      let hatch:number = state.val['hatch'];
      let pokeNumber:number = state.val['pokeNumber'];
      console.log("move forward from state:" );
      if(cell.isPokemons){
        console.log(" Found a pokemon");
        pokeNumber--;
        cell.isPokemons = false;
        console.log(` new poke number : ${pokeNumber}`);
      }
      if(!cell.isUp && dir == Direction.Up) {
        return new State({cell: maze[cell.position.row - 1][cell.position.col],
                          dir: dir, hatch: hatch - 1, pokeNumber: pokeNumber});
      } else if(!cell.isDown && dir == Direction.Down) {
        return new State({cell: maze[cell.position.row + 1][cell.position.col],
                          dir: dir, hatch: hatch - 1, pokeNumber: pokeNumber});
      } else if(!cell.isRight && dir == Direction.Right) {
        return new State({cell: maze[cell.position.row][cell.position.col + 1],
                          dir: dir, hatch: hatch - 1, pokeNumber: pokeNumber});
      } else if(!cell.isLeft && dir == Direction.Left) {
        return new State({cell: maze[cell.position.row][cell.position.col - 1],
                          dir: dir, hatch: hatch - 1, pokeNumber: pokeNumber});
      }
      return null;
    };

    const rotateRight = (state:State) => {
      let cell:Cell = state.val['cell'];
      let dir:Direction = state.val['dir'];
      let hatch:number = state.val['hatch'];
      let pokeNumber:number = state.val['pokeNumber'];
      console.log("move rotateRight from state:" );
      if(cell.isPokemons){
        console.log(" Found a pokemon");
        pokeNumber--;
        cell.isPokemons = false;
        console.log(` new poke number : ${pokeNumber}`);
      }
      if(dir == Direction.Up) {
        return new State({cell: cell,
                          dir: Direction.Right, hatch: hatch, pokeNumber: pokeNumber});
      } else if(dir == Direction.Down) {
        return new State({cell: cell,
                          dir: Direction.Left, hatch: hatch, pokeNumber: pokeNumber});
      } else if(dir == Direction.Right) {
        return new State({cell: cell,
                          dir: Direction.Down, hatch: hatch, pokeNumber: pokeNumber});
      } else {
        return new State({cell: cell,
                          dir: Direction.Up, hatch: hatch, pokeNumber: pokeNumber});
      }
    }

    const rotateLeft = (state:State) => {
      let cell:Cell = state.val['cell'];
      let dir:Direction = state.val['dir'];
      let hatch:number = state.val['hatch'];
      let pokeNumber:number = state.val['pokeNumber'];
      console.log("rotate left" );
      if(cell.isPokemons){
        console.log(" Found a pokemon");
        pokeNumber--;
        cell.isPokemons = false;
        console.log(` new poke number : ${pokeNumber}`);
      }
      if(dir == Direction.Up) {
        return new State({cell: cell,
                          dir: Direction.Left, hatch: hatch, pokeNumber: pokeNumber});
      } else if(dir == Direction.Down) {
        return new State({cell: cell,
                          dir: Direction.Right, hatch: hatch, pokeNumber: pokeNumber});
      } else if(dir == Direction.Right) {
        return new State({cell: cell,
                          dir: Direction.Up, hatch: hatch, pokeNumber: pokeNumber});
      } else {
        return new State({cell: cell,
                          dir: Direction.Down, hatch: hatch, pokeNumber: pokeNumber});
      }
     }
     const operators:Operator[] = [new Operator(moveForward, 1), new Operator(rotateRight, 0),
                                  new Operator(rotateLeft, 0)];
    const goalTest = (state:State) => {
      let cell:Cell = state.val['cell'];
      let hatch:number = state.val['hatch'];
      let pokeNumber:number = state.val['pokeNumber'];
      return cell == grid.end && pokeNumber <= 0 && hatch <= 0;
    }
    const pathCost = (oldCost:number, operator:Operator) => {
      return oldCost + operator.cost;
    }
    return new SearchProblem(operators, iState, maze, goalTest, pathCost);
 }
