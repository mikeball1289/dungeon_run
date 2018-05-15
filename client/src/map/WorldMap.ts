import { Dungeon, ETiles } from "../../../common/DunGen";
import { ITileProvider } from "../providers/ITileProvider";
import { root } from "../root";

export const TILE_SIZE = 32;
const EPSILON = 0.001;

export class WorldMap extends PIXI.Container {

    constructor(public dungeon: Dungeon, public provider: ITileProvider) {
        super();
        if (!provider.isReady()) throw new Error("Provider is not ready");
        let tex = PIXI.RenderTexture.create(dungeon.width * TILE_SIZE, dungeon.height * TILE_SIZE);
        let container = new PIXI.Container();
        for (let i = 0; i < dungeon.width; i ++) {
            for (let j = 0; j < dungeon.height; j ++) {
                let tile = provider.getTile(dungeon, i, j);
                tile.x = i * TILE_SIZE;
                tile.y = j * TILE_SIZE;
                container.addChild(tile);
            }
        }
        root.app.renderer.render(container, tex);
        container.destroy();
        this.addChild(new PIXI.Sprite(tex));
    }

}