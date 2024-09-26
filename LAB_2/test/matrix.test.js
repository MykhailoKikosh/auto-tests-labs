import { expect } from "chai";
import { Matrix } from '../lib/matrix.js'

describe('Matrix Operations check', () => {
    it('Should add two matrices correctly', () => {
        const matrixA = new Matrix([[1, 2], [3, 4]]);
        const matrixB = new Matrix([[5, 6], [7, 8]]);
        const result = matrixA.add(matrixB);
        expect(result.data).to.deep.equal([[6, 8], [10, 12]]);
    });

    it('Should subtract two matrices correctly', () => {
        const matrixA = new Matrix([
            [5, 8, 3],
            [6, 7, 2],
            [4, 5, 9]
        ]);
        const matrixB = new Matrix([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ]);
        const result = matrixA.sub(matrixB);
        expect(result.data).to.deep.equal([[4, 6, 0], [2, 2, -4], [-3, -3, 0]]);
    });

    it('Should multiply two matrices correctly', () => {
        const matrixA = new Matrix([
            [5, 8, 3],
            [6, 7, 2],
            [4, 5, 9]
        ]);
        const matrixB = new Matrix([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ]);
        const result = matrixA.mul(matrixB);
        expect(result.data).to.deep.equal([[58, 74, 90], [48, 63, 78], [87, 105, 123]]);
    });
});
