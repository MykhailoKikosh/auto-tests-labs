import Mtrx from 'mtrx';
import { expect } from "chai";
import { assert } from "chai";

const matrix1 = new Mtrx([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]);

const matrix2 = new Mtrx([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]);

// Service function for inversion check
// to avoid JS precision issues
function roundMatrix(matrix) {
    return matrix.map(row => row.map(value => Math.round(value)));
}

describe('Mtrx Library base functionality test', () => {
    it('Should check if matrix is Mtrx type object', () => {
        assert.instanceOf(matrix1, Mtrx);
    });

    it('Should add two matrices', () => {
        const result = Mtrx.add(matrix1, matrix2);
        expect(result).to.deep.equal([ [ 2, 4, 6 ], [ 8, 10, 12 ], [ 14, 16, 18 ] ]);
    });

    it('Should substitute two matrices', () => {
        const result = Mtrx.sub(matrix1, matrix2);
        expect(result).to.deep.equal([ [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ]);
    });

    it('Should multiply two matrices', () => {
        const result = Mtrx.mul(matrix1, matrix2);
        expect(result).to.deep.equal([ [ 30, 36, 42 ], [ 66, 81, 96 ], [ 102, 126, 150 ] ]);
    });

    it('Should divide two matrices', () => {
        const m = new Mtrx([[1, 0, 0], [0, 1, 0], [0, 0, 1]])
        const n = new Mtrx([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
        const result = Mtrx.div(n, m);
        expect(result).to.deep.equal([ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]);
    });

    it('Should check matrix inversion function', () => {
        const i = new Mtrx([[4, 7], [2, 6]]);
        const result = i.inv()
        const result_check = roundMatrix(result.inv());
        expect(result_check).to.deep.equal([ [4, 7], [2, 6] ]);
    });

    it('Should check equality of two matrices', () => {
        const eq1 = new Mtrx([[4, 7], [2, 6]]);
        const eq2 = new Mtrx([[4, 6], [7, 6]]);
        const result = Mtrx.equal(eq1, eq2);
        assert.equal(result.toString(), 'true,false,false,true');
    });

    it('Should check equality of two matrices by all elements', () => {
        const result = Mtrx.equalAll(matrix1, matrix2);
        expect(result).to.be.equal(true);
    });

    it('Should check equality of two matrices by any element', () => {
        const result = Mtrx.equalAny(matrix1, matrix2);
        expect(result).to.be.equal(true);
    });
});