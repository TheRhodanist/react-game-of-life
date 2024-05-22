import React, {ChangeEvent, useEffect, useState} from "react";
import {TileModel} from "../models/TileModel";
import {Button, Checkbox, TextField, ToggleButton} from "@mui/material";
import {calculateNextStep, getEmptyGame} from "../services/LogicService";
import "../components/Tile/tile.css"
import {Tile} from "./Tile/Tile";

const GAME_SIZE=40;
const randomGame:TileModel[][] = getEmptyGame(GAME_SIZE,true)
interface Props {

}
export const GameBoard  = (props:Props) => {
    const [board, setBoard] = useState(randomGame);
    const [lastBoard, setLastBoard] = useState(randomGame);
    const [previewEnabled, setPreviewEnabled] = useState(false);
    const [timerValue, setTimerValue] = useState(100);
    const [autoMode, setAutoMode] = useState(false);
    const [redraw, setRedraw] = useState(false);

    function handleAdvance() {
        setLastBoard(board)
        setBoard(prevstate=>{
            const newBoard = calculateNextStep(prevstate);
            return newBoard;
        });
    }
    function handleToggleTile(tile:TileModel) {
        tile.toggle();
        manualRedraw()
    }
    function handleBack() {
        setBoard(prevState => lastBoard);
    }
    function manualRedraw() {
        setRedraw(prevState => !prevState)
    }
    useEffect(() => {
        const timer = setInterval(()=>{
            handleAdvance();
        },timerValue);
        if(!autoMode) clearInterval(timer);
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
                <ToggleButton style={{backgroundColor:"gray",marginRight:"10px"}} value={autoMode} selected={autoMode} onChange={()=>setAutoMode(!autoMode)}>Timer</ToggleButton>
                <TextField variant={"outlined"} onChange={handleNewTimer} defaultValue={timerValue} style={{backgroundColor:"gray"}}></TextField>
                <Button onClick={handleAdvance} variant={"contained"}>Advance</Button>
                <Button onClick={handleClear} variant={"contained"}>Clear</Button>
                Preview
                <Checkbox onChange={handlePreview}></Checkbox>
            </div>
            <div>
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
        </div>
        </>
)
}
