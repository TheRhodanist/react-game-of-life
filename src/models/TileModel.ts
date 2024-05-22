export class TileModel {
    posx:number;
    posy:number;
    filled:boolean;

    constructor(posx: number, posy: number, filled: boolean) {
        this.posx = posx;
        this.posy = posy;
        this.filled = filled;
    }
    clear() {
        this.filled = false;
    }
    toggle() {
        this.filled = !this.filled;
    }
}