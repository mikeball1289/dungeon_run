
export interface Controls {
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
    jump: boolean;
    target: IPoint;
}

export interface IPoint {
    x: number;
    y: number;
}

export interface IPlayerState extends IPoint {
    moving: EMovingDirection;
}

export interface IOwnData {
    id: string;
}

export interface IPlayersPacket {
    [id: string]: IPlayerState;
}

export interface GameStatePacket {
    timestamp: number;
    players: IPlayersPacket;
    enemies: IEnemiesPacket;
}

export enum EMovingDirection {
    NONE,
    LEFT,
    RIGHT,
}

export interface IEnemyState {
    tag: string;
    x: number;
    y: number;
}

export interface IEnemiesPacket {
    [id: string]: IEnemyState;
}