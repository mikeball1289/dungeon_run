import { WorldMap } from "./map/WorldMap";
import { Player } from "./actors/Player";
import { Keys, vennIntersection } from "../../common/utils";
import { GameStatePacket, IPlayersPacket } from "../../common/types";
import { root } from "./root";

const center = new PIXI.Point(1/2, 2/3);
const signOf = (n: number) => n < 0 ? -1 : 1;

export class GameView extends PIXI.Container {

    private playerLayer = new PIXI.Container();
    public players: { [id: string]: Player } = {};

    constructor(public map: WorldMap, public self: string) {
        super();
        this.addChild(map);
        this.addChild(this.playerLayer);
        this.scale.set(4);
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
        let ownPlayer = this.players[this.self];
        let centerScreen = new PIXI.Point(root.app.view.width * center.x, root.app.view.height * center.y);
        let dx = centerScreen.x - root.mouse.x;
        let dy = centerScreen.y - root.mouse.y;
        if (ownPlayer) {
            this.x = -ownPlayer.x * this.scale.x + centerScreen.x + Math.pow(dx * dx, 2 / 5) * signOf(dx);
            this.y = -ownPlayer.y * this.scale.y + centerScreen.y + Math.pow(dy * dy, 2 / 5) * signOf(dy);
        }
    }
}