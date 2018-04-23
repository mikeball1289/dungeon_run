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