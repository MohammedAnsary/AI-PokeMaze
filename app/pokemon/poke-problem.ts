import { SearchProblem } from '../datastructures/search-problem';
import { Operator } from '../datastructures/operator';
import { Node } from '../datastructures/node';
import { State } from '../datastructures/state';
import { Direction } from '../datastructures/direction';
import { GenMaze } from '../maze/gen-maze';
import { Cell } from '../maze/cell';
import { Maze } from '../maze/maze';


/*
operators:Operator[];
initState:State;
stateSpace:any;
goalTest:(state:State) => boolean;
pathCostFunc:(oldCost:Number, operator:Operator) => number;
*/

export class PokeProblem {

  static genPokeProblem(M, N) {
    const maze:Maze = GenMaze(M, N);

    const iState:State = new State({
          cell: maze.start,
          dir: maze.dir,
          hatch: maze.steps,
          pokeNumber: maze.pokeNumber
      });

    const moveForward = (state:State) => {
      let cell:Cell = state.val['cell'];
      let dir:Direction = state.val['dir'];
      let hatch:number = state.val['hatch'];
      let pokeNumber:number = state.val['pokeNumber'];
      if(cell.isPokemons){
        pokeNumber--;
        cell.isPokemons = false;
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
      return cell == maze.end && pokeNumber <= 0 && hatch <= 0;
    }
    const pathCost = (oldCost:number, operator:Operator) => {
      return oldCost + operator.cost;
    }
    return new SearchProblem(operators, iState, maze, goalTest, pathCost);
    //
    // const goalTest = (state) => {
    //   return state.cell.isPokemons || state.cell == maze.end || state.steps == 0;
    // };


  }

}
