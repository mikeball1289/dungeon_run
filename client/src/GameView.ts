import { WorldMap } from "./map/WorldMap";
import { Player } from "./actors/Player";
import { Keys, vennIntersection } from "../../common/utils";
import { GameStatePacket, IPlayersPacket } from "../../common/types";
import { root } from "./root";

export class GameView extends PIXI.Container {

    private playerLayer = new PIXI.Container();
    public players: { [id: string]: Player } = {};

    constructor(public map: WorldMap, public self: string) {
        super();
        this.addChild(map);
        this.addChild(this.playerLayer);
        this.scale.set(5);
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
        // let ownPlayer = this.players[this.self];
        // if (ownPlayer) {
            // this.x = -ownPlayer.x + root.app.view.width / 2;
            // this.y = -ownPlayer.y + root.app.view.height / 2;
        // }
    }
}