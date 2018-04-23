"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Map2D_1 = require("./Map2D");
const TemplateRoom_1 = require("./TemplateRoom");
const seedrandom = require("seedrandom");
let defaults = {
    width: 50,
    height: 50,
};
function Keys(obj) {
    return Object.keys(obj);
}
var ETiles;
(function (ETiles) {
    ETiles[ETiles["SOLID"] = -1] = "SOLID";
    ETiles[ETiles["EMPTY"] = 0] = "EMPTY";
    ETiles[ETiles["WALL"] = 1] = "WALL";
    ETiles[ETiles["TOP_DOOR"] = 2] = "TOP_DOOR";
    ETiles[ETiles["BOTTOM_DOOR"] = 3] = "BOTTOM_DOOR";
    ETiles[ETiles["LEFT_DOOR"] = 4] = "LEFT_DOOR";
    ETiles[ETiles["RIGHT_DOOR"] = 5] = "RIGHT_DOOR";
    ETiles[ETiles["LADDER"] = 6] = "LADDER";
})(ETiles = exports.ETiles || (exports.ETiles = {}));
function oppositeDirection(dir) {
    switch (dir) {
        case TemplateRoom_1.Direction.TOP: return TemplateRoom_1.Direction.BOTTOM;
        case TemplateRoom_1.Direction.BOTTOM: return TemplateRoom_1.Direction.TOP;
        case TemplateRoom_1.Direction.LEFT: return TemplateRoom_1.Direction.RIGHT;
        case TemplateRoom_1.Direction.RIGHT: return TemplateRoom_1.Direction.LEFT;
    }
}
const directions = [TemplateRoom_1.Direction.TOP, TemplateRoom_1.Direction.BOTTOM, TemplateRoom_1.Direction.LEFT, TemplateRoom_1.Direction.RIGHT];
function addOpenDoor(x, y, room, direction, openDoors) {
    if (room.doorways[direction] < 0)
        return;
    if (direction === TemplateRoom_1.Direction.TOP) {
        openDoors.push({ direction: direction, x: x + room.doorways[direction], y: y });
    }
    else if (direction === TemplateRoom_1.Direction.BOTTOM) {
        openDoors.push({ direction: direction, x: x + room.doorways[direction], y: y + room.height - 1 });
    }
    else if (direction === TemplateRoom_1.Direction.LEFT) {
        openDoors.push({ direction: direction, x: x, y: y + room.doorways[direction] });
    }
    else if (direction === TemplateRoom_1.Direction.RIGHT) {
        openDoors.push({ direction: direction, x: x + room.width - 1, y: y + room.doorways[direction] });
    }
}
function addOpenDoors(x, y, room, openDoors, exculde = []) {
    for (let dir of directions) {
        if (exculde.indexOf(dir) >= 0 || room.doorways[dir] < 0)
            continue;
        addOpenDoor(x, y, room, dir, openDoors);
    }
}
function roomCanAttach(direction, candidateRoom) {
    return candidateRoom.doorways[oppositeDirection(direction)] >= 0;
}
function connectedRoomXY(door, room) {
    let connectingDoor = room.doorways[oppositeDirection(door.direction)];
    switch (door.direction) {
        case TemplateRoom_1.Direction.TOP: return { x: door.x - connectingDoor, y: door.y - room.height };
        case TemplateRoom_1.Direction.BOTTOM: return { x: door.x - connectingDoor, y: door.y + 1 };
        case TemplateRoom_1.Direction.LEFT: return { x: door.x - room.width, y: door.y - connectingDoor };
        case TemplateRoom_1.Direction.RIGHT: return { x: door.x + 1, y: door.y - connectingDoor };
        default: throw new Error("Invalid direction");
    }
}
function DunGen(templates, opts) {
    opts = opts || {};
    for (let key of Keys(defaults)) {
        if (opts[key] === undefined)
            opts[key] = defaults[key];
    }
    let prng = seedrandom(opts.seed);
    let dungeon = new Dungeon(opts.width, opts.height, opts.seed || "");
    let openDoors = [];
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
        let door = openDoors.pop();
        templates = fyShuffle(templates, prng);
        for (let candidate of templates) {
            if (!roomCanAttach(door.direction, candidate))
                continue;
            let xy = connectedRoomXY(door, candidate);
            if (dungeon.paint(candidate, xy.x, xy.y)) {
                addOpenDoors(xy.x, xy.y, candidate, openDoors, [oppositeDirection(door.direction)]);
            }
        }
    }
    dungeon = dungeon.map((tile, x, y, dungeon) => {
        if (tile === ETiles.SOLID || tile === ETiles.WALL) {
            if (y > 0 && y < dungeon.height - 1) {
                let top = dungeon.tiles.get(x, y - 1);
                let bottom = dungeon.tiles.get(x, y + 1);
                if (((top === TemplateRoom_1.Direction.BOTTOM || top === 0) && (bottom === TemplateRoom_1.Direction.TOP || bottom === 0))
                    && top !== bottom) {
                    return TemplateRoom_1.Direction.BOTTOM;
                }
            }
            if (x > 0 && x < dungeon.width - 1) {
                let left = dungeon.tiles.get(x - 1, y);
                let right = dungeon.tiles.get(x + 1, y);
                if (((left === TemplateRoom_1.Direction.RIGHT || left === 0) && (right === TemplateRoom_1.Direction.LEFT || right === 0))
                    && left !== right) {
                    return 0;
                }
            }
        }
        if (directions.indexOf(tile) < 0)
            return tile;
        if (x > 0 && x < dungeon.width - 1 && y > 0 && y < dungeon.height - 1) {
            let xy = { x: 0, y: 0 };
            switch (tile) {
                case TemplateRoom_1.Direction.TOP:
                    xy.y = -1;
                    break;
                case TemplateRoom_1.Direction.BOTTOM:
                    xy.y = 1;
                    break;
                case TemplateRoom_1.Direction.LEFT:
                    xy.x = -1;
                    break;
                case TemplateRoom_1.Direction.RIGHT:
                    xy.x = 1;
                    break;
            }
            if (dungeon.tiles.get(x + xy.x, y + xy.y) === oppositeDirection(tile)) {
                return tile === TemplateRoom_1.Direction.BOTTOM ? TemplateRoom_1.Direction.BOTTOM : ETiles.EMPTY;
            }
            else {
                if (x > 1 && x < dungeon.width - 2 && y > 1 && y < dungeon.height - 2) {
                    let reach = dungeon.tiles.get(x + xy.x * 2, y + xy.y * 2);
                    if (reach === ETiles.EMPTY || reach === oppositeDirection(tile)) {
                        return tile === TemplateRoom_1.Direction.BOTTOM ? TemplateRoom_1.Direction.BOTTOM : ETiles.EMPTY;
                    }
                }
            }
        }
        return ETiles.WALL;
    });
    let ladderSeeds = [];
    for (let i = 0; i < dungeon.width - 1; i++) {
        for (let j = 0; j < dungeon.width - 1; j++) {
            if (dungeon.tiles.get(i, j) === ETiles.EMPTY && dungeon.tiles.get(i + 1, j) === ETiles.EMPTY) {
                let bl = dungeon.tiles.get(i, j + 1);
                let br = dungeon.tiles.get(i + 1, j + 1);
                if (bl === 1 && br === TemplateRoom_1.Direction.BOTTOM) {
                    ladderSeeds.push({ x: i + 1, y: j + 1 });
                }
                else if (bl === TemplateRoom_1.Direction.BOTTOM && br === ETiles.WALL) {
                    ladderSeeds.push({ x: i, y: j + 1 });
                }
            }
        }
    }
    ladderSeeds = fyShuffle(ladderSeeds, prng);
    function eraseBottomDoor(x, y) {
        if (dungeon.tiles.get(x, y) === TemplateRoom_1.Direction.BOTTOM) {
            dungeon.tiles.set(x, y, ETiles.EMPTY);
            eraseBottomDoor(x - 1, y);
            eraseBottomDoor(x + 1, y);
        }
    }
    while (ladderSeeds.length > 0) {
        let seed = ladderSeeds.pop();
        if (dungeon.tiles.get(seed.x, seed.y) !== TemplateRoom_1.Direction.BOTTOM)
            continue;
        while (dungeon.tiles.get(seed.x, seed.y) !== ETiles.WALL) {
            if (dungeon.tiles.get(seed.x, seed.y) === TemplateRoom_1.Direction.BOTTOM) {
                eraseBottomDoor(seed.x, seed.y);
            }
            dungeon.tiles.set(seed.x, seed.y, ETiles.LADDER);
            seed.y++;
        }
    }
    return dungeon.map((t) => t === ETiles.SOLID ? ETiles.WALL : t);
}
exports.DunGen = DunGen;
class Dungeon {
    constructor(width, height, seed, initializer = () => -1) {
        this.width = width;
        this.height = height;
        this.seed = seed;
        this.tiles = new Map2D_1.Map2D();
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                this.tiles.set(i, j, initializer(i, j));
            }
        }
    }
    paint(room, x, y) {
        if (x < 0 || y < 0 || x + room.width > this.width || y + room.height > this.height)
            return false;
        for (let i = 0; i < room.width; i++) {
            for (let j = 0; j < room.height; j++) {
                let tile = this.tiles.get(x + i, y + j);
                if (tile === undefined || tile !== ETiles.SOLID)
                    return false;
            }
        }
        for (let i = 0; i < room.width; i++) {
            for (let j = 0; j < room.height; j++) {
                this.tiles.set(x + i, y + j, room.tiles.get(i, j));
            }
        }
        return true;
    }
    map(fn) {
        return new Dungeon(this.width, this.height, this.seed, (x, y) => {
            return fn(this.tiles.get(x, y), x, y, this);
        });
    }
}
exports.Dungeon = Dungeon;
function fyShuffle(arr, prng) {
    arr = arr.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        let swp = Math.floor(prng() * (i + 1));
        let temp = arr[i];
        arr[i] = arr[swp];
        arr[swp] = temp;
    }
    return arr;
}
