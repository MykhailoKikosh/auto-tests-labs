class Matrix {
    constructor(data) {
        this.data = data;
    }

    /**
     * Add two matrices
     * @param matrix
     * @returns {Matrix}
     */
    add(matrix) {
        return new Matrix(this.data.map((row, i) =>
            row.map((val, j) => val + matrix.data[i][j])
        ));
    }

    /**
     * Subtract two matrices
     * @param matrix
     * @returns {Matrix}
     */
    sub(matrix) {
        return new Matrix(this.data.map((row, i) =>
            row.map((val, j) => val - matrix.data[i][j])
        ));
    }
}

export { Matrix };
