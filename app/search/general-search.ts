import { SearchProblem } from '../datastructures/search-problem';
import { Node } from '../datastructures/node';
import { State } from '../datastructures/state';
import { Operator } from '../datastructures/operator';

export class GeneralSearch {
    private nodes:Node[];
    private queuingFunc:(nodes:Node[], node:Node) => void;
    private expandedNodes:number;

    constructor(queuingFunc:(nodes:Node[], node:Node) => void) {
        this.nodes = [];
        this.queuingFunc = queuingFunc;
        this.expandedNodes = 0;
    }

    search(problem:SearchProblem):any {
        this.nodes.push(new Node(problem.initState, null, null, 0, 0));
        while(this.nodes.length > 0) {
            let node:Node = this.nodes.shift();
            console.log(`curr Node : ${node.state.val}`)
            console.log(node.state.val);
            debugger;
            this.expandedNodes++;
            if(problem.goalTest(node.state))
                return node;
            for(let i = 0; i < problem.operators.length; i++) {
                let newState:State = problem.operators[i].apply(node.state);
                if(newState) {
                    let newNode = new Node(newState, node, problem.operators[i],
                      node.depth + 1,
                      problem.pathCostFunc(node.pathCost, problem.operators[i]));
                    this.queuingFunc(this.nodes, newNode);
                }
            }
        }
        return false;
    }
}
