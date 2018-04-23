import { Dungeon, ETiles } from "../../../common/DunGen";
import { ITileProvider } from "./ITileProvider";
import { staticImplements } from "./Decorator";

@staticImplements<ITileProvider>()
export class ClassicTileProvider {

    public static textureSheet: PIXI.Texture;

    public static ready(): Promise<void> {
        let p = new Promise<void>( (resolve, reject) => {
            if (!this.textureSheet) {
                PIXI.loader.add("tiles", "img/tiles_001.png");
                PIXI.loader.load();
                PIXI.loader.once("complete", () => {
                    this.textureSheet = PIXI.loader.resources["tiles"].texture;
                    resolve();
                } );
            } else {
                resolve();
            }
        } );
        return p;
    }

    public static isReady() {
        return this.textureSheet !== undefined;
    }

    public static getTile(dungeon: Dungeon, x: number, y: number) {
        let texX = 0;
        let texY = 0;
        let tile = dungeon.tiles.get(x, y);
        if (tile === ETiles.EMPTY) {
            texX = 5;
            texY = 1;
        } else if (tile === ETiles.LADDER) {
            texX = 5;
            texY = 2;
        } else if (tile === ETiles.WALL) {
            let solidTop = y === 0 || dungeon.tiles.get(x, y - 1) === ETiles.WALL;
            let solidBottom = y === dungeon.height - 1 || dungeon.tiles.get(x, y + 1) === ETiles.WALL;
            let solidLeft = x === 0 || dungeon.tiles.get(x - 1, y) === ETiles.WALL;
            let solidRight = x === dungeon.width - 1 || dungeon.tiles.get(x + 1, y) === ETiles.WALL;
            if (solidTop && solidBottom && solidLeft && solidRight) {
                let solidTopLeft = y === 0 || x === 0 || dungeon.tiles.get(x - 1, y - 1) === ETiles.WALL;
                let solidTopRight = y === 0 || x === dungeon.width - 1 || dungeon.tiles.get(x + 1, y - 1) === ETiles.WALL;
                let solidBottomLeft = y === dungeon.height - 1 || x === 0 || dungeon.tiles.get(x - 1, y + 1) === ETiles.WALL;
                let solidBottomRight = y === dungeon.height - 1 || x === dungeon.width - 1 || dungeon.tiles.get(x + 1, y + 1) === ETiles.WALL;
                if (!solidTopLeft) {
                    texX = 3;
                    texY = 1;
                } else if (!solidTopRight) {
                    texX = 4;
                    texY = 1;
                } else if (!solidBottomLeft) {
                    texX = 3;
                    texY = 2;
                } else if (!solidBottomRight) {
                    texX = 4;
                    texY = 2;
                } else {
                    texX = 1;
                    texY = 1;
                }
            } else if (!solidLeft && solidRight && solidBottom && !solidTop) {
                texX = 0;
                texY = 0;
            } else if (solidLeft && solidRight && solidBottom && !solidTop) {
                texX = 1;
                texY = 0;
            } else if (solidLeft && !solidRight && solidBottom && !solidTop) {
                texX = 2;
                texY = 0;
            } else if (!solidLeft && solidRight && solidBottom && solidTop) {
                texX = 0;
                texY = 1;
            } else if (solidLeft && !solidRight && solidBottom && solidTop) {
                texX = 2;
                texY = 1;
            } else if (!solidLeft && solidRight && !solidBottom && solidTop) {
                texX = 0;
                texY = 2;
            } else if (solidLeft && solidRight && !solidBottom && solidTop) {
                texX = 1;
                texY = 2;
            } else if (solidLeft && !solidRight && !solidBottom && solidTop) {
                texX = 2;
                texY = 2;
            } else if (!solidLeft && solidRight && !solidBottom && !solidTop) {
                texX = 3;
                texY = 0;
            } else if (solidLeft && solidRight && !solidBottom && !solidTop) {
                texX = 4;
                texY = 0;
            } else if (solidLeft && !solidRight && !solidBottom && !solidTop) {
                texX = 5;
                texY = 0;
            } else if (!solidLeft && !solidRight && solidBottom && !solidTop) {
                texX = 6;
                texY = 0;
            } else if (!solidLeft && !solidRight && solidBottom && solidTop) {
                texX = 6;
                texY = 1;
            } else if (!solidLeft && !solidRight && !solidBottom && solidTop) {
                texX = 6;
                texY = 2;
            }
        }
        return new PIXI.Sprite(new PIXI.Texture(ClassicTileProvider.textureSheet.baseTexture, new PIXI.Rectangle(texX * 32, texY * 32, 32, 32)));
    }

}