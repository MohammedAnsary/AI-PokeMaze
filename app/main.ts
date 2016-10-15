import { GenMaze } from './maze/gen-maze';
import { Search } from "./search/search";
declare var Handlebars:any;

const pokeMaze = GenMaze(4, 4);
renderMazeView();
console.log(pokeMaze.maze);

console.log('Strategy: BF');
Search(pokeMaze, 'BF', false);

console.log('Strategy: UC');
Search(pokeMaze, 'UC', false);

console.log('Strategy: DF');
Search(pokeMaze, 'DF', false);

console.log('Strategy: ID');
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
