import { Maze } from './maze'
export const GenMaz = (M, N) => {
  let maze = new Maze();
  maze.genMaze(M, N);
  return maze;
}
