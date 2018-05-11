import { DynamicObject } from "../DynamicObject"
import { GameState } from "../GameState";
import { ControlPack } from "../ControlPack";
import { Actor } from "./Actor";
import { TILE_SIZE } from "./WorldMap";
import { Point } from "../core/Point";
import { ENGINE_METHOD_ECDH } from "constants";

export class Player extends Actor implements DynamicObject<GameState, ControlPack> {
    public tag = "player";
    public grounded = false;
    public climbing = true;

    public update(state: GameState, controls: ControlPack) {
        if (this.grounded) this.climbing = false;

        if (!this.climbing) {
            this.velocity.y += 0.78;
            
            if (controls.jump && this.grounded) {
                this.velocity.y = -12;
            }
            if (controls.left) {
                this.velocity.x = -5;
            } else if (controls.right) {
                this.velocity.x = 5;
            } else {
                this.velocity.x = 0;
            }
            if (controls.up && state.world.isOnLadder(this)) {
                this.velocity.x = 0;
                this.velocity.y = 0;
                this.climbing = true;
                this.horizontalCenter = Math.floor(this.horizontalCenter / TILE_SIZE) * TILE_SIZE + TILE_SIZE / 2;
            }
        }

        if (this.climbing) {
            this.climbingUpdate(state, controls);
        }
        
        let move = state.world.move(this);
        this.grounded = move.collisions[1] === 1;
        if (move.collisions[0] !== 0) {
            this.velocity.x = 0;
        }
        if (move.collisions[1] !== 0) {
            this.velocity.y = 0;
        }
        let oldPosition = this.position;
        this.position = move.position.offset(this.width / 2, this.height);
        if (this.climbing && !state.world.isOnLadder(this) && this.velocity.y < 0) {
            if (!controls.left && !controls.right) {
                this.position = new Point(oldPosition.x, Math.floor(oldPosition.y / TILE_SIZE) * TILE_SIZE + 1);
            } else {
                this.position = new Point(this.position.x, Math.ceil(this.position.y / TILE_SIZE) * TILE_SIZE - 1);
                this.velocity.y = -8.5;
                this.climbing = false;
            }
        }
        return this;
    }

    private climbingUpdate(state: GameState, controls: ControlPack) {
        if (!state.world.isOnLadder(this)) {
            this.climbing = false;
        }
        if (controls.up) {
            this.velocity.y = -5;
        } else if (controls.down) {
            this.velocity.y = 5;
        } else {
            this.velocity.y = 0;
        }
        if (controls.jump) {
            if (controls.down) {
                this.velocity.y = 0;
            } else {
                if (!controls.up) {
                    this.velocity.y = -8;
                }
            }
            this.climbing = false;
        }
        if (this.grounded) {
            this.climbing = false;
        }
    }
}