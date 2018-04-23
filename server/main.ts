import * as socketIo from "socket.io";
import * as http from "http";
import * as express from "express";
import { GameState } from "./GameState";

let app = express();
let server = http.createServer(app);
let io = socketIo(server);

console.log(__dirname);
// express.static.mime.define( { "text/javascript": ["js"] } );
app.use(express.static(__dirname + "/../../client/dist"));

let game = new GameState();

io.on("connection", (socket) => {
    console.log(`Connection recieved ${socket.id}`);

    socket.emit("dungeon_params", {
        width: game.world.dungeon.width,
        height: game.world.dungeon.height,
        seed: game.world.dungeon.seed,
    } );

    socket.on("disconnect", () => {
        console.log(`Client disconnected ${socket.id}`);
    } );
} );

server.listen(8080, () => console.log("Server started at localhost:8080"));