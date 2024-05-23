import {TileModel} from "../../models/TileModel";
import {willBeAlive} from "../../services/LogicService";

export enum tileColors {
    RED = "rgb(200,0,0)",
    BLACK = "rgb(0,0,0)",
    LGRAY = "rgb(135,130,130)",
}

interface Props {
    tile: TileModel;
    board: TileModel[][],
    previewEnabled: boolean,
    handleToggle: (tile: TileModel) => void,
}

export const Tile = (props: Props) => {
    const {previewEnabled, board, tile, handleToggle} = props;
    const nextRoundAlive = willBeAlive(tile.posx, tile.posy, board);
    const itemStyle = {
        width: "20px",
        maxWidth: "20px",
        height: "20px",
        maxHeight: "20px",
        border: "thin solid black",
        backgroundColor: "black",

    }
    if (previewEnabled) {
        if (!tile.filled) {
            itemStyle.backgroundColor = nextRoundAlive ? "lightgreen" : "darkgray"
        } else {
            itemStyle.backgroundColor = nextRoundAlive ? "green" : "red"
        }
    } else {
        itemStyle.backgroundColor = tile.filled ? "black" : "darkgray"
    }

    function handleClick() {
        handleToggle(tile);
    }

    return (
        <div style={itemStyle} onClick={handleClick}></div>
    )
}