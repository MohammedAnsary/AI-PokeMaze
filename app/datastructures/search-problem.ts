import { State } from './state';
export class SearchProblem {
    private operators:((oldState:State) => State)[];
    private initState:State;
    private stateSpace:State[];
    private goalTest:(state:State) => boolean;
    private pathCost:(state:State) => number;

    constructor(operators:((oldState:State) => State)[],
    initState:State,
    stateSpace:State[],
    goalTest:(state:State) => boolean,
    pathCost:(state:State) => number) {
        this.operators = operators;
        this.initState = initState;
        this.stateSpace = stateSpace;
        this.goalTest = goalTest;
        this.pathCost = pathCost;
    }
}
