export class Vector {
    constructor(private components:number[]) {}

    get dimension():number {
        return this.components.length;
    }

    get magnitude():number {
        const squares = this.components.map(c => c * c);
        const sumOfSquares = squares.reduce((a,b) => a + b, 0);
        return Math.sqrt(sumOfSquares);
    }
}