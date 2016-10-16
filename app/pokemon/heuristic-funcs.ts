import { SearchProblem } from '../datastructures/search-problem';
import { Operator } from '../datastructures/operator';
import { Node } from '../datastructures/node';
import { State } from '../datastructures/state';
import { Direction } from '../datastructures/direction';
import { GenMaze } from '../maze/gen-maze';
import { Cell } from '../maze/cell';
import { Maze } from '../maze/maze';
import { Position } from '../maze/position';

export const Manhattan = (node:Node, information:any):void => {
    let cell:Cell = node.state.val['cell'];
    let x = cell.position.col;
    let y = cell.position.row;
    let endPoint = information.endPoint;
    let dx = Math.abs(x - endPoint.col);
    let dy = Math.abs(y - endPoint.row);
    node.estimateCost = dx + dy;
    if(information.type == 'greedy')
        node.estimateCost += node.pathCost;
}
