// import { Dungeon, ETiles } from "./DunGen";
// import { World } from "../World";
// import { ITileProvider } from "../providers/ITileProvider";
// import { Actor } from "../actors/Actor";
// import { root } from "../root";

// export const TILE_SIZE = 32;
// const EPSILON = 0.001;

// export class WorldMap extends PIXI.Container {

//     constructor(public world: World, public dungeon: Dungeon, public provider: ITileProvider) {
//         super();
//         if (!provider.isReady()) throw new Error("Provider is not ready");
//         let tex = PIXI.RenderTexture.create(dungeon.width * TILE_SIZE, dungeon.height * TILE_SIZE);
//         let container = new PIXI.Container();
//         for (let i = 0; i < dungeon.width; i ++) {
//             for (let j = 0; j < dungeon.height; j ++) {
//                 let tile = provider.getTile(dungeon, i, j);
//                 tile.x = i * TILE_SIZE;
//                 tile.y = j * TILE_SIZE;
//                 container.addChild(tile);
//                 // tile.destroy();
//             }
//         }
//         root.app.renderer.render(container, tex);
//         container.destroy();
//         this.addChild(new PIXI.Sprite(tex));
//     }

//     public move(actor: Actor) {
//         let collisions = [0, 0];

//         let xv = actor.velocity.x;
//         while (xv !== 0) {
//             let move = Math.max(Math.min(TILE_SIZE, xv), -TILE_SIZE);
//             actor.x += move;
//             xv -= move;
//             let left = Math.floor(actor.left / TILE_SIZE);
//             let right = Math.floor(actor.right / TILE_SIZE);
//             let top = Math.floor(actor.top / TILE_SIZE);
//             let bottom = Math.floor(actor.bottom / TILE_SIZE);
//             for (let i = top; i <= bottom; i ++) {
//                 if (this.dungeon.tiles.get(left, i) === ETiles.WALL || this.dungeon.tiles.get(right, i) === ETiles.WALL) {
//                     if (move > 0) {
//                         actor.right = right * 32 - EPSILON;
//                         collisions[0] = 1;
//                     } else {
//                         actor.left = left * 32 + 32 + EPSILON;
//                         collisions[0] = -1;
//                     }
//                     xv = 0;
//                     actor.velocity.x = 0;
//                     break;
//                 }
//             }
//         }
        
//         let yv = actor.velocity.y;
//         while (yv !== 0) {
//             let move = Math.max(Math.min(TILE_SIZE, yv), -TILE_SIZE);
//             actor.y += move;
//             yv -= move;
//             let left = Math.floor(actor.left / TILE_SIZE);
//             let right = Math.floor(actor.right / TILE_SIZE);
//             let top = Math.floor(actor.top / TILE_SIZE);
//             let bottom = Math.floor(actor.bottom / TILE_SIZE);
//             for (let i = left; i <= right; i ++) {
//                 if (this.dungeon.tiles.get(i, top) === ETiles.WALL || this.dungeon.tiles.get(i, bottom) === ETiles.WALL) {
//                     if (move > 0) {
//                         actor.bottom = bottom * 32 - EPSILON;
//                         collisions[1] = 1;
//                     } else {
//                         actor.top = top * 32 + 32 + EPSILON;
//                         collisions[1] = -1;
//                     }
//                     yv = 0;
//                     actor.velocity.y = 0;
//                     break;
//                 }
//             }
//         }
        
//         return collisions;
//     }

//     public isOnLadder(actor: Actor): boolean {
//         let center = Math.floor(actor.horizontalCenter / TILE_SIZE);
//         let top = Math.floor(actor.top / TILE_SIZE);
//         let bottom = Math.floor(actor.bottom / TILE_SIZE);

//         return (this.dungeon.tiles.get(center, top) === ETiles.LADDER || this.dungeon.tiles.get(center, bottom) === ETiles.LADDER);
//     }

// }