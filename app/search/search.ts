import { Maze } from '../maze/maze';
import { end, front, ordered } from './queuing-funcs';
import { genPokeProblem } from '../pokemon/poke-problem';
import { GeneralSearch } from './general-search';
import { SearchProblem } from '../datastructures/search-problem';
import { DepthLimitedSearch } from './depth-limited-search';

export const Search = (maze:Maze, strategy:string, visualise:boolean) => {
    let queuingFunc;
    let problem:SearchProblem = genPokeProblem(maze);
    // Called by BF, UC and DF.
    let doGeneralSearch = (problem:SearchProblem, qf:any):void => {
        let searchInstance = new GeneralSearch(qf);
        searchInstance.search(problem);
        console.log(`No. of node : ${searchInstance.expandedNodes}`);
        console.log(`No. of repeated states : ${searchInstance.repeatedStates}`);
    }
    // Called by ID.
    let doIterativeDeepening = (problem:SearchProblem) => {
        let searchInstance:DepthLimitedSearch = new DepthLimitedSearch();
        for( let depth = 0 ; depth < Infinity ; ++depth) {
          const result = searchInstance.search(problem, depth);
          if(result) {
            // printing success
            console.log(`No. of node : ${searchInstance.expandedNodes}`);
            console.log(`No. of repeated states : ${searchInstance.repeatedStates}`);
            return;
          }
        }
        console.log( "Could not find soultion using Itertive Deepining");
    }

    console.log('Search Started');
    switch(strategy) {
        case 'BF': {
            queuingFunc = end;
            doGeneralSearch(problem, queuingFunc);
            break;
        }
        case 'UC': {
            queuingFunc = ordered;
            doGeneralSearch(problem, queuingFunc);
            break;
        }
        case 'DF': {
            queuingFunc = front;
            doGeneralSearch(problem, queuingFunc);
            break;
        }
        case 'ID': {
            doIterativeDeepening(problem);
            break;
        }
        default: {}
    }


}
