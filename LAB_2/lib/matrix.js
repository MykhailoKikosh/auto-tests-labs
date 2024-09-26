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

    /**
     * Multiply matrix to other matrix
     * @param matrix
     * @returns {Matrix}
     */
    mul(matrix) {
        const result = [];
        for (let i = 0; i < this.data.length; i++) {
            result[i] = [];
            for (let j = 0; j < matrix.data[0].length; j++) {
                let sum = 0;
                for (let k = 0; k < this.data[0].length; k++) {
                    sum += this.data[i][k] * matrix.data[k][j];
                }
                result[i][j] = sum;
            }
        }

        return new Matrix(result);
    }
}

export { Matrix };
