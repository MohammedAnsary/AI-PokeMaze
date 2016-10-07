import { SearchProblem } from '../datastructures/search-problem';
import { Operator } from '../datastructures/operator';
import { Node } from '../datastructures/node';
import { State } from '../datastructures/state';
import { Direction } from '../datastructures/direction';
import { GenMaze } from '../maze/gen-maze';
import { Cell } from '../maze/cell';
import { Maze } from '../maze/maze';
import { Position } from '../maze/position';

export const  genPokeProblem = (grid:Maze):SearchProblem => {
    const maze:Cell[][] = grid.maze;
    const iState:State = new State({
          cell: grid.start,
          dir: grid.dir,
          hatch: grid.steps,
          pokePositions: grid.pokePositions
      });
     const clone = (arr:any[]):any[] => {
          let newArr = [];
          for(let i = 0; i < arr.length; i++) {
              newArr[i] = arr[i];
          }
          return newArr;
      }

    const moveForward = (state:State):State => {
      let cell:Cell = state.val['cell'];
      let dir:Direction = state.val['dir'];
      let hatch:number = state.val['hatch'];
      let pokePositions:Position[] = clone(state.val['pokePositions'])
      let newRow:number = cell.position.row;
      let newColumn:number = cell.position.col;
      let newHatch = hatch - 1;
      console.log("move forward from state" );
      if(cell.isPokemons){
        let index:number = pokePositions.indexOf(cell.position);
        console.log("Found a pokemon at index: " + index);
        if(index >= 0) {
            pokePositions.splice(index, 1);
        }
      }
      if(!cell.isUp && dir == Direction.Up) {
        newRow = cell.position.row - 1;
      } else if(!cell.isDown && dir == Direction.Down) {
        newRow = cell.position.row + 1;
      } else if(!cell.isRight && dir == Direction.Right) {
        newColumn = cell.position.col + 1;
      } else if(!cell.isLeft && dir == Direction.Left) {
        newColumn = cell.position.col - 1;
      } else {
        console.log('cannot move forward');
        return null;
      }
      return new State({cell: maze[newRow][newColumn],
                 dir: dir, hatch: newHatch, pokePositions: pokePositions});
    };

    const rotateRight = (state:State):State => {
      let cell:Cell = state.val['cell'];
      let dir:Direction = state.val['dir'];
      let hatch:number = state.val['hatch'];
      let pokePositions:Position[] = clone(state.val['pokePositions'])
      let newDirection:Direction;
      console.log("move rotateRight from state:" );
      if(cell.isPokemons){
        let index:number = pokePositions.indexOf(cell.position);
        console.log("Found a pokemon at index: " + index);
        if(index >= 0) {
            pokePositions.splice(index, 1);
        }
      }
      if(dir == Direction.Up) {
        newDirection = Direction.Right;
      } else if(dir == Direction.Down) {
        newDirection = Direction.Left;
      } else if(dir == Direction.Right) {
        newDirection = Direction.Down;
      } else {
        newDirection = Direction.Up;
      }
      return new State({cell: cell,
                        dir: newDirection, hatch: hatch, pokePositions: pokePositions});
    }

    const rotateLeft = (state:State):State => {
      let cell:Cell = state.val['cell'];
      let dir:Direction = state.val['dir'];
      let hatch:number = state.val['hatch'];
      let pokePositions:Position[] = clone(state.val['pokePositions'])
      let newDirection:Direction;
      console.log("rotate left" );
      if(cell.isPokemons){
        let index:number = pokePositions.indexOf(cell.position);
        console.log("Found a pokemon at index: " + index);
        if(index >= 0) {
            pokePositions.splice(index, 1);
        }
      }
      if(dir == Direction.Up) {
        newDirection = Direction.Left;
      } else if(dir == Direction.Down) {
        newDirection = Direction.Right;
      } else if(dir == Direction.Right) {
        newDirection = Direction.Up;
      } else {
        newDirection = Direction.Down;
      }
      return new State({cell: cell,
                        dir: newDirection, hatch: hatch, pokePositions: pokePositions});
     }
     const operators:Operator[] = [new Operator(moveForward, 1), new Operator(rotateRight, 0),
                                  new Operator(rotateLeft, 0)];
    const goalTest = (state:State):boolean => {
      let cell:Cell = state.val['cell'];
      let hatch:number = state.val['hatch'];
      let pokePositions:Position[] = clone(state.val['pokePositions'])
      return cell == grid.end && pokePositions.length == 0 && hatch <= 0;
    }
    const pathCost = (oldCost:number, operator:Operator) => {
      return oldCost + operator.cost;
    }
    return new SearchProblem(operators, iState, maze, goalTest, pathCost);
 }
