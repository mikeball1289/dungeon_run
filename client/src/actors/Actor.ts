export class Actor {
    public x = 0;
    public y = 0;
    public velocity = new PIXI.Point(0, 0);
    public sprite: PIXI.DisplayObject;

    constructor(public width = 0, public height = 0) {
        
    }

    public get boundingBox() {
        return new PIXI.Rectangle(this.x, this.y, this.width, this.height);
    }

    public get speed() {
        return Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
    }

    public get top() {
        return this.y;
    }
    public set top(v) {
        this.y = v;
    }

    public get bottom() {
        return this.y + this.height;
    }
    public set bottom(v) {
        this.y = v - this.height;
    } 

    public get verticalCenter() {
        return this.y + this.height / 2;
    }
    public set verticalCenter(v) {
        this.y = v - this.height / 2;
    }

    public get left() {
        return this.x;
    }
    public set left(v) {
        this.x = v;
    }

    public get right() {
        return this.x + this.width;
    }
    public set right(v) {
        this.x = v - this.width;
    }

    public get horizontalCenter() {
        return this.x + this.width / 2;
    }
    public set horizontalCenter(v) {
        this.x = v - this.width / 2;
    }

    public syncVisuals() {
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }
}