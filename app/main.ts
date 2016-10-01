import { GenMaze } from './maze/gen-maze';
import { Cell} from "./maze/cell";

const pokeMaze = GenMaze(80, 80);
for(let i=0;i<pokeMaze.length;i++){
  for(let j=0;j<pokeMaze[i].length;j++){
    let c = pokeMaze[i][j];
    console.log(`printing cell at i= ${i} and j= ${j}: ${c.print()}`);

  }


}
