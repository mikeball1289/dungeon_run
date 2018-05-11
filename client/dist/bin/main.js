(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("./actors/Player");
const utils_1 = require("../../common/utils");
class GameView extends PIXI.Container {
    constructor(map, players) {
        super();
        this.map = map;
        this.players = players;
        this.playerLayer = new PIXI.Container();
        this.addChild(map);
        this.addChild(this.playerLayer);
    }
    update(state) {
        let ownIds = utils_1.Keys(this.players);
        let incomingIds = utils_1.Keys(state.players);
        let { l1: added, l2: removed, both: updated } = utils_1.vennIntersection(incomingIds, ownIds);
        for (let id of added) {
            this.players[id] = new Player_1.Player(state.players[id]);
            this.playerLayer.addChild(this.players[id]);
        }
        for (let id of removed) {
            this.playerLayer.removeChild(this.players[id]);
            this.players[id].destroy();
            delete this.players[id];
        }
        for (let id of updated) {
            this.players[id].update(state.players[id]);
        }
    }
}
exports.GameView = GameView;
},{"../../common/utils":14,"./actors/Player":4}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BACKSPACE = 8;
exports.TAB = 9;
exports.ENTER = 13;
exports.SHIFT = 16;
exports.CTRL = 17;
exports.ALT = 18;
exports.PAUSE = 19;
exports.CAPS_LOCK = 20;
exports.ESCAPE = 27;
exports.SPACE = 32;
exports.PAGE_UP = 33;
exports.PAGE_DOWN = 34;
exports.END = 35;
exports.HOME = 36;
exports.LEFT = 37;
exports.UP = 38;
exports.RIGHT = 39;
exports.DOWN = 40;
exports.INSERT = 45;
exports.DELETE = 46;
exports.NUM_0 = 48;
exports.NUM_1 = 49;
exports.NUM_2 = 50;
exports.NUM_3 = 51;
exports.NUM_4 = 52;
exports.NUM_5 = 53;
exports.NUM_6 = 54;
exports.NUM_7 = 55;
exports.NUM_8 = 56;
exports.NUM_9 = 57;
exports.A = 65;
exports.B = 66;
exports.C = 67;
exports.D = 68;
exports.E = 69;
exports.F = 70;
exports.G = 71;
exports.H = 72;
exports.I = 73;
exports.J = 74;
exports.K = 75;
exports.L = 76;
exports.M = 77;
exports.N = 78;
exports.O = 79;
exports.P = 80;
exports.Q = 81;
exports.R = 82;
exports.S = 83;
exports.T = 84;
exports.U = 85;
exports.V = 86;
exports.W = 87;
exports.X = 88;
exports.Y = 89;
exports.Z = 90;
exports.SELECT = 93;
exports.NUMPAD_0 = 96;
exports.NUMPAD_1 = 97;
exports.NUMPAD_2 = 98;
exports.NUMPAD_3 = 99;
exports.NUMPAD_4 = 100;
exports.NUMPAD_5 = 101;
exports.NUMPAD_6 = 102;
exports.NUMPAD_7 = 103;
exports.NUMPAD_8 = 104;
exports.NUMPAD_9 = 105;
exports.MULTIPLY = 106;
exports.ADD = 107;
exports.SUBTRACT = 109;
exports.DECIMAL_POINT = 110;
exports.DIVIDE = 111;
exports.F1 = 112;
exports.F2 = 113;
exports.F3 = 114;
exports.F4 = 115;
exports.F5 = 116;
exports.F6 = 117;
exports.F7 = 118;
exports.F8 = 119;
exports.F9 = 120;
exports.F10 = 121;
exports.F11 = 122;
exports.F12 = 123;
exports.NUM_LOCK = 144;
exports.SCROLL_LOCK = 145;
exports.SEMICOLON = 186;
exports.EQUALS = 187;
exports.COMMA = 188;
exports.DASH = 189;
exports.PERIOD = 190;
exports.FORWARD_SLASH = 191;
exports.GRAVE_ACCENT = 192;
exports.OPEN_BRACKET = 219;
exports.BACK_SLASH = 220;
exports.CLOSE_BRAKET = 221;
exports.SINGLE_QUOTE = 222;
},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player extends PIXI.Container {
    constructor(state) {
        super();
        let graphics = new PIXI.Graphics();
        graphics.beginFill(0x0000FF);
        graphics.drawRect(0, 0, 25, 25);
        graphics.endFill();
        this.addChild(graphics);
        this.x = state.x;
        this.y = state.y;
        this.pivot.set(12.5, 25);
    }
    update(state) {
        this.x = state.x;
        this.y = state.y;
    }
}
exports.Player = Player;
},{}],5:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const root_1 = require("./root");
const StandardTemplateRoomProvider_1 = require("./providers/StandardTemplateRoomProvider");
const DunGen_1 = require("../../common/DunGen");
const ClassicTileProvider_1 = require("./providers/ClassicTileProvider");
const WorldMap_1 = require("./map/WorldMap");
const GameView_1 = require("./GameView");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let app = new PIXI.Application({
            width: 1600,
            height: 900,
            backgroundColor: 0x161616,
        });
        document.body.appendChild(app.view);
        root_1.root.setApp(app);
        let fps = 60;
        let tps = 60;
        let ping = 0;
        let fpsDisplay = new PIXI.Text("0", { align: "right", fontFamily: "Courier New", fontSize: 17, stroke: 0xFFFFFF, strokeThickness: 0.5 });
        fpsDisplay.anchor.set(1);
        fpsDisplay.x = app.view.width;
        fpsDisplay.y = app.view.height;
        root_1.root.stage.addChild(fpsDisplay);
        root_1.juggler.setFPS(70);
        let lastTick = 0;
        root_1.juggler.add(() => {
            if (lastTick > 0) {
                let tick = Date.now();
                if (!isFinite(fps)) {
                    fps = 1000 / (tick - lastTick);
                }
                else {
                    fps = fps * 0.99 + (Math.min(1000 / (tick - lastTick), 1000)) * 0.01;
                }
                lastTick = tick;
            }
            else {
                lastTick = Date.now();
            }
            fpsDisplay.text = ping + " Ping \n" + tps.toFixed(1) + " World\n" + fps.toFixed(1) + " Home ";
        });
        yield StandardTemplateRoomProvider_1.StandardTemplateRoomProvider.ready();
        let socket = io();
        socket.on("dungeon_params", (params) => __awaiter(this, void 0, void 0, function* () {
            socket.off("dungeon_params");
            socket.emit("ack");
            let dungeon = DunGen_1.DunGen(StandardTemplateRoomProvider_1.StandardTemplateRoomProvider.templates, params);
            yield ClassicTileProvider_1.ClassicTileProvider.ready();
            let map = new WorldMap_1.WorldMap(dungeon, ClassicTileProvider_1.ClassicTileProvider);
            let view = new GameView_1.GameView(map, {});
            root_1.root.stage.addChildAt(view, 0);
            root_1.juggler.add(() => {
                socket.emit("controls", {
                    up: root_1.keyboard.isKeyDown(root_1.Key.UP),
                    down: root_1.keyboard.isKeyDown(root_1.Key.DOWN),
                    left: root_1.keyboard.isKeyDown(root_1.Key.LEFT),
                    right: root_1.keyboard.isKeyDown(root_1.Key.RIGHT),
                    jump: root_1.keyboard.isKeyDown(root_1.Key.SPACE),
                });
            });
            let lastUpdate = 0;
            let stateBufferLength = 2;
            let states = [];
            socket.on("state", (s) => {
                let updateTime = s.timestamp;
                if (lastUpdate > 0) {
                    let updateTime = Date.now();
                    if (!isFinite(tps)) {
                        tps = 1000 / (updateTime - lastUpdate);
                    }
                    else {
                        tps = tps * 0.99 + (Math.min(1000 / (updateTime - lastUpdate), 1000)) * 0.01;
                    }
                    lastUpdate = updateTime;
                }
                else {
                    lastUpdate = updateTime;
                }
                states.push(s);
            });
            root_1.juggler.add(() => {
                if (states.length > 1) {
                    if (states.length > 5)
                        states.slice(-5);
                    view.update(states.shift());
                }
            });
            let pingTime = 0;
            setInterval(() => {
                if (pingTime === 0) {
                    socket.emit("_ping");
                    pingTime = Date.now();
                }
            }, 1000);
            socket.on("_pong", () => {
                ping = Date.now() - pingTime;
                pingTime = 0;
            });
            socket.on("reload", () => window.location.reload());
        }));
    });
}
window.addEventListener("load", main);
},{"../../common/DunGen":11,"./GameView":2,"./map/WorldMap":6,"./providers/ClassicTileProvider":7,"./providers/StandardTemplateRoomProvider":9,"./root":10}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const root_1 = require("../root");
exports.TILE_SIZE = 32;
const EPSILON = 0.001;
class WorldMap extends PIXI.Container {
    constructor(dungeon, provider) {
        super();
        this.dungeon = dungeon;
        this.provider = provider;
        if (!provider.isReady())
            throw new Error("Provider is not ready");
        let tex = PIXI.RenderTexture.create(dungeon.width * exports.TILE_SIZE, dungeon.height * exports.TILE_SIZE);
        let container = new PIXI.Container();
        for (let i = 0; i < dungeon.width; i++) {
            for (let j = 0; j < dungeon.height; j++) {
                let tile = provider.getTile(dungeon, i, j);
                tile.x = i * exports.TILE_SIZE;
                tile.y = j * exports.TILE_SIZE;
                container.addChild(tile);
            }
        }
        root_1.root.app.renderer.render(container, tex);
        container.destroy();
        this.addChild(new PIXI.Sprite(tex));
    }
}
exports.WorldMap = WorldMap;
},{"../root":10}],7:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const DunGen_1 = require("../../../common/DunGen");
const Decorator_1 = require("./Decorator");
let ClassicTileProvider = ClassicTileProvider_1 = class ClassicTileProvider {
    static ready() {
        let p = new Promise((resolve, reject) => {
            if (!this.textureSheet) {
                PIXI.loader.add("tiles", "img/tiles_001.png");
                PIXI.loader.load();
                PIXI.loader.once("complete", () => {
                    this.textureSheet = PIXI.loader.resources["tiles"].texture;
                    resolve();
                });
            }
            else {
                resolve();
            }
        });
        return p;
    }
    static isReady() {
        return this.textureSheet !== undefined;
    }
    static getTile(dungeon, x, y) {
        let texX = 0;
        let texY = 0;
        let tile = dungeon.tiles.get(x, y);
        if (tile === DunGen_1.ETiles.EMPTY) {
            texX = 5;
            texY = 1;
        }
        else if (tile === DunGen_1.ETiles.LADDER) {
            texX = 5;
            texY = 2;
        }
        else if (tile === DunGen_1.ETiles.WALL) {
            let solidTop = y === 0 || dungeon.tiles.get(x, y - 1) === DunGen_1.ETiles.WALL;
            let solidBottom = y === dungeon.height - 1 || dungeon.tiles.get(x, y + 1) === DunGen_1.ETiles.WALL;
            let solidLeft = x === 0 || dungeon.tiles.get(x - 1, y) === DunGen_1.ETiles.WALL;
            let solidRight = x === dungeon.width - 1 || dungeon.tiles.get(x + 1, y) === DunGen_1.ETiles.WALL;
            if (solidTop && solidBottom && solidLeft && solidRight) {
                let solidTopLeft = y === 0 || x === 0 || dungeon.tiles.get(x - 1, y - 1) === DunGen_1.ETiles.WALL;
                let solidTopRight = y === 0 || x === dungeon.width - 1 || dungeon.tiles.get(x + 1, y - 1) === DunGen_1.ETiles.WALL;
                let solidBottomLeft = y === dungeon.height - 1 || x === 0 || dungeon.tiles.get(x - 1, y + 1) === DunGen_1.ETiles.WALL;
                let solidBottomRight = y === dungeon.height - 1 || x === dungeon.width - 1 || dungeon.tiles.get(x + 1, y + 1) === DunGen_1.ETiles.WALL;
                if (!solidTopLeft) {
                    texX = 3;
                    texY = 1;
                }
                else if (!solidTopRight) {
                    texX = 4;
                    texY = 1;
                }
                else if (!solidBottomLeft) {
                    texX = 3;
                    texY = 2;
                }
                else if (!solidBottomRight) {
                    texX = 4;
                    texY = 2;
                }
                else {
                    texX = 1;
                    texY = 1;
                }
            }
            else if (!solidLeft && solidRight && solidBottom && !solidTop) {
                texX = 0;
                texY = 0;
            }
            else if (solidLeft && solidRight && solidBottom && !solidTop) {
                texX = 1;
                texY = 0;
            }
            else if (solidLeft && !solidRight && solidBottom && !solidTop) {
                texX = 2;
                texY = 0;
            }
            else if (!solidLeft && solidRight && solidBottom && solidTop) {
                texX = 0;
                texY = 1;
            }
            else if (solidLeft && !solidRight && solidBottom && solidTop) {
                texX = 2;
                texY = 1;
            }
            else if (!solidLeft && solidRight && !solidBottom && solidTop) {
                texX = 0;
                texY = 2;
            }
            else if (solidLeft && solidRight && !solidBottom && solidTop) {
                texX = 1;
                texY = 2;
            }
            else if (solidLeft && !solidRight && !solidBottom && solidTop) {
                texX = 2;
                texY = 2;
            }
            else if (!solidLeft && solidRight && !solidBottom && !solidTop) {
                texX = 3;
                texY = 0;
            }
            else if (solidLeft && solidRight && !solidBottom && !solidTop) {
                texX = 4;
                texY = 0;
            }
            else if (solidLeft && !solidRight && !solidBottom && !solidTop) {
                texX = 5;
                texY = 0;
            }
            else if (!solidLeft && !solidRight && solidBottom && !solidTop) {
                texX = 6;
                texY = 0;
            }
            else if (!solidLeft && !solidRight && solidBottom && solidTop) {
                texX = 6;
                texY = 1;
            }
            else if (!solidLeft && !solidRight && !solidBottom && solidTop) {
                texX = 6;
                texY = 2;
            }
        }
        return new PIXI.Sprite(new PIXI.Texture(ClassicTileProvider_1.textureSheet.baseTexture, new PIXI.Rectangle(texX * 32, texY * 32, 32, 32)));
    }
};
ClassicTileProvider = ClassicTileProvider_1 = __decorate([
    Decorator_1.staticImplements()
], ClassicTileProvider);
exports.ClassicTileProvider = ClassicTileProvider;
var ClassicTileProvider_1;
},{"../../../common/DunGen":11,"./Decorator":8}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function staticImplements() {
    return (constructor) => { };
}
exports.staticImplements = staticImplements;
},{}],9:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const TemplateRoom_1 = require("../../../common/TemplateRoom");
const Decorator_1 = require("./Decorator");
let StandardTemplateRoomProvider = StandardTemplateRoomProvider_1 = class StandardTemplateRoomProvider {
    static ready() {
        return __awaiter(this, void 0, void 0, function* () {
            let p = new Promise((resolve, reject) => {
                if (this.templates === undefined) {
                    let req = new XMLHttpRequest();
                    req.open("GET", "/templates.json");
                    req.addEventListener("load", function (e) {
                        let templates = JSON.parse(this.responseText).map((d) => new TemplateRoom_1.TemplateRoom(d));
                        StandardTemplateRoomProvider_1.templates = templates;
                        resolve();
                        // templates.forEach( (t) => console.log(t.toString()) );
                        // let dungeon = (window as any).dungeon = DunGen(templates, { height: 100, width: 100 });
                        // main(dungeon);
                    });
                    req.addEventListener("error", reject);
                    req.send();
                }
                else {
                    resolve();
                }
            });
            return p;
        });
    }
    static isReady() {
        return this.templates !== undefined;
    }
};
StandardTemplateRoomProvider = StandardTemplateRoomProvider_1 = __decorate([
    Decorator_1.staticImplements()
], StandardTemplateRoomProvider);
exports.StandardTemplateRoomProvider = StandardTemplateRoomProvider;
var StandardTemplateRoomProvider_1;
},{"../../../common/TemplateRoom":13,"./Decorator":8}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable max-classes-per-file
const _Key = require("./Key");
exports.Key = _Key;
class Juggler {
    constructor(fps) {
        this.fps = fps;
        this.enterFrameFunctions = [];
        this.interFrameTime = 1000 / fps;
        this.schedule = Date.now() + this.interFrameTime;
        let tick = () => {
            this.enterFrameFunctions.forEach(([fn, ctx]) => fn.call(ctx));
            this.schedule += this.interFrameTime;
            let timeout = this.schedule - Date.now();
            if (timeout < 2) {
                timeout = 2;
                this.schedule = Date.now() + this.interFrameTime;
            }
            setTimeout(tick, this.schedule - Date.now());
        };
        setTimeout(tick, this.interFrameTime);
    }
    setFPS(fps) {
        this.interFrameTime = 1000 / fps;
    }
    add(fn, context) {
        if (this.has(fn, context) < 0) {
            this.enterFrameFunctions.push([fn, context]);
        }
    }
    remove(fn, context) {
        let idx = this.has(fn, context);
        if (idx >= 0) {
            this.enterFrameFunctions.splice(idx, 1);
        }
    }
    has(fn, context) {
        for (let [i, oef] of enumerate(this.enterFrameFunctions)) {
            if (oef[0] === fn && oef[1] === context)
                return i;
        }
        return -1;
    }
    afterFrames(numFrames, fn, context) {
        let wrapper = () => {
            numFrames--;
            if (numFrames <= 0) {
                fn.call(context);
                this.remove(wrapper);
            }
        };
        this.add(wrapper);
    }
}
exports.juggler = new Juggler(60);
class Root {
    setApp(app) {
        if (!this._app)
            this._app = app;
        else
            throw new Error("App is already set");
    }
    get stage() {
        if (this._app)
            return this._app.stage;
        else
            throw new Error("Stage is not yet set");
    }
    get app() {
        if (this._app)
            return this._app;
        else
            throw new Error("App is not yet set");
    }
}
exports.root = window.root = new Root();
class Keyboard {
    constructor() {
        this.keys = [];
        window.addEventListener("keydown", (e) => this.keys[e.keyCode] = true);
        window.addEventListener("keyup", (e) => this.keys[e.keyCode] = false);
    }
    isKeyDown(keycode) {
        return this.keys[keycode] || false;
    }
}
exports.keyboard = new Keyboard();
var ControllerAxis;
(function (ControllerAxis) {
    ControllerAxis[ControllerAxis["LEFT_X"] = 0] = "LEFT_X";
    ControllerAxis[ControllerAxis["LEFT_Y"] = 1] = "LEFT_Y";
    ControllerAxis[ControllerAxis["RIGHT_X"] = 2] = "RIGHT_X";
    ControllerAxis[ControllerAxis["RIGHT_Y"] = 3] = "RIGHT_Y";
})(ControllerAxis = exports.ControllerAxis || (exports.ControllerAxis = {}));
var ControllerButton;
(function (ControllerButton) {
    ControllerButton[ControllerButton["A"] = 0] = "A";
    ControllerButton[ControllerButton["B"] = 1] = "B";
    ControllerButton[ControllerButton["X"] = 2] = "X";
    ControllerButton[ControllerButton["Y"] = 3] = "Y";
    ControllerButton[ControllerButton["LB"] = 4] = "LB";
    ControllerButton[ControllerButton["RB"] = 5] = "RB";
    ControllerButton[ControllerButton["LT"] = 6] = "LT";
    ControllerButton[ControllerButton["RT"] = 7] = "RT";
    ControllerButton[ControllerButton["SELECT"] = 8] = "SELECT";
    ControllerButton[ControllerButton["START"] = 9] = "START";
    ControllerButton[ControllerButton["L3"] = 10] = "L3";
    ControllerButton[ControllerButton["R3"] = 11] = "R3";
    ControllerButton[ControllerButton["D_UP"] = 12] = "D_UP";
    ControllerButton[ControllerButton["D_DOWN"] = 13] = "D_DOWN";
    ControllerButton[ControllerButton["D_LEFT"] = 14] = "D_LEFT";
    ControllerButton[ControllerButton["D_RIGHT"] = 15] = "D_RIGHT";
})(ControllerButton = exports.ControllerButton || (exports.ControllerButton = {}));
class Controller {
    constructor() {
        this.buttons = [];
        this.axes = [];
        exports.juggler.add(() => {
            let gps = navigator.getGamepads();
            if (!gps[0]) {
                this.buttons = [];
                this.axes = [];
                return;
            }
            let gamepad = gps[0];
            this.buttons = gamepad.buttons.map((b) => b.pressed);
            this.axes = gamepad.axes;
        });
    }
    getAxis(axis) {
        return this.axes[axis] || 0;
    }
    getButton(button) {
        return this.buttons[button] || false;
    }
}
exports.controller = new Controller();
class SoundManager {
    constructor() {
        this.music = {};
        this.tags = {};
        exports.juggler.add(() => this.tags = {});
    }
    playSound(name, volume = 1, tag) {
        if (tag) {
            if (!this.tags[tag]) {
                this.tags[tag] = true;
            }
            else {
                return;
            }
        }
        let audio = new Audio(name);
        audio.volume = volume * SoundManager.GLOBAL_VOLUME;
        audio.play();
        audio.onended = () => audio.remove();
    }
    playMusic(name, volume = 1) {
        if (this.music.hasOwnProperty(name)) {
            if (!isNaN(this.music[name].fade))
                window.clearInterval(this.music[name].fade);
            this.music[name].song.volume = volume * SoundManager.GLOBAL_VOLUME;
            return;
        }
        let audio = new Audio(name);
        audio.volume = volume * SoundManager.GLOBAL_VOLUME;
        audio.loop = true;
        audio.play();
        this.music[name] = {
            song: audio,
            fade: NaN,
        };
    }
    fadeMusicOut(name) {
        if (!this.music.hasOwnProperty(name) || !isNaN(this.music[name].fade))
            return;
        let fadeStart = this.music[name].song.volume;
        let fadeTime = 30;
        this.music[name].fade = window.setInterval(() => {
            fadeTime--;
            if (fadeTime <= 0) {
                this.music[name].song.pause();
                this.music[name].song.remove();
                window.clearInterval(this.music[name].fade);
                delete this.music[name];
            }
            else {
                this.music[name].song.volume = fadeTime / 30 * fadeStart;
            }
        }, 16);
    }
    setMusicVolume(name, volume) {
        if (!this.music.hasOwnProperty(name))
            return;
        this.music[name].song.volume = volume * SoundManager.GLOBAL_VOLUME;
    }
}
SoundManager.GLOBAL_VOLUME = 0.4;
exports.soundManager = new SoundManager();
},{"./Key":3}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Map2D_1 = require("./Map2D");
const TemplateRoom_1 = require("./TemplateRoom");
const seedrandom = require("seedrandom");
const utils_1 = require("./utils");
let defaults = {
    width: 50,
    height: 50,
};
var ETiles;
(function (ETiles) {
    ETiles[ETiles["SOLID"] = -1] = "SOLID";
    ETiles[ETiles["EMPTY"] = 0] = "EMPTY";
    ETiles[ETiles["WALL"] = 1] = "WALL";
    ETiles[ETiles["TOP_DOOR"] = 2] = "TOP_DOOR";
    ETiles[ETiles["BOTTOM_DOOR"] = 3] = "BOTTOM_DOOR";
    ETiles[ETiles["LEFT_DOOR"] = 4] = "LEFT_DOOR";
    ETiles[ETiles["RIGHT_DOOR"] = 5] = "RIGHT_DOOR";
    ETiles[ETiles["LADDER"] = 6] = "LADDER";
})(ETiles = exports.ETiles || (exports.ETiles = {}));
function oppositeDirection(dir) {
    switch (dir) {
        case TemplateRoom_1.Direction.TOP: return TemplateRoom_1.Direction.BOTTOM;
        case TemplateRoom_1.Direction.BOTTOM: return TemplateRoom_1.Direction.TOP;
        case TemplateRoom_1.Direction.LEFT: return TemplateRoom_1.Direction.RIGHT;
        case TemplateRoom_1.Direction.RIGHT: return TemplateRoom_1.Direction.LEFT;
    }
}
const directions = [TemplateRoom_1.Direction.TOP, TemplateRoom_1.Direction.BOTTOM, TemplateRoom_1.Direction.LEFT, TemplateRoom_1.Direction.RIGHT];
function addOpenDoor(x, y, room, direction, openDoors) {
    if (room.doorways[direction] < 0)
        return;
    if (direction === TemplateRoom_1.Direction.TOP) {
        openDoors.push({ direction: direction, x: x + room.doorways[direction], y: y });
    }
    else if (direction === TemplateRoom_1.Direction.BOTTOM) {
        openDoors.push({ direction: direction, x: x + room.doorways[direction], y: y + room.height - 1 });
    }
    else if (direction === TemplateRoom_1.Direction.LEFT) {
        openDoors.push({ direction: direction, x: x, y: y + room.doorways[direction] });
    }
    else if (direction === TemplateRoom_1.Direction.RIGHT) {
        openDoors.push({ direction: direction, x: x + room.width - 1, y: y + room.doorways[direction] });
    }
}
function addOpenDoors(x, y, room, openDoors, exculde = []) {
    for (let dir of directions) {
        if (exculde.indexOf(dir) >= 0 || room.doorways[dir] < 0)
            continue;
        addOpenDoor(x, y, room, dir, openDoors);
    }
}
function roomCanAttach(direction, candidateRoom) {
    return candidateRoom.doorways[oppositeDirection(direction)] >= 0;
}
function connectedRoomXY(door, room) {
    let connectingDoor = room.doorways[oppositeDirection(door.direction)];
    switch (door.direction) {
        case TemplateRoom_1.Direction.TOP: return { x: door.x - connectingDoor, y: door.y - room.height };
        case TemplateRoom_1.Direction.BOTTOM: return { x: door.x - connectingDoor, y: door.y + 1 };
        case TemplateRoom_1.Direction.LEFT: return { x: door.x - room.width, y: door.y - connectingDoor };
        case TemplateRoom_1.Direction.RIGHT: return { x: door.x + 1, y: door.y - connectingDoor };
        default: throw new Error("Invalid direction");
    }
}
function DunGen(templates, opts) {
    opts = opts || {};
    for (let key of utils_1.Keys(defaults)) {
        if (opts[key] === undefined)
            opts[key] = defaults[key];
    }
    let prng = seedrandom(opts.seed);
    let dungeon = new Dungeon(opts.width, opts.height, opts.seed || "");
    let openDoors = [];
    templates = fyShuffle(templates, prng);
    let root = templates[0];
    let x = Math.floor((dungeon.width - root.width) / 2);
    let y = Math.floor((dungeon.height - root.height) / 2);
    if (!dungeon.paint(root, x, y)) {
        return dungeon;
    }
    addOpenDoors(x, y, root, openDoors);
    while (openDoors.length) {
        openDoors = fyShuffle(openDoors, prng);
        let door = openDoors.pop();
        templates = fyShuffle(templates, prng);
        for (let candidate of templates) {
            if (!roomCanAttach(door.direction, candidate))
                continue;
            let xy = connectedRoomXY(door, candidate);
            if (dungeon.paint(candidate, xy.x, xy.y)) {
                addOpenDoors(xy.x, xy.y, candidate, openDoors, [oppositeDirection(door.direction)]);
            }
        }
    }
    dungeon = dungeon.map((tile, x, y, dungeon) => {
        if (tile === ETiles.SOLID || tile === ETiles.WALL) {
            if (y > 0 && y < dungeon.height - 1) {
                let top = dungeon.tiles.get(x, y - 1);
                let bottom = dungeon.tiles.get(x, y + 1);
                if (((top === TemplateRoom_1.Direction.BOTTOM || top === 0) && (bottom === TemplateRoom_1.Direction.TOP || bottom === 0))
                    && top !== bottom) {
                    return TemplateRoom_1.Direction.BOTTOM;
                }
            }
            if (x > 0 && x < dungeon.width - 1) {
                let left = dungeon.tiles.get(x - 1, y);
                let right = dungeon.tiles.get(x + 1, y);
                if (((left === TemplateRoom_1.Direction.RIGHT || left === 0) && (right === TemplateRoom_1.Direction.LEFT || right === 0))
                    && left !== right) {
                    return 0;
                }
            }
        }
        if (directions.indexOf(tile) < 0)
            return tile;
        if (x > 0 && x < dungeon.width - 1 && y > 0 && y < dungeon.height - 1) {
            let xy = { x: 0, y: 0 };
            switch (tile) {
                case TemplateRoom_1.Direction.TOP:
                    xy.y = -1;
                    break;
                case TemplateRoom_1.Direction.BOTTOM:
                    xy.y = 1;
                    break;
                case TemplateRoom_1.Direction.LEFT:
                    xy.x = -1;
                    break;
                case TemplateRoom_1.Direction.RIGHT:
                    xy.x = 1;
                    break;
            }
            if (dungeon.tiles.get(x + xy.x, y + xy.y) === oppositeDirection(tile)) {
                return tile === TemplateRoom_1.Direction.BOTTOM ? TemplateRoom_1.Direction.BOTTOM : ETiles.EMPTY;
            }
            else {
                if (x > 1 && x < dungeon.width - 2 && y > 1 && y < dungeon.height - 2) {
                    let reach = dungeon.tiles.get(x + xy.x * 2, y + xy.y * 2);
                    if (reach === ETiles.EMPTY || reach === oppositeDirection(tile)) {
                        return tile === TemplateRoom_1.Direction.BOTTOM ? TemplateRoom_1.Direction.BOTTOM : ETiles.EMPTY;
                    }
                }
            }
        }
        return ETiles.WALL;
    });
    let ladderSeeds = [];
    for (let i = 0; i < dungeon.width - 1; i++) {
        for (let j = 0; j < dungeon.width - 1; j++) {
            if (dungeon.tiles.get(i, j) === ETiles.EMPTY && dungeon.tiles.get(i + 1, j) === ETiles.EMPTY) {
                let bl = dungeon.tiles.get(i, j + 1);
                let br = dungeon.tiles.get(i + 1, j + 1);
                if (bl === 1 && br === TemplateRoom_1.Direction.BOTTOM) {
                    ladderSeeds.push({ x: i + 1, y: j + 1 });
                }
                else if (bl === TemplateRoom_1.Direction.BOTTOM && br === ETiles.WALL) {
                    ladderSeeds.push({ x: i, y: j + 1 });
                }
            }
        }
    }
    ladderSeeds = fyShuffle(ladderSeeds, prng);
    function eraseBottomDoor(x, y) {
        if (dungeon.tiles.get(x, y) === TemplateRoom_1.Direction.BOTTOM) {
            dungeon.tiles.set(x, y, ETiles.EMPTY);
            eraseBottomDoor(x - 1, y);
            eraseBottomDoor(x + 1, y);
        }
    }
    while (ladderSeeds.length > 0) {
        let seed = ladderSeeds.pop();
        if (dungeon.tiles.get(seed.x, seed.y) !== TemplateRoom_1.Direction.BOTTOM)
            continue;
        while (dungeon.tiles.get(seed.x, seed.y) !== ETiles.WALL) {
            if (dungeon.tiles.get(seed.x, seed.y) === TemplateRoom_1.Direction.BOTTOM) {
                eraseBottomDoor(seed.x, seed.y);
            }
            dungeon.tiles.set(seed.x, seed.y, ETiles.LADDER);
            seed.y++;
        }
    }
    return dungeon.map((t) => t === ETiles.SOLID ? ETiles.WALL : t === ETiles.BOTTOM_DOOR ? ETiles.EMPTY : t);
}
exports.DunGen = DunGen;
class Dungeon {
    constructor(width, height, seed, initializer = () => -1) {
        this.width = width;
        this.height = height;
        this.seed = seed;
        this.tiles = new Map2D_1.Map2D();
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                this.tiles.set(i, j, initializer(i, j));
            }
        }
    }
    paint(room, x, y) {
        if (x < 0 || y < 0 || x + room.width > this.width || y + room.height > this.height)
            return false;
        for (let i = 0; i < room.width; i++) {
            for (let j = 0; j < room.height; j++) {
                let tile = this.tiles.get(x + i, y + j);
                if (tile === undefined || tile !== ETiles.SOLID)
                    return false;
            }
        }
        for (let i = 0; i < room.width; i++) {
            for (let j = 0; j < room.height; j++) {
                this.tiles.set(x + i, y + j, room.tiles.get(i, j));
            }
        }
        return true;
    }
    map(fn) {
        return new Dungeon(this.width, this.height, this.seed, (x, y) => {
            return fn(this.tiles.get(x, y), x, y, this);
        });
    }
}
exports.Dungeon = Dungeon;
function fyShuffle(arr, prng) {
    arr = arr.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        let swp = Math.floor(prng() * (i + 1));
        let temp = arr[i];
        arr[i] = arr[swp];
        arr[swp] = temp;
    }
    return arr;
}
},{"./Map2D":12,"./TemplateRoom":13,"./utils":14,"seedrandom":15}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Map2D {
    constructor() {
        this.data = [];
    }
    set(i, j, data) {
        if (i < 0 || j < 0)
            throw new Error("Map2D index out of bounds.");
        this.data[cpf(i + 1, j + 1) - 1] = data;
    }
    get(i, j) {
        if (i < 0 || j < 0)
            throw new Error("Map2D index out of bounds.");
        return this.data[cpf(i + 1, j + 1) - 1];
    }
}
exports.Map2D = Map2D;
function cpf(i, j) {
    return ((i + j - 2) * (i + j - 1) + i) / 2;
}
},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Map2D_1 = require("./Map2D");
var Direction;
(function (Direction) {
    Direction[Direction["TOP"] = 2] = "TOP";
    Direction[Direction["BOTTOM"] = 3] = "BOTTOM";
    Direction[Direction["LEFT"] = 4] = "LEFT";
    Direction[Direction["RIGHT"] = 5] = "RIGHT";
})(Direction = exports.Direction || (exports.Direction = {}));
class TemplateRoom {
    constructor(data) {
        this.tiles = new Map2D_1.Map2D();
        this.doorways = [];
        this.doorways[Direction.TOP] = -1;
        this.doorways[Direction.BOTTOM] = -1;
        this.doorways[Direction.LEFT] = -1;
        this.doorways[Direction.RIGHT] = -1;
        this.width = data[0].length;
        this.height = data.length;
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                this.tiles.set(i, j, data[j][i]);
            }
        }
        for (let i = 0; i < this.width; i++) {
            if (this.tiles.get(i, 0) === 0) {
                this.doorways[Direction.TOP] = i;
                this.tiles.set(i, 0, Direction.TOP);
            }
            if (this.tiles.get(i, this.height - 1) === 0) {
                this.doorways[Direction.BOTTOM] = i;
                this.tiles.set(i, this.height - 1, Direction.BOTTOM);
            }
        }
        for (let i = 0; i < this.height; i++) {
            if (this.tiles.get(0, i) === 0) {
                this.doorways[Direction.LEFT] = i;
                this.tiles.set(0, i, Direction.LEFT);
            }
            if (this.tiles.get(this.width - 1, i) === 0) {
                this.doorways[Direction.RIGHT] = i;
                this.tiles.set(this.width - 1, i, Direction.RIGHT);
            }
        }
    }
    toString() {
        let repr = "";
        for (let j = 0; j < this.height; j++) {
            for (let i = 0; i < this.width; i++) {
                switch (this.tiles.get(i, j)) {
                    case 1:
                        repr += "██";
                        break;
                    case 2:
                        repr += "^^";
                        break;
                    case 3:
                        repr += "vv";
                        break;
                    case 4:
                        repr += "<<";
                        break;
                    case 5:
                        repr += ">>";
                        break;
                    default: repr += "  ";
                }
            }
            repr += "\n";
        }
        return repr;
    }
}
exports.TemplateRoom = TemplateRoom;
},{"./Map2D":12}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vennIntersection = (l1, l2, sort) => {
    l1 = l1.slice().sort(sort);
    l2 = l2.slice().sort(sort);
    if (!sort)
        sort = (a, b) => a < b ? -1 : a > b ? 1 : 0;
    let l1elements = [];
    let l2elements = [];
    let both = [];
    while (l1.length && l2.length) {
        let ord = sort(l1[0], l2[0]);
        if (ord === 0) {
            both.push(l1.shift());
            l2.shift();
        }
        else if (ord < 1) {
            l1elements.push(l1.shift());
        }
        else {
            l2elements.push(l2.shift());
        }
    }
    return {
        l1: l1elements.concat(l1),
        l2: l2elements.concat(l2),
        both,
    };
};
exports.Keys = (obj) => Object.keys(obj);
},{}],15:[function(require,module,exports){
// A library of seedable RNGs implemented in Javascript.
//
// Usage:
//
// var seedrandom = require('seedrandom');
// var random = seedrandom(1); // or any seed.
// var x = random();       // 0 <= x < 1.  Every bit is random.
// var x = random.quick(); // 0 <= x < 1.  32 bits of randomness.

// alea, a 53-bit multiply-with-carry generator by Johannes Baagøe.
// Period: ~2^116
// Reported to pass all BigCrush tests.
var alea = require('./lib/alea');

// xor128, a pure xor-shift generator by George Marsaglia.
// Period: 2^128-1.
// Reported to fail: MatrixRank and LinearComp.
var xor128 = require('./lib/xor128');

// xorwow, George Marsaglia's 160-bit xor-shift combined plus weyl.
// Period: 2^192-2^32
// Reported to fail: CollisionOver, SimpPoker, and LinearComp.
var xorwow = require('./lib/xorwow');

// xorshift7, by François Panneton and Pierre L'ecuyer, takes
// a different approach: it adds robustness by allowing more shifts
// than Marsaglia's original three.  It is a 7-shift generator
// with 256 bits, that passes BigCrush with no systmatic failures.
// Period 2^256-1.
// No systematic BigCrush failures reported.
var xorshift7 = require('./lib/xorshift7');

// xor4096, by Richard Brent, is a 4096-bit xor-shift with a
// very long period that also adds a Weyl generator. It also passes
// BigCrush with no systematic failures.  Its long period may
// be useful if you have many generators and need to avoid
// collisions.
// Period: 2^4128-2^32.
// No systematic BigCrush failures reported.
var xor4096 = require('./lib/xor4096');

// Tyche-i, by Samuel Neves and Filipe Araujo, is a bit-shifting random
// number generator derived from ChaCha, a modern stream cipher.
// https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf
// Period: ~2^127
// No systematic BigCrush failures reported.
var tychei = require('./lib/tychei');

// The original ARC4-based prng included in this library.
// Period: ~2^1600
var sr = require('./seedrandom');

sr.alea = alea;
sr.xor128 = xor128;
sr.xorwow = xorwow;
sr.xorshift7 = xorshift7;
sr.xor4096 = xor4096;
sr.tychei = tychei;

module.exports = sr;

},{"./lib/alea":16,"./lib/tychei":17,"./lib/xor128":18,"./lib/xor4096":19,"./lib/xorshift7":20,"./lib/xorwow":21,"./seedrandom":22}],16:[function(require,module,exports){
// A port of an algorithm by Johannes Baagøe <baagoe@baagoe.com>, 2010
// http://baagoe.com/en/RandomMusings/javascript/
// https://github.com/nquinlan/better-random-numbers-for-javascript-mirror
// Original work is under MIT license -

// Copyright (C) 2010 by Johannes Baagøe <baagoe@baagoe.org>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.



(function(global, module, define) {

function Alea(seed) {
  var me = this, mash = Mash();

  me.next = function() {
    var t = 2091639 * me.s0 + me.c * 2.3283064365386963e-10; // 2^-32
    me.s0 = me.s1;
    me.s1 = me.s2;
    return me.s2 = t - (me.c = t | 0);
  };

  // Apply the seeding algorithm from Baagoe.
  me.c = 1;
  me.s0 = mash(' ');
  me.s1 = mash(' ');
  me.s2 = mash(' ');
  me.s0 -= mash(seed);
  if (me.s0 < 0) { me.s0 += 1; }
  me.s1 -= mash(seed);
  if (me.s1 < 0) { me.s1 += 1; }
  me.s2 -= mash(seed);
  if (me.s2 < 0) { me.s2 += 1; }
  mash = null;
}

function copy(f, t) {
  t.c = f.c;
  t.s0 = f.s0;
  t.s1 = f.s1;
  t.s2 = f.s2;
  return t;
}

function impl(seed, opts) {
  var xg = new Alea(seed),
      state = opts && opts.state,
      prng = xg.next;
  prng.int32 = function() { return (xg.next() * 0x100000000) | 0; }
  prng.double = function() {
    return prng() + (prng() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
  };
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

function Mash() {
  var n = 0xefc8249d;

  var mash = function(data) {
    data = data.toString();
    for (var i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      var h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };

  return mash;
}


if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
} else {
  this.alea = impl;
}

})(
  this,
  (typeof module) == 'object' && module,    // present in node.js
  (typeof define) == 'function' && define   // present with an AMD loader
);



},{}],17:[function(require,module,exports){
// A Javascript implementaion of the "Tyche-i" prng algorithm by
// Samuel Neves and Filipe Araujo.
// See https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  // Set up generator function.
  me.next = function() {
    var b = me.b, c = me.c, d = me.d, a = me.a;
    b = (b << 25) ^ (b >>> 7) ^ c;
    c = (c - d) | 0;
    d = (d << 24) ^ (d >>> 8) ^ a;
    a = (a - b) | 0;
    me.b = b = (b << 20) ^ (b >>> 12) ^ c;
    me.c = c = (c - d) | 0;
    me.d = (d << 16) ^ (c >>> 16) ^ a;
    return me.a = (a - b) | 0;
  };

  /* The following is non-inverted tyche, which has better internal
   * bit diffusion, but which is about 25% slower than tyche-i in JS.
  me.next = function() {
    var a = me.a, b = me.b, c = me.c, d = me.d;
    a = (me.a + me.b | 0) >>> 0;
    d = me.d ^ a; d = d << 16 ^ d >>> 16;
    c = me.c + d | 0;
    b = me.b ^ c; b = b << 12 ^ d >>> 20;
    me.a = a = a + b | 0;
    d = d ^ a; me.d = d = d << 8 ^ d >>> 24;
    me.c = c = c + d | 0;
    b = b ^ c;
    return me.b = (b << 7 ^ b >>> 25);
  }
  */

  me.a = 0;
  me.b = 0;
  me.c = 2654435769 | 0;
  me.d = 1367130551;

  if (seed === Math.floor(seed)) {
    // Integer seed.
    me.a = (seed / 0x100000000) | 0;
    me.b = seed | 0;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 20; k++) {
    me.b ^= strseed.charCodeAt(k) | 0;
    me.next();
  }
}

function copy(f, t) {
  t.a = f.a;
  t.b = f.b;
  t.c = f.c;
  t.d = f.d;
  return t;
};

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
} else {
  this.tychei = impl;
}

})(
  this,
  (typeof module) == 'object' && module,    // present in node.js
  (typeof define) == 'function' && define   // present with an AMD loader
);



},{}],18:[function(require,module,exports){
// A Javascript implementaion of the "xor128" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  me.x = 0;
  me.y = 0;
  me.z = 0;
  me.w = 0;

  // Set up generator function.
  me.next = function() {
    var t = me.x ^ (me.x << 11);
    me.x = me.y;
    me.y = me.z;
    me.z = me.w;
    return me.w ^= (me.w >>> 19) ^ t ^ (t >>> 8);
  };

  if (seed === (seed | 0)) {
    // Integer seed.
    me.x = seed;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 64; k++) {
    me.x ^= strseed.charCodeAt(k) | 0;
    me.next();
  }
}

function copy(f, t) {
  t.x = f.x;
  t.y = f.y;
  t.z = f.z;
  t.w = f.w;
  return t;
}

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
} else {
  this.xor128 = impl;
}

})(
  this,
  (typeof module) == 'object' && module,    // present in node.js
  (typeof define) == 'function' && define   // present with an AMD loader
);



},{}],19:[function(require,module,exports){
// A Javascript implementaion of Richard Brent's Xorgens xor4096 algorithm.
//
// This fast non-cryptographic random number generator is designed for
// use in Monte-Carlo algorithms. It combines a long-period xorshift
// generator with a Weyl generator, and it passes all common batteries
// of stasticial tests for randomness while consuming only a few nanoseconds
// for each prng generated.  For background on the generator, see Brent's
// paper: "Some long-period random number generators using shifts and xors."
// http://arxiv.org/pdf/1004.3115v1.pdf
//
// Usage:
//
// var xor4096 = require('xor4096');
// random = xor4096(1);                        // Seed with int32 or string.
// assert.equal(random(), 0.1520436450538547); // (0, 1) range, 53 bits.
// assert.equal(random.int32(), 1806534897);   // signed int32, 32 bits.
//
// For nonzero numeric keys, this impelementation provides a sequence
// identical to that by Brent's xorgens 3 implementaion in C.  This
// implementation also provides for initalizing the generator with
// string seeds, or for saving and restoring the state of the generator.
//
// On Chrome, this prng benchmarks about 2.1 times slower than
// Javascript's built-in Math.random().

(function(global, module, define) {

function XorGen(seed) {
  var me = this;

  // Set up generator function.
  me.next = function() {
    var w = me.w,
        X = me.X, i = me.i, t, v;
    // Update Weyl generator.
    me.w = w = (w + 0x61c88647) | 0;
    // Update xor generator.
    v = X[(i + 34) & 127];
    t = X[i = ((i + 1) & 127)];
    v ^= v << 13;
    t ^= t << 17;
    v ^= v >>> 15;
    t ^= t >>> 12;
    // Update Xor generator array state.
    v = X[i] = v ^ t;
    me.i = i;
    // Result is the combination.
    return (v + (w ^ (w >>> 16))) | 0;
  };

  function init(me, seed) {
    var t, v, i, j, w, X = [], limit = 128;
    if (seed === (seed | 0)) {
      // Numeric seeds initialize v, which is used to generates X.
      v = seed;
      seed = null;
    } else {
      // String seeds are mixed into v and X one character at a time.
      seed = seed + '\0';
      v = 0;
      limit = Math.max(limit, seed.length);
    }
    // Initialize circular array and weyl value.
    for (i = 0, j = -32; j < limit; ++j) {
      // Put the unicode characters into the array, and shuffle them.
      if (seed) v ^= seed.charCodeAt((j + 32) % seed.length);
      // After 32 shuffles, take v as the starting w value.
      if (j === 0) w = v;
      v ^= v << 10;
      v ^= v >>> 15;
      v ^= v << 4;
      v ^= v >>> 13;
      if (j >= 0) {
        w = (w + 0x61c88647) | 0;     // Weyl.
        t = (X[j & 127] ^= (v + w));  // Combine xor and weyl to init array.
        i = (0 == t) ? i + 1 : 0;     // Count zeroes.
      }
    }
    // We have detected all zeroes; make the key nonzero.
    if (i >= 128) {
      X[(seed && seed.length || 0) & 127] = -1;
    }
    // Run the generator 512 times to further mix the state before using it.
    // Factoring this as a function slows the main generator, so it is just
    // unrolled here.  The weyl generator is not advanced while warming up.
    i = 127;
    for (j = 4 * 128; j > 0; --j) {
      v = X[(i + 34) & 127];
      t = X[i = ((i + 1) & 127)];
      v ^= v << 13;
      t ^= t << 17;
      v ^= v >>> 15;
      t ^= t >>> 12;
      X[i] = v ^ t;
    }
    // Storing state as object members is faster than using closure variables.
    me.w = w;
    me.X = X;
    me.i = i;
  }

  init(me, seed);
}

function copy(f, t) {
  t.i = f.i;
  t.w = f.w;
  t.X = f.X.slice();
  return t;
};

function impl(seed, opts) {
  if (seed == null) seed = +(new Date);
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (state.X) copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
} else {
  this.xor4096 = impl;
}

})(
  this,                                     // window object or global
  (typeof module) == 'object' && module,    // present in node.js
  (typeof define) == 'function' && define   // present with an AMD loader
);

},{}],20:[function(require,module,exports){
// A Javascript implementaion of the "xorshift7" algorithm by
// François Panneton and Pierre L'ecuyer:
// "On the Xorgshift Random Number Generators"
// http://saluc.engr.uconn.edu/refs/crypto/rng/panneton05onthexorshift.pdf

(function(global, module, define) {

function XorGen(seed) {
  var me = this;

  // Set up generator function.
  me.next = function() {
    // Update xor generator.
    var X = me.x, i = me.i, t, v, w;
    t = X[i]; t ^= (t >>> 7); v = t ^ (t << 24);
    t = X[(i + 1) & 7]; v ^= t ^ (t >>> 10);
    t = X[(i + 3) & 7]; v ^= t ^ (t >>> 3);
    t = X[(i + 4) & 7]; v ^= t ^ (t << 7);
    t = X[(i + 7) & 7]; t = t ^ (t << 13); v ^= t ^ (t << 9);
    X[i] = v;
    me.i = (i + 1) & 7;
    return v;
  };

  function init(me, seed) {
    var j, w, X = [];

    if (seed === (seed | 0)) {
      // Seed state array using a 32-bit integer.
      w = X[0] = seed;
    } else {
      // Seed state using a string.
      seed = '' + seed;
      for (j = 0; j < seed.length; ++j) {
        X[j & 7] = (X[j & 7] << 15) ^
            (seed.charCodeAt(j) + X[(j + 1) & 7] << 13);
      }
    }
    // Enforce an array length of 8, not all zeroes.
    while (X.length < 8) X.push(0);
    for (j = 0; j < 8 && X[j] === 0; ++j);
    if (j == 8) w = X[7] = -1; else w = X[j];

    me.x = X;
    me.i = 0;

    // Discard an initial 256 values.
    for (j = 256; j > 0; --j) {
      me.next();
    }
  }

  init(me, seed);
}

function copy(f, t) {
  t.x = f.x.slice();
  t.i = f.i;
  return t;
}

function impl(seed, opts) {
  if (seed == null) seed = +(new Date);
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (state.x) copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
} else {
  this.xorshift7 = impl;
}

})(
  this,
  (typeof module) == 'object' && module,    // present in node.js
  (typeof define) == 'function' && define   // present with an AMD loader
);


},{}],21:[function(require,module,exports){
// A Javascript implementaion of the "xorwow" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  // Set up generator function.
  me.next = function() {
    var t = (me.x ^ (me.x >>> 2));
    me.x = me.y; me.y = me.z; me.z = me.w; me.w = me.v;
    return (me.d = (me.d + 362437 | 0)) +
       (me.v = (me.v ^ (me.v << 4)) ^ (t ^ (t << 1))) | 0;
  };

  me.x = 0;
  me.y = 0;
  me.z = 0;
  me.w = 0;
  me.v = 0;

  if (seed === (seed | 0)) {
    // Integer seed.
    me.x = seed;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 64; k++) {
    me.x ^= strseed.charCodeAt(k) | 0;
    if (k == strseed.length) {
      me.d = me.x << 10 ^ me.x >>> 4;
    }
    me.next();
  }
}

function copy(f, t) {
  t.x = f.x;
  t.y = f.y;
  t.z = f.z;
  t.w = f.w;
  t.v = f.v;
  t.d = f.d;
  return t;
}

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
} else {
  this.xorwow = impl;
}

})(
  this,
  (typeof module) == 'object' && module,    // present in node.js
  (typeof define) == 'function' && define   // present with an AMD loader
);



},{}],22:[function(require,module,exports){
/*
Copyright 2014 David Bau.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

(function (pool, math) {
//
// The following constants are related to IEEE 754 limits.
//
var global = this,
    width = 256,        // each RC4 output is 0 <= x < 256
    chunks = 6,         // at least six RC4 outputs for each double
    digits = 52,        // there are 52 significant digits in a double
    rngname = 'random', // rngname: name for Math.random and Math.seedrandom
    startdenom = math.pow(width, chunks),
    significance = math.pow(2, digits),
    overflow = significance * 2,
    mask = width - 1,
    nodecrypto;         // node.js crypto module, initialized at the bottom.

//
// seedrandom()
// This is the seedrandom function described above.
//
function seedrandom(seed, options, callback) {
  var key = [];
  options = (options == true) ? { entropy: true } : (options || {});

  // Flatten the seed string or build one from local entropy if needed.
  var shortseed = mixkey(flatten(
    options.entropy ? [seed, tostring(pool)] :
    (seed == null) ? autoseed() : seed, 3), key);

  // Use the seed to initialize an ARC4 generator.
  var arc4 = new ARC4(key);

  // This function returns a random double in [0, 1) that contains
  // randomness in every bit of the mantissa of the IEEE 754 value.
  var prng = function() {
    var n = arc4.g(chunks),             // Start with a numerator n < 2 ^ 48
        d = startdenom,                 //   and denominator d = 2 ^ 48.
        x = 0;                          //   and no 'extra last byte'.
    while (n < significance) {          // Fill up all significant digits by
      n = (n + x) * width;              //   shifting numerator and
      d *= width;                       //   denominator and generating a
      x = arc4.g(1);                    //   new least-significant-byte.
    }
    while (n >= overflow) {             // To avoid rounding up, before adding
      n /= 2;                           //   last byte, shift everything
      d /= 2;                           //   right using integer math until
      x >>>= 1;                         //   we have exactly the desired bits.
    }
    return (n + x) / d;                 // Form the number within [0, 1).
  };

  prng.int32 = function() { return arc4.g(4) | 0; }
  prng.quick = function() { return arc4.g(4) / 0x100000000; }
  prng.double = prng;

  // Mix the randomness into accumulated entropy.
  mixkey(tostring(arc4.S), pool);

  // Calling convention: what to return as a function of prng, seed, is_math.
  return (options.pass || callback ||
      function(prng, seed, is_math_call, state) {
        if (state) {
          // Load the arc4 state from the given state if it has an S array.
          if (state.S) { copy(state, arc4); }
          // Only provide the .state method if requested via options.state.
          prng.state = function() { return copy(arc4, {}); }
        }

        // If called as a method of Math (Math.seedrandom()), mutate
        // Math.random because that is how seedrandom.js has worked since v1.0.
        if (is_math_call) { math[rngname] = prng; return seed; }

        // Otherwise, it is a newer calling convention, so return the
        // prng directly.
        else return prng;
      })(
  prng,
  shortseed,
  'global' in options ? options.global : (this == math),
  options.state);
}
math['seed' + rngname] = seedrandom;

//
// ARC4
//
// An ARC4 implementation.  The constructor takes a key in the form of
// an array of at most (width) integers that should be 0 <= x < (width).
//
// The g(count) method returns a pseudorandom integer that concatenates
// the next (count) outputs from ARC4.  Its return value is a number x
// that is in the range 0 <= x < (width ^ count).
//
function ARC4(key) {
  var t, keylen = key.length,
      me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];

  // The empty key [] is treated as [0].
  if (!keylen) { key = [keylen++]; }

  // Set up S using the standard key scheduling algorithm.
  while (i < width) {
    s[i] = i++;
  }
  for (i = 0; i < width; i++) {
    s[i] = s[j = mask & (j + key[i % keylen] + (t = s[i]))];
    s[j] = t;
  }

  // The "g" method returns the next (count) outputs as one number.
  (me.g = function(count) {
    // Using instance members instead of closure state nearly doubles speed.
    var t, r = 0,
        i = me.i, j = me.j, s = me.S;
    while (count--) {
      t = s[i = mask & (i + 1)];
      r = r * width + s[mask & ((s[i] = s[j = mask & (j + t)]) + (s[j] = t))];
    }
    me.i = i; me.j = j;
    return r;
    // For robust unpredictability, the function call below automatically
    // discards an initial batch of values.  This is called RC4-drop[256].
    // See http://google.com/search?q=rsa+fluhrer+response&btnI
  })(width);
}

//
// copy()
// Copies internal state of ARC4 to or from a plain object.
//
function copy(f, t) {
  t.i = f.i;
  t.j = f.j;
  t.S = f.S.slice();
  return t;
};

//
// flatten()
// Converts an object tree to nested arrays of strings.
//
function flatten(obj, depth) {
  var result = [], typ = (typeof obj), prop;
  if (depth && typ == 'object') {
    for (prop in obj) {
      try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
    }
  }
  return (result.length ? result : typ == 'string' ? obj : obj + '\0');
}

//
// mixkey()
// Mixes a string seed into a key that is an array of integers, and
// returns a shortened string seed that is equivalent to the result key.
//
function mixkey(seed, key) {
  var stringseed = seed + '', smear, j = 0;
  while (j < stringseed.length) {
    key[mask & j] =
      mask & ((smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++));
  }
  return tostring(key);
}

//
// autoseed()
// Returns an object for autoseeding, using window.crypto and Node crypto
// module if available.
//
function autoseed() {
  try {
    var out;
    if (nodecrypto && (out = nodecrypto.randomBytes)) {
      // The use of 'out' to remember randomBytes makes tight minified code.
      out = out(width);
    } else {
      out = new Uint8Array(width);
      (global.crypto || global.msCrypto).getRandomValues(out);
    }
    return tostring(out);
  } catch (e) {
    var browser = global.navigator,
        plugins = browser && browser.plugins;
    return [+new Date, global, plugins, global.screen, tostring(pool)];
  }
}

//
// tostring()
// Converts an array of charcodes to a string
//
function tostring(a) {
  return String.fromCharCode.apply(0, a);
}

//
// When seedrandom.js is loaded, we immediately mix a few bits
// from the built-in RNG into the entropy pool.  Because we do
// not want to interfere with deterministic PRNG state later,
// seedrandom will not call math.random on its own again after
// initialization.
//
mixkey(math.random(), pool);

//
// Nodejs and AMD support: export the implementation as a module using
// either convention.
//
if ((typeof module) == 'object' && module.exports) {
  module.exports = seedrandom;
  // When in node.js, try using crypto package for autoseeding.
  try {
    nodecrypto = require('crypto');
  } catch (ex) {}
} else if ((typeof define) == 'function' && define.amd) {
  define(function() { return seedrandom; });
}

// End anonymous scope, and pass initial values.
})(
  [],     // pool: entropy pool starts empty
  Math    // math: package containing random, pow, and seedrandom
);

},{"crypto":1}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL21pa2ViL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL3dhdGNoLXRzL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOi9Vc2Vycy9taWtlYi9BcHBEYXRhL1JvYW1pbmcvbnBtL25vZGVfbW9kdWxlcy93YXRjaC10cy9ub2RlX21vZHVsZXMvYnJvd3Nlci1yZXNvbHZlL2VtcHR5LmpzIiwic3JjL0dhbWVWaWV3LnRzIiwic3JjL0tleS50cyIsInNyYy9hY3RvcnMvUGxheWVyLnRzIiwic3JjL21haW4udHMiLCJzcmMvbWFwL1dvcmxkTWFwLnRzIiwic3JjL3Byb3ZpZGVycy9DbGFzc2ljVGlsZVByb3ZpZGVyLnRzIiwic3JjL3Byb3ZpZGVycy9EZWNvcmF0b3IudHMiLCJzcmMvcHJvdmlkZXJzL1N0YW5kYXJkVGVtcGxhdGVSb29tUHJvdmlkZXIudHMiLCJzcmMvcm9vdC50cyIsIi4uL2NvbW1vbi9EdW5HZW4udHMiLCIuLi9jb21tb24vTWFwMkQudHMiLCIuLi9jb21tb24vVGVtcGxhdGVSb29tLnRzIiwiLi4vY29tbW9uL3V0aWxzLnRzIiwiLi4vbm9kZV9tb2R1bGVzL3NlZWRyYW5kb20vaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvc2VlZHJhbmRvbS9saWIvYWxlYS5qcyIsIi4uL25vZGVfbW9kdWxlcy9zZWVkcmFuZG9tL2xpYi90eWNoZWkuanMiLCIuLi9ub2RlX21vZHVsZXMvc2VlZHJhbmRvbS9saWIveG9yMTI4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3NlZWRyYW5kb20vbGliL3hvcjQwOTYuanMiLCIuLi9ub2RlX21vZHVsZXMvc2VlZHJhbmRvbS9saWIveG9yc2hpZnQ3LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3NlZWRyYW5kb20vbGliL3hvcndvdy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zZWVkcmFuZG9tL3NlZWRyYW5kb20uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7OztBQ0NBLDRDQUF5QztBQUN6Qyw4Q0FBNEQ7QUFFNUQsY0FBc0IsU0FBUSxJQUFJLENBQUMsU0FBUztJQUl4QyxZQUFtQixHQUFhLEVBQVMsT0FBaUM7UUFDdEUsS0FBSyxFQUFFLENBQUM7UUFETyxRQUFHLEdBQUgsR0FBRyxDQUFVO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBMEI7UUFGbEUsZ0JBQVcsR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUl2QyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFTSxNQUFNLENBQUMsS0FBc0I7UUFDaEMsSUFBSSxNQUFNLEdBQUcsWUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoQyxJQUFJLFdBQVcsR0FBRyxZQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RDLElBQUksRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxHQUFHLHdCQUFnQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN0RixLQUFLLElBQUksRUFBRSxJQUFJLEtBQUssRUFBRTtZQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksZUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDL0M7UUFDRCxLQUFLLElBQUksRUFBRSxJQUFJLE9BQU8sRUFBRTtZQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMzQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDM0I7UUFDRCxLQUFLLElBQUksRUFBRSxJQUFJLE9BQU8sRUFBRTtZQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDOUM7SUFDTCxDQUFDO0NBQ0o7QUEzQkQsNEJBMkJDOzs7O0FDL0JZLFFBQUEsU0FBUyxHQUFHLENBQUMsQ0FBQztBQUNkLFFBQUEsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUNSLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNWLFFBQUEsR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUNULFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNmLFFBQUEsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNaLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUNiLFFBQUEsU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNmLFFBQUEsR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUNULFFBQUEsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNWLFFBQUEsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNWLFFBQUEsRUFBRSxHQUFHLEVBQUUsQ0FBQztBQUNSLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNWLFFBQUEsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNaLFFBQUEsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNaLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNaLFFBQUEsUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNkLFFBQUEsUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNkLFFBQUEsUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNkLFFBQUEsUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNkLFFBQUEsUUFBUSxHQUFHLEdBQUcsQ0FBQztBQUNmLFFBQUEsUUFBUSxHQUFHLEdBQUcsQ0FBQztBQUNmLFFBQUEsUUFBUSxHQUFHLEdBQUcsQ0FBQztBQUNmLFFBQUEsUUFBUSxHQUFHLEdBQUcsQ0FBQztBQUNmLFFBQUEsUUFBUSxHQUFHLEdBQUcsQ0FBQztBQUNmLFFBQUEsUUFBUSxHQUFHLEdBQUcsQ0FBQztBQUNmLFFBQUEsUUFBUSxHQUFHLEdBQUcsQ0FBQztBQUNmLFFBQUEsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUNWLFFBQUEsUUFBUSxHQUFHLEdBQUcsQ0FBQztBQUNmLFFBQUEsYUFBYSxHQUFHLEdBQUcsQ0FBQztBQUNwQixRQUFBLE1BQU0sR0FBRyxHQUFHLENBQUM7QUFDYixRQUFBLEVBQUUsR0FBRyxHQUFHLENBQUM7QUFDVCxRQUFBLEVBQUUsR0FBRyxHQUFHLENBQUM7QUFDVCxRQUFBLEVBQUUsR0FBRyxHQUFHLENBQUM7QUFDVCxRQUFBLEVBQUUsR0FBRyxHQUFHLENBQUM7QUFDVCxRQUFBLEVBQUUsR0FBRyxHQUFHLENBQUM7QUFDVCxRQUFBLEVBQUUsR0FBRyxHQUFHLENBQUM7QUFDVCxRQUFBLEVBQUUsR0FBRyxHQUFHLENBQUM7QUFDVCxRQUFBLEVBQUUsR0FBRyxHQUFHLENBQUM7QUFDVCxRQUFBLEVBQUUsR0FBRyxHQUFHLENBQUM7QUFDVCxRQUFBLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDVixRQUFBLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDVixRQUFBLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDVixRQUFBLFFBQVEsR0FBRyxHQUFHLENBQUM7QUFDZixRQUFBLFdBQVcsR0FBRyxHQUFHLENBQUM7QUFDbEIsUUFBQSxTQUFTLEdBQUcsR0FBRyxDQUFDO0FBQ2hCLFFBQUEsTUFBTSxHQUFHLEdBQUcsQ0FBQztBQUNiLFFBQUEsS0FBSyxHQUFHLEdBQUcsQ0FBQztBQUNaLFFBQUEsSUFBSSxHQUFHLEdBQUcsQ0FBQztBQUNYLFFBQUEsTUFBTSxHQUFHLEdBQUcsQ0FBQztBQUNiLFFBQUEsYUFBYSxHQUFHLEdBQUcsQ0FBQztBQUNwQixRQUFBLFlBQVksR0FBRyxHQUFHLENBQUM7QUFDbkIsUUFBQSxZQUFZLEdBQUcsR0FBRyxDQUFDO0FBQ25CLFFBQUEsVUFBVSxHQUFHLEdBQUcsQ0FBQztBQUNqQixRQUFBLFlBQVksR0FBRyxHQUFHLENBQUM7QUFDbkIsUUFBQSxZQUFZLEdBQUcsR0FBRyxDQUFDOzs7O0FDaEdoQyxZQUFvQixTQUFRLElBQUksQ0FBQyxTQUFTO0lBRXRDLFlBQVksS0FBYTtRQUNyQixLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksUUFBUSxHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ25DLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0IsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNoQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQWE7UUFDaEIsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNyQixDQUFDO0NBQ0o7QUFsQkQsd0JBa0JDOzs7Ozs7Ozs7Ozs7QUNsQkQsaUNBQXNEO0FBQ3RELDJGQUF3RjtBQUN4RixnREFBeUQ7QUFDekQseUVBQXNFO0FBQ3RFLDZDQUEwQztBQUMxQyx5Q0FBc0M7QUFFdEM7O1FBQ0ksSUFBSSxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFFO1lBQzVCLEtBQUssRUFBRSxJQUFJO1lBQ1gsTUFBTSxFQUFFLEdBQUc7WUFDWCxlQUFlLEVBQUUsUUFBUTtTQUM1QixDQUFFLENBQUM7UUFDSixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsV0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVqQixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLElBQUksR0FBRyxDQUFDLENBQUM7UUFFYixJQUFJLFVBQVUsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsR0FBRyxFQUFFLENBQUUsQ0FBQztRQUMxSSxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QixVQUFVLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzlCLFVBQVUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDL0IsV0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFaEMsY0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuQixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDakIsY0FBTyxDQUFDLEdBQUcsQ0FBRSxHQUFHLEVBQUU7WUFDZCxJQUFJLFFBQVEsR0FBRyxDQUFDLEVBQUU7Z0JBQ2QsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUNoQixHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxDQUFDO2lCQUNsQztxQkFBTTtvQkFDSCxHQUFHLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO2lCQUN4RTtnQkFDRCxRQUFRLEdBQUcsSUFBSSxDQUFDO2FBQ25CO2lCQUFNO2dCQUNILFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7YUFDekI7WUFFRCxVQUFVLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxVQUFVLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFVLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUM7UUFDbEcsQ0FBQyxDQUFFLENBQUM7UUFFSixNQUFNLDJEQUE0QixDQUFDLEtBQUssRUFBRSxDQUFDO1FBRTNDLElBQUksTUFBTSxHQUFHLEVBQUUsRUFBRSxDQUFDO1FBQ2xCLE1BQU0sQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsQ0FBTyxNQUFrQixFQUFFLEVBQUU7WUFDckQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkIsSUFBSSxPQUFPLEdBQUcsZUFBTSxDQUFDLDJEQUE0QixDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNyRSxNQUFNLHlDQUFtQixDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2xDLElBQUksR0FBRyxHQUFHLElBQUksbUJBQVEsQ0FBQyxPQUFPLEVBQUUseUNBQW1CLENBQUMsQ0FBQztZQUNyRCxJQUFJLElBQUksR0FBRyxJQUFJLG1CQUFRLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2pDLFdBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUUvQixjQUFPLENBQUMsR0FBRyxDQUFFLEdBQUcsRUFBRTtnQkFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBWTtvQkFDOUIsRUFBRSxFQUFFLGVBQVEsQ0FBQyxTQUFTLENBQUMsVUFBRyxDQUFDLEVBQUUsQ0FBQztvQkFDOUIsSUFBSSxFQUFFLGVBQVEsQ0FBQyxTQUFTLENBQUMsVUFBRyxDQUFDLElBQUksQ0FBQztvQkFDbEMsSUFBSSxFQUFFLGVBQVEsQ0FBQyxTQUFTLENBQUMsVUFBRyxDQUFDLElBQUksQ0FBQztvQkFDbEMsS0FBSyxFQUFFLGVBQVEsQ0FBQyxTQUFTLENBQUMsVUFBRyxDQUFDLEtBQUssQ0FBQztvQkFDcEMsSUFBSSxFQUFFLGVBQVEsQ0FBQyxTQUFTLENBQUMsVUFBRyxDQUFDLEtBQUssQ0FBQztpQkFDdEMsQ0FBRSxDQUFDO1lBQ1IsQ0FBQyxDQUFFLENBQUM7WUFFSixJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7WUFDbkIsSUFBSSxpQkFBaUIsR0FBRyxDQUFDLENBQUM7WUFDMUIsSUFBSSxNQUFNLEdBQXNCLEVBQUUsQ0FBQztZQUNuQyxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQWtCLEVBQUUsRUFBRTtnQkFDdEMsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQkFDN0IsSUFBSSxVQUFVLEdBQUcsQ0FBQyxFQUFFO29CQUNoQixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7b0JBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQ2hCLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLENBQUM7cUJBQzFDO3lCQUFNO3dCQUNILEdBQUcsR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7cUJBQ2hGO29CQUNELFVBQVUsR0FBRyxVQUFVLENBQUM7aUJBQzNCO3FCQUFNO29CQUNILFVBQVUsR0FBRyxVQUFVLENBQUM7aUJBQzNCO2dCQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsQ0FBQyxDQUFFLENBQUM7WUFFSixjQUFPLENBQUMsR0FBRyxDQUFFLEdBQUcsRUFBRTtnQkFDZCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUNuQixJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQzt3QkFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRyxDQUFDLENBQUM7aUJBQ2hDO1lBQ0wsQ0FBQyxDQUFFLENBQUM7WUFFSixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7WUFDakIsV0FBVyxDQUFFLEdBQUcsRUFBRTtnQkFDZCxJQUFJLFFBQVEsS0FBSyxDQUFDLEVBQUU7b0JBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3JCLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7aUJBQ3pCO1lBQ0wsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ1QsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO2dCQUNwQixJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLFFBQVEsQ0FBQztnQkFDN0IsUUFBUSxHQUFHLENBQUMsQ0FBQztZQUNqQixDQUFDLENBQUUsQ0FBQztZQUVKLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUUsQ0FBQztRQUV6RCxDQUFDLENBQUEsQ0FBRSxDQUFDO0lBRVIsQ0FBQztDQUFBO0FBRUQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQzs7OztBQzdHdEMsa0NBQStCO0FBRWxCLFFBQUEsU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUM1QixNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUM7QUFFdEIsY0FBc0IsU0FBUSxJQUFJLENBQUMsU0FBUztJQUV4QyxZQUFtQixPQUFnQixFQUFTLFFBQXVCO1FBQy9ELEtBQUssRUFBRSxDQUFDO1FBRE8sWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUFTLGFBQVEsR0FBUixRQUFRLENBQWU7UUFFL0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUU7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDbEUsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxpQkFBUyxFQUFFLE9BQU8sQ0FBQyxNQUFNLEdBQUcsaUJBQVMsQ0FBQyxDQUFDO1FBQzNGLElBQUksU0FBUyxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3JDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRyxFQUFFO1lBQ3JDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRyxFQUFFO2dCQUN0QyxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLGlCQUFTLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLGlCQUFTLENBQUM7Z0JBQ3ZCLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDNUI7U0FDSjtRQUNELFdBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDekMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDeEMsQ0FBQztDQWtFSjtBQXBGRCw0QkFvRkM7Ozs7Ozs7Ozs7QUMzRkQsbURBQXlEO0FBRXpELDJDQUErQztBQUcvQyxJQUFhLG1CQUFtQiwyQkFBaEM7SUFJVyxNQUFNLENBQUMsS0FBSztRQUNmLElBQUksQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFRLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztnQkFDOUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRTtvQkFDOUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUM7b0JBQzNELE9BQU8sRUFBRSxDQUFDO2dCQUNkLENBQUMsQ0FBRSxDQUFDO2FBQ1A7aUJBQU07Z0JBQ0gsT0FBTyxFQUFFLENBQUM7YUFDYjtRQUNMLENBQUMsQ0FBRSxDQUFDO1FBQ0osT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBRU0sTUFBTSxDQUFDLE9BQU87UUFDakIsT0FBTyxJQUFJLENBQUMsWUFBWSxLQUFLLFNBQVMsQ0FBQztJQUMzQyxDQUFDO0lBRU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFnQixFQUFFLENBQVMsRUFBRSxDQUFTO1FBQ3hELElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNuQyxJQUFJLElBQUksS0FBSyxlQUFNLENBQUMsS0FBSyxFQUFFO1lBQ3ZCLElBQUksR0FBRyxDQUFDLENBQUM7WUFDVCxJQUFJLEdBQUcsQ0FBQyxDQUFDO1NBQ1o7YUFBTSxJQUFJLElBQUksS0FBSyxlQUFNLENBQUMsTUFBTSxFQUFFO1lBQy9CLElBQUksR0FBRyxDQUFDLENBQUM7WUFDVCxJQUFJLEdBQUcsQ0FBQyxDQUFDO1NBQ1o7YUFBTSxJQUFJLElBQUksS0FBSyxlQUFNLENBQUMsSUFBSSxFQUFFO1lBQzdCLElBQUksUUFBUSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxlQUFNLENBQUMsSUFBSSxDQUFDO1lBQ3RFLElBQUksV0FBVyxHQUFHLENBQUMsS0FBSyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLGVBQU0sQ0FBQyxJQUFJLENBQUM7WUFDMUYsSUFBSSxTQUFTLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLGVBQU0sQ0FBQyxJQUFJLENBQUM7WUFDdkUsSUFBSSxVQUFVLEdBQUcsQ0FBQyxLQUFLLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssZUFBTSxDQUFDLElBQUksQ0FBQztZQUN4RixJQUFJLFFBQVEsSUFBSSxXQUFXLElBQUksU0FBUyxJQUFJLFVBQVUsRUFBRTtnQkFDcEQsSUFBSSxZQUFZLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLGVBQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ3pGLElBQUksYUFBYSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLGVBQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQzFHLElBQUksZUFBZSxHQUFHLENBQUMsS0FBSyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLGVBQU0sQ0FBQyxJQUFJLENB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Q0wsQ0FBQyxDQUFBO0FBRVksUUFBQSxJQUFJLEdBQUcsQ0FBSSxHQUFNLEVBQWUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFnQixDQUFDOztBQ3pCaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIiLCJpbXBvcnQgeyBXb3JsZE1hcCB9IGZyb20gXCIuL21hcC9Xb3JsZE1hcFwiO1xyXG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi9hY3RvcnMvUGxheWVyXCI7XHJcbmltcG9ydCB7IEtleXMsIHZlbm5JbnRlcnNlY3Rpb24gfSBmcm9tIFwiLi4vLi4vY29tbW9uL3V0aWxzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgR2FtZVZpZXcgZXh0ZW5kcyBQSVhJLkNvbnRhaW5lciB7XHJcblxyXG4gICAgcHJpdmF0ZSBwbGF5ZXJMYXllciA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBtYXA6IFdvcmxkTWFwLCBwdWJsaWMgcGxheWVyczogeyBbaWQ6IHN0cmluZ106IFBsYXllciB9KSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKG1hcCk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLnBsYXllckxheWVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKHN0YXRlOiBHYW1lU3RhdGVQYWNrZXQpIHtcclxuICAgICAgICBsZXQgb3duSWRzID0gS2V5cyh0aGlzLnBsYXllcnMpO1xyXG4gICAgICAgIGxldCBpbmNvbWluZ0lkcyA9IEtleXMoc3RhdGUucGxheWVycyk7XHJcbiAgICAgICAgbGV0IHsgbDE6IGFkZGVkLCBsMjogcmVtb3ZlZCwgYm90aDogdXBkYXRlZCB9ID0gdmVubkludGVyc2VjdGlvbihpbmNvbWluZ0lkcywgb3duSWRzKTtcclxuICAgICAgICBmb3IgKGxldCBpZCBvZiBhZGRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllcnNbaWRdID0gbmV3IFBsYXllcihzdGF0ZS5wbGF5ZXJzW2lkXSk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyTGF5ZXIuYWRkQ2hpbGQodGhpcy5wbGF5ZXJzW2lkXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGlkIG9mIHJlbW92ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJMYXllci5yZW1vdmVDaGlsZCh0aGlzLnBsYXllcnNbaWRdKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJzW2lkXS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnBsYXllcnNbaWRdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpZCBvZiB1cGRhdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyc1tpZF0udXBkYXRlKHN0YXRlLnBsYXllcnNbaWRdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY29uc3QgQkFDS1NQQUNFID0gODtcclxuZXhwb3J0IGNvbnN0IFRBQiA9IDk7XHJcbmV4cG9ydCBjb25zdCBFTlRFUiA9IDEzO1xyXG5leHBvcnQgY29uc3QgU0hJRlQgPSAxNjtcclxuZXhwb3J0IGNvbnN0IENUUkwgPSAxNztcclxuZXhwb3J0IGNvbnN0IEFMVCA9IDE4O1xyXG5leHBvcnQgY29uc3QgUEFVU0UgPSAxOTtcclxuZXhwb3J0IGNvbnN0IENBUFNfTE9DSyA9IDIwO1xyXG5leHBvcnQgY29uc3QgRVNDQVBFID0gMjc7XHJcbmV4cG9ydCBjb25zdCBTUEFDRSA9IDMyO1xyXG5leHBvcnQgY29uc3QgUEFHRV9VUCA9IDMzO1xyXG5leHBvcnQgY29uc3QgUEFHRV9ET1dOID0gMzQ7XHJcbmV4cG9ydCBjb25zdCBFTkQgPSAzNTtcclxuZXhwb3J0IGNvbnN0IEhPTUUgPSAzNjtcclxuZXhwb3J0IGNvbnN0IExFRlQgPSAzNztcclxuZXhwb3J0IGNvbnN0IFVQID0gMzg7XHJcbmV4cG9ydCBjb25zdCBSSUdIVCA9IDM5O1xyXG5leHBvcnQgY29uc3QgRE9XTiA9IDQwO1xyXG5leHBvcnQgY29uc3QgSU5TRVJUID0gNDU7XHJcbmV4cG9ydCBjb25zdCBERUxFVEUgPSA0NjtcclxuZXhwb3J0IGNvbnN0IE5VTV8wID0gNDg7XHJcbmV4cG9ydCBjb25zdCBOVU1fMSA9IDQ5O1xyXG5leHBvcnQgY29uc3QgTlVNXzIgPSA1MDtcclxuZXhwb3J0IGNvbnN0IE5VTV8zID0gNTE7XHJcbmV4cG9ydCBjb25zdCBOVU1fNCA9IDUyO1xyXG5leHBvcnQgY29uc3QgTlVNXzUgPSA1MztcclxuZXhwb3J0IGNvbnN0IE5VTV82ID0gNTQ7XHJcbmV4cG9ydCBjb25zdCBOVU1fNyA9IDU1O1xyXG5leHBvcnQgY29uc3QgTlVNXzggPSA1NjtcclxuZXhwb3J0IGNvbnN0IE5VTV85ID0gNTc7XHJcbmV4cG9ydCBjb25zdCBBID0gNjU7XHJcbmV4cG9ydCBjb25zdCBCID0gNjY7XHJcbmV4cG9ydCBjb25zdCBDID0gNjc7XHJcbmV4cG9ydCBjb25zdCBEID0gNjg7XHJcbmV4cG9ydCBjb25zdCBFID0gNjk7XHJcbmV4cG9ydCBjb25zdCBGID0gNzA7XHJcbmV4cG9ydCBjb25zdCBHID0gNzE7XHJcbmV4cG9ydCBjb25zdCBIID0gNzI7XHJcbmV4cG9ydCBjb25zdCBJID0gNzM7XHJcbmV4cG9ydCBjb25zdCBKID0gNzQ7XHJcbmV4cG9ydCBjb25zdCBLID0gNzU7XHJcbmV4cG9ydCBjb25zdCBMID0gNzY7XHJcbmV4cG9ydCBjb25zdCBNID0gNzc7XHJcbmV4cG9ydCBjb25zdCBOID0gNzg7XHJcbmV4cG9ydCBjb25zdCBPID0gNzk7XHJcbmV4cG9ydCBjb25zdCBQID0gODA7XHJcbmV4cG9ydCBjb25zdCBRID0gODE7XHJcbmV4cG9ydCBjb25zdCBSID0gODI7XHJcbmV4cG9ydCBjb25zdCBTID0gODM7XHJcbmV4cG9ydCBjb25zdCBUID0gODQ7XHJcbmV4cG9ydCBjb25zdCBVID0gODU7XHJcbmV4cG9ydCBjb25zdCBWID0gODY7XHJcbmV4cG9ydCBjb25zdCBXID0gODc7XHJcbmV4cG9ydCBjb25zdCBYID0gODg7XHJcbmV4cG9ydCBjb25zdCBZID0gODk7XHJcbmV4cG9ydCBjb25zdCBaID0gOTA7XHJcbmV4cG9ydCBjb25zdCBTRUxFQ1QgPSA5MztcclxuZXhwb3J0IGNvbnN0IE5VTVBBRF8wID0gOTY7XHJcbmV4cG9ydCBjb25zdCBOVU1QQURfMSA9IDk3O1xyXG5leHBvcnQgY29uc3QgTlVNUEFEXzIgPSA5ODtcclxuZXhwb3J0IGNvbnN0IE5VTVBBRF8zID0gOTk7XHJcbmV4cG9ydCBjb25zdCBOVU1QQURfNCA9IDEwMDtcclxuZXhwb3J0IGNvbnN0IE5VTVBBRF81ID0gMTAxO1xyXG5leHBvcnQgY29uc3QgTlVNUEFEXzYgPSAxMDI7XHJcbmV4cG9ydCBjb25zdCBOVU1QQURfNyA9IDEwMztcclxuZXhwb3J0IGNvbnN0IE5VTVBBRF84ID0gMTA0O1xyXG5leHBvcnQgY29uc3QgTlVNUEFEXzkgPSAxMDU7XHJcbmV4cG9ydCBjb25zdCBNVUxUSVBMWSA9IDEwNjtcclxuZXhwb3J0IGNvbnN0IEFERCA9IDEwNztcclxuZXhwb3J0IGNvbnN0IFNVQlRSQUNUID0gMTA5O1xyXG5leHBvcnQgY29uc3QgREVDSU1BTF9QT0lOVCA9IDExMDtcclxuZXhwb3J0IGNvbnN0IERJVklERSA9IDExMTtcclxuZXhwb3J0IGNvbnN0IEYxID0gMTEyO1xyXG5leHBvcnQgY29uc3QgRjIgPSAxMTM7XHJcbmV4cG9ydCBjb25zdCBGMyA9IDExNDtcclxuZXhwb3J0IGNvbnN0IEY0ID0gMTE1O1xyXG5leHBvcnQgY29uc3QgRjUgPSAxMTY7XHJcbmV4cG9ydCBjb25zdCBGNiA9IDExNztcclxuZXhwb3J0IGNvbnN0IEY3ID0gMTE4O1xyXG5leHBvcnQgY29uc3QgRjggPSAxMTk7XHJcbmV4cG9ydCBjb25zdCBGOSA9IDEyMDtcclxuZXhwb3J0IGNvbnN0IEYxMCA9IDEyMTtcclxuZXhwb3J0IGNvbnN0IEYxMSA9IDEyMjtcclxuZXhwb3J0IGNvbnN0IEYxMiA9IDEyMztcclxuZXhwb3J0IGNvbnN0IE5VTV9MT0NLID0gMTQ0O1xyXG5leHBvcnQgY29uc3QgU0NST0xMX0xPQ0sgPSAxNDU7XHJcbmV4cG9ydCBjb25zdCBTRU1JQ09MT04gPSAxODY7XHJcbmV4cG9ydCBjb25zdCBFUVVBTFMgPSAxODc7XHJcbmV4cG9ydCBjb25zdCBDT01NQSA9IDE4ODtcclxuZXhwb3J0IGNvbnN0IERBU0ggPSAxODk7XHJcbmV4cG9ydCBjb25zdCBQRVJJT0QgPSAxOTA7XHJcbmV4cG9ydCBjb25zdCBGT1JXQVJEX1NMQVNIID0gMTkxO1xyXG5leHBvcnQgY29uc3QgR1JBVkVfQUNDRU5UID0gMTkyO1xyXG5leHBvcnQgY29uc3QgT1BFTl9CUkFDS0VUID0gMjE5O1xyXG5leHBvcnQgY29uc3QgQkFDS19TTEFTSCA9IDIyMDtcclxuZXhwb3J0IGNvbnN0IENMT1NFX0JSQUtFVCA9IDIyMTtcclxuZXhwb3J0IGNvbnN0IFNJTkdMRV9RVU9URSA9IDIyMjtcclxuIiwiZXhwb3J0IGNsYXNzIFBsYXllciBleHRlbmRzIFBJWEkuQ29udGFpbmVyIHtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3Ioc3RhdGU6IElQb2ludCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcclxuICAgICAgICBncmFwaGljcy5iZWdpbkZpbGwoMHgwMDAwRkYpO1xyXG4gICAgICAgIGdyYXBoaWNzLmRyYXdSZWN0KDAsIDAsIDI1LCAyNSk7XHJcbiAgICAgICAgZ3JhcGhpY3MuZW5kRmlsbCgpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQoZ3JhcGhpY3MpO1xyXG4gICAgICAgIHRoaXMueCA9IHN0YXRlLng7XHJcbiAgICAgICAgdGhpcy55ID0gc3RhdGUueTtcclxuICAgICAgICB0aGlzLnBpdm90LnNldCgxMi41LCAyNSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKHN0YXRlOiBJUG9pbnQpIHtcclxuICAgICAgICB0aGlzLnggPSBzdGF0ZS54O1xyXG4gICAgICAgIHRoaXMueSA9IHN0YXRlLnk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyByb290LCBqdWdnbGVyLCBrZXlib2FyZCwgS2V5IH0gZnJvbSBcIi4vcm9vdFwiO1xyXG5pbXBvcnQgeyBTdGFuZGFyZFRlbXBsYXRlUm9vbVByb3ZpZGVyIH0gZnJvbSBcIi4vcHJvdmlkZXJzL1N0YW5kYXJkVGVtcGxhdGVSb29tUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgRHVuR2VuLCBEdW5HZW5PcHRzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9EdW5HZW5cIjtcclxuaW1wb3J0IHsgQ2xhc3NpY1RpbGVQcm92aWRlciB9IGZyb20gXCIuL3Byb3ZpZGVycy9DbGFzc2ljVGlsZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IFdvcmxkTWFwIH0gZnJvbSBcIi4vbWFwL1dvcmxkTWFwXCI7XHJcbmltcG9ydCB7IEdhbWVWaWV3IH0gZnJvbSBcIi4vR2FtZVZpZXdcIjtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIG1haW4oKSB7XHJcbiAgICBsZXQgYXBwID0gbmV3IFBJWEkuQXBwbGljYXRpb24oIHtcclxuICAgICAgICB3aWR0aDogMTYwMCxcclxuICAgICAgICBoZWlnaHQ6IDkwMCxcclxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IDB4MTYxNjE2LFxyXG4gICAgfSApO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhcHAudmlldyk7XHJcbiAgICByb290LnNldEFwcChhcHApO1xyXG5cclxuICAgIGxldCBmcHMgPSA2MDtcclxuICAgIGxldCB0cHMgPSA2MDtcclxuICAgIGxldCBwaW5nID0gMDtcclxuXHJcbiAgICBsZXQgZnBzRGlzcGxheSA9IG5ldyBQSVhJLlRleHQoXCIwXCIsIHsgYWxpZ246IFwicmlnaHRcIiwgZm9udEZhbWlseTogXCJDb3VyaWVyIE5ld1wiLCBmb250U2l6ZTogMTcsIHN0cm9rZTogMHhGRkZGRkYsIHN0cm9rZVRoaWNrbmVzczogMC41IH0gKTtcclxuICAgIGZwc0Rpc3BsYXkuYW5jaG9yLnNldCgxKTtcclxuICAgIGZwc0Rpc3BsYXkueCA9IGFwcC52aWV3LndpZHRoO1xyXG4gICAgZnBzRGlzcGxheS55ID0gYXBwLnZpZXcuaGVpZ2h0O1xyXG4gICAgcm9vdC5zdGFnZS5hZGRDaGlsZChmcHNEaXNwbGF5KTtcclxuXHJcbiAgICBqdWdnbGVyLnNldEZQUyg3MCk7XHJcbiAgICBsZXQgbGFzdFRpY2sgPSAwO1xyXG4gICAganVnZ2xlci5hZGQoICgpID0+IHtcclxuICAgICAgICBpZiAobGFzdFRpY2sgPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCB0aWNrID0gRGF0ZS5ub3coKTtcclxuICAgICAgICAgICAgaWYgKCFpc0Zpbml0ZShmcHMpKSB7XHJcbiAgICAgICAgICAgICAgICBmcHMgPSAxMDAwIC8gKHRpY2sgLSBsYXN0VGljayk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmcHMgPSBmcHMgKiAwLjk5ICsgKE1hdGgubWluKDEwMDAgLyAodGljayAtIGxhc3RUaWNrKSwgMTAwMCkpICogMC4wMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsYXN0VGljayA9IHRpY2s7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGFzdFRpY2sgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnBzRGlzcGxheS50ZXh0ID0gcGluZyArIFwiIFBpbmcgXFxuXCIgKyB0cHMudG9GaXhlZCgxKSArIFwiIFdvcmxkXFxuXCIgKyBmcHMudG9GaXhlZCgxKSArIFwiIEhvbWUgXCI7XHJcbiAgICB9ICk7XHJcblxyXG4gICAgYXdhaXQgU3RhbmRhcmRUZW1wbGF0ZVJvb21Qcm92aWRlci5yZWFkeSgpO1xyXG4gICAgXHJcbiAgICBsZXQgc29ja2V0ID0gaW8oKTtcclxuICAgIHNvY2tldC5vbihcImR1bmdlb25fcGFyYW1zXCIsIGFzeW5jIChwYXJhbXM6IER1bkdlbk9wdHMpID0+IHtcclxuICAgICAgICBzb2NrZXQub2ZmKFwiZHVuZ2Vvbl9wYXJhbXNcIik7XHJcbiAgICAgICAgc29ja2V0LmVtaXQoXCJhY2tcIik7XHJcbiAgICAgICAgbGV0IGR1bmdlb24gPSBEdW5HZW4oU3RhbmRhcmRUZW1wbGF0ZVJvb21Qcm92aWRlci50ZW1wbGF0ZXMsIHBhcmFtcyk7XHJcbiAgICAgICAgYXdhaXQgQ2xhc3NpY1RpbGVQcm92aWRlci5yZWFkeSgpO1xyXG4gICAgICAgIGxldCBtYXAgPSBuZXcgV29ybGRNYXAoZHVuZ2VvbiwgQ2xhc3NpY1RpbGVQcm92aWRlcik7XHJcbiAgICAgICAgbGV0IHZpZXcgPSBuZXcgR2FtZVZpZXcobWFwLCB7fSk7XHJcbiAgICAgICAgcm9vdC5zdGFnZS5hZGRDaGlsZEF0KHZpZXcsIDApO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGp1Z2dsZXIuYWRkKCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNvY2tldC5lbWl0KFwiY29udHJvbHNcIiwgPENvbnRyb2xzPntcclxuICAgICAgICAgICAgICAgIHVwOiBrZXlib2FyZC5pc0tleURvd24oS2V5LlVQKSxcclxuICAgICAgICAgICAgICAgIGRvd246IGtleWJvYXJkLmlzS2V5RG93bihLZXkuRE9XTiksXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiBrZXlib2FyZC5pc0tleURvd24oS2V5LkxFRlQpLFxyXG4gICAgICAgICAgICAgICAgcmlnaHQ6IGtleWJvYXJkLmlzS2V5RG93bihLZXkuUklHSFQpLFxyXG4gICAgICAgICAgICAgICAganVtcDoga2V5Ym9hcmQuaXNLZXlEb3duKEtleS5TUEFDRSksXHJcbiAgICAgICAgICAgIH0gKTtcclxuICAgICAgICB9ICk7XHJcblxyXG4gICAgICAgIGxldCBsYXN0VXBkYXRlID0gMDtcclxuICAgICAgICBsZXQgc3RhdGVCdWZmZXJMZW5ndGggPSAyO1xyXG4gICAgICAgIGxldCBzdGF0ZXM6IEdhbWVTdGF0ZVBhY2tldFtdID0gW107XHJcbiAgICAgICAgc29ja2V0Lm9uKFwic3RhdGVcIiwgKHM6IEdhbWVTdGF0ZVBhY2tldCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdXBkYXRlVGltZSA9IHMudGltZXN0YW1wO1xyXG4gICAgICAgICAgICBpZiAobGFzdFVwZGF0ZSA+IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCB1cGRhdGVUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgICAgICAgICAgICAgIGlmICghaXNGaW5pdGUodHBzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRwcyA9IDEwMDAgLyAodXBkYXRlVGltZSAtIGxhc3RVcGRhdGUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0cHMgPSB0cHMgKiAwLjk5ICsgKE1hdGgubWluKDEwMDAgLyAodXBkYXRlVGltZSAtIGxhc3RVcGRhdGUpLCAxMDAwKSkgKiAwLjAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGFzdFVwZGF0ZSA9IHVwZGF0ZVRpbWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsYXN0VXBkYXRlID0gdXBkYXRlVGltZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc3RhdGVzLnB1c2gocyk7XHJcbiAgICAgICAgfSApO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGp1Z2dsZXIuYWRkKCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzdGF0ZXMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlcy5sZW5ndGggPiA1KSBzdGF0ZXMuc2xpY2UoLTUpO1xyXG4gICAgICAgICAgICAgICAgdmlldy51cGRhdGUoc3RhdGVzLnNoaWZ0KCkhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gKTtcclxuXHJcbiAgICAgICAgbGV0IHBpbmdUaW1lID0gMDtcclxuICAgICAgICBzZXRJbnRlcnZhbCggKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocGluZ1RpbWUgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHNvY2tldC5lbWl0KFwiX3BpbmdcIik7XHJcbiAgICAgICAgICAgICAgICBwaW5nVGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICBzb2NrZXQub24oXCJfcG9uZ1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHBpbmcgPSBEYXRlLm5vdygpIC0gcGluZ1RpbWU7XHJcbiAgICAgICAgICAgIHBpbmdUaW1lID0gMDtcclxuICAgICAgICB9ICk7XHJcblxyXG4gICAgICAgIHNvY2tldC5vbihcInJlbG9hZFwiLCAoKSA9PiB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCkgKTtcclxuXHJcbiAgICB9ICk7XHJcblxyXG59XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgbWFpbik7IiwiaW1wb3J0IHsgRHVuZ2VvbiwgRVRpbGVzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9EdW5HZW5cIjtcclxuaW1wb3J0IHsgSVRpbGVQcm92aWRlciB9IGZyb20gXCIuLi9wcm92aWRlcnMvSVRpbGVQcm92aWRlclwiO1xyXG5pbXBvcnQgeyByb290IH0gZnJvbSBcIi4uL3Jvb3RcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBUSUxFX1NJWkUgPSAzMjtcclxuY29uc3QgRVBTSUxPTiA9IDAuMDAxO1xyXG5cclxuZXhwb3J0IGNsYXNzIFdvcmxkTWFwIGV4dGVuZHMgUElYSS5Db250YWluZXIge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkdW5nZW9uOiBEdW5nZW9uLCBwdWJsaWMgcHJvdmlkZXI6IElUaWxlUHJvdmlkZXIpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIGlmICghcHJvdmlkZXIuaXNSZWFkeSgpKSB0aHJvdyBuZXcgRXJyb3IoXCJQcm92aWRlciBpcyBub3QgcmVhZHlcIik7XHJcbiAgICAgICAgbGV0IHRleCA9IFBJWEkuUmVuZGVyVGV4dHVyZS5jcmVhdGUoZHVuZ2Vvbi53aWR0aCAqIFRJTEVfU0laRSwgZHVuZ2Vvbi5oZWlnaHQgKiBUSUxFX1NJWkUpO1xyXG4gICAgICAgIGxldCBjb250YWluZXIgPSBuZXcgUElYSS5Db250YWluZXIoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGR1bmdlb24ud2lkdGg7IGkgKyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBkdW5nZW9uLmhlaWdodDsgaiArKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRpbGUgPSBwcm92aWRlci5nZXRUaWxlKGR1bmdlb24sIGksIGopO1xyXG4gICAgICAgICAgICAgICAgdGlsZS54ID0gaSAqIFRJTEVfU0laRTtcclxuICAgICAgICAgICAgICAgIHRpbGUueSA9IGogKiBUSUxFX1NJWkU7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYWRkQ2hpbGQodGlsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcm9vdC5hcHAucmVuZGVyZXIucmVuZGVyKGNvbnRhaW5lciwgdGV4KTtcclxuICAgICAgICBjb250YWluZXIuZGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQobmV3IFBJWEkuU3ByaXRlKHRleCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHB1YmxpYyBtb3ZlKGFjdG9yOiBBY3Rvcikge1xyXG4gICAgLy8gICAgIGxldCBjb2xsaXNpb25zID0gWzAsIDBdO1xyXG5cclxuICAgIC8vICAgICBsZXQgeHYgPSBhY3Rvci52ZWxvY2l0eS54O1xyXG4gICAgLy8gICAgIHdoaWxlICh4diAhPT0gMCkge1xyXG4gICAgLy8gICAgICAgICBsZXQgbW92ZSA9IE1hdGgubWF4KE1hdGgubWluKFRJTEVfU0laRSwgeHYpLCAtVElMRV9TSVpFKTtcclxuICAgIC8vICAgICAgICAgYWN0b3IueCArPSBtb3ZlO1xyXG4gICAgLy8gICAgICAgICB4diAtPSBtb3ZlO1xyXG4gICAgLy8gICAgICAgICBsZXQgbGVmdCA9IE1hdGguZmxvb3IoYWN0b3IubGVmdCAvIFRJTEVfU0laRSk7XHJcbiAgICAvLyAgICAgICAgIGxldCByaWdodCA9IE1hdGguZmxvb3IoYWN0b3IucmlnaHQgLyBUSUxFX1NJWkUpO1xyXG4gICAgLy8gICAgICAgICBsZXQgdG9wID0gTWF0aC5mbG9vcihhY3Rvci50b3AgLyBUSUxFX1NJWkUpO1xyXG4gICAgLy8gICAgICAgICBsZXQgYm90dG9tID0gTWF0aC5mbG9vcihhY3Rvci5ib3R0b20gLyBUSUxFX1NJWkUpO1xyXG4gICAgLy8gICAgICAgICBmb3IgKGxldCBpID0gdG9wOyBpIDw9IGJvdHRvbTsgaSArKykge1xyXG4gICAgLy8gICAgICAgICAgICAgaWYgKHRoaXMuZHVuZ2Vvbi50aWxlcy5nZXQobGVmdCwgaSkgPT09IEVUaWxlcy5XQUxMIHx8IHRoaXMuZHVuZ2Vvbi50aWxlcy5nZXQocmlnaHQsIGkpID09PSBFVGlsZXMuV0FMTCkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGlmIChtb3ZlID4gMCkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBhY3Rvci5yaWdodCA9IHJpZ2h0ICogMzIgLSBFUFNJTE9OO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBjb2xsaXNpb25zWzBdID0gMTtcclxuICAgIC8vICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBhY3Rvci5sZWZ0ID0gbGVmdCAqIDMyICsgMzIgKyBFUFNJTE9OO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBjb2xsaXNpb25zWzBdID0gLTE7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIHh2ID0gMDtcclxuICAgIC8vICAgICAgICAgICAgICAgICBhY3Rvci52ZWxvY2l0eS54ID0gMDtcclxuICAgIC8vICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH1cclxuICAgICAgICBcclxuICAgIC8vICAgICBsZXQgeXYgPSBhY3Rvci52ZWxvY2l0eS55O1xyXG4gICAgLy8gICAgIHdoaWxlICh5diAhPT0gMCkge1xyXG4gICAgLy8gICAgICAgICBsZXQgbW92ZSA9IE1hdGgubWF4KE1hdGgubWluKFRJTEVfU0laRSwgeXYpLCAtVElMRV9TSVpFKTtcclxuICAgIC8vICAgICAgICAgYWN0b3IueSArPSBtb3ZlO1xyXG4gICAgLy8gICAgICAgICB5diAtPSBtb3ZlO1xyXG4gICAgLy8gICAgICAgICBsZXQgbGVmdCA9IE1hdGguZmxvb3IoYWN0b3IubGVmdCAvIFRJTEVfU0laRSk7XHJcbiAgICAvLyAgICAgICAgIGxldCByaWdodCA9IE1hdGguZmxvb3IoYWN0b3IucmlnaHQgLyBUSUxFX1NJWkUpO1xyXG4gICAgLy8gICAgICAgICBsZXQgdG9wID0gTWF0aC5mbG9vcihhY3Rvci50b3AgLyBUSUxFX1NJWkUpO1xyXG4gICAgLy8gICAgICAgICBsZXQgYm90dG9tID0gTWF0aC5mbG9vcihhY3Rvci5ib3R0b20gLyBUSUxFX1NJWkUpO1xyXG4gICAgLy8gICAgICAgICBmb3IgKGxldCBpID0gbGVmdDsgaSA8PSByaWdodDsgaSArKykge1xyXG4gICAgLy8gICAgICAgICAgICAgaWYgKHRoaXMuZHVuZ2Vvbi50aWxlcy5nZXQoaSwgdG9wKSA9PT0gRVRpbGVzLldBTEwgfHwgdGhpcy5kdW5nZW9uLnRpbGVzLmdldChpLCBib3R0b20pID09PSBFVGlsZXMuV0FMTCkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGlmIChtb3ZlID4gMCkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBhY3Rvci5ib3R0b20gPSBib3R0b20gKiAzMiAtIEVQU0lMT047XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGNvbGxpc2lvbnNbMV0gPSAxO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGFjdG9yLnRvcCA9IHRvcCAqIDMyICsgMzIgKyBFUFNJTE9OO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBjb2xsaXNpb25zWzFdID0gLTE7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIHl2ID0gMDtcclxuICAgIC8vICAgICAgICAgICAgICAgICBhY3Rvci52ZWxvY2l0eS55ID0gMDtcclxuICAgIC8vICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH1cclxuICAgICAgICBcclxuICAgIC8vICAgICByZXR1cm4gY29sbGlzaW9ucztcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBwdWJsaWMgaXNPbkxhZGRlcihhY3RvcjogQWN0b3IpOiBib29sZWFuIHtcclxuICAgIC8vICAgICBsZXQgY2VudGVyID0gTWF0aC5mbG9vcihhY3Rvci5ob3Jpem9udGFsQ2VudGVyIC8gVElMRV9TSVpFKTtcclxuICAgIC8vICAgICBsZXQgdG9wID0gTWF0aC5mbG9vcihhY3Rvci50b3AgLyBUSUxFX1NJWkUpO1xyXG4gICAgLy8gICAgIGxldCBib3R0b20gPSBNYXRoLmZsb29yKGFjdG9yLmJvdHRvbSAvIFRJTEVfU0laRSk7XHJcblxyXG4gICAgLy8gICAgIHJldHVybiAodGhpcy5kdW5nZW9uLnRpbGVzLmdldChjZW50ZXIsIHRvcCkgPT09IEVUaWxlcy5MQURERVIgfHwgdGhpcy5kdW5nZW9uLnRpbGVzLmdldChjZW50ZXIsIGJvdHRvbSkgPT09IEVUaWxlcy5MQURERVIpO1xyXG4gICAgLy8gfVxyXG5cclxufSIsImltcG9ydCB7IER1bmdlb24sIEVUaWxlcyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vRHVuR2VuXCI7XHJcbmltcG9ydCB7IElUaWxlUHJvdmlkZXIgfSBmcm9tIFwiLi9JVGlsZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IHN0YXRpY0ltcGxlbWVudHMgfSBmcm9tIFwiLi9EZWNvcmF0b3JcIjtcclxuXHJcbkBzdGF0aWNJbXBsZW1lbnRzPElUaWxlUHJvdmlkZXI+KClcclxuZXhwb3J0IGNsYXNzIENsYXNzaWNUaWxlUHJvdmlkZXIge1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgdGV4dHVyZVNoZWV0OiBQSVhJLlRleHR1cmU7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZWFkeSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBsZXQgcCA9IG5ldyBQcm9taXNlPHZvaWQ+KCAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy50ZXh0dXJlU2hlZXQpIHtcclxuICAgICAgICAgICAgICAgIFBJWEkubG9hZGVyLmFkZChcInRpbGVzXCIsIFwiaW1nL3RpbGVzXzAwMS5wbmdcIik7XHJcbiAgICAgICAgICAgICAgICBQSVhJLmxvYWRlci5sb2FkKCk7XHJcbiAgICAgICAgICAgICAgICBQSVhJLmxvYWRlci5vbmNlKFwiY29tcGxldGVcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZVNoZWV0ID0gUElYSS5sb2FkZXIucmVzb3VyY2VzW1widGlsZXNcIl0udGV4dHVyZTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9ICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICk7XHJcbiAgICAgICAgcmV0dXJuIHA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBpc1JlYWR5KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRleHR1cmVTaGVldCAhPT0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0VGlsZShkdW5nZW9uOiBEdW5nZW9uLCB4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgICAgIGxldCB0ZXhYID0gMDtcclxuICAgICAgICBsZXQgdGV4WSA9IDA7XHJcbiAgICAgICAgbGV0IHRpbGUgPSBkdW5nZW9uLnRpbGVzLmdldCh4LCB5KTtcclxuICAgICAgICBpZiAodGlsZSA9PT0gRVRpbGVzLkVNUFRZKSB7XHJcbiAgICAgICAgICAgIHRleFggPSA1O1xyXG4gICAgICAgICAgICB0ZXhZID0gMTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRpbGUgPT09IEVUaWxlcy5MQURERVIpIHtcclxuICAgICAgICAgICAgdGV4WCA9IDU7XHJcbiAgICAgICAgICAgIHRleFkgPSAyO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGlsZSA9PT0gRVRpbGVzLldBTEwpIHtcclxuICAgICAgICAgICAgbGV0IHNvbGlkVG9wID0geSA9PT0gMCB8fCBkdW5nZW9uLnRpbGVzLmdldCh4LCB5IC0gMSkgPT09IEVUaWxlcy5XQUxMO1xyXG4gICAgICAgICAgICBsZXQgc29saWRCb3R0b20gPSB5ID09PSBkdW5nZW9uLmhlaWdodCAtIDEgfHwgZHVuZ2Vvbi50aWxlcy5nZXQoeCwgeSArIDEpID09PSBFVGlsZXMuV0FMTDtcclxuICAgICAgICAgICAgbGV0IHNvbGlkTGVmdCA9IHggPT09IDAgfHwgZHVuZ2Vvbi50aWxlcy5nZXQoeCAtIDEsIHkpID09PSBFVGlsZXMuV0FMTDtcclxuICAgICAgICAgICAgbGV0IHNvbGlkUmlnaHQgPSB4ID09PSBkdW5nZW9uLndpZHRoIC0gMSB8fCBkdW5nZW9uLnRpbGVzLmdldCh4ICsgMSwgeSkgPT09IEVUaWxlcy5XQUxMO1xyXG4gICAgICAgICAgICBpZiAoc29saWRUb3AgJiYgc29saWRCb3R0b20gJiYgc29saWRMZWZ0ICYmIHNvbGlkUmlnaHQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzb2xpZFRvcExlZnQgPSB5ID09PSAwIHx8IHggPT09IDAgfHwgZHVuZ2Vvbi50aWxlcy5nZXQoeCAtIDEsIHkgLSAxKSA9PT0gRVRpbGVzLldBTEw7XHJcbiAgICAgICAgICAgICAgICBsZXQgc29saWRUb3BSaWdodCA9IHkgPT09IDAgfHwgeCA9PT0gZHVuZ2Vvbi53aWR0aCAtIDEgfHwgZHVuZ2Vvbi50aWxlcy5nZXQoeCArIDEsIHkgLSAxKSA9PT0gRVRpbGVzLldBTEw7XHJcbiAgICAgICAgICAgICAgICBsZXQgc29saWRCb3R0b21MZWZ0ID0geSA9PT0gZHVuZ2Vvbi5oZWlnaHQgLSAxIHx8IHggPT09IDAgfHwgZHVuZ2Vvbi50aWxlcy5nZXQoeCAtIDEsIHkgKyAxKSA9PT0gRVRpbGVzLldBTEw7XHJcbiAgICAgICAgICAgICAgICBsZXQgc29saWRCb3R0b21SaWdodCA9IHkgPT09IGR1bmdlb24uaGVpZ2h0IC0gMSB8fCB4ID09PSBkdW5nZW9uLndpZHRoIC0gMSB8fCBkdW5nZW9uLnRpbGVzLmdldCh4ICsgMSwgeSArIDEpID09PSBFVGlsZXMuV0FMTDtcclxuICAgICAgICAgICAgICAgIGlmICghc29saWRUb3BMZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4WCA9IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4WSA9IDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFzb2xpZFRvcFJpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4WCA9IDQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4WSA9IDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFzb2xpZEJvdHRvbUxlZnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXhYID0gMztcclxuICAgICAgICAgICAgICAgICAgICB0ZXhZID0gMjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXNvbGlkQm90dG9tUmlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXhYID0gNDtcclxuICAgICAgICAgICAgICAgICAgICB0ZXhZID0gMjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4WCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4WSA9IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXNvbGlkTGVmdCAmJiBzb2xpZFJpZ2h0ICYmIHNvbGlkQm90dG9tICYmICFzb2xpZFRvcCkge1xyXG4gICAgICAgICAgICAgICAgdGV4WCA9IDA7XHJcbiAgICAgICAgICAgICAgICB0ZXhZID0gMDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzb2xpZExlZnQgJiYgc29saWRSaWdodCAmJiBzb2xpZEJvdHRvbSAmJiAhc29saWRUb3ApIHtcclxuICAgICAgICAgICAgICAgIHRleFggPSAxO1xyXG4gICAgICAgICAgICAgICAgdGV4WSA9IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc29saWRMZWZ0ICYmICFzb2xpZFJpZ2h0ICYmIHNvbGlkQm90dG9tICYmICFzb2xpZFRvcCkge1xyXG4gICAgICAgICAgICAgICAgdGV4WCA9IDI7XHJcbiAgICAgICAgICAgICAgICB0ZXhZID0gMDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICghc29saWRMZWZ0ICYmIHNvbGlkUmlnaHQgJiYgc29saWRCb3R0b20gJiYgc29saWRUb3ApIHtcclxuICAgICAgICAgICAgICAgIHRleFggPSAwO1xyXG4gICAgICAgICAgICAgICAgdGV4WSA9IDE7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc29saWRMZWZ0ICYmICFzb2xpZFJpZ2h0ICYmIHNvbGlkQm90dG9tICYmIHNvbGlkVG9wKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXhYID0gMjtcclxuICAgICAgICAgICAgICAgIHRleFkgPSAxO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFzb2xpZExlZnQgJiYgc29saWRSaWdodCAmJiAhc29saWRCb3R0b20gJiYgc29saWRUb3ApIHtcclxuICAgICAgICAgICAgICAgIHRleFggPSAwO1xyXG4gICAgICAgICAgICAgICAgdGV4WSA9IDI7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc29saWRMZWZ0ICYmIHNvbGlkUmlnaHQgJiYgIXNvbGlkQm90dG9tICYmIHNvbGlkVG9wKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXhYID0gMTtcclxuICAgICAgICAgICAgICAgIHRleFkgPSAyO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNvbGlkTGVmdCAmJiAhc29saWRSaWdodCAmJiAhc29saWRCb3R0b20gJiYgc29saWRUb3ApIHtcclxuICAgICAgICAgICAgICAgIHRleFggPSAyO1xyXG4gICAgICAgICAgICAgICAgdGV4WSA9IDI7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXNvbGlkTGVmdCAmJiBzb2xpZFJpZ2h0ICYmICFzb2xpZEJvdHRvbSAmJiAhc29saWRUb3ApIHtcclxuICAgICAgICAgICAgICAgIHRleFggPSAzO1xyXG4gICAgICAgICAgICAgICAgdGV4WSA9IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc29saWRMZWZ0ICYmIHNvbGlkUmlnaHQgJiYgIXNvbGlkQm90dG9tICYmICFzb2xpZFRvcCkge1xyXG4gICAgICAgICAgICAgICAgdGV4WCA9IDQ7XHJcbiAgICAgICAgICAgICAgICB0ZXhZID0gMDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzb2xpZExlZnQgJiYgIXNvbGlkUmlnaHQgJiYgIXNvbGlkQm90dG9tICYmICFzb2xpZFRvcCkge1xyXG4gICAgICAgICAgICAgICAgdGV4WCA9IDU7XHJcbiAgICAgICAgICAgICAgICB0ZXhZID0gMDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICghc29saWRMZWZ0ICYmICFzb2xpZFJpZ2h0ICYmIHNvbGlkQm90dG9tICYmICFzb2xpZFRvcCkge1xyXG4gICAgICAgICAgICAgICAgdGV4WCA9IDY7XHJcbiAgICAgICAgICAgICAgICB0ZXhZID0gMDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICghc29saWRMZWZ0ICYmICFzb2xpZFJpZ2h0ICYmIHNvbGlkQm90dG9tICYmIHNvbGlkVG9wKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXhYID0gNjtcclxuICAgICAgICAgICAgICAgIHRleFkgPSAxO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFzb2xpZExlZnQgJiYgIXNvbGlkUmlnaHQgJiYgIXNvbGlkQm90dG9tICYmIHNvbGlkVG9wKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXhYID0gNjtcclxuICAgICAgICAgICAgICAgIHRleFkgPSAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgUElYSS5TcHJpdGUobmV3IFBJWEkuVGV4dHVyZShDbGFzc2ljVGlsZVByb3ZpZGVyLnRleHR1cmVTaGVldC5iYXNlVGV4dHVyZSwgbmV3IFBJWEkuUmVjdGFuZ2xlKHRleFggKiAzMiwgdGV4WSAqIDMyLCAzMiwgMzIpKSk7XHJcbiAgICB9XHJcblxyXG59IiwiZXhwb3J0IGZ1bmN0aW9uIHN0YXRpY0ltcGxlbWVudHM8VD4oKSB7XHJcbiAgICByZXR1cm4gKGNvbnN0cnVjdG9yOiBUKSA9PiB7fVxyXG59IiwiaW1wb3J0IHsgVGVtcGxhdGVSb29tIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9UZW1wbGF0ZVJvb21cIjtcclxuaW1wb3J0IHsgc3RhdGljSW1wbGVtZW50cyB9IGZyb20gXCIuL0RlY29yYXRvclwiO1xyXG5pbXBvcnQgeyBJUHJvdmlkZXIgfSBmcm9tIFwiLi9JUHJvdmlkZXJcIjtcclxuXHJcbkBzdGF0aWNJbXBsZW1lbnRzPElQcm92aWRlcj4oKVxyXG5leHBvcnQgY2xhc3MgU3RhbmRhcmRUZW1wbGF0ZVJvb21Qcm92aWRlciB7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyB0ZW1wbGF0ZXM6IFRlbXBsYXRlUm9vbVtdO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgcmVhZHkoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgbGV0IHAgPSBuZXcgUHJvbWlzZTx2b2lkPiggKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50ZW1wbGF0ZXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICAgICAgcmVxLm9wZW4oXCJHRVRcIiwgXCIvdGVtcGxhdGVzLmpzb25cIik7XHJcbiAgICAgICAgICAgICAgICByZXEuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wbGF0ZXM6IFRlbXBsYXRlUm9vbVtdID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlVGV4dCkubWFwKCAoZDogbnVtYmVyW11bXSkgPT4gbmV3IFRlbXBsYXRlUm9vbShkKSApO1xyXG4gICAgICAgICAgICAgICAgICAgIFN0YW5kYXJkVGVtcGxhdGVSb29tUHJvdmlkZXIudGVtcGxhdGVzID0gdGVtcGxhdGVzO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0ZW1wbGF0ZXMuZm9yRWFjaCggKHQpID0+IGNvbnNvbGUubG9nKHQudG9TdHJpbmcoKSkgKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgZHVuZ2VvbiA9ICh3aW5kb3cgYXMgYW55KS5kdW5nZW9uID0gRHVuR2VuKHRlbXBsYXRlcywgeyBoZWlnaHQ6IDEwMCwgd2lkdGg6IDEwMCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBtYWluKGR1bmdlb24pO1xyXG4gICAgICAgICAgICAgICAgfSApO1xyXG4gICAgICAgICAgICAgICAgcmVxLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCByZWplY3QpO1xyXG4gICAgICAgICAgICAgICAgcmVxLnNlbmQoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gKTtcclxuICAgICAgICByZXR1cm4gcDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGlzUmVhZHkoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGVtcGxhdGVzICE9PSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG59XHJcbiIsIi8vIHRzbGludDpkaXNhYmxlIG1heC1jbGFzc2VzLXBlci1maWxlXHJcbmltcG9ydCAqIGFzIF9LZXkgZnJvbSBcIi4vS2V5XCI7XHJcblxyXG5leHBvcnQgY29uc3QgS2V5ID0gX0tleTtcclxuXHJcbmNsYXNzIEp1Z2dsZXIge1xyXG4gICAgcHJpdmF0ZSBlbnRlckZyYW1lRnVuY3Rpb25zOiBbKCgpID0+IHZvaWQpLCBhbnldW10gPSBbXTtcclxuICAgIHByaXZhdGUgc2NoZWR1bGU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgaW50ZXJGcmFtZVRpbWU6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZwczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5pbnRlckZyYW1lVGltZSA9IDEwMDAgLyBmcHM7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSA9IERhdGUubm93KCkgKyB0aGlzLmludGVyRnJhbWVUaW1lO1xyXG4gICAgICAgIGxldCB0aWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmVudGVyRnJhbWVGdW5jdGlvbnMuZm9yRWFjaCggKFtmbiwgY3R4XSkgPT4gZm4uY2FsbChjdHgpICk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUgKz0gdGhpcy5pbnRlckZyYW1lVGltZTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aW1lb3V0ID0gdGhpcy5zY2hlZHVsZSAtIERhdGUubm93KCk7XHJcbiAgICAgICAgICAgIGlmICh0aW1lb3V0IDwgMikge1xyXG4gICAgICAgICAgICAgICAgdGltZW91dCA9IDI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlID0gRGF0ZS5ub3coKSArIHRoaXMuaW50ZXJGcmFtZVRpbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0VGltZW91dCh0aWNrLCB0aGlzLnNjaGVkdWxlIC0gRGF0ZS5ub3coKSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCh0aWNrLCB0aGlzLmludGVyRnJhbWVUaW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0RlBTKGZwczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5pbnRlckZyYW1lVGltZSA9IDEwMDAgLyBmcHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZChmbjogKCkgPT4gdm9pZCwgY29udGV4dD86IGFueSkge1xyXG4gICAgICAgIGlmICh0aGlzLmhhcyhmbiwgY29udGV4dCkgPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW50ZXJGcmFtZUZ1bmN0aW9ucy5wdXNoKFtmbiwgY29udGV4dF0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlKGZuOiAoKSA9PiB2b2lkLCBjb250ZXh0PzogYW55KSB7XHJcbiAgICAgICAgbGV0IGlkeCA9IHRoaXMuaGFzKGZuLCBjb250ZXh0KTtcclxuICAgICAgICBpZiAoaWR4ID49IDApIHtcclxuICAgICAgICAgICAgdGhpcy5lbnRlckZyYW1lRnVuY3Rpb25zLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGFzKGZuOiAoKSA9PiB2b2lkLCBjb250ZXh0PzogYW55KSB7XHJcbiAgICAgICAgZm9yIChsZXQgW2ksIG9lZl0gb2YgZW51bWVyYXRlKHRoaXMuZW50ZXJGcmFtZUZ1bmN0aW9ucykpIHtcclxuICAgICAgICAgICAgaWYgKG9lZlswXSA9PT0gZm4gJiYgb2VmWzFdID09PSBjb250ZXh0KSByZXR1cm4gaTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZnRlckZyYW1lcyhudW1GcmFtZXM6IG51bWJlciwgZm46ICgpID0+IHZvaWQsIGNvbnRleHQ/OiBhbnkpIHtcclxuICAgICAgICBsZXQgd3JhcHBlciA9ICgpID0+IHtcclxuICAgICAgICAgICAgbnVtRnJhbWVzIC0tO1xyXG4gICAgICAgICAgICBpZiAobnVtRnJhbWVzIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIGZuLmNhbGwoY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZSh3cmFwcGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5hZGQod3JhcHBlcik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBsZXQganVnZ2xlciA9IG5ldyBKdWdnbGVyKDYwKTtcclxuXHJcbmNsYXNzIFJvb3Qge1xyXG4gICAgcHJpdmF0ZSBfYXBwOiBQSVhJLkFwcGxpY2F0aW9uO1xyXG5cclxuICAgIHB1YmxpYyBzZXRBcHAoYXBwOiBQSVhJLkFwcGxpY2F0aW9uKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9hcHApIHRoaXMuX2FwcCA9IGFwcDtcclxuICAgICAgICBlbHNlIHRocm93IG5ldyBFcnJvcihcIkFwcCBpcyBhbHJlYWR5IHNldFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc3RhZ2UoKTogUElYSS5Db250YWluZXIge1xyXG4gICAgICAgIGlmICh0aGlzLl9hcHApIHJldHVybiB0aGlzLl9hcHAuc3RhZ2U7XHJcbiAgICAgICAgZWxzZSB0aHJvdyBuZXcgRXJyb3IoXCJTdGFnZSBpcyBub3QgeWV0IHNldFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYXBwKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9hcHApIHJldHVybiB0aGlzLl9hcHA7XHJcbiAgICAgICAgZWxzZSB0aHJvdyBuZXcgRXJyb3IoXCJBcHAgaXMgbm90IHlldCBzZXRcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBsZXQgcm9vdCA9ICh3aW5kb3cgYXMgYW55KS5yb290ID0gbmV3IFJvb3QoKTtcclxuXHJcbmNsYXNzIEtleWJvYXJkIHtcclxuXHJcbiAgICBwcml2YXRlIGtleXM6IGJvb2xlYW5bXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZSkgPT4gdGhpcy5rZXlzW2Uua2V5Q29kZV0gPSB0cnVlICk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoZSkgPT4gdGhpcy5rZXlzW2Uua2V5Q29kZV0gPSBmYWxzZSApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc0tleURvd24oa2V5Y29kZTogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5c1trZXljb2RlXSB8fCBmYWxzZTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBsZXQga2V5Ym9hcmQgPSBuZXcgS2V5Ym9hcmQoKTtcclxuXHJcbmV4cG9ydCBlbnVtIENvbnRyb2xsZXJBeGlzIHtcclxuICAgIExFRlRfWCA9IDAsXHJcbiAgICBMRUZUX1kgPSAxLFxyXG4gICAgUklHSFRfWCA9IDIsXHJcbiAgICBSSUdIVF9ZID0gMyxcclxufVxyXG5cclxuZXhwb3J0IGVudW0gQ29udHJvbGxlckJ1dHRvbiB7XHJcbiAgICBBID0gMCxcclxuICAgIEIgPSAxLFxyXG4gICAgWCA9IDIsXHJcbiAgICBZID0gMyxcclxuICAgIExCID0gNCxcclxuICAgIFJCID0gNSxcclxuICAgIExUID0gNixcclxuICAgIFJUID0gNyxcclxuICAgIFNFTEVDVCA9IDgsXHJcbiAgICBTVEFSVCA9IDksXHJcbiAgICBMMyA9IDEwLFxyXG4gICAgUjMgPSAxMSxcclxuICAgIERfVVAgPSAxMixcclxuICAgIERfRE9XTiA9IDEzLFxyXG4gICAgRF9MRUZUID0gMTQsXHJcbiAgICBEX1JJR0hUID0gMTUsXHJcbn1cclxuXHJcbmNsYXNzIENvbnRyb2xsZXIge1xyXG4gICAgcHJpdmF0ZSBidXR0b25zOiBib29sZWFuW10gPSBbXTtcclxuICAgIHByaXZhdGUgYXhlczogbnVtYmVyW10gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBqdWdnbGVyLmFkZCggKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZ3BzID0gbmF2aWdhdG9yLmdldEdhbWVwYWRzKCk7XHJcbiAgICAgICAgICAgIGlmICghZ3BzWzBdKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbnMgPSBbXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXhlcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBnYW1lcGFkID0gZ3BzWzBdITtcclxuICAgICAgICAgICAgdGhpcy5idXR0b25zID0gZ2FtZXBhZC5idXR0b25zLm1hcCggKGIpID0+IGIucHJlc3NlZCApO1xyXG4gICAgICAgICAgICB0aGlzLmF4ZXMgPSBnYW1lcGFkLmF4ZXM7XHJcbiAgICAgICAgfSApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRBeGlzKGF4aXM6IENvbnRyb2xsZXJBeGlzKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXhlc1theGlzXSB8fCAwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRCdXR0b24oYnV0dG9uOiBDb250cm9sbGVyQnV0dG9uKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYnV0dG9uc1tidXR0b25dIHx8IGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgbGV0IGNvbnRyb2xsZXIgPSBuZXcgQ29udHJvbGxlcigpO1xyXG5cclxuY2xhc3MgU291bmRNYW5hZ2VyIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgR0xPQkFMX1ZPTFVNRSA9IDAuNDtcclxuICAgIHByaXZhdGUgbXVzaWM6IHsgW3NvbmdOYW1lOiBzdHJpbmddOiB7IHNvbmc6IEhUTUxBdWRpb0VsZW1lbnQsIGZhZGU6IG51bWJlciB9IH0gPSB7fTtcclxuICAgIHByaXZhdGUgdGFnczogeyBbdGFnOiBzdHJpbmddOiBib29sZWFuIH0gPSB7fTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBqdWdnbGVyLmFkZCgoKSA9PiB0aGlzLnRhZ3MgPSB7fSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBsYXlTb3VuZChuYW1lOiBzdHJpbmcsIHZvbHVtZSA9IDEsIHRhZz86IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0YWcpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnRhZ3NbdGFnXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YWdzW3RhZ10gPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBhdWRpbyA9IG5ldyBBdWRpbyhuYW1lKTtcclxuICAgICAgICBhdWRpby52b2x1bWUgPSB2b2x1bWUgKiBTb3VuZE1hbmFnZXIuR0xPQkFMX1ZPTFVNRTtcclxuICAgICAgICBhdWRpby5wbGF5KCk7XHJcbiAgICAgICAgYXVkaW8ub25lbmRlZCA9ICgpID0+IGF1ZGlvLnJlbW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwbGF5TXVzaWMobmFtZTogc3RyaW5nLCB2b2x1bWUgPSAxKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubXVzaWMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcclxuICAgICAgICAgICAgaWYgKCFpc05hTih0aGlzLm11c2ljW25hbWVdLmZhZGUpKSB3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aGlzLm11c2ljW25hbWVdLmZhZGUpO1xyXG4gICAgICAgICAgICB0aGlzLm11c2ljW25hbWVdLnNvbmcudm9sdW1lID0gdm9sdW1lICogU291bmRNYW5hZ2VyLkdMT0JBTF9WT0xVTUU7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGF1ZGlvID0gbmV3IEF1ZGlvKG5hbWUpO1xyXG4gICAgICAgIGF1ZGlvLnZvbHVtZSA9IHZvbHVtZSAqIFNvdW5kTWFuYWdlci5HTE9CQUxfVk9MVU1FO1xyXG4gICAgICAgIGF1ZGlvLmxvb3AgPSB0cnVlO1xyXG4gICAgICAgIGF1ZGlvLnBsYXkoKTtcclxuICAgICAgICB0aGlzLm11c2ljW25hbWVdID0ge1xyXG4gICAgICAgICAgICBzb25nOiBhdWRpbyxcclxuICAgICAgICAgICAgZmFkZTogTmFOLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGZhZGVNdXNpY091dChuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIXRoaXMubXVzaWMuaGFzT3duUHJvcGVydHkobmFtZSkgfHwgIWlzTmFOKHRoaXMubXVzaWNbbmFtZV0uZmFkZSkpIHJldHVybjtcclxuICAgICAgICBsZXQgZmFkZVN0YXJ0ID0gdGhpcy5tdXNpY1tuYW1lXS5zb25nLnZvbHVtZTtcclxuICAgICAgICBsZXQgZmFkZVRpbWUgPSAzMDtcclxuICAgICAgICB0aGlzLm11c2ljW25hbWVdLmZhZGUgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICBmYWRlVGltZSAtLTtcclxuICAgICAgICAgICAgaWYgKGZhZGVUaW1lIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubXVzaWNbbmFtZV0uc29uZy5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tdXNpY1tuYW1lXS5zb25nLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5tdXNpY1tuYW1lXS5mYWRlKTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLm11c2ljW25hbWVdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tdXNpY1tuYW1lXS5zb25nLnZvbHVtZSA9IGZhZGVUaW1lIC8gMzAgKiBmYWRlU3RhcnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAxNik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldE11c2ljVm9sdW1lKG5hbWU6IHN0cmluZywgdm9sdW1lOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoIXRoaXMubXVzaWMuaGFzT3duUHJvcGVydHkobmFtZSkpIHJldHVybjtcclxuICAgICAgICB0aGlzLm11c2ljW25hbWVdLnNvbmcudm9sdW1lID0gdm9sdW1lICogU291bmRNYW5hZ2VyLkdMT0JBTF9WT0xVTUU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBsZXQgc291bmRNYW5hZ2VyID0gbmV3IFNvdW5kTWFuYWdlcigpO1xyXG4iLCJpbXBvcnQgeyBNYXAyRCB9IGZyb20gXCIuL01hcDJEXCI7XHJcbmltcG9ydCB7IFRlbXBsYXRlUm9vbSwgRGlyZWN0aW9uIH0gZnJvbSBcIi4vVGVtcGxhdGVSb29tXCI7XHJcbmltcG9ydCAqIGFzIHNlZWRyYW5kb20gZnJvbSBcInNlZWRyYW5kb21cIjtcclxuaW1wb3J0IHsgS2V5cyB9IGZyb20gXCIuL3V0aWxzXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIER1bkdlbk9wdHMge1xyXG4gICAgd2lkdGg/OiBudW1iZXIsXHJcbiAgICBoZWlnaHQ/OiBudW1iZXIsXHJcbiAgICBzZWVkPzogc3RyaW5nLFxyXG59XHJcblxyXG5sZXQgZGVmYXVsdHM6IER1bkdlbk9wdHMgPSB7XHJcbiAgICB3aWR0aDogNTAsXHJcbiAgICBoZWlnaHQ6IDUwLFxyXG59XHJcblxyXG5pbnRlcmZhY2UgSU9wZW5Eb29yIGV4dGVuZHMgSVBvaW50IHtcclxuICAgIGRpcmVjdGlvbjogRGlyZWN0aW9uO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgSVBvaW50IHtcclxuICAgIHg6IG51bWJlcjtcclxuICAgIHk6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGVudW0gRVRpbGVzIHtcclxuICAgIFNPTElEID0gLTEsXHJcbiAgICBFTVBUWSA9IDAsXHJcbiAgICBXQUxMID0gMSxcclxuICAgIFRPUF9ET09SID0gRGlyZWN0aW9uLlRPUCxcclxuICAgIEJPVFRPTV9ET09SID0gRGlyZWN0aW9uLkJPVFRPTSxcclxuICAgIExFRlRfRE9PUiA9IERpcmVjdGlvbi5MRUZULFxyXG4gICAgUklHSFRfRE9PUiA9IERpcmVjdGlvbi5SSUdIVCxcclxuICAgIExBRERFUiA9IDYsXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9wcG9zaXRlRGlyZWN0aW9uKGRpcjogRGlyZWN0aW9uKTogRGlyZWN0aW9uIHtcclxuICAgIHN3aXRjaChkaXIpIHtcclxuICAgICAgICBjYXNlIERpcmVjdGlvbi5UT1A6IHJldHVybiBEaXJlY3Rpb24uQk9UVE9NO1xyXG4gICAgICAgIGNhc2UgRGlyZWN0aW9uLkJPVFRPTTogcmV0dXJuIERpcmVjdGlvbi5UT1A7XHJcbiAgICAgICAgY2FzZSBEaXJlY3Rpb24uTEVGVDogcmV0dXJuIERpcmVjdGlvbi5SSUdIVDtcclxuICAgICAgICBjYXNlIERpcmVjdGlvbi5SSUdIVDogcmV0dXJuIERpcmVjdGlvbi5MRUZUO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBkaXJlY3Rpb25zID0gW0RpcmVjdGlvbi5UT1AsIERpcmVjdGlvbi5CT1RUT00sIERpcmVjdGlvbi5MRUZULCBEaXJlY3Rpb24uUklHSFRdO1xyXG5cclxuZnVuY3Rpb24gYWRkT3BlbkRvb3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIHJvb206IFRlbXBsYXRlUm9vbSwgZGlyZWN0aW9uOiBEaXJlY3Rpb24sIG9wZW5Eb29yczogSU9wZW5Eb29yW10pIHtcclxuICAgIGlmIChyb29tLmRvb3J3YXlzW2RpcmVjdGlvbl0gPCAwKSByZXR1cm47XHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uVE9QKSB7XHJcbiAgICAgICAgb3BlbkRvb3JzLnB1c2goIHsgZGlyZWN0aW9uOiBkaXJlY3Rpb24sIHg6IHggKyByb29tLmRvb3J3YXlzW2RpcmVjdGlvbl0sIHk6IHkgfSApO1xyXG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5CT1RUT00pIHtcclxuICAgICAgICBvcGVuRG9vcnMucHVzaCggeyBkaXJlY3Rpb246IGRpcmVjdGlvbiwgeDogeCArIHJvb20uZG9vcndheXNbZGlyZWN0aW9uXSwgeTogeSArIHJvb20uaGVpZ2h0IC0gMSB9ICk7XHJcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLkxFRlQpIHtcclxuICAgICAgICBvcGVuRG9vcnMucHVzaCggeyBkaXJlY3Rpb246IGRpcmVjdGlvbiwgeDogeCwgeTogeSArIHJvb20uZG9vcndheXNbZGlyZWN0aW9uXSB9ICk7XHJcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLlJJR0hUKSB7XHJcbiAgICAgICAgb3BlbkRvb3JzLnB1c2goIHsgZGlyZWN0aW9uOiBkaXJlY3Rpb24sIHg6IHggKyByb29tLndpZHRoIC0gMSwgeTogeSArIHJvb20uZG9vcndheXNbZGlyZWN0aW9uXSB9ICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZE9wZW5Eb29ycyh4OiBudW1iZXIsIHk6IG51bWJlciwgcm9vbTogVGVtcGxhdGVSb29tLCBvcGVuRG9vcnM6IElPcGVuRG9vcltdLCBleGN1bGRlOiBEaXJlY3Rpb25bXSA9IFtdKSB7XHJcbiAgICBmb3IgKGxldCBkaXIgb2YgZGlyZWN0aW9ucykge1xyXG4gICAgICAgIGlmIChleGN1bGRlLmluZGV4T2YoZGlyKSA+PSAwIHx8IHJvb20uZG9vcndheXNbZGlyXSA8IDApIGNvbnRpbnVlO1xyXG4gICAgICAgIGFkZE9wZW5Eb29yKHgsIHksIHJvb20sIGRpciwgb3BlbkRvb3JzKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcm9vbUNhbkF0dGFjaChkaXJlY3Rpb246IERpcmVjdGlvbiwgY2FuZGlkYXRlUm9vbTogVGVtcGxhdGVSb29tKSB7XHJcbiAgICByZXR1cm4gY2FuZGlkYXRlUm9vbS5kb29yd2F5c1tvcHBvc2l0ZURpcmVjdGlvbihkaXJlY3Rpb24pXSA+PSAwO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjb25uZWN0ZWRSb29tWFkoZG9vcjogSU9wZW5Eb29yLCByb29tOiBUZW1wbGF0ZVJvb20pIHtcclxuICAgIGxldCBjb25uZWN0aW5nRG9vciA9IHJvb20uZG9vcndheXNbb3Bwb3NpdGVEaXJlY3Rpb24oZG9vci5kaXJlY3Rpb24pXTtcclxuICAgIHN3aXRjaCAoZG9vci5kaXJlY3Rpb24pIHtcclxuICAgICAgICBjYXNlIERpcmVjdGlvbi5UT1A6IHJldHVybiB7IHg6IGRvb3IueCAtIGNvbm5lY3RpbmdEb29yLCB5OiBkb29yLnkgLSByb29tLmhlaWdodCB9O1xyXG4gICAgICAgIGNhc2UgRGlyZWN0aW9uLkJPVFRPTTogcmV0dXJuIHsgeDogZG9vci54IC0gY29ubmVjdGluZ0Rvb3IsIHk6IGRvb3IueSArIDEgfTtcclxuICAgICAgICBjYXNlIERpcmVjdGlvbi5MRUZUOiByZXR1cm4geyB4OiBkb29yLnggLSByb29tLndpZHRoLCB5OiBkb29yLnkgLSBjb25uZWN0aW5nRG9vciB9O1xyXG4gICAgICAgIGNhc2UgRGlyZWN0aW9uLlJJR0hUOiByZXR1cm4geyB4OiBkb29yLnggKyAxLCB5OiBkb29yLnkgLSBjb25uZWN0aW5nRG9vciB9O1xyXG4gICAgICAgIGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgZGlyZWN0aW9uXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gRHVuR2VuKHRlbXBsYXRlczogVGVtcGxhdGVSb29tW10sIG9wdHM/OiBEdW5HZW5PcHRzKSB7XHJcbiAgICBvcHRzID0gb3B0cyB8fCB7fTtcclxuICAgIGZvciAobGV0IGtleSBvZiBLZXlzKGRlZmF1bHRzKSkge1xyXG4gICAgICAgIGlmIChvcHRzW2tleV0gPT09IHVuZGVmaW5lZCkgb3B0c1trZXldID0gZGVmYXVsdHNba2V5XTtcclxuICAgIH1cclxuICAgIGxldCBwcm5nID0gc2VlZHJhbmRvbShvcHRzLnNlZWQpO1xyXG4gICAgbGV0IGR1bmdlb24gPSBuZXcgRHVuZ2VvbihvcHRzLndpZHRoISwgb3B0cy5oZWlnaHQhLCBvcHRzLnNlZWQgfHwgXCJcIik7XHJcbiAgICBsZXQgb3BlbkRvb3JzOiBJT3BlbkRvb3JbXSA9IFtdO1xyXG4gICAgdGVtcGxhdGVzID0gZnlTaHVmZmxlKHRlbXBsYXRlcywgcHJuZyk7XHJcbiAgICBsZXQgcm9vdCA9IHRlbXBsYXRlc1swXTtcclxuICAgIGxldCB4ID0gTWF0aC5mbG9vcigoZHVuZ2Vvbi53aWR0aCAtIHJvb3Qud2lkdGgpIC8gMik7XHJcbiAgICBsZXQgeSA9IE1hdGguZmxvb3IoKGR1bmdlb24uaGVpZ2h0IC0gcm9vdC5oZWlnaHQpIC8gMik7XHJcbiAgICBpZiAoIWR1bmdlb24ucGFpbnQocm9vdCwgeCwgeSkpIHtcclxuICAgICAgICByZXR1cm4gZHVuZ2VvbjtcclxuICAgIH1cclxuICAgIGFkZE9wZW5Eb29ycyh4LCB5LCByb290LCBvcGVuRG9vcnMpO1xyXG5cclxuICAgIHdoaWxlIChvcGVuRG9vcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgb3BlbkRvb3JzID0gZnlTaHVmZmxlKG9wZW5Eb29ycywgcHJuZyk7XHJcbiAgICAgICAgbGV0IGRvb3IgPSBvcGVuRG9vcnMucG9wKCkhO1xyXG4gICAgICAgIHRlbXBsYXRlcyA9IGZ5U2h1ZmZsZSh0ZW1wbGF0ZXMsIHBybmcpO1xyXG4gICAgICAgIGZvciAobGV0IGNhbmRpZGF0ZSBvZiB0ZW1wbGF0ZXMpIHtcclxuICAgICAgICAgICAgaWYgKCFyb29tQ2FuQXR0YWNoKGRvb3IuZGlyZWN0aW9uLCBjYW5kaWRhdGUpKSBjb250aW51ZTtcclxuICAgICAgICAgICAgbGV0IHh5ID0gY29ubmVjdGVkUm9vbVhZKGRvb3IsIGNhbmRpZGF0ZSk7XHJcbiAgICAgICAgICAgIGlmIChkdW5nZW9uLnBhaW50KGNhbmRpZGF0ZSwgeHkueCwgeHkueSkpIHtcclxuICAgICAgICAgICAgICAgIGFkZE9wZW5Eb29ycyh4eS54LCB4eS55LCBjYW5kaWRhdGUsIG9wZW5Eb29ycywgW29wcG9zaXRlRGlyZWN0aW9uKGRvb3IuZGlyZWN0aW9uKV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBkdW5nZW9uID0gZHVuZ2Vvbi5tYXAoICh0aWxlLCB4LCB5LCBkdW5nZW9uKSA9PiB7XHJcbiAgICAgICAgaWYgKHRpbGUgPT09IEVUaWxlcy5TT0xJRCB8fCB0aWxlID09PSBFVGlsZXMuV0FMTCkge1xyXG4gICAgICAgICAgICBpZiAoeSA+IDAgJiYgeSA8IGR1bmdlb24uaGVpZ2h0IC0gMSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRvcCA9IGR1bmdlb24udGlsZXMuZ2V0KHgsIHkgLSAxKTtcclxuICAgICAgICAgICAgICAgIGxldCBib3R0b20gPSBkdW5nZW9uLnRpbGVzLmdldCh4LCB5ICsgMSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoKCh0b3AgPT09IERpcmVjdGlvbi5CT1RUT00gfHwgdG9wID09PSAwKSAmJiAoYm90dG9tID09PSBEaXJlY3Rpb24uVE9QIHx8IGJvdHRvbSA9PT0gMCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB0b3AgIT09IGJvdHRvbSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gRGlyZWN0aW9uLkJPVFRPTTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoeCA+IDAgJiYgeCA8IGR1bmdlb24ud2lkdGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGVmdCA9IGR1bmdlb24udGlsZXMuZ2V0KHggLSAxLCB5KTtcclxuICAgICAgICAgICAgICAgIGxldCByaWdodCA9IGR1bmdlb24udGlsZXMuZ2V0KHggKyAxLCB5KTtcclxuICAgICAgICAgICAgICAgIGlmICgoKGxlZnQgPT09IERpcmVjdGlvbi5SSUdIVCB8fCBsZWZ0ID09PSAwKSAmJiAocmlnaHQgPT09IERpcmVjdGlvbi5MRUZUIHx8IHJpZ2h0ID09PSAwKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiBsZWZ0ICE9PSByaWdodClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGlyZWN0aW9ucy5pbmRleE9mKHRpbGUpIDwgMCkgcmV0dXJuIHRpbGU7XHJcbiAgICAgICAgaWYgKHggPiAwICYmIHggPCBkdW5nZW9uLndpZHRoIC0gMSAmJiB5ID4gMCAmJiB5IDwgZHVuZ2Vvbi5oZWlnaHQgLSAxKSB7XHJcbiAgICAgICAgICAgIGxldCB4eSA9IHsgeDogMCwgeTogMCB9O1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRpbGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgRGlyZWN0aW9uLlRPUDogeHkueSA9IC0xOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRGlyZWN0aW9uLkJPVFRPTTogeHkueSA9IDE7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBEaXJlY3Rpb24uTEVGVDogeHkueCA9IC0xOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRGlyZWN0aW9uLlJJR0hUOiB4eS54ID0gMTsgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGR1bmdlb24udGlsZXMuZ2V0KHggKyB4eS54LCB5ICsgeHkueSkgPT09IG9wcG9zaXRlRGlyZWN0aW9uKHRpbGUpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGlsZSA9PT0gRGlyZWN0aW9uLkJPVFRPTSA/IERpcmVjdGlvbi5CT1RUT00gOiBFVGlsZXMuRU1QVFk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoeCA+IDEgJiYgeCA8IGR1bmdlb24ud2lkdGggLSAyICYmIHkgPiAxICYmIHkgPCBkdW5nZW9uLmhlaWdodCAtIDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVhY2ggPSBkdW5nZW9uLnRpbGVzLmdldCh4ICsgeHkueCAqIDIsIHkgKyB4eS55ICogMilcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVhY2ggPT09IEVUaWxlcy5FTVBUWSB8fCByZWFjaCA9PT0gb3Bwb3NpdGVEaXJlY3Rpb24odGlsZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRpbGUgPT09IERpcmVjdGlvbi5CT1RUT00gPyBEaXJlY3Rpb24uQk9UVE9NIDogRVRpbGVzLkVNUFRZO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gRVRpbGVzLldBTEw7XHJcbiAgICB9ICk7XHJcblxyXG4gICAgbGV0IGxhZGRlclNlZWRzOiBJUG9pbnRbXSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkdW5nZW9uLndpZHRoIC0gMTsgaSArKykge1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZHVuZ2Vvbi53aWR0aCAtIDE7IGogKyspIHtcclxuICAgICAgICAgICAgaWYgKGR1bmdlb24udGlsZXMuZ2V0KGksIGopID09PSBFVGlsZXMuRU1QVFkgJiYgZHVuZ2Vvbi50aWxlcy5nZXQoaSArIDEsIGopID09PSBFVGlsZXMuRU1QVFkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBibCA9IGR1bmdlb24udGlsZXMuZ2V0KGksIGogKyAxKTtcclxuICAgICAgICAgICAgICAgIGxldCBiciA9IGR1bmdlb24udGlsZXMuZ2V0KGkgKyAxLCBqICsgMSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYmwgPT09IDEgJiYgYnIgPT09IERpcmVjdGlvbi5CT1RUT00pIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWRkZXJTZWVkcy5wdXNoKHsgeDogaSArIDEsIHk6IGogKyAxIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChibCA9PT0gRGlyZWN0aW9uLkJPVFRPTSAmJiBiciA9PT0gRVRpbGVzLldBTEwpIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWRkZXJTZWVkcy5wdXNoKHsgeDogaSwgeTogaiArIDEgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBsYWRkZXJTZWVkcyA9IGZ5U2h1ZmZsZShsYWRkZXJTZWVkcywgcHJuZyk7XHJcblxyXG4gICAgZnVuY3Rpb24gZXJhc2VCb3R0b21Eb29yKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKGR1bmdlb24udGlsZXMuZ2V0KHgsIHkpID09PSBEaXJlY3Rpb24uQk9UVE9NKSB7XHJcbiAgICAgICAgICAgIGR1bmdlb24udGlsZXMuc2V0KHgsIHksIEVUaWxlcy5FTVBUWSk7XHJcbiAgICAgICAgICAgIGVyYXNlQm90dG9tRG9vcih4IC0gMSwgeSk7XHJcbiAgICAgICAgICAgIGVyYXNlQm90dG9tRG9vcih4ICsgMSwgeSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHdoaWxlIChsYWRkZXJTZWVkcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgbGV0IHNlZWQgPSBsYWRkZXJTZWVkcy5wb3AoKSE7XHJcbiAgICAgICAgaWYgKGR1bmdlb24udGlsZXMuZ2V0KHNlZWQueCwgc2VlZC55KSAhPT0gRGlyZWN0aW9uLkJPVFRPTSkgY29udGludWU7XHJcbiAgICAgICAgd2hpbGUgKGR1bmdlb24udGlsZXMuZ2V0KHNlZWQueCwgc2VlZC55KSAhPT0gRVRpbGVzLldBTEwpIHtcclxuICAgICAgICAgICAgaWYgKGR1bmdlb24udGlsZXMuZ2V0KHNlZWQueCwgc2VlZC55KSA9PT0gRGlyZWN0aW9uLkJPVFRPTSkge1xyXG4gICAgICAgICAgICAgICAgZXJhc2VCb3R0b21Eb29yKHNlZWQueCwgc2VlZC55KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkdW5nZW9uLnRpbGVzLnNldChzZWVkLngsIHNlZWQueSwgRVRpbGVzLkxBRERFUik7XHJcbiAgICAgICAgICAgIHNlZWQueSArKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGR1bmdlb24ubWFwKCAodCkgPT4gdCA9PT0gRVRpbGVzLlNPTElEID8gRVRpbGVzLldBTEwgOiB0ID09PSBFVGlsZXMuQk9UVE9NX0RPT1IgPyBFVGlsZXMuRU1QVFkgOiB0KTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIER1bmdlb24ge1xyXG4gICAgcHVibGljIHRpbGVzID0gbmV3IE1hcDJEPG51bWJlcj4oKTtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB3aWR0aDogbnVtYmVyLCBwdWJsaWMgaGVpZ2h0OiBudW1iZXIsIHB1YmxpYyBzZWVkOiBzdHJpbmcsIGluaXRpYWxpemVyOiAoeDogbnVtYmVyLCB5OiBudW1iZXIpID0+IG51bWJlciA9ICgpID0+IC0xKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3aWR0aDsgaSArKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGhlaWdodDsgaiArKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aWxlcy5zZXQoaSwgaiwgaW5pdGlhbGl6ZXIoaSwgaikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHBhaW50KHJvb206IFRlbXBsYXRlUm9vbSwgeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoeCA8IDAgfHwgeSA8IDAgfHwgeCArIHJvb20ud2lkdGggPiB0aGlzLndpZHRoIHx8IHkgKyByb29tLmhlaWdodCA+IHRoaXMuaGVpZ2h0KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb29tLndpZHRoOyBpICsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcm9vbS5oZWlnaHQ7IGogKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCB0aWxlID0gdGhpcy50aWxlcy5nZXQoeCArIGksIHkgKyBqKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aWxlID09PSB1bmRlZmluZWQgfHwgdGlsZSAhPT0gRVRpbGVzLlNPTElEKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb29tLndpZHRoOyBpICsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcm9vbS5oZWlnaHQ7IGogKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGlsZXMuc2V0KHggKyBpLCB5ICsgaiwgcm9vbS50aWxlcy5nZXQoaSwgaikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIG1hcChmbjogKHRpbGU6IG51bWJlciwgeDogbnVtYmVyLCB5OiBudW1iZXIsIGR1bmdlb246IHRoaXMpID0+IG51bWJlcik6IER1bmdlb24ge1xyXG4gICAgICAgIHJldHVybiBuZXcgRHVuZ2Vvbih0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgdGhpcy5zZWVkLCAoeCwgeSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gZm4odGhpcy50aWxlcy5nZXQoeCwgeSksIHgsIHksIHRoaXMpO1xyXG4gICAgICAgIH0gKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZnlTaHVmZmxlPFQ+KGFycjogVFtdLCBwcm5nOiBzZWVkcmFuZG9tLnBybmcpOiBUW10ge1xyXG4gICAgYXJyID0gYXJyLnNsaWNlKCk7XHJcbiAgICBmb3IgKGxldCBpID0gYXJyLmxlbmd0aCAtIDE7IGkgPiAwOyBpIC0tKSB7XHJcbiAgICAgICAgbGV0IHN3cCA9IE1hdGguZmxvb3IocHJuZygpICogKGkgKyAxKSk7XHJcbiAgICAgICAgbGV0IHRlbXAgPSBhcnJbaV07XHJcbiAgICAgICAgYXJyW2ldID0gYXJyW3N3cF07XHJcbiAgICAgICAgYXJyW3N3cF0gPSB0ZW1wO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFycjtcclxufSIsImV4cG9ydCBjbGFzcyBNYXAyRDxWPiB7XHJcblxyXG4gICAgcHJpdmF0ZSBkYXRhOiBWW10gPSBbXTtcclxuICAgIHNldChpOiBudW1iZXIsIGo6IG51bWJlciwgZGF0YTogVikge1xyXG4gICAgICAgIGlmIChpIDwgMCB8fCBqIDwgMCkgdGhyb3cgbmV3IEVycm9yKFwiTWFwMkQgaW5kZXggb3V0IG9mIGJvdW5kcy5cIik7XHJcbiAgICAgICAgdGhpcy5kYXRhW2NwZihpICsgMSwgaiArIDEpIC0gMV0gPSBkYXRhO1xyXG4gICAgfVxyXG4gICAgZ2V0KGk6IG51bWJlciwgajogbnVtYmVyKTogViB7XHJcbiAgICAgICAgaWYgKGkgPCAwIHx8IGogPCAwKSB0aHJvdyBuZXcgRXJyb3IoXCJNYXAyRCBpbmRleCBvdXQgb2YgYm91bmRzLlwiKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhW2NwZihpICsgMSwgaiArIDEpIC0gMV07XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNwZihpOiBudW1iZXIsIGo6IG51bWJlcikge1xyXG4gICAgcmV0dXJuICgoaSArIGogLSAyKSAqIChpICsgaiAtIDEpICsgaSkgLyAyO1xyXG59IiwiaW1wb3J0IHsgTWFwMkQgfSBmcm9tIFwiLi9NYXAyRFwiO1xyXG5cclxuZXhwb3J0IGVudW0gRGlyZWN0aW9uIHtcclxuICAgIFRPUCA9IDIsXHJcbiAgICBCT1RUT00gPSAzLFxyXG4gICAgTEVGVCA9IDQsXHJcbiAgICBSSUdIVCA9IDUsXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZVJvb20ge1xyXG4gICAgXHJcbiAgICBwdWJsaWMgd2lkdGg6IG51bWJlcjtcclxuICAgIHB1YmxpYyBoZWlnaHQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyB0aWxlcyA9IG5ldyBNYXAyRDxudW1iZXI+KCk7XHJcblxyXG4gICAgcHVibGljIGRvb3J3YXlzOiBudW1iZXJbXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGRhdGE6IG51bWJlcltdW10pIHtcclxuICAgICAgICB0aGlzLmRvb3J3YXlzW0RpcmVjdGlvbi5UT1BdICAgICAgICA9IC0xO1xyXG4gICAgICAgIHRoaXMuZG9vcndheXNbRGlyZWN0aW9uLkJPVFRPTV0gICAgID0gLTE7XHJcbiAgICAgICAgdGhpcy5kb29yd2F5c1tEaXJlY3Rpb24uTEVGVF0gICAgICAgPSAtMTtcclxuICAgICAgICB0aGlzLmRvb3J3YXlzW0RpcmVjdGlvbi5SSUdIVF0gICAgICA9IC0xO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSBkYXRhWzBdLmxlbmd0aDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IGRhdGEubGVuZ3RoO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy53aWR0aDsgaSArKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuaGVpZ2h0OyBqICsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbGVzLnNldChpLCBqLCBkYXRhW2pdW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLndpZHRoOyBpICsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbGVzLmdldChpLCAwKSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kb29yd2F5c1tEaXJlY3Rpb24uVE9QXSA9IGk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbGVzLnNldChpLCAwLCBEaXJlY3Rpb24uVE9QKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy50aWxlcy5nZXQoaSwgdGhpcy5oZWlnaHQgLSAxKSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kb29yd2F5c1tEaXJlY3Rpb24uQk9UVE9NXSA9IGk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbGVzLnNldChpLCB0aGlzLmhlaWdodCAtIDEsIERpcmVjdGlvbi5CT1RUT00pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5oZWlnaHQ7IGkgKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGlsZXMuZ2V0KDAsIGkpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRvb3J3YXlzW0RpcmVjdGlvbi5MRUZUXSA9IGk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbGVzLnNldCgwLCBpLCBEaXJlY3Rpb24uTEVGVCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMudGlsZXMuZ2V0KHRoaXMud2lkdGggLSAxLCBpKSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kb29yd2F5c1tEaXJlY3Rpb24uUklHSFRdID0gaTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGlsZXMuc2V0KHRoaXMud2lkdGggLSAxLCBpLCBEaXJlY3Rpb24uUklHSFQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0b1N0cmluZygpIHtcclxuICAgICAgICBsZXQgcmVwciA9IFwiXCI7XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmhlaWdodDsgaiArKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMud2lkdGg7IGkgKyspIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy50aWxlcy5nZXQoaSwgaikpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJlcHIgKz0gXCLilojilohcIjsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOiByZXByICs9IFwiXl5cIjsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOiByZXByICs9IFwidnZcIjsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OiByZXByICs9IFwiPDxcIjsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OiByZXByICs9IFwiPj5cIjsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogcmVwciArPSBcIiAgXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVwciArPSBcIlxcblwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVwcjtcclxuICAgIH1cclxufSIsImV4cG9ydCBjb25zdCB2ZW5uSW50ZXJzZWN0aW9uID0gPFQ+KGwxOiBUW10sIGwyOiBUW10sIHNvcnQ/OiAoYTogVCwgYjogVCkgPT4gbnVtYmVyKTogeyBsMTogVFtdLCBsMjogVFtdLCBib3RoOiBUW10gfSA9PiB7XHJcbiAgICBsMSA9IGwxLnNsaWNlKCkuc29ydChzb3J0KTtcclxuICAgIGwyID0gbDIuc2xpY2UoKS5zb3J0KHNvcnQpO1xyXG4gICAgaWYgKCFzb3J0KSBzb3J0ID0gKGEsIGIpID0+IGEgPCBiID8gLTEgOiBhID4gYiA/IDEgOiAwO1xyXG4gICAgbGV0IGwxZWxlbWVudHM6IFRbXSA9IFtdO1xyXG4gICAgbGV0IGwyZWxlbWVudHM6IFRbXSA9IFtdO1xyXG4gICAgbGV0IGJvdGg6IFRbXSA9IFtdO1xyXG4gICAgd2hpbGUobDEubGVuZ3RoICYmIGwyLmxlbmd0aCkge1xyXG4gICAgICAgIGxldCBvcmQgPSBzb3J0KGwxWzBdLCBsMlswXSk7XHJcbiAgICAgICAgaWYgKG9yZCA9PT0gMCkge1xyXG4gICAgICAgICAgICBib3RoLnB1c2gobDEuc2hpZnQoKSEpO1xyXG4gICAgICAgICAgICBsMi5zaGlmdCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAob3JkIDwgMSkge1xyXG4gICAgICAgICAgICBsMWVsZW1lbnRzLnB1c2gobDEuc2hpZnQoKSEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGwyZWxlbWVudHMucHVzaChsMi5zaGlmdCgpISk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBsMTogbDFlbGVtZW50cy5jb25jYXQobDEpLFxyXG4gICAgICAgIGwyOiBsMmVsZW1lbnRzLmNvbmNhdChsMiksXHJcbiAgICAgICAgYm90aCxcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IEtleXMgPSA8VD4ob2JqOiBUKTogKGtleW9mIFQpW10gPT4gT2JqZWN0LmtleXMob2JqKSBhcyAoa2V5b2YgVClbXTsiLCIvLyBBIGxpYnJhcnkgb2Ygc2VlZGFibGUgUk5HcyBpbXBsZW1lbnRlZCBpbiBKYXZhc2NyaXB0LlxuLy9cbi8vIFVzYWdlOlxuLy9cbi8vIHZhciBzZWVkcmFuZG9tID0gcmVxdWlyZSgnc2VlZHJhbmRvbScpO1xuLy8gdmFyIHJhbmRvbSA9IHNlZWRyYW5kb20oMSk7IC8vIG9yIGFueSBzZWVkLlxuLy8gdmFyIHggPSByYW5kb20oKTsgICAgICAgLy8gMCA8PSB4IDwgMS4gIEV2ZXJ5IGJpdCBpcyByYW5kb20uXG4vLyB2YXIgeCA9IHJhbmRvbS5xdWljaygpOyAvLyAwIDw9IHggPCAxLiAgMzIgYml0cyBvZiByYW5kb21uZXNzLlxuXG4vLyBhbGVhLCBhIDUzLWJpdCBtdWx0aXBseS13aXRoLWNhcnJ5IGdlbmVyYXRvciBieSBKb2hhbm5lcyBCYWFnw7hlLlxuLy8gUGVyaW9kOiB+Ml4xMTZcbi8vIFJlcG9ydGVkIHRvIHBhc3MgYWxsIEJpZ0NydXNoIHRlc3RzLlxudmFyIGFsZWEgPSByZXF1aXJlKCcuL2xpYi9hbGVhJyk7XG5cbi8vIHhvcjEyOCwgYSBwdXJlIHhvci1zaGlmdCBnZW5lcmF0b3IgYnkgR2VvcmdlIE1hcnNhZ2xpYS5cbi8vIFBlcmlvZDogMl4xMjgtMS5cbi8vIFJlcG9ydGVkIHRvIGZhaWw6IE1hdHJpeFJhbmsgYW5kIExpbmVhckNvbXAuXG52YXIgeG9yMTI4ID0gcmVxdWlyZSgnLi9saWIveG9yMTI4Jyk7XG5cbi8vIHhvcndvdywgR2VvcmdlIE1hcnNhZ2xpYSdzIDE2MC1iaXQgeG9yLXNoaWZ0IGNvbWJpbmVkIHBsdXMgd2V5bC5cbi8vIFBlcmlvZDogMl4xOTItMl4zMlxuLy8gUmVwb3J0ZWQgdG8gZmFpbDogQ29sbGlzaW9uT3ZlciwgU2ltcFBva2VyLCBhbmQgTGluZWFyQ29tcC5cbnZhciB4b3J3b3cgPSByZXF1aXJlKCcuL2xpYi94b3J3b3cnKTtcblxuLy8geG9yc2hpZnQ3LCBieSBGcmFuw6dvaXMgUGFubmV0b24gYW5kIFBpZXJyZSBMJ2VjdXllciwgdGFrZXNcbi8vIGEgZGlmZmVyZW50IGFwcHJvYWNoOiBpdCBhZGRzIHJvYnVzdG5lc3MgYnkgYWxsb3dpbmcgbW9yZSBzaGlmdHNcbi8vIHRoYW4gTWFyc2FnbGlhJ3Mgb3JpZ2luYWwgdGhyZWUuICBJdCBpcyBhIDctc2hpZnQgZ2VuZXJhdG9yXG4vLyB3aXRoIDI1NiBiaXRzLCB0aGF0IHBhc3NlcyBCaWdDcnVzaCB3aXRoIG5vIHN5c3RtYXRpYyBmYWlsdXJlcy5cbi8vIFBlcmlvZCAyXjI1Ni0xLlxuLy8gTm8gc3lzdGVtYXRpYyBCaWdDcnVzaCBmYWlsdXJlcyByZXBvcnRlZC5cbnZhciB4b3JzaGlmdDcgPSByZXF1aXJlKCcuL2xpYi94b3JzaGlmdDcnKTtcblxuLy8geG9yNDA5NiwgYnkgUmljaGFyZCBCcmVudCwgaXMgYSA0MDk2LWJpdCB4b3Itc2hpZnQgd2l0aCBhXG4vLyB2ZXJ5IGxvbmcgcGVyaW9kIHRoYXQgYWxzbyBhZGRzIGEgV2V5bCBnZW5lcmF0b3IuIEl0IGFsc28gcGFzc2VzXG4vLyBCaWdDcnVzaCB3aXRoIG5vIHN5c3RlbWF0aWMgZmFpbHVyZXMuICBJdHMgbG9uZyBwZXJpb2QgbWF5XG4vLyBiZSB1c2VmdWwgaWYgeW91IGhhdmUgbWFueSBnZW5lcmF0b3JzIGFuZCBuZWVkIHRvIGF2b2lkXG4vLyBjb2xsaXNpb25zLlxuLy8gUGVyaW9kOiAyXjQxMjgtMl4zMi5cbi8vIE5vIHN5c3RlbWF0aWMgQmlnQ3J1c2ggZmFpbHVyZXMgcmVwb3J0ZWQuXG52YXIgeG9yNDA5NiA9IHJlcXVpcmUoJy4vbGliL3hvcjQwOTYnKTtcblxuLy8gVHljaGUtaSwgYnkgU2FtdWVsIE5ldmVzIGFuZCBGaWxpcGUgQXJhdWpvLCBpcyBhIGJpdC1zaGlmdGluZyByYW5kb21cbi8vIG51bWJlciBnZW5lcmF0b3IgZGVyaXZlZCBmcm9tIENoYUNoYSwgYSBtb2Rlcm4gc3RyZWFtIGNpcGhlci5cbi8vIGh0dHBzOi8vZWRlbi5kZWkudWMucHQvfnNuZXZlcy9wdWJzLzIwMTEtc25mYTIucGRmXG4vLyBQZXJpb2Q6IH4yXjEyN1xuLy8gTm8gc3lzdGVtYXRpYyBCaWdDcnVzaCBmYWlsdXJlcyByZXBvcnRlZC5cbnZhciB0eWNoZWkgPSByZXF1aXJlKCcuL2xpYi90eWNoZWknKTtcblxuLy8gVGhlIG9yaWdpbmFsIEFSQzQtYmFzZWQgcHJuZyBpbmNsdWRlZCBpbiB0aGlzIGxpYnJhcnkuXG4vLyBQZXJpb2Q6IH4yXjE2MDBcbnZhciBzciA9IHJlcXVpcmUoJy4vc2VlZHJhbmRvbScpO1xuXG5zci5hbGVhID0gYWxlYTtcbnNyLnhvcjEyOCA9IHhvcjEyODtcbnNyLnhvcndvdyA9IHhvcndvdztcbnNyLnhvcnNoaWZ0NyA9IHhvcnNoaWZ0NztcbnNyLnhvcjQwOTYgPSB4b3I0MDk2O1xuc3IudHljaGVpID0gdHljaGVpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNyO1xuIiwiLy8gQSBwb3J0IG9mIGFuIGFsZ29yaXRobSBieSBKb2hhbm5lcyBCYWFnw7hlIDxiYWFnb2VAYmFhZ29lLmNvbT4sIDIwMTBcbi8vIGh0dHA6Ly9iYWFnb2UuY29tL2VuL1JhbmRvbU11c2luZ3MvamF2YXNjcmlwdC9cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9ucXVpbmxhbi9iZXR0ZXItcmFuZG9tLW51bWJlcnMtZm9yLWphdmFzY3JpcHQtbWlycm9yXG4vLyBPcmlnaW5hbCB3b3JrIGlzIHVuZGVyIE1JVCBsaWNlbnNlIC1cblxuLy8gQ29weXJpZ2h0IChDKSAyMDEwIGJ5IEpvaGFubmVzIEJhYWfDuGUgPGJhYWdvZUBiYWFnb2Uub3JnPlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vIFxuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy8gXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuXG5cbihmdW5jdGlvbihnbG9iYWwsIG1vZHVsZSwgZGVmaW5lKSB7XG5cbmZ1bmN0aW9uIEFsZWEoc2VlZCkge1xuICB2YXIgbWUgPSB0aGlzLCBtYXNoID0gTWFzaCgpO1xuXG4gIG1lLm5leHQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdCA9IDIwOTE2MzkgKiBtZS5zMCArIG1lLmMgKiAyLjMyODMwNjQzNjUzODY5NjNlLTEwOyAvLyAyXi0zMlxuICAgIG1lLnMwID0gbWUuczE7XG4gICAgbWUuczEgPSBtZS5zMjtcbiAgICByZXR1cm4gbWUuczIgPSB0IC0gKG1lLmMgPSB0IHwgMCk7XG4gIH07XG5cbiAgLy8gQXBwbHkgdGhlIHNlZWRpbmcgYWxnb3JpdGhtIGZyb20gQmFhZ29lLlxuICBtZS5jID0gMTtcbiAgbWUuczAgPSBtYXNoKCcgJyk7XG4gIG1lLnMxID0gbWFzaCgnICcpO1xuICBtZS5zMiA9IG1hc2goJyAnKTtcbiAgbWUuczAgLT0gbWFzaChzZWVkKTtcbiAgaWYgKG1lLnMwIDwgMCkgeyBtZS5zMCArPSAxOyB9XG4gIG1lLnMxIC09IG1hc2goc2VlZCk7XG4gIGlmIChtZS5zMSA8IDApIHsgbWUuczEgKz0gMTsgfVxuICBtZS5zMiAtPSBtYXNoKHNlZWQpO1xuICBpZiAobWUuczIgPCAwKSB7IG1lLnMyICs9IDE7IH1cbiAgbWFzaCA9IG51bGw7XG59XG5cbmZ1bmN0aW9uIGNvcHkoZiwgdCkge1xuICB0LmMgPSBmLmM7XG4gIHQuczAgPSBmLnMwO1xuICB0LnMxID0gZi5zMTtcbiAgdC5zMiA9IGYuczI7XG4gIHJldHVybiB0O1xufVxuXG5mdW5jdGlvbiBpbXBsKHNlZWQsIG9wdHMpIHtcbiAgdmFyIHhnID0gbmV3IEFsZWEoc2VlZCksXG4gICAgICBzdGF0ZSA9IG9wdHMgJiYgb3B0cy5zdGF0ZSxcbiAgICAgIHBybmcgPSB4Zy5uZXh0O1xuICBwcm5nLmludDMyID0gZnVuY3Rpb24oKSB7IHJldHVybiAoeGcubmV4dCgpICogMHgxMDAwMDAwMDApIHwgMDsgfVxuICBwcm5nLmRvdWJsZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBwcm5nKCkgKyAocHJuZygpICogMHgyMDAwMDAgfCAwKSAqIDEuMTEwMjIzMDI0NjI1MTU2NWUtMTY7IC8vIDJeLTUzXG4gIH07XG4gIHBybmcucXVpY2sgPSBwcm5nO1xuICBpZiAoc3RhdGUpIHtcbiAgICBpZiAodHlwZW9mKHN0YXRlKSA9PSAnb2JqZWN0JykgY29weShzdGF0ZSwgeGcpO1xuICAgIHBybmcuc3RhdGUgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvcHkoeGcsIHt9KTsgfVxuICB9XG4gIHJldHVybiBwcm5nO1xufVxuXG5mdW5jdGlvbiBNYXNoKCkge1xuICB2YXIgbiA9IDB4ZWZjODI0OWQ7XG5cbiAgdmFyIG1hc2ggPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgZGF0YSA9IGRhdGEudG9TdHJpbmcoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIG4gKz0gZGF0YS5jaGFyQ29kZUF0KGkpO1xuICAgICAgdmFyIGggPSAwLjAyNTE5NjAzMjgyNDE2OTM4ICogbjtcbiAgICAgIG4gPSBoID4+PiAwO1xuICAgICAgaCAtPSBuO1xuICAgICAgaCAqPSBuO1xuICAgICAgbiA9IGggPj4+IDA7XG4gICAgICBoIC09IG47XG4gICAgICBuICs9IGggKiAweDEwMDAwMDAwMDsgLy8gMl4zMlxuICAgIH1cbiAgICByZXR1cm4gKG4gPj4+IDApICogMi4zMjgzMDY0MzY1Mzg2OTYzZS0xMDsgLy8gMl4tMzJcbiAgfTtcblxuICByZXR1cm4gbWFzaDtcbn1cblxuXG5pZiAobW9kdWxlICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gaW1wbDtcbn0gZWxzZSBpZiAoZGVmaW5lICYmIGRlZmluZS5hbWQpIHtcbiAgZGVmaW5lKGZ1bmN0aW9uKCkgeyByZXR1cm4gaW1wbDsgfSk7XG59IGVsc2Uge1xuICB0aGlzLmFsZWEgPSBpbXBsO1xufVxuXG59KShcbiAgdGhpcyxcbiAgKHR5cGVvZiBtb2R1bGUpID09ICdvYmplY3QnICYmIG1vZHVsZSwgICAgLy8gcHJlc2VudCBpbiBub2RlLmpzXG4gICh0eXBlb2YgZGVmaW5lKSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZSAgIC8vIHByZXNlbnQgd2l0aCBhbiBBTUQgbG9hZGVyXG4pO1xuXG5cbiIsIi8vIEEgSmF2YXNjcmlwdCBpbXBsZW1lbnRhaW9uIG9mIHRoZSBcIlR5Y2hlLWlcIiBwcm5nIGFsZ29yaXRobSBieVxuLy8gU2FtdWVsIE5ldmVzIGFuZCBGaWxpcGUgQXJhdWpvLlxuLy8gU2VlIGh0dHBzOi8vZWRlbi5kZWkudWMucHQvfnNuZXZlcy9wdWJzLzIwMTEtc25mYTIucGRmXG5cbihmdW5jdGlvbihnbG9iYWwsIG1vZHVsZSwgZGVmaW5lKSB7XG5cbmZ1bmN0aW9uIFhvckdlbihzZWVkKSB7XG4gIHZhciBtZSA9IHRoaXMsIHN0cnNlZWQgPSAnJztcblxuICAvLyBTZXQgdXAgZ2VuZXJhdG9yIGZ1bmN0aW9uLlxuICBtZS5uZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGIgPSBtZS5iLCBjID0gbWUuYywgZCA9IG1lLmQsIGEgPSBtZS5hO1xuICAgIGIgPSAoYiA8PCAyNSkgXiAoYiA+Pj4gNykgXiBjO1xuICAgIGMgPSAoYyAtIGQpIHwgMDtcbiAgICBkID0gKGQgPDwgMjQpIF4gKGQgPj4+IDgpIF4gYTtcbiAgICBhID0gKGEgLSBiKSB8IDA7XG4gICAgbWUuYiA9IGIgPSAoYiA8PCAyMCkgXiAoYiA+Pj4gMTIpIF4gYztcbiAgICBtZS5jID0gYyA9IChjIC0gZCkgfCAwO1xuICAgIG1lLmQgPSAoZCA8PCAxNikgXiAoYyA+Pj4gMTYpIF4gYTtcbiAgICByZXR1cm4gbWUuYSA9IChhIC0gYikgfCAwO1xuICB9O1xuXG4gIC8qIFRoZSBmb2xsb3dpbmcgaXMgbm9uLWludmVydGVkIHR5Y2hlLCB3aGljaCBoYXMgYmV0dGVyIGludGVybmFsXG4gICAqIGJpdCBkaWZmdXNpb24sIGJ1dCB3aGljaCBpcyBhYm91dCAyNSUgc2xvd2VyIHRoYW4gdHljaGUtaSBpbiBKUy5cbiAgbWUubmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhID0gbWUuYSwgYiA9IG1lLmIsIGMgPSBtZS5jLCBkID0gbWUuZDtcbiAgICBhID0gKG1lLmEgKyBtZS5iIHwgMCkgPj4+IDA7XG4gICAgZCA9IG1lLmQgXiBhOyBkID0gZCA8PCAxNiBeIGQgPj4+IDE2O1xuICAgIGMgPSBtZS5jICsgZCB8IDA7XG4gICAgYiA9IG1lLmIgXiBjOyBiID0gYiA8PCAxMiBeIGQgPj4+IDIwO1xuICAgIG1lLmEgPSBhID0gYSArIGIgfCAwO1xuICAgIGQgPSBkIF4gYTsgbWUuZCA9IGQgPSBkIDw8IDggXiBkID4+PiAyNDtcbiAgICBtZS5jID0gYyA9IGMgKyBkIHwgMDtcbiAgICBiID0gYiBeIGM7XG4gICAgcmV0dXJuIG1lLmIgPSAoYiA8PCA3IF4gYiA+Pj4gMjUpO1xuICB9XG4gICovXG5cbiAgbWUuYSA9IDA7XG4gIG1lLmIgPSAwO1xuICBtZS5jID0gMjY1NDQzNTc2OSB8IDA7XG4gIG1lLmQgPSAxMzY3MTMwNTUxO1xuXG4gIGlmIChzZWVkID09PSBNYXRoLmZsb29yKHNlZWQpKSB7XG4gICAgLy8gSW50ZWdlciBzZWVkLlxuICAgIG1lLmEgPSAoc2VlZCAvIDB4MTAwMDAwMDAwKSB8IDA7XG4gICAgbWUuYiA9IHNlZWQgfCAwO1xuICB9IGVsc2Uge1xuICAgIC8vIFN0cmluZyBzZWVkLlxuICAgIHN0cnNlZWQgKz0gc2VlZDtcbiAgfVxuXG4gIC8vIE1peCBpbiBzdHJpbmcgc2VlZCwgdGhlbiBkaXNjYXJkIGFuIGluaXRpYWwgYmF0Y2ggb2YgNjQgdmFsdWVzLlxuICBmb3IgKHZhciBrID0gMDsgayA8IHN0cnNlZWQubGVuZ3RoICsgMjA7IGsrKykge1xuICAgIG1lLmIgXj0gc3Ryc2VlZC5jaGFyQ29kZUF0KGspIHwgMDtcbiAgICBtZS5uZXh0KCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY29weShmLCB0KSB7XG4gIHQuYSA9IGYuYTtcbiAgdC5iID0gZi5iO1xuICB0LmMgPSBmLmM7XG4gIHQuZCA9IGYuZDtcbiAgcmV0dXJuIHQ7XG59O1xuXG5mdW5jdGlvbiBpbXBsKHNlZWQsIG9wdHMpIHtcbiAgdmFyIHhnID0gbmV3IFhvckdlbihzZWVkKSxcbiAgICAgIHN0YXRlID0gb3B0cyAmJiBvcHRzLnN0YXRlLFxuICAgICAgcHJuZyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gKHhnLm5leHQoKSA+Pj4gMCkgLyAweDEwMDAwMDAwMDsgfTtcbiAgcHJuZy5kb3VibGUgPSBmdW5jdGlvbigpIHtcbiAgICBkbyB7XG4gICAgICB2YXIgdG9wID0geGcubmV4dCgpID4+PiAxMSxcbiAgICAgICAgICBib3QgPSAoeGcubmV4dCgpID4+PiAwKSAvIDB4MTAwMDAwMDAwLFxuICAgICAgICAgIHJlc3VsdCA9ICh0b3AgKyBib3QpIC8gKDEgPDwgMjEpO1xuICAgIH0gd2hpbGUgKHJlc3VsdCA9PT0gMCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbiAgcHJuZy5pbnQzMiA9IHhnLm5leHQ7XG4gIHBybmcucXVpY2sgPSBwcm5nO1xuICBpZiAoc3RhdGUpIHtcbiAgICBpZiAodHlwZW9mKHN0YXRlKSA9PSAnb2JqZWN0JykgY29weShzdGF0ZSwgeGcpO1xuICAgIHBybmcuc3RhdGUgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvcHkoeGcsIHt9KTsgfVxuICB9XG4gIHJldHVybiBwcm5nO1xufVxuXG5pZiAobW9kdWxlICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gaW1wbDtcbn0gZWxzZSBpZiAoZGVmaW5lICYmIGRlZmluZS5hbWQpIHtcbiAgZGVmaW5lKGZ1bmN0aW9uKCkgeyByZXR1cm4gaW1wbDsgfSk7XG59IGVsc2Uge1xuICB0aGlzLnR5Y2hlaSA9IGltcGw7XG59XG5cbn0pKFxuICB0aGlzLFxuICAodHlwZW9mIG1vZHVsZSkgPT0gJ29iamVjdCcgJiYgbW9kdWxlLCAgICAvLyBwcmVzZW50IGluIG5vZGUuanNcbiAgKHR5cGVvZiBkZWZpbmUpID09ICdmdW5jdGlvbicgJiYgZGVmaW5lICAgLy8gcHJlc2VudCB3aXRoIGFuIEFNRCBsb2FkZXJcbik7XG5cblxuIiwiLy8gQSBKYXZhc2NyaXB0IGltcGxlbWVudGFpb24gb2YgdGhlIFwieG9yMTI4XCIgcHJuZyBhbGdvcml0aG0gYnlcbi8vIEdlb3JnZSBNYXJzYWdsaWEuICBTZWUgaHR0cDovL3d3dy5qc3RhdHNvZnQub3JnL3YwOC9pMTQvcGFwZXJcblxuKGZ1bmN0aW9uKGdsb2JhbCwgbW9kdWxlLCBkZWZpbmUpIHtcblxuZnVuY3Rpb24gWG9yR2VuKHNlZWQpIHtcbiAgdmFyIG1lID0gdGhpcywgc3Ryc2VlZCA9ICcnO1xuXG4gIG1lLnggPSAwO1xuICBtZS55ID0gMDtcbiAgbWUueiA9IDA7XG4gIG1lLncgPSAwO1xuXG4gIC8vIFNldCB1cCBnZW5lcmF0b3IgZnVuY3Rpb24uXG4gIG1lLm5leHQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdCA9IG1lLnggXiAobWUueCA8PCAxMSk7XG4gICAgbWUueCA9IG1lLnk7XG4gICAgbWUueSA9IG1lLno7XG4gICAgbWUueiA9IG1lLnc7XG4gICAgcmV0dXJuIG1lLncgXj0gKG1lLncgPj4+IDE5KSBeIHQgXiAodCA+Pj4gOCk7XG4gIH07XG5cbiAgaWYgKHNlZWQgPT09IChzZWVkIHwgMCkpIHtcbiAgICAvLyBJbnRlZ2VyIHNlZWQuXG4gICAgbWUueCA9IHNlZWQ7XG4gIH0gZWxzZSB7XG4gICAgLy8gU3RyaW5nIHNlZWQuXG4gICAgc3Ryc2VlZCArPSBzZWVkO1xuICB9XG5cbiAgLy8gTWl4IGluIHN0cmluZyBzZWVkLCB0aGVuIGRpc2NhcmQgYW4gaW5pdGlhbCBiYXRjaCBvZiA2NCB2YWx1ZXMuXG4gIGZvciAodmFyIGsgPSAwOyBrIDwgc3Ryc2VlZC5sZW5ndGggKyA2NDsgaysrKSB7XG4gICAgbWUueCBePSBzdHJzZWVkLmNoYXJDb2RlQXQoaykgfCAwO1xuICAgIG1lLm5leHQoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjb3B5KGYsIHQpIHtcbiAgdC54ID0gZi54O1xuICB0LnkgPSBmLnk7XG4gIHQueiA9IGYuejtcbiAgdC53ID0gZi53O1xuICByZXR1cm4gdDtcbn1cblxuZnVuY3Rpb24gaW1wbChzZWVkLCBvcHRzKSB7XG4gIHZhciB4ZyA9IG5ldyBYb3JHZW4oc2VlZCksXG4gICAgICBzdGF0ZSA9IG9wdHMgJiYgb3B0cy5zdGF0ZSxcbiAgICAgIHBybmcgPSBmdW5jdGlvbigpIHsgcmV0dXJuICh4Zy5uZXh0KCkgPj4+IDApIC8gMHgxMDAwMDAwMDA7IH07XG4gIHBybmcuZG91YmxlID0gZnVuY3Rpb24oKSB7XG4gICAgZG8ge1xuICAgICAgdmFyIHRvcCA9IHhnLm5leHQoKSA+Pj4gMTEsXG4gICAgICAgICAgYm90ID0gKHhnLm5leHQoKSA+Pj4gMCkgLyAweDEwMDAwMDAwMCxcbiAgICAgICAgICByZXN1bHQgPSAodG9wICsgYm90KSAvICgxIDw8IDIxKTtcbiAgICB9IHdoaWxlIChyZXN1bHQgPT09IDApO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIHBybmcuaW50MzIgPSB4Zy5uZXh0O1xuICBwcm5nLnF1aWNrID0gcHJuZztcbiAgaWYgKHN0YXRlKSB7XG4gICAgaWYgKHR5cGVvZihzdGF0ZSkgPT0gJ29iamVjdCcpIGNvcHkoc3RhdGUsIHhnKTtcbiAgICBwcm5nLnN0YXRlID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb3B5KHhnLCB7fSk7IH1cbiAgfVxuICByZXR1cm4gcHJuZztcbn1cblxuaWYgKG1vZHVsZSAmJiBtb2R1bGUuZXhwb3J0cykge1xuICBtb2R1bGUuZXhwb3J0cyA9IGltcGw7XG59IGVsc2UgaWYgKGRlZmluZSAmJiBkZWZpbmUuYW1kKSB7XG4gIGRlZmluZShmdW5jdGlvbigpIHsgcmV0dXJuIGltcGw7IH0pO1xufSBlbHNlIHtcbiAgdGhpcy54b3IxMjggPSBpbXBsO1xufVxuXG59KShcbiAgdGhpcyxcbiAgKHR5cGVvZiBtb2R1bGUpID09ICdvYmplY3QnICYmIG1vZHVsZSwgICAgLy8gcHJlc2VudCBpbiBub2RlLmpzXG4gICh0eXBlb2YgZGVmaW5lKSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZSAgIC8vIHByZXNlbnQgd2l0aCBhbiBBTUQgbG9hZGVyXG4pO1xuXG5cbiIsIi8vIEEgSmF2YXNjcmlwdCBpbXBsZW1lbnRhaW9uIG9mIFJpY2hhcmQgQnJlbnQncyBYb3JnZW5zIHhvcjQwOTYgYWxnb3JpdGhtLlxuLy9cbi8vIFRoaXMgZmFzdCBub24tY3J5cHRvZ3JhcGhpYyByYW5kb20gbnVtYmVyIGdlbmVyYXRvciBpcyBkZXNpZ25lZCBmb3Jcbi8vIHVzZSBpbiBNb250ZS1DYXJsbyBhbGdvcml0aG1zLiBJdCBjb21iaW5lcyBhIGxvbmctcGVyaW9kIHhvcnNoaWZ0XG4vLyBnZW5lcmF0b3Igd2l0aCBhIFdleWwgZ2VuZXJhdG9yLCBhbmQgaXQgcGFzc2VzIGFsbCBjb21tb24gYmF0dGVyaWVzXG4vLyBvZiBzdGFzdGljaWFsIHRlc3RzIGZvciByYW5kb21uZXNzIHdoaWxlIGNvbnN1bWluZyBvbmx5IGEgZmV3IG5hbm9zZWNvbmRzXG4vLyBmb3IgZWFjaCBwcm5nIGdlbmVyYXRlZC4gIEZvciBiYWNrZ3JvdW5kIG9uIHRoZSBnZW5lcmF0b3IsIHNlZSBCcmVudCdzXG4vLyBwYXBlcjogXCJTb21lIGxvbmctcGVyaW9kIHJhbmRvbSBudW1iZXIgZ2VuZXJhdG9ycyB1c2luZyBzaGlmdHMgYW5kIHhvcnMuXCJcbi8vIGh0dHA6Ly9hcnhpdi5vcmcvcGRmLzEwMDQuMzExNXYxLnBkZlxuLy9cbi8vIFVzYWdlOlxuLy9cbi8vIHZhciB4b3I0MDk2ID0gcmVxdWlyZSgneG9yNDA5NicpO1xuLy8gcmFuZG9tID0geG9yNDA5NigxKTsgICAgICAgICAgICAgICAgICAgICAgICAvLyBTZWVkIHdpdGggaW50MzIgb3Igc3RyaW5nLlxuLy8gYXNzZXJ0LmVxdWFsKHJhbmRvbSgpLCAwLjE1MjA0MzY0NTA1Mzg1NDcpOyAvLyAoMCwgMSkgcmFuZ2UsIDUzIGJpdHMuXG4vLyBhc3NlcnQuZXF1YWwocmFuZG9tLmludDMyKCksIDE4MDY1MzQ4OTcpOyAgIC8vIHNpZ25lZCBpbnQzMiwgMzIgYml0cy5cbi8vXG4vLyBGb3Igbm9uemVybyBudW1lcmljIGtleXMsIHRoaXMgaW1wZWxlbWVudGF0aW9uIHByb3ZpZGVzIGEgc2VxdWVuY2Vcbi8vIGlkZW50aWNhbCB0byB0aGF0IGJ5IEJyZW50J3MgeG9yZ2VucyAzIGltcGxlbWVudGFpb24gaW4gQy4gIFRoaXNcbi8vIGltcGxlbWVudGF0aW9uIGFsc28gcHJvdmlkZXMgZm9yIGluaXRhbGl6aW5nIHRoZSBnZW5lcmF0b3Igd2l0aFxuLy8gc3RyaW5nIHNlZWRzLCBvciBmb3Igc2F2aW5nIGFuZCByZXN0b3JpbmcgdGhlIHN0YXRlIG9mIHRoZSBnZW5lcmF0b3IuXG4vL1xuLy8gT24gQ2hyb21lLCB0aGlzIHBybmcgYmVuY2htYXJrcyBhYm91dCAyLjEgdGltZXMgc2xvd2VyIHRoYW5cbi8vIEphdmFzY3JpcHQncyBidWlsdC1pbiBNYXRoLnJhbmRvbSgpLlxuXG4oZnVuY3Rpb24oZ2xvYmFsLCBtb2R1bGUsIGRlZmluZSkge1xuXG5mdW5jdGlvbiBYb3JHZW4oc2VlZCkge1xuICB2YXIgbWUgPSB0aGlzO1xuXG4gIC8vIFNldCB1cCBnZW5lcmF0b3IgZnVuY3Rpb24uXG4gIG1lLm5leHQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdyA9IG1lLncsXG4gICAgICAgIFggPSBtZS5YLCBpID0gbWUuaSwgdCwgdjtcbiAgICAvLyBVcGRhdGUgV2V5bCBnZW5lcmF0b3IuXG4gICAgbWUudyA9IHcgPSAodyArIDB4NjFjODg2NDcpIHwgMDtcbiAgICAvLyBVcGRhdGUgeG9yIGdlbmVyYXRvci5cbiAgICB2ID0gWFsoaSArIDM0KSAmIDEyN107XG4gICAgdCA9IFhbaSA9ICgoaSArIDEpICYgMTI3KV07XG4gICAgdiBePSB2IDw8IDEzO1xuICAgIHQgXj0gdCA8PCAxNztcbiAgICB2IF49IHYgPj4+IDE1O1xuICAgIHQgXj0gdCA+Pj4gMTI7XG4gICAgLy8gVXBkYXRlIFhvciBnZW5lcmF0b3IgYXJyYXkgc3RhdGUuXG4gICAgdiA9IFhbaV0gPSB2IF4gdDtcbiAgICBtZS5pID0gaTtcbiAgICAvLyBSZXN1bHQgaXMgdGhlIGNvbWJpbmF0aW9uLlxuICAgIHJldHVybiAodiArICh3IF4gKHcgPj4+IDE2KSkpIHwgMDtcbiAgfTtcblxuICBmdW5jdGlvbiBpbml0KG1lLCBzZWVkKSB7XG4gICAgdmFyIHQsIHYsIGksIGosIHcsIFggPSBbXSwgbGltaXQgPSAxMjg7XG4gICAgaWYgKHNlZWQgPT09IChzZWVkIHwgMCkpIHtcbiAgICAgIC8vIE51bWVyaWMgc2VlZHMgaW5pdGlhbGl6ZSB2LCB3aGljaCBpcyB1c2VkIHRvIGdlbmVyYXRlcyBYLlxuICAgICAgdiA9IHNlZWQ7XG4gICAgICBzZWVkID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU3RyaW5nIHNlZWRzIGFyZSBtaXhlZCBpbnRvIHYgYW5kIFggb25lIGNoYXJhY3RlciBhdCBhIHRpbWUuXG4gICAgICBzZWVkID0gc2VlZCArICdcXDAnO1xuICAgICAgdiA9IDA7XG4gICAgICBsaW1pdCA9IE1hdGgubWF4KGxpbWl0LCBzZWVkLmxlbmd0aCk7XG4gICAgfVxuICAgIC8vIEluaXRpYWxpemUgY2lyY3VsYXIgYXJyYXkgYW5kIHdleWwgdmFsdWUuXG4gICAgZm9yIChpID0gMCwgaiA9IC0zMjsgaiA8IGxpbWl0OyArK2opIHtcbiAgICAgIC8vIFB1dCB0aGUgdW5pY29kZSBjaGFyYWN0ZXJzIGludG8gdGhlIGFycmF5LCBhbmQgc2h1ZmZsZSB0aGVtLlxuICAgICAgaWYgKHNlZWQpIHYgXj0gc2VlZC5jaGFyQ29kZUF0KChqICsgMzIpICUgc2VlZC5sZW5ndGgpO1xuICAgICAgLy8gQWZ0ZXIgMzIgc2h1ZmZsZXMsIHRha2UgdiBhcyB0aGUgc3RhcnRpbmcgdyB2YWx1ZS5cbiAgICAgIGlmIChqID09PSAwKSB3ID0gdjtcbiAgICAgIHYgXj0gdiA8PCAxMDtcbiAgICAgIHYgXj0gdiA+Pj4gMTU7XG4gICAgICB2IF49IHYgPDwgNDtcbiAgICAgIHYgXj0gdiA+Pj4gMTM7XG4gICAgICBpZiAoaiA+PSAwKSB7XG4gICAgICAgIHcgPSAodyArIDB4NjFjODg2NDcpIHwgMDsgICAgIC8vIFdleWwuXG4gICAgICAgIHQgPSAoWFtqICYgMTI3XSBePSAodiArIHcpKTsgIC8vIENvbWJpbmUgeG9yIGFuZCB3ZXlsIHRvIGluaXQgYXJyYXkuXG4gICAgICAgIGkgPSAoMCA9PSB0KSA/IGkgKyAxIDogMDsgICAgIC8vIENvdW50IHplcm9lcy5cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gV2UgaGF2ZSBkZXRlY3RlZCBhbGwgemVyb2VzOyBtYWtlIHRoZSBrZXkgbm9uemVyby5cbiAgICBpZiAoaSA+PSAxMjgpIHtcbiAgICAgIFhbKHNlZWQgJiYgc2VlZC5sZW5ndGggfHwgMCkgJiAxMjddID0gLTE7XG4gICAgfVxuICAgIC8vIFJ1biB0aGUgZ2VuZXJhdG9yIDUxMiB0aW1lcyB0byBmdXJ0aGVyIG1peCB0aGUgc3RhdGUgYmVmb3JlIHVzaW5nIGl0LlxuICAgIC8vIEZhY3RvcmluZyB0aGlzIGFzIGEgZnVuY3Rpb24gc2xvd3MgdGhlIG1haW4gZ2VuZXJhdG9yLCBzbyBpdCBpcyBqdXN0XG4gICAgLy8gdW5yb2xsZWQgaGVyZS4gIFRoZSB3ZXlsIGdlbmVyYXRvciBpcyBub3QgYWR2YW5jZWQgd2hpbGUgd2FybWluZyB1cC5cbiAgICBpID0gMTI3O1xuICAgIGZvciAoaiA9IDQgKiAxMjg7IGogPiAwOyAtLWopIHtcbiAgICAgIHYgPSBYWyhpICsgMzQpICYgMTI3XTtcbiAgICAgIHQgPSBYW2kgPSAoKGkgKyAxKSAmIDEyNyldO1xuICAgICAgdiBePSB2IDw8IDEzO1xuICAgICAgdCBePSB0IDw8IDE3O1xuICAgICAgdiBePSB2ID4+PiAxNTtcbiAgICAgIHQgXj0gdCA+Pj4gMTI7XG4gICAgICBYW2ldID0gdiBeIHQ7XG4gICAgfVxuICAgIC8vIFN0b3Jpbmcgc3RhdGUgYXMgb2JqZWN0IG1lbWJlcnMgaXMgZmFzdGVyIHRoYW4gdXNpbmcgY2xvc3VyZSB2YXJpYWJsZXMuXG4gICAgbWUudyA9IHc7XG4gICAgbWUuWCA9IFg7XG4gICAgbWUuaSA9IGk7XG4gIH1cblxuICBpbml0KG1lLCBzZWVkKTtcbn1cblxuZnVuY3Rpb24gY29weShmLCB0KSB7XG4gIHQuaSA9IGYuaTtcbiAgdC53ID0gZi53O1xuICB0LlggPSBmLlguc2xpY2UoKTtcbiAgcmV0dXJuIHQ7XG59O1xuXG5mdW5jdGlvbiBpbXBsKHNlZWQsIG9wdHMpIHtcbiAgaWYgKHNlZWQgPT0gbnVsbCkgc2VlZCA9ICsobmV3IERhdGUpO1xuICB2YXIgeGcgPSBuZXcgWG9yR2VuKHNlZWQpLFxuICAgICAgc3RhdGUgPSBvcHRzICYmIG9wdHMuc3RhdGUsXG4gICAgICBwcm5nID0gZnVuY3Rpb24oKSB7IHJldHVybiAoeGcubmV4dCgpID4+PiAwKSAvIDB4MTAwMDAwMDAwOyB9O1xuICBwcm5nLmRvdWJsZSA9IGZ1bmN0aW9uKCkge1xuICAgIGRvIHtcbiAgICAgIHZhciB0b3AgPSB4Zy5uZXh0KCkgPj4+IDExLFxuICAgICAgICAgIGJvdCA9ICh4Zy5uZXh0KCkgPj4+IDApIC8gMHgxMDAwMDAwMDAsXG4gICAgICAgICAgcmVzdWx0ID0gKHRvcCArIGJvdCkgLyAoMSA8PCAyMSk7XG4gICAgfSB3aGlsZSAocmVzdWx0ID09PSAwKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICBwcm5nLmludDMyID0geGcubmV4dDtcbiAgcHJuZy5xdWljayA9IHBybmc7XG4gIGlmIChzdGF0ZSkge1xuICAgIGlmIChzdGF0ZS5YKSBjb3B5KHN0YXRlLCB4Zyk7XG4gICAgcHJuZy5zdGF0ZSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29weSh4Zywge30pOyB9XG4gIH1cbiAgcmV0dXJuIHBybmc7XG59XG5cbmlmIChtb2R1bGUgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBpbXBsO1xufSBlbHNlIGlmIChkZWZpbmUgJiYgZGVmaW5lLmFtZCkge1xuICBkZWZpbmUoZnVuY3Rpb24oKSB7IHJldHVybiBpbXBsOyB9KTtcbn0gZWxzZSB7XG4gIHRoaXMueG9yNDA5NiA9IGltcGw7XG59XG5cbn0pKFxuICB0aGlzLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3aW5kb3cgb2JqZWN0IG9yIGdsb2JhbFxuICAodHlwZW9mIG1vZHVsZSkgPT0gJ29iamVjdCcgJiYgbW9kdWxlLCAgICAvLyBwcmVzZW50IGluIG5vZGUuanNcbiAgKHR5cGVvZiBkZWZpbmUpID09ICdmdW5jdGlvbicgJiYgZGVmaW5lICAgLy8gcHJlc2VudCB3aXRoIGFuIEFNRCBsb2FkZXJcbik7XG4iLCIvLyBBIEphdmFzY3JpcHQgaW1wbGVtZW50YWlvbiBvZiB0aGUgXCJ4b3JzaGlmdDdcIiBhbGdvcml0aG0gYnlcbi8vIEZyYW7Dp29pcyBQYW5uZXRvbiBhbmQgUGllcnJlIEwnZWN1eWVyOlxuLy8gXCJPbiB0aGUgWG9yZ3NoaWZ0IFJhbmRvbSBOdW1iZXIgR2VuZXJhdG9yc1wiXG4vLyBodHRwOi8vc2FsdWMuZW5nci51Y29ubi5lZHUvcmVmcy9jcnlwdG8vcm5nL3Bhbm5ldG9uMDVvbnRoZXhvcnNoaWZ0LnBkZlxuXG4oZnVuY3Rpb24oZ2xvYmFsLCBtb2R1bGUsIGRlZmluZSkge1xuXG5mdW5jdGlvbiBYb3JHZW4oc2VlZCkge1xuICB2YXIgbWUgPSB0aGlzO1xuXG4gIC8vIFNldCB1cCBnZW5lcmF0b3IgZnVuY3Rpb24uXG4gIG1lLm5leHQgPSBmdW5jdGlvbigpIHtcbiAgICAvLyBVcGRhdGUgeG9yIGdlbmVyYXRvci5cbiAgICB2YXIgWCA9IG1lLngsIGkgPSBtZS5pLCB0LCB2LCB3O1xuICAgIHQgPSBYW2ldOyB0IF49ICh0ID4+PiA3KTsgdiA9IHQgXiAodCA8PCAyNCk7XG4gICAgdCA9IFhbKGkgKyAxKSAmIDddOyB2IF49IHQgXiAodCA+Pj4gMTApO1xuICAgIHQgPSBYWyhpICsgMykgJiA3XTsgdiBePSB0IF4gKHQgPj4+IDMpO1xuICAgIHQgPSBYWyhpICsgNCkgJiA3XTsgdiBePSB0IF4gKHQgPDwgNyk7XG4gICAgdCA9IFhbKGkgKyA3KSAmIDddOyB0ID0gdCBeICh0IDw8IDEzKTsgdiBePSB0IF4gKHQgPDwgOSk7XG4gICAgWFtpXSA9IHY7XG4gICAgbWUuaSA9IChpICsgMSkgJiA3O1xuICAgIHJldHVybiB2O1xuICB9O1xuXG4gIGZ1bmN0aW9uIGluaXQobWUsIHNlZWQpIHtcbiAgICB2YXIgaiwgdywgWCA9IFtdO1xuXG4gICAgaWYgKHNlZWQgPT09IChzZWVkIHwgMCkpIHtcbiAgICAgIC8vIFNlZWQgc3RhdGUgYXJyYXkgdXNpbmcgYSAzMi1iaXQgaW50ZWdlci5cbiAgICAgIHcgPSBYWzBdID0gc2VlZDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU2VlZCBzdGF0ZSB1c2luZyBhIHN0cmluZy5cbiAgICAgIHNlZWQgPSAnJyArIHNlZWQ7XG4gICAgICBmb3IgKGogPSAwOyBqIDwgc2VlZC5sZW5ndGg7ICsraikge1xuICAgICAgICBYW2ogJiA3XSA9IChYW2ogJiA3XSA8PCAxNSkgXlxuICAgICAgICAgICAgKHNlZWQuY2hhckNvZGVBdChqKSArIFhbKGogKyAxKSAmIDddIDw8IDEzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gRW5mb3JjZSBhbiBhcnJheSBsZW5ndGggb2YgOCwgbm90IGFsbCB6ZXJvZXMuXG4gICAgd2hpbGUgKFgubGVuZ3RoIDwgOCkgWC5wdXNoKDApO1xuICAgIGZvciAoaiA9IDA7IGogPCA4ICYmIFhbal0gPT09IDA7ICsraik7XG4gICAgaWYgKGogPT0gOCkgdyA9IFhbN10gPSAtMTsgZWxzZSB3ID0gWFtqXTtcblxuICAgIG1lLnggPSBYO1xuICAgIG1lLmkgPSAwO1xuXG4gICAgLy8gRGlzY2FyZCBhbiBpbml0aWFsIDI1NiB2YWx1ZXMuXG4gICAgZm9yIChqID0gMjU2OyBqID4gMDsgLS1qKSB7XG4gICAgICBtZS5uZXh0KCk7XG4gICAgfVxuICB9XG5cbiAgaW5pdChtZSwgc2VlZCk7XG59XG5cbmZ1bmN0aW9uIGNvcHkoZiwgdCkge1xuICB0LnggPSBmLnguc2xpY2UoKTtcbiAgdC5pID0gZi5pO1xuICByZXR1cm4gdDtcbn1cblxuZnVuY3Rpb24gaW1wbChzZWVkLCBvcHRzKSB7XG4gIGlmIChzZWVkID09IG51bGwpIHNlZWQgPSArKG5ldyBEYXRlKTtcbiAgdmFyIHhnID0gbmV3IFhvckdlbihzZWVkKSxcbiAgICAgIHN0YXRlID0gb3B0cyAmJiBvcHRzLnN0YXRlLFxuICAgICAgcHJuZyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gKHhnLm5leHQoKSA+Pj4gMCkgLyAweDEwMDAwMDAwMDsgfTtcbiAgcHJuZy5kb3VibGUgPSBmdW5jdGlvbigpIHtcbiAgICBkbyB7XG4gICAgICB2YXIgdG9wID0geGcubmV4dCgpID4+PiAxMSxcbiAgICAgICAgICBib3QgPSAoeGcubmV4dCgpID4+PiAwKSAvIDB4MTAwMDAwMDAwLFxuICAgICAgICAgIHJlc3VsdCA9ICh0b3AgKyBib3QpIC8gKDEgPDwgMjEpO1xuICAgIH0gd2hpbGUgKHJlc3VsdCA9PT0gMCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbiAgcHJuZy5pbnQzMiA9IHhnLm5leHQ7XG4gIHBybmcucXVpY2sgPSBwcm5nO1xuICBpZiAoc3RhdGUpIHtcbiAgICBpZiAoc3RhdGUueCkgY29weShzdGF0ZSwgeGcpO1xuICAgIHBybmcuc3RhdGUgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvcHkoeGcsIHt9KTsgfVxuICB9XG4gIHJldHVybiBwcm5nO1xufVxuXG5pZiAobW9kdWxlICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gaW1wbDtcbn0gZWxzZSBpZiAoZGVmaW5lICYmIGRlZmluZS5hbWQpIHtcbiAgZGVmaW5lKGZ1bmN0aW9uKCkgeyByZXR1cm4gaW1wbDsgfSk7XG59IGVsc2Uge1xuICB0aGlzLnhvcnNoaWZ0NyA9IGltcGw7XG59XG5cbn0pKFxuICB0aGlzLFxuICAodHlwZW9mIG1vZHVsZSkgPT0gJ29iamVjdCcgJiYgbW9kdWxlLCAgICAvLyBwcmVzZW50IGluIG5vZGUuanNcbiAgKHR5cGVvZiBkZWZpbmUpID09ICdmdW5jdGlvbicgJiYgZGVmaW5lICAgLy8gcHJlc2VudCB3aXRoIGFuIEFNRCBsb2FkZXJcbik7XG5cbiIsIi8vIEEgSmF2YXNjcmlwdCBpbXBsZW1lbnRhaW9uIG9mIHRoZSBcInhvcndvd1wiIHBybmcgYWxnb3JpdGhtIGJ5XG4vLyBHZW9yZ2UgTWFyc2FnbGlhLiAgU2VlIGh0dHA6Ly93d3cuanN0YXRzb2Z0Lm9yZy92MDgvaTE0L3BhcGVyXG5cbihmdW5jdGlvbihnbG9iYWwsIG1vZHVsZSwgZGVmaW5lKSB7XG5cbmZ1bmN0aW9uIFhvckdlbihzZWVkKSB7XG4gIHZhciBtZSA9IHRoaXMsIHN0cnNlZWQgPSAnJztcblxuICAvLyBTZXQgdXAgZ2VuZXJhdG9yIGZ1bmN0aW9uLlxuICBtZS5uZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHQgPSAobWUueCBeIChtZS54ID4+PiAyKSk7XG4gICAgbWUueCA9IG1lLnk7IG1lLnkgPSBtZS56OyBtZS56ID0gbWUudzsgbWUudyA9IG1lLnY7XG4gICAgcmV0dXJuIChtZS5kID0gKG1lLmQgKyAzNjI0MzcgfCAwKSkgK1xuICAgICAgIChtZS52ID0gKG1lLnYgXiAobWUudiA8PCA0KSkgXiAodCBeICh0IDw8IDEpKSkgfCAwO1xuICB9O1xuXG4gIG1lLnggPSAwO1xuICBtZS55ID0gMDtcbiAgbWUueiA9IDA7XG4gIG1lLncgPSAwO1xuICBtZS52ID0gMDtcblxuICBpZiAoc2VlZCA9PT0gKHNlZWQgfCAwKSkge1xuICAgIC8vIEludGVnZXIgc2VlZC5cbiAgICBtZS54ID0gc2VlZDtcbiAgfSBlbHNlIHtcbiAgICAvLyBTdHJpbmcgc2VlZC5cbiAgICBzdHJzZWVkICs9IHNlZWQ7XG4gIH1cblxuICAvLyBNaXggaW4gc3RyaW5nIHNlZWQsIHRoZW4gZGlzY2FyZCBhbiBpbml0aWFsIGJhdGNoIG9mIDY0IHZhbHVlcy5cbiAgZm9yICh2YXIgayA9IDA7IGsgPCBzdHJzZWVkLmxlbmd0aCArIDY0OyBrKyspIHtcbiAgICBtZS54IF49IHN0cnNlZWQuY2hhckNvZGVBdChrKSB8IDA7XG4gICAgaWYgKGsgPT0gc3Ryc2VlZC5sZW5ndGgpIHtcbiAgICAgIG1lLmQgPSBtZS54IDw8IDEwIF4gbWUueCA+Pj4gNDtcbiAgICB9XG4gICAgbWUubmV4dCgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNvcHkoZiwgdCkge1xuICB0LnggPSBmLng7XG4gIHQueSA9IGYueTtcbiAgdC56ID0gZi56O1xuICB0LncgPSBmLnc7XG4gIHQudiA9IGYudjtcbiAgdC5kID0gZi5kO1xuICByZXR1cm4gdDtcbn1cblxuZnVuY3Rpb24gaW1wbChzZWVkLCBvcHRzKSB7XG4gIHZhciB4ZyA9IG5ldyBYb3JHZW4oc2VlZCksXG4gICAgICBzdGF0ZSA9IG9wdHMgJiYgb3B0cy5zdGF0ZSxcbiAgICAgIHBybmcgPSBmdW5jdGlvbigpIHsgcmV0dXJuICh4Zy5uZXh0KCkgPj4+IDApIC8gMHgxMDAwMDAwMDA7IH07XG4gIHBybmcuZG91YmxlID0gZnVuY3Rpb24oKSB7XG4gICAgZG8ge1xuICAgICAgdmFyIHRvcCA9IHhnLm5leHQoKSA+Pj4gMTEsXG4gICAgICAgICAgYm90ID0gKHhnLm5leHQoKSA+Pj4gMCkgLyAweDEwMDAwMDAwMCxcbiAgICAgICAgICByZXN1bHQgPSAodG9wICsgYm90KSAvICgxIDw8IDIxKTtcbiAgICB9IHdoaWxlIChyZXN1bHQgPT09IDApO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIHBybmcuaW50MzIgPSB4Zy5uZXh0O1xuICBwcm5nLnF1aWNrID0gcHJuZztcbiAgaWYgKHN0YXRlKSB7XG4gICAgaWYgKHR5cGVvZihzdGF0ZSkgPT0gJ29iamVjdCcpIGNvcHkoc3RhdGUsIHhnKTtcbiAgICBwcm5nLnN0YXRlID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb3B5KHhnLCB7fSk7IH1cbiAgfVxuICByZXR1cm4gcHJuZztcbn1cblxuaWYgKG1vZHVsZSAmJiBtb2R1bGUuZXhwb3J0cykge1xuICBtb2R1bGUuZXhwb3J0cyA9IGltcGw7XG59IGVsc2UgaWYgKGRlZmluZSAmJiBkZWZpbmUuYW1kKSB7XG4gIGRlZmluZShmdW5jdGlvbigpIHsgcmV0dXJuIGltcGw7IH0pO1xufSBlbHNlIHtcbiAgdGhpcy54b3J3b3cgPSBpbXBsO1xufVxuXG59KShcbiAgdGhpcyxcbiAgKHR5cGVvZiBtb2R1bGUpID09ICdvYmplY3QnICYmIG1vZHVsZSwgICAgLy8gcHJlc2VudCBpbiBub2RlLmpzXG4gICh0eXBlb2YgZGVmaW5lKSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZSAgIC8vIHByZXNlbnQgd2l0aCBhbiBBTUQgbG9hZGVyXG4pO1xuXG5cbiIsIi8qXG5Db3B5cmlnaHQgMjAxNCBEYXZpZCBCYXUuXG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZ1xuYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG5cIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbndpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbmRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0b1xucGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvXG50aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG5pbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCxcbkVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULlxuSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTllcbkNMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsXG5UT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRVxuU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbiovXG5cbihmdW5jdGlvbiAocG9vbCwgbWF0aCkge1xuLy9cbi8vIFRoZSBmb2xsb3dpbmcgY29uc3RhbnRzIGFyZSByZWxhdGVkIHRvIElFRUUgNzU0IGxpbWl0cy5cbi8vXG52YXIgZ2xvYmFsID0gdGhpcyxcbiAgICB3aWR0aCA9IDI1NiwgICAgICAgIC8vIGVhY2ggUkM0IG91dHB1dCBpcyAwIDw9IHggPCAyNTZcbiAgICBjaHVua3MgPSA2LCAgICAgICAgIC8vIGF0IGxlYXN0IHNpeCBSQzQgb3V0cHV0cyBmb3IgZWFjaCBkb3VibGVcbiAgICBkaWdpdHMgPSA1MiwgICAgICAgIC8vIHRoZXJlIGFyZSA1MiBzaWduaWZpY2FudCBkaWdpdHMgaW4gYSBkb3VibGVcbiAgICBybmduYW1lID0gJ3JhbmRvbScsIC8vIHJuZ25hbWU6IG5hbWUgZm9yIE1hdGgucmFuZG9tIGFuZCBNYXRoLnNlZWRyYW5kb21cbiAgICBzdGFydGRlbm9tID0gbWF0aC5wb3cod2lkdGgsIGNodW5rcyksXG4gICAgc2lnbmlmaWNhbmNlID0gbWF0aC5wb3coMiwgZGlnaXRzKSxcbiAgICBvdmVyZmxvdyA9IHNpZ25pZmljYW5jZSAqIDIsXG4gICAgbWFzayA9IHdpZHRoIC0gMSxcbiAgICBub2RlY3J5cHRvOyAgICAgICAgIC8vIG5vZGUuanMgY3J5cHRvIG1vZHVsZSwgaW5pdGlhbGl6ZWQgYXQgdGhlIGJvdHRvbS5cblxuLy9cbi8vIHNlZWRyYW5kb20oKVxuLy8gVGhpcyBpcyB0aGUgc2VlZHJhbmRvbSBmdW5jdGlvbiBkZXNjcmliZWQgYWJvdmUuXG4vL1xuZnVuY3Rpb24gc2VlZHJhbmRvbShzZWVkLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICB2YXIga2V5ID0gW107XG4gIG9wdGlvbnMgPSAob3B0aW9ucyA9PSB0cnVlKSA/IHsgZW50cm9weTogdHJ1ZSB9IDogKG9wdGlvbnMgfHwge30pO1xuXG4gIC8vIEZsYXR0ZW4gdGhlIHNlZWQgc3RyaW5nIG9yIGJ1aWxkIG9uZSBmcm9tIGxvY2FsIGVudHJvcHkgaWYgbmVlZGVkLlxuICB2YXIgc2hvcnRzZWVkID0gbWl4a2V5KGZsYXR0ZW4oXG4gICAgb3B0aW9ucy5lbnRyb3B5ID8gW3NlZWQsIHRvc3RyaW5nKHBvb2wpXSA6XG4gICAgKHNlZWQgPT0gbnVsbCkgPyBhdXRvc2VlZCgpIDogc2VlZCwgMyksIGtleSk7XG5cbiAgLy8gVXNlIHRoZSBzZWVkIHRvIGluaXRpYWxpemUgYW4gQVJDNCBnZW5lcmF0b3IuXG4gIHZhciBhcmM0ID0gbmV3IEFSQzQoa2V5KTtcblxuICAvLyBUaGlzIGZ1bmN0aW9uIHJldHVybnMgYSByYW5kb20gZG91YmxlIGluIFswLCAxKSB0aGF0IGNvbnRhaW5zXG4gIC8vIHJhbmRvbW5lc3MgaW4gZXZlcnkgYml0IG9mIHRoZSBtYW50aXNzYSBvZiB0aGUgSUVFRSA3NTQgdmFsdWUuXG4gIHZhciBwcm5nID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG4gPSBhcmM0LmcoY2h1bmtzKSwgICAgICAgICAgICAgLy8gU3RhcnQgd2l0aCBhIG51bWVyYXRvciBuIDwgMiBeIDQ4XG4gICAgICAgIGQgPSBzdGFydGRlbm9tLCAgICAgICAgICAgICAgICAgLy8gICBhbmQgZGVub21pbmF0b3IgZCA9IDIgXiA0OC5cbiAgICAgICAgeCA9IDA7ICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIGFuZCBubyAnZXh0cmEgbGFzdCBieXRlJy5cbiAgICB3aGlsZSAobiA8IHNpZ25pZmljYW5jZSkgeyAgICAgICAgICAvLyBGaWxsIHVwIGFsbCBzaWduaWZpY2FudCBkaWdpdHMgYnlcbiAgICAgIG4gPSAobiArIHgpICogd2lkdGg7ICAgICAgICAgICAgICAvLyAgIHNoaWZ0aW5nIG51bWVyYXRvciBhbmRcbiAgICAgIGQgKj0gd2lkdGg7ICAgICAgICAgICAgICAgICAgICAgICAvLyAgIGRlbm9taW5hdG9yIGFuZCBnZW5lcmF0aW5nIGFcbiAgICAgIHggPSBhcmM0LmcoMSk7ICAgICAgICAgICAgICAgICAgICAvLyAgIG5ldyBsZWFzdC1zaWduaWZpY2FudC1ieXRlLlxuICAgIH1cbiAgICB3aGlsZSAobiA+PSBvdmVyZmxvdykgeyAgICAgICAgICAgICAvLyBUbyBhdm9pZCByb3VuZGluZyB1cCwgYmVmb3JlIGFkZGluZ1xuICAgICAgbiAvPSAyOyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgbGFzdCBieXRlLCBzaGlmdCBldmVyeXRoaW5nXG4gICAgICBkIC89IDI7ICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICByaWdodCB1c2luZyBpbnRlZ2VyIG1hdGggdW50aWxcbiAgICAgIHggPj4+PSAxOyAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIHdlIGhhdmUgZXhhY3RseSB0aGUgZGVzaXJlZCBiaXRzLlxuICAgIH1cbiAgICByZXR1cm4gKG4gKyB4KSAvIGQ7ICAgICAgICAgICAgICAgICAvLyBGb3JtIHRoZSBudW1iZXIgd2l0aGluIFswLCAxKS5cbiAgfTtcblxuICBwcm5nLmludDMyID0gZnVuY3Rpb24oKSB7IHJldHVybiBhcmM0LmcoNCkgfCAwOyB9XG4gIHBybmcucXVpY2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGFyYzQuZyg0KSAvIDB4MTAwMDAwMDAwOyB9XG4gIHBybmcuZG91YmxlID0gcHJuZztcblxuICAvLyBNaXggdGhlIHJhbmRvbW5lc3MgaW50byBhY2N1bXVsYXRlZCBlbnRyb3B5LlxuICBtaXhrZXkodG9zdHJpbmcoYXJjNC5TKSwgcG9vbCk7XG5cbiAgLy8gQ2FsbGluZyBjb252ZW50aW9uOiB3aGF0IHRvIHJldHVybiBhcyBhIGZ1bmN0aW9uIG9mIHBybmcsIHNlZWQsIGlzX21hdGguXG4gIHJldHVybiAob3B0aW9ucy5wYXNzIHx8IGNhbGxiYWNrIHx8XG4gICAgICBmdW5jdGlvbihwcm5nLCBzZWVkLCBpc19tYXRoX2NhbGwsIHN0YXRlKSB7XG4gICAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICAgIC8vIExvYWQgdGhlIGFyYzQgc3RhdGUgZnJvbSB0aGUgZ2l2ZW4gc3RhdGUgaWYgaXQgaGFzIGFuIFMgYXJyYXkuXG4gICAgICAgICAgaWYgKHN0YXRlLlMpIHsgY29weShzdGF0ZSwgYXJjNCk7IH1cbiAgICAgICAgICAvLyBPbmx5IHByb3ZpZGUgdGhlIC5zdGF0ZSBtZXRob2QgaWYgcmVxdWVzdGVkIHZpYSBvcHRpb25zLnN0YXRlLlxuICAgICAgICAgIHBybmcuc3RhdGUgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvcHkoYXJjNCwge30pOyB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBjYWxsZWQgYXMgYSBtZXRob2Qgb2YgTWF0aCAoTWF0aC5zZWVkcmFuZG9tKCkpLCBtdXRhdGVcbiAgICAgICAgLy8gTWF0aC5yYW5kb20gYmVjYXVzZSB0aGF0IGlzIGhvdyBzZWVkcmFuZG9tLmpzIGhhcyB3b3JrZWQgc2luY2UgdjEuMC5cbiAgICAgICAgaWYgKGlzX21hdGhfY2FsbCkgeyBtYXRoW3JuZ25hbWVdID0gcHJuZzsgcmV0dXJuIHNlZWQ7IH1cblxuICAgICAgICAvLyBPdGhlcndpc2UsIGl0IGlzIGEgbmV3ZXIgY2FsbGluZyBjb252ZW50aW9uLCBzbyByZXR1cm4gdGhlXG4gICAgICAgIC8vIHBybmcgZGlyZWN0bHkuXG4gICAgICAgIGVsc2UgcmV0dXJuIHBybmc7XG4gICAgICB9KShcbiAgcHJuZyxcbiAgc2hvcnRzZWVkLFxuICAnZ2xvYmFsJyBpbiBvcHRpb25zID8gb3B0aW9ucy5nbG9iYWwgOiAodGhpcyA9PSBtYXRoKSxcbiAgb3B0aW9ucy5zdGF0ZSk7XG59XG5tYXRoWydzZWVkJyArIHJuZ25hbWVdID0gc2VlZHJhbmRvbTtcblxuLy9cbi8vIEFSQzRcbi8vXG4vLyBBbiBBUkM0IGltcGxlbWVudGF0aW9uLiAgVGhlIGNvbnN0cnVjdG9yIHRha2VzIGEga2V5IGluIHRoZSBmb3JtIG9mXG4vLyBhbiBhcnJheSBvZiBhdCBtb3N0ICh3aWR0aCkgaW50ZWdlcnMgdGhhdCBzaG91bGQgYmUgMCA8PSB4IDwgKHdpZHRoKS5cbi8vXG4vLyBUaGUgZyhjb3VudCkgbWV0aG9kIHJldHVybnMgYSBwc2V1ZG9yYW5kb20gaW50ZWdlciB0aGF0IGNvbmNhdGVuYXRlc1xuLy8gdGhlIG5leHQgKGNvdW50KSBvdXRwdXRzIGZyb20gQVJDNC4gIEl0cyByZXR1cm4gdmFsdWUgaXMgYSBudW1iZXIgeFxuLy8gdGhhdCBpcyBpbiB0aGUgcmFuZ2UgMCA8PSB4IDwgKHdpZHRoIF4gY291bnQpLlxuLy9cbmZ1bmN0aW9uIEFSQzQoa2V5KSB7XG4gIHZhciB0LCBrZXlsZW4gPSBrZXkubGVuZ3RoLFxuICAgICAgbWUgPSB0aGlzLCBpID0gMCwgaiA9IG1lLmkgPSBtZS5qID0gMCwgcyA9IG1lLlMgPSBbXTtcblxuICAvLyBUaGUgZW1wdHkga2V5IFtdIGlzIHRyZWF0ZWQgYXMgWzBdLlxuICBpZiAoIWtleWxlbikgeyBrZXkgPSBba2V5bGVuKytdOyB9XG5cbiAgLy8gU2V0IHVwIFMgdXNpbmcgdGhlIHN0YW5kYXJkIGtleSBzY2hlZHVsaW5nIGFsZ29yaXRobS5cbiAgd2hpbGUgKGkgPCB3aWR0aCkge1xuICAgIHNbaV0gPSBpKys7XG4gIH1cbiAgZm9yIChpID0gMDsgaSA8IHdpZHRoOyBpKyspIHtcbiAgICBzW2ldID0gc1tqID0gbWFzayAmIChqICsga2V5W2kgJSBrZXlsZW5dICsgKHQgPSBzW2ldKSldO1xuICAgIHNbal0gPSB0O1xuICB9XG5cbiAgLy8gVGhlIFwiZ1wiIG1ldGhvZCByZXR1cm5zIHRoZSBuZXh0IChjb3VudCkgb3V0cHV0cyBhcyBvbmUgbnVtYmVyLlxuICAobWUuZyA9IGZ1bmN0aW9uKGNvdW50KSB7XG4gICAgLy8gVXNpbmcgaW5zdGFuY2UgbWVtYmVycyBpbnN0ZWFkIG9mIGNsb3N1cmUgc3RhdGUgbmVhcmx5IGRvdWJsZXMgc3BlZWQuXG4gICAgdmFyIHQsIHIgPSAwLFxuICAgICAgICBpID0gbWUuaSwgaiA9IG1lLmosIHMgPSBtZS5TO1xuICAgIHdoaWxlIChjb3VudC0tKSB7XG4gICAgICB0ID0gc1tpID0gbWFzayAmIChpICsgMSldO1xuICAgICAgciA9IHIgKiB3aWR0aCArIHNbbWFzayAmICgoc1tpXSA9IHNbaiA9IG1hc2sgJiAoaiArIHQpXSkgKyAoc1tqXSA9IHQpKV07XG4gICAgfVxuICAgIG1lLmkgPSBpOyBtZS5qID0gajtcbiAgICByZXR1cm4gcjtcbiAgICAvLyBGb3Igcm9idXN0IHVucHJlZGljdGFiaWxpdHksIHRoZSBmdW5jdGlvbiBjYWxsIGJlbG93IGF1dG9tYXRpY2FsbHlcbiAgICAvLyBkaXNjYXJkcyBhbiBpbml0aWFsIGJhdGNoIG9mIHZhbHVlcy4gIFRoaXMgaXMgY2FsbGVkIFJDNC1kcm9wWzI1Nl0uXG4gICAgLy8gU2VlIGh0dHA6Ly9nb29nbGUuY29tL3NlYXJjaD9xPXJzYStmbHVocmVyK3Jlc3BvbnNlJmJ0bklcbiAgfSkod2lkdGgpO1xufVxuXG4vL1xuLy8gY29weSgpXG4vLyBDb3BpZXMgaW50ZXJuYWwgc3RhdGUgb2YgQVJDNCB0byBvciBmcm9tIGEgcGxhaW4gb2JqZWN0LlxuLy9cbmZ1bmN0aW9uIGNvcHkoZiwgdCkge1xuICB0LmkgPSBmLmk7XG4gIHQuaiA9IGYuajtcbiAgdC5TID0gZi5TLnNsaWNlKCk7XG4gIHJldHVybiB0O1xufTtcblxuLy9cbi8vIGZsYXR0ZW4oKVxuLy8gQ29udmVydHMgYW4gb2JqZWN0IHRyZWUgdG8gbmVzdGVkIGFycmF5cyBvZiBzdHJpbmdzLlxuLy9cbmZ1bmN0aW9uIGZsYXR0ZW4ob2JqLCBkZXB0aCkge1xuICB2YXIgcmVzdWx0ID0gW10sIHR5cCA9ICh0eXBlb2Ygb2JqKSwgcHJvcDtcbiAgaWYgKGRlcHRoICYmIHR5cCA9PSAnb2JqZWN0Jykge1xuICAgIGZvciAocHJvcCBpbiBvYmopIHtcbiAgICAgIHRyeSB7IHJlc3VsdC5wdXNoKGZsYXR0ZW4ob2JqW3Byb3BdLCBkZXB0aCAtIDEpKTsgfSBjYXRjaCAoZSkge31cbiAgICB9XG4gIH1cbiAgcmV0dXJuIChyZXN1bHQubGVuZ3RoID8gcmVzdWx0IDogdHlwID09ICdzdHJpbmcnID8gb2JqIDogb2JqICsgJ1xcMCcpO1xufVxuXG4vL1xuLy8gbWl4a2V5KClcbi8vIE1peGVzIGEgc3RyaW5nIHNlZWQgaW50byBhIGtleSB0aGF0IGlzIGFuIGFycmF5IG9mIGludGVnZXJzLCBhbmRcbi8vIHJldHVybnMgYSBzaG9ydGVuZWQgc3RyaW5nIHNlZWQgdGhhdCBpcyBlcXVpdmFsZW50IHRvIHRoZSByZXN1bHQga2V5LlxuLy9cbmZ1bmN0aW9uIG1peGtleShzZWVkLCBrZXkpIHtcbiAgdmFyIHN0cmluZ3NlZWQgPSBzZWVkICsgJycsIHNtZWFyLCBqID0gMDtcbiAgd2hpbGUgKGogPCBzdHJpbmdzZWVkLmxlbmd0aCkge1xuICAgIGtleVttYXNrICYgal0gPVxuICAgICAgbWFzayAmICgoc21lYXIgXj0ga2V5W21hc2sgJiBqXSAqIDE5KSArIHN0cmluZ3NlZWQuY2hhckNvZGVBdChqKyspKTtcbiAgfVxuICByZXR1cm4gdG9zdHJpbmcoa2V5KTtcbn1cblxuLy9cbi8vIGF1dG9zZWVkKClcbi8vIFJldHVybnMgYW4gb2JqZWN0IGZvciBhdXRvc2VlZGluZywgdXNpbmcgd2luZG93LmNyeXB0byBhbmQgTm9kZSBjcnlwdG9cbi8vIG1vZHVsZSBpZiBhdmFpbGFibGUuXG4vL1xuZnVuY3Rpb24gYXV0b3NlZWQoKSB7XG4gIHRyeSB7XG4gICAgdmFyIG91dDtcbiAgICBpZiAobm9kZWNyeXB0byAmJiAob3V0ID0gbm9kZWNyeXB0by5yYW5kb21CeXRlcykpIHtcbiAgICAgIC8vIFRoZSB1c2Ugb2YgJ291dCcgdG8gcmVtZW1iZXIgcmFuZG9tQnl0ZXMgbWFrZXMgdGlnaHQgbWluaWZpZWQgY29kZS5cbiAgICAgIG91dCA9IG91dCh3aWR0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dCA9IG5ldyBVaW50OEFycmF5KHdpZHRoKTtcbiAgICAgIChnbG9iYWwuY3J5cHRvIHx8IGdsb2JhbC5tc0NyeXB0bykuZ2V0UmFuZG9tVmFsdWVzKG91dCk7XG4gICAgfVxuICAgIHJldHVybiB0b3N0cmluZyhvdXQpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgdmFyIGJyb3dzZXIgPSBnbG9iYWwubmF2aWdhdG9yLFxuICAgICAgICBwbHVnaW5zID0gYnJvd3NlciAmJiBicm93c2VyLnBsdWdpbnM7XG4gICAgcmV0dXJuIFsrbmV3IERhdGUsIGdsb2JhbCwgcGx1Z2lucywgZ2xvYmFsLnNjcmVlbiwgdG9zdHJpbmcocG9vbCldO1xuICB9XG59XG5cbi8vXG4vLyB0b3N0cmluZygpXG4vLyBDb252ZXJ0cyBhbiBhcnJheSBvZiBjaGFyY29kZXMgdG8gYSBzdHJpbmdcbi8vXG5mdW5jdGlvbiB0b3N0cmluZyhhKSB7XG4gIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KDAsIGEpO1xufVxuXG4vL1xuLy8gV2hlbiBzZWVkcmFuZG9tLmpzIGlzIGxvYWRlZCwgd2UgaW1tZWRpYXRlbHkgbWl4IGEgZmV3IGJpdHNcbi8vIGZyb20gdGhlIGJ1aWx0LWluIFJORyBpbnRvIHRoZSBlbnRyb3B5IHBvb2wuICBCZWNhdXNlIHdlIGRvXG4vLyBub3Qgd2FudCB0byBpbnRlcmZlcmUgd2l0aCBkZXRlcm1pbmlzdGljIFBSTkcgc3RhdGUgbGF0ZXIsXG4vLyBzZWVkcmFuZG9tIHdpbGwgbm90IGNhbGwgbWF0aC5yYW5kb20gb24gaXRzIG93biBhZ2FpbiBhZnRlclxuLy8gaW5pdGlhbGl6YXRpb24uXG4vL1xubWl4a2V5KG1hdGgucmFuZG9tKCksIHBvb2wpO1xuXG4vL1xuLy8gTm9kZWpzIGFuZCBBTUQgc3VwcG9ydDogZXhwb3J0IHRoZSBpbXBsZW1lbnRhdGlvbiBhcyBhIG1vZHVsZSB1c2luZ1xuLy8gZWl0aGVyIGNvbnZlbnRpb24uXG4vL1xuaWYgKCh0eXBlb2YgbW9kdWxlKSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICBtb2R1bGUuZXhwb3J0cyA9IHNlZWRyYW5kb207XG4gIC8vIFdoZW4gaW4gbm9kZS5qcywgdHJ5IHVzaW5nIGNyeXB0byBwYWNrYWdlIGZvciBhdXRvc2VlZGluZy5cbiAgdHJ5IHtcbiAgICBub2RlY3J5cHRvID0gcmVxdWlyZSgnY3J5cHRvJyk7XG4gIH0gY2F0Y2ggKGV4KSB7fVxufSBlbHNlIGlmICgodHlwZW9mIGRlZmluZSkgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gIGRlZmluZShmdW5jdGlvbigpIHsgcmV0dXJuIHNlZWRyYW5kb207IH0pO1xufVxuXG4vLyBFbmQgYW5vbnltb3VzIHNjb3BlLCBhbmQgcGFzcyBpbml0aWFsIHZhbHVlcy5cbn0pKFxuICBbXSwgICAgIC8vIHBvb2w6IGVudHJvcHkgcG9vbCBzdGFydHMgZW1wdHlcbiAgTWF0aCAgICAvLyBtYXRoOiBwYWNrYWdlIGNvbnRhaW5pbmcgcmFuZG9tLCBwb3csIGFuZCBzZWVkcmFuZG9tXG4pO1xuIl19
