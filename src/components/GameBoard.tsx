import React, {ChangeEvent, useEffect, useState} from "react";
import {tileModel} from "../models/tileModel";
import {Button, Checkbox, Grid, TextField} from "@mui/material";
import {calculateNextStep, willBeAlive} from "../services/LogicService";
import "../components/Tile/tile.css"

const GAME_SIZE=40;
const emptyGame:tileModel[][] = [];
for(let i = 0;i<GAME_SIZE;i++) {
    emptyGame.push([]);
    for(let j = 0;j<GAME_SIZE;j++)
    {
        emptyGame[i].push(new tileModel(i,j,Math.random() >= 0.9));
    }

}
interface Props {

}
const board:tileModel[][] = [[]];
export const GameBoard  = (props:Props) => {
    const [board, setBoard] = useState(emptyGame);
    const [lastBoard, setLastBoard] = useState(emptyGame);
    const [previewEnabled, setPreviewEnabled] = useState(false);
    const [timerValue, setTimerValue] = useState(100);
    const [autoMode, setAutoMode] = useState(false);

    function handleAdvance() {
        setLastBoard(prevState => board)
        setBoard(prevState =>  calculateNextStep(board)
        );
    }

    function handleBack() {
        console.log(board);
        console.log(lastBoard)
        console.log(board===lastBoard)
        setBoard(prevState => lastBoard);
    }

    useEffect(() => {
        const timer = setInterval(handleAdvance,timerValue);
        if(!autoMode) clearInterval(timer);
        console.log("timer")
        return function clean() {
            clearInterval(timer);
        }

    }, [timerValue,autoMode]);

    function handleNewTimer(event:React.ChangeEvent<HTMLTextAreaElement>) {
        const newTimer = Number.parseInt(event.target.value);
        if(Number.isNaN(newTimer)) return
        if(newTimer!=timerValue) setTimerValue(newTimer);
    }

    function handleAutoForwardChange(event:React.ChangeEvent<HTMLInputElement>) {
        setAutoMode(event.target.checked);
    }

    function handlePreview(event:ChangeEvent<HTMLInputElement>) {
        setPreviewEnabled(event.target.checked);
    }

    return (
        <>
            <div>
                Timer
                <Checkbox onChange={handleAutoForwardChange}></Checkbox>
                <TextField variant={"outlined"} onChange={handleNewTimer} defaultValue={timerValue}></TextField>
                <Button onClick={handleAdvance} variant={"contained"}>Advance</Button>
                <Button onClick={handleBack} variant={"contained"}>Back</Button>
                Preview
                <Checkbox onChange={handlePreview}></Checkbox>
            </div>
            <Grid container columns={GAME_SIZE} style={{height: "100%"}}
                                                         spacing={0}>
            {board.map((col, colIndex) => (
                <Grid xs={1} key={"col" + colIndex} spacing={0}>
                    {col.map((item, rowIndex) => {
                        const nextRoundAlive = willBeAlive(item.posx,item.posy,board);
                        const itemStyle = {
                            width:"50px",
                            height:"50px",
                            border:"thin solid black",
                            backgroundColor:"black",

                        }
                        if(previewEnabled) {
                            if(!item.filled) {
                                itemStyle.backgroundColor = nextRoundAlive?"lightgreen":"darkgray"
                            } else {
                                itemStyle.backgroundColor = nextRoundAlive?"green":"red"
                            }
                        } else {
                            itemStyle.backgroundColor = item.filled?"black":"darkgray"
                        }
                        return (
                            <Grid item key={"row" + rowIndex}>
                                {/*<Button  onClick={()=>{*/}
                                {/*    console.log(getNeighbors(colIndex,rowIndex,board))*/}
                                {/*    console.log(willBeAlive(colIndex,rowIndex,board))*/}
                                {/*}*/}
                                {/*}>*/}
                                {/*    {item.filled ? "X" : "."}*/}

                                {/*</Button>*/}

                                <div style={itemStyle}>
                                    {/*{item.filled ? "X" : "."}*/}
                                </div>
                            </Grid>
                        );
                    })}
                </Grid>
            ))}
        </Grid>
        </>
)
}
