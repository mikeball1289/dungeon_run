import * as socketIo from "socket.io";
import * as http from "http";
import * as express from "express";
import { GameState } from "./GameState";
import { DunGenOpts } from "../common/DunGen";
import { Juggler } from "./core/Juggler";
import { Controls, IOwnData } from "../common/types";
import { dataFromSocket } from "../common/utils";

let app = express();
let server = http.createServer(app);
let io = socketIo(server);

// express.static.mime.define( { "text/javascript": ["js"] } );
app.use(express.static("client/dist"));

let game = new GameState();

io.on("connection", async (socket) => {
    const id = socket.id;
    console.log(`Connection recieved ${socket.id}`);
    
    socket.on("disconnect", () => {
        game.removePlayer(id);
        console.log(`Client disconnected ${id}`);
    } );

    socket.emit("dungeon_params", <DunGenOpts>{
        width: game.world.dungeon.width,
        height: game.world.dungeon.height,
        seed: game.world.dungeon.seed,
    } );
    
    try {
        await dataFromSocket(socket, "ack", 2000);
    } catch(timedout) {
        socket.emit("reload");
        socket.disconnect();
        return;
    }
    game.addPlayer(id);
    socket.emit("own_data", { id: socket.id } as IOwnData);
        
    socket.on("controls", (controls: Controls) => {
        if (game.players[id]) game.players[id].controls = controls;
    } );
        
    socket.on("_ping", () => socket.emit("_pong") );
} );

let juggler = new Juggler(30);
juggler.add( () => {
    game = game.update();
    let serial = game.serialize();
    io.emit("state", serial);
} );

server.listen(8080, () => console.log("Server started at localhost:8080"));