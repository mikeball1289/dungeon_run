define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Actor = /** @class */ (function () {
        function Actor(width, height) {
            if (width === void 0) { width = 0; }
            if (height === void 0) { height = 0; }
            this.width = width;
            this.height = height;
            this.x = 0;
            this.y = 0;
            this.velocity = new PIXI.Point(0, 0);
        }
        Object.defineProperty(Actor.prototype, "boundingBox", {
            get: function () {
                return new PIXI.Rectangle(this.x, this.y, this.width, this.height);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Actor.prototype, "speed", {
            get: function () {
                return Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Actor.prototype, "top", {
            get: function () {
                return this.y;
            },
            set: function (v) {
                this.y = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Actor.prototype, "bottom", {
            get: function () {
                return this.y + this.height;
            },
            set: function (v) {
                this.y = v - this.height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Actor.prototype, "verticalCenter", {
            get: function () {
                return this.y + this.height / 2;
            },
            set: function (v) {
                this.y = v - this.height / 2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Actor.prototype, "left", {
            get: function () {
                return this.x;
            },
            set: function (v) {
                this.x = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Actor.prototype, "right", {
            get: function () {
                return this.x + this.width;
            },
            set: function (v) {
                this.x = v - this.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Actor.prototype, "horizontalCenter", {
            get: function () {
                return this.x + this.width / 2;
            },
            set: function (v) {
                this.x = v - this.width / 2;
            },
            enumerable: true,
            configurable: true
        });
        Actor.prototype.syncVisuals = function () {
            this.sprite.x = this.x;
            this.sprite.y = this.y;
        };
        return Actor;
    }());
    exports.Actor = Actor;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYWN0b3JzL0FjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBO1FBTUksZUFBbUIsS0FBUyxFQUFTLE1BQVU7WUFBNUIsc0JBQUEsRUFBQSxTQUFTO1lBQVMsdUJBQUEsRUFBQSxVQUFVO1lBQTVCLFVBQUssR0FBTCxLQUFLLENBQUk7WUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFJO1lBTHhDLE1BQUMsR0FBRyxDQUFDLENBQUM7WUFDTixNQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ04sYUFBUSxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFLdkMsQ0FBQztRQUVELHNCQUFXLDhCQUFXO2lCQUF0QjtnQkFDSSxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN2RSxDQUFDOzs7V0FBQTtRQUVELHNCQUFXLHdCQUFLO2lCQUFoQjtnQkFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVGLENBQUM7OztXQUFBO1FBRUQsc0JBQVcsc0JBQUc7aUJBQWQ7Z0JBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbEIsQ0FBQztpQkFDRCxVQUFlLENBQUM7Z0JBQ1osSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDZixDQUFDOzs7V0FIQTtRQUtELHNCQUFXLHlCQUFNO2lCQUFqQjtnQkFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ2hDLENBQUM7aUJBQ0QsVUFBa0IsQ0FBQztnQkFDZixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzdCLENBQUM7OztXQUhBO1FBS0Qsc0JBQVcsaUNBQWM7aUJBQXpCO2dCQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ3BDLENBQUM7aUJBQ0QsVUFBMEIsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDakMsQ0FBQzs7O1dBSEE7UUFLRCxzQkFBVyx1QkFBSTtpQkFBZjtnQkFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNsQixDQUFDO2lCQUNELFVBQWdCLENBQUM7Z0JBQ2IsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDZixDQUFDOzs7V0FIQTtRQUtELHNCQUFXLHdCQUFLO2lCQUFoQjtnQkFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQy9CLENBQUM7aUJBQ0QsVUFBaUIsQ0FBQztnQkFDZCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQzVCLENBQUM7OztXQUhBO1FBS0Qsc0JBQVcsbUNBQWdCO2lCQUEzQjtnQkFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNuQyxDQUFDO2lCQUNELFVBQTRCLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2hDLENBQUM7OztXQUhBO1FBS00sMkJBQVcsR0FBbEI7WUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDM0IsQ0FBQztRQUNMLFlBQUM7SUFBRCxDQUFDLEFBaEVELElBZ0VDO0lBaEVZLHNCQUFLIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEFjdG9yIHtcclxuICAgIHB1YmxpYyB4ID0gMDtcclxuICAgIHB1YmxpYyB5ID0gMDtcclxuICAgIHB1YmxpYyB2ZWxvY2l0eSA9IG5ldyBQSVhJLlBvaW50KDAsIDApO1xyXG4gICAgcHVibGljIHNwcml0ZTogUElYSS5EaXNwbGF5T2JqZWN0O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB3aWR0aCA9IDAsIHB1YmxpYyBoZWlnaHQgPSAwKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBib3VuZGluZ0JveCgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFBJWEkuUmVjdGFuZ2xlKHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzcGVlZCgpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMudmVsb2NpdHkueCAqIHRoaXMudmVsb2NpdHkueCArIHRoaXMudmVsb2NpdHkueSAqIHRoaXMudmVsb2NpdHkueSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB0b3AoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgdG9wKHYpIHtcclxuICAgICAgICB0aGlzLnkgPSB2O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgYm90dG9tKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnkgKyB0aGlzLmhlaWdodDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgYm90dG9tKHYpIHtcclxuICAgICAgICB0aGlzLnkgPSB2IC0gdGhpcy5oZWlnaHQ7XHJcbiAgICB9IFxyXG5cclxuICAgIHB1YmxpYyBnZXQgdmVydGljYWxDZW50ZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueSArIHRoaXMuaGVpZ2h0IC8gMjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgdmVydGljYWxDZW50ZXIodikge1xyXG4gICAgICAgIHRoaXMueSA9IHYgLSB0aGlzLmhlaWdodCAvIDI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBsZWZ0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLng7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IGxlZnQodikge1xyXG4gICAgICAgIHRoaXMueCA9IHY7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCByaWdodCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy54ICsgdGhpcy53aWR0aDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgcmlnaHQodikge1xyXG4gICAgICAgIHRoaXMueCA9IHYgLSB0aGlzLndpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaG9yaXpvbnRhbENlbnRlcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy54ICsgdGhpcy53aWR0aCAvIDI7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IGhvcml6b250YWxDZW50ZXIodikge1xyXG4gICAgICAgIHRoaXMueCA9IHYgLSB0aGlzLndpZHRoIC8gMjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3luY1Zpc3VhbHMoKSB7XHJcbiAgICAgICAgdGhpcy5zcHJpdGUueCA9IHRoaXMueDtcclxuICAgICAgICB0aGlzLnNwcml0ZS55ID0gdGhpcy55O1xyXG4gICAgfVxyXG59Il19