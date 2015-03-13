function Board(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    /**
     * Creates the 2-D grid with null references.
     * @type{array}
     */
    this._grid = []
    for (var i = 0; i < rows; ++i) {
        this._grid.push([]);
	for (var j = 0; j < cols; ++j) {
            this._grid[i].push(null);
        }
    }
    /**
     * Assigns a value to a spot in the grid.
     * @param row {int} The row where the Shell will be placed.
     * @param col {int} The column where the Shell will be placed.
     * @param x {Shell} The Shell which will be placed in the grid.
     */
    this.set = function(row,col,x) {
        this._grid[row][col] = x;
    }
    /**
     * Returns a shell in a given row and column.
     * @param row {int} The row of the Shell requested.
     * @param col {int} The column of the Shell requested.
     * @return {Shell} The Shell in (row,col).
     */
    this.get = function(row,col) {
        return this._grid[row][col];
    }
}
