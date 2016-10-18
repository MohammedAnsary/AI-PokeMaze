import { GenMaze } from './maze/gen-maze';
import { Search } from "./search/search";

const pokeMaze = GenMaze(6, 6);
console.log(pokeMaze);

// console.log('Strategy: BF');
// Search(pokeMaze, 'BF', true);
//
// console.log('Strategy: UC');
// Search(pokeMaze, 'UC', true);
//
// console.log('Strategy: DF');
// Search(pokeMaze, 'DF', true);
//
// console.log('Strategy: ID');
// Search(pokeMaze, 'ID', true);
//
// console.log('Strategy: GR1');
// Search(pokeMaze, 'GR1', true);
//
// console.log('Strategy: AS1');
// Search(pokeMaze, 'AS1', true);
//
// console.log('Strategy: GR2');
// Search(pokeMaze, 'GR2', true);
//
console.log('Strategy: AS2');
Search(pokeMaze, 'AS2', true);
