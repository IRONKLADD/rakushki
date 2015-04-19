/**
 * A class to hold utility functions
 */
function Util() {}
/**
 * Checks if two Shells in the grid are adjacent, given their coordinates.
 *
 * @param row1 {int} The row corresponding to the first Shell.
 * @param col1 {int} The column corresponding to the first Shell.
 * @param row2 {int} The row corresponding to the second Shell.
 * @param col2 {int} The column corresponding to the second Shell.
 *
 * @return {boolean} true if the Shells are adjacent, otherwise false.
 */
Util.isAdjacent = function(row1, col1, row2, col2) {
    var rowDiff = row2 - row1;
    var colDiff = col2 - col1;

    return rowDiff === 0 && Math.abs(colDiff) === 1
        || colDiff === 0 && Math.abs(rowDiff) === 1;
};

/**
 * Returns the union of two Set objects.
 *
 * @param A {Set}
 * @param B {Set}
 *
 * @return {Set} The union of sets A and B.
 */
Util.setUnion = function(A, B){
    var union = new Set([]);
    A.forEach(function(element) { union.add(element) });
    B.forEach(function(element) { union.add(element) });

    return union;
};

/**
 * Returns a random integer on the interval [0, limit).
 *
 * @param limit {int}
 *
 * @return {int}
 */
Util.randomInt = function(limit) {
    return Math.floor(Math.random() * limit);
};

/**
 * Returns a random element from the array.
 *
 * @param arr {Object[]}
 *
 * @return {Object}
 */
Util.selectRandom = function(arr) {
    return arr[Util.randomInt(arr.length)];
};

/**
 * Returns a coordinate object.
 *
 * @param row {int} The coordinate's row.
 * @param col {int} The coordinate's column.
 *
 * @return {Coord}
 */
Util.Coord = function(row, col) {
    this.row = row;
    this.col = col;
};

/**
 * Returns the coordinate object above the given coordinate.
 *
 * @param coord {Coord}
 *
 * @return {Coord}
 */
Util.coordUp = function(coord) {
    return new Util.Coord(coord.row-1, coord.col);
}

/**
 * Returns the coordinate object below the given coordinate.
 *
 * @param coord {Coord}
 *
 * @return {Coord}
 */
Util.coordDown = function(coord) {
    return new Util.Coord(coord.row+1, coord.col);
}

/**
 * Returns the coordinate object left of the given coordinate.
 *
 * @param coord {Coord}
 *
 * @return {Coord}
 */
Util.coordLeft = function(coord) {
    return new Util.Coord(coord.row, coord.col-1);
}

/**
 * Returns the coordinate object right of the given coordinate.
 *
 * @param coord {Coord}
 *
 * @return {Coord}
 */
Util.coordRight = function(coord) {
    return new Util.Coord(coord.row, coord.col+1);
}

/**
 * Returns the Coord in the 2D board associated with the given 1D index.
 *
 *  \  0 1 2
 *   +-------+
 * 0 | 0 1 2 |
 * 1 | 3 4 5 |
 * 2 | 6 7 8 |
 *   +-------+
 *
 * @param index {int} The 1D index
 * @param height {int} The height of the board
 *
 * @return {Coord}
 */
Util.indexToCoord = function(index, height) {
    var row = Math.floor(index / height);
    var col = (index % height);
    return new Util.Coord(row, col);
};

/**
 * Returns a seeded random number generator.
 *
 * @param seed {int} The RNG seed.
 *
 * @return {Function} The RNG function.
 */
Util.seededRandom = function(seed) {
    function random() {
        var x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    }
    return random;
};

/**
 * Takes a set of shell coordinates, and the width of the board,
 * returns an array whose indices correspond to the columns of the board,
 * and whose values correspond to the highest row in that column, present in
 * the set of shell coordinates.
 */
Util.colMax = function(shellCoords, width) {
    var cols = new Array(width);
    shellCoords.forEach(function(JSONcoord) {
        var coord = JSON.parse(JSONcoord);
        var currentRow = cols[coord.col];
        if (currentRow === undefined || currentRow < coord.row)
            cols[coord.col] = coord.row;
    });

    return cols;
};


Util.partial = function(f) {
     var slice = Array.prototype.slice,
        stored_args = slice.call(arguments, 1);
     return function () {
        var new_args = slice.call(arguments),
              args = stored_args.concat(new_args);
        return f.apply(null, args);
     };
}

Util.mod = function(x, n) {
    return ((x%n)+n)%n;
}
