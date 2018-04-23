import { root, juggler } from "./root";

async function main() {
    let app = new PIXI.Application( {
        width: 1600,
        height: 900,
        backgroundColor: 0x161616,
    } );
    document.body.appendChild(app.view);
    root.setApp(app);

    let fps = 60;
    let lastTick = 0;

    let fpsDisplay = new PIXI.Text("0", { align: "right", fontFamily: "Courier New", fontSize: 17, stroke: 0xFFFFFF, strokeThickness: 0.5 } );
    fpsDisplay.anchor.set(1);
    fpsDisplay.x = app.view.width;
    fpsDisplay.y = app.view.height;
    app.stage.addChild(fpsDisplay);

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

        fpsDisplay.text = fps.toFixed(1);
    } );

    let socket = io();
    socket.on("dungeon_params", (params: any) => console.log(params) );
}

window.addEventListener("load", main);