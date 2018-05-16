import { DynamicObject } from "../DynamicObject"
import { GameState, emptyControls } from "../GameState";
import { ControlPack } from "../ControlPack";
import { Actor } from "./Actor";
import { TILE_SIZE } from "./WorldMap";
import { Point } from "../core/Point";
import { ENGINE_METHOD_ECDH } from "constants";
import { EMovingDirection, IPlayerState } from "../../common/types";

const GRAVITY = 0.16;
const WALK_IMPULSE = 1.5;
const JUMP_POWER = 3.9;
const CLIMB_SPEED = 1.5;

export class Player extends Actor<IPlayerState> implements DynamicObject<GameState, ControlPack> {
    public tag = "player";
    public grounded = false;
    public climbing = true;
    public moving = EMovingDirection.NONE;
    public hasDoubleJump = true;
    public previousControls = emptyControls;

    public update(state: GameState, controls: ControlPack) {
        if (this.grounded) this.climbing = false;
        if (this.grounded || this.climbing) this.hasDoubleJump = true;

        if (!this.climbing) {
            this.velocity.y += GRAVITY;
            
            if ((controls.jump && !this.previousControls.jump) && (this.grounded || this.hasDoubleJump)) {
                if (!this.grounded) {
                    this.hasDoubleJump = false;
                }
                this.velocity.y = -JUMP_POWER;
            }
            if (controls.left) {
                this.velocity.x = -WALK_IMPULSE;
                this.moving = EMovingDirection.LEFT;
            } else if (controls.right) {
                this.velocity.x = WALK_IMPULSE;
                this.moving = EMovingDirection.RIGHT;
            } else {
                this.velocity.x = 0;
                this.moving = EMovingDirection.NONE;
            }
            if (controls.up && state.world.isOnLadder(this)) {
                this.velocity.x = 0;
                this.velocity.y = 0;
                this.climbing = true;
                this.horizontalCenter = Math.floor(this.horizontalCenter / TILE_SIZE) * TILE_SIZE + TILE_SIZE / 2;
            }
        }

        if (this.climbing) {
            this.moving = EMovingDirection.NONE;
            this.climbingUpdate(state, controls);
        }
        
        let move = state.world.move(this);
        this.grounded = move.collisions[1] === 1;
        if (move.collisions[0] !== 0) {
            this.velocity.x = 0;
            this.moving = EMovingDirection.NONE;
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
                this.velocity.y = -JUMP_POWER * 0.8;
                this.climbing = false;
            }
        }
        this.previousControls = controls;
        return this;
    }

    private climbingUpdate(state: GameState, controls: ControlPack) {
        if (!state.world.isOnLadder(this)) {
            this.climbing = false;
        }
        if (controls.up) {
            this.velocity.y = -CLIMB_SPEED;
        } else if (controls.down) {
            this.velocity.y = CLIMB_SPEED;
        } else {
            this.velocity.y = 0;
        }
        if (controls.jump) {
            if (controls.down) {
                this.velocity.y = 0;
            } else {
                if (!controls.up) {
                    this.velocity.y = -JUMP_POWER * 0.9;
                }
            }
            this.climbing = false;
        }
        if (this.grounded) {
            this.climbing = false;
        }
    }

    public serialize() {
        return {
            x: this.x,
            y: this.y,
            moving: this.moving,
        }
    }
}