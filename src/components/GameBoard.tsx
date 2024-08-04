import React, {useEffect, useState} from "react";
import {TileModel} from "../models/TileModel";
import {calculateNextStep, getEmptyGame} from "../services/LogicService";
import "../components/Tile/tile.css"
import {Tile} from "./Tile/Tile";
import HeaderComponent from "./Header/HeaderComponent";

const GAME_SIZE=40;
const randomGame:TileModel[][] = getEmptyGame(GAME_SIZE,true)

export const GameBoard  = () => {
    const [board, setBoard] = useState(randomGame);
    const [previewEnabled, setPreviewEnabled] = useState(false);
    const [timerValue, setTimerValue] = useState(100);
    const [autoMode, setAutoMode] = useState(false);

    function handleAdvance() {
        setBoard(prevstate=>{
            return calculateNextStep(prevstate);
        });
    }
    function handleToggleTile(tile:TileModel) {
        tile.toggle();
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
    function handleClear() {
        setBoard(getEmptyGame(GAME_SIZE));
    }

    return (
        <div style={{display: "flex", flexFlow: "column", height: "100vh", width: "80%"}}>
            <HeaderComponent autoMode={autoMode} setAutoMode={setAutoMode} timerValue={timerValue}
                             setTimerValue={setTimerValue} previewEnabled={previewEnabled}
                             setPreviewEnabled={setPreviewEnabled} handleClear={handleClear}
                             handleAdvance={handleAdvance}/>
            <div style={{height: "90%", alignSelf: "center"}}>
                {board.map((col, colIndex) => (
                    <div key={"col" + colIndex} style={{margin: "auto", display: "flex"}}>
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
        </div>
)
}
