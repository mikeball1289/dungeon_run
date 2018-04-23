"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    set length(v) {
        let ratio = v / this.length;
        this.x *= v;
        this.y *= v;
    }
    scale(s) {
        return new Point(this.x * s, this.y * s);
    }
    offset(x = 0, y = 0) {
        return new Point(this.x + x, this.y + y);
    }
    copy() {
        return new Point(this.x, this.y);
    }
    distanceTo(other) {
        return this.offset(other.x, other.y).length;
    }
}
exports.Point = Point;
