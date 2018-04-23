import { Point } from "../core/Point";

export class Actor {

    public position = new Point();
    public velocity = new Point();

    constructor(public size: Point = new Point(0, 0)) {
        
    }

    public get width() {
        return this.size.x;
    }
    public set width(v) {
        this.size.x = v;
    }
    
    public get height() {
        return this.size.y;
    }
    public set height(v) {
        this.size.y = v;
    }

    public get x() {
        return this.position.x;
    }
    public set x(v) {
        this.position.x = v;
    }

    public get y() {
        return this.position.y;
    }
    public set y(v) {
        this.position.y = v;
    }

    public get left() {
        return this.position.x;
    }
    public set left(v) {
        this.position.x = v;
    }

    public get right() {
        return this.position.x + this.size.x;
    }
    public set right(v) {
        this.position.x = v - this.size.x;
    }
    
    public get top() {
        return this.position.y;
    }
    public set top(v) {
        this.position.y = v;
    }
    
    public get bottom() {
        return this.position.y + this.size.y;
    }
    public set bottom(v) {
        this.position.y = v - this.size.y;
    }
    
    public get horizontalCenter() {
        return this.position.y + this.size.y / 2;
    }
    public set horizontalCenter(v) {
        this.position.y = v - this.size.y / 2;
    }
    
    public get verticalCenter() {
        return this.position.y + this.size.y / 2;
    }
    public set verticalCenter(v) {
        this.position.y = v - this.size.y / 2;
    }

}