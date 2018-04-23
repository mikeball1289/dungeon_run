export class Point {
    constructor(public x = 0, public y = 0) {
        
    }

    public get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public set length(v) {
        let ratio = v / this.length;
        this.x *= v;
        this.y *= v;
    }

    public scale(s: number) {
        return new Point(this.x * s, this.y * s);
    }

    public offset(x = 0, y = 0) {
        return new Point(this.x + x, this.y + y);
    }

    public copy() {
        return new Point(this.x, this.y);
    }

    public distanceTo(other: Point) {
        return this.offset(other.x, other.y).length;
    }
}