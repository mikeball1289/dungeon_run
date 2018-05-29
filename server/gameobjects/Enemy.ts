import { Actor } from "./Actor";
import { IEnemyState } from "../../common/types";
import { DynamicObject } from "../DynamicObject";
import { GameState } from "../GameState";
import * as uuid from "uuid/v1";

export abstract class Enemy<State extends IEnemyState> extends Actor<State> implements DynamicObject<GameState> {
    public tag = "enemy";
    public id = uuid();

    constructor() {
        super();
    }

    abstract update(state: GameState): Enemy<State>;
}