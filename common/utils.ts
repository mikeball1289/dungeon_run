export const vennIntersection = <T>(l1: T[], l2: T[], sort?: (a: T, b: T) => number): { l1: T[], l2: T[], both: T[] } => {
    l1 = l1.slice().sort(sort);
    l2 = l2.slice().sort(sort);
    if (!sort) sort = (a, b) => a < b ? -1 : a > b ? 1 : 0;
    let l1elements: T[] = [];
    let l2elements: T[] = [];
    let both: T[] = [];
    while(l1.length && l2.length) {
        let ord = sort(l1[0], l2[0]);
        if (ord === 0) {
            both.push(l1.shift()!);
            l2.shift();
        } else if (ord < 1) {
            l1elements.push(l1.shift()!);
        } else {
            l2elements.push(l2.shift()!);
        }
    }
    return {
        l1: l1elements.concat(l1),
        l2: l2elements.concat(l2),
        both,
    }
}

export const Keys = <T>(obj: T): (keyof T)[] => Object.keys(obj) as (keyof T)[];

interface IOnceable {
    once: (event: string, fn: Function) => void;
}

export async function dataFromSocket<Data>(socket: IOnceable, packetName: string, timeout = 1000) {
    return new Promise<Data>( (resolve, reject) => {
        let timer = setTimeout(reject, timeout);
        socket.once(packetName, (data: Data) => (clearTimeout(timer), resolve(data)) );
    } );
}