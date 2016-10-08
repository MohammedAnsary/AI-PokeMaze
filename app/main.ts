import { GenMaze } from './maze/gen-maze';
import { Search } from "./search/search";
declare var Handlebars:any;

const pokeMaze = GenMaze(5, 5);
renderMazeView();
console.log(pokeMaze.maze);
Search(pokeMaze, 'ID', false);

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
