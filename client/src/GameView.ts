import { WorldMap } from "./map/WorldMap";
import { Player } from "./actors/Player";
import { Keys, vennIntersection } from "../../common/utils";

export class GameView extends PIXI.Container {

    private playerLayer = new PIXI.Container();

    constructor(public map: WorldMap, public players: { [id: string]: Player }) {
        super();
        this.addChild(map);
        this.addChild(this.playerLayer);
    }

    public update(state: GameStatePacket) {
        let ownIds = Keys(this.players);
        let incomingIds = Keys(state.players);
        let { l1: added, l2: removed, both: updated } = vennIntersection(incomingIds, ownIds);
        for (let id of added) {
            this.players[id] = new Player(state.players[id]);
            this.playerLayer.addChild(this.players[id]);
        }
        for (let id of removed) {
            this.playerLayer.removeChild(this.players[id]);
            this.players[id].destroy();
            delete this.players[id];
        }
        for (let id of updated) {
            this.players[id].update(state.players[id]);
        }
    }
}