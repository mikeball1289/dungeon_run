import { Dungeon, ETiles } from "../../../common/DunGen";
import { ITileProvider } from "../providers/ITileProvider";
import { root } from "../root";

export const TILE_SIZE = 32;

/*
A visual representation of the tiled map
*/
export class WorldMap extends PIXI.Container {

    constructor(public dungeon: Dungeon, public provider: ITileProvider) {
        super();
        // construction is synchronous so we need to be given a preloaded provider
        if (!provider.isReady()) throw new Error("Provider is not ready");
        // build the dungeon out of a bunch of tile sprites in a container
        let container = new PIXI.Container();
        for (let i = 0; i < dungeon.width; i ++) {
            for (let j = 0; j < dungeon.height; j ++) {
                let tile = provider.getTile(dungeon, i, j);
                tile.x = i * TILE_SIZE;
                tile.y = j * TILE_SIZE;
                container.addChild(tile);
            }
        }
        // then render the whole thing to a single render texture and destroy the mess of sprites
        // from before, for performance
        let tex = PIXI.RenderTexture.create(dungeon.width * TILE_SIZE, dungeon.height * TILE_SIZE);
        root.app.renderer.render(container, tex);
        container.destroy();
        this.addChild(new PIXI.Sprite(tex));
    }

}