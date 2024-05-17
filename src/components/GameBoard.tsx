import {useEffect, useState} from "react";
import {tileModel} from "../tileModel";
const GAME_SIZE=40;
const emptyGame:tileModel[][] = [[]]
for(let i = 0;i<GAME_SIZE;i++)
for(let j = 0;j<GAME_SIZE;j++)
{
    emptyGame[i][j] = new tileModel(i,j,false);
}
interface Props {

}
const board:tileModel[][] = [[]];
export const GameBoard  = (props:Props) => {
    const [board, setBoard] = useState(emptyGame);
    return (
        <div>

        </div>
    )
}
