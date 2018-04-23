// import { Actor } from "./Actor";
// import { World } from "../World";
// import { keyboard } from "../root";
// import * as Key from "../Key";
// import { TILE_SIZE } from "../map/WorldMap";
// export class Player extends Actor {
//     public climbing: boolean = false;
//     public grounded: boolean = false;
//     constructor(public world: World) {
//         super(28, 28);
//         let box = new PIXI.Graphics();
//         box.beginFill(0x0000FF);
//         box.drawRect(0, 0, 28, 28);
//         box.endFill();
//         this.sprite = box;
//     }
//     public update() {
//         if (this.grounded) this.climbing = false;
//         if (!this.climbing) {
//             this.velocity.y += 0.78;
//             if (keyboard.isKeyDown(Key.SPACE) && this.grounded) {
//                 this.velocity.y = -12;
//             }
//             if (keyboard.isKeyDown(Key.LEFT)) {
//                 this.velocity.x = -5;
//             } else if (keyboard.isKeyDown(Key.RIGHT)) {
//                 this.velocity.x = 5;
//             } else {
//                 this.velocity.x = 0;
//             }
//             if (keyboard.isKeyDown(Key.UP) && this.world.map.isOnLadder(this)) {
//                 this.velocity.x = 0;
//                 this.velocity.y = 0;
//                 this.climbing = true;
//                 this.horizontalCenter = Math.floor(this.horizontalCenter / TILE_SIZE) * TILE_SIZE + TILE_SIZE / 2;
//             }
//         }
//         if (this.climbing) {
//             if (!this.world.map.isOnLadder(this)) {
//                 this.climbing = false;
//             }
//             if (keyboard.isKeyDown(Key.UP)) {
//                 this.velocity.y = -5;
//             } else if (keyboard.isKeyDown(Key.DOWN)) {
//                 this.velocity.y = 5;
//             } else {
//                 this.velocity.y = 0;
//             }
//             if (keyboard.isKeyDown(Key.SPACE)) {
//                 if (keyboard.isKeyDown(Key.DOWN)) {
//                     this.velocity.y = 0;
//                 } else {
//                     if (!keyboard.isKeyDown(Key.UP)) {
//                         this.velocity.y = -8;
//                     }
//                 }
//                 this.climbing = false;
//             }
//             if (this.grounded) {
//                 this.climbing = false;
//             }
//         }
//         let collisions = this.world.map.move(this);
//         this.grounded = collisions[1] === 1;
//     }
// } 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGxheWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FjdG9ycy9QbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsbUNBQW1DO0FBQ25DLG9DQUFvQztBQUNwQyxzQ0FBc0M7QUFDdEMsaUNBQWlDO0FBQ2pDLCtDQUErQztBQUUvQyxzQ0FBc0M7QUFFdEMsd0NBQXdDO0FBQ3hDLHdDQUF3QztBQUV4Qyx5Q0FBeUM7QUFDekMseUJBQXlCO0FBQ3pCLHlDQUF5QztBQUN6QyxtQ0FBbUM7QUFDbkMsc0NBQXNDO0FBQ3RDLHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFDN0IsUUFBUTtBQUVSLHdCQUF3QjtBQUN4QixvREFBb0Q7QUFFcEQsZ0NBQWdDO0FBQ2hDLHVDQUF1QztBQUV2QyxvRUFBb0U7QUFDcEUseUNBQXlDO0FBQ3pDLGdCQUFnQjtBQUNoQixrREFBa0Q7QUFDbEQsd0NBQXdDO0FBQ3hDLDBEQUEwRDtBQUMxRCx1Q0FBdUM7QUFDdkMsdUJBQXVCO0FBQ3ZCLHVDQUF1QztBQUN2QyxnQkFBZ0I7QUFDaEIsbUZBQW1GO0FBQ25GLHVDQUF1QztBQUN2Qyx1Q0FBdUM7QUFDdkMsd0NBQXdDO0FBQ3hDLHFIQUFxSDtBQUNySCxnQkFBZ0I7QUFDaEIsWUFBWTtBQUVaLCtCQUErQjtBQUMvQixzREFBc0Q7QUFDdEQseUNBQXlDO0FBQ3pDLGdCQUFnQjtBQUNoQixnREFBZ0Q7QUFDaEQsd0NBQXdDO0FBQ3hDLHlEQUF5RDtBQUN6RCx1Q0FBdUM7QUFDdkMsdUJBQXVCO0FBQ3ZCLHVDQUF1QztBQUN2QyxnQkFBZ0I7QUFDaEIsbURBQW1EO0FBQ25ELHNEQUFzRDtBQUN0RCwyQ0FBMkM7QUFDM0MsMkJBQTJCO0FBQzNCLHlEQUF5RDtBQUN6RCxnREFBZ0Q7QUFDaEQsd0JBQXdCO0FBQ3hCLG9CQUFvQjtBQUNwQix5Q0FBeUM7QUFDekMsZ0JBQWdCO0FBQ2hCLG1DQUFtQztBQUNuQyx5Q0FBeUM7QUFDekMsZ0JBQWdCO0FBQ2hCLFlBQVk7QUFFWixzREFBc0Q7QUFDdEQsK0NBQStDO0FBQy9DLFFBQVE7QUFDUixJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IHsgQWN0b3IgfSBmcm9tIFwiLi9BY3RvclwiO1xyXG4vLyBpbXBvcnQgeyBXb3JsZCB9IGZyb20gXCIuLi9Xb3JsZFwiO1xyXG4vLyBpbXBvcnQgeyBrZXlib2FyZCB9IGZyb20gXCIuLi9yb290XCI7XHJcbi8vIGltcG9ydCAqIGFzIEtleSBmcm9tIFwiLi4vS2V5XCI7XHJcbi8vIGltcG9ydCB7IFRJTEVfU0laRSB9IGZyb20gXCIuLi9tYXAvV29ybGRNYXBcIjtcclxuXHJcbi8vIGV4cG9ydCBjbGFzcyBQbGF5ZXIgZXh0ZW5kcyBBY3RvciB7XHJcbiAgICBcclxuLy8gICAgIHB1YmxpYyBjbGltYmluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4vLyAgICAgcHVibGljIGdyb3VuZGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4vLyAgICAgY29uc3RydWN0b3IocHVibGljIHdvcmxkOiBXb3JsZCkge1xyXG4vLyAgICAgICAgIHN1cGVyKDI4LCAyOCk7XHJcbi8vICAgICAgICAgbGV0IGJveCA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XHJcbi8vICAgICAgICAgYm94LmJlZ2luRmlsbCgweDAwMDBGRik7XHJcbi8vICAgICAgICAgYm94LmRyYXdSZWN0KDAsIDAsIDI4LCAyOCk7XHJcbi8vICAgICAgICAgYm94LmVuZEZpbGwoKTtcclxuLy8gICAgICAgICB0aGlzLnNwcml0ZSA9IGJveDtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBwdWJsaWMgdXBkYXRlKCkge1xyXG4vLyAgICAgICAgIGlmICh0aGlzLmdyb3VuZGVkKSB0aGlzLmNsaW1iaW5nID0gZmFsc2U7XHJcblxyXG4vLyAgICAgICAgIGlmICghdGhpcy5jbGltYmluZykge1xyXG4vLyAgICAgICAgICAgICB0aGlzLnZlbG9jaXR5LnkgKz0gMC43ODtcclxuICAgICAgICAgICAgXHJcbi8vICAgICAgICAgICAgIGlmIChrZXlib2FyZC5pc0tleURvd24oS2V5LlNQQUNFKSAmJiB0aGlzLmdyb3VuZGVkKSB7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLnZlbG9jaXR5LnkgPSAtMTI7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgaWYgKGtleWJvYXJkLmlzS2V5RG93bihLZXkuTEVGVCkpIHtcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMudmVsb2NpdHkueCA9IC01O1xyXG4vLyAgICAgICAgICAgICB9IGVsc2UgaWYgKGtleWJvYXJkLmlzS2V5RG93bihLZXkuUklHSFQpKSB7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLnZlbG9jaXR5LnggPSA1O1xyXG4vLyAgICAgICAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy52ZWxvY2l0eS54ID0gMDtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICBpZiAoa2V5Ym9hcmQuaXNLZXlEb3duKEtleS5VUCkgJiYgdGhpcy53b3JsZC5tYXAuaXNPbkxhZGRlcih0aGlzKSkge1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy52ZWxvY2l0eS54ID0gMDtcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMudmVsb2NpdHkueSA9IDA7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLmNsaW1iaW5nID0gdHJ1ZTtcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuaG9yaXpvbnRhbENlbnRlciA9IE1hdGguZmxvb3IodGhpcy5ob3Jpem9udGFsQ2VudGVyIC8gVElMRV9TSVpFKSAqIFRJTEVfU0laRSArIFRJTEVfU0laRSAvIDI7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIGlmICh0aGlzLmNsaW1iaW5nKSB7XHJcbi8vICAgICAgICAgICAgIGlmICghdGhpcy53b3JsZC5tYXAuaXNPbkxhZGRlcih0aGlzKSkge1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5jbGltYmluZyA9IGZhbHNlO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIGlmIChrZXlib2FyZC5pc0tleURvd24oS2V5LlVQKSkge1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy52ZWxvY2l0eS55ID0gLTU7XHJcbi8vICAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5Ym9hcmQuaXNLZXlEb3duKEtleS5ET1dOKSkge1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy52ZWxvY2l0eS55ID0gNTtcclxuLy8gICAgICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMudmVsb2NpdHkueSA9IDA7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgaWYgKGtleWJvYXJkLmlzS2V5RG93bihLZXkuU1BBQ0UpKSB7XHJcbi8vICAgICAgICAgICAgICAgICBpZiAoa2V5Ym9hcmQuaXNLZXlEb3duKEtleS5ET1dOKSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHRoaXMudmVsb2NpdHkueSA9IDA7XHJcbi8vICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIGlmICgha2V5Ym9hcmQuaXNLZXlEb3duKEtleS5VUCkpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52ZWxvY2l0eS55ID0gLTg7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5jbGltYmluZyA9IGZhbHNlO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIGlmICh0aGlzLmdyb3VuZGVkKSB7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLmNsaW1iaW5nID0gZmFsc2U7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9XHJcbiAgICAgICAgXHJcbi8vICAgICAgICAgbGV0IGNvbGxpc2lvbnMgPSB0aGlzLndvcmxkLm1hcC5tb3ZlKHRoaXMpO1xyXG4vLyAgICAgICAgIHRoaXMuZ3JvdW5kZWQgPSBjb2xsaXNpb25zWzFdID09PSAxO1xyXG4vLyAgICAgfVxyXG4vLyB9Il19