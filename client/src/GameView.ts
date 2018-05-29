import { WorldMap } from "./map/WorldMap";
import { Player } from "./actors/Player";
import { Keys, vennIntersection } from "../../common/utils";
import { GameStatePacket, IPlayersPacket } from "../../common/types";
import { root } from "./root";
import { Actor } from "./actors/Actor";

// where the visual center of the screen should be
const center = new PIXI.Point(1/2, 2/3);
// helper, return -1 if n is negative, 1 otherwise
const signOf = (n: number) => n < 0 ? -1 : 1;

/*
Class for visually displaying the current game state
*/
export class GameView extends PIXI.Container {

    private playerLayer = new PIXI.Container();
    public players: { [id: string]: Player } = {};

    constructor(public map: WorldMap, public self: string) {
        super();
        this.addChild(map);
        this.addChild(this.playerLayer);
        this.scale.set(4);
    }

    private updateActors<State>(
        actors: { [id: string]: Actor<State> },
        states: { [id: string]: State },
        initFn: (state: State) => Actor<State>,
        killFn: (actor: Actor<State>) => void,
    ) {
        // get the lists of added actors, removed actors, and updated actors
        // each of these cases needs to be handled separately
        let { l1: added, l2: removed, both: updated } = vennIntersection(Keys(states), Keys(actors));
        // // create new actors for the ones added
        for (let id of added) {
            actors[id] = initFn(states[id]);
        }
        // delete the actors for the ones removed
        for (let id of removed) {
            killFn(actors[id]);
            delete actors[id];
        }
        // update the actors that are still there and doing things
        for (let id of updated) {
            actors[id].update(states[id]);
        }
    }

    public update(state: GameStatePacket) {
        this.updateActors(this.players, state.players,
            (state) => {
                let player = new Player(state);
                this.playerLayer.addChild(player);
                return player
            },
            (player) => {
                this.playerLayer.removeChild(player);
                player.destroy();
            },
        );

        // fetch the player that this client is controlling, put it in the middle of the screen
        // bump aiming, other player-specific rendering details
        let ownPlayer = this.players[this.self];
        let centerScreen = new PIXI.Point(root.app.view.width * center.x, root.app.view.height * center.y);
        let dx = centerScreen.x - root.mouse.x;
        let dy = centerScreen.y - root.mouse.y;
        if (ownPlayer) {
            this.x = -ownPlayer.x * this.scale.x + centerScreen.x + Math.pow(dx * dx, 2 / 5) * signOf(dx);
            this.y = -ownPlayer.y * this.scale.y + centerScreen.y + Math.pow(dy * dy, 2 / 5) * signOf(dy) * 1.5;
        }
    }
}