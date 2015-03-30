/**
 * A class to hold utility functions
 */
function Util() {}
/**
 * Checks if two Shells in the grid are adjacent.
 * @param row1 {int} The row corresponding to the first Shell.
 * @param col1 {int} The column corresponding to the first Shell.
 * @param row2 {int} The row corresponding to the second Shell.
 * @param col2 {int} The column corresponding to the second Shell.
 * @return {boolean} Returns true if the Shells are adjacent.
 *
 * This should be a static function when finished.
 */
Util.isAdjacent = function(row1, col1, row2, col2) {
    var rowDiff = row2 - row1;
    var colDiff = col2 - col1;

    return rowDiff === 0 && Math.abs(colDiff) === 1
        || colDiff === 0 && Math.abs(rowDiff) === 1;
};

Util.setUnion = function(A, B){
    var union = new Set([]);
    A.forEach(function(element) { union.add(element) });
    B.forEach(function(element) { union.add(element) });

    return union;
};

Util.randomInt = function(limit) {
    return Math.floor(Math.random() * limit);
};

Util.Coord = function(row, col) {
    this.row = row;
    this.col = col;
};

Util.coordUp = function(coord) {
    return new Util.Coord(coord.row-1, coord.col);
}

Util.coordDown = function(coord) {
    return new Util.Coord(coord.row+1, coord.col);
}

Util.coordLeft = function(coord) {
    return new Util.Coord(coord.row, coord.col-1);
}

Util.coordRight = function(coord) {
    return new Util.Coord(coord.row, coord.col+1);
}

Util.indexToCoord = function(index, height) {
    var row = Math.floor(index / height);
    var col = (index % height);
    return new Util.Coord(row, col);
};
