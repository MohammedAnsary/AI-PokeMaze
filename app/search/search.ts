import { Maze } from '../maze/maze';
import { end, front, ordered } from './queuing-funcs';
import { genPokeProblem } from '../pokemon/poke-problem';
import { GeneralSearch } from './general-search';
import { SearchProblem } from '../datastructures/search-problem';
import { DepthLimitedSearch } from './depth-limited-search';
import { BestFirstSearch } from './best-first-search';
import { Manhattan, MST } from '../pokemon/heuristic-funcs';


export const Search = (maze:Maze, strategy:string, visualise:boolean) => {
    let problem:SearchProblem = genPokeProblem(maze);
    // Called by BF, UC and DF.
    let doGeneralSearch = (problem:SearchProblem, queuingFunc:any):void => {
        let searchInstance = new GeneralSearch(queuingFunc);
        searchInstance.search(problem);
        console.log(`No. of nodes: ${searchInstance.expandedNodes}`);
        console.log(`No. of repeated states: ${searchInstance.repeatedStates}`);
    }
    // Called by ID.
    let doIterativeDeepening = (problem:SearchProblem) => {
        let searchInstance:DepthLimitedSearch = new DepthLimitedSearch();
        for( let depth = 0 ; depth < Infinity ; ++depth) {
          const result = searchInstance.search(problem, depth);
          if(result) {
            // printing success
            console.log(`No. of nodes: ${searchInstance.expandedNodes}`);
            console.log(`No. of repeated states: ${searchInstance.repeatedStates}`);
            return;
          }
        }
        console.log( "Could not find soultion using Itertive Deepining");
    }
    let doBestFirstSearch = (problem:SearchProblem, information:any, evalFunc:any):void => {
        let searchInstance = BestFirstSearch(problem, information, evalFunc);
        searchInstance.search(problem);
        console.log(`No. of nodes: ${searchInstance.expandedNodes}`);
        console.log(`No. of repeated states: ${searchInstance.repeatedStates}`);
    }

    console.log('Search Started');
    switch(strategy) {
        case 'BF': {
            doGeneralSearch(problem, end);
            break;
        }
        case 'UC': {
            doGeneralSearch(problem, ordered);
            break;
        }
        case 'DF': {
            doGeneralSearch(problem, front);
            break;
        }
        case 'ID': {
            doIterativeDeepening(problem);
            break;
        }
        case 'GR1': {
            let info = {
                endPoint: problem.stateSpace.end.position,
                type: 'GR'
            }
            doBestFirstSearch(problem, info, Manhattan);
            break;
        }
        case 'AS1': {
            let info = {
                endPoint: problem.stateSpace.end.position,
                type: 'AS'
            }
            doBestFirstSearch(problem, info, Manhattan);
            break;
        }
        case 'GR2': {
            let info = {
                endPoint: problem.stateSpace.end.position,
                type: 'GR'
            }
            doBestFirstSearch(problem, info, MST);
            break;
        }
        case 'AS2': {
            let info = {
                endPoint: problem.stateSpace.end.position,
                type: 'AS'
            }
            doBestFirstSearch(problem, info, MST);
            break;
        }
        default: {}
    }
}
