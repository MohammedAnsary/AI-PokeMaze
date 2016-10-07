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

    objEqual(obj1:any, obj2:any):boolean {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
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
                let parent = node;
                let nonRepeated = true;
                if(newState) {
                    while(parent != null) {
                        let oldState = parent.state;
                        nonRepeated = nonRepeated && !this.objEqual(newState, oldState);
                        if(!nonRepeated) break;
                        parent = parent.parent;
                    }
                    if(!nonRepeated) continue;
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
