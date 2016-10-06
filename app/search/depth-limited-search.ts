import { SearchProblem } from '../datastructures/search-problem';
import { Node } from '../datastructures/node';
import { State } from '../datastructures/state';
import { Operator } from '../datastructures/operator';
import { front } from './queuing-funcs';

export abstract class DepthLimitedSearch {
    private nodes:Node[];
    private expandedNodes:number;

    constructor() {
        this.nodes = [];
        this.expandedNodes = 0;
    }

    search(problem:SearchProblem, depth:number):any {
        this.nodes.push(new Node(problem.initState, null, null, 0, 0));
        while(this.nodes.length > 0) {
            let node:Node = this.nodes.shift();
            let newDepth:number = node.depth + 1;
            this.expandedNodes++;
            if(problem.goalTest(node.state))
                return node;
            if(newDepth > depth) {
                continue;
            }
            for(let i = 0; i < problem.operators.length; i++) {
                let newState:State = problem.operators[i].apply(node.state);
                if(newState) {
                    let newNode = new Node(newState, node, problem.operators[i],
                      newDepth,
                      problem.pathCostFunc(node.pathCost, problem.operators[i]));
                    front(this.nodes, newNode);
                }
            }
        }
        return false;
    }
}
