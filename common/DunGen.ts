import { Map2D } from "./Map2D";
import { TemplateRoom, Direction } from "./TemplateRoom";
import * as seedrandom from "seedrandom";
import { Keys } from "./utils";

export interface DunGenOpts {
    width?: number,
    height?: number,
    seed?: string,
}

let defaults: DunGenOpts = {
    width: 50,
    height: 50,
}

interface IOpenDoor extends IPoint {
    direction: Direction;
}

interface IPoint {
    x: number;
    y: number;
}

export enum ETiles {
    SOLID = -1,
    EMPTY = 0,
    WALL = 1,
    TOP_DOOR = Direction.TOP,
    BOTTOM_DOOR = Direction.BOTTOM,
    LEFT_DOOR = Direction.LEFT,
    RIGHT_DOOR = Direction.RIGHT,
    LADDER = 6,
}

function oppositeDirection(dir: Direction): Direction {
    switch(dir) {
        case Direction.TOP: return Direction.BOTTOM;
        case Direction.BOTTOM: return Direction.TOP;
        case Direction.LEFT: return Direction.RIGHT;
        case Direction.RIGHT: return Direction.LEFT;
    }
}

const directions = [Direction.TOP, Direction.BOTTOM, Direction.LEFT, Direction.RIGHT];

function addOpenDoor(x: number, y: number, room: TemplateRoom, direction: Direction, openDoors: IOpenDoor[]) {
    if (room.doorways[direction] < 0) return;
    if (direction === Direction.TOP) {
        openDoors.push( { direction: direction, x: x + room.doorways[direction], y: y } );
    } else if (direction === Direction.BOTTOM) {
        openDoors.push( { direction: direction, x: x + room.doorways[direction], y: y + room.height - 1 } );
    } else if (direction === Direction.LEFT) {
        openDoors.push( { direction: direction, x: x, y: y + room.doorways[direction] } );
    } else if (direction === Direction.RIGHT) {
        openDoors.push( { direction: direction, x: x + room.width - 1, y: y + room.doorways[direction] } );
    }
}

function addOpenDoors(x: number, y: number, room: TemplateRoom, openDoors: IOpenDoor[], exculde: Direction[] = []) {
    for (let dir of directions) {
        if (exculde.indexOf(dir) >= 0 || room.doorways[dir] < 0) continue;
        addOpenDoor(x, y, room, dir, openDoors);
    }
}

function roomCanAttach(direction: Direction, candidateRoom: TemplateRoom) {
    return candidateRoom.doorways[oppositeDirection(direction)] >= 0;
}

function connectedRoomXY(door: IOpenDoor, room: TemplateRoom) {
    let connectingDoor = room.doorways[oppositeDirection(door.direction)];
    switch (door.direction) {
        case Direction.TOP: return { x: door.x - connectingDoor, y: door.y - room.height };
        case Direction.BOTTOM: return { x: door.x - connectingDoor, y: door.y + 1 };
        case Direction.LEFT: return { x: door.x - room.width, y: door.y - connectingDoor };
        case Direction.RIGHT: return { x: door.x + 1, y: door.y - connectingDoor };
        default: throw new Error("Invalid direction");
    }
}

export function DunGen(templates: TemplateRoom[], opts?: DunGenOpts) {
    opts = opts || {};
    for (let key of Keys(defaults)) {
        if (opts[key] === undefined) opts[key] = defaults[key];
    }
    let prng = seedrandom(opts.seed);
    let dungeon = new Dungeon(opts.width!, opts.height!, opts.seed || "");
    let openDoors: IOpenDoor[] = [];
    templates = fyShuffle(templates, prng);
    let root = templates[0];
    let x = Math.floor((dungeon.width - root.width) / 2);
    let y = Math.floor((dungeon.height - root.height) / 2);
    if (!dungeon.paint(root, x, y)) {
        return dungeon;
    }
    addOpenDoors(x, y, root, openDoors);

    while (openDoors.length) {
        openDoors = fyShuffle(openDoors, prng);
        let door = openDoors.pop()!;
        templates = fyShuffle(templates, prng);
        for (let candidate of templates) {
            if (!roomCanAttach(door.direction, candidate)) continue;
            let xy = connectedRoomXY(door, candidate);
            if (dungeon.paint(candidate, xy.x, xy.y)) {
                addOpenDoors(xy.x, xy.y, candidate, openDoors, [oppositeDirection(door.direction)]);
            }
        }
    }
    
    dungeon = dungeon.map( (tile, x, y, dungeon) => {
        if (tile === ETiles.SOLID || tile === ETiles.WALL) {
            if (y > 0 && y < dungeon.height - 1) {
                let top = dungeon.tiles.get(x, y - 1);
                let bottom = dungeon.tiles.get(x, y + 1);
                if (((top === Direction.BOTTOM || top === 0) && (bottom === Direction.TOP || bottom === 0))
                                                             && top !== bottom)
                {
                    return Direction.BOTTOM;
                }
            }
            if (x > 0 && x < dungeon.width - 1) {
                let left = dungeon.tiles.get(x - 1, y);
                let right = dungeon.tiles.get(x + 1, y);
                if (((left === Direction.RIGHT || left === 0) && (right === Direction.LEFT || right === 0))
                                                              && left !== right)
                {
                    return 0;
                }
            }
        }
        if (directions.indexOf(tile) < 0) return tile;
        if (x > 0 && x < dungeon.width - 1 && y > 0 && y < dungeon.height - 1) {
            let xy = { x: 0, y: 0 };
            switch (tile) {
                case Direction.TOP: xy.y = -1; break;
                case Direction.BOTTOM: xy.y = 1; break;
                case Direction.LEFT: xy.x = -1; break;
                case Direction.RIGHT: xy.x = 1; break;
            }
            if (dungeon.tiles.get(x + xy.x, y + xy.y) === oppositeDirection(tile)) {
                return tile === Direction.BOTTOM ? Direction.BOTTOM : ETiles.EMPTY;
            } else {
                if (x > 1 && x < dungeon.width - 2 && y > 1 && y < dungeon.height - 2) {
                    let reach = dungeon.tiles.get(x + xy.x * 2, y + xy.y * 2)
                    if (reach === ETiles.EMPTY || reach === oppositeDirection(tile)) {
                        return tile === Direction.BOTTOM ? Direction.BOTTOM : ETiles.EMPTY;
                    }
                }
            }
        }
        return ETiles.WALL;
    } );

    let ladderSeeds: IPoint[] = [];
    for (let i = 0; i < dungeon.width - 1; i ++) {
        for (let j = 0; j < dungeon.width - 1; j ++) {
            if (dungeon.tiles.get(i, j) === ETiles.EMPTY && dungeon.tiles.get(i + 1, j) === ETiles.EMPTY) {
                let bl = dungeon.tiles.get(i, j + 1);
                let br = dungeon.tiles.get(i + 1, j + 1);
                if (bl === 1 && br === Direction.BOTTOM) {
                    ladderSeeds.push({ x: i + 1, y: j + 1 });
                } else if (bl === Direction.BOTTOM && br === ETiles.WALL) {
                    ladderSeeds.push({ x: i, y: j + 1 });
                }
            }
        }
    }
    ladderSeeds = fyShuffle(ladderSeeds, prng);

    function eraseBottomDoor(x: number, y: number) {
        if (dungeon.tiles.get(x, y) === Direction.BOTTOM) {
            dungeon.tiles.set(x, y, ETiles.EMPTY);
            eraseBottomDoor(x - 1, y);
            eraseBottomDoor(x + 1, y);
        }
    }

    while (ladderSeeds.length > 0) {
        let seed = ladderSeeds.pop()!;
        if (dungeon.tiles.get(seed.x, seed.y) !== Direction.BOTTOM) continue;
        while (dungeon.tiles.get(seed.x, seed.y) !== ETiles.WALL) {
            if (dungeon.tiles.get(seed.x, seed.y) === Direction.BOTTOM) {
                eraseBottomDoor(seed.x, seed.y);
            }
            dungeon.tiles.set(seed.x, seed.y, ETiles.LADDER);
            seed.y ++;
        }
    }

    return dungeon.map( (t) => t === ETiles.SOLID ? ETiles.WALL : t );
}

export class Dungeon {
    public tiles = new Map2D<number>();
    constructor(public width: number, public height: number, public seed: string, initializer: (x: number, y: number) => number = () => -1) {
        for (let i = 0; i < width; i ++) {
            for (let j = 0; j < height; j ++) {
                this.tiles.set(i, j, initializer(i, j));
            }
        }
    }

    paint(room: TemplateRoom, x: number, y: number): boolean {
        if (x < 0 || y < 0 || x + room.width > this.width || y + room.height > this.height) return false;
        for (let i = 0; i < room.width; i ++) {
            for (let j = 0; j < room.height; j ++) {
                let tile = this.tiles.get(x + i, y + j);
                if (tile === undefined || tile !== ETiles.SOLID) return false;
            }
        }
        for (let i = 0; i < room.width; i ++) {
            for (let j = 0; j < room.height; j ++) {
                this.tiles.set(x + i, y + j, room.tiles.get(i, j));
            }
        }
        return true;
    }

    map(fn: (tile: number, x: number, y: number, dungeon: this) => number): Dungeon {
        return new Dungeon(this.width, this.height, this.seed, (x, y) => {
            return fn(this.tiles.get(x, y), x, y, this);
        } );
    }
}

function fyShuffle<T>(arr: T[], prng: seedrandom.prng): T[] {
    arr = arr.slice();
    for (let i = arr.length - 1; i > 0; i --) {
        let swp = Math.floor(prng() * (i + 1));
        let temp = arr[i];
        arr[i] = arr[swp];
        arr[swp] = temp;
    }
    return arr;
}