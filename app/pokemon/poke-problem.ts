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
    const iState = new State({
          cell: maze.start,
          dir: maze.dir,
          hatch: maze.steps
      });

    const moveForward = (state) => {
      let cell:Cell = state.cell;
      let dir:Direction = state.dir;
      if(!cell.isUp && dir == Direction.Up) {
        return new State({cell: maze[state.cell.position.row - 1][state.cell.position.col],
                          dir: dir, hatch: maze.steps - 1});
      } else if(!cell.isDown && dir == Direction.Down) {
        return new State({cell: maze[state.cell.position.row + 1][state.cell.position.col],
                          dir: dir, hatch: maze.steps - 1});
      } else if(!cell.isRight && dir == Direction.Right) {
        return new State({cell: maze[state.cell.position.row][state.cell.position.col + 1],
                          dir: dir, hatch: maze.steps - 1});
      } else if(!cell.isLeft && dir == Direction.Left) {
        return new State({cell: maze[state.cell.position.row][state.cell.position.col - 1],
                          dir: dir, hatch: maze.steps - 1});
      }
      return null;
    };

    const rotateRight = (state) => {
      let cell:Cell = state.cell;
      let dir:Direction = state.dir;
      if(dir == Direction.Up) {
        return new State({cell: cell,
                          dir: Direction.Right, hatch: maze.steps});
      } else if(dir == Direction.Down) {
        return new State({cell: cell,
                          dir: Direction.Left, hatch: maze.steps});
      } else if(dir == Direction.Right) {
        return new State({cell: cell,
                          dir: Direction.Down, hatch: maze.steps});
      } else {
        return new State({cell: cell,
                          dir: Direction.Up, hatch: maze.steps});
      }
    }

    const rotateLeft = (state) => {
      let cell:Cell = state.cell;
      let dir:Direction = state.dir;
      if(dir == Direction.Up) {
        return new State({cell: cell,
                          dir: Direction.Left, hatch: maze.steps});
      } else if(dir == Direction.Down) {
        return new State({cell: cell,
                          dir: Direction.Right, hatch: maze.steps});
      } else if(dir == Direction.Right) {
        return new State({cell: cell,
                          dir: Direction.Up, hatch: maze.steps});
      } else {
        return new State({cell: cell,
                          dir: Direction.Down, hatch: maze.steps});
      }
     }
    //
    // const goalTest = (state) => {
    //   return state.cell.isPokemons || state.cell == maze.end || state.steps == 0;
    // };

    const operators= [moveForward, rotateLeft, rotateRight];

  }

}
