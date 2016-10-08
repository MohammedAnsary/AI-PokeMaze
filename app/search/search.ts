import { Maze } from '../maze/maze';
import { end, front, ordered } from './queuing-funcs';
import { genPokeProblem } from '../pokemon/poke-problem';
import { GeneralSearch } from './general-search';
import { SearchProblem } from '../datastructures/search-problem';
import { DepthLimitedSearch } from './depth-limited-search';

export const Search = (maze:Maze, strategy:string, visualise:boolean) => {
    let queuingFunc;
    console.log('search started');
    switch(strategy) {
        case 'BFS': {
            queuingFunc = end;
            console.log('I am BFS');
            break;
        }
        case 'UCS': {
            queuingFunc = ordered;
            break;
        }
        case 'DFS': {
            queuingFunc = front;
            break;
        }
        case 'ID': {
            let problem:SearchProblem = genPokeProblem(maze);
            let searchInstance:DepthLimitedSearch = new DepthLimitedSearch();
            for( let depth = 0 ; depth < Infinity ; ++depth) {
              const result = searchInstance.search(problem, depth);
              if(result) {
                // printing success
                console.log(` No. of node : ${searchInstance.expandedNodes}`);
                console.log(` No. of repeated states : ${searchInstance.repeatedStates}`);
                return;
              }
            }
            console.log( "Could not find soultion");
            return;
        }
        default: {}
    }

    // comes from BFS, DFS and UCS.
    let problem:SearchProblem = genPokeProblem(maze);
    console.log("  poke problem done ");

    let searchInstance = new GeneralSearch(queuingFunc);
    searchInstance.search(problem);
    console.log(` No. of node : ${searchInstance.expandedNodes}`);
    console.log(` No. of repeated states : ${searchInstance.repeatedStates}`);
}
