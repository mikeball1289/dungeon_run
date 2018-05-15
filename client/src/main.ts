import { root, juggler, keyboard, Key } from "./root";
import { StandardTemplateRoomProvider } from "./providers/StandardTemplateRoomProvider";
import { DunGen, DunGenOpts } from "../../common/DunGen";
import { ClassicTileProvider } from "./providers/ClassicTileProvider";
import { WorldMap } from "./map/WorldMap";
import { GameView } from "./GameView";
import { TimelineMax, Linear, TimelineLite } from "gsap";
import { GameStatePacket, Controls, IPlayersPacket, IOwnData } from "../../common/types";
import { dataFromSocket } from "../../common/utils";

enum Direction {
    LEFT,
    RIGHT,
}

async function main() {
    let app = new PIXI.Application( {
        width: 1600,
        height: 900,
        backgroundColor: 0x161616,
    } );
    document.body.appendChild(app.view);
    root.setApp(app);

    let fps = 60;
    let tps = 60;
    let ping = 0;

    let fpsDisplay = new PIXI.Text("0", { align: "right", fontFamily: "Courier New", fontSize: 17, stroke: 0xFFFFFF, strokeThickness: 0.5 } );
    fpsDisplay.anchor.set(1);
    fpsDisplay.x = app.view.width;
    fpsDisplay.y = app.view.height;
    root.stage.addChild(fpsDisplay);

    juggler.setFPS(70);
    let lastTick = 0;
    juggler.add( () => {
        if (lastTick > 0) {
            let tick = Date.now();
            if (!isFinite(fps)) {
                fps = 1000 / (tick - lastTick);
            } else {
                fps = fps * 0.99 + (Math.min(1000 / (tick - lastTick), 1000)) * 0.01;
            }
            lastTick = tick;
        } else {
            lastTick = Date.now();
        }

        fpsDisplay.text = ping + " Ping \n" + tps.toFixed(1) + " World\n" + fps.toFixed(1) + " Home ";
    } );

    await StandardTemplateRoomProvider.ready();
    
    let socket = io();
    let params = await dataFromSocket<DunGenOpts>(socket, "dungeon_params");
    socket.emit("ack");
    let ownData = await dataFromSocket<IOwnData>(socket, "own_data");
    let dungeon = DunGen(StandardTemplateRoomProvider.templates, params);
    await ClassicTileProvider.ready();
    let map = new WorldMap(dungeon, ClassicTileProvider);
    let view = new GameView(map, ownData.id);
    root.stage.addChildAt(view, 0);
    
    let lastUpdate = 0;
    let states: GameStatePacket[] = [];
    socket.on("state", (s: GameStatePacket) => {
        let updateTime = s.timestamp;
        if (lastUpdate > 0) {
            let updateTime = Date.now();
            if (!isFinite(tps)) {
                tps = 1000 / (updateTime - lastUpdate);
            } else {
                tps = tps * 0.99 + (Math.min(1000 / (updateTime - lastUpdate), 1000)) * 0.01;
            }
            lastUpdate = updateTime;
        } else {
            lastUpdate = updateTime;
        }

        states.push(s);
    } );
    
    juggler.add( () => {
        if (states.length > 1) {
            if (states.length > 3) states = states.slice(-3);
            view.update(states.shift()!);
        }
        
        socket.emit("controls", <Controls>{
            up: keyboard.isKeyDown(Key.W),
            down: keyboard.isKeyDown(Key.S),
            left: keyboard.isKeyDown(Key.A),
            right: keyboard.isKeyDown(Key.D),
            jump: keyboard.isKeyDown(Key.SPACE),
        } );
    } );
    let pingTime = 0;
    setInterval( () => {
        if (pingTime === 0) {
            socket.emit("_ping");
            pingTime = Date.now();
        }
    }, 1000);
    socket.on("_pong", () => {
        ping = Date.now() - pingTime;
        pingTime = 0;
    } );

    socket.on("reload", () => window.location.reload() );

}

window.addEventListener("load", main);