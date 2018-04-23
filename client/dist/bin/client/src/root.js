var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Juggler = /** @class */ (function () {
        function Juggler(fps) {
            var _this = this;
            this.fps = fps;
            this.enterFrameFunctions = [];
            this.interFrameTime = 1000 / fps;
            this.schedule = Date.now() + this.interFrameTime;
            var tick = function () {
                _this.enterFrameFunctions.forEach(function (_a) {
                    var _b = __read(_a, 2), fn = _b[0], ctx = _b[1];
                    return fn.call(ctx);
                });
                _this.schedule += _this.interFrameTime;
                var timeout = _this.schedule - Date.now();
                if (timeout < 2) {
                    timeout = 2;
                    _this.schedule = Date.now() + _this.interFrameTime;
                }
                setTimeout(tick, _this.schedule - Date.now());
            };
            setTimeout(tick, this.interFrameTime);
        }
        Juggler.prototype.add = function (fn, context) {
            if (this.has(fn, context) < 0) {
                this.enterFrameFunctions.push([fn, context]);
            }
        };
        Juggler.prototype.remove = function (fn, context) {
            var idx = this.has(fn, context);
            if (idx >= 0) {
                this.enterFrameFunctions.splice(idx, 1);
            }
        };
        Juggler.prototype.has = function (fn, context) {
            try {
                for (var _a = __values(enumerate(this.enterFrameFunctions)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var _c = __read(_b.value, 2), i = _c[0], oef = _c[1];
                    if (oef[0] === fn && oef[1] === context)
                        return i;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return -1;
            var e_1, _d;
        };
        Juggler.prototype.afterFrames = function (numFrames, fn, context) {
            var _this = this;
            var wrapper = function () {
                numFrames--;
                if (numFrames <= 0) {
                    fn.call(context);
                    _this.remove(wrapper);
                }
            };
            this.add(wrapper);
        };
        return Juggler;
    }());
    exports.juggler = new Juggler(60);
    var Root = /** @class */ (function () {
        function Root() {
        }
        Root.prototype.setApp = function (app) {
            if (!this._app)
                this._app = app;
            else
                throw new Error("App is already set");
        };
        Object.defineProperty(Root.prototype, "stage", {
            get: function () {
                if (this._app)
                    return this._app.stage;
                else
                    throw new Error("Stage is not yet set");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Root.prototype, "app", {
            get: function () {
                if (this._app)
                    return this._app;
                else
                    throw new Error("App is not yet set");
            },
            enumerable: true,
            configurable: true
        });
        return Root;
    }());
    exports.root = window.root = new Root();
    var Keyboard = /** @class */ (function () {
        function Keyboard() {
            var _this = this;
            this.keys = [];
            window.addEventListener("keydown", function (e) { return _this.keys[e.keyCode] = true; });
            window.addEventListener("keyup", function (e) { return _this.keys[e.keyCode] = false; });
        }
        Keyboard.prototype.isKeyDown = function (keycode) {
            return this.keys[keycode] || false;
        };
        return Keyboard;
    }());
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
    var Controller = /** @class */ (function () {
        function Controller() {
            var _this = this;
            this.buttons = [];
            this.axes = [];
            exports.juggler.add(function () {
                var gps = navigator.getGamepads();
                if (!gps[0]) {
                    _this.buttons = [];
                    _this.axes = [];
                    return;
                }
                var gamepad = gps[0];
                _this.buttons = gamepad.buttons.map(function (b) { return b.pressed; });
                _this.axes = gamepad.axes;
            });
        }
        Controller.prototype.getAxis = function (axis) {
            return this.axes[axis] || 0;
        };
        Controller.prototype.getButton = function (button) {
            return this.buttons[button] || false;
        };
        return Controller;
    }());
    exports.controller = new Controller();
    var SoundManager = /** @class */ (function () {
        function SoundManager() {
            var _this = this;
            this.music = {};
            this.tags = {};
            exports.juggler.add(function () { return _this.tags = {}; });
        }
        SoundManager.prototype.playSound = function (name, volume, tag) {
            if (volume === void 0) { volume = 1; }
            if (tag) {
                if (!this.tags[tag]) {
                    this.tags[tag] = true;
                }
                else {
                    return;
                }
            }
            var audio = new Audio(name);
            audio.volume = volume * SoundManager.GLOBAL_VOLUME;
            audio.play();
            audio.onended = function () { return audio.remove(); };
        };
        SoundManager.prototype.playMusic = function (name, volume) {
            if (volume === void 0) { volume = 1; }
            if (this.music.hasOwnProperty(name)) {
                if (!isNaN(this.music[name].fade))
                    window.clearInterval(this.music[name].fade);
                this.music[name].song.volume = volume * SoundManager.GLOBAL_VOLUME;
                return;
            }
            var audio = new Audio(name);
            audio.volume = volume * SoundManager.GLOBAL_VOLUME;
            audio.loop = true;
            audio.play();
            this.music[name] = {
                song: audio,
                fade: NaN,
            };
        };
        SoundManager.prototype.fadeMusicOut = function (name) {
            var _this = this;
            if (!this.music.hasOwnProperty(name) || !isNaN(this.music[name].fade))
                return;
            var fadeStart = this.music[name].song.volume;
            var fadeTime = 30;
            this.music[name].fade = window.setInterval(function () {
                fadeTime--;
                if (fadeTime <= 0) {
                    _this.music[name].song.pause();
                    _this.music[name].song.remove();
                    window.clearInterval(_this.music[name].fade);
                    delete _this.music[name];
                }
                else {
                    _this.music[name].song.volume = fadeTime / 30 * fadeStart;
                }
            }, 16);
        };
        SoundManager.prototype.setMusicVolume = function (name, volume) {
            if (!this.music.hasOwnProperty(name))
                return;
            this.music[name].song.volume = volume * SoundManager.GLOBAL_VOLUME;
        };
        SoundManager.GLOBAL_VOLUME = 0.4;
        return SoundManager;
    }());
    exports.soundManager = new SoundManager();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9yb290LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBR0E7UUFLSSxpQkFBb0IsR0FBVztZQUEvQixpQkFnQkM7WUFoQm1CLFFBQUcsR0FBSCxHQUFHLENBQVE7WUFKdkIsd0JBQW1CLEdBQTBCLEVBQUUsQ0FBQztZQUtwRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksR0FBRyxHQUFHLENBQUM7WUFDakMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztZQUNqRCxJQUFJLElBQUksR0FBRztnQkFDUCxLQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFFLFVBQUMsRUFBUzt3QkFBVCxrQkFBUyxFQUFSLFVBQUUsRUFBRSxXQUFHO29CQUFNLE9BQUEsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7Z0JBQVosQ0FBWSxDQUFFLENBQUM7Z0JBQ2hFLEtBQUksQ0FBQyxRQUFRLElBQUksS0FBSSxDQUFDLGNBQWMsQ0FBQztnQkFFckMsSUFBSSxPQUFPLEdBQUcsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ3pDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNkLE9BQU8sR0FBRyxDQUFDLENBQUM7b0JBQ1osS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQztnQkFDckQsQ0FBQztnQkFDRCxVQUFVLENBQUMsSUFBSSxFQUFFLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDakQsQ0FBQyxDQUFDO1lBRUYsVUFBVSxDQUFDLElBQUksRUFBRSxJ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cG9ydCAqIGFzIEtleSBmcm9tIFwiLi9LZXlcIjtcclxuXHJcbmNsYXNzIEp1Z2dsZXIge1xyXG4gICAgcHJpdmF0ZSBlbnRlckZyYW1lRnVuY3Rpb25zOiBbKCgpID0+IHZvaWQpLCBhbnldW10gPSBbXTtcclxuICAgIHByaXZhdGUgc2NoZWR1bGU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgaW50ZXJGcmFtZVRpbWU6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZwczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5pbnRlckZyYW1lVGltZSA9IDEwMDAgLyBmcHM7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSA9IERhdGUubm93KCkgKyB0aGlzLmludGVyRnJhbWVUaW1lO1xyXG4gICAgICAgIGxldCB0aWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmVudGVyRnJhbWVGdW5jdGlvbnMuZm9yRWFjaCggKFtmbiwgY3R4XSkgPT4gZm4uY2FsbChjdHgpICk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUgKz0gdGhpcy5pbnRlckZyYW1lVGltZTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aW1lb3V0ID0gdGhpcy5zY2hlZHVsZSAtIERhdGUubm93KCk7XHJcbiAgICAgICAgICAgIGlmICh0aW1lb3V0IDwgMikge1xyXG4gICAgICAgICAgICAgICAgdGltZW91dCA9IDI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlID0gRGF0ZS5ub3coKSArIHRoaXMuaW50ZXJGcmFtZVRpbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0VGltZW91dCh0aWNrLCB0aGlzLnNjaGVkdWxlIC0gRGF0ZS5ub3coKSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCh0aWNrLCB0aGlzLmludGVyRnJhbWVUaW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkKGZuOiAoKSA9PiB2b2lkLCBjb250ZXh0PzogYW55KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzKGZuLCBjb250ZXh0KSA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5lbnRlckZyYW1lRnVuY3Rpb25zLnB1c2goW2ZuLCBjb250ZXh0XSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmUoZm46ICgpID0+IHZvaWQsIGNvbnRleHQ/OiBhbnkpIHtcclxuICAgICAgICBsZXQgaWR4ID0gdGhpcy5oYXMoZm4sIGNvbnRleHQpO1xyXG4gICAgICAgIGlmIChpZHggPj0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmVudGVyRnJhbWVGdW5jdGlvbnMuc3BsaWNlKGlkeCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoYXMoZm46ICgpID0+IHZvaWQsIGNvbnRleHQ/OiBhbnkpIHtcclxuICAgICAgICBmb3IgKGxldCBbaSwgb2VmXSBvZiBlbnVtZXJhdGUodGhpcy5lbnRlckZyYW1lRnVuY3Rpb25zKSkge1xyXG4gICAgICAgICAgICBpZiAob2VmWzBdID09PSBmbiAmJiBvZWZbMV0gPT09IGNvbnRleHQpIHJldHVybiBpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFmdGVyRnJhbWVzKG51bUZyYW1lczogbnVtYmVyLCBmbjogKCkgPT4gdm9pZCwgY29udGV4dD86IGFueSkge1xyXG4gICAgICAgIGxldCB3cmFwcGVyID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBudW1GcmFtZXMgLS07XHJcbiAgICAgICAgICAgIGlmIChudW1GcmFtZXMgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgZm4uY2FsbChjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKHdyYXBwZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmFkZCh3cmFwcGVyKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGxldCBqdWdnbGVyID0gbmV3IEp1Z2dsZXIoNjApO1xyXG5cclxuY2xhc3MgUm9vdCB7XHJcbiAgICBwcml2YXRlIF9hcHA6IFBJWEkuQXBwbGljYXRpb247XHJcblxyXG4gICAgcHVibGljIHNldEFwcChhcHA6IFBJWEkuQXBwbGljYXRpb24pIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2FwcCkgdGhpcy5fYXBwID0gYXBwO1xyXG4gICAgICAgIGVsc2UgdGhyb3cgbmV3IEVycm9yKFwiQXBwIGlzIGFscmVhZHkgc2V0XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzdGFnZSgpOiBQSVhJLkNvbnRhaW5lciB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2FwcCkgcmV0dXJuIHRoaXMuX2FwcC5zdGFnZTtcclxuICAgICAgICBlbHNlIHRocm93IG5ldyBFcnJvcihcIlN0YWdlIGlzIG5vdCB5ZXQgc2V0XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBhcHAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2FwcCkgcmV0dXJuIHRoaXMuX2FwcDtcclxuICAgICAgICBlbHNlIHRocm93IG5ldyBFcnJvcihcIkFwcCBpcyBub3QgeWV0IHNldFwiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGxldCByb290ID0gKHdpbmRvdyBhcyBhbnkpLnJvb3QgPSBuZXcgUm9vdCgpO1xyXG5cclxuY2xhc3MgS2V5Ym9hcmQge1xyXG5cclxuICAgIHByaXZhdGUga2V5czogYm9vbGVhbltdID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChlKSA9PiB0aGlzLmtleXNbZS5rZXlDb2RlXSA9IHRydWUgKTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChlKSA9PiB0aGlzLmtleXNbZS5rZXlDb2RlXSA9IGZhbHNlICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzS2V5RG93bihrZXljb2RlOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5rZXlzW2tleWNvZGVdIHx8IGZhbHNlO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGxldCBrZXlib2FyZCA9IG5ldyBLZXlib2FyZCgpO1xyXG5cclxuZXhwb3J0IGVudW0gQ29udHJvbGxlckF4aXMge1xyXG4gICAgTEVGVF9YID0gMCxcclxuICAgIExFRlRfWSA9IDEsXHJcbiAgICBSSUdIVF9YID0gMixcclxuICAgIFJJR0hUX1kgPSAzLFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBDb250cm9sbGVyQnV0dG9uIHtcclxuICAgIEEgPSAwLFxyXG4gICAgQiA9IDEsXHJcbiAgICBYID0gMixcclxuICAgIFkgPSAzLFxyXG4gICAgTEIgPSA0LFxyXG4gICAgUkIgPSA1LFxyXG4gICAgTFQgPSA2LFxyXG4gICAgUlQgPSA3LFxyXG4gICAgU0VMRUNUID0gOCxcclxuICAgIFNUQVJUID0gOSxcclxuICAgIEwzID0gMTAsXHJcbiAgICBSMyA9IDExLFxyXG4gICAgRF9VUCA9IDEyLFxyXG4gICAgRF9ET1dOID0gMTMsXHJcbiAgICBEX0xFRlQgPSAxNCxcclxuICAgIERfUklHSFQgPSAxNSxcclxufVxyXG5cclxuY2xhc3MgQ29udHJvbGxlciB7XHJcbiAgICBwcml2YXRlIGJ1dHRvbnM6IGJvb2xlYW5bXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBheGVzOiBudW1iZXJbXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIGp1Z2dsZXIuYWRkKCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBncHMgPSBuYXZpZ2F0b3IuZ2V0R2FtZXBhZHMoKTtcclxuICAgICAgICAgICAgaWYgKCFncHNbMF0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9ucyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5heGVzID0gW107XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGdhbWVwYWQgPSBncHNbMF07XHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9ucyA9IGdhbWVwYWQuYnV0dG9ucy5tYXAoIChiKSA9PiBiLnByZXNzZWQgKTtcclxuICAgICAgICAgICAgdGhpcy5heGVzID0gZ2FtZXBhZC5heGVzO1xyXG4gICAgICAgIH0gKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QXhpcyhheGlzOiBDb250cm9sbGVyQXhpcykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF4ZXNbYXhpc10gfHwgMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QnV0dG9uKGJ1dHRvbjogQ29udHJvbGxlckJ1dHRvbikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJ1dHRvbnNbYnV0dG9uXSB8fCBmYWxzZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGxldCBjb250cm9sbGVyID0gbmV3IENvbnRyb2xsZXIoKTtcclxuXHJcbmNsYXNzIFNvdW5kTWFuYWdlciB7XHJcbiAgICBwdWJsaWMgc3RhdGljIEdMT0JBTF9WT0xVTUUgPSAwLjQ7XHJcbiAgICBwcml2YXRlIG11c2ljOiB7IFtzb25nTmFtZTogc3RyaW5nXTogeyBzb25nOiBIVE1MQXVkaW9FbGVtZW50LCBmYWRlOiBudW1iZXIgfSB9ID0ge307XHJcbiAgICBwcml2YXRlIHRhZ3M6IHsgW3RhZzogc3RyaW5nXTogYm9vbGVhbiB9ID0ge307XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAganVnZ2xlci5hZGQoKCkgPT4gdGhpcy50YWdzID0ge30pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwbGF5U291bmQobmFtZTogc3RyaW5nLCB2b2x1bWUgPSAxLCB0YWc/OiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodGFnKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy50YWdzW3RhZ10pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFnc1t0YWddID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYXVkaW8gPSBuZXcgQXVkaW8obmFtZSk7XHJcbiAgICAgICAgYXVkaW8udm9sdW1lID0gdm9sdW1lICogU291bmRNYW5hZ2VyLkdMT0JBTF9WT0xVTUU7XHJcbiAgICAgICAgYXVkaW8ucGxheSgpO1xyXG4gICAgICAgIGF1ZGlvLm9uZW5kZWQgPSAoKSA9PiBhdWRpby5yZW1vdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcGxheU11c2ljKG5hbWU6IHN0cmluZywgdm9sdW1lID0gMSkge1xyXG4gICAgICAgIGlmICh0aGlzLm11c2ljLmhhc093blByb3BlcnR5KG5hbWUpKSB7XHJcbiAgICAgICAgICAgIGlmICghaXNOYU4odGhpcy5tdXNpY1tuYW1lXS5mYWRlKSkgd2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5tdXNpY1tuYW1lXS5mYWRlKTtcclxuICAgICAgICAgICAgdGhpcy5tdXNpY1tuYW1lXS5zb25nLnZvbHVtZSA9IHZvbHVtZSAqIFNvdW5kTWFuYWdlci5HTE9CQUxfVk9MVU1FO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBhdWRpbyA9IG5ldyBBdWRpbyhuYW1lKTtcclxuICAgICAgICBhdWRpby52b2x1bWUgPSB2b2x1bWUgKiBTb3VuZE1hbmFnZXIuR0xPQkFMX1ZPTFVNRTtcclxuICAgICAgICBhdWRpby5sb29wID0gdHJ1ZTtcclxuICAgICAgICBhdWRpby5wbGF5KCk7XHJcbiAgICAgICAgdGhpcy5tdXNpY1tuYW1lXSA9IHtcclxuICAgICAgICAgICAgc29uZzogYXVkaW8sXHJcbiAgICAgICAgICAgIGZhZGU6IE5hTixcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmYWRlTXVzaWNPdXQobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm11c2ljLmhhc093blByb3BlcnR5KG5hbWUpIHx8ICFpc05hTih0aGlzLm11c2ljW25hbWVdLmZhZGUpKSByZXR1cm47XHJcbiAgICAgICAgbGV0IGZhZGVTdGFydCA9IHRoaXMubXVzaWNbbmFtZV0uc29uZy52b2x1bWU7XHJcbiAgICAgICAgbGV0IGZhZGVUaW1lID0gMzA7XHJcbiAgICAgICAgdGhpcy5tdXNpY1tuYW1lXS5mYWRlID0gd2luZG93LnNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgZmFkZVRpbWUgLS07XHJcbiAgICAgICAgICAgIGlmIChmYWRlVGltZSA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm11c2ljW25hbWVdLnNvbmcucGF1c2UoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubXVzaWNbbmFtZV0uc29uZy5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMubXVzaWNbbmFtZV0uZmFkZSk7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5tdXNpY1tuYW1lXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubXVzaWNbbmFtZV0uc29uZy52b2x1bWUgPSBmYWRlVGltZSAvIDMwICogZmFkZVN0YXJ0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMTYpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRNdXNpY1ZvbHVtZShuYW1lOiBzdHJpbmcsIHZvbHVtZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm11c2ljLmhhc093blByb3BlcnR5KG5hbWUpKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5tdXNpY1tuYW1lXS5zb25nLnZvbHVtZSA9IHZvbHVtZSAqIFNvdW5kTWFuYWdlci5HTE9CQUxfVk9MVU1FO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgbGV0IHNvdW5kTWFuYWdlciA9IG5ldyBTb3VuZE1hbmFnZXIoKTtcclxuIl19