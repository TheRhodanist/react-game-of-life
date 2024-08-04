import React, {ChangeEvent, CSSProperties} from 'react';
import {Button, Checkbox, TextField, ToggleButton} from "@mui/material";

interface Props {
    autoMode:boolean,
    setAutoMode:(flag:boolean)=>void,
    timerValue:number,
    setTimerValue:(time:number)=>void,
    previewEnabled:boolean,
    setPreviewEnabled:(flag:boolean)=>void,
    handleClear:()=>void,
    handleAdvance:()=>void,
}

function HeaderComponent(props:Props) {

    const {autoMode,setAutoMode,timerValue,setTimerValue,previewEnabled,setPreviewEnabled,handleClear,handleAdvance}=props
    function handleNewTimer(event:React.ChangeEvent<HTMLTextAreaElement>) {
        const newTimer = Number.parseInt(event.target.value);
        if(Number.isNaN(newTimer)) return
        if(newTimer!=timerValue) setTimerValue(newTimer);
    }

    function handlePreview(event:ChangeEvent<HTMLInputElement>) {
        setPreviewEnabled(event.target.checked);
    }


    const headerStyles:CSSProperties = {
        height:"10%",
        flex:"auto",
        flexBasis:"content",
        justifyContent:"space-evenly",
        alignContent: "center"
    }
        return (
        <div style={headerStyles}>
            <ToggleButton style={{backgroundColor:"gray",marginRight:"10px"}} value={autoMode} selected={autoMode} onChange={()=>setAutoMode(!autoMode)}>Timer</ToggleButton>
            <TextField variant={"outlined"} onChange={handleNewTimer} defaultValue={timerValue} style={{backgroundColor:"gray"}}></TextField>
            <Button onClick={handleAdvance} variant={"contained"}>Advance</Button>
            <Button onClick={handleClear} variant={"contained"}>Clear</Button>
            Preview
            <Checkbox value={previewEnabled} onChange={handlePreview}></Checkbox>
        </div>
    );
}

export default HeaderComponent;