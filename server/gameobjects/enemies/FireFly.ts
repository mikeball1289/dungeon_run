import { Enemy } from "../Enemy";
import { GameState } from "../../GameState";
import { IEnemyState } from "../../../common/types";

interface IFireFlyState extends IEnemyState {

}

export class FireFly extends Enemy<IFireFlyState> {

    public tag = "firefly";

    public update(state: GameState): FireFly {
        return this;
    }

    public serialize(): IFireFlyState {
        return {
            tag: this.tag,
            x: this.x,
            y: this.y,
        }
    }
}