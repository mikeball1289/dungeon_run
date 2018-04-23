"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = require("../core/Point");
class Actor {
    constructor(size = new Point_1.Point(0, 0)) {
        this.size = size;
        this.position = new Point_1.Point();
        this.velocity = new Point_1.Point();
    }
    get width() {
        return this.size.x;
    }
    set width(v) {
        this.size.x = v;
    }
    get height() {
        return this.size.y;
    }
    set height(v) {
        this.size.y = v;
    }
    get x() {
        return this.position.x;
    }
    set x(v) {
        this.position.x = v;
    }
    get y() {
        return this.position.y;
    }
    set y(v) {
        this.position.y = v;
    }
    get left() {
        return this.position.x;
    }
    set left(v) {
        this.position.x = v;
    }
    get right() {
        return this.position.x + this.size.x;
    }
    set right(v) {
        this.position.x = v - this.size.x;
    }
    get top() {
        return this.position.y;
    }
    set top(v) {
        this.position.y = v;
    }
    get bottom() {
        return this.position.y + this.size.y;
    }
    set bottom(v) {
        this.position.y = v - this.size.y;
    }
    get horizontalCenter() {
        return this.position.y + this.size.y / 2;
    }
    set horizontalCenter(v) {
        this.position.y = v - this.size.y / 2;
    }
    get verticalCenter() {
        return this.position.y + this.size.y / 2;
    }
    set verticalCenter(v) {
        this.position.y = v - this.size.y / 2;
    }
}
exports.Actor = Actor;
