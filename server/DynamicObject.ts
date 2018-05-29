export interface DynamicObject<TState, TMixin = {}> {
    tag: string;

    update(state: TState, mixin?: TMixin): DynamicObject<TState, TMixin>;
}