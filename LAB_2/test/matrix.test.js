import { expect } from "chai";
import { Matrix } from '../lib/matrix.js'

describe('Matrix Operations check', () => {
    it('Should add two matrices correctly', () => {
        const matrixA = new Matrix([[1, 2], [3, 4]]);
        const matrixB = new Matrix([[5, 6], [7, 8]]);
        const result = matrixA.add(matrixB);
        expect(result.data).to.deep.equal([[6, 8], [10, 12]]);
    });
});
