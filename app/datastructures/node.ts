import { State } from './state';
export class Node {
    state:State;
    parent:Node;
    operator:(oldState:State) => State;
    depth:number;
    pathCost:number;

    constructor(state:State,
    parent:Node,
    operator:(oldState:State) => State,
    depth:number,
    pathCost:number) {
        this.state = state;
        this.parent = parent;
        this.operator = operator;
        this.depth = depth;
        this.pathCost = pathCost;
    }
}
