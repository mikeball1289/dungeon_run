import * as socketIo from "socket.io";
import * as http from "http";
import * as express from "express";
import { GameState } from "./GameState";
import { DunGenOpts } from "../common/DunGen";
import { Juggler } from "./core/Juggler";

let app = express();
let server = http.createServer(app);
let io = socketIo(server);

// express.static.mime.define( { "text/javascript": ["js"] } );
app.use(express.static("client/dist"));

let game = new GameState();

io.on("connection", (socket) => {
    const id = socket.id;
    console.log(`Connection recieved ${socket.id}`);

    socket.emit("dungeon_params", <DunGenOpts>{
        width: game.world.dungeon.width,
        height: game.world.dungeon.height,
        seed: game.world.dungeon.seed,
    } );
    
    let ackTimer = setTimeout( () => {
        socket.emit("reload");
        socket.disconnect();
    }, 2000);

    socket.on("ack", () => {
        game.addPlayer(id);
        
        clearTimeout(ackTimer);
        
        socket.on("controls", (controls: Controls) => {
            game.players[id].controls = controls;
        } );
        
        socket.on("_ping", () => socket.emit("_pong") );
    } );
        
    socket.on("disconnect", () => {
        game.removePlayer(id);
        console.log(`Client disconnected ${id}`);
    } );
} );

let juggler = new Juggler(60);
juggler.add( () => {
    game = game.update();
    let serial = game.serialize();
    io.emit("state", serial);
} );

server.listen(8080, () => console.log("Server started at localhost:8080"));