var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "../../../common/TemplateRoom", "./Decorator"], function (require, exports, TemplateRoom_1, Decorator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StandardTemplateRoomProvider = /** @class */ (function () {
        function StandardTemplateRoomProvider() {
        }
        StandardTemplateRoomProvider_1 = StandardTemplateRoomProvider;
        StandardTemplateRoomProvider.ready = function () {
            var _this = this;
            var p = new Promise(function (resolve, reject) {
                if (_this.templates === undefined) {
                    var req = new XMLHttpRequest();
                    req.open("GET", "/templates.json");
                    req.addEventListener("load", function (e) {
                        var templates = JSON.parse(this.responseText).map(function (d) { return new TemplateRoom_1.TemplateRoom(d); });
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
        };
        StandardTemplateRoomProvider.isReady = function () {
            return this.templates !== undefined;
        };
        StandardTemplateRoomProvider = StandardTemplateRoomProvider_1 = __decorate([
            Decorator_1.staticImplements()
        ], StandardTemplateRoomProvider);
        return StandardTemplateRoomProvider;
        var StandardTemplateRoomProvider_1;
    }());
    exports.StandardTemplateRoomProvider = StandardTemplateRoomProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhbmRhcmRUZW1wbGF0ZVJvb21Qcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9wcm92aWRlcnMvU3RhbmRhcmRUZW1wbGF0ZVJvb21Qcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7SUFLQTtRQUFBO1FBOEJBLENBQUM7eUNBOUJZLDRCQUE0QjtRQUl2QixrQ0FBSyxHQUFuQjtZQUFBLGlCQW9CQztZQW5CRyxJQUFJLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBUSxVQUFDLE9BQU8sRUFBRSxNQUFNO2dCQUN2QyxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQy9CLElBQUksR0FBRyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7b0JBQy9CLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLGlCQUFpQixDQUFDLENBQUM7b0JBQ25DLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsVUFBUyxDQUFDO3dCQUNuQyxJQUFJLFNBQVMsR0FBbUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFFLFVBQUMsQ0FBYSxJQUFLLE9BQUEsSUFBSSwyQkFBWSxDQUFDLENBQUMsQ0FBQyxFQUFuQixDQUFtQixDQUFFLENBQUM7d0JBQzVHLDhCQUE0QixDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7d0JBQ25ELE9BQU8sRUFBRSxDQUFDO3dCQUNWLHlEQUF5RDt3QkFDekQsMEZBQTBGO3dCQUMxRixpQkFBaUI7b0JBQ3JCLENBQUMsQ0FBRSxDQUFDO29CQUNKLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQ3RDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDZixDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLE9BQU8sRUFBRSxDQUFDO2dCQUNkLENBQUM7WUFDTCxDQUFDLENBQUUsQ0FBQztZQUNKLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDYixDQUFDO1FBRWEsb0NBQU8sR0FBckI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUM7UUFDeEMsQ0FBQztRQTVCUSw0QkFBNEI7WUFEeEMsNEJBQWdCLEVBQWE7V0FDakIsNEJBQTRCLENBOEJ4QztRQUFELG1DQUFDOztLQUFBLEFBOUJELElBOEJDO0lBOUJZLG9FQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRlbXBsYXRlUm9vbSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vVGVtcGxhdGVSb29tXCI7XHJcbmltcG9ydCB7IHN0YXRpY0ltcGxlbWVudHMgfSBmcm9tIFwiLi9EZWNvcmF0b3JcIjtcclxuaW1wb3J0IHsgSVByb3ZpZGVyIH0gZnJvbSBcIi4vSVByb3ZpZGVyXCI7XHJcblxyXG5Ac3RhdGljSW1wbGVtZW50czxJUHJvdmlkZXI+KClcclxuZXhwb3J0IGNsYXNzIFN0YW5kYXJkVGVtcGxhdGVSb29tUHJvdmlkZXIge1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgdGVtcGxhdGVzOiBUZW1wbGF0ZVJvb21bXTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWR5KCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGxldCBwID0gbmV3IFByb21pc2U8dm9pZD4oIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGVtcGxhdGVzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGxldCByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICAgICAgICAgIHJlcS5vcGVuKFwiR0VUXCIsIFwiL3RlbXBsYXRlcy5qc29uXCIpO1xyXG4gICAgICAgICAgICAgICAgcmVxLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcGxhdGVzOiBUZW1wbGF0ZVJvb21bXSA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZVRleHQpLm1hcCggKGQ6IG51bWJlcltdW10pID0+IG5ldyBUZW1wbGF0ZVJvb20oZCkgKTtcclxuICAgICAgICAgICAgICAgICAgICBTdGFuZGFyZFRlbXBsYXRlUm9vbVByb3ZpZGVyLnRlbXBsYXRlcyA9IHRlbXBsYXRlcztcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGVtcGxhdGVzLmZvckVhY2goICh0KSA9PiBjb25zb2xlLmxvZyh0LnRvU3RyaW5nKCkpICk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IGR1bmdlb24gPSAod2luZG93IGFzIGFueSkuZHVuZ2VvbiA9IER1bkdlbih0ZW1wbGF0ZXMsIHsgaGVpZ2h0OiAxMDAsIHdpZHRoOiAxMDAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbWFpbihkdW5nZW9uKTtcclxuICAgICAgICAgICAgICAgIH0gKTtcclxuICAgICAgICAgICAgICAgIHJlcS5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgcmVqZWN0KTtcclxuICAgICAgICAgICAgICAgIHJlcS5zZW5kKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICk7XHJcbiAgICAgICAgcmV0dXJuIHA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBpc1JlYWR5KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRlbXBsYXRlcyAhPT0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=