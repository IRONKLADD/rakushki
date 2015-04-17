function Board(rows, cols) {
    this.get = get;
    this.rows = rows;
    this.cols = cols;
    this.printArr = printArr;
    /**
     * Creates the 2-D grid with null references.
     * @type{array}
     */
    var _grid = []
    for (var i = 0; i < rows; ++i) {
        _grid.push([]);
        for (var j = 0; j < cols; ++j) {
            _grid[i].push(null);
        }
    }
    /**
     * Assigns a value to a spot in the grid.
     * @param row {int} The row where the Shell will be placed.
     * @param col {int} The column where the Shell will be placed.
     * @param x {Shell} The Shell which will be placed in the grid.
     */
    this.set = function(row,col,x) {
        _grid[row][col] = x;
    }
    /**
     * Returns a shell in a given row and column.
     * @param row {int} The row of the Shell requested.
     * @param col {int} The column of the Shell requested.
     * @return {Shell} The Shell in (row,col).
     */
    function get(row,col) {
        // console.log(row);
        // console.log(col);
        return _grid[row][col];
    }
    function printArr(){
        var temp = "";
        for(i = 0;i<3;i++){
            for(j = 0;j<3;j++){
                temp = temp +" " + _grid[i][j].color;
            }
            temp = temp + "\n";
        }
        console.log(temp);
        return temp;
    }
}
