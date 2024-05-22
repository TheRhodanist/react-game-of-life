import {TileModel} from "../models/TileModel";

export function calculateNextStep(board:TileModel[][]):TileModel[][] {
    const size = board.length
    const result = cloneBoard(board)
    for (let x = 0;x<size;x++)
    for (let y = 0;y<size;y++) {
        result[x][y].filled = willBeAlive(x,y,board)
    }
    return result;
}

export function cloneBoard(board:TileModel[][]):TileModel[][] {
    const size = board.length;
    const result:TileModel[][] = getEmptyGame(board.length);
    for(let i = 0;i<size;i++)
    for(let j = 0;j<size;j++) {
        result[i][j].filled = board[i][j].filled;
    }
    return result;
}
export function willBeAlive(x: number, y: number,board:TileModel[][]) {
    let neighbors = getNeighbors(x,y,board);
    if(neighbors<2) return false
    if(neighbors>3) return false;
    if(board[x][y].filled && (neighbors===2||neighbors===3)) return true
    return !board[x][y].filled && neighbors === 3;

}
export function getNeighbors(x:number,y:number,board:TileModel[][]):number {
    let result = 0;
    const size = board.length
    const aboveValid = y>0;
    const belowValid = y<size-1;
    const leftValid = x>0;
    const rightValid = x<size-1;
    if(leftValid    &&aboveValid    &&board[x-1][y-1]?.filled)  result++;
    if(leftValid                    &&board[x-1][y]?.filled)    result++;
    if(leftValid    &&belowValid    &&board[x-1][y+1]?.filled)  result++;
    if(aboveValid                   &&board[x][y-1]?.filled)    result++;
    if(belowValid                   &&board[x][y+1]?.filled)    result++;
    if(rightValid   &&aboveValid    &&board[x+1][y-1]?.filled)  result++;
    if(rightValid                   &&board[x+1][y]?.filled)    result++;
    if(rightValid   &&belowValid    &&board[x+1][y+1]?.filled)  result++;
    return result;
}

export function getEmptyGame(size:number,random?:boolean):TileModel[][] {
    const result:TileModel[][] = [];
    for(let i = 0;i<size;i++) {
        result.push([]);
        for(let j = 0;j<size;j++)
        {
            result[i].push(new TileModel(i,j,random?Math.random()>0.9:false));
        }

    }
    return result;
}
