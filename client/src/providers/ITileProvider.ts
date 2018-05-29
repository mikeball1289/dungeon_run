import { Dungeon } from "../../../common/DunGen";
import { IProvider } from "./IProvider";

// generic tile provider methods
export interface ITileProvider extends IProvider {
    textureSheet: PIXI.Texture;
    getTile(dungeon: Dungeon, x: number, y: number): PIXI.Sprite;
}