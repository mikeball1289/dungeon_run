import { Player } from "./gameobjects/Player";
import { WorldMap, TILE_SIZE } from "./gameobjects/WorldMap";
import { DunGen, ETiles } from "../common/DunGen";
import { readFileSync } from "fs";
import { TemplateRoom } from "../common/TemplateRoom";
import * as crypto from "crypto";
import { Point } from "./core/Point";
import { Keys } from "../common/utils";
import { GameStatePacket, IPlayersPacket, Controls, IEnemiesPacket, IEnemyState } from "../common/types";
import { Enemy } from "./gameobjects/Enemy";
import { FireFly } from "./gameobjects/enemies/FireFly";

export const emptyControls: Controls = {
    left: false,
    right: false,
    up: false,
    down: false,
    jump: false,
    target: { x: 0, y: 0 },
};
const templates: TemplateRoom[] = JSON.parse(readFileSync(__dirname + "/../../templates.json", "ascii")).map( (e: number[][]) => new TemplateRoom(e) );

export class GameState {
    public world: WorldMap;
    public numPlayers: number = 0;
    public spawnPoint: Point;
    public enemies: { [id: string]: Enemy<IEnemyState> } = {};
    public players: { [id: string]: { player: Player, controls: Controls } } = {};

    constructor() {
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

        for (let i = 0; i < 10; i ++) {
            let enemy = new FireFly();
            enemy.x = (Math.random() * 20 + 10) * TILE_SIZE;
            enemy.y = (Math.random() * 20 + 10) * TILE_SIZE;
            this.enemies[enemy.id] = enemy;
        }
    }

    public addPlayer(id: string) {
        if (this.players[id]) return;
        this.players[id] = {
            player: new Player(new Point(TILE_SIZE - 14, TILE_SIZE - 7), this.spawnPoint.offset(TILE_SIZE / 2, TILE_SIZE - 2)),
            controls: { ...emptyControls },
        };
        this.numPlayers ++;
    }

    public removePlayer(id: string) {
        if (!this.players[id]) return;
        delete this.players[id];
        this.numPlayers --;
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

        let enemies: IEnemiesPacket = {};
        for (let id of Keys(this.enemies)) {
            enemies[id] = this.enemies[id].serialize();
        }
        
        return {
            timestamp: Date.now(),
            players,
            enemies,
        }
    }
}