import { Maze } from '../maze/maze';
import { end, front, ordered } from './queuing-funcs';
import { genPokeProblem } from '../pokemon/poke-problem';
import { GeneralSearch } from './general-search';
import { SearchProblem } from '../datastructures/search-problem';

export const Search = (maze:Maze, strategy:string, visualise:boolean, eleminateRepeated:boolean) => {
    let queuingFunc;
    console.log('search started');
    switch(strategy) {
        case 'BFS': {
            queuingFunc = end;
            console.log('I am BFS');
            break;
        }
        case 'Uniform': {
            queuingFunc = ordered;
            console.log('I am UC');
            break;
        }
        case 'DFS': {
            queuingFunc = front;
            console.log('I am DFS');
            break;
        }
        default: {}
    }

    let problem:SearchProblem = genPokeProblem(maze);
    console.log("  poke problem done ");
    let searchInstance = new GeneralSearch(queuingFunc);

    searchInstance.search(problem, eleminateRepeated);
}
