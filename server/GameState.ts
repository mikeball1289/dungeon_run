import { Player } from "./gameobjects/Player";
import { WorldMap, TILE_SIZE } from "./gameobjects/WorldMap";
import { DunGen, ETiles } from "../common/DunGen";
import { readFileSync } from "fs";
import { TemplateRoom } from "../common/TemplateRoom";
import * as crypto from "crypto";
import { Point } from "./core/Point";
import { Keys } from "../common/utils";
import { GameStatePacket, IPlayersPacket, Controls } from "../common/types";

export const emptyControls: Controls = {
    left: false,
    right: false,
    up: false,
    down: false,
    jump: false,
};
const templates: TemplateRoom[] = JSON.parse(readFileSync(__dirname + "/../../templates.json", "ascii")).map( (e: number[][]) => new TemplateRoom(e) );

export class GameState {
    public players: { [id: string]: { player: Player, controls: Controls } };
    public world: WorldMap;
    public numPlayers: number = 0;
    public spawnPoint: Point;

    constructor() {
        this.players = {};
        this.world = new WorldMap(DunGen(templates, { width: 40, height: 40, seed: crypto.randomBytes(24).toString("base64") } ));
        outerloop:
        for (let y = 0; y < this.world.dungeon.height; y ++) {
            for (let x = 0; x < this.world.dungeon.width; x ++) {
                if (this.world.dungeon.tiles.get(x, y) === ETiles.EMPTY) {
                    this.spawnPoint = new Point(x * TILE_SIZE, y * TILE_SIZE);
                    console.log(this.spawnPoint);
                    break outerloop;
                }
            }
        }
    }

    public addPlayer(id: string) {
        this.players[id] = {
            player: new Player(new Point(TILE_SIZE - 7, TILE_SIZE - 7), this.spawnPoint.offset(TILE_SIZE / 2, TILE_SIZE - 2)),
            controls: { ...emptyControls },
        };
    }

    public removePlayer(id: string) {
        delete this.players[id];
    }

    public update(): GameState {
        for (let id of Keys(this.players)) {
            this.players[id].player.update(this, this.players[id].controls);
        }
        return this;
    }

    public serialize(): GameStatePacket {
        let players: IPlayersPacket = {};
        for (let id of Keys(this.players)) {
            players[id] = this.players[id].player.serialize();
        }
        
        return { players, timestamp: Date.now() };
    }
}