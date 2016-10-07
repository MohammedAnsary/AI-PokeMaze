import { GenMaze } from './maze/gen-maze';
import { Search } from "./search/search";
declare var Handlebars:any;

const pokeMaze = GenMaze(2, 2);
renderMazeView();
console.log(pokeMaze.maze);
Search(pokeMaze, 'BFS', false, false);
Search(pokeMaze, 'BFS', false, true);
Search(pokeMaze, 'Uniform', false, false);
Search(pokeMaze, 'Uniform', false, true);

Search(pokeMaze, 'DFS', false, true);

// console.log(pokeMaze);
//
// // console.log(`start: (${gen.start.row}, ${gen.start.col}) end: (${gen.end.row}, ${gen.end.col}), steps: (${gen.steps})`);
// console.log(`direction: ${gen.dir}`);


function renderMazeView() {
    let template:(param?:any) => any = Handlebars.templates['maze'];
    let host:HTMLElement = document.getElementById('maze');
    let data = {
        row: []
    };

    for(let i = 0; i < pokeMaze.maze.length;i++){
      let col = { col: pokeMaze.maze[i] };
      data.row.push(col);
    }

    host.innerHTML = template(data);
}
