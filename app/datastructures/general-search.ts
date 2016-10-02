import { SearchProblem } from './search-problem';
import { Node } from './node';

export class GeneralSearch {
    private nodes:Node[];
    private queuingFunc:(node:Node) => void;

    constructor(queuingFunc:(node:Node) => void) {
        this.nodes = [];
        this.queuingFunc = queuingFunc;
    }

    search(problem:SearchProblem):any {
        this.nodes.push(new Node(problem.initState, null, null, 0, 0));
        while(this.nodes.length > 0) {
            let node:Node = this.nodes.shift();
            if(problem.goalTest(node.state))
                return node;
            
        }
        return false;
    }
}
