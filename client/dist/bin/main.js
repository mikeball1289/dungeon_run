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
        let lastTick = 0;
        root_1.juggler.add(() => {
            if (lastTick > 0) {
                let tick = Date.now();
                if (!isFinite(fps)) {
                    fps = 1000 / (tick - lastTick);
                }
                else {
                    fps = fps * 0.99 + (1000 / (tick - lastTick)) * 0.01;
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
            socket.on("state", (s) => {
                let updateTime = s.timestamp;
                if (lastUpdate > 0) {
                    let updateTime = Date.now();
                    if (!isFinite(tps)) {
                        tps = 1000 / (updateTime - lastUpdate);
                    }
                    else {
                        tps = tps * 0.99 + (1000 / (updateTime - lastUpdate)) * 0.01;
                    }
                    lastUpdate = updateTime;
                }
                else {
                    lastUpdate = updateTime;
                }
                view.update(s);
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
    return dungeon.map((t) => t === ETiles.SOLID ? ETiles.WALL : t);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL21pa2ViL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL3dhdGNoLXRzL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOi9Vc2Vycy9taWtlYi9BcHBEYXRhL1JvYW1pbmcvbnBtL25vZGVfbW9kdWxlcy93YXRjaC10cy9ub2RlX21vZHVsZXMvYnJvd3Nlci1yZXNvbHZlL2VtcHR5LmpzIiwic3JjL0dhbWVWaWV3LnRzIiwic3JjL0tleS50cyIsInNyYy9hY3RvcnMvUGxheWVyLnRzIiwic3JjL21haW4udHMiLCJzcmMvbWFwL1dvcmxkTWFwLnRzIiwic3JjL3Byb3ZpZGVycy9DbGFzc2ljVGlsZVByb3ZpZGVyLnRzIiwic3JjL3Byb3ZpZGVycy9EZWNvcmF0b3IudHMiLCJzcmMvcHJvdmlkZXJzL1N0YW5kYXJkVGVtcGxhdGVSb29tUHJvdmlkZXIudHMiLCJzcmMvcm9vdC50cyIsIi4uL2NvbW1vbi9EdW5HZW4udHMiLCIuLi9jb21tb24vTWFwMkQudHMiLCIuLi9jb21tb24vVGVtcGxhdGVSb29tLnRzIiwiLi4vY29tbW9uL3V0aWxzLnRzIiwiLi4vbm9kZV9tb2R1bGVzL3NlZWRyYW5kb20vaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvc2VlZHJhbmRvbS9saWIvYWxlYS5qcyIsIi4uL25vZGVfbW9kdWxlcy9zZWVkcmFuZG9tL2xpYi90eWNoZWkuanMiLCIuLi9ub2RlX21vZHVsZXMvc2VlZHJhbmRvbS9saWIveG9yMTI4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3NlZWRyYW5kb20vbGliL3hvcjQwOTYuanMiLCIuLi9ub2RlX21vZHVsZXMvc2VlZHJhbmRvbS9saWIveG9yc2hpZnQ3LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3NlZWRyYW5kb20vbGliL3hvcndvdy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zZWVkcmFuZG9tL3NlZWRyYW5kb20uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7OztBQ0NBLDRDQUF5QztBQUN6Qyw4Q0FBNEQ7QUFFNUQsY0FBc0IsU0FBUSxJQUFJLENBQUMsU0FBUztJQUl4QyxZQUFtQixHQUFhLEVBQVMsT0FBaUM7UUFDdEUsS0FBSyxFQUFFLENBQUM7UUFETyxRQUFHLEdBQUgsR0FBRyxDQUFVO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBMEI7UUFGbEUsZ0JBQVcsR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUl2QyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFTSxNQUFNLENBQUMsS0FBc0I7UUFDaEMsSUFBSSxNQUFNLEdBQUcsWUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoQyxJQUFJLFdBQVcsR0FBRyxZQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RDLElBQUksRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxHQUFHLHdCQUFnQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN0RixLQUFLLElBQUksRUFBRSxJQUFJLEtBQUssRUFBRTtZQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksZUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDL0M7UUFDRCxLQUFLLElBQUksRUFBRSxJQUFJLE9BQU8sRUFBRTtZQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMzQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDM0I7UUFDRCxLQUFLLElBQUksRUFBRSxJQUFJLE9BQU8sRUFBRTtZQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDOUM7SUFDTCxDQUFDO0NBQ0o7QUEzQkQsNEJBMkJDOzs7O0FDL0JZLFFBQUEsU0FBUyxHQUFHLENBQUMsQ0FBQztBQUNkLFFBQUEsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUNSLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNWLFFBQUEsR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUNULFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNmLFFBQUEsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNaLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUNiLFFBQUEsU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNmLFFBQUEsR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUNULFFBQUEsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNWLFFBQUEsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNWLFFBQUEsRUFBRSxHQUFHLEVBQUUsQ0FBQztBQUNSLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNWLFFBQUEsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNaLFFBQUEsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNaLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNQLFFBQUEsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNaLFFBQUEsUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNkLFFBQUEsUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNkLFFBQUEsUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNkLFFBQUEsUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNkLFFBQUEsUUFBUSxHQUFHLEdBQUcsQ0FBQztBQUNmLFFBQUEsUUFBUSxHQUFHLEdBQUcsQ0FBQztBQUNmLFFBQUEsUUFBUSxHQUFHLEdBQUcsQ0FBQztBQUNmLFFBQUEsUUFBUSxHQUFHLEdBQUcsQ0FBQztBQUNmLFFBQUEsUUFBUSxHQUFHLEdBQUcsQ0FBQztBQUNmLFFBQUEsUUFBUSxHQUFHLEdBQUcsQ0FBQztBQUNmLFFBQUEsUUFBUSxHQUFHLEdBQUcsQ0FBQztBQUNmLFFBQUEsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUNWLFFBQUEsUUFBUSxHQUFHLEdBQUcsQ0FBQztBQUNmLFFBQUEsYUFBYSxHQUFHLEdBQUcsQ0FBQztBQUNwQixRQUFBLE1BQU0sR0FBRyxHQUFHLENBQUM7QUFDYixRQUFBLEVBQUUsR0FBRyxHQUFHLENBQUM7QUFDVCxRQUFBLEVBQUUsR0FBRyxHQUFHLENBQUM7QUFDVCxRQUFBLEVBQUUsR0FBRyxHQUFHLENBQUM7QUFDVCxRQUFBLEVBQUUsR0FBRyxHQUFHLENBQUM7QUFDVCxRQUFBLEVBQUUsR0FBRyxHQUFHLENBQUM7QUFDVCxRQUFBLEVBQUUsR0FBRyxHQUFHLENBQUM7QUFDVCxRQUFBLEVBQUUsR0FBRyxHQUFHLENBQUM7QUFDVCxRQUFBLEVBQUUsR0FBRyxHQUFHLENBQUM7QUFDVCxRQUFBLEVBQUUsR0FBRyxHQUFHLENBQUM7QUFDVCxR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T0FBTyx3QkFBUyxDQUFDLElBQUksQ0FBQztLQUMvQztBQUNMLENBQUM7QUFFRCxNQUFNLFVBQVUsR0FBRyxDQUFDLHdCQUFTLENBQUMsR0FBRyxFQUFFLHdCQUFTLENBQUMsTUFBTSxFQUFFLHdCQUFTLENBQUMsSUFBSSxFQUFFLHdCQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7QUFFdEYscUJBQXFCLENBQVMsRUFBRSxDQUFTLEVBQUUsSUFBa0IsRUFBRSxTQUFvQixFQUFFLFNBQXNCO0lBQ3ZHLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO1FBQUUsT0FBTztJQUN6QyxJQUFJLFNBQVMsS0FBSyx3QkFBUyxDQUFDLEdBQUcsRUFBRTtRQUM3QixTQUFTLENBQUMsSUFBSSxDQUFFLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFFLENBQUM7S0FDckY7U0FBTSxJQUFJLFNBQVMsS0FBSyx3QkFBUyxDQUFDLE1BQU0sRUFBRTtRQUN2QyxTQUFTLENBQUMsSUFBSSxDQUFFLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFFLENBQUM7S0FDdkc7U0FBTSxJQUFJLFNBQVMsS0FBSyx3QkFBUyxDQUFDLElBQUksRUFBRTtRQUNyQyxTQUFTLENBQUMsSUFBSSxDQUFFLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFFLENBQUM7S0FDckY7U0FBTSxJQUFJLFNBQVMsS0FBSyx3QkFBUyxDQUFDLEtBQUssRUFBRTtR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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiIiwiaW1wb3J0IHsgV29ybGRNYXAgfSBmcm9tIFwiLi9tYXAvV29ybGRNYXBcIjtcclxuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vYWN0b3JzL1BsYXllclwiO1xyXG5pbXBvcnQgeyBLZXlzLCB2ZW5uSW50ZXJzZWN0aW9uIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi91dGlsc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdhbWVWaWV3IGV4dGVuZHMgUElYSS5Db250YWluZXIge1xyXG5cclxuICAgIHByaXZhdGUgcGxheWVyTGF5ZXIgPSBuZXcgUElYSS5Db250YWluZXIoKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbWFwOiBXb3JsZE1hcCwgcHVibGljIHBsYXllcnM6IHsgW2lkOiBzdHJpbmddOiBQbGF5ZXIgfSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZChtYXApO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5wbGF5ZXJMYXllcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShzdGF0ZTogR2FtZVN0YXRlUGFja2V0KSB7XHJcbiAgICAgICAgbGV0IG93bklkcyA9IEtleXModGhpcy5wbGF5ZXJzKTtcclxuICAgICAgICBsZXQgaW5jb21pbmdJZHMgPSBLZXlzKHN0YXRlLnBsYXllcnMpO1xyXG4gICAgICAgIGxldCB7IGwxOiBhZGRlZCwgbDI6IHJlbW92ZWQsIGJvdGg6IHVwZGF0ZWQgfSA9IHZlbm5JbnRlcnNlY3Rpb24oaW5jb21pbmdJZHMsIG93bklkcyk7XHJcbiAgICAgICAgZm9yIChsZXQgaWQgb2YgYWRkZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJzW2lkXSA9IG5ldyBQbGF5ZXIoc3RhdGUucGxheWVyc1tpZF0pO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllckxheWVyLmFkZENoaWxkKHRoaXMucGxheWVyc1tpZF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpZCBvZiByZW1vdmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyTGF5ZXIucmVtb3ZlQ2hpbGQodGhpcy5wbGF5ZXJzW2lkXSk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyc1tpZF0uZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5wbGF5ZXJzW2lkXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaWQgb2YgdXBkYXRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllcnNbaWRdLnVwZGF0ZShzdGF0ZS5wbGF5ZXJzW2lkXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNvbnN0IEJBQ0tTUEFDRSA9IDg7XHJcbmV4cG9ydCBjb25zdCBUQUIgPSA5O1xyXG5leHBvcnQgY29uc3QgRU5URVIgPSAxMztcclxuZXhwb3J0IGNvbnN0IFNISUZUID0gMTY7XHJcbmV4cG9ydCBjb25zdCBDVFJMID0gMTc7XHJcbmV4cG9ydCBjb25zdCBBTFQgPSAxODtcclxuZXhwb3J0IGNvbnN0IFBBVVNFID0gMTk7XHJcbmV4cG9ydCBjb25zdCBDQVBTX0xPQ0sgPSAyMDtcclxuZXhwb3J0IGNvbnN0IEVTQ0FQRSA9IDI3O1xyXG5leHBvcnQgY29uc3QgU1BBQ0UgPSAzMjtcclxuZXhwb3J0IGNvbnN0IFBBR0VfVVAgPSAzMztcclxuZXhwb3J0IGNvbnN0IFBBR0VfRE9XTiA9IDM0O1xyXG5leHBvcnQgY29uc3QgRU5EID0gMzU7XHJcbmV4cG9ydCBjb25zdCBIT01FID0gMzY7XHJcbmV4cG9ydCBjb25zdCBMRUZUID0gMzc7XHJcbmV4cG9ydCBjb25zdCBVUCA9IDM4O1xyXG5leHBvcnQgY29uc3QgUklHSFQgPSAzOTtcclxuZXhwb3J0IGNvbnN0IERPV04gPSA0MDtcclxuZXhwb3J0IGNvbnN0IElOU0VSVCA9IDQ1O1xyXG5leHBvcnQgY29uc3QgREVMRVRFID0gNDY7XHJcbmV4cG9ydCBjb25zdCBOVU1fMCA9IDQ4O1xyXG5leHBvcnQgY29uc3QgTlVNXzEgPSA0OTtcclxuZXhwb3J0IGNvbnN0IE5VTV8yID0gNTA7XHJcbmV4cG9ydCBjb25zdCBOVU1fMyA9IDUxO1xyXG5leHBvcnQgY29uc3QgTlVNXzQgPSA1MjtcclxuZXhwb3J0IGNvbnN0IE5VTV81ID0gNTM7XHJcbmV4cG9ydCBjb25zdCBOVU1fNiA9IDU0O1xyXG5leHBvcnQgY29uc3QgTlVNXzcgPSA1NTtcclxuZXhwb3J0IGNvbnN0IE5VTV84ID0gNTY7XHJcbmV4cG9ydCBjb25zdCBOVU1fOSA9IDU3O1xyXG5leHBvcnQgY29uc3QgQSA9IDY1O1xyXG5leHBvcnQgY29uc3QgQiA9IDY2O1xyXG5leHBvcnQgY29uc3QgQyA9IDY3O1xyXG5leHBvcnQgY29uc3QgRCA9IDY4O1xyXG5leHBvcnQgY29uc3QgRSA9IDY5O1xyXG5leHBvcnQgY29uc3QgRiA9IDcwO1xyXG5leHBvcnQgY29uc3QgRyA9IDcxO1xyXG5leHBvcnQgY29uc3QgSCA9IDcyO1xyXG5leHBvcnQgY29uc3QgSSA9IDczO1xyXG5leHBvcnQgY29uc3QgSiA9IDc0O1xyXG5leHBvcnQgY29uc3QgSyA9IDc1O1xyXG5leHBvcnQgY29uc3QgTCA9IDc2O1xyXG5leHBvcnQgY29uc3QgTSA9IDc3O1xyXG5leHBvcnQgY29uc3QgTiA9IDc4O1xyXG5leHBvcnQgY29uc3QgTyA9IDc5O1xyXG5leHBvcnQgY29uc3QgUCA9IDgwO1xyXG5leHBvcnQgY29uc3QgUSA9IDgxO1xyXG5leHBvcnQgY29uc3QgUiA9IDgyO1xyXG5leHBvcnQgY29uc3QgUyA9IDgzO1xyXG5leHBvcnQgY29uc3QgVCA9IDg0O1xyXG5leHBvcnQgY29uc3QgVSA9IDg1O1xyXG5leHBvcnQgY29uc3QgViA9IDg2O1xyXG5leHBvcnQgY29uc3QgVyA9IDg3O1xyXG5leHBvcnQgY29uc3QgWCA9IDg4O1xyXG5leHBvcnQgY29uc3QgWSA9IDg5O1xyXG5leHBvcnQgY29uc3QgWiA9IDkwO1xyXG5leHBvcnQgY29uc3QgU0VMRUNUID0gOTM7XHJcbmV4cG9ydCBjb25zdCBOVU1QQURfMCA9IDk2O1xyXG5leHBvcnQgY29uc3QgTlVNUEFEXzEgPSA5NztcclxuZXhwb3J0IGNvbnN0IE5VTVBBRF8yID0gOTg7XHJcbmV4cG9ydCBjb25zdCBOVU1QQURfMyA9IDk5O1xyXG5leHBvcnQgY29uc3QgTlVNUEFEXzQgPSAxMDA7XHJcbmV4cG9ydCBjb25zdCBOVU1QQURfNSA9IDEwMTtcclxuZXhwb3J0IGNvbnN0IE5VTVBBRF82ID0gMTAyO1xyXG5leHBvcnQgY29uc3QgTlVNUEFEXzcgPSAxMDM7XHJcbmV4cG9ydCBjb25zdCBOVU1QQURfOCA9IDEwNDtcclxuZXhwb3J0IGNvbnN0IE5VTVBBRF85ID0gMTA1O1xyXG5leHBvcnQgY29uc3QgTVVMVElQTFkgPSAxMDY7XHJcbmV4cG9ydCBjb25zdCBBREQgPSAxMDc7XHJcbmV4cG9ydCBjb25zdCBTVUJUUkFDVCA9IDEwOTtcclxuZXhwb3J0IGNvbnN0IERFQ0lNQUxfUE9JTlQgPSAxMTA7XHJcbmV4cG9ydCBjb25zdCBESVZJREUgPSAxMTE7XHJcbmV4cG9ydCBjb25zdCBGMSA9IDExMjtcclxuZXhwb3J0IGNvbnN0IEYyID0gMTEzO1xyXG5leHBvcnQgY29uc3QgRjMgPSAxMTQ7XHJcbmV4cG9ydCBjb25zdCBGNCA9IDExNTtcclxuZXhwb3J0IGNvbnN0IEY1ID0gMTE2O1xyXG5leHBvcnQgY29uc3QgRjYgPSAxMTc7XHJcbmV4cG9ydCBjb25zdCBGNyA9IDExODtcclxuZXhwb3J0IGNvbnN0IEY4ID0gMTE5O1xyXG5leHBvcnQgY29uc3QgRjkgPSAxMjA7XHJcbmV4cG9ydCBjb25zdCBGMTAgPSAxMjE7XHJcbmV4cG9ydCBjb25zdCBGMTEgPSAxMjI7XHJcbmV4cG9ydCBjb25zdCBGMTIgPSAxMjM7XHJcbmV4cG9ydCBjb25zdCBOVU1fTE9DSyA9IDE0NDtcclxuZXhwb3J0IGNvbnN0IFNDUk9MTF9MT0NLID0gMTQ1O1xyXG5leHBvcnQgY29uc3QgU0VNSUNPTE9OID0gMTg2O1xyXG5leHBvcnQgY29uc3QgRVFVQUxTID0gMTg3O1xyXG5leHBvcnQgY29uc3QgQ09NTUEgPSAxODg7XHJcbmV4cG9ydCBjb25zdCBEQVNIID0gMTg5O1xyXG5leHBvcnQgY29uc3QgUEVSSU9EID0gMTkwO1xyXG5leHBvcnQgY29uc3QgRk9SV0FSRF9TTEFTSCA9IDE5MTtcclxuZXhwb3J0IGNvbnN0IEdSQVZFX0FDQ0VOVCA9IDE5MjtcclxuZXhwb3J0IGNvbnN0IE9QRU5fQlJBQ0tFVCA9IDIxOTtcclxuZXhwb3J0IGNvbnN0IEJBQ0tfU0xBU0ggPSAyMjA7XHJcbmV4cG9ydCBjb25zdCBDTE9TRV9CUkFLRVQgPSAyMjE7XHJcbmV4cG9ydCBjb25zdCBTSU5HTEVfUVVPVEUgPSAyMjI7XHJcbiIsImV4cG9ydCBjbGFzcyBQbGF5ZXIgZXh0ZW5kcyBQSVhJLkNvbnRhaW5lciB7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKHN0YXRlOiBJUG9pbnQpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIGxldCBncmFwaGljcyA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XHJcbiAgICAgICAgZ3JhcGhpY3MuYmVnaW5GaWxsKDB4MDAwMEZGKTtcclxuICAgICAgICBncmFwaGljcy5kcmF3UmVjdCgwLCAwLCAyNSwgMjUpO1xyXG4gICAgICAgIGdyYXBoaWNzLmVuZEZpbGwoKTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKGdyYXBoaWNzKTtcclxuICAgICAgICB0aGlzLnggPSBzdGF0ZS54O1xyXG4gICAgICAgIHRoaXMueSA9IHN0YXRlLnk7XHJcbiAgICAgICAgdGhpcy5waXZvdC5zZXQoMTIuNSwgMjUpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShzdGF0ZTogSVBvaW50KSB7XHJcbiAgICAgICAgdGhpcy54ID0gc3RhdGUueDtcclxuICAgICAgICB0aGlzLnkgPSBzdGF0ZS55O1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgcm9vdCwganVnZ2xlciwga2V5Ym9hcmQsIEtleSB9IGZyb20gXCIuL3Jvb3RcIjtcclxuaW1wb3J0IHsgU3RhbmRhcmRUZW1wbGF0ZVJvb21Qcm92aWRlciB9IGZyb20gXCIuL3Byb3ZpZGVycy9TdGFuZGFyZFRlbXBsYXRlUm9vbVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IER1bkdlbiwgRHVuR2VuT3B0cyB9IGZyb20gXCIuLi8uLi9jb21tb24vRHVuR2VuXCI7XHJcbmltcG9ydCB7IENsYXNzaWNUaWxlUHJvdmlkZXIgfSBmcm9tIFwiLi9wcm92aWRlcnMvQ2xhc3NpY1RpbGVQcm92aWRlclwiO1xyXG5pbXBvcnQgeyBXb3JsZE1hcCB9IGZyb20gXCIuL21hcC9Xb3JsZE1hcFwiO1xyXG5pbXBvcnQgeyBHYW1lVmlldyB9IGZyb20gXCIuL0dhbWVWaWV3XCI7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBtYWluKCkge1xyXG4gICAgbGV0IGFwcCA9IG5ldyBQSVhJLkFwcGxpY2F0aW9uKCB7XHJcbiAgICAgICAgd2lkdGg6IDE2MDAsXHJcbiAgICAgICAgaGVpZ2h0OiA5MDAsXHJcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAweDE2MTYxNixcclxuICAgIH0gKTtcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYXBwLnZpZXcpO1xyXG4gICAgcm9vdC5zZXRBcHAoYXBwKTtcclxuXHJcbiAgICBsZXQgZnBzID0gNjA7XHJcbiAgICBsZXQgdHBzID0gNjA7XHJcbiAgICBsZXQgcGluZyA9IDA7XHJcblxyXG4gICAgbGV0IGZwc0Rpc3BsYXkgPSBuZXcgUElYSS5UZXh0KFwiMFwiLCB7IGFsaWduOiBcInJpZ2h0XCIsIGZvbnRGYW1pbHk6IFwiQ291cmllciBOZXdcIiwgZm9udFNpemU6IDE3LCBzdHJva2U6IDB4RkZGRkZGLCBzdHJva2VUaGlja25lc3M6IDAuNSB9ICk7XHJcbiAgICBmcHNEaXNwbGF5LmFuY2hvci5zZXQoMSk7XHJcbiAgICBmcHNEaXNwbGF5LnggPSBhcHAudmlldy53aWR0aDtcclxuICAgIGZwc0Rpc3BsYXkueSA9IGFwcC52aWV3LmhlaWdodDtcclxuICAgIHJvb3Quc3RhZ2UuYWRkQ2hpbGQoZnBzRGlzcGxheSk7XHJcblxyXG4gICAgbGV0IGxhc3RUaWNrID0gMDtcclxuICAgIGp1Z2dsZXIuYWRkKCAoKSA9PiB7XHJcbiAgICAgICAgaWYgKGxhc3RUaWNrID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgdGljayA9IERhdGUubm93KCk7XHJcbiAgICAgICAgICAgIGlmICghaXNGaW5pdGUoZnBzKSkge1xyXG4gICAgICAgICAgICAgICAgZnBzID0gMTAwMCAvICh0aWNrIC0gbGFzdFRpY2spO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZnBzID0gZnBzICogMC45OSArICgxMDAwIC8gKHRpY2sgLSBsYXN0VGljaykpICogMC4wMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsYXN0VGljayA9IHRpY2s7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGFzdFRpY2sgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnBzRGlzcGxheS50ZXh0ID0gcGluZyArIFwiIFBpbmcgXFxuXCIgKyB0cHMudG9GaXhlZCgxKSArIFwiIFdvcmxkXFxuXCIgKyBmcHMudG9GaXhlZCgxKSArIFwiIEhvbWUgXCI7XHJcbiAgICB9ICk7XHJcblxyXG4gICAgYXdhaXQgU3RhbmRhcmRUZW1wbGF0ZVJvb21Qcm92aWRlci5yZWFkeSgpO1xyXG4gICAgXHJcbiAgICBsZXQgc29ja2V0ID0gaW8oKTtcclxuICAgIHNvY2tldC5vbihcImR1bmdlb25fcGFyYW1zXCIsIGFzeW5jIChwYXJhbXM6IER1bkdlbk9wdHMpID0+IHtcclxuICAgICAgICBzb2NrZXQub2ZmKFwiZHVuZ2Vvbl9wYXJhbXNcIik7XHJcbiAgICAgICAgc29ja2V0LmVtaXQoXCJhY2tcIik7XHJcbiAgICAgICAgbGV0IGR1bmdlb24gPSBEdW5HZW4oU3RhbmRhcmRUZW1wbGF0ZVJvb21Qcm92aWRlci50ZW1wbGF0ZXMsIHBhcmFtcyk7XHJcbiAgICAgICAgYXdhaXQgQ2xhc3NpY1RpbGVQcm92aWRlci5yZWFkeSgpO1xyXG4gICAgICAgIGxldCBtYXAgPSBuZXcgV29ybGRNYXAoZHVuZ2VvbiwgQ2xhc3NpY1RpbGVQcm92aWRlcik7XHJcbiAgICAgICAgbGV0IHZpZXcgPSBuZXcgR2FtZVZpZXcobWFwLCB7fSk7XHJcbiAgICAgICAgcm9vdC5zdGFnZS5hZGRDaGlsZEF0KHZpZXcsIDApO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGp1Z2dsZXIuYWRkKCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNvY2tldC5lbWl0KFwiY29udHJvbHNcIiwgPENvbnRyb2xzPntcclxuICAgICAgICAgICAgICAgIHVwOiBrZXlib2FyZC5pc0tleURvd24oS2V5LlVQKSxcclxuICAgICAgICAgICAgICAgIGRvd246IGtleWJvYXJkLmlzS2V5RG93bihLZXkuRE9XTiksXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiBrZXlib2FyZC5pc0tleURvd24oS2V5LkxFRlQpLFxyXG4gICAgICAgICAgICAgICAgcmlnaHQ6IGtleWJvYXJkLmlzS2V5RG93bihLZXkuUklHSFQpLFxyXG4gICAgICAgICAgICAgICAganVtcDoga2V5Ym9hcmQuaXNLZXlEb3duKEtleS5TUEFDRSksXHJcbiAgICAgICAgICAgIH0gKTtcclxuICAgICAgICB9ICk7XHJcblxyXG4gICAgICAgIGxldCBsYXN0VXBkYXRlID0gMDtcclxuICAgICAgICBzb2NrZXQub24oXCJzdGF0ZVwiLCAoczogR2FtZVN0YXRlUGFja2V0KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB1cGRhdGVUaW1lID0gcy50aW1lc3RhbXA7XHJcbiAgICAgICAgICAgIGlmIChsYXN0VXBkYXRlID4gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHVwZGF0ZVRpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc0Zpbml0ZSh0cHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHBzID0gMTAwMCAvICh1cGRhdGVUaW1lIC0gbGFzdFVwZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRwcyA9IHRwcyAqIDAuOTkgKyAoMTAwMCAvICh1cGRhdGVUaW1lIC0gbGFzdFVwZGF0ZSkpICogMC4wMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxhc3RVcGRhdGUgPSB1cGRhdGVUaW1lO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGFzdFVwZGF0ZSA9IHVwZGF0ZVRpbWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZpZXcudXBkYXRlKHMpO1xyXG4gICAgICAgIH0gKTtcclxuXHJcbiAgICAgICAgbGV0IHBpbmdUaW1lID0gMDtcclxuICAgICAgICBzZXRJbnRlcnZhbCggKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocGluZ1RpbWUgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHNvY2tldC5lbWl0KFwiX3BpbmdcIik7XHJcbiAgICAgICAgICAgICAgICBwaW5nVGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICBzb2NrZXQub24oXCJfcG9uZ1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHBpbmcgPSBEYXRlLm5vdygpIC0gcGluZ1RpbWU7XHJcbiAgICAgICAgICAgIHBpbmdUaW1lID0gMDtcclxuICAgICAgICB9ICk7XHJcblxyXG4gICAgICAgIHNvY2tldC5vbihcInJlbG9hZFwiLCAoKSA9PiB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCkgKTtcclxuXHJcbiAgICB9ICk7XHJcblxyXG59XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgbWFpbik7IiwiaW1wb3J0IHsgRHVuZ2VvbiwgRVRpbGVzIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9EdW5HZW5cIjtcclxuaW1wb3J0IHsgSVRpbGVQcm92aWRlciB9IGZyb20gXCIuLi9wcm92aWRlcnMvSVRpbGVQcm92aWRlclwiO1xyXG5pbXBvcnQgeyByb290IH0gZnJvbSBcIi4uL3Jvb3RcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBUSUxFX1NJWkUgPSAzMjtcclxuY29uc3QgRVBTSUxPTiA9IDAuMDAxO1xyXG5cclxuZXhwb3J0IGNsYXNzIFdvcmxkTWFwIGV4dGVuZHMgUElYSS5Db250YWluZXIge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkdW5nZW9uOiBEdW5nZW9uLCBwdWJsaWMgcHJvdmlkZXI6IElUaWxlUHJvdmlkZXIpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIGlmICghcHJvdmlkZXIuaXNSZWFkeSgpKSB0aHJvdyBuZXcgRXJyb3IoXCJQcm92aWRlciBpcyBub3QgcmVhZHlcIik7XHJcbiAgICAgICAgbGV0IHRleCA9IFBJWEkuUmVuZGVyVGV4dHVyZS5jcmVhdGUoZHVuZ2Vvbi53aWR0aCAqIFRJTEVfU0laRSwgZHVuZ2Vvbi5oZWlnaHQgKiBUSUxFX1NJWkUpO1xyXG4gICAgICAgIGxldCBjb250YWluZXIgPSBuZXcgUElYSS5Db250YWluZXIoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGR1bmdlb24ud2lkdGg7IGkgKyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBkdW5nZW9uLmhlaWdodDsgaiArKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRpbGUgPSBwcm92aWRlci5nZXRUaWxlKGR1bmdlb24sIGksIGopO1xyXG4gICAgICAgICAgICAgICAgdGlsZS54ID0gaSAqIFRJTEVfU0laRTtcclxuICAgICAgICAgICAgICAgIHRpbGUueSA9IGogKiBUSUxFX1NJWkU7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYWRkQ2hpbGQodGlsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcm9vdC5hcHAucmVuZGVyZXIucmVuZGVyKGNvbnRhaW5lciwgdGV4KTtcclxuICAgICAgICBjb250YWluZXIuZGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQobmV3IFBJWEkuU3ByaXRlKHRleCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHB1YmxpYyBtb3ZlKGFjdG9yOiBBY3Rvcikge1xyXG4gICAgLy8gICAgIGxldCBjb2xsaXNpb25zID0gWzAsIDBdO1xyXG5cclxuICAgIC8vICAgICBsZXQgeHYgPSBhY3Rvci52ZWxvY2l0eS54O1xyXG4gICAgLy8gICAgIHdoaWxlICh4diAhPT0gMCkge1xyXG4gICAgLy8gICAgICAgICBsZXQgbW92ZSA9IE1hdGgubWF4KE1hdGgubWluKFRJTEVfU0laRSwgeHYpLCAtVElMRV9TSVpFKTtcclxuICAgIC8vICAgICAgICAgYWN0b3IueCArPSBtb3ZlO1xyXG4gICAgLy8gICAgICAgICB4diAtPSBtb3ZlO1xyXG4gICAgLy8gICAgICAgICBsZXQgbGVmdCA9IE1hdGguZmxvb3IoYWN0b3IubGVmdCAvIFRJTEVfU0laRSk7XHJcbiAgICAvLyAgICAgICAgIGxldCByaWdodCA9IE1hdGguZmxvb3IoYWN0b3IucmlnaHQgLyBUSUxFX1NJWkUpO1xyXG4gICAgLy8gICAgICAgICBsZXQgdG9wID0gTWF0aC5mbG9vcihhY3Rvci50b3AgLyBUSUxFX1NJWkUpO1xyXG4gICAgLy8gICAgICAgICBsZXQgYm90dG9tID0gTWF0aC5mbG9vcihhY3Rvci5ib3R0b20gLyBUSUxFX1NJWkUpO1xyXG4gICAgLy8gICAgICAgICBmb3IgKGxldCBpID0gdG9wOyBpIDw9IGJvdHRvbTsgaSArKykge1xyXG4gICAgLy8gICAgICAgICAgICAgaWYgKHRoaXMuZHVuZ2Vvbi50aWxlcy5nZXQobGVmdCwgaSkgPT09IEVUaWxlcy5XQUxMIHx8IHRoaXMuZHVuZ2Vvbi50aWxlcy5nZXQocmlnaHQsIGkpID09PSBFVGlsZXMuV0FMTCkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGlmIChtb3ZlID4gMCkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBhY3Rvci5yaWdodCA9IHJpZ2h0ICogMzIgLSBFUFNJTE9OO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBjb2xsaXNpb25zWzBdID0gMTtcclxuICAgIC8vICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBhY3Rvci5sZWZ0ID0gbGVmdCAqIDMyICsgMzIgKyBFUFNJTE9OO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBjb2xsaXNpb25zWzBdID0gLTE7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIHh2ID0gMDtcclxuICAgIC8vICAgICAgICAgICAgICAgICBhY3Rvci52ZWxvY2l0eS54ID0gMDtcclxuICAgIC8vICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH1cclxuICAgICAgICBcclxuICAgIC8vICAgICBsZXQgeXYgPSBhY3Rvci52ZWxvY2l0eS55O1xyXG4gICAgLy8gICAgIHdoaWxlICh5diAhPT0gMCkge1xyXG4gICAgLy8gICAgICAgICBsZXQgbW92ZSA9IE1hdGgubWF4KE1hdGgubWluKFRJTEVfU0laRSwgeXYpLCAtVElMRV9TSVpFKTtcclxuICAgIC8vICAgICAgICAgYWN0b3IueSArPSBtb3ZlO1xyXG4gICAgLy8gICAgICAgICB5diAtPSBtb3ZlO1xyXG4gICAgLy8gICAgICAgICBsZXQgbGVmdCA9IE1hdGguZmxvb3IoYWN0b3IubGVmdCAvIFRJTEVfU0laRSk7XHJcbiAgICAvLyAgICAgICAgIGxldCByaWdodCA9IE1hdGguZmxvb3IoYWN0b3IucmlnaHQgLyBUSUxFX1NJWkUpO1xyXG4gICAgLy8gICAgICAgICBsZXQgdG9wID0gTWF0aC5mbG9vcihhY3Rvci50b3AgLyBUSUxFX1NJWkUpO1xyXG4gICAgLy8gICAgICAgICBsZXQgYm90dG9tID0gTWF0aC5mbG9vcihhY3Rvci5ib3R0b20gLyBUSUxFX1NJWkUpO1xyXG4gICAgLy8gICAgICAgICBmb3IgKGxldCBpID0gbGVmdDsgaSA8PSByaWdodDsgaSArKykge1xyXG4gICAgLy8gICAgICAgICAgICAgaWYgKHRoaXMuZHVuZ2Vvbi50aWxlcy5nZXQoaSwgdG9wKSA9PT0gRVRpbGVzLldBTEwgfHwgdGhpcy5kdW5nZW9uLnRpbGVzLmdldChpLCBib3R0b20pID09PSBFVGlsZXMuV0FMTCkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGlmIChtb3ZlID4gMCkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBhY3Rvci5ib3R0b20gPSBib3R0b20gKiAzMiAtIEVQU0lMT047XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGNvbGxpc2lvbnNbMV0gPSAxO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGFjdG9yLnRvcCA9IHRvcCAqIDMyICsgMzIgKyBFUFNJTE9OO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBjb2xsaXNpb25zWzFdID0gLTE7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIHl2ID0gMDtcclxuICAgIC8vICAgICAgICAgICAgICAgICBhY3Rvci52ZWxvY2l0eS55ID0gMDtcclxuICAgIC8vICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH1cclxuICAgICAgICBcclxuICAgIC8vICAgICByZXR1cm4gY29sbGlzaW9ucztcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBwdWJsaWMgaXNPbkxhZGRlcihhY3RvcjogQWN0b3IpOiBib29sZWFuIHtcclxuICAgIC8vICAgICBsZXQgY2VudGVyID0gTWF0aC5mbG9vcihhY3Rvci5ob3Jpem9udGFsQ2VudGVyIC8gVElMRV9TSVpFKTtcclxuICAgIC8vICAgICBsZXQgdG9wID0gTWF0aC5mbG9vcihhY3Rvci50b3AgLyBUSUxFX1NJWkUpO1xyXG4gICAgLy8gICAgIGxldCBib3R0b20gPSBNYXRoLmZsb29yKGFjdG9yLmJvdHRvbSAvIFRJTEVfU0laRSk7XHJcblxyXG4gICAgLy8gICAgIHJldHVybiAodGhpcy5kdW5nZW9uLnRpbGVzLmdldChjZW50ZXIsIHRvcCkgPT09IEVUaWxlcy5MQURERVIgfHwgdGhpcy5kdW5nZW9uLnRpbGVzLmdldChjZW50ZXIsIGJvdHRvbSkgPT09IEVUaWxlcy5MQURERVIpO1xyXG4gICAgLy8gfVxyXG5cclxufSIsImltcG9ydCB7IER1bmdlb24sIEVUaWxlcyB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vRHVuR2VuXCI7XHJcbmltcG9ydCB7IElUaWxlUHJvdmlkZXIgfSBmcm9tIFwiLi9JVGlsZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7IHN0YXRpY0ltcGxlbWVudHMgfSBmcm9tIFwiLi9EZWNvcmF0b3JcIjtcclxuXHJcbkBzdGF0aWNJbXBsZW1lbnRzPElUaWxlUHJvdmlkZXI+KClcclxuZXhwb3J0IGNsYXNzIENsYXNzaWNUaWxlUHJvdmlkZXIge1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgdGV4dHVyZVNoZWV0OiBQSVhJLlRleHR1cmU7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZWFkeSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBsZXQgcCA9IG5ldyBQcm9taXNlPHZvaWQ+KCAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy50ZXh0dXJlU2hlZXQpIHtcclxuICAgICAgICAgICAgICAgIFBJWEkubG9hZGVyLmFkZChcInRpbGVzXCIsIFwiaW1nL3RpbGVzXzAwMS5wbmdcIik7XHJcbiAgICAgICAgICAgICAgICBQSVhJLmxvYWRlci5sb2FkKCk7XHJcbiAgICAgICAgICAgICAgICBQSVhJLmxvYWRlci5vbmNlKFwiY29tcGxldGVcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZVNoZWV0ID0gUElYSS5sb2FkZXIucmVzb3VyY2VzW1widGlsZXNcIl0udGV4dHVyZTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9ICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICk7XHJcbiAgICAgICAgcmV0dXJuIHA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBpc1JlYWR5KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRleHR1cmVTaGVldCAhPT0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0VGlsZShkdW5nZW9uOiBEdW5nZW9uLCB4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgICAgIGxldCB0ZXhYID0gMDtcclxuICAgICAgICBsZXQgdGV4WSA9IDA7XHJcbiAgICAgICAgbGV0IHRpbGUgPSBkdW5nZW9uLnRpbGVzLmdldCh4LCB5KTtcclxuICAgICAgICBpZiAodGlsZSA9PT0gRVRpbGVzLkVNUFRZKSB7XHJcbiAgICAgICAgICAgIHRleFggPSA1O1xyXG4gICAgICAgICAgICB0ZXhZID0gMTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRpbGUgPT09IEVUaWxlcy5MQURERVIpIHtcclxuICAgICAgICAgICAgdGV4WCA9IDU7XHJcbiAgICAgICAgICAgIHRleFkgPSAyO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGlsZSA9PT0gRVRpbGVzLldBTEwpIHtcclxuICAgICAgICAgICAgbGV0IHNvbGlkVG9wID0geSA9PT0gMCB8fCBkdW5nZW9uLnRpbGVzLmdldCh4LCB5IC0gMSkgPT09IEVUaWxlcy5XQUxMO1xyXG4gICAgICAgICAgICBsZXQgc29saWRCb3R0b20gPSB5ID09PSBkdW5nZW9uLmhlaWdodCAtIDEgfHwgZHVuZ2Vvbi50aWxlcy5nZXQoeCwgeSArIDEpID09PSBFVGlsZXMuV0FMTDtcclxuICAgICAgICAgICAgbGV0IHNvbGlkTGVmdCA9IHggPT09IDAgfHwgZHVuZ2Vvbi50aWxlcy5nZXQoeCAtIDEsIHkpID09PSBFVGlsZXMuV0FMTDtcclxuICAgICAgICAgICAgbGV0IHNvbGlkUmlnaHQgPSB4ID09PSBkdW5nZW9uLndpZHRoIC0gMSB8fCBkdW5nZW9uLnRpbGVzLmdldCh4ICsgMSwgeSkgPT09IEVUaWxlcy5XQUxMO1xyXG4gICAgICAgICAgICBpZiAoc29saWRUb3AgJiYgc29saWRCb3R0b20gJiYgc29saWRMZWZ0ICYmIHNvbGlkUmlnaHQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzb2xpZFRvcExlZnQgPSB5ID09PSAwIHx8IHggPT09IDAgfHwgZHVuZ2Vvbi50aWxlcy5nZXQoeCAtIDEsIHkgLSAxKSA9PT0gRVRpbGVzLldBTEw7XHJcbiAgICAgICAgICAgICAgICBsZXQgc29saWRUb3BSaWdodCA9IHkgPT09IDAgfHwgeCA9PT0gZHVuZ2Vvbi53aWR0aCAtIDEgfHwgZHVuZ2Vvbi50aWxlcy5nZXQoeCArIDEsIHkgLSAxKSA9PT0gRVRpbGVzLldBTEw7XHJcbiAgICAgICAgICAgICAgICBsZXQgc29saWRCb3R0b21MZWZ0ID0geSA9PT0gZHVuZ2Vvbi5oZWlnaHQgLSAxIHx8IHggPT09IDAgfHwgZHVuZ2Vvbi50aWxlcy5nZXQoeCAtIDEsIHkgKyAxKSA9PT0gRVRpbGVzLldBTEw7XHJcbiAgICAgICAgICAgICAgICBsZXQgc29saWRCb3R0b21SaWdodCA9IHkgPT09IGR1bmdlb24uaGVpZ2h0IC0gMSB8fCB4ID09PSBkdW5nZW9uLndpZHRoIC0gMSB8fCBkdW5nZW9uLnRpbGVzLmdldCh4ICsgMSwgeSArIDEpID09PSBFVGlsZXMuV0FMTDtcclxuICAgICAgICAgICAgICAgIGlmICghc29saWRUb3BMZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4WCA9IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4WSA9IDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFzb2xpZFRvcFJpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4WCA9IDQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4WSA9IDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFzb2xpZEJvdHRvbUxlZnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXhYID0gMztcclxuICAgICAgICAgICAgICAgICAgICB0ZXhZID0gMjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXNvbGlkQm90dG9tUmlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXhYID0gNDtcclxuICAgICAgICAgICAgICAgICAgICB0ZXhZID0gMjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4WCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4WSA9IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXNvbGlkTGVmdCAmJiBzb2xpZFJpZ2h0ICYmIHNvbGlkQm90dG9tICYmICFzb2xpZFRvcCkge1xyXG4gICAgICAgICAgICAgICAgdGV4WCA9IDA7XHJcbiAgICAgICAgICAgICAgICB0ZXhZID0gMDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzb2xpZExlZnQgJiYgc29saWRSaWdodCAmJiBzb2xpZEJvdHRvbSAmJiAhc29saWRUb3ApIHtcclxuICAgICAgICAgICAgICAgIHRleFggPSAxO1xyXG4gICAgICAgICAgICAgICAgdGV4WSA9IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc29saWRMZWZ0ICYmICFzb2xpZFJpZ2h0ICYmIHNvbGlkQm90dG9tICYmICFzb2xpZFRvcCkge1xyXG4gICAgICAgICAgICAgICAgdGV4WCA9IDI7XHJcbiAgICAgICAgICAgICAgICB0ZXhZID0gMDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICghc29saWRMZWZ0ICYmIHNvbGlkUmlnaHQgJiYgc29saWRCb3R0b20gJiYgc29saWRUb3ApIHtcclxuICAgICAgICAgICAgICAgIHRleFggPSAwO1xyXG4gICAgICAgICAgICAgICAgdGV4WSA9IDE7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc29saWRMZWZ0ICYmICFzb2xpZFJpZ2h0ICYmIHNvbGlkQm90dG9tICYmIHNvbGlkVG9wKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXhYID0gMjtcclxuICAgICAgICAgICAgICAgIHRleFkgPSAxO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFzb2xpZExlZnQgJiYgc29saWRSaWdodCAmJiAhc29saWRCb3R0b20gJiYgc29saWRUb3ApIHtcclxuICAgICAgICAgICAgICAgIHRleFggPSAwO1xyXG4gICAgICAgICAgICAgICAgdGV4WSA9IDI7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc29saWRMZWZ0ICYmIHNvbGlkUmlnaHQgJiYgIXNvbGlkQm90dG9tICYmIHNvbGlkVG9wKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXhYID0gMTtcclxuICAgICAgICAgICAgICAgIHRleFkgPSAyO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNvbGlkTGVmdCAmJiAhc29saWRSaWdodCAmJiAhc29saWRCb3R0b20gJiYgc29saWRUb3ApIHtcclxuICAgICAgICAgICAgICAgIHRleFggPSAyO1xyXG4gICAgICAgICAgICAgICAgdGV4WSA9IDI7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXNvbGlkTGVmdCAmJiBzb2xpZFJpZ2h0ICYmICFzb2xpZEJvdHRvbSAmJiAhc29saWRUb3ApIHtcclxuICAgICAgICAgICAgICAgIHRleFggPSAzO1xyXG4gICAgICAgICAgICAgICAgdGV4WSA9IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc29saWRMZWZ0ICYmIHNvbGlkUmlnaHQgJiYgIXNvbGlkQm90dG9tICYmICFzb2xpZFRvcCkge1xyXG4gICAgICAgICAgICAgICAgdGV4WCA9IDQ7XHJcbiAgICAgICAgICAgICAgICB0ZXhZID0gMDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzb2xpZExlZnQgJiYgIXNvbGlkUmlnaHQgJiYgIXNvbGlkQm90dG9tICYmICFzb2xpZFRvcCkge1xyXG4gICAgICAgICAgICAgICAgdGV4WCA9IDU7XHJcbiAgICAgICAgICAgICAgICB0ZXhZID0gMDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICghc29saWRMZWZ0ICYmICFzb2xpZFJpZ2h0ICYmIHNvbGlkQm90dG9tICYmICFzb2xpZFRvcCkge1xyXG4gICAgICAgICAgICAgICAgdGV4WCA9IDY7XHJcbiAgICAgICAgICAgICAgICB0ZXhZID0gMDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICghc29saWRMZWZ0ICYmICFzb2xpZFJpZ2h0ICYmIHNvbGlkQm90dG9tICYmIHNvbGlkVG9wKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXhYID0gNjtcclxuICAgICAgICAgICAgICAgIHRleFkgPSAxO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFzb2xpZExlZnQgJiYgIXNvbGlkUmlnaHQgJiYgIXNvbGlkQm90dG9tICYmIHNvbGlkVG9wKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXhYID0gNjtcclxuICAgICAgICAgICAgICAgIHRleFkgPSAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgUElYSS5TcHJpdGUobmV3IFBJWEkuVGV4dHVyZShDbGFzc2ljVGlsZVByb3ZpZGVyLnRleHR1cmVTaGVldC5iYXNlVGV4dHVyZSwgbmV3IFBJWEkuUmVjdGFuZ2xlKHRleFggKiAzMiwgdGV4WSAqIDMyLCAzMiwgMzIpKSk7XHJcbiAgICB9XHJcblxyXG59IiwiZXhwb3J0IGZ1bmN0aW9uIHN0YXRpY0ltcGxlbWVudHM8VD4oKSB7XHJcbiAgICByZXR1cm4gKGNvbnN0cnVjdG9yOiBUKSA9PiB7fVxyXG59IiwiaW1wb3J0IHsgVGVtcGxhdGVSb29tIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9UZW1wbGF0ZVJvb21cIjtcclxuaW1wb3J0IHsgc3RhdGljSW1wbGVtZW50cyB9IGZyb20gXCIuL0RlY29yYXRvclwiO1xyXG5pbXBvcnQgeyBJUHJvdmlkZXIgfSBmcm9tIFwiLi9JUHJvdmlkZXJcIjtcclxuXHJcbkBzdGF0aWNJbXBsZW1lbnRzPElQcm92aWRlcj4oKVxyXG5leHBvcnQgY2xhc3MgU3RhbmRhcmRUZW1wbGF0ZVJvb21Qcm92aWRlciB7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyB0ZW1wbGF0ZXM6IFRlbXBsYXRlUm9vbVtdO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgcmVhZHkoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgbGV0IHAgPSBuZXcgUHJvbWlzZTx2b2lkPiggKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50ZW1wbGF0ZXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICAgICAgcmVxLm9wZW4oXCJHRVRcIiwgXCIvdGVtcGxhdGVzLmpzb25cIik7XHJcbiAgICAgICAgICAgICAgICByZXEuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wbGF0ZXM6IFRlbXBsYXRlUm9vbVtdID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlVGV4dCkubWFwKCAoZDogbnVtYmVyW11bXSkgPT4gbmV3IFRlbXBsYXRlUm9vbShkKSApO1xyXG4gICAgICAgICAgICAgICAgICAgIFN0YW5kYXJkVGVtcGxhdGVSb29tUHJvdmlkZXIudGVtcGxhdGVzID0gdGVtcGxhdGVzO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0ZW1wbGF0ZXMuZm9yRWFjaCggKHQpID0+IGNvbnNvbGUubG9nKHQudG9TdHJpbmcoKSkgKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgZHVuZ2VvbiA9ICh3aW5kb3cgYXMgYW55KS5kdW5nZW9uID0gRHVuR2VuKHRlbXBsYXRlcywgeyBoZWlnaHQ6IDEwMCwgd2lkdGg6IDEwMCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBtYWluKGR1bmdlb24pO1xyXG4gICAgICAgICAgICAgICAgfSApO1xyXG4gICAgICAgICAgICAgICAgcmVxLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCByZWplY3QpO1xyXG4gICAgICAgICAgICAgICAgcmVxLnNlbmQoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gKTtcclxuICAgICAgICByZXR1cm4gcDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGlzUmVhZHkoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGVtcGxhdGVzICE9PSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG59XHJcbiIsIi8vIHRzbGludDpkaXNhYmxlIG1heC1jbGFzc2VzLXBlci1maWxlXHJcbmltcG9ydCAqIGFzIF9LZXkgZnJvbSBcIi4vS2V5XCI7XHJcblxyXG5leHBvcnQgY29uc3QgS2V5ID0gX0tleTtcclxuXHJcbmNsYXNzIEp1Z2dsZXIge1xyXG4gICAgcHJpdmF0ZSBlbnRlckZyYW1lRnVuY3Rpb25zOiBbKCgpID0+IHZvaWQpLCBhbnldW10gPSBbXTtcclxuICAgIHByaXZhdGUgc2NoZWR1bGU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgaW50ZXJGcmFtZVRpbWU6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZwczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5pbnRlckZyYW1lVGltZSA9IDEwMDAgLyBmcHM7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSA9IERhdGUubm93KCkgKyB0aGlzLmludGVyRnJhbWVUaW1lO1xyXG4gICAgICAgIGxldCB0aWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmVudGVyRnJhbWVGdW5jdGlvbnMuZm9yRWFjaCggKFtmbiwgY3R4XSkgPT4gZm4uY2FsbChjdHgpICk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUgKz0gdGhpcy5pbnRlckZyYW1lVGltZTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aW1lb3V0ID0gdGhpcy5zY2hlZHVsZSAtIERhdGUubm93KCk7XHJcbiAgICAgICAgICAgIGlmICh0aW1lb3V0IDwgMikge1xyXG4gICAgICAgICAgICAgICAgdGltZW91dCA9IDI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlID0gRGF0ZS5ub3coKSArIHRoaXMuaW50ZXJGcmFtZVRpbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0VGltZW91dCh0aWNrLCB0aGlzLnNjaGVkdWxlIC0gRGF0ZS5ub3coKSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCh0aWNrLCB0aGlzLmludGVyRnJhbWVUaW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkKGZuOiAoKSA9PiB2b2lkLCBjb250ZXh0PzogYW55KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzKGZuLCBjb250ZXh0KSA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5lbnRlckZyYW1lRnVuY3Rpb25zLnB1c2goW2ZuLCBjb250ZXh0XSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmUoZm46ICgpID0+IHZvaWQsIGNvbnRleHQ/OiBhbnkpIHtcclxuICAgICAgICBsZXQgaWR4ID0gdGhpcy5oYXMoZm4sIGNvbnRleHQpO1xyXG4gICAgICAgIGlmIChpZHggPj0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmVudGVyRnJhbWVGdW5jdGlvbnMuc3BsaWNlKGlkeCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoYXMoZm46ICgpID0+IHZvaWQsIGNvbnRleHQ/OiBhbnkpIHtcclxuICAgICAgICBmb3IgKGxldCBbaSwgb2VmXSBvZiBlbnVtZXJhdGUodGhpcy5lbnRlckZyYW1lRnVuY3Rpb25zKSkge1xyXG4gICAgICAgICAgICBpZiAob2VmWzBdID09PSBmbiAmJiBvZWZbMV0gPT09IGNvbnRleHQpIHJldHVybiBpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFmdGVyRnJhbWVzKG51bUZyYW1lczogbnVtYmVyLCBmbjogKCkgPT4gdm9pZCwgY29udGV4dD86IGFueSkge1xyXG4gICAgICAgIGxldCB3cmFwcGVyID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBudW1GcmFtZXMgLS07XHJcbiAgICAgICAgICAgIGlmIChudW1GcmFtZXMgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgZm4uY2FsbChjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKHdyYXBwZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmFkZCh3cmFwcGVyKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGxldCBqdWdnbGVyID0gbmV3IEp1Z2dsZXIoNjApO1xyXG5cclxuY2xhc3MgUm9vdCB7XHJcbiAgICBwcml2YXRlIF9hcHA6IFBJWEkuQXBwbGljYXRpb247XHJcblxyXG4gICAgcHVibGljIHNldEFwcChhcHA6IFBJWEkuQXBwbGljYXRpb24pIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2FwcCkgdGhpcy5fYXBwID0gYXBwO1xyXG4gICAgICAgIGVsc2UgdGhyb3cgbmV3IEVycm9yKFwiQXBwIGlzIGFscmVhZHkgc2V0XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzdGFnZSgpOiBQSVhJLkNvbnRhaW5lciB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2FwcCkgcmV0dXJuIHRoaXMuX2FwcC5zdGFnZTtcclxuICAgICAgICBlbHNlIHRocm93IG5ldyBFcnJvcihcIlN0YWdlIGlzIG5vdCB5ZXQgc2V0XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBhcHAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2FwcCkgcmV0dXJuIHRoaXMuX2FwcDtcclxuICAgICAgICBlbHNlIHRocm93IG5ldyBFcnJvcihcIkFwcCBpcyBub3QgeWV0IHNldFwiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGxldCByb290ID0gKHdpbmRvdyBhcyBhbnkpLnJvb3QgPSBuZXcgUm9vdCgpO1xyXG5cclxuY2xhc3MgS2V5Ym9hcmQge1xyXG5cclxuICAgIHByaXZhdGUga2V5czogYm9vbGVhbltdID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChlKSA9PiB0aGlzLmtleXNbZS5rZXlDb2RlXSA9IHRydWUgKTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChlKSA9PiB0aGlzLmtleXNbZS5rZXlDb2RlXSA9IGZhbHNlICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzS2V5RG93bihrZXljb2RlOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5rZXlzW2tleWNvZGVdIHx8IGZhbHNlO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGxldCBrZXlib2FyZCA9IG5ldyBLZXlib2FyZCgpO1xyXG5cclxuZXhwb3J0IGVudW0gQ29udHJvbGxlckF4aXMge1xyXG4gICAgTEVGVF9YID0gMCxcclxuICAgIExFRlRfWSA9IDEsXHJcbiAgICBSSUdIVF9YID0gMixcclxuICAgIFJJR0hUX1kgPSAzLFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBDb250cm9sbGVyQnV0dG9uIHtcclxuICAgIEEgPSAwLFxyXG4gICAgQiA9IDEsXHJcbiAgICBYID0gMixcclxuICAgIFkgPSAzLFxyXG4gICAgTEIgPSA0LFxyXG4gICAgUkIgPSA1LFxyXG4gICAgTFQgPSA2LFxyXG4gICAgUlQgPSA3LFxyXG4gICAgU0VMRUNUID0gOCxcclxuICAgIFNUQVJUID0gOSxcclxuICAgIEwzID0gMTAsXHJcbiAgICBSMyA9IDExLFxyXG4gICAgRF9VUCA9IDEyLFxyXG4gICAgRF9ET1dOID0gMTMsXHJcbiAgICBEX0xFRlQgPSAxNCxcclxuICAgIERfUklHSFQgPSAxNSxcclxufVxyXG5cclxuY2xhc3MgQ29udHJvbGxlciB7XHJcbiAgICBwcml2YXRlIGJ1dHRvbnM6IGJvb2xlYW5bXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBheGVzOiBudW1iZXJbXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIGp1Z2dsZXIuYWRkKCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBncHMgPSBuYXZpZ2F0b3IuZ2V0R2FtZXBhZHMoKTtcclxuICAgICAgICAgICAgaWYgKCFncHNbMF0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9ucyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5heGVzID0gW107XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGdhbWVwYWQgPSBncHNbMF0hO1xyXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbnMgPSBnYW1lcGFkLmJ1dHRvbnMubWFwKCAoYikgPT4gYi5wcmVzc2VkICk7XHJcbiAgICAgICAgICAgIHRoaXMuYXhlcyA9IGdhbWVwYWQuYXhlcztcclxuICAgICAgICB9ICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEF4aXMoYXhpczogQ29udHJvbGxlckF4aXMpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5heGVzW2F4aXNdIHx8IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEJ1dHRvbihidXR0b246IENvbnRyb2xsZXJCdXR0b24pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5idXR0b25zW2J1dHRvbl0gfHwgZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBsZXQgY29udHJvbGxlciA9IG5ldyBDb250cm9sbGVyKCk7XHJcblxyXG5jbGFzcyBTb3VuZE1hbmFnZXIge1xyXG4gICAgcHVibGljIHN0YXRpYyBHTE9CQUxfVk9MVU1FID0gMC40O1xyXG4gICAgcHJpdmF0ZSBtdXNpYzogeyBbc29uZ05hbWU6IHN0cmluZ106IHsgc29uZzogSFRNTEF1ZGlvRWxlbWVudCwgZmFkZTogbnVtYmVyIH0gfSA9IHt9O1xyXG4gICAgcHJpdmF0ZSB0YWdzOiB7IFt0YWc6IHN0cmluZ106IGJvb2xlYW4gfSA9IHt9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIGp1Z2dsZXIuYWRkKCgpID0+IHRoaXMudGFncyA9IHt9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcGxheVNvdW5kKG5hbWU6IHN0cmluZywgdm9sdW1lID0gMSwgdGFnPzogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRhZykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMudGFnc1t0YWddKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhZ3NbdGFnXSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGF1ZGlvID0gbmV3IEF1ZGlvKG5hbWUpO1xyXG4gICAgICAgIGF1ZGlvLnZvbHVtZSA9IHZvbHVtZSAqIFNvdW5kTWFuYWdlci5HTE9CQUxfVk9MVU1FO1xyXG4gICAgICAgIGF1ZGlvLnBsYXkoKTtcclxuICAgICAgICBhdWRpby5vbmVuZGVkID0gKCkgPT4gYXVkaW8ucmVtb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBsYXlNdXNpYyhuYW1lOiBzdHJpbmcsIHZvbHVtZSA9IDEpIHtcclxuICAgICAgICBpZiAodGhpcy5tdXNpYy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xyXG4gICAgICAgICAgICBpZiAoIWlzTmFOKHRoaXMubXVzaWNbbmFtZV0uZmFkZSkpIHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMubXVzaWNbbmFtZV0uZmFkZSk7XHJcbiAgICAgICAgICAgIHRoaXMubXVzaWNbbmFtZV0uc29uZy52b2x1bWUgPSB2b2x1bWUgKiBTb3VuZE1hbmFnZXIuR0xPQkFMX1ZPTFVNRTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYXVkaW8gPSBuZXcgQXVkaW8obmFtZSk7XHJcbiAgICAgICAgYXVkaW8udm9sdW1lID0gdm9sdW1lICogU291bmRNYW5hZ2VyLkdMT0JBTF9WT0xVTUU7XHJcbiAgICAgICAgYXVkaW8ubG9vcCA9IHRydWU7XHJcbiAgICAgICAgYXVkaW8ucGxheSgpO1xyXG4gICAgICAgIHRoaXMubXVzaWNbbmFtZV0gPSB7XHJcbiAgICAgICAgICAgIHNvbmc6IGF1ZGlvLFxyXG4gICAgICAgICAgICBmYWRlOiBOYU4sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZmFkZU11c2ljT3V0KG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmICghdGhpcy5tdXNpYy5oYXNPd25Qcm9wZXJ0eShuYW1lKSB8fCAhaXNOYU4odGhpcy5tdXNpY1tuYW1lXS5mYWRlKSkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBmYWRlU3RhcnQgPSB0aGlzLm11c2ljW25hbWVdLnNvbmcudm9sdW1lO1xyXG4gICAgICAgIGxldCBmYWRlVGltZSA9IDMwO1xyXG4gICAgICAgIHRoaXMubXVzaWNbbmFtZV0uZmFkZSA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGZhZGVUaW1lIC0tO1xyXG4gICAgICAgICAgICBpZiAoZmFkZVRpbWUgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tdXNpY1tuYW1lXS5zb25nLnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm11c2ljW25hbWVdLnNvbmcucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aGlzLm11c2ljW25hbWVdLmZhZGUpO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMubXVzaWNbbmFtZV07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm11c2ljW25hbWVdLnNvbmcudm9sdW1lID0gZmFkZVRpbWUgLyAzMCAqIGZhZGVTdGFydDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDE2KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0TXVzaWNWb2x1bWUobmFtZTogc3RyaW5nLCB2b2x1bWU6IG51bWJlcikge1xyXG4gICAgICAgIGlmICghdGhpcy5tdXNpYy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMubXVzaWNbbmFtZV0uc29uZy52b2x1bWUgPSB2b2x1bWUgKiBTb3VuZE1hbmFnZXIuR0xPQkFMX1ZPTFVNRTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGxldCBzb3VuZE1hbmFnZXIgPSBuZXcgU291bmRNYW5hZ2VyKCk7XHJcbiIsImltcG9ydCB7IE1hcDJEIH0gZnJvbSBcIi4vTWFwMkRcIjtcclxuaW1wb3J0IHsgVGVtcGxhdGVSb29tLCBEaXJlY3Rpb24gfSBmcm9tIFwiLi9UZW1wbGF0ZVJvb21cIjtcclxuaW1wb3J0ICogYXMgc2VlZHJhbmRvbSBmcm9tIFwic2VlZHJhbmRvbVwiO1xyXG5pbXBvcnQgeyBLZXlzIH0gZnJvbSBcIi4vdXRpbHNcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRHVuR2VuT3B0cyB7XHJcbiAgICB3aWR0aD86IG51bWJlcixcclxuICAgIGhlaWdodD86IG51bWJlcixcclxuICAgIHNlZWQ/OiBzdHJpbmcsXHJcbn1cclxuXHJcbmxldCBkZWZhdWx0czogRHVuR2VuT3B0cyA9IHtcclxuICAgIHdpZHRoOiA1MCxcclxuICAgIGhlaWdodDogNTAsXHJcbn1cclxuXHJcbmludGVyZmFjZSBJT3BlbkRvb3IgZXh0ZW5kcyBJUG9pbnQge1xyXG4gICAgZGlyZWN0aW9uOiBEaXJlY3Rpb247XHJcbn1cclxuXHJcbmludGVyZmFjZSBJUG9pbnQge1xyXG4gICAgeDogbnVtYmVyO1xyXG4gICAgeTogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBFVGlsZXMge1xyXG4gICAgU09MSUQgPSAtMSxcclxuICAgIEVNUFRZID0gMCxcclxuICAgIFdBTEwgPSAxLFxyXG4gICAgVE9QX0RPT1IgPSBEaXJlY3Rpb24uVE9QLFxyXG4gICAgQk9UVE9NX0RPT1IgPSBEaXJlY3Rpb24uQk9UVE9NLFxyXG4gICAgTEVGVF9ET09SID0gRGlyZWN0aW9uLkxFRlQsXHJcbiAgICBSSUdIVF9ET09SID0gRGlyZWN0aW9uLlJJR0hULFxyXG4gICAgTEFEREVSID0gNixcclxufVxyXG5cclxuZnVuY3Rpb24gb3Bwb3NpdGVEaXJlY3Rpb24oZGlyOiBEaXJlY3Rpb24pOiBEaXJlY3Rpb24ge1xyXG4gICAgc3dpdGNoKGRpcikge1xyXG4gICAgICAgIGNhc2UgRGlyZWN0aW9uLlRPUDogcmV0dXJuIERpcmVjdGlvbi5CT1RUT007XHJcbiAgICAgICAgY2FzZSBEaXJlY3Rpb24uQk9UVE9NOiByZXR1cm4gRGlyZWN0aW9uLlRPUDtcclxuICAgICAgICBjYXNlIERpcmVjdGlvbi5MRUZUOiByZXR1cm4gRGlyZWN0aW9uLlJJR0hUO1xyXG4gICAgICAgIGNhc2UgRGlyZWN0aW9uLlJJR0hUOiByZXR1cm4gRGlyZWN0aW9uLkxFRlQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IGRpcmVjdGlvbnMgPSBbRGlyZWN0aW9uLlRPUCwgRGlyZWN0aW9uLkJPVFRPTSwgRGlyZWN0aW9uLkxFRlQsIERpcmVjdGlvbi5SSUdIVF07XHJcblxyXG5mdW5jdGlvbiBhZGRPcGVuRG9vcih4OiBudW1iZXIsIHk6IG51bWJlciwgcm9vbTogVGVtcGxhdGVSb29tLCBkaXJlY3Rpb246IERpcmVjdGlvbiwgb3BlbkRvb3JzOiBJT3BlbkRvb3JbXSkge1xyXG4gICAgaWYgKHJvb20uZG9vcndheXNbZGlyZWN0aW9uXSA8IDApIHJldHVybjtcclxuICAgIGlmIChkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5UT1ApIHtcclxuICAgICAgICBvcGVuRG9vcnMucHVzaCggeyBkaXJlY3Rpb246IGRpcmVjdGlvbiwgeDogeCArIHJvb20uZG9vcndheXNbZGlyZWN0aW9uXSwgeTogeSB9ICk7XHJcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLkJPVFRPTSkge1xyXG4gICAgICAgIG9wZW5Eb29ycy5wdXNoKCB7IGRpcmVjdGlvbjogZGlyZWN0aW9uLCB4OiB4ICsgcm9vbS5kb29yd2F5c1tkaXJlY3Rpb25dLCB5OiB5ICsgcm9vbS5oZWlnaHQgLSAxIH0gKTtcclxuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uTEVGVCkge1xyXG4gICAgICAgIG9wZW5Eb29ycy5wdXNoKCB7IGRpcmVjdGlvbjogZGlyZWN0aW9uLCB4OiB4LCB5OiB5ICsgcm9vbS5kb29yd2F5c1tkaXJlY3Rpb25dIH0gKTtcclxuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uUklHSFQpIHtcclxuICAgICAgICBvcGVuRG9vcnMucHVzaCggeyBkaXJlY3Rpb246IGRpcmVjdGlvbiwgeDogeCArIHJvb20ud2lkdGggLSAxLCB5OiB5ICsgcm9vbS5kb29yd2F5c1tkaXJlY3Rpb25dIH0gKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYWRkT3BlbkRvb3JzKHg6IG51bWJlciwgeTogbnVtYmVyLCByb29tOiBUZW1wbGF0ZVJvb20sIG9wZW5Eb29yczogSU9wZW5Eb29yW10sIGV4Y3VsZGU6IERpcmVjdGlvbltdID0gW10pIHtcclxuICAgIGZvciAobGV0IGRpciBvZiBkaXJlY3Rpb25zKSB7XHJcbiAgICAgICAgaWYgKGV4Y3VsZGUuaW5kZXhPZihkaXIpID49IDAgfHwgcm9vbS5kb29yd2F5c1tkaXJdIDwgMCkgY29udGludWU7XHJcbiAgICAgICAgYWRkT3BlbkRvb3IoeCwgeSwgcm9vbSwgZGlyLCBvcGVuRG9vcnMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByb29tQ2FuQXR0YWNoKGRpcmVjdGlvbjogRGlyZWN0aW9uLCBjYW5kaWRhdGVSb29tOiBUZW1wbGF0ZVJvb20pIHtcclxuICAgIHJldHVybiBjYW5kaWRhdGVSb29tLmRvb3J3YXlzW29wcG9zaXRlRGlyZWN0aW9uKGRpcmVjdGlvbildID49IDA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbm5lY3RlZFJvb21YWShkb29yOiBJT3BlbkRvb3IsIHJvb206IFRlbXBsYXRlUm9vbSkge1xyXG4gICAgbGV0IGNvbm5lY3RpbmdEb29yID0gcm9vbS5kb29yd2F5c1tvcHBvc2l0ZURpcmVjdGlvbihkb29yLmRpcmVjdGlvbildO1xyXG4gICAgc3dpdGNoIChkb29yLmRpcmVjdGlvbikge1xyXG4gICAgICAgIGNhc2UgRGlyZWN0aW9uLlRPUDogcmV0dXJuIHsgeDogZG9vci54IC0gY29ubmVjdGluZ0Rvb3IsIHk6IGRvb3IueSAtIHJvb20uaGVpZ2h0IH07XHJcbiAgICAgICAgY2FzZSBEaXJlY3Rpb24uQk9UVE9NOiByZXR1cm4geyB4OiBkb29yLnggLSBjb25uZWN0aW5nRG9vciwgeTogZG9vci55ICsgMSB9O1xyXG4gICAgICAgIGNhc2UgRGlyZWN0aW9uLkxFRlQ6IHJldHVybiB7IHg6IGRvb3IueCAtIHJvb20ud2lkdGgsIHk6IGRvb3IueSAtIGNvbm5lY3RpbmdEb29yIH07XHJcbiAgICAgICAgY2FzZSBEaXJlY3Rpb24uUklHSFQ6IHJldHVybiB7IHg6IGRvb3IueCArIDEsIHk6IGRvb3IueSAtIGNvbm5lY3RpbmdEb29yIH07XHJcbiAgICAgICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBkaXJlY3Rpb25cIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBEdW5HZW4odGVtcGxhdGVzOiBUZW1wbGF0ZVJvb21bXSwgb3B0cz86IER1bkdlbk9wdHMpIHtcclxuICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xyXG4gICAgZm9yIChsZXQga2V5IG9mIEtleXMoZGVmYXVsdHMpKSB7XHJcbiAgICAgICAgaWYgKG9wdHNba2V5XSA9PT0gdW5kZWZpbmVkKSBvcHRzW2tleV0gPSBkZWZhdWx0c1trZXldO1xyXG4gICAgfVxyXG4gICAgbGV0IHBybmcgPSBzZWVkcmFuZG9tKG9wdHMuc2VlZCk7XHJcbiAgICBsZXQgZHVuZ2VvbiA9IG5ldyBEdW5nZW9uKG9wdHMud2lkdGghLCBvcHRzLmhlaWdodCEsIG9wdHMuc2VlZCB8fCBcIlwiKTtcclxuICAgIGxldCBvcGVuRG9vcnM6IElPcGVuRG9vcltdID0gW107XHJcbiAgICB0ZW1wbGF0ZXMgPSBmeVNodWZmbGUodGVtcGxhdGVzLCBwcm5nKTtcclxuICAgIGxldCByb290ID0gdGVtcGxhdGVzWzBdO1xyXG4gICAgbGV0IHggPSBNYXRoLmZsb29yKChkdW5nZW9uLndpZHRoIC0gcm9vdC53aWR0aCkgLyAyKTtcclxuICAgIGxldCB5ID0gTWF0aC5mbG9vcigoZHVuZ2Vvbi5oZWlnaHQgLSByb290LmhlaWdodCkgLyAyKTtcclxuICAgIGlmICghZHVuZ2Vvbi5wYWludChyb290LCB4LCB5KSkge1xyXG4gICAgICAgIHJldHVybiBkdW5nZW9uO1xyXG4gICAgfVxyXG4gICAgYWRkT3BlbkRvb3JzKHgsIHksIHJvb3QsIG9wZW5Eb29ycyk7XHJcblxyXG4gICAgd2hpbGUgKG9wZW5Eb29ycy5sZW5ndGgpIHtcclxuICAgICAgICBvcGVuRG9vcnMgPSBmeVNodWZmbGUob3BlbkRvb3JzLCBwcm5nKTtcclxuICAgICAgICBsZXQgZG9vciA9IG9wZW5Eb29ycy5wb3AoKSE7XHJcbiAgICAgICAgdGVtcGxhdGVzID0gZnlTaHVmZmxlKHRlbXBsYXRlcywgcHJuZyk7XHJcbiAgICAgICAgZm9yIChsZXQgY2FuZGlkYXRlIG9mIHRlbXBsYXRlcykge1xyXG4gICAgICAgICAgICBpZiAoIXJvb21DYW5BdHRhY2goZG9vci5kaXJlY3Rpb24sIGNhbmRpZGF0ZSkpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBsZXQgeHkgPSBjb25uZWN0ZWRSb29tWFkoZG9vciwgY2FuZGlkYXRlKTtcclxuICAgICAgICAgICAgaWYgKGR1bmdlb24ucGFpbnQoY2FuZGlkYXRlLCB4eS54LCB4eS55KSkge1xyXG4gICAgICAgICAgICAgICAgYWRkT3BlbkRvb3JzKHh5LngsIHh5LnksIGNhbmRpZGF0ZSwgb3BlbkRvb3JzLCBbb3Bwb3NpdGVEaXJlY3Rpb24oZG9vci5kaXJlY3Rpb24pXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGR1bmdlb24gPSBkdW5nZW9uLm1hcCggKHRpbGUsIHgsIHksIGR1bmdlb24pID0+IHtcclxuICAgICAgICBpZiAodGlsZSA9PT0gRVRpbGVzLlNPTElEIHx8IHRpbGUgPT09IEVUaWxlcy5XQUxMKSB7XHJcbiAgICAgICAgICAgIGlmICh5ID4gMCAmJiB5IDwgZHVuZ2Vvbi5oZWlnaHQgLSAxKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG9wID0gZHVuZ2Vvbi50aWxlcy5nZXQoeCwgeSAtIDEpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJvdHRvbSA9IGR1bmdlb24udGlsZXMuZ2V0KHgsIHkgKyAxKTtcclxuICAgICAgICAgICAgICAgIGlmICgoKHRvcCA9PT0gRGlyZWN0aW9uLkJPVFRPTSB8fCB0b3AgPT09IDApICYmIChib3R0b20gPT09IERpcmVjdGlvbi5UT1AgfHwgYm90dG9tID09PSAwKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHRvcCAhPT0gYm90dG9tKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBEaXJlY3Rpb24uQk9UVE9NO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh4ID4gMCAmJiB4IDwgZHVuZ2Vvbi53aWR0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBsZWZ0ID0gZHVuZ2Vvbi50aWxlcy5nZXQoeCAtIDEsIHkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJpZ2h0ID0gZHVuZ2Vvbi50aWxlcy5nZXQoeCArIDEsIHkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCgobGVmdCA9PT0gRGlyZWN0aW9uLlJJR0hUIHx8IGxlZnQgPT09IDApICYmIChyaWdodCA9PT0gRGlyZWN0aW9uLkxFRlQgfHwgcmlnaHQgPT09IDApKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIGxlZnQgIT09IHJpZ2h0KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkaXJlY3Rpb25zLmluZGV4T2YodGlsZSkgPCAwKSByZXR1cm4gdGlsZTtcclxuICAgICAgICBpZiAoeCA+IDAgJiYgeCA8IGR1bmdlb24ud2lkdGggLSAxICYmIHkgPiAwICYmIHkgPCBkdW5nZW9uLmhlaWdodCAtIDEpIHtcclxuICAgICAgICAgICAgbGV0IHh5ID0geyB4OiAwLCB5OiAwIH07XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGlsZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBEaXJlY3Rpb24uVE9QOiB4eS55ID0gLTE7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBEaXJlY3Rpb24uQk9UVE9NOiB4eS55ID0gMTsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIERpcmVjdGlvbi5MRUZUOiB4eS54ID0gLTE7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBEaXJlY3Rpb24uUklHSFQ6IHh5LnggPSAxOyBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZHVuZ2Vvbi50aWxlcy5nZXQoeCArIHh5LngsIHkgKyB4eS55KSA9PT0gb3Bwb3NpdGVEaXJlY3Rpb24odGlsZSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aWxlID09PSBEaXJlY3Rpb24uQk9UVE9NID8gRGlyZWN0aW9uLkJPVFRPTSA6IEVUaWxlcy5FTVBUWTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh4ID4gMSAmJiB4IDwgZHVuZ2Vvbi53aWR0aCAtIDIgJiYgeSA+IDEgJiYgeSA8IGR1bmdlb24uaGVpZ2h0IC0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZWFjaCA9IGR1bmdlb24udGlsZXMuZ2V0KHggKyB4eS54ICogMiwgeSArIHh5LnkgKiAyKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWFjaCA9PT0gRVRpbGVzLkVNUFRZIHx8IHJlYWNoID09PSBvcHBvc2l0ZURpcmVjdGlvbih0aWxlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGlsZSA9PT0gRGlyZWN0aW9uLkJPVFRPTSA/IERpcmVjdGlvbi5CT1RUT00gOiBFVGlsZXMuRU1QVFk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBFVGlsZXMuV0FMTDtcclxuICAgIH0gKTtcclxuXHJcbiAgICBsZXQgbGFkZGVyU2VlZHM6IElQb2ludFtdID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGR1bmdlb24ud2lkdGggLSAxOyBpICsrKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBkdW5nZW9uLndpZHRoIC0gMTsgaiArKykge1xyXG4gICAgICAgICAgICBpZiAoZHVuZ2Vvbi50aWxlcy5nZXQoaSwgaikgPT09IEVUaWxlcy5FTVBUWSAmJiBkdW5nZW9uLnRpbGVzLmdldChpICsgMSwgaikgPT09IEVUaWxlcy5FTVBUWSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJsID0gZHVuZ2Vvbi50aWxlcy5nZXQoaSwgaiArIDEpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJyID0gZHVuZ2Vvbi50aWxlcy5nZXQoaSArIDEsIGogKyAxKTtcclxuICAgICAgICAgICAgICAgIGlmIChibCA9PT0gMSAmJiBiciA9PT0gRGlyZWN0aW9uLkJPVFRPTSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhZGRlclNlZWRzLnB1c2goeyB4OiBpICsgMSwgeTogaiArIDEgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGJsID09PSBEaXJlY3Rpb24uQk9UVE9NICYmIGJyID09PSBFVGlsZXMuV0FMTCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhZGRlclNlZWRzLnB1c2goeyB4OiBpLCB5OiBqICsgMSB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGxhZGRlclNlZWRzID0gZnlTaHVmZmxlKGxhZGRlclNlZWRzLCBwcm5nKTtcclxuXHJcbiAgICBmdW5jdGlvbiBlcmFzZUJvdHRvbURvb3IoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoZHVuZ2Vvbi50aWxlcy5nZXQoeCwgeSkgPT09IERpcmVjdGlvbi5CT1RUT00pIHtcclxuICAgICAgICAgICAgZHVuZ2Vvbi50aWxlcy5zZXQoeCwgeSwgRVRpbGVzLkVNUFRZKTtcclxuICAgICAgICAgICAgZXJhc2VCb3R0b21Eb29yKHggLSAxLCB5KTtcclxuICAgICAgICAgICAgZXJhc2VCb3R0b21Eb29yKHggKyAxLCB5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgd2hpbGUgKGxhZGRlclNlZWRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBsZXQgc2VlZCA9IGxhZGRlclNlZWRzLnBvcCgpITtcclxuICAgICAgICBpZiAoZHVuZ2Vvbi50aWxlcy5nZXQoc2VlZC54LCBzZWVkLnkpICE9PSBEaXJlY3Rpb24uQk9UVE9NKSBjb250aW51ZTtcclxuICAgICAgICB3aGlsZSAoZHVuZ2Vvbi50aWxlcy5nZXQoc2VlZC54LCBzZWVkLnkpICE9PSBFVGlsZXMuV0FMTCkge1xyXG4gICAgICAgICAgICBpZiAoZHVuZ2Vvbi50aWxlcy5nZXQoc2VlZC54LCBzZWVkLnkpID09PSBEaXJlY3Rpb24uQk9UVE9NKSB7XHJcbiAgICAgICAgICAgICAgICBlcmFzZUJvdHRvbURvb3Ioc2VlZC54LCBzZWVkLnkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGR1bmdlb24udGlsZXMuc2V0KHNlZWQueCwgc2VlZC55LCBFVGlsZXMuTEFEREVSKTtcclxuICAgICAgICAgICAgc2VlZC55ICsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZHVuZ2Vvbi5tYXAoICh0KSA9PiB0ID09PSBFVGlsZXMuU09MSUQgPyBFVGlsZXMuV0FMTCA6IHQgKTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIER1bmdlb24ge1xyXG4gICAgcHVibGljIHRpbGVzID0gbmV3IE1hcDJEPG51bWJlcj4oKTtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB3aWR0aDogbnVtYmVyLCBwdWJsaWMgaGVpZ2h0OiBudW1iZXIsIHB1YmxpYyBzZWVkOiBzdHJpbmcsIGluaXRpYWxpemVyOiAoeDogbnVtYmVyLCB5OiBudW1iZXIpID0+IG51bWJlciA9ICgpID0+IC0xKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3aWR0aDsgaSArKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGhlaWdodDsgaiArKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aWxlcy5zZXQoaSwgaiwgaW5pdGlhbGl6ZXIoaSwgaikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHBhaW50KHJvb206IFRlbXBsYXRlUm9vbSwgeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoeCA8IDAgfHwgeSA8IDAgfHwgeCArIHJvb20ud2lkdGggPiB0aGlzLndpZHRoIHx8IHkgKyByb29tLmhlaWdodCA+IHRoaXMuaGVpZ2h0KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb29tLndpZHRoOyBpICsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcm9vbS5oZWlnaHQ7IGogKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCB0aWxlID0gdGhpcy50aWxlcy5nZXQoeCArIGksIHkgKyBqKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aWxlID09PSB1bmRlZmluZWQgfHwgdGlsZSAhPT0gRVRpbGVzLlNPTElEKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb29tLndpZHRoOyBpICsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcm9vbS5oZWlnaHQ7IGogKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGlsZXMuc2V0KHggKyBpLCB5ICsgaiwgcm9vbS50aWxlcy5nZXQoaSwgaikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIG1hcChmbjogKHRpbGU6IG51bWJlciwgeDogbnVtYmVyLCB5OiBudW1iZXIsIGR1bmdlb246IHRoaXMpID0+IG51bWJlcik6IER1bmdlb24ge1xyXG4gICAgICAgIHJldHVybiBuZXcgRHVuZ2Vvbih0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgdGhpcy5zZWVkLCAoeCwgeSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gZm4odGhpcy50aWxlcy5nZXQoeCwgeSksIHgsIHksIHRoaXMpO1xyXG4gICAgICAgIH0gKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZnlTaHVmZmxlPFQ+KGFycjogVFtdLCBwcm5nOiBzZWVkcmFuZG9tLnBybmcpOiBUW10ge1xyXG4gICAgYXJyID0gYXJyLnNsaWNlKCk7XHJcbiAgICBmb3IgKGxldCBpID0gYXJyLmxlbmd0aCAtIDE7IGkgPiAwOyBpIC0tKSB7XHJcbiAgICAgICAgbGV0IHN3cCA9IE1hdGguZmxvb3IocHJuZygpICogKGkgKyAxKSk7XHJcbiAgICAgICAgbGV0IHRlbXAgPSBhcnJbaV07XHJcbiAgICAgICAgYXJyW2ldID0gYXJyW3N3cF07XHJcbiAgICAgICAgYXJyW3N3cF0gPSB0ZW1wO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFycjtcclxufSIsImV4cG9ydCBjbGFzcyBNYXAyRDxWPiB7XHJcblxyXG4gICAgcHJpdmF0ZSBkYXRhOiBWW10gPSBbXTtcclxuICAgIHNldChpOiBudW1iZXIsIGo6IG51bWJlciwgZGF0YTogVikge1xyXG4gICAgICAgIGlmIChpIDwgMCB8fCBqIDwgMCkgdGhyb3cgbmV3IEVycm9yKFwiTWFwMkQgaW5kZXggb3V0IG9mIGJvdW5kcy5cIik7XHJcbiAgICAgICAgdGhpcy5kYXRhW2NwZihpICsgMSwgaiArIDEpIC0gMV0gPSBkYXRhO1xyXG4gICAgfVxyXG4gICAgZ2V0KGk6IG51bWJlciwgajogbnVtYmVyKTogViB7XHJcbiAgICAgICAgaWYgKGkgPCAwIHx8IGogPCAwKSB0aHJvdyBuZXcgRXJyb3IoXCJNYXAyRCBpbmRleCBvdXQgb2YgYm91bmRzLlwiKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhW2NwZihpICsgMSwgaiArIDEpIC0gMV07XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNwZihpOiBudW1iZXIsIGo6IG51bWJlcikge1xyXG4gICAgcmV0dXJuICgoaSArIGogLSAyKSAqIChpICsgaiAtIDEpICsgaSkgLyAyO1xyXG59IiwiaW1wb3J0IHsgTWFwMkQgfSBmcm9tIFwiLi9NYXAyRFwiO1xyXG5cclxuZXhwb3J0IGVudW0gRGlyZWN0aW9uIHtcclxuICAgIFRPUCA9IDIsXHJcbiAgICBCT1RUT00gPSAzLFxyXG4gICAgTEVGVCA9IDQsXHJcbiAgICBSSUdIVCA9IDUsXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZVJvb20ge1xyXG4gICAgXHJcbiAgICBwdWJsaWMgd2lkdGg6IG51bWJlcjtcclxuICAgIHB1YmxpYyBoZWlnaHQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyB0aWxlcyA9IG5ldyBNYXAyRDxudW1iZXI+KCk7XHJcblxyXG4gICAgcHVibGljIGRvb3J3YXlzOiBudW1iZXJbXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGRhdGE6IG51bWJlcltdW10pIHtcclxuICAgICAgICB0aGlzLmRvb3J3YXlzW0RpcmVjdGlvbi5UT1BdICAgICAgICA9IC0xO1xyXG4gICAgICAgIHRoaXMuZG9vcndheXNbRGlyZWN0aW9uLkJPVFRPTV0gICAgID0gLTE7XHJcbiAgICAgICAgdGhpcy5kb29yd2F5c1tEaXJlY3Rpb24uTEVGVF0gICAgICAgPSAtMTtcclxuICAgICAgICB0aGlzLmRvb3J3YXlzW0RpcmVjdGlvbi5SSUdIVF0gICAgICA9IC0xO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSBkYXRhWzBdLmxlbmd0aDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IGRhdGEubGVuZ3RoO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy53aWR0aDsgaSArKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuaGVpZ2h0OyBqICsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbGVzLnNldChpLCBqLCBkYXRhW2pdW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLndpZHRoOyBpICsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbGVzLmdldChpLCAwKSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kb29yd2F5c1tEaXJlY3Rpb24uVE9QXSA9IGk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbGVzLnNldChpLCAwLCBEaXJlY3Rpb24uVE9QKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy50aWxlcy5nZXQoaSwgdGhpcy5oZWlnaHQgLSAxKSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kb29yd2F5c1tEaXJlY3Rpb24uQk9UVE9NXSA9IGk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbGVzLnNldChpLCB0aGlzLmhlaWdodCAtIDEsIERpcmVjdGlvbi5CT1RUT00pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5oZWlnaHQ7IGkgKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGlsZXMuZ2V0KDAsIGkpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRvb3J3YXlzW0RpcmVjdGlvbi5MRUZUXSA9IGk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbGVzLnNldCgwLCBpLCBEaXJlY3Rpb24uTEVGVCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMudGlsZXMuZ2V0KHRoaXMud2lkdGggLSAxLCBpKSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kb29yd2F5c1tEaXJlY3Rpb24uUklHSFRdID0gaTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGlsZXMuc2V0KHRoaXMud2lkdGggLSAxLCBpLCBEaXJlY3Rpb24uUklHSFQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0b1N0cmluZygpIHtcclxuICAgICAgICBsZXQgcmVwciA9IFwiXCI7XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmhlaWdodDsgaiArKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMud2lkdGg7IGkgKyspIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy50aWxlcy5nZXQoaSwgaikpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJlcHIgKz0gXCLilojilohcIjsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOiByZXByICs9IFwiXl5cIjsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOiByZXByICs9IFwidnZcIjsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OiByZXByICs9IFwiPDxcIjsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OiByZXByICs9IFwiPj5cIjsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogcmVwciArPSBcIiAgXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVwciArPSBcIlxcblwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVwcjtcclxuICAgIH1cclxufSIsImV4cG9ydCBjb25zdCB2ZW5uSW50ZXJzZWN0aW9uID0gPFQ+KGwxOiBUW10sIGwyOiBUW10sIHNvcnQ/OiAoYTogVCwgYjogVCkgPT4gbnVtYmVyKTogeyBsMTogVFtdLCBsMjogVFtdLCBib3RoOiBUW10gfSA9PiB7XHJcbiAgICBsMSA9IGwxLnNsaWNlKCkuc29ydChzb3J0KTtcclxuICAgIGwyID0gbDIuc2xpY2UoKS5zb3J0KHNvcnQpO1xyXG4gICAgaWYgKCFzb3J0KSBzb3J0ID0gKGEsIGIpID0+IGEgPCBiID8gLTEgOiBhID4gYiA/IDEgOiAwO1xyXG4gICAgbGV0IGwxZWxlbWVudHM6IFRbXSA9IFtdO1xyXG4gICAgbGV0IGwyZWxlbWVudHM6IFRbXSA9IFtdO1xyXG4gICAgbGV0IGJvdGg6IFRbXSA9IFtdO1xyXG4gICAgd2hpbGUobDEubGVuZ3RoICYmIGwyLmxlbmd0aCkge1xyXG4gICAgICAgIGxldCBvcmQgPSBzb3J0KGwxWzBdLCBsMlswXSk7XHJcbiAgICAgICAgaWYgKG9yZCA9PT0gMCkge1xyXG4gICAgICAgICAgICBib3RoLnB1c2gobDEuc2hpZnQoKSEpO1xyXG4gICAgICAgICAgICBsMi5zaGlmdCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAob3JkIDwgMSkge1xyXG4gICAgICAgICAgICBsMWVsZW1lbnRzLnB1c2gobDEuc2hpZnQoKSEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGwyZWxlbWVudHMucHVzaChsMi5zaGlmdCgpISk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBsMTogbDFlbGVtZW50cy5jb25jYXQobDEpLFxyXG4gICAgICAgIGwyOiBsMmVsZW1lbnRzLmNvbmNhdChsMiksXHJcbiAgICAgICAgYm90aCxcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IEtleXMgPSA8VD4ob2JqOiBUKTogKGtleW9mIFQpW10gPT4gT2JqZWN0LmtleXMob2JqKSBhcyAoa2V5b2YgVClbXTsiLCIvLyBBIGxpYnJhcnkgb2Ygc2VlZGFibGUgUk5HcyBpbXBsZW1lbnRlZCBpbiBKYXZhc2NyaXB0LlxuLy9cbi8vIFVzYWdlOlxuLy9cbi8vIHZhciBzZWVkcmFuZG9tID0gcmVxdWlyZSgnc2VlZHJhbmRvbScpO1xuLy8gdmFyIHJhbmRvbSA9IHNlZWRyYW5kb20oMSk7IC8vIG9yIGFueSBzZWVkLlxuLy8gdmFyIHggPSByYW5kb20oKTsgICAgICAgLy8gMCA8PSB4IDwgMS4gIEV2ZXJ5IGJpdCBpcyByYW5kb20uXG4vLyB2YXIgeCA9IHJhbmRvbS5xdWljaygpOyAvLyAwIDw9IHggPCAxLiAgMzIgYml0cyBvZiByYW5kb21uZXNzLlxuXG4vLyBhbGVhLCBhIDUzLWJpdCBtdWx0aXBseS13aXRoLWNhcnJ5IGdlbmVyYXRvciBieSBKb2hhbm5lcyBCYWFnw7hlLlxuLy8gUGVyaW9kOiB+Ml4xMTZcbi8vIFJlcG9ydGVkIHRvIHBhc3MgYWxsIEJpZ0NydXNoIHRlc3RzLlxudmFyIGFsZWEgPSByZXF1aXJlKCcuL2xpYi9hbGVhJyk7XG5cbi8vIHhvcjEyOCwgYSBwdXJlIHhvci1zaGlmdCBnZW5lcmF0b3IgYnkgR2VvcmdlIE1hcnNhZ2xpYS5cbi8vIFBlcmlvZDogMl4xMjgtMS5cbi8vIFJlcG9ydGVkIHRvIGZhaWw6IE1hdHJpeFJhbmsgYW5kIExpbmVhckNvbXAuXG52YXIgeG9yMTI4ID0gcmVxdWlyZSgnLi9saWIveG9yMTI4Jyk7XG5cbi8vIHhvcndvdywgR2VvcmdlIE1hcnNhZ2xpYSdzIDE2MC1iaXQgeG9yLXNoaWZ0IGNvbWJpbmVkIHBsdXMgd2V5bC5cbi8vIFBlcmlvZDogMl4xOTItMl4zMlxuLy8gUmVwb3J0ZWQgdG8gZmFpbDogQ29sbGlzaW9uT3ZlciwgU2ltcFBva2VyLCBhbmQgTGluZWFyQ29tcC5cbnZhciB4b3J3b3cgPSByZXF1aXJlKCcuL2xpYi94b3J3b3cnKTtcblxuLy8geG9yc2hpZnQ3LCBieSBGcmFuw6dvaXMgUGFubmV0b24gYW5kIFBpZXJyZSBMJ2VjdXllciwgdGFrZXNcbi8vIGEgZGlmZmVyZW50IGFwcHJvYWNoOiBpdCBhZGRzIHJvYnVzdG5lc3MgYnkgYWxsb3dpbmcgbW9yZSBzaGlmdHNcbi8vIHRoYW4gTWFyc2FnbGlhJ3Mgb3JpZ2luYWwgdGhyZWUuICBJdCBpcyBhIDctc2hpZnQgZ2VuZXJhdG9yXG4vLyB3aXRoIDI1NiBiaXRzLCB0aGF0IHBhc3NlcyBCaWdDcnVzaCB3aXRoIG5vIHN5c3RtYXRpYyBmYWlsdXJlcy5cbi8vIFBlcmlvZCAyXjI1Ni0xLlxuLy8gTm8gc3lzdGVtYXRpYyBCaWdDcnVzaCBmYWlsdXJlcyByZXBvcnRlZC5cbnZhciB4b3JzaGlmdDcgPSByZXF1aXJlKCcuL2xpYi94b3JzaGlmdDcnKTtcblxuLy8geG9yNDA5NiwgYnkgUmljaGFyZCBCcmVudCwgaXMgYSA0MDk2LWJpdCB4b3Itc2hpZnQgd2l0aCBhXG4vLyB2ZXJ5IGxvbmcgcGVyaW9kIHRoYXQgYWxzbyBhZGRzIGEgV2V5bCBnZW5lcmF0b3IuIEl0IGFsc28gcGFzc2VzXG4vLyBCaWdDcnVzaCB3aXRoIG5vIHN5c3RlbWF0aWMgZmFpbHVyZXMuICBJdHMgbG9uZyBwZXJpb2QgbWF5XG4vLyBiZSB1c2VmdWwgaWYgeW91IGhhdmUgbWFueSBnZW5lcmF0b3JzIGFuZCBuZWVkIHRvIGF2b2lkXG4vLyBjb2xsaXNpb25zLlxuLy8gUGVyaW9kOiAyXjQxMjgtMl4zMi5cbi8vIE5vIHN5c3RlbWF0aWMgQmlnQ3J1c2ggZmFpbHVyZXMgcmVwb3J0ZWQuXG52YXIgeG9yNDA5NiA9IHJlcXVpcmUoJy4vbGliL3hvcjQwOTYnKTtcblxuLy8gVHljaGUtaSwgYnkgU2FtdWVsIE5ldmVzIGFuZCBGaWxpcGUgQXJhdWpvLCBpcyBhIGJpdC1zaGlmdGluZyByYW5kb21cbi8vIG51bWJlciBnZW5lcmF0b3IgZGVyaXZlZCBmcm9tIENoYUNoYSwgYSBtb2Rlcm4gc3RyZWFtIGNpcGhlci5cbi8vIGh0dHBzOi8vZWRlbi5kZWkudWMucHQvfnNuZXZlcy9wdWJzLzIwMTEtc25mYTIucGRmXG4vLyBQZXJpb2Q6IH4yXjEyN1xuLy8gTm8gc3lzdGVtYXRpYyBCaWdDcnVzaCBmYWlsdXJlcyByZXBvcnRlZC5cbnZhciB0eWNoZWkgPSByZXF1aXJlKCcuL2xpYi90eWNoZWknKTtcblxuLy8gVGhlIG9yaWdpbmFsIEFSQzQtYmFzZWQgcHJuZyBpbmNsdWRlZCBpbiB0aGlzIGxpYnJhcnkuXG4vLyBQZXJpb2Q6IH4yXjE2MDBcbnZhciBzciA9IHJlcXVpcmUoJy4vc2VlZHJhbmRvbScpO1xuXG5zci5hbGVhID0gYWxlYTtcbnNyLnhvcjEyOCA9IHhvcjEyODtcbnNyLnhvcndvdyA9IHhvcndvdztcbnNyLnhvcnNoaWZ0NyA9IHhvcnNoaWZ0NztcbnNyLnhvcjQwOTYgPSB4b3I0MDk2O1xuc3IudHljaGVpID0gdHljaGVpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNyO1xuIiwiLy8gQSBwb3J0IG9mIGFuIGFsZ29yaXRobSBieSBKb2hhbm5lcyBCYWFnw7hlIDxiYWFnb2VAYmFhZ29lLmNvbT4sIDIwMTBcbi8vIGh0dHA6Ly9iYWFnb2UuY29tL2VuL1JhbmRvbU11c2luZ3MvamF2YXNjcmlwdC9cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9ucXVpbmxhbi9iZXR0ZXItcmFuZG9tLW51bWJlcnMtZm9yLWphdmFzY3JpcHQtbWlycm9yXG4vLyBPcmlnaW5hbCB3b3JrIGlzIHVuZGVyIE1JVCBsaWNlbnNlIC1cblxuLy8gQ29weXJpZ2h0IChDKSAyMDEwIGJ5IEpvaGFubmVzIEJhYWfDuGUgPGJhYWdvZUBiYWFnb2Uub3JnPlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vIFxuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy8gXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuXG5cbihmdW5jdGlvbihnbG9iYWwsIG1vZHVsZSwgZGVmaW5lKSB7XG5cbmZ1bmN0aW9uIEFsZWEoc2VlZCkge1xuICB2YXIgbWUgPSB0aGlzLCBtYXNoID0gTWFzaCgpO1xuXG4gIG1lLm5leHQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdCA9IDIwOTE2MzkgKiBtZS5zMCArIG1lLmMgKiAyLjMyODMwNjQzNjUzODY5NjNlLTEwOyAvLyAyXi0zMlxuICAgIG1lLnMwID0gbWUuczE7XG4gICAgbWUuczEgPSBtZS5zMjtcbiAgICByZXR1cm4gbWUuczIgPSB0IC0gKG1lLmMgPSB0IHwgMCk7XG4gIH07XG5cbiAgLy8gQXBwbHkgdGhlIHNlZWRpbmcgYWxnb3JpdGhtIGZyb20gQmFhZ29lLlxuICBtZS5jID0gMTtcbiAgbWUuczAgPSBtYXNoKCcgJyk7XG4gIG1lLnMxID0gbWFzaCgnICcpO1xuICBtZS5zMiA9IG1hc2goJyAnKTtcbiAgbWUuczAgLT0gbWFzaChzZWVkKTtcbiAgaWYgKG1lLnMwIDwgMCkgeyBtZS5zMCArPSAxOyB9XG4gIG1lLnMxIC09IG1hc2goc2VlZCk7XG4gIGlmIChtZS5zMSA8IDApIHsgbWUuczEgKz0gMTsgfVxuICBtZS5zMiAtPSBtYXNoKHNlZWQpO1xuICBpZiAobWUuczIgPCAwKSB7IG1lLnMyICs9IDE7IH1cbiAgbWFzaCA9IG51bGw7XG59XG5cbmZ1bmN0aW9uIGNvcHkoZiwgdCkge1xuICB0LmMgPSBmLmM7XG4gIHQuczAgPSBmLnMwO1xuICB0LnMxID0gZi5zMTtcbiAgdC5zMiA9IGYuczI7XG4gIHJldHVybiB0O1xufVxuXG5mdW5jdGlvbiBpbXBsKHNlZWQsIG9wdHMpIHtcbiAgdmFyIHhnID0gbmV3IEFsZWEoc2VlZCksXG4gICAgICBzdGF0ZSA9IG9wdHMgJiYgb3B0cy5zdGF0ZSxcbiAgICAgIHBybmcgPSB4Zy5uZXh0O1xuICBwcm5nLmludDMyID0gZnVuY3Rpb24oKSB7IHJldHVybiAoeGcubmV4dCgpICogMHgxMDAwMDAwMDApIHwgMDsgfVxuICBwcm5nLmRvdWJsZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBwcm5nKCkgKyAocHJuZygpICogMHgyMDAwMDAgfCAwKSAqIDEuMTEwMjIzMDI0NjI1MTU2NWUtMTY7IC8vIDJeLTUzXG4gIH07XG4gIHBybmcucXVpY2sgPSBwcm5nO1xuICBpZiAoc3RhdGUpIHtcbiAgICBpZiAodHlwZW9mKHN0YXRlKSA9PSAnb2JqZWN0JykgY29weShzdGF0ZSwgeGcpO1xuICAgIHBybmcuc3RhdGUgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvcHkoeGcsIHt9KTsgfVxuICB9XG4gIHJldHVybiBwcm5nO1xufVxuXG5mdW5jdGlvbiBNYXNoKCkge1xuICB2YXIgbiA9IDB4ZWZjODI0OWQ7XG5cbiAgdmFyIG1hc2ggPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgZGF0YSA9IGRhdGEudG9TdHJpbmcoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIG4gKz0gZGF0YS5jaGFyQ29kZUF0KGkpO1xuICAgICAgdmFyIGggPSAwLjAyNTE5NjAzMjgyNDE2OTM4ICogbjtcbiAgICAgIG4gPSBoID4+PiAwO1xuICAgICAgaCAtPSBuO1xuICAgICAgaCAqPSBuO1xuICAgICAgbiA9IGggPj4+IDA7XG4gICAgICBoIC09IG47XG4gICAgICBuICs9IGggKiAweDEwMDAwMDAwMDsgLy8gMl4zMlxuICAgIH1cbiAgICByZXR1cm4gKG4gPj4+IDApICogMi4zMjgzMDY0MzY1Mzg2OTYzZS0xMDsgLy8gMl4tMzJcbiAgfTtcblxuICByZXR1cm4gbWFzaDtcbn1cblxuXG5pZiAobW9kdWxlICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gaW1wbDtcbn0gZWxzZSBpZiAoZGVmaW5lICYmIGRlZmluZS5hbWQpIHtcbiAgZGVmaW5lKGZ1bmN0aW9uKCkgeyByZXR1cm4gaW1wbDsgfSk7XG59IGVsc2Uge1xuICB0aGlzLmFsZWEgPSBpbXBsO1xufVxuXG59KShcbiAgdGhpcyxcbiAgKHR5cGVvZiBtb2R1bGUpID09ICdvYmplY3QnICYmIG1vZHVsZSwgICAgLy8gcHJlc2VudCBpbiBub2RlLmpzXG4gICh0eXBlb2YgZGVmaW5lKSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZSAgIC8vIHByZXNlbnQgd2l0aCBhbiBBTUQgbG9hZGVyXG4pO1xuXG5cbiIsIi8vIEEgSmF2YXNjcmlwdCBpbXBsZW1lbnRhaW9uIG9mIHRoZSBcIlR5Y2hlLWlcIiBwcm5nIGFsZ29yaXRobSBieVxuLy8gU2FtdWVsIE5ldmVzIGFuZCBGaWxpcGUgQXJhdWpvLlxuLy8gU2VlIGh0dHBzOi8vZWRlbi5kZWkudWMucHQvfnNuZXZlcy9wdWJzLzIwMTEtc25mYTIucGRmXG5cbihmdW5jdGlvbihnbG9iYWwsIG1vZHVsZSwgZGVmaW5lKSB7XG5cbmZ1bmN0aW9uIFhvckdlbihzZWVkKSB7XG4gIHZhciBtZSA9IHRoaXMsIHN0cnNlZWQgPSAnJztcblxuICAvLyBTZXQgdXAgZ2VuZXJhdG9yIGZ1bmN0aW9uLlxuICBtZS5uZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGIgPSBtZS5iLCBjID0gbWUuYywgZCA9IG1lLmQsIGEgPSBtZS5hO1xuICAgIGIgPSAoYiA8PCAyNSkgXiAoYiA+Pj4gNykgXiBjO1xuICAgIGMgPSAoYyAtIGQpIHwgMDtcbiAgICBkID0gKGQgPDwgMjQpIF4gKGQgPj4+IDgpIF4gYTtcbiAgICBhID0gKGEgLSBiKSB8IDA7XG4gICAgbWUuYiA9IGIgPSAoYiA8PCAyMCkgXiAoYiA+Pj4gMTIpIF4gYztcbiAgICBtZS5jID0gYyA9IChjIC0gZCkgfCAwO1xuICAgIG1lLmQgPSAoZCA8PCAxNikgXiAoYyA+Pj4gMTYpIF4gYTtcbiAgICByZXR1cm4gbWUuYSA9IChhIC0gYikgfCAwO1xuICB9O1xuXG4gIC8qIFRoZSBmb2xsb3dpbmcgaXMgbm9uLWludmVydGVkIHR5Y2hlLCB3aGljaCBoYXMgYmV0dGVyIGludGVybmFsXG4gICAqIGJpdCBkaWZmdXNpb24sIGJ1dCB3aGljaCBpcyBhYm91dCAyNSUgc2xvd2VyIHRoYW4gdHljaGUtaSBpbiBKUy5cbiAgbWUubmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhID0gbWUuYSwgYiA9IG1lLmIsIGMgPSBtZS5jLCBkID0gbWUuZDtcbiAgICBhID0gKG1lLmEgKyBtZS5iIHwgMCkgPj4+IDA7XG4gICAgZCA9IG1lLmQgXiBhOyBkID0gZCA8PCAxNiBeIGQgPj4+IDE2O1xuICAgIGMgPSBtZS5jICsgZCB8IDA7XG4gICAgYiA9IG1lLmIgXiBjOyBiID0gYiA8PCAxMiBeIGQgPj4+IDIwO1xuICAgIG1lLmEgPSBhID0gYSArIGIgfCAwO1xuICAgIGQgPSBkIF4gYTsgbWUuZCA9IGQgPSBkIDw8IDggXiBkID4+PiAyNDtcbiAgICBtZS5jID0gYyA9IGMgKyBkIHwgMDtcbiAgICBiID0gYiBeIGM7XG4gICAgcmV0dXJuIG1lLmIgPSAoYiA8PCA3IF4gYiA+Pj4gMjUpO1xuICB9XG4gICovXG5cbiAgbWUuYSA9IDA7XG4gIG1lLmIgPSAwO1xuICBtZS5jID0gMjY1NDQzNTc2OSB8IDA7XG4gIG1lLmQgPSAxMzY3MTMwNTUxO1xuXG4gIGlmIChzZWVkID09PSBNYXRoLmZsb29yKHNlZWQpKSB7XG4gICAgLy8gSW50ZWdlciBzZWVkLlxuICAgIG1lLmEgPSAoc2VlZCAvIDB4MTAwMDAwMDAwKSB8IDA7XG4gICAgbWUuYiA9IHNlZWQgfCAwO1xuICB9IGVsc2Uge1xuICAgIC8vIFN0cmluZyBzZWVkLlxuICAgIHN0cnNlZWQgKz0gc2VlZDtcbiAgfVxuXG4gIC8vIE1peCBpbiBzdHJpbmcgc2VlZCwgdGhlbiBkaXNjYXJkIGFuIGluaXRpYWwgYmF0Y2ggb2YgNjQgdmFsdWVzLlxuICBmb3IgKHZhciBrID0gMDsgayA8IHN0cnNlZWQubGVuZ3RoICsgMjA7IGsrKykge1xuICAgIG1lLmIgXj0gc3Ryc2VlZC5jaGFyQ29kZUF0KGspIHwgMDtcbiAgICBtZS5uZXh0KCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY29weShmLCB0KSB7XG4gIHQuYSA9IGYuYTtcbiAgdC5iID0gZi5iO1xuICB0LmMgPSBmLmM7XG4gIHQuZCA9IGYuZDtcbiAgcmV0dXJuIHQ7XG59O1xuXG5mdW5jdGlvbiBpbXBsKHNlZWQsIG9wdHMpIHtcbiAgdmFyIHhnID0gbmV3IFhvckdlbihzZWVkKSxcbiAgICAgIHN0YXRlID0gb3B0cyAmJiBvcHRzLnN0YXRlLFxuICAgICAgcHJuZyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gKHhnLm5leHQoKSA+Pj4gMCkgLyAweDEwMDAwMDAwMDsgfTtcbiAgcHJuZy5kb3VibGUgPSBmdW5jdGlvbigpIHtcbiAgICBkbyB7XG4gICAgICB2YXIgdG9wID0geGcubmV4dCgpID4+PiAxMSxcbiAgICAgICAgICBib3QgPSAoeGcubmV4dCgpID4+PiAwKSAvIDB4MTAwMDAwMDAwLFxuICAgICAgICAgIHJlc3VsdCA9ICh0b3AgKyBib3QpIC8gKDEgPDwgMjEpO1xuICAgIH0gd2hpbGUgKHJlc3VsdCA9PT0gMCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbiAgcHJuZy5pbnQzMiA9IHhnLm5leHQ7XG4gIHBybmcucXVpY2sgPSBwcm5nO1xuICBpZiAoc3RhdGUpIHtcbiAgICBpZiAodHlwZW9mKHN0YXRlKSA9PSAnb2JqZWN0JykgY29weShzdGF0ZSwgeGcpO1xuICAgIHBybmcuc3RhdGUgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvcHkoeGcsIHt9KTsgfVxuICB9XG4gIHJldHVybiBwcm5nO1xufVxuXG5pZiAobW9kdWxlICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gaW1wbDtcbn0gZWxzZSBpZiAoZGVmaW5lICYmIGRlZmluZS5hbWQpIHtcbiAgZGVmaW5lKGZ1bmN0aW9uKCkgeyByZXR1cm4gaW1wbDsgfSk7XG59IGVsc2Uge1xuICB0aGlzLnR5Y2hlaSA9IGltcGw7XG59XG5cbn0pKFxuICB0aGlzLFxuICAodHlwZW9mIG1vZHVsZSkgPT0gJ29iamVjdCcgJiYgbW9kdWxlLCAgICAvLyBwcmVzZW50IGluIG5vZGUuanNcbiAgKHR5cGVvZiBkZWZpbmUpID09ICdmdW5jdGlvbicgJiYgZGVmaW5lICAgLy8gcHJlc2VudCB3aXRoIGFuIEFNRCBsb2FkZXJcbik7XG5cblxuIiwiLy8gQSBKYXZhc2NyaXB0IGltcGxlbWVudGFpb24gb2YgdGhlIFwieG9yMTI4XCIgcHJuZyBhbGdvcml0aG0gYnlcbi8vIEdlb3JnZSBNYXJzYWdsaWEuICBTZWUgaHR0cDovL3d3dy5qc3RhdHNvZnQub3JnL3YwOC9pMTQvcGFwZXJcblxuKGZ1bmN0aW9uKGdsb2JhbCwgbW9kdWxlLCBkZWZpbmUpIHtcblxuZnVuY3Rpb24gWG9yR2VuKHNlZWQpIHtcbiAgdmFyIG1lID0gdGhpcywgc3Ryc2VlZCA9ICcnO1xuXG4gIG1lLnggPSAwO1xuICBtZS55ID0gMDtcbiAgbWUueiA9IDA7XG4gIG1lLncgPSAwO1xuXG4gIC8vIFNldCB1cCBnZW5lcmF0b3IgZnVuY3Rpb24uXG4gIG1lLm5leHQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdCA9IG1lLnggXiAobWUueCA8PCAxMSk7XG4gICAgbWUueCA9IG1lLnk7XG4gICAgbWUueSA9IG1lLno7XG4gICAgbWUueiA9IG1lLnc7XG4gICAgcmV0dXJuIG1lLncgXj0gKG1lLncgPj4+IDE5KSBeIHQgXiAodCA+Pj4gOCk7XG4gIH07XG5cbiAgaWYgKHNlZWQgPT09IChzZWVkIHwgMCkpIHtcbiAgICAvLyBJbnRlZ2VyIHNlZWQuXG4gICAgbWUueCA9IHNlZWQ7XG4gIH0gZWxzZSB7XG4gICAgLy8gU3RyaW5nIHNlZWQuXG4gICAgc3Ryc2VlZCArPSBzZWVkO1xuICB9XG5cbiAgLy8gTWl4IGluIHN0cmluZyBzZWVkLCB0aGVuIGRpc2NhcmQgYW4gaW5pdGlhbCBiYXRjaCBvZiA2NCB2YWx1ZXMuXG4gIGZvciAodmFyIGsgPSAwOyBrIDwgc3Ryc2VlZC5sZW5ndGggKyA2NDsgaysrKSB7XG4gICAgbWUueCBePSBzdHJzZWVkLmNoYXJDb2RlQXQoaykgfCAwO1xuICAgIG1lLm5leHQoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjb3B5KGYsIHQpIHtcbiAgdC54ID0gZi54O1xuICB0LnkgPSBmLnk7XG4gIHQueiA9IGYuejtcbiAgdC53ID0gZi53O1xuICByZXR1cm4gdDtcbn1cblxuZnVuY3Rpb24gaW1wbChzZWVkLCBvcHRzKSB7XG4gIHZhciB4ZyA9IG5ldyBYb3JHZW4oc2VlZCksXG4gICAgICBzdGF0ZSA9IG9wdHMgJiYgb3B0cy5zdGF0ZSxcbiAgICAgIHBybmcgPSBmdW5jdGlvbigpIHsgcmV0dXJuICh4Zy5uZXh0KCkgPj4+IDApIC8gMHgxMDAwMDAwMDA7IH07XG4gIHBybmcuZG91YmxlID0gZnVuY3Rpb24oKSB7XG4gICAgZG8ge1xuICAgICAgdmFyIHRvcCA9IHhnLm5leHQoKSA+Pj4gMTEsXG4gICAgICAgICAgYm90ID0gKHhnLm5leHQoKSA+Pj4gMCkgLyAweDEwMDAwMDAwMCxcbiAgICAgICAgICByZXN1bHQgPSAodG9wICsgYm90KSAvICgxIDw8IDIxKTtcbiAgICB9IHdoaWxlIChyZXN1bHQgPT09IDApO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIHBybmcuaW50MzIgPSB4Zy5uZXh0O1xuICBwcm5nLnF1aWNrID0gcHJuZztcbiAgaWYgKHN0YXRlKSB7XG4gICAgaWYgKHR5cGVvZihzdGF0ZSkgPT0gJ29iamVjdCcpIGNvcHkoc3RhdGUsIHhnKTtcbiAgICBwcm5nLnN0YXRlID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb3B5KHhnLCB7fSk7IH1cbiAgfVxuICByZXR1cm4gcHJuZztcbn1cblxuaWYgKG1vZHVsZSAmJiBtb2R1bGUuZXhwb3J0cykge1xuICBtb2R1bGUuZXhwb3J0cyA9IGltcGw7XG59IGVsc2UgaWYgKGRlZmluZSAmJiBkZWZpbmUuYW1kKSB7XG4gIGRlZmluZShmdW5jdGlvbigpIHsgcmV0dXJuIGltcGw7IH0pO1xufSBlbHNlIHtcbiAgdGhpcy54b3IxMjggPSBpbXBsO1xufVxuXG59KShcbiAgdGhpcyxcbiAgKHR5cGVvZiBtb2R1bGUpID09ICdvYmplY3QnICYmIG1vZHVsZSwgICAgLy8gcHJlc2VudCBpbiBub2RlLmpzXG4gICh0eXBlb2YgZGVmaW5lKSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZSAgIC8vIHByZXNlbnQgd2l0aCBhbiBBTUQgbG9hZGVyXG4pO1xuXG5cbiIsIi8vIEEgSmF2YXNjcmlwdCBpbXBsZW1lbnRhaW9uIG9mIFJpY2hhcmQgQnJlbnQncyBYb3JnZW5zIHhvcjQwOTYgYWxnb3JpdGhtLlxuLy9cbi8vIFRoaXMgZmFzdCBub24tY3J5cHRvZ3JhcGhpYyByYW5kb20gbnVtYmVyIGdlbmVyYXRvciBpcyBkZXNpZ25lZCBmb3Jcbi8vIHVzZSBpbiBNb250ZS1DYXJsbyBhbGdvcml0aG1zLiBJdCBjb21iaW5lcyBhIGxvbmctcGVyaW9kIHhvcnNoaWZ0XG4vLyBnZW5lcmF0b3Igd2l0aCBhIFdleWwgZ2VuZXJhdG9yLCBhbmQgaXQgcGFzc2VzIGFsbCBjb21tb24gYmF0dGVyaWVzXG4vLyBvZiBzdGFzdGljaWFsIHRlc3RzIGZvciByYW5kb21uZXNzIHdoaWxlIGNvbnN1bWluZyBvbmx5IGEgZmV3IG5hbm9zZWNvbmRzXG4vLyBmb3IgZWFjaCBwcm5nIGdlbmVyYXRlZC4gIEZvciBiYWNrZ3JvdW5kIG9uIHRoZSBnZW5lcmF0b3IsIHNlZSBCcmVudCdzXG4vLyBwYXBlcjogXCJTb21lIGxvbmctcGVyaW9kIHJhbmRvbSBudW1iZXIgZ2VuZXJhdG9ycyB1c2luZyBzaGlmdHMgYW5kIHhvcnMuXCJcbi8vIGh0dHA6Ly9hcnhpdi5vcmcvcGRmLzEwMDQuMzExNXYxLnBkZlxuLy9cbi8vIFVzYWdlOlxuLy9cbi8vIHZhciB4b3I0MDk2ID0gcmVxdWlyZSgneG9yNDA5NicpO1xuLy8gcmFuZG9tID0geG9yNDA5NigxKTsgICAgICAgICAgICAgICAgICAgICAgICAvLyBTZWVkIHdpdGggaW50MzIgb3Igc3RyaW5nLlxuLy8gYXNzZXJ0LmVxdWFsKHJhbmRvbSgpLCAwLjE1MjA0MzY0NTA1Mzg1NDcpOyAvLyAoMCwgMSkgcmFuZ2UsIDUzIGJpdHMuXG4vLyBhc3NlcnQuZXF1YWwocmFuZG9tLmludDMyKCksIDE4MDY1MzQ4OTcpOyAgIC8vIHNpZ25lZCBpbnQzMiwgMzIgYml0cy5cbi8vXG4vLyBGb3Igbm9uemVybyBudW1lcmljIGtleXMsIHRoaXMgaW1wZWxlbWVudGF0aW9uIHByb3ZpZGVzIGEgc2VxdWVuY2Vcbi8vIGlkZW50aWNhbCB0byB0aGF0IGJ5IEJyZW50J3MgeG9yZ2VucyAzIGltcGxlbWVudGFpb24gaW4gQy4gIFRoaXNcbi8vIGltcGxlbWVudGF0aW9uIGFsc28gcHJvdmlkZXMgZm9yIGluaXRhbGl6aW5nIHRoZSBnZW5lcmF0b3Igd2l0aFxuLy8gc3RyaW5nIHNlZWRzLCBvciBmb3Igc2F2aW5nIGFuZCByZXN0b3JpbmcgdGhlIHN0YXRlIG9mIHRoZSBnZW5lcmF0b3IuXG4vL1xuLy8gT24gQ2hyb21lLCB0aGlzIHBybmcgYmVuY2htYXJrcyBhYm91dCAyLjEgdGltZXMgc2xvd2VyIHRoYW5cbi8vIEphdmFzY3JpcHQncyBidWlsdC1pbiBNYXRoLnJhbmRvbSgpLlxuXG4oZnVuY3Rpb24oZ2xvYmFsLCBtb2R1bGUsIGRlZmluZSkge1xuXG5mdW5jdGlvbiBYb3JHZW4oc2VlZCkge1xuICB2YXIgbWUgPSB0aGlzO1xuXG4gIC8vIFNldCB1cCBnZW5lcmF0b3IgZnVuY3Rpb24uXG4gIG1lLm5leHQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdyA9IG1lLncsXG4gICAgICAgIFggPSBtZS5YLCBpID0gbWUuaSwgdCwgdjtcbiAgICAvLyBVcGRhdGUgV2V5bCBnZW5lcmF0b3IuXG4gICAgbWUudyA9IHcgPSAodyArIDB4NjFjODg2NDcpIHwgMDtcbiAgICAvLyBVcGRhdGUgeG9yIGdlbmVyYXRvci5cbiAgICB2ID0gWFsoaSArIDM0KSAmIDEyN107XG4gICAgdCA9IFhbaSA9ICgoaSArIDEpICYgMTI3KV07XG4gICAgdiBePSB2IDw8IDEzO1xuICAgIHQgXj0gdCA8PCAxNztcbiAgICB2IF49IHYgPj4+IDE1O1xuICAgIHQgXj0gdCA+Pj4gMTI7XG4gICAgLy8gVXBkYXRlIFhvciBnZW5lcmF0b3IgYXJyYXkgc3RhdGUuXG4gICAgdiA9IFhbaV0gPSB2IF4gdDtcbiAgICBtZS5pID0gaTtcbiAgICAvLyBSZXN1bHQgaXMgdGhlIGNvbWJpbmF0aW9uLlxuICAgIHJldHVybiAodiArICh3IF4gKHcgPj4+IDE2KSkpIHwgMDtcbiAgfTtcblxuICBmdW5jdGlvbiBpbml0KG1lLCBzZWVkKSB7XG4gICAgdmFyIHQsIHYsIGksIGosIHcsIFggPSBbXSwgbGltaXQgPSAxMjg7XG4gICAgaWYgKHNlZWQgPT09IChzZWVkIHwgMCkpIHtcbiAgICAgIC8vIE51bWVyaWMgc2VlZHMgaW5pdGlhbGl6ZSB2LCB3aGljaCBpcyB1c2VkIHRvIGdlbmVyYXRlcyBYLlxuICAgICAgdiA9IHNlZWQ7XG4gICAgICBzZWVkID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU3RyaW5nIHNlZWRzIGFyZSBtaXhlZCBpbnRvIHYgYW5kIFggb25lIGNoYXJhY3RlciBhdCBhIHRpbWUuXG4gICAgICBzZWVkID0gc2VlZCArICdcXDAnO1xuICAgICAgdiA9IDA7XG4gICAgICBsaW1pdCA9IE1hdGgubWF4KGxpbWl0LCBzZWVkLmxlbmd0aCk7XG4gICAgfVxuICAgIC8vIEluaXRpYWxpemUgY2lyY3VsYXIgYXJyYXkgYW5kIHdleWwgdmFsdWUuXG4gICAgZm9yIChpID0gMCwgaiA9IC0zMjsgaiA8IGxpbWl0OyArK2opIHtcbiAgICAgIC8vIFB1dCB0aGUgdW5pY29kZSBjaGFyYWN0ZXJzIGludG8gdGhlIGFycmF5LCBhbmQgc2h1ZmZsZSB0aGVtLlxuICAgICAgaWYgKHNlZWQpIHYgXj0gc2VlZC5jaGFyQ29kZUF0KChqICsgMzIpICUgc2VlZC5sZW5ndGgpO1xuICAgICAgLy8gQWZ0ZXIgMzIgc2h1ZmZsZXMsIHRha2UgdiBhcyB0aGUgc3RhcnRpbmcgdyB2YWx1ZS5cbiAgICAgIGlmIChqID09PSAwKSB3ID0gdjtcbiAgICAgIHYgXj0gdiA8PCAxMDtcbiAgICAgIHYgXj0gdiA+Pj4gMTU7XG4gICAgICB2IF49IHYgPDwgNDtcbiAgICAgIHYgXj0gdiA+Pj4gMTM7XG4gICAgICBpZiAoaiA+PSAwKSB7XG4gICAgICAgIHcgPSAodyArIDB4NjFjODg2NDcpIHwgMDsgICAgIC8vIFdleWwuXG4gICAgICAgIHQgPSAoWFtqICYgMTI3XSBePSAodiArIHcpKTsgIC8vIENvbWJpbmUgeG9yIGFuZCB3ZXlsIHRvIGluaXQgYXJyYXkuXG4gICAgICAgIGkgPSAoMCA9PSB0KSA/IGkgKyAxIDogMDsgICAgIC8vIENvdW50IHplcm9lcy5cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gV2UgaGF2ZSBkZXRlY3RlZCBhbGwgemVyb2VzOyBtYWtlIHRoZSBrZXkgbm9uemVyby5cbiAgICBpZiAoaSA+PSAxMjgpIHtcbiAgICAgIFhbKHNlZWQgJiYgc2VlZC5sZW5ndGggfHwgMCkgJiAxMjddID0gLTE7XG4gICAgfVxuICAgIC8vIFJ1biB0aGUgZ2VuZXJhdG9yIDUxMiB0aW1lcyB0byBmdXJ0aGVyIG1peCB0aGUgc3RhdGUgYmVmb3JlIHVzaW5nIGl0LlxuICAgIC8vIEZhY3RvcmluZyB0aGlzIGFzIGEgZnVuY3Rpb24gc2xvd3MgdGhlIG1haW4gZ2VuZXJhdG9yLCBzbyBpdCBpcyBqdXN0XG4gICAgLy8gdW5yb2xsZWQgaGVyZS4gIFRoZSB3ZXlsIGdlbmVyYXRvciBpcyBub3QgYWR2YW5jZWQgd2hpbGUgd2FybWluZyB1cC5cbiAgICBpID0gMTI3O1xuICAgIGZvciAoaiA9IDQgKiAxMjg7IGogPiAwOyAtLWopIHtcbiAgICAgIHYgPSBYWyhpICsgMzQpICYgMTI3XTtcbiAgICAgIHQgPSBYW2kgPSAoKGkgKyAxKSAmIDEyNyldO1xuICAgICAgdiBePSB2IDw8IDEzO1xuICAgICAgdCBePSB0IDw8IDE3O1xuICAgICAgdiBePSB2ID4+PiAxNTtcbiAgICAgIHQgXj0gdCA+Pj4gMTI7XG4gICAgICBYW2ldID0gdiBeIHQ7XG4gICAgfVxuICAgIC8vIFN0b3Jpbmcgc3RhdGUgYXMgb2JqZWN0IG1lbWJlcnMgaXMgZmFzdGVyIHRoYW4gdXNpbmcgY2xvc3VyZSB2YXJpYWJsZXMuXG4gICAgbWUudyA9IHc7XG4gICAgbWUuWCA9IFg7XG4gICAgbWUuaSA9IGk7XG4gIH1cblxuICBpbml0KG1lLCBzZWVkKTtcbn1cblxuZnVuY3Rpb24gY29weShmLCB0KSB7XG4gIHQuaSA9IGYuaTtcbiAgdC53ID0gZi53O1xuICB0LlggPSBmLlguc2xpY2UoKTtcbiAgcmV0dXJuIHQ7XG59O1xuXG5mdW5jdGlvbiBpbXBsKHNlZWQsIG9wdHMpIHtcbiAgaWYgKHNlZWQgPT0gbnVsbCkgc2VlZCA9ICsobmV3IERhdGUpO1xuICB2YXIgeGcgPSBuZXcgWG9yR2VuKHNlZWQpLFxuICAgICAgc3RhdGUgPSBvcHRzICYmIG9wdHMuc3RhdGUsXG4gICAgICBwcm5nID0gZnVuY3Rpb24oKSB7IHJldHVybiAoeGcubmV4dCgpID4+PiAwKSAvIDB4MTAwMDAwMDAwOyB9O1xuICBwcm5nLmRvdWJsZSA9IGZ1bmN0aW9uKCkge1xuICAgIGRvIHtcbiAgICAgIHZhciB0b3AgPSB4Zy5uZXh0KCkgPj4+IDExLFxuICAgICAgICAgIGJvdCA9ICh4Zy5uZXh0KCkgPj4+IDApIC8gMHgxMDAwMDAwMDAsXG4gICAgICAgICAgcmVzdWx0ID0gKHRvcCArIGJvdCkgLyAoMSA8PCAyMSk7XG4gICAgfSB3aGlsZSAocmVzdWx0ID09PSAwKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICBwcm5nLmludDMyID0geGcubmV4dDtcbiAgcHJuZy5xdWljayA9IHBybmc7XG4gIGlmIChzdGF0ZSkge1xuICAgIGlmIChzdGF0ZS5YKSBjb3B5KHN0YXRlLCB4Zyk7XG4gICAgcHJuZy5zdGF0ZSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29weSh4Zywge30pOyB9XG4gIH1cbiAgcmV0dXJuIHBybmc7XG59XG5cbmlmIChtb2R1bGUgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBpbXBsO1xufSBlbHNlIGlmIChkZWZpbmUgJiYgZGVmaW5lLmFtZCkge1xuICBkZWZpbmUoZnVuY3Rpb24oKSB7IHJldHVybiBpbXBsOyB9KTtcbn0gZWxzZSB7XG4gIHRoaXMueG9yNDA5NiA9IGltcGw7XG59XG5cbn0pKFxuICB0aGlzLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3aW5kb3cgb2JqZWN0IG9yIGdsb2JhbFxuICAodHlwZW9mIG1vZHVsZSkgPT0gJ29iamVjdCcgJiYgbW9kdWxlLCAgICAvLyBwcmVzZW50IGluIG5vZGUuanNcbiAgKHR5cGVvZiBkZWZpbmUpID09ICdmdW5jdGlvbicgJiYgZGVmaW5lICAgLy8gcHJlc2VudCB3aXRoIGFuIEFNRCBsb2FkZXJcbik7XG4iLCIvLyBBIEphdmFzY3JpcHQgaW1wbGVtZW50YWlvbiBvZiB0aGUgXCJ4b3JzaGlmdDdcIiBhbGdvcml0aG0gYnlcbi8vIEZyYW7Dp29pcyBQYW5uZXRvbiBhbmQgUGllcnJlIEwnZWN1eWVyOlxuLy8gXCJPbiB0aGUgWG9yZ3NoaWZ0IFJhbmRvbSBOdW1iZXIgR2VuZXJhdG9yc1wiXG4vLyBodHRwOi8vc2FsdWMuZW5nci51Y29ubi5lZHUvcmVmcy9jcnlwdG8vcm5nL3Bhbm5ldG9uMDVvbnRoZXhvcnNoaWZ0LnBkZlxuXG4oZnVuY3Rpb24oZ2xvYmFsLCBtb2R1bGUsIGRlZmluZSkge1xuXG5mdW5jdGlvbiBYb3JHZW4oc2VlZCkge1xuICB2YXIgbWUgPSB0aGlzO1xuXG4gIC8vIFNldCB1cCBnZW5lcmF0b3IgZnVuY3Rpb24uXG4gIG1lLm5leHQgPSBmdW5jdGlvbigpIHtcbiAgICAvLyBVcGRhdGUgeG9yIGdlbmVyYXRvci5cbiAgICB2YXIgWCA9IG1lLngsIGkgPSBtZS5pLCB0LCB2LCB3O1xuICAgIHQgPSBYW2ldOyB0IF49ICh0ID4+PiA3KTsgdiA9IHQgXiAodCA8PCAyNCk7XG4gICAgdCA9IFhbKGkgKyAxKSAmIDddOyB2IF49IHQgXiAodCA+Pj4gMTApO1xuICAgIHQgPSBYWyhpICsgMykgJiA3XTsgdiBePSB0IF4gKHQgPj4+IDMpO1xuICAgIHQgPSBYWyhpICsgNCkgJiA3XTsgdiBePSB0IF4gKHQgPDwgNyk7XG4gICAgdCA9IFhbKGkgKyA3KSAmIDddOyB0ID0gdCBeICh0IDw8IDEzKTsgdiBePSB0IF4gKHQgPDwgOSk7XG4gICAgWFtpXSA9IHY7XG4gICAgbWUuaSA9IChpICsgMSkgJiA3O1xuICAgIHJldHVybiB2O1xuICB9O1xuXG4gIGZ1bmN0aW9uIGluaXQobWUsIHNlZWQpIHtcbiAgICB2YXIgaiwgdywgWCA9IFtdO1xuXG4gICAgaWYgKHNlZWQgPT09IChzZWVkIHwgMCkpIHtcbiAgICAgIC8vIFNlZWQgc3RhdGUgYXJyYXkgdXNpbmcgYSAzMi1iaXQgaW50ZWdlci5cbiAgICAgIHcgPSBYWzBdID0gc2VlZDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU2VlZCBzdGF0ZSB1c2luZyBhIHN0cmluZy5cbiAgICAgIHNlZWQgPSAnJyArIHNlZWQ7XG4gICAgICBmb3IgKGogPSAwOyBqIDwgc2VlZC5sZW5ndGg7ICsraikge1xuICAgICAgICBYW2ogJiA3XSA9IChYW2ogJiA3XSA8PCAxNSkgXlxuICAgICAgICAgICAgKHNlZWQuY2hhckNvZGVBdChqKSArIFhbKGogKyAxKSAmIDddIDw8IDEzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gRW5mb3JjZSBhbiBhcnJheSBsZW5ndGggb2YgOCwgbm90IGFsbCB6ZXJvZXMuXG4gICAgd2hpbGUgKFgubGVuZ3RoIDwgOCkgWC5wdXNoKDApO1xuICAgIGZvciAoaiA9IDA7IGogPCA4ICYmIFhbal0gPT09IDA7ICsraik7XG4gICAgaWYgKGogPT0gOCkgdyA9IFhbN10gPSAtMTsgZWxzZSB3ID0gWFtqXTtcblxuICAgIG1lLnggPSBYO1xuICAgIG1lLmkgPSAwO1xuXG4gICAgLy8gRGlzY2FyZCBhbiBpbml0aWFsIDI1NiB2YWx1ZXMuXG4gICAgZm9yIChqID0gMjU2OyBqID4gMDsgLS1qKSB7XG4gICAgICBtZS5uZXh0KCk7XG4gICAgfVxuICB9XG5cbiAgaW5pdChtZSwgc2VlZCk7XG59XG5cbmZ1bmN0aW9uIGNvcHkoZiwgdCkge1xuICB0LnggPSBmLnguc2xpY2UoKTtcbiAgdC5pID0gZi5pO1xuICByZXR1cm4gdDtcbn1cblxuZnVuY3Rpb24gaW1wbChzZWVkLCBvcHRzKSB7XG4gIGlmIChzZWVkID09IG51bGwpIHNlZWQgPSArKG5ldyBEYXRlKTtcbiAgdmFyIHhnID0gbmV3IFhvckdlbihzZWVkKSxcbiAgICAgIHN0YXRlID0gb3B0cyAmJiBvcHRzLnN0YXRlLFxuICAgICAgcHJuZyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gKHhnLm5leHQoKSA+Pj4gMCkgLyAweDEwMDAwMDAwMDsgfTtcbiAgcHJuZy5kb3VibGUgPSBmdW5jdGlvbigpIHtcbiAgICBkbyB7XG4gICAgICB2YXIgdG9wID0geGcubmV4dCgpID4+PiAxMSxcbiAgICAgICAgICBib3QgPSAoeGcubmV4dCgpID4+PiAwKSAvIDB4MTAwMDAwMDAwLFxuICAgICAgICAgIHJlc3VsdCA9ICh0b3AgKyBib3QpIC8gKDEgPDwgMjEpO1xuICAgIH0gd2hpbGUgKHJlc3VsdCA9PT0gMCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbiAgcHJuZy5pbnQzMiA9IHhnLm5leHQ7XG4gIHBybmcucXVpY2sgPSBwcm5nO1xuICBpZiAoc3RhdGUpIHtcbiAgICBpZiAoc3RhdGUueCkgY29weShzdGF0ZSwgeGcpO1xuICAgIHBybmcuc3RhdGUgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvcHkoeGcsIHt9KTsgfVxuICB9XG4gIHJldHVybiBwcm5nO1xufVxuXG5pZiAobW9kdWxlICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gaW1wbDtcbn0gZWxzZSBpZiAoZGVmaW5lICYmIGRlZmluZS5hbWQpIHtcbiAgZGVmaW5lKGZ1bmN0aW9uKCkgeyByZXR1cm4gaW1wbDsgfSk7XG59IGVsc2Uge1xuICB0aGlzLnhvcnNoaWZ0NyA9IGltcGw7XG59XG5cbn0pKFxuICB0aGlzLFxuICAodHlwZW9mIG1vZHVsZSkgPT0gJ29iamVjdCcgJiYgbW9kdWxlLCAgICAvLyBwcmVzZW50IGluIG5vZGUuanNcbiAgKHR5cGVvZiBkZWZpbmUpID09ICdmdW5jdGlvbicgJiYgZGVmaW5lICAgLy8gcHJlc2VudCB3aXRoIGFuIEFNRCBsb2FkZXJcbik7XG5cbiIsIi8vIEEgSmF2YXNjcmlwdCBpbXBsZW1lbnRhaW9uIG9mIHRoZSBcInhvcndvd1wiIHBybmcgYWxnb3JpdGhtIGJ5XG4vLyBHZW9yZ2UgTWFyc2FnbGlhLiAgU2VlIGh0dHA6Ly93d3cuanN0YXRzb2Z0Lm9yZy92MDgvaTE0L3BhcGVyXG5cbihmdW5jdGlvbihnbG9iYWwsIG1vZHVsZSwgZGVmaW5lKSB7XG5cbmZ1bmN0aW9uIFhvckdlbihzZWVkKSB7XG4gIHZhciBtZSA9IHRoaXMsIHN0cnNlZWQgPSAnJztcblxuICAvLyBTZXQgdXAgZ2VuZXJhdG9yIGZ1bmN0aW9uLlxuICBtZS5uZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHQgPSAobWUueCBeIChtZS54ID4+PiAyKSk7XG4gICAgbWUueCA9IG1lLnk7IG1lLnkgPSBtZS56OyBtZS56ID0gbWUudzsgbWUudyA9IG1lLnY7XG4gICAgcmV0dXJuIChtZS5kID0gKG1lLmQgKyAzNjI0MzcgfCAwKSkgK1xuICAgICAgIChtZS52ID0gKG1lLnYgXiAobWUudiA8PCA0KSkgXiAodCBeICh0IDw8IDEpKSkgfCAwO1xuICB9O1xuXG4gIG1lLnggPSAwO1xuICBtZS55ID0gMDtcbiAgbWUueiA9IDA7XG4gIG1lLncgPSAwO1xuICBtZS52ID0gMDtcblxuICBpZiAoc2VlZCA9PT0gKHNlZWQgfCAwKSkge1xuICAgIC8vIEludGVnZXIgc2VlZC5cbiAgICBtZS54ID0gc2VlZDtcbiAgfSBlbHNlIHtcbiAgICAvLyBTdHJpbmcgc2VlZC5cbiAgICBzdHJzZWVkICs9IHNlZWQ7XG4gIH1cblxuICAvLyBNaXggaW4gc3RyaW5nIHNlZWQsIHRoZW4gZGlzY2FyZCBhbiBpbml0aWFsIGJhdGNoIG9mIDY0IHZhbHVlcy5cbiAgZm9yICh2YXIgayA9IDA7IGsgPCBzdHJzZWVkLmxlbmd0aCArIDY0OyBrKyspIHtcbiAgICBtZS54IF49IHN0cnNlZWQuY2hhckNvZGVBdChrKSB8IDA7XG4gICAgaWYgKGsgPT0gc3Ryc2VlZC5sZW5ndGgpIHtcbiAgICAgIG1lLmQgPSBtZS54IDw8IDEwIF4gbWUueCA+Pj4gNDtcbiAgICB9XG4gICAgbWUubmV4dCgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNvcHkoZiwgdCkge1xuICB0LnggPSBmLng7XG4gIHQueSA9IGYueTtcbiAgdC56ID0gZi56O1xuICB0LncgPSBmLnc7XG4gIHQudiA9IGYudjtcbiAgdC5kID0gZi5kO1xuICByZXR1cm4gdDtcbn1cblxuZnVuY3Rpb24gaW1wbChzZWVkLCBvcHRzKSB7XG4gIHZhciB4ZyA9IG5ldyBYb3JHZW4oc2VlZCksXG4gICAgICBzdGF0ZSA9IG9wdHMgJiYgb3B0cy5zdGF0ZSxcbiAgICAgIHBybmcgPSBmdW5jdGlvbigpIHsgcmV0dXJuICh4Zy5uZXh0KCkgPj4+IDApIC8gMHgxMDAwMDAwMDA7IH07XG4gIHBybmcuZG91YmxlID0gZnVuY3Rpb24oKSB7XG4gICAgZG8ge1xuICAgICAgdmFyIHRvcCA9IHhnLm5leHQoKSA+Pj4gMTEsXG4gICAgICAgICAgYm90ID0gKHhnLm5leHQoKSA+Pj4gMCkgLyAweDEwMDAwMDAwMCxcbiAgICAgICAgICByZXN1bHQgPSAodG9wICsgYm90KSAvICgxIDw8IDIxKTtcbiAgICB9IHdoaWxlIChyZXN1bHQgPT09IDApO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIHBybmcuaW50MzIgPSB4Zy5uZXh0O1xuICBwcm5nLnF1aWNrID0gcHJuZztcbiAgaWYgKHN0YXRlKSB7XG4gICAgaWYgKHR5cGVvZihzdGF0ZSkgPT0gJ29iamVjdCcpIGNvcHkoc3RhdGUsIHhnKTtcbiAgICBwcm5nLnN0YXRlID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb3B5KHhnLCB7fSk7IH1cbiAgfVxuICByZXR1cm4gcHJuZztcbn1cblxuaWYgKG1vZHVsZSAmJiBtb2R1bGUuZXhwb3J0cykge1xuICBtb2R1bGUuZXhwb3J0cyA9IGltcGw7XG59IGVsc2UgaWYgKGRlZmluZSAmJiBkZWZpbmUuYW1kKSB7XG4gIGRlZmluZShmdW5jdGlvbigpIHsgcmV0dXJuIGltcGw7IH0pO1xufSBlbHNlIHtcbiAgdGhpcy54b3J3b3cgPSBpbXBsO1xufVxuXG59KShcbiAgdGhpcyxcbiAgKHR5cGVvZiBtb2R1bGUpID09ICdvYmplY3QnICYmIG1vZHVsZSwgICAgLy8gcHJlc2VudCBpbiBub2RlLmpzXG4gICh0eXBlb2YgZGVmaW5lKSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZSAgIC8vIHByZXNlbnQgd2l0aCBhbiBBTUQgbG9hZGVyXG4pO1xuXG5cbiIsIi8qXG5Db3B5cmlnaHQgMjAxNCBEYXZpZCBCYXUuXG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZ1xuYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG5cIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbndpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbmRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0b1xucGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvXG50aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG5pbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCxcbkVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULlxuSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTllcbkNMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsXG5UT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRVxuU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbiovXG5cbihmdW5jdGlvbiAocG9vbCwgbWF0aCkge1xuLy9cbi8vIFRoZSBmb2xsb3dpbmcgY29uc3RhbnRzIGFyZSByZWxhdGVkIHRvIElFRUUgNzU0IGxpbWl0cy5cbi8vXG52YXIgZ2xvYmFsID0gdGhpcyxcbiAgICB3aWR0aCA9IDI1NiwgICAgICAgIC8vIGVhY2ggUkM0IG91dHB1dCBpcyAwIDw9IHggPCAyNTZcbiAgICBjaHVua3MgPSA2LCAgICAgICAgIC8vIGF0IGxlYXN0IHNpeCBSQzQgb3V0cHV0cyBmb3IgZWFjaCBkb3VibGVcbiAgICBkaWdpdHMgPSA1MiwgICAgICAgIC8vIHRoZXJlIGFyZSA1MiBzaWduaWZpY2FudCBkaWdpdHMgaW4gYSBkb3VibGVcbiAgICBybmduYW1lID0gJ3JhbmRvbScsIC8vIHJuZ25hbWU6IG5hbWUgZm9yIE1hdGgucmFuZG9tIGFuZCBNYXRoLnNlZWRyYW5kb21cbiAgICBzdGFydGRlbm9tID0gbWF0aC5wb3cod2lkdGgsIGNodW5rcyksXG4gICAgc2lnbmlmaWNhbmNlID0gbWF0aC5wb3coMiwgZGlnaXRzKSxcbiAgICBvdmVyZmxvdyA9IHNpZ25pZmljYW5jZSAqIDIsXG4gICAgbWFzayA9IHdpZHRoIC0gMSxcbiAgICBub2RlY3J5cHRvOyAgICAgICAgIC8vIG5vZGUuanMgY3J5cHRvIG1vZHVsZSwgaW5pdGlhbGl6ZWQgYXQgdGhlIGJvdHRvbS5cblxuLy9cbi8vIHNlZWRyYW5kb20oKVxuLy8gVGhpcyBpcyB0aGUgc2VlZHJhbmRvbSBmdW5jdGlvbiBkZXNjcmliZWQgYWJvdmUuXG4vL1xuZnVuY3Rpb24gc2VlZHJhbmRvbShzZWVkLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICB2YXIga2V5ID0gW107XG4gIG9wdGlvbnMgPSAob3B0aW9ucyA9PSB0cnVlKSA/IHsgZW50cm9weTogdHJ1ZSB9IDogKG9wdGlvbnMgfHwge30pO1xuXG4gIC8vIEZsYXR0ZW4gdGhlIHNlZWQgc3RyaW5nIG9yIGJ1aWxkIG9uZSBmcm9tIGxvY2FsIGVudHJvcHkgaWYgbmVlZGVkLlxuICB2YXIgc2hvcnRzZWVkID0gbWl4a2V5KGZsYXR0ZW4oXG4gICAgb3B0aW9ucy5lbnRyb3B5ID8gW3NlZWQsIHRvc3RyaW5nKHBvb2wpXSA6XG4gICAgKHNlZWQgPT0gbnVsbCkgPyBhdXRvc2VlZCgpIDogc2VlZCwgMyksIGtleSk7XG5cbiAgLy8gVXNlIHRoZSBzZWVkIHRvIGluaXRpYWxpemUgYW4gQVJDNCBnZW5lcmF0b3IuXG4gIHZhciBhcmM0ID0gbmV3IEFSQzQoa2V5KTtcblxuICAvLyBUaGlzIGZ1bmN0aW9uIHJldHVybnMgYSByYW5kb20gZG91YmxlIGluIFswLCAxKSB0aGF0IGNvbnRhaW5zXG4gIC8vIHJhbmRvbW5lc3MgaW4gZXZlcnkgYml0IG9mIHRoZSBtYW50aXNzYSBvZiB0aGUgSUVFRSA3NTQgdmFsdWUuXG4gIHZhciBwcm5nID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG4gPSBhcmM0LmcoY2h1bmtzKSwgICAgICAgICAgICAgLy8gU3RhcnQgd2l0aCBhIG51bWVyYXRvciBuIDwgMiBeIDQ4XG4gICAgICAgIGQgPSBzdGFydGRlbm9tLCAgICAgICAgICAgICAgICAgLy8gICBhbmQgZGVub21pbmF0b3IgZCA9IDIgXiA0OC5cbiAgICAgICAgeCA9IDA7ICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIGFuZCBubyAnZXh0cmEgbGFzdCBieXRlJy5cbiAgICB3aGlsZSAobiA8IHNpZ25pZmljYW5jZSkgeyAgICAgICAgICAvLyBGaWxsIHVwIGFsbCBzaWduaWZpY2FudCBkaWdpdHMgYnlcbiAgICAgIG4gPSAobiArIHgpICogd2lkdGg7ICAgICAgICAgICAgICAvLyAgIHNoaWZ0aW5nIG51bWVyYXRvciBhbmRcbiAgICAgIGQgKj0gd2lkdGg7ICAgICAgICAgICAgICAgICAgICAgICAvLyAgIGRlbm9taW5hdG9yIGFuZCBnZW5lcmF0aW5nIGFcbiAgICAgIHggPSBhcmM0LmcoMSk7ICAgICAgICAgICAgICAgICAgICAvLyAgIG5ldyBsZWFzdC1zaWduaWZpY2FudC1ieXRlLlxuICAgIH1cbiAgICB3aGlsZSAobiA+PSBvdmVyZmxvdykgeyAgICAgICAgICAgICAvLyBUbyBhdm9pZCByb3VuZGluZyB1cCwgYmVmb3JlIGFkZGluZ1xuICAgICAgbiAvPSAyOyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgbGFzdCBieXRlLCBzaGlmdCBldmVyeXRoaW5nXG4gICAgICBkIC89IDI7ICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICByaWdodCB1c2luZyBpbnRlZ2VyIG1hdGggdW50aWxcbiAgICAgIHggPj4+PSAxOyAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIHdlIGhhdmUgZXhhY3RseSB0aGUgZGVzaXJlZCBiaXRzLlxuICAgIH1cbiAgICByZXR1cm4gKG4gKyB4KSAvIGQ7ICAgICAgICAgICAgICAgICAvLyBGb3JtIHRoZSBudW1iZXIgd2l0aGluIFswLCAxKS5cbiAgfTtcblxuICBwcm5nLmludDMyID0gZnVuY3Rpb24oKSB7IHJldHVybiBhcmM0LmcoNCkgfCAwOyB9XG4gIHBybmcucXVpY2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGFyYzQuZyg0KSAvIDB4MTAwMDAwMDAwOyB9XG4gIHBybmcuZG91YmxlID0gcHJuZztcblxuICAvLyBNaXggdGhlIHJhbmRvbW5lc3MgaW50byBhY2N1bXVsYXRlZCBlbnRyb3B5LlxuICBtaXhrZXkodG9zdHJpbmcoYXJjNC5TKSwgcG9vbCk7XG5cbiAgLy8gQ2FsbGluZyBjb252ZW50aW9uOiB3aGF0IHRvIHJldHVybiBhcyBhIGZ1bmN0aW9uIG9mIHBybmcsIHNlZWQsIGlzX21hdGguXG4gIHJldHVybiAob3B0aW9ucy5wYXNzIHx8IGNhbGxiYWNrIHx8XG4gICAgICBmdW5jdGlvbihwcm5nLCBzZWVkLCBpc19tYXRoX2NhbGwsIHN0YXRlKSB7XG4gICAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICAgIC8vIExvYWQgdGhlIGFyYzQgc3RhdGUgZnJvbSB0aGUgZ2l2ZW4gc3RhdGUgaWYgaXQgaGFzIGFuIFMgYXJyYXkuXG4gICAgICAgICAgaWYgKHN0YXRlLlMpIHsgY29weShzdGF0ZSwgYXJjNCk7IH1cbiAgICAgICAgICAvLyBPbmx5IHByb3ZpZGUgdGhlIC5zdGF0ZSBtZXRob2QgaWYgcmVxdWVzdGVkIHZpYSBvcHRpb25zLnN0YXRlLlxuICAgICAgICAgIHBybmcuc3RhdGUgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvcHkoYXJjNCwge30pOyB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBjYWxsZWQgYXMgYSBtZXRob2Qgb2YgTWF0aCAoTWF0aC5zZWVkcmFuZG9tKCkpLCBtdXRhdGVcbiAgICAgICAgLy8gTWF0aC5yYW5kb20gYmVjYXVzZSB0aGF0IGlzIGhvdyBzZWVkcmFuZG9tLmpzIGhhcyB3b3JrZWQgc2luY2UgdjEuMC5cbiAgICAgICAgaWYgKGlzX21hdGhfY2FsbCkgeyBtYXRoW3JuZ25hbWVdID0gcHJuZzsgcmV0dXJuIHNlZWQ7IH1cblxuICAgICAgICAvLyBPdGhlcndpc2UsIGl0IGlzIGEgbmV3ZXIgY2FsbGluZyBjb252ZW50aW9uLCBzbyByZXR1cm4gdGhlXG4gICAgICAgIC8vIHBybmcgZGlyZWN0bHkuXG4gICAgICAgIGVsc2UgcmV0dXJuIHBybmc7XG4gICAgICB9KShcbiAgcHJuZyxcbiAgc2hvcnRzZWVkLFxuICAnZ2xvYmFsJyBpbiBvcHRpb25zID8gb3B0aW9ucy5nbG9iYWwgOiAodGhpcyA9PSBtYXRoKSxcbiAgb3B0aW9ucy5zdGF0ZSk7XG59XG5tYXRoWydzZWVkJyArIHJuZ25hbWVdID0gc2VlZHJhbmRvbTtcblxuLy9cbi8vIEFSQzRcbi8vXG4vLyBBbiBBUkM0IGltcGxlbWVudGF0aW9uLiAgVGhlIGNvbnN0cnVjdG9yIHRha2VzIGEga2V5IGluIHRoZSBmb3JtIG9mXG4vLyBhbiBhcnJheSBvZiBhdCBtb3N0ICh3aWR0aCkgaW50ZWdlcnMgdGhhdCBzaG91bGQgYmUgMCA8PSB4IDwgKHdpZHRoKS5cbi8vXG4vLyBUaGUgZyhjb3VudCkgbWV0aG9kIHJldHVybnMgYSBwc2V1ZG9yYW5kb20gaW50ZWdlciB0aGF0IGNvbmNhdGVuYXRlc1xuLy8gdGhlIG5leHQgKGNvdW50KSBvdXRwdXRzIGZyb20gQVJDNC4gIEl0cyByZXR1cm4gdmFsdWUgaXMgYSBudW1iZXIgeFxuLy8gdGhhdCBpcyBpbiB0aGUgcmFuZ2UgMCA8PSB4IDwgKHdpZHRoIF4gY291bnQpLlxuLy9cbmZ1bmN0aW9uIEFSQzQoa2V5KSB7XG4gIHZhciB0LCBrZXlsZW4gPSBrZXkubGVuZ3RoLFxuICAgICAgbWUgPSB0aGlzLCBpID0gMCwgaiA9IG1lLmkgPSBtZS5qID0gMCwgcyA9IG1lLlMgPSBbXTtcblxuICAvLyBUaGUgZW1wdHkga2V5IFtdIGlzIHRyZWF0ZWQgYXMgWzBdLlxuICBpZiAoIWtleWxlbikgeyBrZXkgPSBba2V5bGVuKytdOyB9XG5cbiAgLy8gU2V0IHVwIFMgdXNpbmcgdGhlIHN0YW5kYXJkIGtleSBzY2hlZHVsaW5nIGFsZ29yaXRobS5cbiAgd2hpbGUgKGkgPCB3aWR0aCkge1xuICAgIHNbaV0gPSBpKys7XG4gIH1cbiAgZm9yIChpID0gMDsgaSA8IHdpZHRoOyBpKyspIHtcbiAgICBzW2ldID0gc1tqID0gbWFzayAmIChqICsga2V5W2kgJSBrZXlsZW5dICsgKHQgPSBzW2ldKSldO1xuICAgIHNbal0gPSB0O1xuICB9XG5cbiAgLy8gVGhlIFwiZ1wiIG1ldGhvZCByZXR1cm5zIHRoZSBuZXh0IChjb3VudCkgb3V0cHV0cyBhcyBvbmUgbnVtYmVyLlxuICAobWUuZyA9IGZ1bmN0aW9uKGNvdW50KSB7XG4gICAgLy8gVXNpbmcgaW5zdGFuY2UgbWVtYmVycyBpbnN0ZWFkIG9mIGNsb3N1cmUgc3RhdGUgbmVhcmx5IGRvdWJsZXMgc3BlZWQuXG4gICAgdmFyIHQsIHIgPSAwLFxuICAgICAgICBpID0gbWUuaSwgaiA9IG1lLmosIHMgPSBtZS5TO1xuICAgIHdoaWxlIChjb3VudC0tKSB7XG4gICAgICB0ID0gc1tpID0gbWFzayAmIChpICsgMSldO1xuICAgICAgciA9IHIgKiB3aWR0aCArIHNbbWFzayAmICgoc1tpXSA9IHNbaiA9IG1hc2sgJiAoaiArIHQpXSkgKyAoc1tqXSA9IHQpKV07XG4gICAgfVxuICAgIG1lLmkgPSBpOyBtZS5qID0gajtcbiAgICByZXR1cm4gcjtcbiAgICAvLyBGb3Igcm9idXN0IHVucHJlZGljdGFiaWxpdHksIHRoZSBmdW5jdGlvbiBjYWxsIGJlbG93IGF1dG9tYXRpY2FsbHlcbiAgICAvLyBkaXNjYXJkcyBhbiBpbml0aWFsIGJhdGNoIG9mIHZhbHVlcy4gIFRoaXMgaXMgY2FsbGVkIFJDNC1kcm9wWzI1Nl0uXG4gICAgLy8gU2VlIGh0dHA6Ly9nb29nbGUuY29tL3NlYXJjaD9xPXJzYStmbHVocmVyK3Jlc3BvbnNlJmJ0bklcbiAgfSkod2lkdGgpO1xufVxuXG4vL1xuLy8gY29weSgpXG4vLyBDb3BpZXMgaW50ZXJuYWwgc3RhdGUgb2YgQVJDNCB0byBvciBmcm9tIGEgcGxhaW4gb2JqZWN0LlxuLy9cbmZ1bmN0aW9uIGNvcHkoZiwgdCkge1xuICB0LmkgPSBmLmk7XG4gIHQuaiA9IGYuajtcbiAgdC5TID0gZi5TLnNsaWNlKCk7XG4gIHJldHVybiB0O1xufTtcblxuLy9cbi8vIGZsYXR0ZW4oKVxuLy8gQ29udmVydHMgYW4gb2JqZWN0IHRyZWUgdG8gbmVzdGVkIGFycmF5cyBvZiBzdHJpbmdzLlxuLy9cbmZ1bmN0aW9uIGZsYXR0ZW4ob2JqLCBkZXB0aCkge1xuICB2YXIgcmVzdWx0ID0gW10sIHR5cCA9ICh0eXBlb2Ygb2JqKSwgcHJvcDtcbiAgaWYgKGRlcHRoICYmIHR5cCA9PSAnb2JqZWN0Jykge1xuICAgIGZvciAocHJvcCBpbiBvYmopIHtcbiAgICAgIHRyeSB7IHJlc3VsdC5wdXNoKGZsYXR0ZW4ob2JqW3Byb3BdLCBkZXB0aCAtIDEpKTsgfSBjYXRjaCAoZSkge31cbiAgICB9XG4gIH1cbiAgcmV0dXJuIChyZXN1bHQubGVuZ3RoID8gcmVzdWx0IDogdHlwID09ICdzdHJpbmcnID8gb2JqIDogb2JqICsgJ1xcMCcpO1xufVxuXG4vL1xuLy8gbWl4a2V5KClcbi8vIE1peGVzIGEgc3RyaW5nIHNlZWQgaW50byBhIGtleSB0aGF0IGlzIGFuIGFycmF5IG9mIGludGVnZXJzLCBhbmRcbi8vIHJldHVybnMgYSBzaG9ydGVuZWQgc3RyaW5nIHNlZWQgdGhhdCBpcyBlcXVpdmFsZW50IHRvIHRoZSByZXN1bHQga2V5LlxuLy9cbmZ1bmN0aW9uIG1peGtleShzZWVkLCBrZXkpIHtcbiAgdmFyIHN0cmluZ3NlZWQgPSBzZWVkICsgJycsIHNtZWFyLCBqID0gMDtcbiAgd2hpbGUgKGogPCBzdHJpbmdzZWVkLmxlbmd0aCkge1xuICAgIGtleVttYXNrICYgal0gPVxuICAgICAgbWFzayAmICgoc21lYXIgXj0ga2V5W21hc2sgJiBqXSAqIDE5KSArIHN0cmluZ3NlZWQuY2hhckNvZGVBdChqKyspKTtcbiAgfVxuICByZXR1cm4gdG9zdHJpbmcoa2V5KTtcbn1cblxuLy9cbi8vIGF1dG9zZWVkKClcbi8vIFJldHVybnMgYW4gb2JqZWN0IGZvciBhdXRvc2VlZGluZywgdXNpbmcgd2luZG93LmNyeXB0byBhbmQgTm9kZSBjcnlwdG9cbi8vIG1vZHVsZSBpZiBhdmFpbGFibGUuXG4vL1xuZnVuY3Rpb24gYXV0b3NlZWQoKSB7XG4gIHRyeSB7XG4gICAgdmFyIG91dDtcbiAgICBpZiAobm9kZWNyeXB0byAmJiAob3V0ID0gbm9kZWNyeXB0by5yYW5kb21CeXRlcykpIHtcbiAgICAgIC8vIFRoZSB1c2Ugb2YgJ291dCcgdG8gcmVtZW1iZXIgcmFuZG9tQnl0ZXMgbWFrZXMgdGlnaHQgbWluaWZpZWQgY29kZS5cbiAgICAgIG91dCA9IG91dCh3aWR0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dCA9IG5ldyBVaW50OEFycmF5KHdpZHRoKTtcbiAgICAgIChnbG9iYWwuY3J5cHRvIHx8IGdsb2JhbC5tc0NyeXB0bykuZ2V0UmFuZG9tVmFsdWVzKG91dCk7XG4gICAgfVxuICAgIHJldHVybiB0b3N0cmluZyhvdXQpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgdmFyIGJyb3dzZXIgPSBnbG9iYWwubmF2aWdhdG9yLFxuICAgICAgICBwbHVnaW5zID0gYnJvd3NlciAmJiBicm93c2VyLnBsdWdpbnM7XG4gICAgcmV0dXJuIFsrbmV3IERhdGUsIGdsb2JhbCwgcGx1Z2lucywgZ2xvYmFsLnNjcmVlbiwgdG9zdHJpbmcocG9vbCldO1xuICB9XG59XG5cbi8vXG4vLyB0b3N0cmluZygpXG4vLyBDb252ZXJ0cyBhbiBhcnJheSBvZiBjaGFyY29kZXMgdG8gYSBzdHJpbmdcbi8vXG5mdW5jdGlvbiB0b3N0cmluZyhhKSB7XG4gIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KDAsIGEpO1xufVxuXG4vL1xuLy8gV2hlbiBzZWVkcmFuZG9tLmpzIGlzIGxvYWRlZCwgd2UgaW1tZWRpYXRlbHkgbWl4IGEgZmV3IGJpdHNcbi8vIGZyb20gdGhlIGJ1aWx0LWluIFJORyBpbnRvIHRoZSBlbnRyb3B5IHBvb2wuICBCZWNhdXNlIHdlIGRvXG4vLyBub3Qgd2FudCB0byBpbnRlcmZlcmUgd2l0aCBkZXRlcm1pbmlzdGljIFBSTkcgc3RhdGUgbGF0ZXIsXG4vLyBzZWVkcmFuZG9tIHdpbGwgbm90IGNhbGwgbWF0aC5yYW5kb20gb24gaXRzIG93biBhZ2FpbiBhZnRlclxuLy8gaW5pdGlhbGl6YXRpb24uXG4vL1xubWl4a2V5KG1hdGgucmFuZG9tKCksIHBvb2wpO1xuXG4vL1xuLy8gTm9kZWpzIGFuZCBBTUQgc3VwcG9ydDogZXhwb3J0IHRoZSBpbXBsZW1lbnRhdGlvbiBhcyBhIG1vZHVsZSB1c2luZ1xuLy8gZWl0aGVyIGNvbnZlbnRpb24uXG4vL1xuaWYgKCh0eXBlb2YgbW9kdWxlKSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICBtb2R1bGUuZXhwb3J0cyA9IHNlZWRyYW5kb207XG4gIC8vIFdoZW4gaW4gbm9kZS5qcywgdHJ5IHVzaW5nIGNyeXB0byBwYWNrYWdlIGZvciBhdXRvc2VlZGluZy5cbiAgdHJ5IHtcbiAgICBub2RlY3J5cHRvID0gcmVxdWlyZSgnY3J5cHRvJyk7XG4gIH0gY2F0Y2ggKGV4KSB7fVxufSBlbHNlIGlmICgodHlwZW9mIGRlZmluZSkgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gIGRlZmluZShmdW5jdGlvbigpIHsgcmV0dXJuIHNlZWRyYW5kb207IH0pO1xufVxuXG4vLyBFbmQgYW5vbnltb3VzIHNjb3BlLCBhbmQgcGFzcyBpbml0aWFsIHZhbHVlcy5cbn0pKFxuICBbXSwgICAgIC8vIHBvb2w6IGVudHJvcHkgcG9vbCBzdGFydHMgZW1wdHlcbiAgTWF0aCAgICAvLyBtYXRoOiBwYWNrYWdlIGNvbnRhaW5pbmcgcmFuZG9tLCBwb3csIGFuZCBzZWVkcmFuZG9tXG4pO1xuIl19
