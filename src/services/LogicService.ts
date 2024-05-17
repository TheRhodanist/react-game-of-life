import {tileModel} from "../models/tileModel";

export function calculateNextStep(board:tileModel[][]):tileModel[][] {
    const size = board.length
    const result = cloneBoard(board)
    for (let x = 1;x<size;x++)
    for (let y = 0;y<size;y++) {
        result[x][y].filled = willBeAlive(x,y,board)
    }
    return result;
}

function cloneBoard(board:tileModel[][]):tileModel[][] {
    const size = board.length;
    const result:tileModel[][] = [];
    for(let i = 0;i<size;i++) {
        result.push([...board[i]])
    }
    return result;
}
export function willBeAlive(x: number, y: number,board:tileModel[][]) {
    let neighbors = getNeighbors(x,y,board);
    // console.log(board[x][y])
    // console.log(neighbors)
    if(neighbors<2) return false
    if(neighbors>3) return false;
    if(board[x][y].filled && (neighbors===2||neighbors===3)) return true
    return !board[x][y].filled && neighbors === 3;

}
export function getNeighbors(x:number,y:number,board:tileModel[][]):number {
    let result = 0;
    const size = board.length
    const aboveValid = y>0;
    const belowValid = y<size-1;
    const leftValid = x>0;
    const rightValid = x<size-1;
    // if(x===0||x===39||y===0||y===39) return 0;
    if(leftValid&&aboveValid&&board[x-1][y-1]?.filled) result++;
    if(leftValid&&board[x-1][y]?.filled) result++;
    if(leftValid&&y<size&&board[x-1][y+1]?.filled) result++;
    if(aboveValid&&board[x][y-1]?.filled) result++;
    if(belowValid&&board[x][y+1]?.filled) result++;
    if(rightValid&&aboveValid&&board[x+1][y-1]?.filled) result++;
    if(rightValid&&board[x+1][y]?.filled) result++;
    if(rightValid&&belowValid&&board[x+1][y+1]?.filled) result++;
    return result;
}
