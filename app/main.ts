import { Maze } from './maze/maze';
import { Cell} from "./maze/cell";
declare var Handlebars:any;
const maze = new Maze();
maze.genMaze(10, 30);
const pokeMaze = maze.maze;
console.log(pokeMaze);
renderMazeView();

function renderMazeView() {
    let data = {
        row: [

        ]
    };
    let template:(param?:any) => any = Handlebars.templates['maze'];
    let host:HTMLElement = document.getElementById('maze');

    for(let i=0;i<pokeMaze.length;i++){
      let col = {col: pokeMaze[i]};
      data.row.push(col);
    }

    host.innerHTML = template(data);
}

//let template = Handlebars.templates['maze'];
