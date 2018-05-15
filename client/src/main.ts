import { root, juggler, keyboard, Key } from "./root";
import { StandardTemplateRoomProvider } from "./providers/StandardTemplateRoomProvider";
import { DunGen, DunGenOpts } from "../../common/DunGen";
import { ClassicTileProvider } from "./providers/ClassicTileProvider";
import { WorldMap } from "./map/WorldMap";
import { GameView } from "./GameView";
import { TimelineMax, Linear, TimelineLite } from "gsap";

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

    let body = new PIXI.Sprite(new PIXI.Texture(new PIXI.BaseTexture(document.getElementById("body") as HTMLImageElement)));
    let head = new PIXI.Sprite(new PIXI.Texture(new PIXI.BaseTexture(document.getElementById("head") as HTMLImageElement)));
    head.pivot.set(265, 268);
    head.position.set(265, 268);
    let left_foot = new PIXI.Sprite(new PIXI.Texture(new PIXI.BaseTexture(document.getElementById("left_foot") as HTMLImageElement)));
    left_foot.pivot.set(280, 358);
    left_foot.position.set(280, 358);
    let right_foot = new PIXI.Sprite(new PIXI.Texture(new PIXI.BaseTexture(document.getElementById("right_foot") as HTMLImageElement)));
    right_foot.pivot.set(235, 358);
    right_foot.position.set(235, 358);
    let sword = new PIXI.Sprite(new PIXI.Texture(new PIXI.BaseTexture(document.getElementById("sword") as HTMLImageElement)));
    sword.pivot.set(247, 306);
    sword.position.set(247, 306);
    let weaponAnchor = new PIXI.Point(247, 306);

    let playerSprite = new PIXI.Container();
    playerSprite.addChild(left_foot);
    playerSprite.addChild(body);
    playerSprite.addChild(right_foot);
    playerSprite.addChild(head);
    playerSprite.addChild(sword);

    playerSprite.pivot.set(275, 300);
    root.stage.addChild(playerSprite);
    playerSprite.x = 800;
    playerSprite.y = 450;

    function beginStand() {
        let leadIn = new TimelineLite();
        leadIn.to(left_foot, 0.3, { x: 280, y: 358, rotation: 0, ease: Linear.easeOut } );
        leadIn.to(right_foot, 0.3, { x: 235, y: 358, rotation: 0, ease: Linear.easeOut }, 0 );
        return leadIn;
    }

    function movingBackwards() {
        return (facing === Direction.RIGHT && keyboard.isKeyDown(Key.A)) || 
                (facing === Direction.LEFT && keyboard.isKeyDown(Key.D))
    }

    function walkCycle() {
        let walkAnimation = new TimelineMax( {
            onReverseComplete: () => {
                walkAnimation.reverse(0);
            },
            onComplete: () => {
                walkAnimation.play(0);
            }
        } );
        let leftAnimation = new TimelineLite();
        leftAnimation.fromTo(left_foot, 0.2, { x: 230, rotation: Math.PI / 8}, { x: 260, y: 343, rotation: -Math.PI / 10, ease: Linear.easeNone } );
        leftAnimation.to(left_foot, 0.1, { x: 280, y: 358, rotation: 0, ease: Linear.easeNone } );
        leftAnimation.to(left_foot, 0.18, { x: 250, ease: Linear.easeNone } );
        leftAnimation.to(left_foot, 0.12, { x: 230, rotation: Math.PI / 8, ease: Linear.easeNone } );

        let rightAnimation = new TimelineLite();
        rightAnimation.fromTo(right_foot, 0.18, { x: 285, y: 358, rotation: 0 }, { x: 255, rotation: 0, ease: Linear.easeNone } );
        rightAnimation.to(right_foot, 0.12, { x: 235, rotation: Math.PI / 8, ease: Linear.easeNone } );
        rightAnimation.to(right_foot, 0.2, { x: 265, y: 343, rotation: -Math.PI / 10, ease: Linear.easeNone } );
        rightAnimation.to(right_foot, 0.1, { x: 285, y: 358, rotation: 0, ease: Linear.easeNone } );
        
        walkAnimation.add(leftAnimation);
        walkAnimation.add(rightAnimation, 0);
        if (movingBackwards()) {
            walkAnimation.reverse(0);
        }
        return walkAnimation;
    }

    function beginWalk() {
        let startWalkCycle = () => {
            if (walkingAnimation) walkingAnimation.kill();
            walkingAnimation = walkCycle();
            if (facing === Direction.LEFT) {
                walkingAnimation.reverse(0);
            }
        }
        let leadIn = new TimelineMax( {
            onComplete: startWalkCycle,
            onReverseComplete: startWalkCycle,
        } );
        if (!movingBackwards()) {
            leadIn.to(left_foot, 0.18, { x: 250, y: 358, rotation: 0, ease: Linear.easeNone } );
            leadIn.to(left_foot, 0.12, { x: 230, rotation: Math.PI / 8, ease: Linear.easeNone } );
            leadIn.to(right_foot, 0.2, { x: 265, y: 343, rotation: -Math.PI / 10, ease: Linear.easeNone }, 0 );
            leadIn.to(right_foot, 0.1, { x: 285, y: 358, rotation: 0, ease: Linear.easeNone }, 0.2 );
        } else {
            leadIn.from(right_foot, 0.3, { x: 285, y: 358, rotation: 0, ease: Linear.easeNone } );
            leadIn.fromTo(left_foot, 0.18, { x: 265, y: 343, rotation: 0, ease: Linear.easeNone }, { x: left_foot.x, y: left_foot.y, rotation: left_foot.rotation }, 0.12);
            leadIn.from(left_foot, 0.12, { x: 230, y: 358, rotation: Math.PI / 8, ease: Linear.easeNone }, 0);
            leadIn.reverse(0);
        }
        return leadIn;
    }
    let walking = false;
    let walkingAnimation: TimelineLite | undefined;
    let facing = Direction.RIGHT;
    juggler.add( () => {
        if ((keyboard.isKeyDown(Key.D) || keyboard.isKeyDown(Key.A)) && !walking) {
            if (walkingAnimation) walkingAnimation.kill();
            walkingAnimation = beginWalk();
            walking = true;
        }
        if ((!keyboard.isKeyDown(Key.D) && !keyboard.isKeyDown(Key.A)) && walking) {
            if (walkingAnimation) walkingAnimation.kill();
            walkingAnimation = beginStand();
            walking = false;
        }

        let dx = playerSprite.x - root.mouse.x;
        let dy = playerSprite.y - root.mouse.y;
        let rotation = Math.atan(dy / dx);
        rotation -= Math.PI / 2;

        if (dx > 0) {
            playerSprite.scale.x = -1;
            rotation = -rotation + Math.PI;
            facing = Direction.LEFT;
        } else {
            playerSprite.scale.x = 1;
            facing = Direction.RIGHT;
        }
        if (walkingAnimation && movingBackwards()) walkingAnimation.reverse();
        else if (walkingAnimation && !movingBackwards()) walkingAnimation.play();         
        sword.rotation = rotation;
        sword.position.set(weaponAnchor.x - 50 * Math.sin(rotation), weaponAnchor.y + 50 * Math.cos(rotation));
        head.rotation = Math.cos(rotation) / 2;
    } );
    /*
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
                up: keyboard.isKeyDown(Key.W),
                down: keyboard.isKeyDown(Key.S),
                left: keyboard.isKeyDown(Key.A),
                right: keyboard.isKeyDown(Key.D),
                jump: keyboard.isKeyDown(Key.SPACE),
            } );
        } );

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
                if (states.length > 5) states.slice(-4);
                view.update(states.shift()!);
            }
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
    */
}

window.addEventListener("load", main);