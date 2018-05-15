import { Point } from "../core/Point";
import { IPoint } from "../../common/types";

export abstract class Actor<State extends IPoint = IPoint> {

    public velocity = new Point();

    constructor(public size = new Point(), public position = new Point()) {
        
    }

    public abstract serialize(): State;

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
        return this.position.x - this.width / 2;
    }
    public set left(v) {
        this.position.x = v + this.width / 2;
    }

    public get right() {
        return this.position.x + this.size.x / 2;
    }
    public set right(v) {
        this.position.x = v - this.size.x / 2;
    }
    
    public get top() {
        return this.position.y - this.height;
    }
    public set top(v) {
        this.position.y = v + this.height;
    }
    
    public get bottom() {
        return this.position.y;
    }
    public set bottom(v) {
        this.position.y = v;
    }
    
    public get horizontalCenter() {
        return this.position.x;
    }
    public set horizontalCenter(v) {
        this.position.x = v;
    }
    
    public get verticalCenter() {
        return this.position.y - this.size.y / 2;
    }
    public set verticalCenter(v) {
        this.position.y = v + this.size.y / 2;
    }

}