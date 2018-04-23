import { Player } from "./gameobjects/Player";
import { WorldMap } from "./gameobjects/WorldMap";
import { DunGen } from "../common/DunGen";
import { readFileSync } from "fs";
import { TemplateRoom } from "../common/TemplateRoom";
import * as crypto from "crypto";

const templates: TemplateRoom[] = JSON.parse(readFileSync(__dirname + "/../../templates.json", "ascii")).map( (e: number[][]) => new TemplateRoom(e) );

export class GameState {
    public players: { [id: string]: Player };
    public world: WorldMap;

    constructor() {
        this.players = {};
        this.world = new WorldMap(DunGen(templates, { width: 50, height: 50, seed: crypto.randomBytes(24).toString("base64") } ));
        console.log(this.world);
    }
}