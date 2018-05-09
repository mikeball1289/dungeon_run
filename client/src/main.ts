import { root, juggler, keyboard, Key } from "./root";
import { StandardTemplateRoomProvider } from "./providers/StandardTemplateRoomProvider";
import { DunGen, DunGenOpts } from "../../common/DunGen";
import { ClassicTileProvider } from "./providers/ClassicTileProvider";
import { WorldMap } from "./map/WorldMap";
import { GameView } from "./GameView";

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

    let lastTick = 0;
    juggler.add( () => {
        if (lastTick > 0) {
            let tick = Date.now();
            if (!isFinite(fps)) {
                fps = 1000 / (tick - lastTick);
            } else {
                fps = fps * 0.99 + (1000 / (tick - lastTick)) * 0.01;
            }
            lastTick = tick;
        } else {
            lastTick = Date.now();
        }

        fpsDisplay.text = ping + " Ping \n" + tps.toFixed(1) + " World\n" + fps.toFixed(1) + " Home ";
    } );

    await StandardTemplateRoomProvider.ready();
    
    let socket = io();
    socket.on("dungeon_params", async (params: DunGenOpts) => {
        socket.off("dungeon_params");
        socket.emit("ack");
        let dungeon = DunGen(StandardTemplateRoomProvider.templates, params);
        await ClassicTileProvider.ready();
        let map = new WorldMap(dungeon, ClassicTileProvider);
        let view = new GameView(map, {});
        root.stage.addChildAt(view, 0);
        
        juggler.add( () => {
            socket.emit("controls", <Controls>{
                up: keyboard.isKeyDown(Key.UP),
                down: keyboard.isKeyDown(Key.DOWN),
                left: keyboard.isKeyDown(Key.LEFT),
                right: keyboard.isKeyDown(Key.RIGHT),
                jump: keyboard.isKeyDown(Key.SPACE),
            } );
        } );

        let lastUpdate = 0;
        socket.on("state", (s: GameStatePacket) => {
            let updateTime = s.timestamp;
            if (lastUpdate > 0) {
                let updateTime = Date.now();
                if (!isFinite(tps)) {
                    tps = 1000 / (updateTime - lastUpdate);
                } else {
                    tps = tps * 0.99 + (1000 / (updateTime - lastUpdate)) * 0.01;
                }
                lastUpdate = updateTime;
            } else {
                lastUpdate = updateTime;
            }

            view.update(s);
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

    } );

}

window.addEventListener("load", main);