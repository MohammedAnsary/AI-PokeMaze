import { Maze } from './maze/Maze.ts';
import { GenMaze } from './maze/GenMaze.ts';

const pokeMaze:Maze = GenMaze();

console.log(pokeMaze);
