import * as chai from 'chai';
import {assert} from "chai";
import {expect} from "chai";
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

import Matrix from '../app/matrix.js';

describe('Matrix class testing using Sinon features', function() {
    let matrix;
    let getSpy, setSpy, mullAddSpy;
    let matrixMock;

    beforeEach(function() {
        matrix = new Matrix(3)

        getSpy = sinon.spy(matrix, 'get');
        setSpy = sinon.spy(matrix, 'set');
        mullAddSpy = sinon.spy(matrix, 'mull_add');
        matrixMock = sinon.mock(matrix);
    });

    afterEach(function() {
        getSpy.restore();
        setSpy.restore();
        mullAddSpy.restore();
        matrixMock.restore();
    });

    it('Should call get method with correct arguments', function() {
        matrix.get(0, 1);
        assert(getSpy.calledOnce);
        assert(getSpy.calledWith(0, 1));
    });

    it('Should call set method with correct arguments', function() {
        matrix.set(1, 1, 5);
        assert(setSpy.calledOnce);
        assert(setSpy.calledWith(1, 1, 5));
    });

    it('Should call mull_add with correct arguments', function() {
        matrix.mull_add(0, 1, 3);
        assert(mullAddSpy.calledOnce);
        assert(mullAddSpy.calledWith(0, 1, 3));
    });

    it('Should mock exists_zero_row method', function() {
        const existsZeroRowStub = sinon.stub(matrix, 'exists_zero_row').returns(true);
        const result = matrix.exists_zero_row();
        assert.strictEqual(result, true);
        existsZeroRowStub.restore();
    });

    it('Should mock get_matrix method', function() {
        matrixMock.expects('get_matrix').once().withArgs(3).returns([[3,3,3], [3,3,3], [3,3,3]]);
        const result = matrix.get_matrix(3);
        expect(result).to.deep.equal([[3,3,3], [3,3,3], [3,3,3]]);
        matrixMock.verify();
    });

    it('Should mock get_cols and get_rows method', function () {
        matrixMock.expects('get_cols').once().returns(5);
        matrixMock.expects('get_rows').once().returns(5);
        const cols = matrix.get_cols();
        const rows = matrix.get_rows();
        expect(cols).to.equal(5);
        expect(rows).to.equal(5);
    });
});
