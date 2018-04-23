export class Map2D<V> {

    private data: V[] = [];
    set(i: number, j: number, data: V) {
        if (i < 0 || j < 0) throw new Error("Map2D index out of bounds.");
        this.data[cpf(i + 1, j + 1) - 1] = data;
    }
    get(i: number, j: number): V {
        if (i < 0 || j < 0) throw new Error("Map2D index out of bounds.");
        return this.data[cpf(i + 1, j + 1) - 1];
    }
}

function cpf(i: number, j: number) {
    return ((i + j - 2) * (i + j - 1) + i) / 2;
}