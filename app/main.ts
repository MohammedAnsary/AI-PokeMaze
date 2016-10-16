import { GenMaze } from './maze/gen-maze';
import { Search } from "./search/search";
declare var Handlebars:any;

const pokeMaze = GenMaze(3, 3);
renderMazeView();
console.log(pokeMaze);

console.log('Strategy: BF');
Search(pokeMaze, 'BF', false);

console.log('Strategy: UC');
Search(pokeMaze, 'UC', false);

console.log('Strategy: DF');
Search(pokeMaze, 'DF', false);
//
// console.log('Strategy: ID');
// Search(pokeMaze, 'ID', false);
//
console.log('Strategy: GR1');
Search(pokeMaze, 'GR1', false);

console.log('Strategy: AS1');
Search(pokeMaze, 'AS1', false);

console.log('Strategy: GR2');
Search(pokeMaze, 'GR2', false);

console.log('Strategy: AS2');
Search(pokeMaze, 'AS2', false);

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
