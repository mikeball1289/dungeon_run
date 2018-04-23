"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Map2D {
    constructor() {
        this.data = [];
    }
    set(i, j, data) {
        if (i < 0 || j < 0)
            throw new Error("Map2D index out of bounds.");
        this.data[cpf(i + 1, j + 1) - 1] = data;
    }
    get(i, j) {
        if (i < 0 || j < 0)
            throw new Error("Map2D index out of bounds.");
        return this.data[cpf(i + 1, j + 1) - 1];
    }
}
exports.Map2D = Map2D;
function cpf(i, j) {
    return ((i + j - 2) * (i + j - 1) + i) / 2;
}
