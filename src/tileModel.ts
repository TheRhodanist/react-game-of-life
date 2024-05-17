export class tileModel {
    posx:number;
    posy:number;
    filled:boolean;
    getNeighbors(gameBoard:boolean[][]) {

    }


    constructor(posx: number, posy: number, filled: boolean) {
        this.posx = posx;
        this.posy = posy;
        this.filled = filled;
    }
}