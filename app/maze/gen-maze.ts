import { Maze } from './maze'
export const GenMaze = (M, N) => {
  let maze = new Maze();
  maze.genMaze(M, N);
  return maze;
}
