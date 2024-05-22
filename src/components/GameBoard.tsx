import React, {ChangeEvent, useEffect, useState} from "react";
import {TileModel} from "../models/TileModel";
import {Button, Checkbox, Grid, TextField} from "@mui/material";
import {calculateNextStep, cloneBoard, getEmptyGame, willBeAlive} from "../services/LogicService";
import "../components/Tile/tile.css"
import {Tile} from "./Tile/Tile";

const GAME_SIZE=40;
const emptyGame:TileModel[][] = getEmptyGame(GAME_SIZE,true)
interface Props {

}
const board:TileModel[][] = [[]];
export const GameBoard  = (props:Props) => {
    const [board, setBoard] = useState(emptyGame);
    const [lastBoard, setLastBoard] = useState(emptyGame);
    const [previewEnabled, setPreviewEnabled] = useState(false);
    const [timerValue, setTimerValue] = useState(100);
    const [autoMode, setAutoMode] = useState(false);

    function handleAdvance() {
        setLastBoard(prevState => board)
        setBoard(prevstate=>{
            const newBoard = calculateNextStep(prevstate);
            return newBoard;
        });
    }
    function handleToggleTile(tile:TileModel) {
        const newBoard = cloneBoard(board);
        newBoard[tile.posx][tile.posy].filled = !newBoard[tile.posx][tile.posy].filled;
        setBoard(prevState=>newBoard);
    }
    function handleBack() {

        setBoard(prevState => lastBoard);
    }

    useEffect(() => {
        const timer = setInterval(()=>{
            console.log("Timer");
            handleAdvance();
        },timerValue);
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
    function handleClear() {
        setBoard(getEmptyGame(GAME_SIZE));
    }

    return (
        <>
            <div>
                Timer
                <Checkbox onChange={handleAutoForwardChange}></Checkbox>
                <TextField variant={"outlined"} onChange={handleNewTimer} defaultValue={timerValue}></TextField>
                <Button onClick={handleAdvance} variant={"contained"}>Advance</Button>
                <Button onClick={handleClear} variant={"contained"}>Clear</Button>
                Preview
                <Checkbox onChange={handlePreview}></Checkbox>
            </div>
            <Grid container columns={GAME_SIZE} style={{height: "100%"}}
                                                         spacing={0}>
            {board.map((col, colIndex) => (
                <div key={"col" + colIndex} style={{margin:"auto",display:"flex"}}>
                    {col.map((item, rowIndex) => {
                        return (
                            <div key={"row" + rowIndex}>
                                <Tile board={board} previewEnabled={previewEnabled} tile={item} handleToggle={handleToggleTile}/>
                            </div>
                        );
                    })}
                </div>
            ))}
        </Grid>
        </>
)
}
