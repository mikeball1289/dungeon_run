import { Dungeon, ETiles } from "../../common/DunGen";
import { Actor } from "./Actor";
import { Point } from "../core/Point";

export const TILE_SIZE = 32;
const EPSILON = 0.001;

export class WorldMap {

    constructor(public dungeon: Dungeon) {

    }

    public move(actor: Actor): { position: Point, collisions: [number, number] } {
        let collisions: [number, number] = [0, 0];

        let position = new Point(actor.left, actor.top);
        let velocity = actor.velocity.copy();
        let xv = velocity.x;
        while (xv !== 0) {
            let move = Math.max(Math.min(TILE_SIZE, xv), -TILE_SIZE);
            position.x += move;
            xv -= move;
            let left = Math.floor(position.x / TILE_SIZE);
            let right = Math.floor((position.x + actor.width) / TILE_SIZE);
            let top = Math.floor(position.y / TILE_SIZE);
            let bottom = Math.floor((position.y + actor.height) / TILE_SIZE);
            for (let i = top; i <= bottom; i ++) {
                if (this.dungeon.tiles.get(left, i) === ETiles.WALL || this.dungeon.tiles.get(right, i) === ETiles.WALL) {
                    if (move > 0) {
                        position.x = right * 32 - EPSILON - actor.width;
                        collisions[0] = 1;
                    } else {
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
            let move = Math.max(Math.min(TILE_SIZE, yv), -TILE_SIZE);
            position.y += move;
            yv -= move;
            let left = Math.floor(position.x / TILE_SIZE);
            let right = Math.floor((position.x + actor.width) / TILE_SIZE);
            let top = Math.floor(position.y / TILE_SIZE);
            let bottom = Math.floor((position.y + actor.height) / TILE_SIZE);
            for (let i = left; i <= right; i ++) {
                if (this.dungeon.tiles.get(i, top) === ETiles.WALL || this.dungeon.tiles.get(i, bottom) === ETiles.WALL) {
                    if (move > 0) {
                        position.y = bottom * 32 - EPSILON - actor.height;
                        collisions[1] = 1;
                    } else {
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

    public isOnLadder(actor: Actor): boolean {
        let center = Math.floor(actor.horizontalCenter / TILE_SIZE);
        let top = Math.floor(actor.top / TILE_SIZE);
        let bottom = Math.floor(actor.bottom / TILE_SIZE);

        return (this.dungeon.tiles.get(center, top) === ETiles.LADDER || this.dungeon.tiles.get(center, bottom) === ETiles.LADDER);
    }

}