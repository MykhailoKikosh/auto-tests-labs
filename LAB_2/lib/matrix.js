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
                    sum += Math.round(this.data[i][k] * matrix.data[k][j]);
                }
                result[i][j] = sum;
            }
        }

        return new Matrix(result);
    }

    /**
     * Matrices division
     * @param matrix
     * @returns {Matrix}
     */
    div(matrix) {
        const inverseMatrix = matrix.inverse();
        return this.mul(inverseMatrix);
    }

    /**
     * matrix inversion
     * @returns {Matrix}
     */
    inverse() {
        const n = this.data.length;
        const augmented = this.data.map((row, i) =>
            [...row, ...Array(n).fill(0).map((_, j) => (i === j ? 1 : 0))]
        );

        for (let i = 0; i < n; i++) {
            let maxRow = i;
            for (let k = i + 1; k < n; k++) {
                if (Math.abs(augmented[k][i]) > Math.abs(augmented[maxRow][i])) {
                    maxRow = k;
                }
            }

            [augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];

            for (let k = i + 1; k < n; k++) {
                const factor = augmented[k][i] / augmented[i][i];
                for (let j = i; j < 2 * n; j++) {
                    augmented[k][j] -= factor * augmented[i][j];
                }
            }
        }

        for (let i = n - 1; i >= 0; i--) {
            for (let k = i - 1; k >= 0; k--) {
                const factor = augmented[k][i] / augmented[i][i];
                for (let j = 0; j < 2 * n; j++) {
                    augmented[k][j] -= factor * augmented[i][j];
                }
            }
        }

        for (let i = 0; i < n; i++) {
            const factor = augmented[i][i];
            for (let j = 0; j < 2 * n; j++) {
                augmented[i][j] /= factor;
            }
        }

        const inverseMatrix = augmented.map(row => row.slice(n));

        return new Matrix(inverseMatrix);
    }
}

export { Matrix };
