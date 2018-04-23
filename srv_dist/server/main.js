"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketIo = require("socket.io");
const http = require("http");
const express = require("express");
const GameState_1 = require("./GameState");
let app = express();
let server = http.createServer(app);
let io = socketIo(server);
console.log(__dirname);
express.static.mime.define({ "text/javascript": ["js"] });
app.use(express.static(__dirname + "/../../client/dist"));
let game = new GameState_1.GameState();
io.on("connection", (socket) => {
    console.log(`Connection recieved ${socket.id}`);
    socket.emit("dungeon_params", {
        width: game.world.dungeon.width,
        height: game.world.dungeon.height,
        seed: game.world.dungeon.seed,
    });
    socket.on("disconnect", () => {
        console.log(`Client disconnected ${socket.id}`);
    });
});
server.listen(8080, () => console.log("Server started at localhost:8080"));
