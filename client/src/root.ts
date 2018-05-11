// tslint:disable max-classes-per-file
import * as _Key from "./Key";

export const Key = _Key;

class Juggler {
    private enterFrameFunctions: [(() => void), any][] = [];
    private schedule: number;
    private interFrameTime: number;

    constructor(private fps: number) {
        this.interFrameTime = 1000 / fps;
        this.schedule = Date.now() + this.interFrameTime;
        let tick = () => {
            this.enterFrameFunctions.forEach( ([fn, ctx]) => fn.call(ctx) );
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

    public setFPS(fps: number) {
        this.interFrameTime = 1000 / fps;
    }

    public add(fn: () => void, context?: any) {
        if (this.has(fn, context) < 0) {
            this.enterFrameFunctions.push([fn, context]);
        }
    }

    public remove(fn: () => void, context?: any) {
        let idx = this.has(fn, context);
        if (idx >= 0) {
            this.enterFrameFunctions.splice(idx, 1);
        }
    }

    public has(fn: () => void, context?: any) {
        for (let [i, oef] of enumerate(this.enterFrameFunctions)) {
            if (oef[0] === fn && oef[1] === context) return i;
        }
        return -1;
    }

    public afterFrames(numFrames: number, fn: () => void, context?: any) {
        let wrapper = () => {
            numFrames --;
            if (numFrames <= 0) {
                fn.call(context);
                this.remove(wrapper);
            }
        };
        this.add(wrapper);
    }
}

export let juggler = new Juggler(60);

class Root {
    private _app: PIXI.Application;

    public setApp(app: PIXI.Application) {
        if (!this._app) this._app = app;
        else throw new Error("App is already set");
    }

    get stage(): PIXI.Container {
        if (this._app) return this._app.stage;
        else throw new Error("Stage is not yet set");
    }

    get app() {
        if (this._app) return this._app;
        else throw new Error("App is not yet set");
    }
}

export let root = (window as any).root = new Root();

class Keyboard {

    private keys: boolean[] = [];

    constructor() {
        window.addEventListener("keydown", (e) => this.keys[e.keyCode] = true );
        window.addEventListener("keyup", (e) => this.keys[e.keyCode] = false );
    }

    public isKeyDown(keycode: number) {
        return this.keys[keycode] || false;
    }

}

export let keyboard = new Keyboard();

export enum ControllerAxis {
    LEFT_X = 0,
    LEFT_Y = 1,
    RIGHT_X = 2,
    RIGHT_Y = 3,
}

export enum ControllerButton {
    A = 0,
    B = 1,
    X = 2,
    Y = 3,
    LB = 4,
    RB = 5,
    LT = 6,
    RT = 7,
    SELECT = 8,
    START = 9,
    L3 = 10,
    R3 = 11,
    D_UP = 12,
    D_DOWN = 13,
    D_LEFT = 14,
    D_RIGHT = 15,
}

class Controller {
    private buttons: boolean[] = [];
    private axes: number[] = [];

    constructor() {
        juggler.add( () => {
            let gps = navigator.getGamepads();
            if (!gps[0]) {
                this.buttons = [];
                this.axes = [];
                return;
            }
            let gamepad = gps[0]!;
            this.buttons = gamepad.buttons.map( (b) => b.pressed );
            this.axes = gamepad.axes;
        } );
    }

    public getAxis(axis: ControllerAxis) {
        return this.axes[axis] || 0;
    }

    public getButton(button: ControllerButton) {
        return this.buttons[button] || false;
    }
}

export let controller = new Controller();

class SoundManager {
    public static GLOBAL_VOLUME = 0.4;
    private music: { [songName: string]: { song: HTMLAudioElement, fade: number } } = {};
    private tags: { [tag: string]: boolean } = {};

    constructor() {
        juggler.add(() => this.tags = {});
    }

    public playSound(name: string, volume = 1, tag?: string) {
        if (tag) {
            if (!this.tags[tag]) {
                this.tags[tag] = true;
            } else {
                return;
            }
        }
        let audio = new Audio(name);
        audio.volume = volume * SoundManager.GLOBAL_VOLUME;
        audio.play();
        audio.onended = () => audio.remove();
    }

    public playMusic(name: string, volume = 1) {
        if (this.music.hasOwnProperty(name)) {
            if (!isNaN(this.music[name].fade)) window.clearInterval(this.music[name].fade);
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

    public fadeMusicOut(name: string) {
        if (!this.music.hasOwnProperty(name) || !isNaN(this.music[name].fade)) return;
        let fadeStart = this.music[name].song.volume;
        let fadeTime = 30;
        this.music[name].fade = window.setInterval(() => {
            fadeTime --;
            if (fadeTime <= 0) {
                this.music[name].song.pause();
                this.music[name].song.remove();
                window.clearInterval(this.music[name].fade);
                delete this.music[name];
            } else {
                this.music[name].song.volume = fadeTime / 30 * fadeStart;
            }
        }, 16);
    }

    public setMusicVolume(name: string, volume: number) {
        if (!this.music.hasOwnProperty(name)) return;
        this.music[name].song.volume = volume * SoundManager.GLOBAL_VOLUME;
    }
}

export let soundManager = new SoundManager();
