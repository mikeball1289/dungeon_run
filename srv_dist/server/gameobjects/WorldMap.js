"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DunGen_1 = require("../../common/DunGen");
exports.TILE_SIZE = 32;
const EPSILON = 0.001;
class WorldMap {
    constructor(dungeon) {
        this.dungeon = dungeon;
    }
    move(actor) {
        let collisions = [0, 0];
        let position = actor.position.copy();
        let velocity = actor.velocity.copy();
        let xv = velocity.x;
        while (xv !== 0) {
            let move = Math.max(Math.min(exports.TILE_SIZE, xv), -exports.TILE_SIZE);
            position.x += move;
            xv -= move;
            let left = Math.floor(position.x / exports.TILE_SIZE);
            let right = Math.floor((position.x + actor.width) / exports.TILE_SIZE);
            let top = Math.floor(position.y / exports.TILE_SIZE);
            let bottom = Math.floor((position.y + actor.height) / exports.TILE_SIZE);
            for (let i = top; i <= bottom; i++) {
                if (this.dungeon.tiles.get(left, i) === DunGen_1.ETiles.WALL || this.dungeon.tiles.get(right, i) === DunGen_1.ETiles.WALL) {
                    if (move > 0) {
                        position.x = right * 32 - EPSILON - actor.width;
                        collisions[0] = 1;
                    }
                    else {
                        position.x = left * 32 + 32 + EPSILON;
                        collisions[0] = -1;
                    }
                    xv = 0;
                    break;
                }
            }
        }
        let yv = velocity.y;
        while (yv !== 0) {
            let move = Math.max(Math.min(exports.TILE_SIZE, yv), -exports.TILE_SIZE);
            position.y += move;
            yv -= move;
            let left = Math.floor(position.x / exports.TILE_SIZE);
            let right = Math.floor((position.x + actor.width) / exports.TILE_SIZE);
            let top = Math.floor(position.y / exports.TILE_SIZE);
            let bottom = Math.floor((position.y + actor.height) / exports.TILE_SIZE);
            for (let i = left; i <= right; i++) {
                if (this.dungeon.tiles.get(i, top) === DunGen_1.ETiles.WALL || this.dungeon.tiles.get(i, bottom) === DunGen_1.ETiles.WALL) {
                    if (move > 0) {
                        position.y = bottom * 32 - EPSILON - actor.height;
                        collisions[1] = 1;
                    }
                    else {
                        position.y = top * 32 + 32 + EPSILON;
                        collisions[1] = -1;
                    }
                    yv = 0;
                    break;
                }
            }
        }
        return {
            position,
            collisions,
        };
    }
    isOnLadder(actor) {
        let center = Math.floor(actor.horizontalCenter / exports.TILE_SIZE);
        let top = Math.floor(actor.top / exports.TILE_SIZE);
        let bottom = Math.floor(actor.bottom / exports.TILE_SIZE);
        return (this.dungeon.tiles.get(center, top) === DunGen_1.ETiles.LADDER || this.dungeon.tiles.get(center, bottom) === DunGen_1.ETiles.LADDER);
    }
}
exports.WorldMap = WorldMap;
