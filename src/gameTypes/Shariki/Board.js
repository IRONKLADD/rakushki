function Board(rows, cols) {
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
     * @param {row} The row where the Shell will be placed.
     * @param {col} The column where the Shell will be placed.
     * @param {x} The Shell which will be placed in the grid.
     */
    this.set = function(row,col,x) {
        this._grid[row][col] = x;
    }
    /**
     * Returns a shell in a given row and column.
     * @param {row} The row of the Shell requested.
     * @param {col} The column of the Shell requested.
     * @return {Shell} The Shell in (row,col).
     */
    this.get = function(row,col) {
        return this._grid[row][col];
    }
    /**
     * Checks if two Shells in the grid are adjacent.
     * @param {row1} The row corresponding to the first Shell.
     * @param {col1} The column corresponding to the first Shell.
     * @param {row2} The row corresponding to the second Shell.
     * @param {col2} The column corresponding to the second Shell.
     * @return {boolean} Returns true if the Shells are adjacent.
     *
     * This should be a static function when finished.
     */
    this.isAdjacent = function(row1, col1, row2, col2) {
        var rowDiff = row2 - row1;
        var colDiff = col2 - col1;
        if(rowDiff === 0) {
            return (colDiff === -1 || colDiff === 1);
        }
        else if(colDiff === 0) {
            return (rowDiff === -1 || colDiff === 1);
        }
            return false;
    }
}
