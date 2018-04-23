"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Actor_1 = require("./Actor");
class Player extends Actor_1.Actor {
    constructor() {
        super(...arguments);
        this.tag = "player";
    }
    update(state, controls) {
        return new Player();
    }
}
exports.Player = Player;
