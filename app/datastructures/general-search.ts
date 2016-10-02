import { SearchProblem } from './search-problem';
import { Node } from './node';
import { State } from './state';
import { Operator } from './operator';

export class GeneralSearch {
    private nodes:Node[];
    private queuingFunc:(nodes:Node[], node:Node) => void;

    constructor(queuingFunc:(nodes:Node[], node:Node) => void) {
        this.nodes = [];
        this.queuingFunc = queuingFunc;
    }

    search(problem:SearchProblem):any {
        this.nodes.push(new Node(problem.initState, null, null, 0, 0));
        while(this.nodes.length > 0) {
            let node:Node = this.nodes.shift();
            if(problem.goalTest(node.state))
                return node;
            for(let i = 0; i < problem.operators.length; i++) {
                let newState:State = problem.operators[i].apply(node.state);
                if(newState) {
                    let newNode = new Node(newState, node, problem.operators[i], node.depth + 1, problem.pathCostFunc(node.pathCost, problem.operators[i]));
                    this.queuingFunc(this.nodes, newNode);
                }
            }
        }
        return false;
    }
}
