import { Map2D } from "./Map2D";

export enum Direction {
    TOP = 2,
    BOTTOM = 3,
    LEFT = 4,
    RIGHT = 5,
}

export class TemplateRoom {
    
    public width: number;
    public height: number;
    public tiles = new Map2D<number>();

    public doorways: number[] = [];

    constructor(data: number[][]) {
        this.doorways[Direction.TOP]        = -1;
        this.doorways[Direction.BOTTOM]     = -1;
        this.doorways[Direction.LEFT]       = -1;
        this.doorways[Direction.RIGHT]      = -1;
        this.width = data[0].length;
        this.height = data.length;
        for (let i = 0; i < this.width; i ++) {
            for (let j = 0; j < this.height; j ++) {
                this.tiles.set(i, j, data[j][i]);
            }
        }

        for (let i = 0; i < this.width; i ++) {
            if (this.tiles.get(i, 0) === 0) {
                this.doorways[Direction.TOP] = i;
                this.tiles.set(i, 0, Direction.TOP);
            }
            if (this.tiles.get(i, this.height - 1) === 0) {
                this.doorways[Direction.BOTTOM] = i;
                this.tiles.set(i, this.height - 1, Direction.BOTTOM);
            }
        }
        for (let i = 0; i < this.height; i ++) {
            if (this.tiles.get(0, i) === 0) {
                this.doorways[Direction.LEFT] = i;
                this.tiles.set(0, i, Direction.LEFT);
            }
            if (this.tiles.get(this.width - 1, i) === 0) {
                this.doorways[Direction.RIGHT] = i;
                this.tiles.set(this.width - 1, i, Direction.RIGHT);
            }
        }
    }

    public toString() {
        let repr = "";
        for (let j = 0; j < this.height; j ++) {
            for (let i = 0; i < this.width; i ++) {
                switch (this.tiles.get(i, j)) {
                    case 1: repr += "██"; break;
                    case 2: repr += "^^"; break;
                    case 3: repr += "vv"; break;
                    case 4: repr += "<<"; break;
                    case 5: repr += ">>"; break;
                    default: repr += "  ";
                }
            }
            repr += "\n";
        }
        return repr;
    }
}