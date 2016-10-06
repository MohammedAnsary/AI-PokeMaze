import { SearchProblem } from '../datastructures/search-problem';
import { Operator } from '../datastructures/operator';
import { Node } from '../datastructures/node';
import { State } from '../datastructures/state';
import { Direction } from '../datastructures/direction';
import { GenMaze } from '../maze/gen-maze';
import { Cell } from '../maze/cell';


/*
operators:Operator[];
initState:State;
stateSpace:any;
goalTest:(state:State) => boolean;
pathCostFunc:(oldCost:Number, operator:Operator) => number;
*/

export class PokeProblem {

  static genPokeProblem(M, N) {
    const maze = GenMaze(M, N);

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
      }
      if(!cell.isUp && dir == Direction.Up) {
        return new State({cell: maze[cell.position.row - 1][cell.position.col],
                          dir: dir, hatch: hatch - 1, pokeNumber: pokeNumber});
      } else if(!cell.isDown && dir == Direction.Down) {
        return new State({cell: maze[cell.position.row + 1][cell.position.col],
                          dir: dir, hatch: hatch - 1,});
      } else if(!cell.isRight && dir == Direction.Right) {
        return new State({cell: maze[cell.position.row][cell.position.col + 1],
                          dir: dir, hatch: hatch - 1});
      } else if(!cell.isLeft && dir == Direction.Left) {
        return new State({cell: maze[cell.position.row][cell.position.col - 1],
                          dir: dir, hatch: hatch - 1});
      }
      return null;
    };

    const rotateRight = (state:State) => {
      let cell:Cell = state.val['cell'];
      let dir:Direction = state.val['dir'];
      let hatch:number = state.val['hatch'];
      if(dir == Direction.Up) {
        return new State({cell: cell,
                          dir: Direction.Right, hatch: hatch});
      } else if(dir == Direction.Down) {
        return new State({cell: cell,
                          dir: Direction.Left, hatch: hatch});
      } else if(dir == Direction.Right) {
        return new State({cell: cell,
                          dir: Direction.Down, hatch: hatch});
      } else {
        return new State({cell: cell,
                          dir: Direction.Up, hatch: hatch});
      }
    }

    const rotateLeft = (state:State) => {
      let cell:Cell = state.val['cell'];
      let dir:Direction = state.val['dir'];
      let hatch:number = state.val['hatch'];
      if(dir == Direction.Up) {
        return new State({cell: cell,
                          dir: Direction.Left, hatch: hatch});
      } else if(dir == Direction.Down) {
        return new State({cell: cell,
                          dir: Direction.Right, hatch: hatch});
      } else if(dir == Direction.Right) {
        return new State({cell: cell,
                          dir: Direction.Up, hatch: hatch});
      } else {
        return new State({cell: cell,
                          dir: Direction.Down, hatch: hatch});
      }
     }
    //
    // const goalTest = (state) => {
    //   return state.cell.isPokemons || state.cell == maze.end || state.steps == 0;
    // };

    const operators= [moveForward, rotateLeft, rotateRight];

  }

}
