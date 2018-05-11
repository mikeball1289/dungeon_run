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
                if (states.length > 2) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL21pa2ViL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL3dhdGNoLXRzL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOi9Vc2Vycy9taWtlYi9BcHBEYXRhL1JvYW1pbmcvbnBtL25vZGVfbW9kdWxlcy93YXRjaC10cy9ub2RlX21vZHVsZXMvYnJvd3Nlci1yZXNvbHZlL2VtcHR5LmpzIiwic3JjL0dhbWVWaWV3LnRzIiwic3JjL0tleS50cyIsInNyYy9hY3RvcnMvUGxheWVyLnRzIiwic3JjL21haW4udHMiLCJzcmMvbWFwL1dvcmxkTWFwLnRzIiwic3JjL3Byb3ZpZGVycy9DbGFzc2ljVGlsZVByb3ZpZGVyLnRzIiwic3JjL3Byb3ZpZGVycy9EZWNvcmF0b3IudHMiLCJzcmMvcHJvdmlkZXJzL1N0YW5kYXJkVGVtcGxhdGVSb29tUHJvdmlkZXIudHMiLCJzcmMvcm9vdC50cyIsIi4uL2NvbW1vbi9EdW5HZW4udHMiLCIuLi9jb21tb24vTWFwMkQudHMiLCIuLi9jb21tb24vVGVtcGxhdGVSb29tLnRzIiwiLi4vY29tbW9uL3V0aWxzLnRzIiwiLi4vbm9kZV9tb2R1bGVzL3NlZWRyYW5kb20vaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvc2VlZHJhbmRvbS9saWIvYWxlYS5qcyIsIi4uL25vZGVfbW9kdWxlcy9zZWVkcmFuZG9tL2xpYi90eWNoZWkuanMiLCIuLi9ub2RlX21vZHVsZXMvc2VlZHJhbmRvbS9saWIveG9yMTI4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3NlZWRyYW5kb20vbGliL3hvcjQwOTYuanMiLCIuLi9ub2RlX21vZHVsZXMvc2VlZHJhbmRvbS9saWIveG9yc2hpZnQ3LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3NlZWRyYW5kb20vbGliL3hvcndvdy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zZWVkcmFuZG9tL3NlZWRyYW5kb20uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7OztBQ0NBLDRDQUF5QztBQUN6Qyw4Q0FBNEQ7QUFFNUQsY0FBc0IsU0FBUSxJQUFJLENBQUMsU0FBUztJQUl4QyxZQUFtQixHQUFhLEVBQVMsT0FBaUM7UUFDdEUsS0FBSyxFQUFFLENBQUM7UUFETyxRQUFHLEdBQUgsR0FBRyxDQUFVO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBMEI7UUFGbEUsZ0JBQVcsR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUl2QyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFTSxNQUFNLENBQUMsS0FBc0I7UUFDaEMsSUFBSSxNQUFNLEdBQUcsWUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoQyxJQUFJLFdBQVcsR0FBRyxZQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RDLElBQUksRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxHQUFHLHdCQUFnQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN0RixLQUFLLElBQUksRUFBRSxJQUFJLEtBQUssRUFBRTtZQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksZUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDL0M7UUFDRCxLQUFLLElBQUksRUFBRSxJQUFJLE9BQU8sRUFBRTtZQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMzQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDM0I7UUFDRCxLQUFLLElBQUksRUFBRSxJQUFJLE9BQU8sRUFBRTtZQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDOUM7SUFDTCxDQUFDO0NBQ0o7QUEzQkQsNEJBMkJDOzs7O0FDL0JZLFFBQUEsU0FBUyxHQUFHLENBQUMsQ0FBQztBQUNkLFFBQUEsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUNSLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNWLFFBQUEsR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUNULFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNmLFFBQUEsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNaLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUNiLFFBQUEsU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNmLFFBQUEsR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUNULFFBQUEsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNWLFFBQUEsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNWLFFBQUEsRUFBRSxHQUFHLEVBQUUsQ0FBQztBQUNSLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNWLFFBQUEsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNaLFFBQUEsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNaLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNaLFFBQUEsUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNkLFFBQUEsUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNkLFFBQUEsUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNkLFFBQUEsUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNkLFFBQUEsUUFBUSxHQUFHLEdBQUcsQ0FBQztBQUNmLFFBQUEsUUFBUSxHQUFHLEdBQUcsQ0FBQztBQUNmLFFBQUEsUUFBUSxHQUFHLEdBQUcsQ0FBQztBQUNmLFFBQUEsUUFBUSxHQUFHLEdBQUcsQ0FBQztBQUNmLFFBQUEsUUFBUSxHQUFHLEdBQUcsQ0FBQztBQUNmLFFBQUEsUUFBUSxHQUFHLEdBQUcsQ0FBQztBQUNmLFFBQUEsUUFBUSxHQUFHLEdBQUcsQ0FBQztBQUNmLFFBQUEsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUNWLFFBQUEsUUFBUSxHQUFHLEdBQUcsQ0FBQztBQUNmLFFBQUEsYUFBYSxHQUFHLEdBQUcsQ0FBQztBQUNwQixRQUFBLE1BQU0sR0FBRyxHQUFHLENBQUM7QUFDYixRQUFBLEVBQUUsR0FBRyxHQUFHLENBQUM7QUFDVCxRQUFBLEVBQUUsR0FBRyxHQUFHLENBQUM7QUFDVCxRQUFBLEVBQUUsR0FBRyxHQUFHLENBQUM7QUFDVCxRQUFBLEVBQUUsR0FBRyxHQUFHLENBQUM7QUFDVCxRQUFBLEVBQUUsR0FBRyxHQUFHLENBQUM7QUFDVCxRQUFBLEVBQUUsR0FBRyxHQUFHLENBQUM7QUFDVCxRQUFBLEVBQUUsR0FBRyxHQUFHLENBQUM7QUFDVCxRQUFBLEVBQUUsR0FBRyxHQUFHLENBQUM7QUFDVCxRQUFBLEVBQUUsR0FBRyxHQUFHLENBQUM7QUFDVCxR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UyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxlQUFNLENBQUMsSUFBSSxDQUFDO1lBQ3ZFLElBQUksVUFBVSxHQUFHLENBQUMsS0FBSyxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLGVBQU0sQ0FBQyxJQUFJLENBQUM7WUFDeEYsSUFBSSxRQUFRLElBQUksV0FBVyxJQUFJLFNBQVMsSUFBSSxVQUFVLEVBQUU7Z0JBQ3BELElBQUksWUFBWSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxlQUFNLENBQUMsSUFBSSxDQUFDO2dCQUN6RixJQUFJLGFBQWEsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxlQUFNLENBQUMsSUFBSSxDQUFDO2dCQUMxRyxJQUFJLGVBQWUsR0FBRyxDQUFDLEtBQUssT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxlQUFNLENBQUMsSUFBSSxDQUFDO2dCQUM3RyxJQUFJLGdCQUFnQixHQUFHLENBQUMsS0FBSyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssT0FBTyxD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Q0FBZ0IsQ0FBQzs7QUN6QmhGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiIiwiaW1wb3J0IHsgV29ybGRNYXAgfSBmcm9tIFwiLi9tYXAvV29ybGRNYXBcIjtcclxuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vYWN0b3JzL1BsYXllclwiO1xyXG5pbXBvcnQgeyBLZXlzLCB2ZW5uSW50ZXJzZWN0aW9uIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi91dGlsc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdhbWVWaWV3IGV4dGVuZHMgUElYSS5Db250YWluZXIge1xyXG5cclxuICAgIHByaXZhdGUgcGxheWVyTGF5ZXIgPSBuZXcgUElYSS5Db250YWluZXIoKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbWFwOiBXb3JsZE1hcCwgcHVibGljIHBsYXllcnM6IHsgW2lkOiBzdHJpbmddOiBQbGF5ZXIgfSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZChtYXApO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5wbGF5ZXJMYXllcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShzdGF0ZTogR2FtZVN0YXRlUGFja2V0KSB7XHJcbiAgICAgICAgbGV0IG93bklkcyA9IEtleXModGhpcy5wbGF5ZXJzKTtcclxuICAgICAgICBsZXQgaW5jb21pbmdJZHMgPSBLZXlzKHN0YXRlLnBsYXllcnMpO1xyXG4gICAgICAgIGxldCB7IGwxOiBhZGRlZCwgbDI6IHJlbW92ZWQsIGJvdGg6IHVwZGF0ZWQgfSA9IHZlbm5JbnRlcnNlY3Rpb24oaW5jb21pbmdJZHMsIG93bklkcyk7XHJcbiAgICAgICAgZm9yIChsZXQgaWQgb2YgYWRkZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJzW2lkXSA9IG5ldyBQbGF5ZXIoc3RhdGUucGxheWVyc1tpZF0pO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllckxheWVyLmFkZENoaWxkKHRoaXMucGxheWVyc1tpZF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpZCBvZiByZW1vdmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyTGF5ZXIucmVtb3ZlQ2hpbGQodGhpcy5wbGF5ZXJzW2lkXSk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyc1tpZF0uZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5wbGF5ZXJzW2lkXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaWQgb2YgdXBkYXRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllcnNbaWRdLnVwZGF0ZShzdGF0ZS5wbGF5ZXJzW2lkXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNvbnN0IEJBQ0tTUEFDRSA9IDg7XHJcbmV4cG9ydCBjb25zdCBUQUIgPSA5O1xyXG5leHBvcnQgY29uc3QgRU5URVIgPSAxMztcclxuZXhwb3J0IGNvbnN0IFNISUZUID0gMTY7XHJcbmV4cG9ydCBjb25zdCBDVFJMID0gMTc7XHJcbmV4cG9ydCBjb25zdCBBTFQgPSAxODtcclxuZXhwb3J0IGNvbnN0IFBBVVNFID0gMTk7XHJcbmV4cG9ydCBjb25zdCBDQVBTX0xPQ0sgPSAyMDtcclxuZXhwb3J0IGNvbnN0IEVTQ0FQRSA9IDI3O1xyXG5leHBvcnQgY29uc3QgU1BBQ0UgPSAzMjtcclxuZXhwb3J0IGNvbnN0IFBBR0VfVVAgPSAzMztcclxuZXhwb3J0IGNvbnN0IFBBR0VfRE9XTiA9IDM0O1xyXG5leHBvcnQgY29uc3QgRU5EID0gMzU7XHJcbmV4cG9ydCBjb25zdCBIT01FID0gMzY7XHJcbmV4cG9ydCBjb25zdCBMRUZUID0gMzc7XHJcbmV4cG9ydCBjb25zdCBVUCA9IDM4O1xyXG5leHBvcnQgY29uc3QgUklHSFQgPSAzOTtcclxuZXhwb3J0IGNvbnN0IERPV04gPSA0MDtcclxuZXhwb3J0IGNvbnN0IElOU0VSVCA9IDQ1O1xyXG5leHBvcnQgY29uc3QgREVMRVRFID0gNDY7XHJcbmV4cG9ydCBjb25zdCBOVU1fMCA9IDQ4O1xyXG5leHBvcnQgY29uc3QgTlVNXzEgPSA0OTtcclxuZXhwb3J0IGNvbnN0IE5VTV8yID0gNTA7XHJcbmV4cG9ydCBjb25zdCBOVU1fMyA9IDUxO1xyXG5leHBvcnQgY29uc3QgTlVNXzQgPSA1MjtcclxuZXhwb3J0IGNvbnN0IE5VTV81ID0gNTM7XHJcbmV4cG9ydCBjb25zdCBOVU1fNiA9IDU0O1xyXG5leHBvcnQgY29uc3QgTlVNXzcgPSA1NTtcclxuZXhwb3J0IGNvbnN0IE5VTV84ID0gNTY7XHJcbmV4cG9ydCBjb25zdCBOVU1fOSA9IDU3O1xyXG5leHBvcnQgY29uc3QgQSA9IDY1O1xyXG5leHBvcnQgY29uc3QgQiA9IDY2O1xyXG5leHBvcnQgY29uc3QgQyA9IDY3O1xyXG5leHBvcnQgY29uc3QgRCA9IDY4O1xyXG5leHBvcnQgY29uc3QgRSA9IDY5O1xyXG5leHBvcnQgY29uc3QgRiA9IDcwO1xyXG5leHBvcnQgY29uc3QgRyA9IDcxO1xyXG5leHBvcnQgY29uc3QgSCA9IDcyO1xyXG5leHBvcnQgY29uc3QgSSA9IDczO1xyXG5leHBvcnQgY29uc3QgSiA9IDc0O1xyXG5leHBvcnQgY29uc3QgSyA9IDc1O1xyXG5leHBvcnQgY29uc3QgTCA9IDc2O1xyXG5leHBvcnQgY29uc3QgTSA9IDc3O1xyXG5leHBvcnQgY29uc3QgTiA9IDc4O1xyXG5leHBvcnQgY29uc3QgTyA9IDc5O1xyXG5leHBvcnQgY29uc3QgUCA9IDgwO1xyXG5leHBvcnQgY29uc3QgUSA9IDgxO1xyXG5leHBvcnQgY29uc3QgUiA9IDgyO1xyXG5leHBvcnQgY29uc3QgUyA9IDgzO1xyXG5leHBvcnQgY29uc3QgVCA9IDg0O1xyXG5leHBvcnQgY29uc3QgVSA9IDg1O1xyXG5leHBvcnQgY29uc3QgViA9IDg2O1xyXG5leHBvcnQgY29uc3QgVyA9IDg3O1xyXG5leHBvcnQgY29uc3QgWCA9IDg4O1xyXG5leHBvcnQgY29uc3QgWSA9IDg5O1xyXG5leHBvcnQgY29uc3QgWiA9IDkwO1xyXG5leHBvcnQgY29uc3QgU0VMRUNUID0gOTM7XHJcbmV4cG9ydCBjb25zdCBOVU1QQURfMCA9IDk2O1xyXG5leHBvcnQgY29uc3QgTlVNUEFEXzEgPSA5NztcclxuZXhwb3J0IGNvbnN0IE5VTVBBRF8yID0gOTg7XHJcbmV4cG9ydCBjb25zdCBOVU1QQURfMyA9IDk5O1xyXG5leHBvcnQgY29uc3QgTlVNUEFEXzQgPSAxMDA7XHJcbmV4cG9ydCBjb25zdCBOVU1QQURfNSA9IDEwMTtcclxuZXhwb3J0IGNvbnN0IE5VTVBBRF82ID0gMTAyO1xyXG5leHBvcnQgY29uc3QgTlVNUEFEXzcgPSAxMDM7XHJcbmV4cG9ydCBjb25zdCBOVU1QQURfOCA9IDEwNDtcclxuZXhwb3J0IGNvbnN0IE5VTVBBRF85ID0gMTA1O1xyXG5leHBvcnQgY29uc3QgTVVMVElQTFkgPSAxMDY7XHJcbmV4cG9ydCBjb25zdCBBREQgPSAxMDc7XHJcbmV4cG9ydCBjb25zdCBTVUJUUkFDVCA9IDEwOTtcclxuZXhwb3J0IGNvbnN0IERFQ0lNQUxfUE9JTlQgPSAxMTA7XHJcbmV4cG9ydCBjb25zdCBESVZJREUgPSAxMTE7XHJcbmV4cG9ydCBjb25zdCBGMSA9IDExMjtcclxuZXhwb3J0IGNvbnN0IEYyID0gMTEzO1xyXG5leHBvcnQgY29uc3QgRjMgPSAxMTQ7XHJcbmV4cG9ydCBjb25zdCBGNCA9IDExNTtcclxuZXhwb3J0IGNvbnN0IEY1ID0gMTE2O1xyXG5leHBvcnQgY29uc3QgRjYgPSAxMTc7XHJcbmV4cG9ydCBjb25zdCBGNyA9IDExODtcclxuZXhwb3J0IGNvbnN0IEY4ID0gMTE5O1xyXG5leHBvcnQgY29uc3QgRjkgPSAxMjA7XHJcbmV4cG9ydCBjb25zdCBGMTAgPSAxMjE7XHJcbmV4cG9ydCBjb25zdCBGMTEgPSAxMjI7XHJcbmV4cG9ydCBjb25zdCBGMTIgPSAxMjM7XHJcbmV4cG9ydCBjb25zdCBOVU1fTE9DSyA9IDE0NDtcclxuZXhwb3J0IGNvbnN0IFNDUk9MTF9MT0NLID0gMTQ1O1xyXG5leHBvcnQgY29uc3QgU0VNSUNPTE9OID0gMTg2O1xyXG5leHBvcnQgY29uc3QgRVFVQUxTID0gMTg3O1xyXG5leHBvcnQgY29uc3QgQ09NTUEgPSAxODg7XHJcbmV4cG9ydCBjb25zdCBEQVNIID0gMTg5O1xyXG5leHBvcnQgY29uc3QgUEVSSU9EID0gMTkwO1xyXG5leHBvcnQgY29uc3QgRk9SV0FSRF9TTEFTSCA9IDE5MTtcclxuZXhwb3J0IGNvbnN0IEdSQVZFX0FDQ0VOVCA9IDE5MjtcclxuZXhwb3J0IGNvbnN0IE9QRU5fQlJBQ0tFVCA9IDIxOTtcclxuZXhwb3J0IGNvbnN0IEJBQ0tfU0xBU0ggPSAyMjA7XHJcbmV4cG9ydCBjb25zdCBDTE9TRV9CUkFLRVQgPSAyMjE7XHJcbmV4cG9ydCBjb25zdCBTSU5HTEVfUVVPVEUgPSAyMjI7XHJcbiIsImV4cG9ydCBjbGFzcyBQbGF5ZXIgZXh0ZW5kcyBQSVhJLkNvbnRhaW5lciB7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKHN0YXRlOiBJUG9pbnQpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIGxldCBncmFwaGljcyA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuYmVnaW5GaWxsKDB4MDAwMEZGKTtcclxuICAgICAgICBncmFwaGljcy5kcmF3UmVjdCgwLCAwLCAyNSwgMjUpO1xyXG4gICAgICAgIGdyYXBoaWNzLmVuZEZpbGwoKTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKGdyYXBoaWNzKTtcclxuICAgICAgICB0aGlzLnggPSBzdGF0ZS54O1xyXG4gICAgICAgIHRoaXMueSA9IHN0YXRlLnk7XHJcbiAgICAgICAgdGhpcy5waXZvdC5zZXQoMTIuNSwgMjUpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShzdGF0ZTogSVBvaW50KSB7XHJcbiAgICAgICAgdGhpcy54ID0gc3RhdGUueDtcclxuICAgICAgICB0aGlzLnkgPSBzdGF0ZS55O1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgcm9vdCwganVnZ2xlciwga2V5Ym9hcmQsIEtleSB9IGZyb20gXCIuL3Jvb3RcIjtcclxuaW1wb3J0IHsgU3RhbmRhcmRUZW1wbGF0ZVJvb21Qcm92aWRlciB9IGZyb20gXCIuL3Byb3ZpZGVycy9TdGFuZGFyZFRlbXBsYXRlUm9vbVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IER1bkdlbiwgRHVuR2VuT3B0cyB9IGZyb20gXCIuLi8uLi9jb21tb24vRHVuR2VuXCI7XHJcbmltcG9ydCB7IENsYXNzaWNUaWxlUHJvdmlkZXIgfSBmcm9tIFwiLi9wcm92aWRlcnMvQ2xhc3NpY1RpbGVQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBXb3JsZE1hcCB9IGZyb20gXCIuL21hcC9Xb3JsZE1hcFwiO1xyXG5pbXBvcnQgeyBHYW1lVmlldyB9IGZyb20gXCIuL0dhbWVWaWV3XCI7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBtYWluKCkge1xyXG4gICAgbGV0IGFwcCA9IG5ldyBQSVhJLkFwcGxpY2F0aW9uKCB7XHJcbiAgICAgICAgd2lkdGg6IDE2MDAsXHJcbiAgICAgICAgaGVpZ2h0OiA5MDAsXHJcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAweDE2MTYxNixcclxuICAgIH0gKTtcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYXBwLnZpZXcpO1xyXG4gICAgcm9vdC5zZXRBcHAoYXBwKTtcclxuXHJcbiAgICBsZXQgZnBzID0gNjA7XHJcbiAgICBsZXQgdHBzID0gNjA7XHJcbiAgICBsZXQgcGluZyA9IDA7XHJcblxyXG4gICAgbGV0IGZwc0Rpc3BsYXkgPSBuZXcgUElYSS5UZXh0KFwiMFwiLCB7IGFsaWduOiBcInJpZ2h0XCIsIGZvbnRGYW1pbHk6IFwiQ291cmllciBOZXdcIiwgZm9udFNpemU6IDE3LCBzdHJva2U6IDB4RkZGRkZGLCBzdHJva2VUaGlja25lc3M6IDAuNSB9ICk7XHJcbiAgICBmcHNEaXNwbGF5LmFuY2hvci5zZXQoMSk7XHJcbiAgICBmcHNEaXNwbGF5LnggPSBhcHAudmlldy53aWR0aDtcclxuICAgIGZwc0Rpc3BsYXkueSA9IGFwcC52aWV3LmhlaWdodDtcclxuICAgIHJvb3Quc3RhZ2UuYWRkQ2hpbGQoZnBzRGlzcGxheSk7XHJcblxyXG4gICAganVnZ2xlci5zZXRGUFMoNzApO1xyXG4gICAgbGV0IGxhc3RUaWNrID0gMDtcclxuICAgIGp1Z2dsZXIuYWRkKCAoKSA9PiB7XHJcbiAgICAgICAgaWYgKGxhc3RUaWNrID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgdGljayA9IERhdGUubm93KCk7XHJcbiAgICAgICAgICAgIGlmICghaXNGaW5pdGUoZnBzKSkge1xyXG4gICAgICAgICAgICAgICAgZnBzID0gMTAwMCAvICh0aWNrIC0gbGFzdFRpY2spO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZnBzID0gZnBzICogMC45OSArIChNYXRoLm1pbigxMDAwIC8gKHRpY2sgLSBsYXN0VGljayksIDEwMDApKSAqIDAuMDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGFzdFRpY2sgPSB0aWNrO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxhc3RUaWNrID0gRGF0ZS5ub3coKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZwc0Rpc3BsYXkudGV4dCA9IHBpbmcgKyBcIiBQaW5nIFxcblwiICsgdHBzLnRvRml4ZWQoMSkgKyBcIiBXb3JsZFxcblwiICsgZnBzLnRvRml4ZWQoMSkgKyBcIiBIb21lIFwiO1xyXG4gICAgfSApO1xyXG5cclxuICAgIGF3YWl0IFN0YW5kYXJkVGVtcGxhdGVSb29tUHJvdmlkZXIucmVhZHkoKTtcclxuICAgIFxyXG4gICAgbGV0IHNvY2tldCA9IGlvKCk7XHJcbiAgICBzb2NrZXQub24oXCJkdW5nZW9uX3BhcmFtc1wiLCBhc3luYyAocGFyYW1zOiBEdW5HZW5PcHRzKSA9PiB7XHJcbiAgICAgICAgc29ja2V0Lm9mZihcImR1bmdlb25fcGFyYW1zXCIpO1xyXG4gICAgICAgIHNvY2tldC5lbWl0KFwiYWNrXCIpO1xyXG4gICAgICAgIGxldCBkdW5nZW9uID0gRHVuR2VuKFN0YW5kYXJkVGVtcGxhdGVSb29tUHJvdmlkZXIudGVtcGxhdGVzLCBwYXJhbXMpO1xyXG4gICAgICAgIGF3YWl0IENsYXNzaWNUaWxlUHJvdmlkZXIucmVhZHkoKTtcclxuICAgICAgICBsZXQgbWFwID0gbmV3IFdvcmxkTWFwKGR1bmdlb24sIENsYXNzaWNUaWxlUHJvdmlkZXIpO1xyXG4gICAgICAgIGxldCB2aWV3ID0gbmV3IEdhbWVWaWV3KG1hcCwge30pO1xyXG4gICAgICAgIHJvb3Quc3RhZ2UuYWRkQ2hpbGRBdCh2aWV3LCAwKTtcclxuICAgICAgICBcclxuICAgICAgICBqdWdnbGVyLmFkZCggKCkgPT4ge1xyXG4gICAgICAgICAgICBzb2NrZXQuZW1pdChcImNvbnRyb2xzXCIsIDxDb250cm9scz57XHJcbiAgICAgICAgICAgICAgICB1cDoga2V5Ym9hcmQuaXNLZXlEb3duKEtleS5VUCksXHJcbiAgICAgICAgICAgICAgICBkb3duOiBrZXlib2FyZC5pc0tleURvd24oS2V5LkRPV04pLFxyXG4gICAgICAgICAgICAgICAgbGVmdDoga2V5Ym9hcmQuaXNLZXlEb3duKEtleS5MRUZUKSxcclxuICAgICAgICAgICAgICAgIHJpZ2h0OiBrZXlib2FyZC5pc0tleURvd24oS2V5LlJJR0hUKSxcclxuICAgICAgICAgICAgICAgIGp1bXA6IGtleWJvYXJkLmlzS2V5RG93bihLZXkuU1BBQ0UpLFxyXG4gICAgICAgICAgICB9ICk7XHJcbiAgICAgICAgfSApO1xyXG5cclxuICAgICAgICBsZXQgbGFzdFVwZGF0ZSA9IDA7XHJcbiAgICAgICAgbGV0IHN0YXRlQnVmZmVyTGVuZ3RoID0gMjtcclxuICAgICAgICBsZXQgc3RhdGVzOiBHYW1lU3RhdGVQYWNrZXRbXSA9IFtdO1xyXG4gICAgICAgIHNvY2tldC5vbihcInN0YXRlXCIsIChzOiBHYW1lU3RhdGVQYWNrZXQpID0+IHtcclxuICAgICAgICAgICAgbGV0IHVwZGF0ZVRpbWUgPSBzLnRpbWVzdGFtcDtcclxuICAgICAgICAgICAgaWYgKGxhc3RVcGRhdGUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdXBkYXRlVGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzRmluaXRlKHRwcykpIHtcclxuICAgICAgICAgICAgICAgICAgICB0cHMgPSAxMDAwIC8gKHVwZGF0ZVRpbWUgLSBsYXN0VXBkYXRlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHBzID0gdHBzICogMC45OSArIChNYXRoLm1pbigxMDAwIC8gKHVwZGF0ZVRpbWUgLSBsYXN0VXBkYXRlKSwgMTAwMCkpICogMC4wMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxhc3RVcGRhdGUgPSB1cGRhdGVUaW1lO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGFzdFVwZGF0ZSA9IHVwZGF0ZVRpbWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHN0YXRlcy5wdXNoKHMpO1xyXG4gICAgICAgIH0gKTtcclxuICAgICAgICBcclxuICAgICAgICBqdWdnbGVyLmFkZCggKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc3RhdGVzLmxlbmd0aCA+IDIpIHtcclxuICAgICAgICAgICAgICAgIHZpZXcudXBkYXRlKHN0YXRlcy5zaGlmdCgpISk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICk7XHJcblxyXG4gICAgICAgIGxldCBwaW5nVGltZSA9IDA7XHJcbiAgICAgICAgc2V0SW50ZXJ2YWwoICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHBpbmdUaW1lID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBzb2NrZXQuZW1pdChcIl9waW5nXCIpO1xyXG4gICAgICAgICAgICAgICAgcGluZ1RpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgc29ja2V0Lm9uKFwiX3BvbmdcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBwaW5nID0gRGF0ZS5ub3coKSAtIHBpbmdUaW1lO1xyXG4gICAgICAgICAgICBwaW5nVGltZSA9IDA7XHJcbiAgICAgICAgfSApO1xyXG5cclxuICAgICAgICBzb2NrZXQub24oXCJyZWxvYWRcIiwgKCkgPT4gd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpICk7XHJcblxyXG4gICAgfSApO1xyXG5cclxufVxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIG1haW4pOyIsImltcG9ydCB7IER1bmdlb24sIEVUaWxlcyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vRHVuR2VuXCI7XHJcbmltcG9ydCB7IElUaWxlUHJvdmlkZXIgfSBmcm9tIFwiLi4vcHJvdmlkZXJzL0lUaWxlUHJvdmlkZXJcIjtcclxuaW1wb3J0IHsgcm9vdCB9IGZyb20gXCIuLi9yb290XCI7XHJcblxyXG5leHBvcnQgY29uc3QgVElMRV9TSVpFID0gMzI7XHJcbmNvbnN0IEVQU0lMT04gPSAwLjAwMTtcclxuXHJcbmV4cG9ydCBjbGFzcyBXb3JsZE1hcCBleHRlbmRzIFBJWEkuQ29udGFpbmVyIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZHVuZ2VvbjogRHVuZ2VvbiwgcHVibGljIHByb3ZpZGVyOiBJVGlsZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBpZiAoIXByb3ZpZGVyLmlzUmVhZHkoKSkgdGhyb3cgbmV3IEVycm9yKFwiUHJvdmlkZXIgaXMgbm90IHJlYWR5XCIpO1xyXG4gICAgICAgIGxldCB0ZXggPSBQSVhJLlJlbmRlclRleHR1cmUuY3JlYXRlKGR1bmdlb24ud2lkdGggKiBUSUxFX1NJWkUsIGR1bmdlb24uaGVpZ2h0ICogVElMRV9TSVpFKTtcclxuICAgICAgICBsZXQgY29udGFpbmVyID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkdW5nZW9uLndpZHRoOyBpICsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZHVuZ2Vvbi5oZWlnaHQ7IGogKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCB0aWxlID0gcHJvdmlkZXIuZ2V0VGlsZShkdW5nZW9uLCBpLCBqKTtcclxuICAgICAgICAgICAgICAgIHRpbGUueCA9IGkgKiBUSUxFX1NJWkU7XHJcbiAgICAgICAgICAgICAgICB0aWxlLnkgPSBqICogVElMRV9TSVpFO1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFkZENoaWxkKHRpbGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJvb3QuYXBwLnJlbmRlcmVyLnJlbmRlcihjb250YWluZXIsIHRleCk7XHJcbiAgICAgICAgY29udGFpbmVyLmRlc3Ryb3koKTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKG5ldyBQSVhJLlNwcml0ZSh0ZXgpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBwdWJsaWMgbW92ZShhY3RvcjogQWN0b3IpIHtcclxuICAgIC8vICAgICBsZXQgY29sbGlzaW9ucyA9IFswLCAwXTtcclxuXHJcbiAgICAvLyAgICAgbGV0IHh2ID0gYWN0b3IudmVsb2NpdHkueDtcclxuICAgIC8vICAgICB3aGlsZSAoeHYgIT09IDApIHtcclxuICAgIC8vICAgICAgICAgbGV0IG1vdmUgPSBNYXRoLm1heChNYXRoLm1pbihUSUxFX1NJWkUsIHh2KSwgLVRJTEVfU0laRSk7XHJcbiAgICAvLyAgICAgICAgIGFjdG9yLnggKz0gbW92ZTtcclxuICAgIC8vICAgICAgICAgeHYgLT0gbW92ZTtcclxuICAgIC8vICAgICAgICAgbGV0IGxlZnQgPSBNYXRoLmZsb29yKGFjdG9yLmxlZnQgLyBUSUxFX1NJWkUpO1xyXG4gICAgLy8gICAgICAgICBsZXQgcmlnaHQgPSBNYXRoLmZsb29yKGFjdG9yLnJpZ2h0IC8gVElMRV9TSVpFKTtcclxuICAgIC8vICAgICAgICAgbGV0IHRvcCA9IE1hdGguZmxvb3IoYWN0b3IudG9wIC8gVElMRV9TSVpFKTtcclxuICAgIC8vICAgICAgICAgbGV0IGJvdHRvbSA9IE1hdGguZmxvb3IoYWN0b3IuYm90dG9tIC8gVElMRV9TSVpFKTtcclxuICAgIC8vICAgICAgICAgZm9yIChsZXQgaSA9IHRvcDsgaSA8PSBib3R0b207IGkgKyspIHtcclxuICAgIC8vICAgICAgICAgICAgIGlmICh0aGlzLmR1bmdlb24udGlsZXMuZ2V0KGxlZnQsIGkpID09PSBFVGlsZXMuV0FMTCB8fCB0aGlzLmR1bmdlb24udGlsZXMuZ2V0KHJpZ2h0LCBpKSA9PT0gRVRpbGVzLldBTEwpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICBpZiAobW92ZSA+IDApIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgYWN0b3IucmlnaHQgPSByaWdodCAqIDMyIC0gRVBTSUxPTjtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9uc1swXSA9IDE7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgYWN0b3IubGVmdCA9IGxlZnQgKiAzMiArIDMyICsgRVBTSUxPTjtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9uc1swXSA9IC0xO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICB4diA9IDA7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgYWN0b3IudmVsb2NpdHkueCA9IDA7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAvLyAgICAgbGV0IHl2ID0gYWN0b3IudmVsb2NpdHkueTtcclxuICAgIC8vICAgICB3aGlsZSAoeXYgIT09IDApIHtcclxuICAgIC8vICAgICAgICAgbGV0IG1vdmUgPSBNYXRoLm1heChNYXRoLm1pbihUSUxFX1NJWkUsIHl2KSwgLVRJTEVfU0laRSk7XHJcbiAgICAvLyAgICAgICAgIGFjdG9yLnkgKz0gbW92ZTtcclxuICAgIC8vICAgICAgICAgeXYgLT0gbW92ZTtcclxuICAgIC8vICAgICAgICAgbGV0IGxlZnQgPSBNYXRoLmZsb29yKGFjdG9yLmxlZnQgLyBUSUxFX1NJWkUpO1xyXG4gICAgLy8gICAgICAgICBsZXQgcmlnaHQgPSBNYXRoLmZsb29yKGFjdG9yLnJpZ2h0IC8gVElMRV9TSVpFKTtcclxuICAgIC8vICAgICAgICAgbGV0IHRvcCA9IE1hdGguZmxvb3IoYWN0b3IudG9wIC8gVElMRV9TSVpFKTtcclxuICAgIC8vICAgICAgICAgbGV0IGJvdHRvbSA9IE1hdGguZmxvb3IoYWN0b3IuYm90dG9tIC8gVElMRV9TSVpFKTtcclxuICAgIC8vICAgICAgICAgZm9yIChsZXQgaSA9IGxlZnQ7IGkgPD0gcmlnaHQ7IGkgKyspIHtcclxuICAgIC8vICAgICAgICAgICAgIGlmICh0aGlzLmR1bmdlb24udGlsZXMuZ2V0KGksIHRvcCkgPT09IEVUaWxlcy5XQUxMIHx8IHRoaXMuZHVuZ2Vvbi50aWxlcy5nZXQoaSwgYm90dG9tKSA9PT0gRVRpbGVzLldBTEwpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICBpZiAobW92ZSA+IDApIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgYWN0b3IuYm90dG9tID0gYm90dG9tICogMzIgLSBFUFNJTE9OO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBjb2xsaXNpb25zWzFdID0gMTtcclxuICAgIC8vICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBhY3Rvci50b3AgPSB0b3AgKiAzMiArIDMyICsgRVBTSUxPTjtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9uc1sxXSA9IC0xO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICB5diA9IDA7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgYWN0b3IudmVsb2NpdHkueSA9IDA7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAvLyAgICAgcmV0dXJuIGNvbGxpc2lvbnM7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gcHVibGljIGlzT25MYWRkZXIoYWN0b3I6IEFjdG9yKTogYm9vbGVhbiB7XHJcbiAgICAvLyAgICAgbGV0IGNlbnRlciA9IE1hdGguZmxvb3IoYWN0b3IuaG9yaXpvbnRhbENlbnRlciAvIFRJTEVfU0laRSk7XHJcbiAgICAvLyAgICAgbGV0IHRvcCA9IE1hdGguZmxvb3IoYWN0b3IudG9wIC8gVElMRV9TSVpFKTtcclxuICAgIC8vICAgICBsZXQgYm90dG9tID0gTWF0aC5mbG9vcihhY3Rvci5ib3R0b20gLyBUSUxFX1NJWkUpO1xyXG5cclxuICAgIC8vICAgICByZXR1cm4gKHRoaXMuZHVuZ2Vvbi50aWxlcy5nZXQoY2VudGVyLCB0b3ApID09PSBFVGlsZXMuTEFEREVSIHx8IHRoaXMuZHVuZ2Vvbi50aWxlcy5nZXQoY2VudGVyLCBib3R0b20pID09PSBFVGlsZXMuTEFEREVSKTtcclxuICAgIC8vIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBEdW5nZW9uLCBFVGlsZXMgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL0R1bkdlblwiO1xyXG5pbXBvcnQgeyBJVGlsZVByb3ZpZGVyIH0gZnJvbSBcIi4vSVRpbGVQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBzdGF0aWNJbXBsZW1lbnRzIH0gZnJvbSBcIi4vRGVjb3JhdG9yXCI7XHJcblxyXG5Ac3RhdGljSW1wbGVtZW50czxJVGlsZVByb3ZpZGVyPigpXHJcbmV4cG9ydCBjbGFzcyBDbGFzc2ljVGlsZVByb3ZpZGVyIHtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHRleHR1cmVTaGVldDogUElYSS5UZXh0dXJlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZHkoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgbGV0IHAgPSBuZXcgUHJvbWlzZTx2b2lkPiggKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMudGV4dHVyZVNoZWV0KSB7XHJcbiAgICAgICAgICAgICAgICBQSVhJLmxvYWRlci5hZGQoXCJ0aWxlc1wiLCBcImltZy90aWxlc18wMDEucG5nXCIpO1xyXG4gICAgICAgICAgICAgICAgUElYSS5sb2FkZXIubG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgUElYSS5sb2FkZXIub25jZShcImNvbXBsZXRlXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmVTaGVldCA9IFBJWEkubG9hZGVyLnJlc291cmNlc1tcInRpbGVzXCJdLnRleHR1cmU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSApO1xyXG4gICAgICAgIHJldHVybiBwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaXNSZWFkeSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50ZXh0dXJlU2hlZXQgIT09IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFRpbGUoZHVuZ2VvbjogRHVuZ2VvbiwgeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgdGV4WCA9IDA7XHJcbiAgICAgICAgbGV0IHRleFkgPSAwO1xyXG4gICAgICAgIGxldCB0aWxlID0gZHVuZ2Vvbi50aWxlcy5nZXQoeCwgeSk7XHJcbiAgICAgICAgaWYgKHRpbGUgPT09IEVUaWxlcy5FTVBUWSkge1xyXG4gICAgICAgICAgICB0ZXhYID0gNTtcclxuICAgICAgICAgICAgdGV4WSA9IDE7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aWxlID09PSBFVGlsZXMuTEFEREVSKSB7XHJcbiAgICAgICAgICAgIHRleFggPSA1O1xyXG4gICAgICAgICAgICB0ZXhZID0gMjtcclxuICAgICAgICB9IGVsc2UgaWYgKHRpbGUgPT09IEVUaWxlcy5XQUxMKSB7XHJcbiAgICAgICAgICAgIGxldCBzb2xpZFRvcCA9IHkgPT09IDAgfHwgZHVuZ2Vvbi50aWxlcy5nZXQoeCwgeSAtIDEpID09PSBFVGlsZXMuV0FMTDtcclxuICAgICAgICAgICAgbGV0IHNvbGlkQm90dG9tID0geSA9PT0gZHVuZ2Vvbi5oZWlnaHQgLSAxIHx8IGR1bmdlb24udGlsZXMuZ2V0KHgsIHkgKyAxKSA9PT0gRVRpbGVzLldBTEw7XHJcbiAgICAgICAgICAgIGxldCBzb2xpZExlZnQgPSB4ID09PSAwIHx8IGR1bmdlb24udGlsZXMuZ2V0KHggLSAxLCB5KSA9PT0gRVRpbGVzLldBTEw7XHJcbiAgICAgICAgICAgIGxldCBzb2xpZFJpZ2h0ID0geCA9PT0gZHVuZ2Vvbi53aWR0aCAtIDEgfHwgZHVuZ2Vvbi50aWxlcy5nZXQoeCArIDEsIHkpID09PSBFVGlsZXMuV0FMTDtcclxuICAgICAgICAgICAgaWYgKHNvbGlkVG9wICYmIHNvbGlkQm90dG9tICYmIHNvbGlkTGVmdCAmJiBzb2xpZFJpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc29saWRUb3BMZWZ0ID0geSA9PT0gMCB8fCB4ID09PSAwIHx8IGR1bmdlb24udGlsZXMuZ2V0KHggLSAxLCB5IC0gMSkgPT09IEVUaWxlcy5XQUxMO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNvbGlkVG9wUmlnaHQgPSB5ID09PSAwIHx8IHggPT09IGR1bmdlb24ud2lkdGggLSAxIHx8IGR1bmdlb24udGlsZXMuZ2V0KHggKyAxLCB5IC0gMSkgPT09IEVUaWxlcy5XQUxMO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNvbGlkQm90dG9tTGVmdCA9IHkgPT09IGR1bmdlb24uaGVpZ2h0IC0gMSB8fCB4ID09PSAwIHx8IGR1bmdlb24udGlsZXMuZ2V0KHggLSAxLCB5ICsgMSkgPT09IEVUaWxlcy5XQUxMO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNvbGlkQm90dG9tUmlnaHQgPSB5ID09PSBkdW5nZW9uLmhlaWdodCAtIDEgfHwgeCA9PT0gZHVuZ2Vvbi53aWR0aCAtIDEgfHwgZHVuZ2Vvbi50aWxlcy5nZXQoeCArIDEsIHkgKyAxKSA9PT0gRVRpbGVzLldBTEw7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNvbGlkVG9wTGVmdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRleFggPSAzO1xyXG4gICAgICAgICAgICAgICAgICAgIHRleFkgPSAxO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghc29saWRUb3BSaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRleFggPSA0O1xyXG4gICAgICAgICAgICAgICAgICAgIHRleFkgPSAxO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghc29saWRCb3R0b21MZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4WCA9IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4WSA9IDI7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFzb2xpZEJvdHRvbVJpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4WCA9IDQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4WSA9IDI7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRleFggPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHRleFkgPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFzb2xpZExlZnQgJiYgc29saWRSaWdodCAmJiBzb2xpZEJvdHRvbSAmJiAhc29saWRUb3ApIHtcclxuICAgICAgICAgICAgICAgIHRleFggPSAwO1xyXG4gICAgICAgICAgICAgICAgdGV4WSA9IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc29saWRMZWZ0ICYmIHNvbGlkUmlnaHQgJiYgc29saWRCb3R0b20gJiYgIXNvbGlkVG9wKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXhYID0gMTtcclxuICAgICAgICAgICAgICAgIHRleFkgPSAwO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNvbGlkTGVmdCAmJiAhc29saWRSaWdodCAmJiBzb2xpZEJvdHRvbSAmJiAhc29saWRUb3ApIHtcclxuICAgICAgICAgICAgICAgIHRleFggPSAyO1xyXG4gICAgICAgICAgICAgICAgdGV4WSA9IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXNvbGlkTGVmdCAmJiBzb2xpZFJpZ2h0ICYmIHNvbGlkQm90dG9tICYmIHNvbGlkVG9wKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXhYID0gMDtcclxuICAgICAgICAgICAgICAgIHRleFkgPSAxO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNvbGlkTGVmdCAmJiAhc29saWRSaWdodCAmJiBzb2xpZEJvdHRvbSAmJiBzb2xpZFRvcCkge1xyXG4gICAgICAgICAgICAgICAgdGV4WCA9IDI7XHJcbiAgICAgICAgICAgICAgICB0ZXhZID0gMTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICghc29saWRMZWZ0ICYmIHNvbGlkUmlnaHQgJiYgIXNvbGlkQm90dG9tICYmIHNvbGlkVG9wKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXhYID0gMDtcclxuICAgICAgICAgICAgICAgIHRleFkgPSAyO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNvbGlkTGVmdCAmJiBzb2xpZFJpZ2h0ICYmICFzb2xpZEJvdHRvbSAmJiBzb2xpZFRvcCkge1xyXG4gICAgICAgICAgICAgICAgdGV4WCA9IDE7XHJcbiAgICAgICAgICAgICAgICB0ZXhZID0gMjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzb2xpZExlZnQgJiYgIXNvbGlkUmlnaHQgJiYgIXNvbGlkQm90dG9tICYmIHNvbGlkVG9wKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXhYID0gMjtcclxuICAgICAgICAgICAgICAgIHRleFkgPSAyO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFzb2xpZExlZnQgJiYgc29saWRSaWdodCAmJiAhc29saWRCb3R0b20gJiYgIXNvbGlkVG9wKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXhYID0gMztcclxuICAgICAgICAgICAgICAgIHRleFkgPSAwO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNvbGlkTGVmdCAmJiBzb2xpZFJpZ2h0ICYmICFzb2xpZEJvdHRvbSAmJiAhc29saWRUb3ApIHtcclxuICAgICAgICAgICAgICAgIHRleFggPSA0O1xyXG4gICAgICAgICAgICAgICAgdGV4WSA9IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc29saWRMZWZ0ICYmICFzb2xpZFJpZ2h0ICYmICFzb2xpZEJvdHRvbSAmJiAhc29saWRUb3ApIHtcclxuICAgICAgICAgICAgICAgIHRleFggPSA1O1xyXG4gICAgICAgICAgICAgICAgdGV4WSA9IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXNvbGlkTGVmdCAmJiAhc29saWRSaWdodCAmJiBzb2xpZEJvdHRvbSAmJiAhc29saWRUb3ApIHtcclxuICAgICAgICAgICAgICAgIHRleFggPSA2O1xyXG4gICAgICAgICAgICAgICAgdGV4WSA9IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXNvbGlkTGVmdCAmJiAhc29saWRSaWdodCAmJiBzb2xpZEJvdHRvbSAmJiBzb2xpZFRvcCkge1xyXG4gICAgICAgICAgICAgICAgdGV4WCA9IDY7XHJcbiAgICAgICAgICAgICAgICB0ZXhZID0gMTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICghc29saWRMZWZ0ICYmICFzb2xpZFJpZ2h0ICYmICFzb2xpZEJvdHRvbSAmJiBzb2xpZFRvcCkge1xyXG4gICAgICAgICAgICAgICAgdGV4WCA9IDY7XHJcbiAgICAgICAgICAgICAgICB0ZXhZID0gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IFBJWEkuU3ByaXRlKG5ldyBQSVhJLlRleHR1cmUoQ2xhc3NpY1RpbGVQcm92aWRlci50ZXh0dXJlU2hlZXQuYmFzZVRleHR1cmUsIG5ldyBQSVhJLlJlY3RhbmdsZSh0ZXhYICogMzIsIHRleFkgKiAzMiwgMzIsIDMyKSkpO1xyXG4gICAgfVxyXG5cclxufSIsImV4cG9ydCBmdW5jdGlvbiBzdGF0aWNJbXBsZW1lbnRzPFQ+KCkge1xyXG4gICAgcmV0dXJuIChjb25zdHJ1Y3RvcjogVCkgPT4ge31cclxufSIsImltcG9ydCB7IFRlbXBsYXRlUm9vbSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vVGVtcGxhdGVSb29tXCI7XHJcbmltcG9ydCB7IHN0YXRpY0ltcGxlbWVudHMgfSBmcm9tIFwiLi9EZWNvcmF0b3JcIjtcclxuaW1wb3J0IHsgSVByb3ZpZGVyIH0gZnJvbSBcIi4vSVByb3ZpZGVyXCI7XHJcblxyXG5Ac3RhdGljSW1wbGVtZW50czxJUHJvdmlkZXI+KClcclxuZXhwb3J0IGNsYXNzIFN0YW5kYXJkVGVtcGxhdGVSb29tUHJvdmlkZXIge1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgdGVtcGxhdGVzOiBUZW1wbGF0ZVJvb21bXTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIHJlYWR5KCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGxldCBwID0gbmV3IFByb21pc2U8dm9pZD4oIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGVtcGxhdGVzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGxldCByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICAgICAgICAgIHJlcS5vcGVuKFwiR0VUXCIsIFwiL3RlbXBsYXRlcy5qc29uXCIpO1xyXG4gICAgICAgICAgICAgICAgcmVxLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcGxhdGVzOiBUZW1wbGF0ZVJvb21bXSA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZVRleHQpLm1hcCggKGQ6IG51bWJlcltdW10pID0+IG5ldyBUZW1wbGF0ZVJvb20oZCkgKTtcclxuICAgICAgICAgICAgICAgICAgICBTdGFuZGFyZFRlbXBsYXRlUm9vbVByb3ZpZGVyLnRlbXBsYXRlcyA9IHRlbXBsYXRlcztcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGVtcGxhdGVzLmZvckVhY2goICh0KSA9PiBjb25zb2xlLmxvZyh0LnRvU3RyaW5nKCkpICk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IGR1bmdlb24gPSAod2luZG93IGFzIGFueSkuZHVuZ2VvbiA9IER1bkdlbih0ZW1wbGF0ZXMsIHsgaGVpZ2h0OiAxMDAsIHdpZHRoOiAxMDAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbWFpbihkdW5nZW9uKTtcclxuICAgICAgICAgICAgICAgIH0gKTtcclxuICAgICAgICAgICAgICAgIHJlcS5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgcmVqZWN0KTtcclxuICAgICAgICAgICAgICAgIHJlcS5zZW5kKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICk7XHJcbiAgICAgICAgcmV0dXJuIHA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBpc1JlYWR5KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRlbXBsYXRlcyAhPT0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxufVxyXG4iLCIvLyB0c2xpbnQ6ZGlzYWJsZSBtYXgtY2xhc3Nlcy1wZXItZmlsZVxyXG5pbXBvcnQgKiBhcyBfS2V5IGZyb20gXCIuL0tleVwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IEtleSA9IF9LZXk7XHJcblxyXG5jbGFzcyBKdWdnbGVyIHtcclxuICAgIHByaXZhdGUgZW50ZXJGcmFtZUZ1bmN0aW9uczogWygoKSA9PiB2b2lkKSwgYW55XVtdID0gW107XHJcbiAgICBwcml2YXRlIHNjaGVkdWxlOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGludGVyRnJhbWVUaW1lOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBmcHM6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuaW50ZXJGcmFtZVRpbWUgPSAxMDAwIC8gZnBzO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUgPSBEYXRlLm5vdygpICsgdGhpcy5pbnRlckZyYW1lVGltZTtcclxuICAgICAgICBsZXQgdGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5lbnRlckZyYW1lRnVuY3Rpb25zLmZvckVhY2goIChbZm4sIGN0eF0pID0+IGZuLmNhbGwoY3R4KSApO1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlICs9IHRoaXMuaW50ZXJGcmFtZVRpbWU7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGltZW91dCA9IHRoaXMuc2NoZWR1bGUgLSBEYXRlLm5vdygpO1xyXG4gICAgICAgICAgICBpZiAodGltZW91dCA8IDIpIHtcclxuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSAyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSA9IERhdGUubm93KCkgKyB0aGlzLmludGVyRnJhbWVUaW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQodGljaywgdGhpcy5zY2hlZHVsZSAtIERhdGUubm93KCkpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQodGljaywgdGhpcy5pbnRlckZyYW1lVGltZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEZQUyhmcHM6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuaW50ZXJGcmFtZVRpbWUgPSAxMDAwIC8gZnBzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGQoZm46ICgpID0+IHZvaWQsIGNvbnRleHQ/OiBhbnkpIHtcclxuICAgICAgICBpZiAodGhpcy5oYXMoZm4sIGNvbnRleHQpIDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLmVudGVyRnJhbWVGdW5jdGlvbnMucHVzaChbZm4sIGNvbnRleHRdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZShmbjogKCkgPT4gdm9pZCwgY29udGV4dD86IGFueSkge1xyXG4gICAgICAgIGxldCBpZHggPSB0aGlzLmhhcyhmbiwgY29udGV4dCk7XHJcbiAgICAgICAgaWYgKGlkeCA+PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW50ZXJGcmFtZUZ1bmN0aW9ucy5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhhcyhmbjogKCkgPT4gdm9pZCwgY29udGV4dD86IGFueSkge1xyXG4gICAgICAgIGZvciAobGV0IFtpLCBvZWZdIG9mIGVudW1lcmF0ZSh0aGlzLmVudGVyRnJhbWVGdW5jdGlvbnMpKSB7XHJcbiAgICAgICAgICAgIGlmIChvZWZbMF0gPT09IGZuICYmIG9lZlsxXSA9PT0gY29udGV4dCkgcmV0dXJuIGk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWZ0ZXJGcmFtZXMobnVtRnJhbWVzOiBudW1iZXIsIGZuOiAoKSA9PiB2b2lkLCBjb250ZXh0PzogYW55KSB7XHJcbiAgICAgICAgbGV0IHdyYXBwZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIG51bUZyYW1lcyAtLTtcclxuICAgICAgICAgICAgaWYgKG51bUZyYW1lcyA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBmbi5jYWxsKGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUod3JhcHBlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuYWRkKHdyYXBwZXIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgbGV0IGp1Z2dsZXIgPSBuZXcgSnVnZ2xlcig2MCk7XHJcblxyXG5jbGFzcyBSb290IHtcclxuICAgIHByaXZhdGUgX2FwcDogUElYSS5BcHBsaWNhdGlvbjtcclxuXHJcbiAgICBwdWJsaWMgc2V0QXBwKGFwcDogUElYSS5BcHBsaWNhdGlvbikge1xyXG4gICAgICAgIGlmICghdGhpcy5fYXBwKSB0aGlzLl9hcHAgPSBhcHA7XHJcbiAgICAgICAgZWxzZSB0aHJvdyBuZXcgRXJyb3IoXCJBcHAgaXMgYWxyZWFkeSBzZXRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHN0YWdlKCk6IFBJWEkuQ29udGFpbmVyIHtcclxuICAgICAgICBpZiAodGhpcy5fYXBwKSByZXR1cm4gdGhpcy5fYXBwLnN0YWdlO1xyXG4gICAgICAgIGVsc2UgdGhyb3cgbmV3IEVycm9yKFwiU3RhZ2UgaXMgbm90IHlldCBzZXRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGFwcCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fYXBwKSByZXR1cm4gdGhpcy5fYXBwO1xyXG4gICAgICAgIGVsc2UgdGhyb3cgbmV3IEVycm9yKFwiQXBwIGlzIG5vdCB5ZXQgc2V0XCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgbGV0IHJvb3QgPSAod2luZG93IGFzIGFueSkucm9vdCA9IG5ldyBSb290KCk7XHJcblxyXG5jbGFzcyBLZXlib2FyZCB7XHJcblxyXG4gICAgcHJpdmF0ZSBrZXlzOiBib29sZWFuW10gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGUpID0+IHRoaXMua2V5c1tlLmtleUNvZGVdID0gdHJ1ZSApO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGUpID0+IHRoaXMua2V5c1tlLmtleUNvZGVdID0gZmFsc2UgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNLZXlEb3duKGtleWNvZGU6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmtleXNba2V5Y29kZV0gfHwgZmFsc2U7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgbGV0IGtleWJvYXJkID0gbmV3IEtleWJvYXJkKCk7XHJcblxyXG5leHBvcnQgZW51bSBDb250cm9sbGVyQXhpcyB7XHJcbiAgICBMRUZUX1ggPSAwLFxyXG4gICAgTEVGVF9ZID0gMSxcclxuICAgIFJJR0hUX1ggPSAyLFxyXG4gICAgUklHSFRfWSA9IDMsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIENvbnRyb2xsZXJCdXR0b24ge1xyXG4gICAgQSA9IDAsXHJcbiAgICBCID0gMSxcclxuICAgIFggPSAyLFxyXG4gICAgWSA9IDMsXHJcbiAgICBMQiA9IDQsXHJcbiAgICBSQiA9IDUsXHJcbiAgICBMVCA9IDYsXHJcbiAgICBSVCA9IDcsXHJcbiAgICBTRUxFQ1QgPSA4LFxyXG4gICAgU1RBUlQgPSA5LFxyXG4gICAgTDMgPSAxMCxcclxuICAgIFIzID0gMTEsXHJcbiAgICBEX1VQID0gMTIsXHJcbiAgICBEX0RPV04gPSAxMyxcclxuICAgIERfTEVGVCA9IDE0LFxyXG4gICAgRF9SSUdIVCA9IDE1LFxyXG59XHJcblxyXG5jbGFzcyBDb250cm9sbGVyIHtcclxuICAgIHByaXZhdGUgYnV0dG9uczogYm9vbGVhbltdID0gW107XHJcbiAgICBwcml2YXRlIGF4ZXM6IG51bWJlcltdID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAganVnZ2xlci5hZGQoICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGdwcyA9IG5hdmlnYXRvci5nZXRHYW1lcGFkcygpO1xyXG4gICAgICAgICAgICBpZiAoIWdwc1swXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25zID0gW107XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF4ZXMgPSBbXTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgZ2FtZXBhZCA9IGdwc1swXSE7XHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9ucyA9IGdhbWVwYWQuYnV0dG9ucy5tYXAoIChiKSA9PiBiLnByZXNzZWQgKTtcclxuICAgICAgICAgICAgdGhpcy5heGVzID0gZ2FtZXBhZC5heGVzO1xyXG4gICAgICAgIH0gKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QXhpcyhheGlzOiBDb250cm9sbGVyQXhpcykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF4ZXNbYXhpc10gfHwgMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QnV0dG9uKGJ1dHRvbjogQ29udHJvbGxlckJ1dHRvbikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJ1dHRvbnNbYnV0dG9uXSB8fCBmYWxzZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGxldCBjb250cm9sbGVyID0gbmV3IENvbnRyb2xsZXIoKTtcclxuXHJcbmNsYXNzIFNvdW5kTWFuYWdlciB7XHJcbiAgICBwdWJsaWMgc3RhdGljIEdMT0JBTF9WT0xVTUUgPSAwLjQ7XHJcbiAgICBwcml2YXRlIG11c2ljOiB7IFtzb25nTmFtZTogc3RyaW5nXTogeyBzb25nOiBIVE1MQXVkaW9FbGVtZW50LCBmYWRlOiBudW1iZXIgfSB9ID0ge307XHJcbiAgICBwcml2YXRlIHRhZ3M6IHsgW3RhZzogc3RyaW5nXTogYm9vbGVhbiB9ID0ge307XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAganVnZ2xlci5hZGQoKCkgPT4gdGhpcy50YWdzID0ge30pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwbGF5U291bmQobmFtZTogc3RyaW5nLCB2b2x1bWUgPSAxLCB0YWc/OiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodGFnKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy50YWdzW3RhZ10pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFnc1t0YWddID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYXVkaW8gPSBuZXcgQXVkaW8obmFtZSk7XHJcbiAgICAgICAgYXVkaW8udm9sdW1lID0gdm9sdW1lICogU291bmRNYW5hZ2VyLkdMT0JBTF9WT0xVTUU7XHJcbiAgICAgICAgYXVkaW8ucGxheSgpO1xyXG4gICAgICAgIGF1ZGlvLm9uZW5kZWQgPSAoKSA9PiBhdWRpby5yZW1vdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcGxheU11c2ljKG5hbWU6IHN0cmluZywgdm9sdW1lID0gMSkge1xyXG4gICAgICAgIGlmICh0aGlzLm11c2ljLmhhc093blByb3BlcnR5KG5hbWUpKSB7XHJcbiAgICAgICAgICAgIGlmICghaXNOYU4odGhpcy5tdXNpY1tuYW1lXS5mYWRlKSkgd2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5tdXNpY1tuYW1lXS5mYWRlKTtcclxuICAgICAgICAgICAgdGhpcy5tdXNpY1tuYW1lXS5zb25nLnZvbHVtZSA9IHZvbHVtZSAqIFNvdW5kTWFuYWdlci5HTE9CQUxfVk9MVU1FO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBhdWRpbyA9IG5ldyBBdWRpbyhuYW1lKTtcclxuICAgICAgICBhdWRpby52b2x1bWUgPSB2b2x1bWUgKiBTb3VuZE1hbmFnZXIuR0xPQkFMX1ZPTFVNRTtcclxuICAgICAgICBhdWRpby5sb29wID0gdHJ1ZTtcclxuICAgICAgICBhdWRpby5wbGF5KCk7XHJcbiAgICAgICAgdGhpcy5tdXNpY1tuYW1lXSA9IHtcclxuICAgICAgICAgICAgc29uZzogYXVkaW8sXHJcbiAgICAgICAgICAgIGZhZGU6IE5hTixcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmYWRlTXVzaWNPdXQobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm11c2ljLmhhc093blByb3BlcnR5KG5hbWUpIHx8ICFpc05hTih0aGlzLm11c2ljW25hbWVdLmZhZGUpKSByZXR1cm47XHJcbiAgICAgICAgbGV0IGZhZGVTdGFydCA9IHRoaXMubXVzaWNbbmFtZV0uc29uZy52b2x1bWU7XHJcbiAgICAgICAgbGV0IGZhZGVUaW1lID0gMzA7XHJcbiAgICAgICAgdGhpcy5tdXNpY1tuYW1lXS5mYWRlID0gd2luZG93LnNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgZmFkZVRpbWUgLS07XHJcbiAgICAgICAgICAgIGlmIChmYWRlVGltZSA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm11c2ljW25hbWVdLnNvbmcucGF1c2UoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubXVzaWNbbmFtZV0uc29uZy5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMubXVzaWNbbmFtZV0uZmFkZSk7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5tdXNpY1tuYW1lXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubXVzaWNbbmFtZV0uc29uZy52b2x1bWUgPSBmYWRlVGltZSAvIDMwICogZmFkZVN0YXJ0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMTYpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRNdXNpY1ZvbHVtZShuYW1lOiBzdHJpbmcsIHZvbHVtZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm11c2ljLmhhc093blByb3BlcnR5KG5hbWUpKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5tdXNpY1tuYW1lXS5zb25nLnZvbHVtZSA9IHZvbHVtZSAqIFNvdW5kTWFuYWdlci5HTE9CQUxfVk9MVU1FO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgbGV0IHNvdW5kTWFuYWdlciA9IG5ldyBTb3VuZE1hbmFnZXIoKTtcclxuIiwiaW1wb3J0IHsgTWFwMkQgfSBmcm9tIFwiLi9NYXAyRFwiO1xyXG5pbXBvcnQgeyBUZW1wbGF0ZVJvb20sIERpcmVjdGlvbiB9IGZyb20gXCIuL1RlbXBsYXRlUm9vbVwiO1xyXG5pbXBvcnQgKiBhcyBzZWVkcmFuZG9tIGZyb20gXCJzZWVkcmFuZG9tXCI7XHJcbmltcG9ydCB7IEtleXMgfSBmcm9tIFwiLi91dGlsc1wiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEdW5HZW5PcHRzIHtcclxuICAgIHdpZHRoPzogbnVtYmVyLFxyXG4gICAgaGVpZ2h0PzogbnVtYmVyLFxyXG4gICAgc2VlZD86IHN0cmluZyxcclxufVxyXG5cclxubGV0IGRlZmF1bHRzOiBEdW5HZW5PcHRzID0ge1xyXG4gICAgd2lkdGg6IDUwLFxyXG4gICAgaGVpZ2h0OiA1MCxcclxufVxyXG5cclxuaW50ZXJmYWNlIElPcGVuRG9vciBleHRlbmRzIElQb2ludCB7XHJcbiAgICBkaXJlY3Rpb246IERpcmVjdGlvbjtcclxufVxyXG5cclxuaW50ZXJmYWNlIElQb2ludCB7XHJcbiAgICB4OiBudW1iZXI7XHJcbiAgICB5OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEVUaWxlcyB7XHJcbiAgICBTT0xJRCA9IC0xLFxyXG4gICAgRU1QVFkgPSAwLFxyXG4gICAgV0FMTCA9IDEsXHJcbiAgICBUT1BfRE9PUiA9IERpcmVjdGlvbi5UT1AsXHJcbiAgICBCT1RUT01fRE9PUiA9IERpcmVjdGlvbi5CT1RUT00sXHJcbiAgICBMRUZUX0RPT1IgPSBEaXJlY3Rpb24uTEVGVCxcclxuICAgIFJJR0hUX0RPT1IgPSBEaXJlY3Rpb24uUklHSFQsXHJcbiAgICBMQURERVIgPSA2LFxyXG59XHJcblxyXG5mdW5jdGlvbiBvcHBvc2l0ZURpcmVjdGlvbihkaXI6IERpcmVjdGlvbik6IERpcmVjdGlvbiB7XHJcbiAgICBzd2l0Y2goZGlyKSB7XHJcbiAgICAgICAgY2FzZSBEaXJlY3Rpb24uVE9QOiByZXR1cm4gRGlyZWN0aW9uLkJPVFRPTTtcclxuICAgICAgICBjYXNlIERpcmVjdGlvbi5CT1RUT006IHJldHVybiBEaXJlY3Rpb24uVE9QO1xyXG4gICAgICAgIGNhc2UgRGlyZWN0aW9uLkxFRlQ6IHJldHVybiBEaXJlY3Rpb24uUklHSFQ7XHJcbiAgICAgICAgY2FzZSBEaXJlY3Rpb24uUklHSFQ6IHJldHVybiBEaXJlY3Rpb24uTEVGVDtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgZGlyZWN0aW9ucyA9IFtEaXJlY3Rpb24uVE9QLCBEaXJlY3Rpb24uQk9UVE9NLCBEaXJlY3Rpb24uTEVGVCwgRGlyZWN0aW9uLlJJR0hUXTtcclxuXHJcbmZ1bmN0aW9uIGFkZE9wZW5Eb29yKHg6IG51bWJlciwgeTogbnVtYmVyLCByb29tOiBUZW1wbGF0ZVJvb20sIGRpcmVjdGlvbjogRGlyZWN0aW9uLCBvcGVuRG9vcnM6IElPcGVuRG9vcltdKSB7XHJcbiAgICBpZiAocm9vbS5kb29yd2F5c1tkaXJlY3Rpb25dIDwgMCkgcmV0dXJuO1xyXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLlRPUCkge1xyXG4gICAgICAgIG9wZW5Eb29ycy5wdXNoKCB7IGRpcmVjdGlvbjogZGlyZWN0aW9uLCB4OiB4ICsgcm9vbS5kb29yd2F5c1tkaXJlY3Rpb25dLCB5OiB5IH0gKTtcclxuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uQk9UVE9NKSB7XHJcbiAgICAgICAgb3BlbkRvb3JzLnB1c2goIHsgZGlyZWN0aW9uOiBkaXJlY3Rpb24sIHg6IHggKyByb29tLmRvb3J3YXlzW2RpcmVjdGlvbl0sIHk6IHkgKyByb29tLmhlaWdodCAtIDEgfSApO1xyXG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5MRUZUKSB7XHJcbiAgICAgICAgb3BlbkRvb3JzLnB1c2goIHsgZGlyZWN0aW9uOiBkaXJlY3Rpb24sIHg6IHgsIHk6IHkgKyByb29tLmRvb3J3YXlzW2RpcmVjdGlvbl0gfSApO1xyXG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5SSUdIVCkge1xyXG4gICAgICAgIG9wZW5Eb29ycy5wdXNoKCB7IGRpcmVjdGlvbjogZGlyZWN0aW9uLCB4OiB4ICsgcm9vbS53aWR0aCAtIDEsIHk6IHkgKyByb29tLmRvb3J3YXlzW2RpcmVjdGlvbl0gfSApO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRPcGVuRG9vcnMoeDogbnVtYmVyLCB5OiBudW1iZXIsIHJvb206IFRlbXBsYXRlUm9vbSwgb3BlbkRvb3JzOiBJT3BlbkRvb3JbXSwgZXhjdWxkZTogRGlyZWN0aW9uW10gPSBbXSkge1xyXG4gICAgZm9yIChsZXQgZGlyIG9mIGRpcmVjdGlvbnMpIHtcclxuICAgICAgICBpZiAoZXhjdWxkZS5pbmRleE9mKGRpcikgPj0gMCB8fCByb29tLmRvb3J3YXlzW2Rpcl0gPCAwKSBjb250aW51ZTtcclxuICAgICAgICBhZGRPcGVuRG9vcih4LCB5LCByb29tLCBkaXIsIG9wZW5Eb29ycyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJvb21DYW5BdHRhY2goZGlyZWN0aW9uOiBEaXJlY3Rpb24sIGNhbmRpZGF0ZVJvb206IFRlbXBsYXRlUm9vbSkge1xyXG4gICAgcmV0dXJuIGNhbmRpZGF0ZVJvb20uZG9vcndheXNbb3Bwb3NpdGVEaXJlY3Rpb24oZGlyZWN0aW9uKV0gPj0gMDtcclxufVxyXG5cclxuZnVuY3Rpb24gY29ubmVjdGVkUm9vbVhZKGRvb3I6IElPcGVuRG9vciwgcm9vbTogVGVtcGxhdGVSb29tKSB7XHJcbiAgICBsZXQgY29ubmVjdGluZ0Rvb3IgPSByb29tLmRvb3J3YXlzW29wcG9zaXRlRGlyZWN0aW9uKGRvb3IuZGlyZWN0aW9uKV07XHJcbiAgICBzd2l0Y2ggKGRvb3IuZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgY2FzZSBEaXJlY3Rpb24uVE9QOiByZXR1cm4geyB4OiBkb29yLnggLSBjb25uZWN0aW5nRG9vciwgeTogZG9vci55IC0gcm9vbS5oZWlnaHQgfTtcclxuICAgICAgICBjYXNlIERpcmVjdGlvbi5CT1RUT006IHJldHVybiB7IHg6IGRvb3IueCAtIGNvbm5lY3RpbmdEb29yLCB5OiBkb29yLnkgKyAxIH07XHJcbiAgICAgICAgY2FzZSBEaXJlY3Rpb24uTEVGVDogcmV0dXJuIHsgeDogZG9vci54IC0gcm9vbS53aWR0aCwgeTogZG9vci55IC0gY29ubmVjdGluZ0Rvb3IgfTtcclxuICAgICAgICBjYXNlIERpcmVjdGlvbi5SSUdIVDogcmV0dXJuIHsgeDogZG9vci54ICsgMSwgeTogZG9vci55IC0gY29ubmVjdGluZ0Rvb3IgfTtcclxuICAgICAgICBkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGRpcmVjdGlvblwiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIER1bkdlbih0ZW1wbGF0ZXM6IFRlbXBsYXRlUm9vbVtdLCBvcHRzPzogRHVuR2VuT3B0cykge1xyXG4gICAgb3B0cyA9IG9wdHMgfHwge307XHJcbiAgICBmb3IgKGxldCBrZXkgb2YgS2V5cyhkZWZhdWx0cykpIHtcclxuICAgICAgICBpZiAob3B0c1trZXldID09PSB1bmRlZmluZWQpIG9wdHNba2V5XSA9IGRlZmF1bHRzW2tleV07XHJcbiAgICB9XHJcbiAgICBsZXQgcHJuZyA9IHNlZWRyYW5kb20ob3B0cy5zZWVkKTtcclxuICAgIGxldCBkdW5nZW9uID0gbmV3IER1bmdlb24ob3B0cy53aWR0aCEsIG9wdHMuaGVpZ2h0ISwgb3B0cy5zZWVkIHx8IFwiXCIpO1xyXG4gICAgbGV0IG9wZW5Eb29yczogSU9wZW5Eb29yW10gPSBbXTtcclxuICAgIHRlbXBsYXRlcyA9IGZ5U2h1ZmZsZSh0ZW1wbGF0ZXMsIHBybmcpO1xyXG4gICAgbGV0IHJvb3QgPSB0ZW1wbGF0ZXNbMF07XHJcbiAgICBsZXQgeCA9IE1hdGguZmxvb3IoKGR1bmdlb24ud2lkdGggLSByb290LndpZHRoKSAvIDIpO1xyXG4gICAgbGV0IHkgPSBNYXRoLmZsb29yKChkdW5nZW9uLmhlaWdodCAtIHJvb3QuaGVpZ2h0KSAvIDIpO1xyXG4gICAgaWYgKCFkdW5nZW9uLnBhaW50KHJvb3QsIHgsIHkpKSB7XHJcbiAgICAgICAgcmV0dXJuIGR1bmdlb247XHJcbiAgICB9XHJcbiAgICBhZGRPcGVuRG9vcnMoeCwgeSwgcm9vdCwgb3BlbkRvb3JzKTtcclxuXHJcbiAgICB3aGlsZSAob3BlbkRvb3JzLmxlbmd0aCkge1xyXG4gICAgICAgIG9wZW5Eb29ycyA9IGZ5U2h1ZmZsZShvcGVuRG9vcnMsIHBybmcpO1xyXG4gICAgICAgIGxldCBkb29yID0gb3BlbkRvb3JzLnBvcCgpITtcclxuICAgICAgICB0ZW1wbGF0ZXMgPSBmeVNodWZmbGUodGVtcGxhdGVzLCBwcm5nKTtcclxuICAgICAgICBmb3IgKGxldCBjYW5kaWRhdGUgb2YgdGVtcGxhdGVzKSB7XHJcbiAgICAgICAgICAgIGlmICghcm9vbUNhbkF0dGFjaChkb29yLmRpcmVjdGlvbiwgY2FuZGlkYXRlKSkgY29udGludWU7XHJcbiAgICAgICAgICAgIGxldCB4eSA9IGNvbm5lY3RlZFJvb21YWShkb29yLCBjYW5kaWRhdGUpO1xyXG4gICAgICAgICAgICBpZiAoZHVuZ2Vvbi5wYWludChjYW5kaWRhdGUsIHh5LngsIHh5LnkpKSB7XHJcbiAgICAgICAgICAgICAgICBhZGRPcGVuRG9vcnMoeHkueCwgeHkueSwgY2FuZGlkYXRlLCBvcGVuRG9vcnMsIFtvcHBvc2l0ZURpcmVjdGlvbihkb29yLmRpcmVjdGlvbildKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgZHVuZ2VvbiA9IGR1bmdlb24ubWFwKCAodGlsZSwgeCwgeSwgZHVuZ2VvbikgPT4ge1xyXG4gICAgICAgIGlmICh0aWxlID09PSBFVGlsZXMuU09MSUQgfHwgdGlsZSA9PT0gRVRpbGVzLldBTEwpIHtcclxuICAgICAgICAgICAgaWYgKHkgPiAwICYmIHkgPCBkdW5nZW9uLmhlaWdodCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0b3AgPSBkdW5nZW9uLnRpbGVzLmdldCh4LCB5IC0gMSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgYm90dG9tID0gZHVuZ2Vvbi50aWxlcy5nZXQoeCwgeSArIDEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCgodG9wID09PSBEaXJlY3Rpb24uQk9UVE9NIHx8IHRvcCA9PT0gMCkgJiYgKGJvdHRvbSA9PT0gRGlyZWN0aW9uLlRPUCB8fCBib3R0b20gPT09IDApKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgdG9wICE9PSBib3R0b20pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIERpcmVjdGlvbi5CT1RUT007XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHggPiAwICYmIHggPCBkdW5nZW9uLndpZHRoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxlZnQgPSBkdW5nZW9uLnRpbGVzLmdldCh4IC0gMSwgeSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmlnaHQgPSBkdW5nZW9uLnRpbGVzLmdldCh4ICsgMSwgeSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoKChsZWZ0ID09PSBEaXJlY3Rpb24uUklHSFQgfHwgbGVmdCA9PT0gMCkgJiYgKHJpZ2h0ID09PSBEaXJlY3Rpb24uTEVGVCB8fCByaWdodCA9PT0gMCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgbGVmdCAhPT0gcmlnaHQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRpcmVjdGlvbnMuaW5kZXhPZih0aWxlKSA8IDApIHJldHVybiB0aWxlO1xyXG4gICAgICAgIGlmICh4ID4gMCAmJiB4IDwgZHVuZ2Vvbi53aWR0aCAtIDEgJiYgeSA+IDAgJiYgeSA8IGR1bmdlb24uaGVpZ2h0IC0gMSkge1xyXG4gICAgICAgICAgICBsZXQgeHkgPSB7IHg6IDAsIHk6IDAgfTtcclxuICAgICAgICAgICAgc3dpdGNoICh0aWxlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIERpcmVjdGlvbi5UT1A6IHh5LnkgPSAtMTsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIERpcmVjdGlvbi5CT1RUT006IHh5LnkgPSAxOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRGlyZWN0aW9uLkxFRlQ6IHh5LnggPSAtMTsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIERpcmVjdGlvbi5SSUdIVDogeHkueCA9IDE7IGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkdW5nZW9uLnRpbGVzLmdldCh4ICsgeHkueCwgeSArIHh5LnkpID09PSBvcHBvc2l0ZURpcmVjdGlvbih0aWxlKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRpbGUgPT09IERpcmVjdGlvbi5CT1RUT00gPyBEaXJlY3Rpb24uQk9UVE9NIDogRVRpbGVzLkVNUFRZO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHggPiAxICYmIHggPCBkdW5nZW9uLndpZHRoIC0gMiAmJiB5ID4gMSAmJiB5IDwgZHVuZ2Vvbi5oZWlnaHQgLSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlYWNoID0gZHVuZ2Vvbi50aWxlcy5nZXQoeCArIHh5LnggKiAyLCB5ICsgeHkueSAqIDIpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlYWNoID09PSBFVGlsZXMuRU1QVFkgfHwgcmVhY2ggPT09IG9wcG9zaXRlRGlyZWN0aW9uKHRpbGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aWxlID09PSBEaXJlY3Rpb24uQk9UVE9NID8gRGlyZWN0aW9uLkJPVFRPTSA6IEVUaWxlcy5FTVBUWTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEVUaWxlcy5XQUxMO1xyXG4gICAgfSApO1xyXG5cclxuICAgIGxldCBsYWRkZXJTZWVkczogSVBvaW50W10gPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZHVuZ2Vvbi53aWR0aCAtIDE7IGkgKyspIHtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGR1bmdlb24ud2lkdGggLSAxOyBqICsrKSB7XHJcbiAgICAgICAgICAgIGlmIChkdW5nZW9uLnRpbGVzLmdldChpLCBqKSA9PT0gRVRpbGVzLkVNUFRZICYmIGR1bmdlb24udGlsZXMuZ2V0KGkgKyAxLCBqKSA9PT0gRVRpbGVzLkVNUFRZKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYmwgPSBkdW5nZW9uLnRpbGVzLmdldChpLCBqICsgMSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnIgPSBkdW5nZW9uLnRpbGVzLmdldChpICsgMSwgaiArIDEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJsID09PSAxICYmIGJyID09PSBEaXJlY3Rpb24uQk9UVE9NKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFkZGVyU2VlZHMucHVzaCh7IHg6IGkgKyAxLCB5OiBqICsgMSB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYmwgPT09IERpcmVjdGlvbi5CT1RUT00gJiYgYnIgPT09IEVUaWxlcy5XQUxMKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFkZGVyU2VlZHMucHVzaCh7IHg6IGksIHk6IGogKyAxIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgbGFkZGVyU2VlZHMgPSBmeVNodWZmbGUobGFkZGVyU2VlZHMsIHBybmcpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGVyYXNlQm90dG9tRG9vcih4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgICAgIGlmIChkdW5nZW9uLnRpbGVzLmdldCh4LCB5KSA9PT0gRGlyZWN0aW9uLkJPVFRPTSkge1xyXG4gICAgICAgICAgICBkdW5nZW9uLnRpbGVzLnNldCh4LCB5LCBFVGlsZXMuRU1QVFkpO1xyXG4gICAgICAgICAgICBlcmFzZUJvdHRvbURvb3IoeCAtIDEsIHkpO1xyXG4gICAgICAgICAgICBlcmFzZUJvdHRvbURvb3IoeCArIDEsIHkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB3aGlsZSAobGFkZGVyU2VlZHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGxldCBzZWVkID0gbGFkZGVyU2VlZHMucG9wKCkhO1xyXG4gICAgICAgIGlmIChkdW5nZW9uLnRpbGVzLmdldChzZWVkLngsIHNlZWQueSkgIT09IERpcmVjdGlvbi5CT1RUT00pIGNvbnRpbnVlO1xyXG4gICAgICAgIHdoaWxlIChkdW5nZW9uLnRpbGVzLmdldChzZWVkLngsIHNlZWQueSkgIT09IEVUaWxlcy5XQUxMKSB7XHJcbiAgICAgICAgICAgIGlmIChkdW5nZW9uLnRpbGVzLmdldChzZWVkLngsIHNlZWQueSkgPT09IERpcmVjdGlvbi5CT1RUT00pIHtcclxuICAgICAgICAgICAgICAgIGVyYXNlQm90dG9tRG9vcihzZWVkLngsIHNlZWQueSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZHVuZ2Vvbi50aWxlcy5zZXQoc2VlZC54LCBzZWVkLnksIEVUaWxlcy5MQURERVIpO1xyXG4gICAgICAgICAgICBzZWVkLnkgKys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkdW5nZW9uLm1hcCggKHQpID0+IHQgPT09IEVUaWxlcy5TT0xJRCA/IEVUaWxlcy5XQUxMIDogdCA9PT0gRVRpbGVzLkJPVFRPTV9ET09SID8gRVRpbGVzLkVNUFRZIDogdCk7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEdW5nZW9uIHtcclxuICAgIHB1YmxpYyB0aWxlcyA9IG5ldyBNYXAyRDxudW1iZXI+KCk7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgd2lkdGg6IG51bWJlciwgcHVibGljIGhlaWdodDogbnVtYmVyLCBwdWJsaWMgc2VlZDogc3RyaW5nLCBpbml0aWFsaXplcjogKHg6IG51bWJlciwgeTogbnVtYmVyKSA9PiBudW1iZXIgPSAoKSA9PiAtMSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2lkdGg7IGkgKyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBoZWlnaHQ7IGogKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGlsZXMuc2V0KGksIGosIGluaXRpYWxpemVyKGksIGopKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwYWludChyb29tOiBUZW1wbGF0ZVJvb20sIHg6IG51bWJlciwgeTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHggPCAwIHx8IHkgPCAwIHx8IHggKyByb29tLndpZHRoID4gdGhpcy53aWR0aCB8fCB5ICsgcm9vbS5oZWlnaHQgPiB0aGlzLmhlaWdodCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm9vbS53aWR0aDsgaSArKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJvb20uaGVpZ2h0OyBqICsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGlsZSA9IHRoaXMudGlsZXMuZ2V0KHggKyBpLCB5ICsgaik7XHJcbiAgICAgICAgICAgICAgICBpZiAodGlsZSA9PT0gdW5kZWZpbmVkIHx8IHRpbGUgIT09IEVUaWxlcy5TT0xJRCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm9vbS53aWR0aDsgaSArKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJvb20uaGVpZ2h0OyBqICsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbGVzLnNldCh4ICsgaSwgeSArIGosIHJvb20udGlsZXMuZ2V0KGksIGopKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBtYXAoZm46ICh0aWxlOiBudW1iZXIsIHg6IG51bWJlciwgeTogbnVtYmVyLCBkdW5nZW9uOiB0aGlzKSA9PiBudW1iZXIpOiBEdW5nZW9uIHtcclxuICAgICAgICByZXR1cm4gbmV3IER1bmdlb24odGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIHRoaXMuc2VlZCwgKHgsIHkpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGZuKHRoaXMudGlsZXMuZ2V0KHgsIHkpLCB4LCB5LCB0aGlzKTtcclxuICAgICAgICB9ICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZ5U2h1ZmZsZTxUPihhcnI6IFRbXSwgcHJuZzogc2VlZHJhbmRvbS5wcm5nKTogVFtdIHtcclxuICAgIGFyciA9IGFyci5zbGljZSgpO1xyXG4gICAgZm9yIChsZXQgaSA9IGFyci5sZW5ndGggLSAxOyBpID4gMDsgaSAtLSkge1xyXG4gICAgICAgIGxldCBzd3AgPSBNYXRoLmZsb29yKHBybmcoKSAqIChpICsgMSkpO1xyXG4gICAgICAgIGxldCB0ZW1wID0gYXJyW2ldO1xyXG4gICAgICAgIGFycltpXSA9IGFycltzd3BdO1xyXG4gICAgICAgIGFycltzd3BdID0gdGVtcDtcclxuICAgIH1cclxuICAgIHJldHVybiBhcnI7XHJcbn0iLCJleHBvcnQgY2xhc3MgTWFwMkQ8Vj4ge1xyXG5cclxuICAgIHByaXZhdGUgZGF0YTogVltdID0gW107XHJcbiAgICBzZXQoaTogbnVtYmVyLCBqOiBudW1iZXIsIGRhdGE6IFYpIHtcclxuICAgICAgICBpZiAoaSA8IDAgfHwgaiA8IDApIHRocm93IG5ldyBFcnJvcihcIk1hcDJEIGluZGV4IG91dCBvZiBib3VuZHMuXCIpO1xyXG4gICAgICAgIHRoaXMuZGF0YVtjcGYoaSArIDEsIGogKyAxKSAtIDFdID0gZGF0YTtcclxuICAgIH1cclxuICAgIGdldChpOiBudW1iZXIsIGo6IG51bWJlcik6IFYge1xyXG4gICAgICAgIGlmIChpIDwgMCB8fCBqIDwgMCkgdGhyb3cgbmV3IEVycm9yKFwiTWFwMkQgaW5kZXggb3V0IG9mIGJvdW5kcy5cIik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVtjcGYoaSArIDEsIGogKyAxKSAtIDFdO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcGYoaTogbnVtYmVyLCBqOiBudW1iZXIpIHtcclxuICAgIHJldHVybiAoKGkgKyBqIC0gMikgKiAoaSArIGogLSAxKSArIGkpIC8gMjtcclxufSIsImltcG9ydCB7IE1hcDJEIH0gZnJvbSBcIi4vTWFwMkRcIjtcclxuXHJcbmV4cG9ydCBlbnVtIERpcmVjdGlvbiB7XHJcbiAgICBUT1AgPSAyLFxyXG4gICAgQk9UVE9NID0gMyxcclxuICAgIExFRlQgPSA0LFxyXG4gICAgUklHSFQgPSA1LFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVSb29tIHtcclxuICAgIFxyXG4gICAgcHVibGljIHdpZHRoOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgaGVpZ2h0OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgdGlsZXMgPSBuZXcgTWFwMkQ8bnVtYmVyPigpO1xyXG5cclxuICAgIHB1YmxpYyBkb29yd2F5czogbnVtYmVyW10gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihkYXRhOiBudW1iZXJbXVtdKSB7XHJcbiAgICAgICAgdGhpcy5kb29yd2F5c1tEaXJlY3Rpb24uVE9QXSAgICAgICAgPSAtMTtcclxuICAgICAgICB0aGlzLmRvb3J3YXlzW0RpcmVjdGlvbi5CT1RUT01dICAgICA9IC0xO1xyXG4gICAgICAgIHRoaXMuZG9vcndheXNbRGlyZWN0aW9uLkxFRlRdICAgICAgID0gLTE7XHJcbiAgICAgICAgdGhpcy5kb29yd2F5c1tEaXJlY3Rpb24uUklHSFRdICAgICAgPSAtMTtcclxuICAgICAgICB0aGlzLndpZHRoID0gZGF0YVswXS5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBkYXRhLmxlbmd0aDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMud2lkdGg7IGkgKyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmhlaWdodDsgaiArKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aWxlcy5zZXQoaSwgaiwgZGF0YVtqXVtpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy53aWR0aDsgaSArKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50aWxlcy5nZXQoaSwgMCkgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZG9vcndheXNbRGlyZWN0aW9uLlRPUF0gPSBpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aWxlcy5zZXQoaSwgMCwgRGlyZWN0aW9uLlRPUCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMudGlsZXMuZ2V0KGksIHRoaXMuaGVpZ2h0IC0gMSkgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZG9vcndheXNbRGlyZWN0aW9uLkJPVFRPTV0gPSBpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aWxlcy5zZXQoaSwgdGhpcy5oZWlnaHQgLSAxLCBEaXJlY3Rpb24uQk9UVE9NKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuaGVpZ2h0OyBpICsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbGVzLmdldCgwLCBpKSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kb29yd2F5c1tEaXJlY3Rpb24uTEVGVF0gPSBpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aWxlcy5zZXQoMCwgaSwgRGlyZWN0aW9uLkxFRlQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbGVzLmdldCh0aGlzLndpZHRoIC0gMSwgaSkgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZG9vcndheXNbRGlyZWN0aW9uLlJJR0hUXSA9IGk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbGVzLnNldCh0aGlzLndpZHRoIC0gMSwgaSwgRGlyZWN0aW9uLlJJR0hUKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdG9TdHJpbmcoKSB7XHJcbiAgICAgICAgbGV0IHJlcHIgPSBcIlwiO1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5oZWlnaHQ7IGogKyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLndpZHRoOyBpICsrKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMudGlsZXMuZ2V0KGksIGopKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiByZXByICs9IFwi4paI4paIXCI7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjogcmVwciArPSBcIl5eXCI7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzogcmVwciArPSBcInZ2XCI7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDogcmVwciArPSBcIjw8XCI7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTogcmVwciArPSBcIj4+XCI7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJlcHIgKz0gXCIgIFwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlcHIgKz0gXCJcXG5cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlcHI7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY29uc3QgdmVubkludGVyc2VjdGlvbiA9IDxUPihsMTogVFtdLCBsMjogVFtdLCBzb3J0PzogKGE6IFQsIGI6IFQpID0+IG51bWJlcik6IHsgbDE6IFRbXSwgbDI6IFRbXSwgYm90aDogVFtdIH0gPT4ge1xyXG4gICAgbDEgPSBsMS5zbGljZSgpLnNvcnQoc29ydCk7XHJcbiAgICBsMiA9IGwyLnNsaWNlKCkuc29ydChzb3J0KTtcclxuICAgIGlmICghc29ydCkgc29ydCA9IChhLCBiKSA9PiBhIDwgYiA/IC0xIDogYSA+IGIgPyAxIDogMDtcclxuICAgIGxldCBsMWVsZW1lbnRzOiBUW10gPSBbXTtcclxuICAgIGxldCBsMmVsZW1lbnRzOiBUW10gPSBbXTtcclxuICAgIGxldCBib3RoOiBUW10gPSBbXTtcclxuICAgIHdoaWxlKGwxLmxlbmd0aCAmJiBsMi5sZW5ndGgpIHtcclxuICAgICAgICBsZXQgb3JkID0gc29ydChsMVswXSwgbDJbMF0pO1xyXG4gICAgICAgIGlmIChvcmQgPT09IDApIHtcclxuICAgICAgICAgICAgYm90aC5wdXNoKGwxLnNoaWZ0KCkhKTtcclxuICAgICAgICAgICAgbDIuc2hpZnQoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKG9yZCA8IDEpIHtcclxuICAgICAgICAgICAgbDFlbGVtZW50cy5wdXNoKGwxLnNoaWZ0KCkhKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsMmVsZW1lbnRzLnB1c2gobDIuc2hpZnQoKSEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbDE6IGwxZWxlbWVudHMuY29uY2F0KGwxKSxcclxuICAgICAgICBsMjogbDJlbGVtZW50cy5jb25jYXQobDIpLFxyXG4gICAgICAgIGJvdGgsXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBLZXlzID0gPFQ+KG9iajogVCk6IChrZXlvZiBUKVtdID0+IE9iamVjdC5rZXlzKG9iaikgYXMgKGtleW9mIFQpW107IiwiLy8gQSBsaWJyYXJ5IG9mIHNlZWRhYmxlIFJOR3MgaW1wbGVtZW50ZWQgaW4gSmF2YXNjcmlwdC5cbi8vXG4vLyBVc2FnZTpcbi8vXG4vLyB2YXIgc2VlZHJhbmRvbSA9IHJlcXVpcmUoJ3NlZWRyYW5kb20nKTtcbi8vIHZhciByYW5kb20gPSBzZWVkcmFuZG9tKDEpOyAvLyBvciBhbnkgc2VlZC5cbi8vIHZhciB4ID0gcmFuZG9tKCk7ICAgICAgIC8vIDAgPD0geCA8IDEuICBFdmVyeSBiaXQgaXMgcmFuZG9tLlxuLy8gdmFyIHggPSByYW5kb20ucXVpY2soKTsgLy8gMCA8PSB4IDwgMS4gIDMyIGJpdHMgb2YgcmFuZG9tbmVzcy5cblxuLy8gYWxlYSwgYSA1My1iaXQgbXVsdGlwbHktd2l0aC1jYXJyeSBnZW5lcmF0b3IgYnkgSm9oYW5uZXMgQmFhZ8O4ZS5cbi8vIFBlcmlvZDogfjJeMTE2XG4vLyBSZXBvcnRlZCB0byBwYXNzIGFsbCBCaWdDcnVzaCB0ZXN0cy5cbnZhciBhbGVhID0gcmVxdWlyZSgnLi9saWIvYWxlYScpO1xuXG4vLyB4b3IxMjgsIGEgcHVyZSB4b3Itc2hpZnQgZ2VuZXJhdG9yIGJ5IEdlb3JnZSBNYXJzYWdsaWEuXG4vLyBQZXJpb2Q6IDJeMTI4LTEuXG4vLyBSZXBvcnRlZCB0byBmYWlsOiBNYXRyaXhSYW5rIGFuZCBMaW5lYXJDb21wLlxudmFyIHhvcjEyOCA9IHJlcXVpcmUoJy4vbGliL3hvcjEyOCcpO1xuXG4vLyB4b3J3b3csIEdlb3JnZSBNYXJzYWdsaWEncyAxNjAtYml0IHhvci1zaGlmdCBjb21iaW5lZCBwbHVzIHdleWwuXG4vLyBQZXJpb2Q6IDJeMTkyLTJeMzJcbi8vIFJlcG9ydGVkIHRvIGZhaWw6IENvbGxpc2lvbk92ZXIsIFNpbXBQb2tlciwgYW5kIExpbmVhckNvbXAuXG52YXIgeG9yd293ID0gcmVxdWlyZSgnLi9saWIveG9yd293Jyk7XG5cbi8vIHhvcnNoaWZ0NywgYnkgRnJhbsOnb2lzIFBhbm5ldG9uIGFuZCBQaWVycmUgTCdlY3V5ZXIsIHRha2VzXG4vLyBhIGRpZmZlcmVudCBhcHByb2FjaDogaXQgYWRkcyByb2J1c3RuZXNzIGJ5IGFsbG93aW5nIG1vcmUgc2hpZnRzXG4vLyB0aGFuIE1hcnNhZ2xpYSdzIG9yaWdpbmFsIHRocmVlLiAgSXQgaXMgYSA3LXNoaWZ0IGdlbmVyYXRvclxuLy8gd2l0aCAyNTYgYml0cywgdGhhdCBwYXNzZXMgQmlnQ3J1c2ggd2l0aCBubyBzeXN0bWF0aWMgZmFpbHVyZXMuXG4vLyBQZXJpb2QgMl4yNTYtMS5cbi8vIE5vIHN5c3RlbWF0aWMgQmlnQ3J1c2ggZmFpbHVyZXMgcmVwb3J0ZWQuXG52YXIgeG9yc2hpZnQ3ID0gcmVxdWlyZSgnLi9saWIveG9yc2hpZnQ3Jyk7XG5cbi8vIHhvcjQwOTYsIGJ5IFJpY2hhcmQgQnJlbnQsIGlzIGEgNDA5Ni1iaXQgeG9yLXNoaWZ0IHdpdGggYVxuLy8gdmVyeSBsb25nIHBlcmlvZCB0aGF0IGFsc28gYWRkcyBhIFdleWwgZ2VuZXJhdG9yLiBJdCBhbHNvIHBhc3Nlc1xuLy8gQmlnQ3J1c2ggd2l0aCBubyBzeXN0ZW1hdGljIGZhaWx1cmVzLiAgSXRzIGxvbmcgcGVyaW9kIG1heVxuLy8gYmUgdXNlZnVsIGlmIHlvdSBoYXZlIG1hbnkgZ2VuZXJhdG9ycyBhbmQgbmVlZCB0byBhdm9pZFxuLy8gY29sbGlzaW9ucy5cbi8vIFBlcmlvZDogMl40MTI4LTJeMzIuXG4vLyBObyBzeXN0ZW1hdGljIEJpZ0NydXNoIGZhaWx1cmVzIHJlcG9ydGVkLlxudmFyIHhvcjQwOTYgPSByZXF1aXJlKCcuL2xpYi94b3I0MDk2Jyk7XG5cbi8vIFR5Y2hlLWksIGJ5IFNhbXVlbCBOZXZlcyBhbmQgRmlsaXBlIEFyYXVqbywgaXMgYSBiaXQtc2hpZnRpbmcgcmFuZG9tXG4vLyBudW1iZXIgZ2VuZXJhdG9yIGRlcml2ZWQgZnJvbSBDaGFDaGEsIGEgbW9kZXJuIHN0cmVhbSBjaXBoZXIuXG4vLyBodHRwczovL2VkZW4uZGVpLnVjLnB0L35zbmV2ZXMvcHVicy8yMDExLXNuZmEyLnBkZlxuLy8gUGVyaW9kOiB+Ml4xMjdcbi8vIE5vIHN5c3RlbWF0aWMgQmlnQ3J1c2ggZmFpbHVyZXMgcmVwb3J0ZWQuXG52YXIgdHljaGVpID0gcmVxdWlyZSgnLi9saWIvdHljaGVpJyk7XG5cbi8vIFRoZSBvcmlnaW5hbCBBUkM0LWJhc2VkIHBybmcgaW5jbHVkZWQgaW4gdGhpcyBsaWJyYXJ5LlxuLy8gUGVyaW9kOiB+Ml4xNjAwXG52YXIgc3IgPSByZXF1aXJlKCcuL3NlZWRyYW5kb20nKTtcblxuc3IuYWxlYSA9IGFsZWE7XG5zci54b3IxMjggPSB4b3IxMjg7XG5zci54b3J3b3cgPSB4b3J3b3c7XG5zci54b3JzaGlmdDcgPSB4b3JzaGlmdDc7XG5zci54b3I0MDk2ID0geG9yNDA5NjtcbnNyLnR5Y2hlaSA9IHR5Y2hlaTtcblxubW9kdWxlLmV4cG9ydHMgPSBzcjtcbiIsIi8vIEEgcG9ydCBvZiBhbiBhbGdvcml0aG0gYnkgSm9oYW5uZXMgQmFhZ8O4ZSA8YmFhZ29lQGJhYWdvZS5jb20+LCAyMDEwXG4vLyBodHRwOi8vYmFhZ29lLmNvbS9lbi9SYW5kb21NdXNpbmdzL2phdmFzY3JpcHQvXG4vLyBodHRwczovL2dpdGh1Yi5jb20vbnF1aW5sYW4vYmV0dGVyLXJhbmRvbS1udW1iZXJzLWZvci1qYXZhc2NyaXB0LW1pcnJvclxuLy8gT3JpZ2luYWwgd29yayBpcyB1bmRlciBNSVQgbGljZW5zZSAtXG5cbi8vIENvcHlyaWdodCAoQykgMjAxMCBieSBKb2hhbm5lcyBCYWFnw7hlIDxiYWFnb2VAYmFhZ29lLm9yZz5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vLyBcbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vIFxuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cblxuXG4oZnVuY3Rpb24oZ2xvYmFsLCBtb2R1bGUsIGRlZmluZSkge1xuXG5mdW5jdGlvbiBBbGVhKHNlZWQpIHtcbiAgdmFyIG1lID0gdGhpcywgbWFzaCA9IE1hc2goKTtcblxuICBtZS5uZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHQgPSAyMDkxNjM5ICogbWUuczAgKyBtZS5jICogMi4zMjgzMDY0MzY1Mzg2OTYzZS0xMDsgLy8gMl4tMzJcbiAgICBtZS5zMCA9IG1lLnMxO1xuICAgIG1lLnMxID0gbWUuczI7XG4gICAgcmV0dXJuIG1lLnMyID0gdCAtIChtZS5jID0gdCB8IDApO1xuICB9O1xuXG4gIC8vIEFwcGx5IHRoZSBzZWVkaW5nIGFsZ29yaXRobSBmcm9tIEJhYWdvZS5cbiAgbWUuYyA9IDE7XG4gIG1lLnMwID0gbWFzaCgnICcpO1xuICBtZS5zMSA9IG1hc2goJyAnKTtcbiAgbWUuczIgPSBtYXNoKCcgJyk7XG4gIG1lLnMwIC09IG1hc2goc2VlZCk7XG4gIGlmIChtZS5zMCA8IDApIHsgbWUuczAgKz0gMTsgfVxuICBtZS5zMSAtPSBtYXNoKHNlZWQpO1xuICBpZiAobWUuczEgPCAwKSB7IG1lLnMxICs9IDE7IH1cbiAgbWUuczIgLT0gbWFzaChzZWVkKTtcbiAgaWYgKG1lLnMyIDwgMCkgeyBtZS5zMiArPSAxOyB9XG4gIG1hc2ggPSBudWxsO1xufVxuXG5mdW5jdGlvbiBjb3B5KGYsIHQpIHtcbiAgdC5jID0gZi5jO1xuICB0LnMwID0gZi5zMDtcbiAgdC5zMSA9IGYuczE7XG4gIHQuczIgPSBmLnMyO1xuICByZXR1cm4gdDtcbn1cblxuZnVuY3Rpb24gaW1wbChzZWVkLCBvcHRzKSB7XG4gIHZhciB4ZyA9IG5ldyBBbGVhKHNlZWQpLFxuICAgICAgc3RhdGUgPSBvcHRzICYmIG9wdHMuc3RhdGUsXG4gICAgICBwcm5nID0geGcubmV4dDtcbiAgcHJuZy5pbnQzMiA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gKHhnLm5leHQoKSAqIDB4MTAwMDAwMDAwKSB8IDA7IH1cbiAgcHJuZy5kb3VibGUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gcHJuZygpICsgKHBybmcoKSAqIDB4MjAwMDAwIHwgMCkgKiAxLjExMDIyMzAyNDYyNTE1NjVlLTE2OyAvLyAyXi01M1xuICB9O1xuICBwcm5nLnF1aWNrID0gcHJuZztcbiAgaWYgKHN0YXRlKSB7XG4gICAgaWYgKHR5cGVvZihzdGF0ZSkgPT0gJ29iamVjdCcpIGNvcHkoc3RhdGUsIHhnKTtcbiAgICBwcm5nLnN0YXRlID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb3B5KHhnLCB7fSk7IH1cbiAgfVxuICByZXR1cm4gcHJuZztcbn1cblxuZnVuY3Rpb24gTWFzaCgpIHtcbiAgdmFyIG4gPSAweGVmYzgyNDlkO1xuXG4gIHZhciBtYXNoID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIGRhdGEgPSBkYXRhLnRvU3RyaW5nKCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBuICs9IGRhdGEuY2hhckNvZGVBdChpKTtcbiAgICAgIHZhciBoID0gMC4wMjUxOTYwMzI4MjQxNjkzOCAqIG47XG4gICAgICBuID0gaCA+Pj4gMDtcbiAgICAgIGggLT0gbjtcbiAgICAgIGggKj0gbjtcbiAgICAgIG4gPSBoID4+PiAwO1xuICAgICAgaCAtPSBuO1xuICAgICAgbiArPSBoICogMHgxMDAwMDAwMDA7IC8vIDJeMzJcbiAgICB9XG4gICAgcmV0dXJuIChuID4+PiAwKSAqIDIuMzI4MzA2NDM2NTM4Njk2M2UtMTA7IC8vIDJeLTMyXG4gIH07XG5cbiAgcmV0dXJuIG1hc2g7XG59XG5cblxuaWYgKG1vZHVsZSAmJiBtb2R1bGUuZXhwb3J0cykge1xuICBtb2R1bGUuZXhwb3J0cyA9IGltcGw7XG59IGVsc2UgaWYgKGRlZmluZSAmJiBkZWZpbmUuYW1kKSB7XG4gIGRlZmluZShmdW5jdGlvbigpIHsgcmV0dXJuIGltcGw7IH0pO1xufSBlbHNlIHtcbiAgdGhpcy5hbGVhID0gaW1wbDtcbn1cblxufSkoXG4gIHRoaXMsXG4gICh0eXBlb2YgbW9kdWxlKSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUsICAgIC8vIHByZXNlbnQgaW4gbm9kZS5qc1xuICAodHlwZW9mIGRlZmluZSkgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUgICAvLyBwcmVzZW50IHdpdGggYW4gQU1EIGxvYWRlclxuKTtcblxuXG4iLCIvLyBBIEphdmFzY3JpcHQgaW1wbGVtZW50YWlvbiBvZiB0aGUgXCJUeWNoZS1pXCIgcHJuZyBhbGdvcml0aG0gYnlcbi8vIFNhbXVlbCBOZXZlcyBhbmQgRmlsaXBlIEFyYXVqby5cbi8vIFNlZSBodHRwczovL2VkZW4uZGVpLnVjLnB0L35zbmV2ZXMvcHVicy8yMDExLXNuZmEyLnBkZlxuXG4oZnVuY3Rpb24oZ2xvYmFsLCBtb2R1bGUsIGRlZmluZSkge1xuXG5mdW5jdGlvbiBYb3JHZW4oc2VlZCkge1xuICB2YXIgbWUgPSB0aGlzLCBzdHJzZWVkID0gJyc7XG5cbiAgLy8gU2V0IHVwIGdlbmVyYXRvciBmdW5jdGlvbi5cbiAgbWUubmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBiID0gbWUuYiwgYyA9IG1lLmMsIGQgPSBtZS5kLCBhID0gbWUuYTtcbiAgICBiID0gKGIgPDwgMjUpIF4gKGIgPj4+IDcpIF4gYztcbiAgICBjID0gKGMgLSBkKSB8IDA7XG4gICAgZCA9IChkIDw8IDI0KSBeIChkID4+PiA4KSBeIGE7XG4gICAgYSA9IChhIC0gYikgfCAwO1xuICAgIG1lLmIgPSBiID0gKGIgPDwgMjApIF4gKGIgPj4+IDEyKSBeIGM7XG4gICAgbWUuYyA9IGMgPSAoYyAtIGQpIHwgMDtcbiAgICBtZS5kID0gKGQgPDwgMTYpIF4gKGMgPj4+IDE2KSBeIGE7XG4gICAgcmV0dXJuIG1lLmEgPSAoYSAtIGIpIHwgMDtcbiAgfTtcblxuICAvKiBUaGUgZm9sbG93aW5nIGlzIG5vbi1pbnZlcnRlZCB0eWNoZSwgd2hpY2ggaGFzIGJldHRlciBpbnRlcm5hbFxuICAgKiBiaXQgZGlmZnVzaW9uLCBidXQgd2hpY2ggaXMgYWJvdXQgMjUlIHNsb3dlciB0aGFuIHR5Y2hlLWkgaW4gSlMuXG4gIG1lLm5leHQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYSA9IG1lLmEsIGIgPSBtZS5iLCBjID0gbWUuYywgZCA9IG1lLmQ7XG4gICAgYSA9IChtZS5hICsgbWUuYiB8IDApID4+PiAwO1xuICAgIGQgPSBtZS5kIF4gYTsgZCA9IGQgPDwgMTYgXiBkID4+PiAxNjtcbiAgICBjID0gbWUuYyArIGQgfCAwO1xuICAgIGIgPSBtZS5iIF4gYzsgYiA9IGIgPDwgMTIgXiBkID4+PiAyMDtcbiAgICBtZS5hID0gYSA9IGEgKyBiIHwgMDtcbiAgICBkID0gZCBeIGE7IG1lLmQgPSBkID0gZCA8PCA4IF4gZCA+Pj4gMjQ7XG4gICAgbWUuYyA9IGMgPSBjICsgZCB8IDA7XG4gICAgYiA9IGIgXiBjO1xuICAgIHJldHVybiBtZS5iID0gKGIgPDwgNyBeIGIgPj4+IDI1KTtcbiAgfVxuICAqL1xuXG4gIG1lLmEgPSAwO1xuICBtZS5iID0gMDtcbiAgbWUuYyA9IDI2NTQ0MzU3NjkgfCAwO1xuICBtZS5kID0gMTM2NzEzMDU1MTtcblxuICBpZiAoc2VlZCA9PT0gTWF0aC5mbG9vcihzZWVkKSkge1xuICAgIC8vIEludGVnZXIgc2VlZC5cbiAgICBtZS5hID0gKHNlZWQgLyAweDEwMDAwMDAwMCkgfCAwO1xuICAgIG1lLmIgPSBzZWVkIHwgMDtcbiAgfSBlbHNlIHtcbiAgICAvLyBTdHJpbmcgc2VlZC5cbiAgICBzdHJzZWVkICs9IHNlZWQ7XG4gIH1cblxuICAvLyBNaXggaW4gc3RyaW5nIHNlZWQsIHRoZW4gZGlzY2FyZCBhbiBpbml0aWFsIGJhdGNoIG9mIDY0IHZhbHVlcy5cbiAgZm9yICh2YXIgayA9IDA7IGsgPCBzdHJzZWVkLmxlbmd0aCArIDIwOyBrKyspIHtcbiAgICBtZS5iIF49IHN0cnNlZWQuY2hhckNvZGVBdChrKSB8IDA7XG4gICAgbWUubmV4dCgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNvcHkoZiwgdCkge1xuICB0LmEgPSBmLmE7XG4gIHQuYiA9IGYuYjtcbiAgdC5jID0gZi5jO1xuICB0LmQgPSBmLmQ7XG4gIHJldHVybiB0O1xufTtcblxuZnVuY3Rpb24gaW1wbChzZWVkLCBvcHRzKSB7XG4gIHZhciB4ZyA9IG5ldyBYb3JHZW4oc2VlZCksXG4gICAgICBzdGF0ZSA9IG9wdHMgJiYgb3B0cy5zdGF0ZSxcbiAgICAgIHBybmcgPSBmdW5jdGlvbigpIHsgcmV0dXJuICh4Zy5uZXh0KCkgPj4+IDApIC8gMHgxMDAwMDAwMDA7IH07XG4gIHBybmcuZG91YmxlID0gZnVuY3Rpb24oKSB7XG4gICAgZG8ge1xuICAgICAgdmFyIHRvcCA9IHhnLm5leHQoKSA+Pj4gMTEsXG4gICAgICAgICAgYm90ID0gKHhnLm5leHQoKSA+Pj4gMCkgLyAweDEwMDAwMDAwMCxcbiAgICAgICAgICByZXN1bHQgPSAodG9wICsgYm90KSAvICgxIDw8IDIxKTtcbiAgICB9IHdoaWxlIChyZXN1bHQgPT09IDApO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIHBybmcuaW50MzIgPSB4Zy5uZXh0O1xuICBwcm5nLnF1aWNrID0gcHJuZztcbiAgaWYgKHN0YXRlKSB7XG4gICAgaWYgKHR5cGVvZihzdGF0ZSkgPT0gJ29iamVjdCcpIGNvcHkoc3RhdGUsIHhnKTtcbiAgICBwcm5nLnN0YXRlID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb3B5KHhnLCB7fSk7IH1cbiAgfVxuICByZXR1cm4gcHJuZztcbn1cblxuaWYgKG1vZHVsZSAmJiBtb2R1bGUuZXhwb3J0cykge1xuICBtb2R1bGUuZXhwb3J0cyA9IGltcGw7XG59IGVsc2UgaWYgKGRlZmluZSAmJiBkZWZpbmUuYW1kKSB7XG4gIGRlZmluZShmdW5jdGlvbigpIHsgcmV0dXJuIGltcGw7IH0pO1xufSBlbHNlIHtcbiAgdGhpcy50eWNoZWkgPSBpbXBsO1xufVxuXG59KShcbiAgdGhpcyxcbiAgKHR5cGVvZiBtb2R1bGUpID09ICdvYmplY3QnICYmIG1vZHVsZSwgICAgLy8gcHJlc2VudCBpbiBub2RlLmpzXG4gICh0eXBlb2YgZGVmaW5lKSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZSAgIC8vIHByZXNlbnQgd2l0aCBhbiBBTUQgbG9hZGVyXG4pO1xuXG5cbiIsIi8vIEEgSmF2YXNjcmlwdCBpbXBsZW1lbnRhaW9uIG9mIHRoZSBcInhvcjEyOFwiIHBybmcgYWxnb3JpdGhtIGJ5XG4vLyBHZW9yZ2UgTWFyc2FnbGlhLiAgU2VlIGh0dHA6Ly93d3cuanN0YXRzb2Z0Lm9yZy92MDgvaTE0L3BhcGVyXG5cbihmdW5jdGlvbihnbG9iYWwsIG1vZHVsZSwgZGVmaW5lKSB7XG5cbmZ1bmN0aW9uIFhvckdlbihzZWVkKSB7XG4gIHZhciBtZSA9IHRoaXMsIHN0cnNlZWQgPSAnJztcblxuICBtZS54ID0gMDtcbiAgbWUueSA9IDA7XG4gIG1lLnogPSAwO1xuICBtZS53ID0gMDtcblxuICAvLyBTZXQgdXAgZ2VuZXJhdG9yIGZ1bmN0aW9uLlxuICBtZS5uZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHQgPSBtZS54IF4gKG1lLnggPDwgMTEpO1xuICAgIG1lLnggPSBtZS55O1xuICAgIG1lLnkgPSBtZS56O1xuICAgIG1lLnogPSBtZS53O1xuICAgIHJldHVybiBtZS53IF49IChtZS53ID4+PiAxOSkgXiB0IF4gKHQgPj4+IDgpO1xuICB9O1xuXG4gIGlmIChzZWVkID09PSAoc2VlZCB8IDApKSB7XG4gICAgLy8gSW50ZWdlciBzZWVkLlxuICAgIG1lLnggPSBzZWVkO1xuICB9IGVsc2Uge1xuICAgIC8vIFN0cmluZyBzZWVkLlxuICAgIHN0cnNlZWQgKz0gc2VlZDtcbiAgfVxuXG4gIC8vIE1peCBpbiBzdHJpbmcgc2VlZCwgdGhlbiBkaXNjYXJkIGFuIGluaXRpYWwgYmF0Y2ggb2YgNjQgdmFsdWVzLlxuICBmb3IgKHZhciBrID0gMDsgayA8IHN0cnNlZWQubGVuZ3RoICsgNjQ7IGsrKykge1xuICAgIG1lLnggXj0gc3Ryc2VlZC5jaGFyQ29kZUF0KGspIHwgMDtcbiAgICBtZS5uZXh0KCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY29weShmLCB0KSB7XG4gIHQueCA9IGYueDtcbiAgdC55ID0gZi55O1xuICB0LnogPSBmLno7XG4gIHQudyA9IGYudztcbiAgcmV0dXJuIHQ7XG59XG5cbmZ1bmN0aW9uIGltcGwoc2VlZCwgb3B0cykge1xuICB2YXIgeGcgPSBuZXcgWG9yR2VuKHNlZWQpLFxuICAgICAgc3RhdGUgPSBvcHRzICYmIG9wdHMuc3RhdGUsXG4gICAgICBwcm5nID0gZnVuY3Rpb24oKSB7IHJldHVybiAoeGcubmV4dCgpID4+PiAwKSAvIDB4MTAwMDAwMDAwOyB9O1xuICBwcm5nLmRvdWJsZSA9IGZ1bmN0aW9uKCkge1xuICAgIGRvIHtcbiAgICAgIHZhciB0b3AgPSB4Zy5uZXh0KCkgPj4+IDExLFxuICAgICAgICAgIGJvdCA9ICh4Zy5uZXh0KCkgPj4+IDApIC8gMHgxMDAwMDAwMDAsXG4gICAgICAgICAgcmVzdWx0ID0gKHRvcCArIGJvdCkgLyAoMSA8PCAyMSk7XG4gICAgfSB3aGlsZSAocmVzdWx0ID09PSAwKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICBwcm5nLmludDMyID0geGcubmV4dDtcbiAgcHJuZy5xdWljayA9IHBybmc7XG4gIGlmIChzdGF0ZSkge1xuICAgIGlmICh0eXBlb2Yoc3RhdGUpID09ICdvYmplY3QnKSBjb3B5KHN0YXRlLCB4Zyk7XG4gICAgcHJuZy5zdGF0ZSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29weSh4Zywge30pOyB9XG4gIH1cbiAgcmV0dXJuIHBybmc7XG59XG5cbmlmIChtb2R1bGUgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBpbXBsO1xufSBlbHNlIGlmIChkZWZpbmUgJiYgZGVmaW5lLmFtZCkge1xuICBkZWZpbmUoZnVuY3Rpb24oKSB7IHJldHVybiBpbXBsOyB9KTtcbn0gZWxzZSB7XG4gIHRoaXMueG9yMTI4ID0gaW1wbDtcbn1cblxufSkoXG4gIHRoaXMsXG4gICh0eXBlb2YgbW9kdWxlKSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUsICAgIC8vIHByZXNlbnQgaW4gbm9kZS5qc1xuICAodHlwZW9mIGRlZmluZSkgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUgICAvLyBwcmVzZW50IHdpdGggYW4gQU1EIGxvYWRlclxuKTtcblxuXG4iLCIvLyBBIEphdmFzY3JpcHQgaW1wbGVtZW50YWlvbiBvZiBSaWNoYXJkIEJyZW50J3MgWG9yZ2VucyB4b3I0MDk2IGFsZ29yaXRobS5cbi8vXG4vLyBUaGlzIGZhc3Qgbm9uLWNyeXB0b2dyYXBoaWMgcmFuZG9tIG51bWJlciBnZW5lcmF0b3IgaXMgZGVzaWduZWQgZm9yXG4vLyB1c2UgaW4gTW9udGUtQ2FybG8gYWxnb3JpdGhtcy4gSXQgY29tYmluZXMgYSBsb25nLXBlcmlvZCB4b3JzaGlmdFxuLy8gZ2VuZXJhdG9yIHdpdGggYSBXZXlsIGdlbmVyYXRvciwgYW5kIGl0IHBhc3NlcyBhbGwgY29tbW9uIGJhdHRlcmllc1xuLy8gb2Ygc3Rhc3RpY2lhbCB0ZXN0cyBmb3IgcmFuZG9tbmVzcyB3aGlsZSBjb25zdW1pbmcgb25seSBhIGZldyBuYW5vc2Vjb25kc1xuLy8gZm9yIGVhY2ggcHJuZyBnZW5lcmF0ZWQuICBGb3IgYmFja2dyb3VuZCBvbiB0aGUgZ2VuZXJhdG9yLCBzZWUgQnJlbnQnc1xuLy8gcGFwZXI6IFwiU29tZSBsb25nLXBlcmlvZCByYW5kb20gbnVtYmVyIGdlbmVyYXRvcnMgdXNpbmcgc2hpZnRzIGFuZCB4b3JzLlwiXG4vLyBodHRwOi8vYXJ4aXYub3JnL3BkZi8xMDA0LjMxMTV2MS5wZGZcbi8vXG4vLyBVc2FnZTpcbi8vXG4vLyB2YXIgeG9yNDA5NiA9IHJlcXVpcmUoJ3hvcjQwOTYnKTtcbi8vIHJhbmRvbSA9IHhvcjQwOTYoMSk7ICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2VlZCB3aXRoIGludDMyIG9yIHN0cmluZy5cbi8vIGFzc2VydC5lcXVhbChyYW5kb20oKSwgMC4xNTIwNDM2NDUwNTM4NTQ3KTsgLy8gKDAsIDEpIHJhbmdlLCA1MyBiaXRzLlxuLy8gYXNzZXJ0LmVxdWFsKHJhbmRvbS5pbnQzMigpLCAxODA2NTM0ODk3KTsgICAvLyBzaWduZWQgaW50MzIsIDMyIGJpdHMuXG4vL1xuLy8gRm9yIG5vbnplcm8gbnVtZXJpYyBrZXlzLCB0aGlzIGltcGVsZW1lbnRhdGlvbiBwcm92aWRlcyBhIHNlcXVlbmNlXG4vLyBpZGVudGljYWwgdG8gdGhhdCBieSBCcmVudCdzIHhvcmdlbnMgMyBpbXBsZW1lbnRhaW9uIGluIEMuICBUaGlzXG4vLyBpbXBsZW1lbnRhdGlvbiBhbHNvIHByb3ZpZGVzIGZvciBpbml0YWxpemluZyB0aGUgZ2VuZXJhdG9yIHdpdGhcbi8vIHN0cmluZyBzZWVkcywgb3IgZm9yIHNhdmluZyBhbmQgcmVzdG9yaW5nIHRoZSBzdGF0ZSBvZiB0aGUgZ2VuZXJhdG9yLlxuLy9cbi8vIE9uIENocm9tZSwgdGhpcyBwcm5nIGJlbmNobWFya3MgYWJvdXQgMi4xIHRpbWVzIHNsb3dlciB0aGFuXG4vLyBKYXZhc2NyaXB0J3MgYnVpbHQtaW4gTWF0aC5yYW5kb20oKS5cblxuKGZ1bmN0aW9uKGdsb2JhbCwgbW9kdWxlLCBkZWZpbmUpIHtcblxuZnVuY3Rpb24gWG9yR2VuKHNlZWQpIHtcbiAgdmFyIG1lID0gdGhpcztcblxuICAvLyBTZXQgdXAgZ2VuZXJhdG9yIGZ1bmN0aW9uLlxuICBtZS5uZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHcgPSBtZS53LFxuICAgICAgICBYID0gbWUuWCwgaSA9IG1lLmksIHQsIHY7XG4gICAgLy8gVXBkYXRlIFdleWwgZ2VuZXJhdG9yLlxuICAgIG1lLncgPSB3ID0gKHcgKyAweDYxYzg4NjQ3KSB8IDA7XG4gICAgLy8gVXBkYXRlIHhvciBnZW5lcmF0b3IuXG4gICAgdiA9IFhbKGkgKyAzNCkgJiAxMjddO1xuICAgIHQgPSBYW2kgPSAoKGkgKyAxKSAmIDEyNyldO1xuICAgIHYgXj0gdiA8PCAxMztcbiAgICB0IF49IHQgPDwgMTc7XG4gICAgdiBePSB2ID4+PiAxNTtcbiAgICB0IF49IHQgPj4+IDEyO1xuICAgIC8vIFVwZGF0ZSBYb3IgZ2VuZXJhdG9yIGFycmF5IHN0YXRlLlxuICAgIHYgPSBYW2ldID0gdiBeIHQ7XG4gICAgbWUuaSA9IGk7XG4gICAgLy8gUmVzdWx0IGlzIHRoZSBjb21iaW5hdGlvbi5cbiAgICByZXR1cm4gKHYgKyAodyBeICh3ID4+PiAxNikpKSB8IDA7XG4gIH07XG5cbiAgZnVuY3Rpb24gaW5pdChtZSwgc2VlZCkge1xuICAgIHZhciB0LCB2LCBpLCBqLCB3LCBYID0gW10sIGxpbWl0ID0gMTI4O1xuICAgIGlmIChzZWVkID09PSAoc2VlZCB8IDApKSB7XG4gICAgICAvLyBOdW1lcmljIHNlZWRzIGluaXRpYWxpemUgdiwgd2hpY2ggaXMgdXNlZCB0byBnZW5lcmF0ZXMgWC5cbiAgICAgIHYgPSBzZWVkO1xuICAgICAgc2VlZCA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFN0cmluZyBzZWVkcyBhcmUgbWl4ZWQgaW50byB2IGFuZCBYIG9uZSBjaGFyYWN0ZXIgYXQgYSB0aW1lLlxuICAgICAgc2VlZCA9IHNlZWQgKyAnXFwwJztcbiAgICAgIHYgPSAwO1xuICAgICAgbGltaXQgPSBNYXRoLm1heChsaW1pdCwgc2VlZC5sZW5ndGgpO1xuICAgIH1cbiAgICAvLyBJbml0aWFsaXplIGNpcmN1bGFyIGFycmF5IGFuZCB3ZXlsIHZhbHVlLlxuICAgIGZvciAoaSA9IDAsIGogPSAtMzI7IGogPCBsaW1pdDsgKytqKSB7XG4gICAgICAvLyBQdXQgdGhlIHVuaWNvZGUgY2hhcmFjdGVycyBpbnRvIHRoZSBhcnJheSwgYW5kIHNodWZmbGUgdGhlbS5cbiAgICAgIGlmIChzZWVkKSB2IF49IHNlZWQuY2hhckNvZGVBdCgoaiArIDMyKSAlIHNlZWQubGVuZ3RoKTtcbiAgICAgIC8vIEFmdGVyIDMyIHNodWZmbGVzLCB0YWtlIHYgYXMgdGhlIHN0YXJ0aW5nIHcgdmFsdWUuXG4gICAgICBpZiAoaiA9PT0gMCkgdyA9IHY7XG4gICAgICB2IF49IHYgPDwgMTA7XG4gICAgICB2IF49IHYgPj4+IDE1O1xuICAgICAgdiBePSB2IDw8IDQ7XG4gICAgICB2IF49IHYgPj4+IDEzO1xuICAgICAgaWYgKGogPj0gMCkge1xuICAgICAgICB3ID0gKHcgKyAweDYxYzg4NjQ3KSB8IDA7ICAgICAvLyBXZXlsLlxuICAgICAgICB0ID0gKFhbaiAmIDEyN10gXj0gKHYgKyB3KSk7ICAvLyBDb21iaW5lIHhvciBhbmQgd2V5bCB0byBpbml0IGFycmF5LlxuICAgICAgICBpID0gKDAgPT0gdCkgPyBpICsgMSA6IDA7ICAgICAvLyBDb3VudCB6ZXJvZXMuXG4gICAgICB9XG4gICAgfVxuICAgIC8vIFdlIGhhdmUgZGV0ZWN0ZWQgYWxsIHplcm9lczsgbWFrZSB0aGUga2V5IG5vbnplcm8uXG4gICAgaWYgKGkgPj0gMTI4KSB7XG4gICAgICBYWyhzZWVkICYmIHNlZWQubGVuZ3RoIHx8IDApICYgMTI3XSA9IC0xO1xuICAgIH1cbiAgICAvLyBSdW4gdGhlIGdlbmVyYXRvciA1MTIgdGltZXMgdG8gZnVydGhlciBtaXggdGhlIHN0YXRlIGJlZm9yZSB1c2luZyBpdC5cbiAgICAvLyBGYWN0b3JpbmcgdGhpcyBhcyBhIGZ1bmN0aW9uIHNsb3dzIHRoZSBtYWluIGdlbmVyYXRvciwgc28gaXQgaXMganVzdFxuICAgIC8vIHVucm9sbGVkIGhlcmUuICBUaGUgd2V5bCBnZW5lcmF0b3IgaXMgbm90IGFkdmFuY2VkIHdoaWxlIHdhcm1pbmcgdXAuXG4gICAgaSA9IDEyNztcbiAgICBmb3IgKGogPSA0ICogMTI4OyBqID4gMDsgLS1qKSB7XG4gICAgICB2ID0gWFsoaSArIDM0KSAmIDEyN107XG4gICAgICB0ID0gWFtpID0gKChpICsgMSkgJiAxMjcpXTtcbiAgICAgIHYgXj0gdiA8PCAxMztcbiAgICAgIHQgXj0gdCA8PCAxNztcbiAgICAgIHYgXj0gdiA+Pj4gMTU7XG4gICAgICB0IF49IHQgPj4+IDEyO1xuICAgICAgWFtpXSA9IHYgXiB0O1xuICAgIH1cbiAgICAvLyBTdG9yaW5nIHN0YXRlIGFzIG9iamVjdCBtZW1iZXJzIGlzIGZhc3RlciB0aGFuIHVzaW5nIGNsb3N1cmUgdmFyaWFibGVzLlxuICAgIG1lLncgPSB3O1xuICAgIG1lLlggPSBYO1xuICAgIG1lLmkgPSBpO1xuICB9XG5cbiAgaW5pdChtZSwgc2VlZCk7XG59XG5cbmZ1bmN0aW9uIGNvcHkoZiwgdCkge1xuICB0LmkgPSBmLmk7XG4gIHQudyA9IGYudztcbiAgdC5YID0gZi5YLnNsaWNlKCk7XG4gIHJldHVybiB0O1xufTtcblxuZnVuY3Rpb24gaW1wbChzZWVkLCBvcHRzKSB7XG4gIGlmIChzZWVkID09IG51bGwpIHNlZWQgPSArKG5ldyBEYXRlKTtcbiAgdmFyIHhnID0gbmV3IFhvckdlbihzZWVkKSxcbiAgICAgIHN0YXRlID0gb3B0cyAmJiBvcHRzLnN0YXRlLFxuICAgICAgcHJuZyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gKHhnLm5leHQoKSA+Pj4gMCkgLyAweDEwMDAwMDAwMDsgfTtcbiAgcHJuZy5kb3VibGUgPSBmdW5jdGlvbigpIHtcbiAgICBkbyB7XG4gICAgICB2YXIgdG9wID0geGcubmV4dCgpID4+PiAxMSxcbiAgICAgICAgICBib3QgPSAoeGcubmV4dCgpID4+PiAwKSAvIDB4MTAwMDAwMDAwLFxuICAgICAgICAgIHJlc3VsdCA9ICh0b3AgKyBib3QpIC8gKDEgPDwgMjEpO1xuICAgIH0gd2hpbGUgKHJlc3VsdCA9PT0gMCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbiAgcHJuZy5pbnQzMiA9IHhnLm5leHQ7XG4gIHBybmcucXVpY2sgPSBwcm5nO1xuICBpZiAoc3RhdGUpIHtcbiAgICBpZiAoc3RhdGUuWCkgY29weShzdGF0ZSwgeGcpO1xuICAgIHBybmcuc3RhdGUgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvcHkoeGcsIHt9KTsgfVxuICB9XG4gIHJldHVybiBwcm5nO1xufVxuXG5pZiAobW9kdWxlICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gaW1wbDtcbn0gZWxzZSBpZiAoZGVmaW5lICYmIGRlZmluZS5hbWQpIHtcbiAgZGVmaW5lKGZ1bmN0aW9uKCkgeyByZXR1cm4gaW1wbDsgfSk7XG59IGVsc2Uge1xuICB0aGlzLnhvcjQwOTYgPSBpbXBsO1xufVxuXG59KShcbiAgdGhpcywgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2luZG93IG9iamVjdCBvciBnbG9iYWxcbiAgKHR5cGVvZiBtb2R1bGUpID09ICdvYmplY3QnICYmIG1vZHVsZSwgICAgLy8gcHJlc2VudCBpbiBub2RlLmpzXG4gICh0eXBlb2YgZGVmaW5lKSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZSAgIC8vIHByZXNlbnQgd2l0aCBhbiBBTUQgbG9hZGVyXG4pO1xuIiwiLy8gQSBKYXZhc2NyaXB0IGltcGxlbWVudGFpb24gb2YgdGhlIFwieG9yc2hpZnQ3XCIgYWxnb3JpdGhtIGJ5XG4vLyBGcmFuw6dvaXMgUGFubmV0b24gYW5kIFBpZXJyZSBMJ2VjdXllcjpcbi8vIFwiT24gdGhlIFhvcmdzaGlmdCBSYW5kb20gTnVtYmVyIEdlbmVyYXRvcnNcIlxuLy8gaHR0cDovL3NhbHVjLmVuZ3IudWNvbm4uZWR1L3JlZnMvY3J5cHRvL3JuZy9wYW5uZXRvbjA1b250aGV4b3JzaGlmdC5wZGZcblxuKGZ1bmN0aW9uKGdsb2JhbCwgbW9kdWxlLCBkZWZpbmUpIHtcblxuZnVuY3Rpb24gWG9yR2VuKHNlZWQpIHtcbiAgdmFyIG1lID0gdGhpcztcblxuICAvLyBTZXQgdXAgZ2VuZXJhdG9yIGZ1bmN0aW9uLlxuICBtZS5uZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gVXBkYXRlIHhvciBnZW5lcmF0b3IuXG4gICAgdmFyIFggPSBtZS54LCBpID0gbWUuaSwgdCwgdiwgdztcbiAgICB0ID0gWFtpXTsgdCBePSAodCA+Pj4gNyk7IHYgPSB0IF4gKHQgPDwgMjQpO1xuICAgIHQgPSBYWyhpICsgMSkgJiA3XTsgdiBePSB0IF4gKHQgPj4+IDEwKTtcbiAgICB0ID0gWFsoaSArIDMpICYgN107IHYgXj0gdCBeICh0ID4+PiAzKTtcbiAgICB0ID0gWFsoaSArIDQpICYgN107IHYgXj0gdCBeICh0IDw8IDcpO1xuICAgIHQgPSBYWyhpICsgNykgJiA3XTsgdCA9IHQgXiAodCA8PCAxMyk7IHYgXj0gdCBeICh0IDw8IDkpO1xuICAgIFhbaV0gPSB2O1xuICAgIG1lLmkgPSAoaSArIDEpICYgNztcbiAgICByZXR1cm4gdjtcbiAgfTtcblxuICBmdW5jdGlvbiBpbml0KG1lLCBzZWVkKSB7XG4gICAgdmFyIGosIHcsIFggPSBbXTtcblxuICAgIGlmIChzZWVkID09PSAoc2VlZCB8IDApKSB7XG4gICAgICAvLyBTZWVkIHN0YXRlIGFycmF5IHVzaW5nIGEgMzItYml0IGludGVnZXIuXG4gICAgICB3ID0gWFswXSA9IHNlZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNlZWQgc3RhdGUgdXNpbmcgYSBzdHJpbmcuXG4gICAgICBzZWVkID0gJycgKyBzZWVkO1xuICAgICAgZm9yIChqID0gMDsgaiA8IHNlZWQubGVuZ3RoOyArK2opIHtcbiAgICAgICAgWFtqICYgN10gPSAoWFtqICYgN10gPDwgMTUpIF5cbiAgICAgICAgICAgIChzZWVkLmNoYXJDb2RlQXQoaikgKyBYWyhqICsgMSkgJiA3XSA8PCAxMyk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIEVuZm9yY2UgYW4gYXJyYXkgbGVuZ3RoIG9mIDgsIG5vdCBhbGwgemVyb2VzLlxuICAgIHdoaWxlIChYLmxlbmd0aCA8IDgpIFgucHVzaCgwKTtcbiAgICBmb3IgKGogPSAwOyBqIDwgOCAmJiBYW2pdID09PSAwOyArK2opO1xuICAgIGlmIChqID09IDgpIHcgPSBYWzddID0gLTE7IGVsc2UgdyA9IFhbal07XG5cbiAgICBtZS54ID0gWDtcbiAgICBtZS5pID0gMDtcblxuICAgIC8vIERpc2NhcmQgYW4gaW5pdGlhbCAyNTYgdmFsdWVzLlxuICAgIGZvciAoaiA9IDI1NjsgaiA+IDA7IC0taikge1xuICAgICAgbWUubmV4dCgpO1xuICAgIH1cbiAgfVxuXG4gIGluaXQobWUsIHNlZWQpO1xufVxuXG5mdW5jdGlvbiBjb3B5KGYsIHQpIHtcbiAgdC54ID0gZi54LnNsaWNlKCk7XG4gIHQuaSA9IGYuaTtcbiAgcmV0dXJuIHQ7XG59XG5cbmZ1bmN0aW9uIGltcGwoc2VlZCwgb3B0cykge1xuICBpZiAoc2VlZCA9PSBudWxsKSBzZWVkID0gKyhuZXcgRGF0ZSk7XG4gIHZhciB4ZyA9IG5ldyBYb3JHZW4oc2VlZCksXG4gICAgICBzdGF0ZSA9IG9wdHMgJiYgb3B0cy5zdGF0ZSxcbiAgICAgIHBybmcgPSBmdW5jdGlvbigpIHsgcmV0dXJuICh4Zy5uZXh0KCkgPj4+IDApIC8gMHgxMDAwMDAwMDA7IH07XG4gIHBybmcuZG91YmxlID0gZnVuY3Rpb24oKSB7XG4gICAgZG8ge1xuICAgICAgdmFyIHRvcCA9IHhnLm5leHQoKSA+Pj4gMTEsXG4gICAgICAgICAgYm90ID0gKHhnLm5leHQoKSA+Pj4gMCkgLyAweDEwMDAwMDAwMCxcbiAgICAgICAgICByZXN1bHQgPSAodG9wICsgYm90KSAvICgxIDw8IDIxKTtcbiAgICB9IHdoaWxlIChyZXN1bHQgPT09IDApO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIHBybmcuaW50MzIgPSB4Zy5uZXh0O1xuICBwcm5nLnF1aWNrID0gcHJuZztcbiAgaWYgKHN0YXRlKSB7XG4gICAgaWYgKHN0YXRlLngpIGNvcHkoc3RhdGUsIHhnKTtcbiAgICBwcm5nLnN0YXRlID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb3B5KHhnLCB7fSk7IH1cbiAgfVxuICByZXR1cm4gcHJuZztcbn1cblxuaWYgKG1vZHVsZSAmJiBtb2R1bGUuZXhwb3J0cykge1xuICBtb2R1bGUuZXhwb3J0cyA9IGltcGw7XG59IGVsc2UgaWYgKGRlZmluZSAmJiBkZWZpbmUuYW1kKSB7XG4gIGRlZmluZShmdW5jdGlvbigpIHsgcmV0dXJuIGltcGw7IH0pO1xufSBlbHNlIHtcbiAgdGhpcy54b3JzaGlmdDcgPSBpbXBsO1xufVxuXG59KShcbiAgdGhpcyxcbiAgKHR5cGVvZiBtb2R1bGUpID09ICdvYmplY3QnICYmIG1vZHVsZSwgICAgLy8gcHJlc2VudCBpbiBub2RlLmpzXG4gICh0eXBlb2YgZGVmaW5lKSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZSAgIC8vIHByZXNlbnQgd2l0aCBhbiBBTUQgbG9hZGVyXG4pO1xuXG4iLCIvLyBBIEphdmFzY3JpcHQgaW1wbGVtZW50YWlvbiBvZiB0aGUgXCJ4b3J3b3dcIiBwcm5nIGFsZ29yaXRobSBieVxuLy8gR2VvcmdlIE1hcnNhZ2xpYS4gIFNlZSBodHRwOi8vd3d3LmpzdGF0c29mdC5vcmcvdjA4L2kxNC9wYXBlclxuXG4oZnVuY3Rpb24oZ2xvYmFsLCBtb2R1bGUsIGRlZmluZSkge1xuXG5mdW5jdGlvbiBYb3JHZW4oc2VlZCkge1xuICB2YXIgbWUgPSB0aGlzLCBzdHJzZWVkID0gJyc7XG5cbiAgLy8gU2V0IHVwIGdlbmVyYXRvciBmdW5jdGlvbi5cbiAgbWUubmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB0ID0gKG1lLnggXiAobWUueCA+Pj4gMikpO1xuICAgIG1lLnggPSBtZS55OyBtZS55ID0gbWUuejsgbWUueiA9IG1lLnc7IG1lLncgPSBtZS52O1xuICAgIHJldHVybiAobWUuZCA9IChtZS5kICsgMzYyNDM3IHwgMCkpICtcbiAgICAgICAobWUudiA9IChtZS52IF4gKG1lLnYgPDwgNCkpIF4gKHQgXiAodCA8PCAxKSkpIHwgMDtcbiAgfTtcblxuICBtZS54ID0gMDtcbiAgbWUueSA9IDA7XG4gIG1lLnogPSAwO1xuICBtZS53ID0gMDtcbiAgbWUudiA9IDA7XG5cbiAgaWYgKHNlZWQgPT09IChzZWVkIHwgMCkpIHtcbiAgICAvLyBJbnRlZ2VyIHNlZWQuXG4gICAgbWUueCA9IHNlZWQ7XG4gIH0gZWxzZSB7XG4gICAgLy8gU3RyaW5nIHNlZWQuXG4gICAgc3Ryc2VlZCArPSBzZWVkO1xuICB9XG5cbiAgLy8gTWl4IGluIHN0cmluZyBzZWVkLCB0aGVuIGRpc2NhcmQgYW4gaW5pdGlhbCBiYXRjaCBvZiA2NCB2YWx1ZXMuXG4gIGZvciAodmFyIGsgPSAwOyBrIDwgc3Ryc2VlZC5sZW5ndGggKyA2NDsgaysrKSB7XG4gICAgbWUueCBePSBzdHJzZWVkLmNoYXJDb2RlQXQoaykgfCAwO1xuICAgIGlmIChrID09IHN0cnNlZWQubGVuZ3RoKSB7XG4gICAgICBtZS5kID0gbWUueCA8PCAxMCBeIG1lLnggPj4+IDQ7XG4gICAgfVxuICAgIG1lLm5leHQoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjb3B5KGYsIHQpIHtcbiAgdC54ID0gZi54O1xuICB0LnkgPSBmLnk7XG4gIHQueiA9IGYuejtcbiAgdC53ID0gZi53O1xuICB0LnYgPSBmLnY7XG4gIHQuZCA9IGYuZDtcbiAgcmV0dXJuIHQ7XG59XG5cbmZ1bmN0aW9uIGltcGwoc2VlZCwgb3B0cykge1xuICB2YXIgeGcgPSBuZXcgWG9yR2VuKHNlZWQpLFxuICAgICAgc3RhdGUgPSBvcHRzICYmIG9wdHMuc3RhdGUsXG4gICAgICBwcm5nID0gZnVuY3Rpb24oKSB7IHJldHVybiAoeGcubmV4dCgpID4+PiAwKSAvIDB4MTAwMDAwMDAwOyB9O1xuICBwcm5nLmRvdWJsZSA9IGZ1bmN0aW9uKCkge1xuICAgIGRvIHtcbiAgICAgIHZhciB0b3AgPSB4Zy5uZXh0KCkgPj4+IDExLFxuICAgICAgICAgIGJvdCA9ICh4Zy5uZXh0KCkgPj4+IDApIC8gMHgxMDAwMDAwMDAsXG4gICAgICAgICAgcmVzdWx0ID0gKHRvcCArIGJvdCkgLyAoMSA8PCAyMSk7XG4gICAgfSB3aGlsZSAocmVzdWx0ID09PSAwKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICBwcm5nLmludDMyID0geGcubmV4dDtcbiAgcHJuZy5xdWljayA9IHBybmc7XG4gIGlmIChzdGF0ZSkge1xuICAgIGlmICh0eXBlb2Yoc3RhdGUpID09ICdvYmplY3QnKSBjb3B5KHN0YXRlLCB4Zyk7XG4gICAgcHJuZy5zdGF0ZSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29weSh4Zywge30pOyB9XG4gIH1cbiAgcmV0dXJuIHBybmc7XG59XG5cbmlmIChtb2R1bGUgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBpbXBsO1xufSBlbHNlIGlmIChkZWZpbmUgJiYgZGVmaW5lLmFtZCkge1xuICBkZWZpbmUoZnVuY3Rpb24oKSB7IHJldHVybiBpbXBsOyB9KTtcbn0gZWxzZSB7XG4gIHRoaXMueG9yd293ID0gaW1wbDtcbn1cblxufSkoXG4gIHRoaXMsXG4gICh0eXBlb2YgbW9kdWxlKSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUsICAgIC8vIHByZXNlbnQgaW4gbm9kZS5qc1xuICAodHlwZW9mIGRlZmluZSkgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUgICAvLyBwcmVzZW50IHdpdGggYW4gQU1EIGxvYWRlclxuKTtcblxuXG4iLCIvKlxuQ29weXJpZ2h0IDIwMTQgRGF2aWQgQmF1LlxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmdcbmEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG53aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG5kaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG9cbnBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0b1xudGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxuaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsXG5FWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbk1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC5cbklOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZXG5DTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULFxuVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEVcblNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4qL1xuXG4oZnVuY3Rpb24gKHBvb2wsIG1hdGgpIHtcbi8vXG4vLyBUaGUgZm9sbG93aW5nIGNvbnN0YW50cyBhcmUgcmVsYXRlZCB0byBJRUVFIDc1NCBsaW1pdHMuXG4vL1xudmFyIGdsb2JhbCA9IHRoaXMsXG4gICAgd2lkdGggPSAyNTYsICAgICAgICAvLyBlYWNoIFJDNCBvdXRwdXQgaXMgMCA8PSB4IDwgMjU2XG4gICAgY2h1bmtzID0gNiwgICAgICAgICAvLyBhdCBsZWFzdCBzaXggUkM0IG91dHB1dHMgZm9yIGVhY2ggZG91YmxlXG4gICAgZGlnaXRzID0gNTIsICAgICAgICAvLyB0aGVyZSBhcmUgNTIgc2lnbmlmaWNhbnQgZGlnaXRzIGluIGEgZG91YmxlXG4gICAgcm5nbmFtZSA9ICdyYW5kb20nLCAvLyBybmduYW1lOiBuYW1lIGZvciBNYXRoLnJhbmRvbSBhbmQgTWF0aC5zZWVkcmFuZG9tXG4gICAgc3RhcnRkZW5vbSA9IG1hdGgucG93KHdpZHRoLCBjaHVua3MpLFxuICAgIHNpZ25pZmljYW5jZSA9IG1hdGgucG93KDIsIGRpZ2l0cyksXG4gICAgb3ZlcmZsb3cgPSBzaWduaWZpY2FuY2UgKiAyLFxuICAgIG1hc2sgPSB3aWR0aCAtIDEsXG4gICAgbm9kZWNyeXB0bzsgICAgICAgICAvLyBub2RlLmpzIGNyeXB0byBtb2R1bGUsIGluaXRpYWxpemVkIGF0IHRoZSBib3R0b20uXG5cbi8vXG4vLyBzZWVkcmFuZG9tKClcbi8vIFRoaXMgaXMgdGhlIHNlZWRyYW5kb20gZnVuY3Rpb24gZGVzY3JpYmVkIGFib3ZlLlxuLy9cbmZ1bmN0aW9uIHNlZWRyYW5kb20oc2VlZCwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgdmFyIGtleSA9IFtdO1xuICBvcHRpb25zID0gKG9wdGlvbnMgPT0gdHJ1ZSkgPyB7IGVudHJvcHk6IHRydWUgfSA6IChvcHRpb25zIHx8IHt9KTtcblxuICAvLyBGbGF0dGVuIHRoZSBzZWVkIHN0cmluZyBvciBidWlsZCBvbmUgZnJvbSBsb2NhbCBlbnRyb3B5IGlmIG5lZWRlZC5cbiAgdmFyIHNob3J0c2VlZCA9IG1peGtleShmbGF0dGVuKFxuICAgIG9wdGlvbnMuZW50cm9weSA/IFtzZWVkLCB0b3N0cmluZyhwb29sKV0gOlxuICAgIChzZWVkID09IG51bGwpID8gYXV0b3NlZWQoKSA6IHNlZWQsIDMpLCBrZXkpO1xuXG4gIC8vIFVzZSB0aGUgc2VlZCB0byBpbml0aWFsaXplIGFuIEFSQzQgZ2VuZXJhdG9yLlxuICB2YXIgYXJjNCA9IG5ldyBBUkM0KGtleSk7XG5cbiAgLy8gVGhpcyBmdW5jdGlvbiByZXR1cm5zIGEgcmFuZG9tIGRvdWJsZSBpbiBbMCwgMSkgdGhhdCBjb250YWluc1xuICAvLyByYW5kb21uZXNzIGluIGV2ZXJ5IGJpdCBvZiB0aGUgbWFudGlzc2Egb2YgdGhlIElFRUUgNzU0IHZhbHVlLlxuICB2YXIgcHJuZyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBuID0gYXJjNC5nKGNodW5rcyksICAgICAgICAgICAgIC8vIFN0YXJ0IHdpdGggYSBudW1lcmF0b3IgbiA8IDIgXiA0OFxuICAgICAgICBkID0gc3RhcnRkZW5vbSwgICAgICAgICAgICAgICAgIC8vICAgYW5kIGRlbm9taW5hdG9yIGQgPSAyIF4gNDguXG4gICAgICAgIHggPSAwOyAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICBhbmQgbm8gJ2V4dHJhIGxhc3QgYnl0ZScuXG4gICAgd2hpbGUgKG4gPCBzaWduaWZpY2FuY2UpIHsgICAgICAgICAgLy8gRmlsbCB1cCBhbGwgc2lnbmlmaWNhbnQgZGlnaXRzIGJ5XG4gICAgICBuID0gKG4gKyB4KSAqIHdpZHRoOyAgICAgICAgICAgICAgLy8gICBzaGlmdGluZyBudW1lcmF0b3IgYW5kXG4gICAgICBkICo9IHdpZHRoOyAgICAgICAgICAgICAgICAgICAgICAgLy8gICBkZW5vbWluYXRvciBhbmQgZ2VuZXJhdGluZyBhXG4gICAgICB4ID0gYXJjNC5nKDEpOyAgICAgICAgICAgICAgICAgICAgLy8gICBuZXcgbGVhc3Qtc2lnbmlmaWNhbnQtYnl0ZS5cbiAgICB9XG4gICAgd2hpbGUgKG4gPj0gb3ZlcmZsb3cpIHsgICAgICAgICAgICAgLy8gVG8gYXZvaWQgcm91bmRpbmcgdXAsIGJlZm9yZSBhZGRpbmdcbiAgICAgIG4gLz0gMjsgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIGxhc3QgYnl0ZSwgc2hpZnQgZXZlcnl0aGluZ1xuICAgICAgZCAvPSAyOyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgcmlnaHQgdXNpbmcgaW50ZWdlciBtYXRoIHVudGlsXG4gICAgICB4ID4+Pj0gMTsgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICB3ZSBoYXZlIGV4YWN0bHkgdGhlIGRlc2lyZWQgYml0cy5cbiAgICB9XG4gICAgcmV0dXJuIChuICsgeCkgLyBkOyAgICAgICAgICAgICAgICAgLy8gRm9ybSB0aGUgbnVtYmVyIHdpdGhpbiBbMCwgMSkuXG4gIH07XG5cbiAgcHJuZy5pbnQzMiA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJjNC5nKDQpIHwgMDsgfVxuICBwcm5nLnF1aWNrID0gZnVuY3Rpb24oKSB7IHJldHVybiBhcmM0LmcoNCkgLyAweDEwMDAwMDAwMDsgfVxuICBwcm5nLmRvdWJsZSA9IHBybmc7XG5cbiAgLy8gTWl4IHRoZSByYW5kb21uZXNzIGludG8gYWNjdW11bGF0ZWQgZW50cm9weS5cbiAgbWl4a2V5KHRvc3RyaW5nKGFyYzQuUyksIHBvb2wpO1xuXG4gIC8vIENhbGxpbmcgY29udmVudGlvbjogd2hhdCB0byByZXR1cm4gYXMgYSBmdW5jdGlvbiBvZiBwcm5nLCBzZWVkLCBpc19tYXRoLlxuICByZXR1cm4gKG9wdGlvbnMucGFzcyB8fCBjYWxsYmFjayB8fFxuICAgICAgZnVuY3Rpb24ocHJuZywgc2VlZCwgaXNfbWF0aF9jYWxsLCBzdGF0ZSkge1xuICAgICAgICBpZiAoc3RhdGUpIHtcbiAgICAgICAgICAvLyBMb2FkIHRoZSBhcmM0IHN0YXRlIGZyb20gdGhlIGdpdmVuIHN0YXRlIGlmIGl0IGhhcyBhbiBTIGFycmF5LlxuICAgICAgICAgIGlmIChzdGF0ZS5TKSB7IGNvcHkoc3RhdGUsIGFyYzQpOyB9XG4gICAgICAgICAgLy8gT25seSBwcm92aWRlIHRoZSAuc3RhdGUgbWV0aG9kIGlmIHJlcXVlc3RlZCB2aWEgb3B0aW9ucy5zdGF0ZS5cbiAgICAgICAgICBwcm5nLnN0YXRlID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb3B5KGFyYzQsIHt9KTsgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgY2FsbGVkIGFzIGEgbWV0aG9kIG9mIE1hdGggKE1hdGguc2VlZHJhbmRvbSgpKSwgbXV0YXRlXG4gICAgICAgIC8vIE1hdGgucmFuZG9tIGJlY2F1c2UgdGhhdCBpcyBob3cgc2VlZHJhbmRvbS5qcyBoYXMgd29ya2VkIHNpbmNlIHYxLjAuXG4gICAgICAgIGlmIChpc19tYXRoX2NhbGwpIHsgbWF0aFtybmduYW1lXSA9IHBybmc7IHJldHVybiBzZWVkOyB9XG5cbiAgICAgICAgLy8gT3RoZXJ3aXNlLCBpdCBpcyBhIG5ld2VyIGNhbGxpbmcgY29udmVudGlvbiwgc28gcmV0dXJuIHRoZVxuICAgICAgICAvLyBwcm5nIGRpcmVjdGx5LlxuICAgICAgICBlbHNlIHJldHVybiBwcm5nO1xuICAgICAgfSkoXG4gIHBybmcsXG4gIHNob3J0c2VlZCxcbiAgJ2dsb2JhbCcgaW4gb3B0aW9ucyA/IG9wdGlvbnMuZ2xvYmFsIDogKHRoaXMgPT0gbWF0aCksXG4gIG9wdGlvbnMuc3RhdGUpO1xufVxubWF0aFsnc2VlZCcgKyBybmduYW1lXSA9IHNlZWRyYW5kb207XG5cbi8vXG4vLyBBUkM0XG4vL1xuLy8gQW4gQVJDNCBpbXBsZW1lbnRhdGlvbi4gIFRoZSBjb25zdHJ1Y3RvciB0YWtlcyBhIGtleSBpbiB0aGUgZm9ybSBvZlxuLy8gYW4gYXJyYXkgb2YgYXQgbW9zdCAod2lkdGgpIGludGVnZXJzIHRoYXQgc2hvdWxkIGJlIDAgPD0geCA8ICh3aWR0aCkuXG4vL1xuLy8gVGhlIGcoY291bnQpIG1ldGhvZCByZXR1cm5zIGEgcHNldWRvcmFuZG9tIGludGVnZXIgdGhhdCBjb25jYXRlbmF0ZXNcbi8vIHRoZSBuZXh0IChjb3VudCkgb3V0cHV0cyBmcm9tIEFSQzQuICBJdHMgcmV0dXJuIHZhbHVlIGlzIGEgbnVtYmVyIHhcbi8vIHRoYXQgaXMgaW4gdGhlIHJhbmdlIDAgPD0geCA8ICh3aWR0aCBeIGNvdW50KS5cbi8vXG5mdW5jdGlvbiBBUkM0KGtleSkge1xuICB2YXIgdCwga2V5bGVuID0ga2V5Lmxlbmd0aCxcbiAgICAgIG1lID0gdGhpcywgaSA9IDAsIGogPSBtZS5pID0gbWUuaiA9IDAsIHMgPSBtZS5TID0gW107XG5cbiAgLy8gVGhlIGVtcHR5IGtleSBbXSBpcyB0cmVhdGVkIGFzIFswXS5cbiAgaWYgKCFrZXlsZW4pIHsga2V5ID0gW2tleWxlbisrXTsgfVxuXG4gIC8vIFNldCB1cCBTIHVzaW5nIHRoZSBzdGFuZGFyZCBrZXkgc2NoZWR1bGluZyBhbGdvcml0aG0uXG4gIHdoaWxlIChpIDwgd2lkdGgpIHtcbiAgICBzW2ldID0gaSsrO1xuICB9XG4gIGZvciAoaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XG4gICAgc1tpXSA9IHNbaiA9IG1hc2sgJiAoaiArIGtleVtpICUga2V5bGVuXSArICh0ID0gc1tpXSkpXTtcbiAgICBzW2pdID0gdDtcbiAgfVxuXG4gIC8vIFRoZSBcImdcIiBtZXRob2QgcmV0dXJucyB0aGUgbmV4dCAoY291bnQpIG91dHB1dHMgYXMgb25lIG51bWJlci5cbiAgKG1lLmcgPSBmdW5jdGlvbihjb3VudCkge1xuICAgIC8vIFVzaW5nIGluc3RhbmNlIG1lbWJlcnMgaW5zdGVhZCBvZiBjbG9zdXJlIHN0YXRlIG5lYXJseSBkb3VibGVzIHNwZWVkLlxuICAgIHZhciB0LCByID0gMCxcbiAgICAgICAgaSA9IG1lLmksIGogPSBtZS5qLCBzID0gbWUuUztcbiAgICB3aGlsZSAoY291bnQtLSkge1xuICAgICAgdCA9IHNbaSA9IG1hc2sgJiAoaSArIDEpXTtcbiAgICAgIHIgPSByICogd2lkdGggKyBzW21hc2sgJiAoKHNbaV0gPSBzW2ogPSBtYXNrICYgKGogKyB0KV0pICsgKHNbal0gPSB0KSldO1xuICAgIH1cbiAgICBtZS5pID0gaTsgbWUuaiA9IGo7XG4gICAgcmV0dXJuIHI7XG4gICAgLy8gRm9yIHJvYnVzdCB1bnByZWRpY3RhYmlsaXR5LCB0aGUgZnVuY3Rpb24gY2FsbCBiZWxvdyBhdXRvbWF0aWNhbGx5XG4gICAgLy8gZGlzY2FyZHMgYW4gaW5pdGlhbCBiYXRjaCBvZiB2YWx1ZXMuICBUaGlzIGlzIGNhbGxlZCBSQzQtZHJvcFsyNTZdLlxuICAgIC8vIFNlZSBodHRwOi8vZ29vZ2xlLmNvbS9zZWFyY2g/cT1yc2ErZmx1aHJlcityZXNwb25zZSZidG5JXG4gIH0pKHdpZHRoKTtcbn1cblxuLy9cbi8vIGNvcHkoKVxuLy8gQ29waWVzIGludGVybmFsIHN0YXRlIG9mIEFSQzQgdG8gb3IgZnJvbSBhIHBsYWluIG9iamVjdC5cbi8vXG5mdW5jdGlvbiBjb3B5KGYsIHQpIHtcbiAgdC5pID0gZi5pO1xuICB0LmogPSBmLmo7XG4gIHQuUyA9IGYuUy5zbGljZSgpO1xuICByZXR1cm4gdDtcbn07XG5cbi8vXG4vLyBmbGF0dGVuKClcbi8vIENvbnZlcnRzIGFuIG9iamVjdCB0cmVlIHRvIG5lc3RlZCBhcnJheXMgb2Ygc3RyaW5ncy5cbi8vXG5mdW5jdGlvbiBmbGF0dGVuKG9iaiwgZGVwdGgpIHtcbiAgdmFyIHJlc3VsdCA9IFtdLCB0eXAgPSAodHlwZW9mIG9iaiksIHByb3A7XG4gIGlmIChkZXB0aCAmJiB0eXAgPT0gJ29iamVjdCcpIHtcbiAgICBmb3IgKHByb3AgaW4gb2JqKSB7XG4gICAgICB0cnkgeyByZXN1bHQucHVzaChmbGF0dGVuKG9ialtwcm9wXSwgZGVwdGggLSAxKSk7IH0gY2F0Y2ggKGUpIHt9XG4gICAgfVxuICB9XG4gIHJldHVybiAocmVzdWx0Lmxlbmd0aCA/IHJlc3VsdCA6IHR5cCA9PSAnc3RyaW5nJyA/IG9iaiA6IG9iaiArICdcXDAnKTtcbn1cblxuLy9cbi8vIG1peGtleSgpXG4vLyBNaXhlcyBhIHN0cmluZyBzZWVkIGludG8gYSBrZXkgdGhhdCBpcyBhbiBhcnJheSBvZiBpbnRlZ2VycywgYW5kXG4vLyByZXR1cm5zIGEgc2hvcnRlbmVkIHN0cmluZyBzZWVkIHRoYXQgaXMgZXF1aXZhbGVudCB0byB0aGUgcmVzdWx0IGtleS5cbi8vXG5mdW5jdGlvbiBtaXhrZXkoc2VlZCwga2V5KSB7XG4gIHZhciBzdHJpbmdzZWVkID0gc2VlZCArICcnLCBzbWVhciwgaiA9IDA7XG4gIHdoaWxlIChqIDwgc3RyaW5nc2VlZC5sZW5ndGgpIHtcbiAgICBrZXlbbWFzayAmIGpdID1cbiAgICAgIG1hc2sgJiAoKHNtZWFyIF49IGtleVttYXNrICYgal0gKiAxOSkgKyBzdHJpbmdzZWVkLmNoYXJDb2RlQXQoaisrKSk7XG4gIH1cbiAgcmV0dXJuIHRvc3RyaW5nKGtleSk7XG59XG5cbi8vXG4vLyBhdXRvc2VlZCgpXG4vLyBSZXR1cm5zIGFuIG9iamVjdCBmb3IgYXV0b3NlZWRpbmcsIHVzaW5nIHdpbmRvdy5jcnlwdG8gYW5kIE5vZGUgY3J5cHRvXG4vLyBtb2R1bGUgaWYgYXZhaWxhYmxlLlxuLy9cbmZ1bmN0aW9uIGF1dG9zZWVkKCkge1xuICB0cnkge1xuICAgIHZhciBvdXQ7XG4gICAgaWYgKG5vZGVjcnlwdG8gJiYgKG91dCA9IG5vZGVjcnlwdG8ucmFuZG9tQnl0ZXMpKSB7XG4gICAgICAvLyBUaGUgdXNlIG9mICdvdXQnIHRvIHJlbWVtYmVyIHJhbmRvbUJ5dGVzIG1ha2VzIHRpZ2h0IG1pbmlmaWVkIGNvZGUuXG4gICAgICBvdXQgPSBvdXQod2lkdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdXQgPSBuZXcgVWludDhBcnJheSh3aWR0aCk7XG4gICAgICAoZ2xvYmFsLmNyeXB0byB8fCBnbG9iYWwubXNDcnlwdG8pLmdldFJhbmRvbVZhbHVlcyhvdXQpO1xuICAgIH1cbiAgICByZXR1cm4gdG9zdHJpbmcob3V0KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHZhciBicm93c2VyID0gZ2xvYmFsLm5hdmlnYXRvcixcbiAgICAgICAgcGx1Z2lucyA9IGJyb3dzZXIgJiYgYnJvd3Nlci5wbHVnaW5zO1xuICAgIHJldHVybiBbK25ldyBEYXRlLCBnbG9iYWwsIHBsdWdpbnMsIGdsb2JhbC5zY3JlZW4sIHRvc3RyaW5nKHBvb2wpXTtcbiAgfVxufVxuXG4vL1xuLy8gdG9zdHJpbmcoKVxuLy8gQ29udmVydHMgYW4gYXJyYXkgb2YgY2hhcmNvZGVzIHRvIGEgc3RyaW5nXG4vL1xuZnVuY3Rpb24gdG9zdHJpbmcoYSkge1xuICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseSgwLCBhKTtcbn1cblxuLy9cbi8vIFdoZW4gc2VlZHJhbmRvbS5qcyBpcyBsb2FkZWQsIHdlIGltbWVkaWF0ZWx5IG1peCBhIGZldyBiaXRzXG4vLyBmcm9tIHRoZSBidWlsdC1pbiBSTkcgaW50byB0aGUgZW50cm9weSBwb29sLiAgQmVjYXVzZSB3ZSBkb1xuLy8gbm90IHdhbnQgdG8gaW50ZXJmZXJlIHdpdGggZGV0ZXJtaW5pc3RpYyBQUk5HIHN0YXRlIGxhdGVyLFxuLy8gc2VlZHJhbmRvbSB3aWxsIG5vdCBjYWxsIG1hdGgucmFuZG9tIG9uIGl0cyBvd24gYWdhaW4gYWZ0ZXJcbi8vIGluaXRpYWxpemF0aW9uLlxuLy9cbm1peGtleShtYXRoLnJhbmRvbSgpLCBwb29sKTtcblxuLy9cbi8vIE5vZGVqcyBhbmQgQU1EIHN1cHBvcnQ6IGV4cG9ydCB0aGUgaW1wbGVtZW50YXRpb24gYXMgYSBtb2R1bGUgdXNpbmdcbi8vIGVpdGhlciBjb252ZW50aW9uLlxuLy9cbmlmICgodHlwZW9mIG1vZHVsZSkgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBzZWVkcmFuZG9tO1xuICAvLyBXaGVuIGluIG5vZGUuanMsIHRyeSB1c2luZyBjcnlwdG8gcGFja2FnZSBmb3IgYXV0b3NlZWRpbmcuXG4gIHRyeSB7XG4gICAgbm9kZWNyeXB0byA9IHJlcXVpcmUoJ2NyeXB0bycpO1xuICB9IGNhdGNoIChleCkge31cbn0gZWxzZSBpZiAoKHR5cGVvZiBkZWZpbmUpID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICBkZWZpbmUoZnVuY3Rpb24oKSB7IHJldHVybiBzZWVkcmFuZG9tOyB9KTtcbn1cblxuLy8gRW5kIGFub255bW91cyBzY29wZSwgYW5kIHBhc3MgaW5pdGlhbCB2YWx1ZXMuXG59KShcbiAgW10sICAgICAvLyBwb29sOiBlbnRyb3B5IHBvb2wgc3RhcnRzIGVtcHR5XG4gIE1hdGggICAgLy8gbWF0aDogcGFja2FnZSBjb250YWluaW5nIHJhbmRvbSwgcG93LCBhbmQgc2VlZHJhbmRvbVxuKTtcbiJdfQ==
