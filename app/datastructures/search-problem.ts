import { State } from './state';
export class SearchProblem {
    operators:((oldState:State) => State)[];
    initState:State;
    stateSpace:State[];
    goalTest:(state:State) => boolean;
    pathCostFunc:(state:State) => number;

    constructor(operators:((oldState:State) => State)[],
    initState:State,
    stateSpace:State[],
    goalTest:(state:State) => boolean,
    pathCostFunc:(state:State) => number) {
        this.operators = operators;
        this.initState = initState;
        this.stateSpace = stateSpace;
        this.goalTest = goalTest;
        this.pathCostFunc = pathCostFunc;
    }

}
