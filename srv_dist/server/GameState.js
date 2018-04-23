"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WorldMap_1 = require("./gameobjects/WorldMap");
const DunGen_1 = require("../common/DunGen");
const fs_1 = require("fs");
const TemplateRoom_1 = require("../common/TemplateRoom");
const crypto = require("crypto");
const templates = JSON.parse(fs_1.readFileSync(__dirname + "/../../templates.json", "ascii")).map((e) => new TemplateRoom_1.TemplateRoom(e));
class GameState {
    constructor() {
        this.players = {};
        this.world = new WorldMap_1.WorldMap(DunGen_1.DunGen(templates, { width: 50, height: 50, seed: crypto.randomBytes(24).toString("base64") }));
        console.log(this.world);
    }
}
exports.GameState = GameState;
