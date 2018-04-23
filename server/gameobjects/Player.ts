import { DynamicObject } from "../DynamicObject"
import { GameState } from "../GameState";
import { ControlPack } from "../ControlPack";
import { Actor } from "./Actor";

export class Player extends Actor implements DynamicObject<GameState, ControlPack> {
    public tag = "player";

    public update(state: GameState, controls: ControlPack) {
        return new Player();
    }
}