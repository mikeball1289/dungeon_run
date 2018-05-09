// declare type DungeonParams = { seed: number, width: number, height: number };

declare interface Controls {
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
    jump: boolean;
}

declare interface IPoint {
    x: number;
    y: number;
}

declare interface IPlayersPacket {
    [id: string]: IPoint;
}

declare interface GameStatePacket {
    timestamp: number;
    players: IPlayersPacket;
}