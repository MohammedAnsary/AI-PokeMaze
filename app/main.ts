import { GenMaz } from './maze/gen-maze';
import { Cell} from "./maze/cell";
declare var Handlebars:any;

const gen = GenMaz(20, 20);
const pokeMaze = gen.maze;
console.log(pokeMaze);

console.log(`start: (${gen.start.row}, ${gen.start.col}) end: (${gen.end.row}, ${gen.end.col}), steps: (${gen.steps})`);

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
