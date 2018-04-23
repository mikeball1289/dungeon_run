import { Dungeon } from "../../../common/DunGen";
import { IProvider } from "./IProvider";

export interface ITileProvider extends IProvider {
    textureSheet: PIXI.Texture;
    getTile(dungeon: Dungeon, x: number, y: number): PIXI.Sprite;
}