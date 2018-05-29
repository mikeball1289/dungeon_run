export interface Actor<State> extends PIXI.DisplayObject {
    update: (state: State) => void;
}