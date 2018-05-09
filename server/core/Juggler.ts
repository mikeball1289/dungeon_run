export class Juggler {
    private enterFrameFunctions: [(() => void), any][] = [];
    private schedule: number;
    private interFrameTime: number;

    constructor(private fps: number) {
        this.interFrameTime = 1000 / fps;
        this.schedule = Date.now() + this.interFrameTime;
        let tick = () => {
            this.enterFrameFunctions.forEach( ([fn, ctx]) => fn.call(ctx) );
            this.schedule += this.interFrameTime;

            let timeout = this.schedule - Date.now();
            if (timeout < 2) {
                timeout = 2;
                this.schedule = Date.now() + this.interFrameTime;
            }
            setTimeout(tick, this.schedule - Date.now());
        };

        setTimeout(tick, this.interFrameTime);
    }

    public add(fn: () => void, context?: any) {
        if (this.has(fn, context) < 0) {
            this.enterFrameFunctions.push([fn, context]);
        }
    }

    public remove(fn: () => void, context?: any) {
        let idx = this.has(fn, context);
        if (idx >= 0) {
            this.enterFrameFunctions.splice(idx, 1);
        }
    }

    public has(fn: () => void, context?: any) {
        for (let [i, oef] of enumerate(this.enterFrameFunctions)) {
            if (oef[0] === fn && oef[1] === context) return i;
        }
        return -1;
    }

    public afterFrames(numFrames: number, fn: () => void, context?: any) {
        let wrapper = () => {
            numFrames --;
            if (numFrames <= 0) {
                fn.call(context);
                this.remove(wrapper);
            }
        };
        this.add(wrapper);
    }
}


function* enumerate<T>(arr: T[]): Iterable<[number, T]> {
    let i = 0;
    for (let el of arr) {
        yield [i++, el];
    }
}