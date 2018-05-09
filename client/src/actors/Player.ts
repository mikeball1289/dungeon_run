export class Player extends PIXI.Container {
    
    constructor(state: IPoint) {
        super();
        let graphics = new PIXI.Graphics();
        graphics.beginFill(0x0000FF);
        graphics.drawRect(0, 0, 25, 25);
        graphics.endFill();
        this.addChild(graphics);
        this.x = state.x;
        this.y = state.y;
        this.pivot.set(12.5, 25);
    }

    update(state: IPoint) {
        this.x = state.x;
        this.y = state.y;
    }
}