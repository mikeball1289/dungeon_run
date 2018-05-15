
export interface Controls {
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
    jump: boolean;
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
}

export enum EMovingDirection {
    NONE,
    LEFT,
    RIGHT,
}