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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV29ybGRNYXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbWFwL1dvcmxkTWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDhDQUE4QztBQUM5QyxvQ0FBb0M7QUFDcEMsOERBQThEO0FBQzlELDJDQUEyQztBQUMzQyxrQ0FBa0M7QUFFbEMsK0JBQStCO0FBQy9CLHlCQUF5QjtBQUV6QixpREFBaUQ7QUFFakQsa0dBQWtHO0FBQ2xHLG1CQUFtQjtBQUNuQiw2RUFBNkU7QUFDN0Usc0dBQXNHO0FBQ3RHLGdEQUFnRDtBQUNoRCxxREFBcUQ7QUFDckQsMERBQTBEO0FBQzFELDhEQUE4RDtBQUM5RCwwQ0FBMEM7QUFDMUMsMENBQTBDO0FBQzFDLDRDQUE0QztBQUM1QyxxQ0FBcUM7QUFDckMsZ0JBQWdCO0FBQ2hCLFlBQVk7QUFDWixvREFBb0Q7QUFDcEQsK0JBQStCO0FBQy9CLCtDQUErQztBQUMvQyxRQUFRO0FBRVIsa0NBQWtDO0FBQ2xDLG1DQUFtQztBQUVuQyxxQ0FBcUM7QUFDckMsNkJBQTZCO0FBQzdCLHdFQUF3RTtBQUN4RSwrQkFBK0I7QUFDL0IsMEJBQTBCO0FBQzFCLDZEQUE2RDtBQUM3RCwrREFBK0Q7QUFDL0QsMkRBQTJEO0FBQzNELGlFQUFpRTtBQUNqRSxxREFBcUQ7QUFDckQsNkhBQTZIO0FBQzdILHNDQUFzQztBQUN0Qyw4REFBOEQ7QUFDOUQsNkNBQTZDO0FBQzdDLCtCQUErQjtBQUMvQixpRUFBaUU7QUFDakUsOENBQThDO0FBQzlDLHdCQUF3QjtBQUN4Qiw4QkFBOEI7QUFDOUIsNENBQTRDO0FBQzVDLDZCQUE2QjtBQUM3QixvQkFBb0I7QUFDcEIsZ0JBQWdCO0FBQ2hCLFlBQVk7QUFFWixxQ0FBcUM7QUFDckMsNkJBQTZCO0FBQzdCLHdFQUF3RTtBQUN4RSwrQkFBK0I7QUFDL0IsMEJBQTBCO0FBQzFCLDZEQUE2RDtBQUM3RCwrREFBK0Q7QUFDL0QsMkRBQTJEO0FBQzNELGlFQUFpRTtBQUNqRSxxREFBcUQ7QUFDckQsNkhBQTZIO0FBQzdILHNDQUFzQztBQUN0QyxnRUFBZ0U7QUFDaEUsNkNBQTZDO0FBQzdDLCtCQUErQjtBQUMvQiwrREFBK0Q7QUFDL0QsOENBQThDO0FBQzlDLHdCQUF3QjtBQUN4Qiw4QkFBOEI7QUFDOUIsNENBQTRDO0FBQzVDLDZCQUE2QjtBQUM3QixvQkFBb0I7QUFDcEIsZ0JBQWdCO0FBQ2hCLFlBQVk7QUFFWiw2QkFBNkI7QUFDN0IsUUFBUTtBQUVSLGlEQUFpRDtBQUNqRCx1RUFBdUU7QUFDdkUsdURBQXVEO0FBQ3ZELDZEQUE2RDtBQUU3RCxzSUFBc0k7QUFDdEksUUFBUTtBQUVSLElBQUkiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgeyBEdW5nZW9uLCBFVGlsZXMgfSBmcm9tIFwiLi9EdW5HZW5cIjtcclxuLy8gaW1wb3J0IHsgV29ybGQgfSBmcm9tIFwiLi4vV29ybGRcIjtcclxuLy8gaW1wb3J0IHsgSVRpbGVQcm92aWRlciB9IGZyb20gXCIuLi9wcm92aWRlcnMvSVRpbGVQcm92aWRlclwiO1xyXG4vLyBpbXBvcnQgeyBBY3RvciB9IGZyb20gXCIuLi9hY3RvcnMvQWN0b3JcIjtcclxuLy8gaW1wb3J0IHsgcm9vdCB9IGZyb20gXCIuLi9yb290XCI7XHJcblxyXG4vLyBleHBvcnQgY29uc3QgVElMRV9TSVpFID0gMzI7XHJcbi8vIGNvbnN0IEVQU0lMT04gPSAwLjAwMTtcclxuXHJcbi8vIGV4cG9ydCBjbGFzcyBXb3JsZE1hcCBleHRlbmRzIFBJWEkuQ29udGFpbmVyIHtcclxuXHJcbi8vICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgd29ybGQ6IFdvcmxkLCBwdWJsaWMgZHVuZ2VvbjogRHVuZ2VvbiwgcHVibGljIHByb3ZpZGVyOiBJVGlsZVByb3ZpZGVyKSB7XHJcbi8vICAgICAgICAgc3VwZXIoKTtcclxuLy8gICAgICAgICBpZiAoIXByb3ZpZGVyLmlzUmVhZHkoKSkgdGhyb3cgbmV3IEVycm9yKFwiUHJvdmlkZXIgaXMgbm90IHJlYWR5XCIpO1xyXG4vLyAgICAgICAgIGxldCB0ZXggPSBQSVhJLlJlbmRlclRleHR1cmUuY3JlYXRlKGR1bmdlb24ud2lkdGggKiBUSUxFX1NJWkUsIGR1bmdlb24uaGVpZ2h0ICogVElMRV9TSVpFKTtcclxuLy8gICAgICAgICBsZXQgY29udGFpbmVyID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XHJcbi8vICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkdW5nZW9uLndpZHRoOyBpICsrKSB7XHJcbi8vICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZHVuZ2Vvbi5oZWlnaHQ7IGogKyspIHtcclxuLy8gICAgICAgICAgICAgICAgIGxldCB0aWxlID0gcHJvdmlkZXIuZ2V0VGlsZShkdW5nZW9uLCBpLCBqKTtcclxuLy8gICAgICAgICAgICAgICAgIHRpbGUueCA9IGkgKiBUSUxFX1NJWkU7XHJcbi8vICAgICAgICAgICAgICAgICB0aWxlLnkgPSBqICogVElMRV9TSVpFO1xyXG4vLyAgICAgICAgICAgICAgICAgY29udGFpbmVyLmFkZENoaWxkKHRpbGUpO1xyXG4vLyAgICAgICAgICAgICAgICAgLy8gdGlsZS5kZXN0cm95KCk7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcm9vdC5hcHAucmVuZGVyZXIucmVuZGVyKGNvbnRhaW5lciwgdGV4KTtcclxuLy8gICAgICAgICBjb250YWluZXIuZGVzdHJveSgpO1xyXG4vLyAgICAgICAgIHRoaXMuYWRkQ2hpbGQobmV3IFBJWEkuU3ByaXRlKHRleCkpO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIHB1YmxpYyBtb3ZlKGFjdG9yOiBBY3Rvcikge1xyXG4vLyAgICAgICAgIGxldCBjb2xsaXNpb25zID0gWzAsIDBdO1xyXG5cclxuLy8gICAgICAgICBsZXQgeHYgPSBhY3Rvci52ZWxvY2l0eS54O1xyXG4vLyAgICAgICAgIHdoaWxlICh4diAhPT0gMCkge1xyXG4vLyAgICAgICAgICAgICBsZXQgbW92ZSA9IE1hdGgubWF4KE1hdGgubWluKFRJTEVfU0laRSwgeHYpLCAtVElMRV9TSVpFKTtcclxuLy8gICAgICAgICAgICAgYWN0b3IueCArPSBtb3ZlO1xyXG4vLyAgICAgICAgICAgICB4diAtPSBtb3ZlO1xyXG4vLyAgICAgICAgICAgICBsZXQgbGVmdCA9IE1hdGguZmxvb3IoYWN0b3IubGVmdCAvIFRJTEVfU0laRSk7XHJcbi8vICAgICAgICAgICAgIGxldCByaWdodCA9IE1hdGguZmxvb3IoYWN0b3IucmlnaHQgLyBUSUxFX1NJWkUpO1xyXG4vLyAgICAgICAgICAgICBsZXQgdG9wID0gTWF0aC5mbG9vcihhY3Rvci50b3AgLyBUSUxFX1NJWkUpO1xyXG4vLyAgICAgICAgICAgICBsZXQgYm90dG9tID0gTWF0aC5mbG9vcihhY3Rvci5ib3R0b20gLyBUSUxFX1NJWkUpO1xyXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBpID0gdG9wOyBpIDw9IGJvdHRvbTsgaSArKykge1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZHVuZ2Vvbi50aWxlcy5nZXQobGVmdCwgaSkgPT09IEVUaWxlcy5XQUxMIHx8IHRoaXMuZHVuZ2Vvbi50aWxlcy5nZXQocmlnaHQsIGkpID09PSBFVGlsZXMuV0FMTCkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIGlmIChtb3ZlID4gMCkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rvci5yaWdodCA9IHJpZ2h0ICogMzIgLSBFUFNJTE9OO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsaXNpb25zWzBdID0gMTtcclxuLy8gICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rvci5sZWZ0ID0gbGVmdCAqIDMyICsgMzIgKyBFUFNJTE9OO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsaXNpb25zWzBdID0gLTE7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgICAgIHh2ID0gMDtcclxuLy8gICAgICAgICAgICAgICAgICAgICBhY3Rvci52ZWxvY2l0eS54ID0gMDtcclxuLy8gICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH1cclxuICAgICAgICBcclxuLy8gICAgICAgICBsZXQgeXYgPSBhY3Rvci52ZWxvY2l0eS55O1xyXG4vLyAgICAgICAgIHdoaWxlICh5diAhPT0gMCkge1xyXG4vLyAgICAgICAgICAgICBsZXQgbW92ZSA9IE1hdGgubWF4KE1hdGgubWluKFRJTEVfU0laRSwgeXYpLCAtVElMRV9TSVpFKTtcclxuLy8gICAgICAgICAgICAgYWN0b3IueSArPSBtb3ZlO1xyXG4vLyAgICAgICAgICAgICB5diAtPSBtb3ZlO1xyXG4vLyAgICAgICAgICAgICBsZXQgbGVmdCA9IE1hdGguZmxvb3IoYWN0b3IubGVmdCAvIFRJTEVfU0laRSk7XHJcbi8vICAgICAgICAgICAgIGxldCByaWdodCA9IE1hdGguZmxvb3IoYWN0b3IucmlnaHQgLyBUSUxFX1NJWkUpO1xyXG4vLyAgICAgICAgICAgICBsZXQgdG9wID0gTWF0aC5mbG9vcihhY3Rvci50b3AgLyBUSUxFX1NJWkUpO1xyXG4vLyAgICAgICAgICAgICBsZXQgYm90dG9tID0gTWF0aC5mbG9vcihhY3Rvci5ib3R0b20gLyBUSUxFX1NJWkUpO1xyXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBpID0gbGVmdDsgaSA8PSByaWdodDsgaSArKykge1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZHVuZ2Vvbi50aWxlcy5nZXQoaSwgdG9wKSA9PT0gRVRpbGVzLldBTEwgfHwgdGhpcy5kdW5nZW9uLnRpbGVzLmdldChpLCBib3R0b20pID09PSBFVGlsZXMuV0FMTCkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIGlmIChtb3ZlID4gMCkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rvci5ib3R0b20gPSBib3R0b20gKiAzMiAtIEVQU0lMT047XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxpc2lvbnNbMV0gPSAxO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGFjdG9yLnRvcCA9IHRvcCAqIDMyICsgMzIgKyBFUFNJTE9OO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsaXNpb25zWzFdID0gLTE7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgICAgIHl2ID0gMDtcclxuLy8gICAgICAgICAgICAgICAgICAgICBhY3Rvci52ZWxvY2l0eS55ID0gMDtcclxuLy8gICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH1cclxuICAgICAgICBcclxuLy8gICAgICAgICByZXR1cm4gY29sbGlzaW9ucztcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBwdWJsaWMgaXNPbkxhZGRlcihhY3RvcjogQWN0b3IpOiBib29sZWFuIHtcclxuLy8gICAgICAgICBsZXQgY2VudGVyID0gTWF0aC5mbG9vcihhY3Rvci5ob3Jpem9udGFsQ2VudGVyIC8gVElMRV9TSVpFKTtcclxuLy8gICAgICAgICBsZXQgdG9wID0gTWF0aC5mbG9vcihhY3Rvci50b3AgLyBUSUxFX1NJWkUpO1xyXG4vLyAgICAgICAgIGxldCBib3R0b20gPSBNYXRoLmZsb29yKGFjdG9yLmJvdHRvbSAvIFRJTEVfU0laRSk7XHJcblxyXG4vLyAgICAgICAgIHJldHVybiAodGhpcy5kdW5nZW9uLnRpbGVzLmdldChjZW50ZXIsIHRvcCkgPT09IEVUaWxlcy5MQURERVIgfHwgdGhpcy5kdW5nZW9uLnRpbGVzLmdldChjZW50ZXIsIGJvdHRvbSkgPT09IEVUaWxlcy5MQURERVIpO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gfSJdfQ==