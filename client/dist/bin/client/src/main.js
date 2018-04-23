var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "./root"], function (require, exports, root_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function main() {
        return __awaiter(this, void 0, void 0, function () {
            var app, fps, lastTick, fpsDisplay, socket;
            return __generator(this, function (_a) {
                app = new PIXI.Application({
                    width: 1600,
                    height: 900,
                    backgroundColor: 0x161616,
                });
                document.body.appendChild(app.view);
                root_1.root.setApp(app);
                fps = 60;
                lastTick = 0;
                fpsDisplay = new PIXI.Text("0", { align: "right", fontFamily: "Courier New", fontSize: 17, stroke: 0xFFFFFF, strokeThickness: 0.5 });
                fpsDisplay.anchor.set(1);
                fpsDisplay.x = app.view.width;
                fpsDisplay.y = app.view.height;
                app.stage.addChild(fpsDisplay);
                root_1.juggler.add(function () {
                    if (lastTick > 0) {
                        var tick = Date.now();
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
                    fpsDisplay.text = fps.toFixed(1);
                });
                socket = io();
                socket.on("dungeon_params", function (params) { return console.log(params); });
                return [2 /*return*/];
            });
        });
    }
    window.addEventListener("load", main);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRUE7Ozs7Z0JBQ1EsR0FBRyxHQUFHLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBRTtvQkFDNUIsS0FBSyxFQUFFLElBQUk7b0JBQ1gsTUFBTSxFQUFFLEdBQUc7b0JBQ1gsZUFBZSxFQUFFLFFBQVE7aUJBQzVCLENBQUUsQ0FBQztnQkFDSixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3BDLFdBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRWIsR0FBRyxHQUFHLEVBQUUsQ0FBQztnQkFDVCxRQUFRLEdBQUcsQ0FBQyxDQUFDO2dCQUViLFVBQVUsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsR0FBRyxFQUFFLENBQUUsQ0FBQztnQkFDMUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLFVBQVUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQzlCLFVBQVUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQy9CLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUUvQixjQUFPLENBQUMsR0FBRyxDQUFFO29CQUNULEVBQUUsQ0FBQyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNmLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQzt3QkFDdEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNqQixHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxDQUFDO3dCQUNuQyxDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNKLEdBQUcsR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO3dCQUN6RCxDQUFDO3dCQUNELFFBQVEsR0FBRyxJQUFJLENBQUM7b0JBQ3BCLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ0osUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztvQkFDMUIsQ0FBQztvQkFFRCxVQUFVLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLENBQUMsQ0FBRSxDQUFDO2dCQUVBLE1BQU0sR0FBRyxFQUFFLEVBQUUsQ0FBQztnQkFDbEIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFDLE1BQVcsSUFBSyxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQW5CLENBQW1CLENBQUUsQ0FBQzs7OztLQUN0RTtJQUVELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByb290LCBqdWdnbGVyIH0gZnJvbSBcIi4vcm9vdFwiO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gbWFpbigpIHtcclxuICAgIGxldCBhcHAgPSBuZXcgUElYSS5BcHBsaWNhdGlvbigge1xyXG4gICAgICAgIHdpZHRoOiAxNjAwLFxyXG4gICAgICAgIGhlaWdodDogOTAwLFxyXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogMHgxNjE2MTYsXHJcbiAgICB9ICk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGFwcC52aWV3KTtcclxuICAgIHJvb3Quc2V0QXBwKGFwcCk7XHJcblxyXG4gICAgbGV0IGZwcyA9IDYwO1xyXG4gICAgbGV0IGxhc3RUaWNrID0gMDtcclxuXHJcbiAgICBsZXQgZnBzRGlzcGxheSA9IG5ldyBQSVhJLlRleHQoXCIwXCIsIHsgYWxpZ246IFwicmlnaHRcIiwgZm9udEZhbWlseTogXCJDb3VyaWVyIE5ld1wiLCBmb250U2l6ZTogMTcsIHN0cm9rZTogMHhGRkZGRkYsIHN0cm9rZVRoaWNrbmVzczogMC41IH0gKTtcclxuICAgIGZwc0Rpc3BsYXkuYW5jaG9yLnNldCgxKTtcclxuICAgIGZwc0Rpc3BsYXkueCA9IGFwcC52aWV3LndpZHRoO1xyXG4gICAgZnBzRGlzcGxheS55ID0gYXBwLnZpZXcuaGVpZ2h0O1xyXG4gICAgYXBwLnN0YWdlLmFkZENoaWxkKGZwc0Rpc3BsYXkpO1xyXG5cclxuICAgIGp1Z2dsZXIuYWRkKCAoKSA9PiB7XHJcbiAgICAgICAgaWYgKGxhc3RUaWNrID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgdGljayA9IERhdGUubm93KCk7XHJcbiAgICAgICAgICAgIGlmICghaXNGaW5pdGUoZnBzKSkge1xyXG4gICAgICAgICAgICAgICAgZnBzID0gMTAwMCAvICh0aWNrIC0gbGFzdFRpY2spO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZnBzID0gZnBzICogMC45OSArICgxMDAwIC8gKHRpY2sgLSBsYXN0VGljaykpICogMC4wMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsYXN0VGljayA9IHRpY2s7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGFzdFRpY2sgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnBzRGlzcGxheS50ZXh0ID0gZnBzLnRvRml4ZWQoMSk7XHJcbiAgICB9ICk7XHJcblxyXG4gICAgbGV0IHNvY2tldCA9IGlvKCk7XHJcbiAgICBzb2NrZXQub24oXCJkdW5nZW9uX3BhcmFtc1wiLCAocGFyYW1zOiBhbnkpID0+IGNvbnNvbGUubG9nKHBhcmFtcykgKTtcclxufVxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIG1haW4pOyJdfQ==