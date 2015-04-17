/* This file is to begin writing a method to check if bombs are made swaps */

/**
 * Checks to see if a bomb is formed by a given piece with the
 * pieces around it. The check is top first, so the highest (lowest
 * index) row, then the leftmost piece.
 *
 * @param {String} JSONcoord The JSON coordinate of the shell to be checked.
 * @param {Board} board The board on which the pieces being tested lie.
 * @param {int} width The width of the board.
 * @param {in} height The height of the board.
 * @return {unknown} Coming soon to a theater near you.
 */
function BombCheck() {}

BombCheck.checkForBomb = function(JSONcoord, board, width, height) {
    var centerCoord = JSON.parse(JSONcoord);
    var row = coord.row;
    var col = coord.col;
    var bomb = null;
    var onLeft = (col === 0);
    var onRight = (col === width - 1);
    var onTop = (row === 0);
    var onBottom = (row === height - 1);
    if (!(onLeft || onTop)) {
        var upLeft = Util.coordLeft(Util.coordUp(centerCoord));
        var up = Util.coordUp(centerCoord);
        var left = Util.coordLeft(centerCoord);
        bomb = checkBomb(new Set([upLeft, centerCoord, up, left]), upLeft);
        if (bomb !== null) {
            return bomb;
        }
    }
    if (!(onTop || onRight)) {
        var upRight = Util.coordRight(Util.coorUp(centerCoord));
        var right = Util.coordRight(centerCoord);
        bomb = checkBomb(new Set([up, centerCoord, upRight, right]), up)
        if (bomb !== null) {
             return bomb;
        }
    }
    if (!(onBottom || onLeft)) {
        var downLeft = Util.coordLeft(Util.coorDown(centerCoord));
        var down = Util.coordDown(centerCoord);
        bomb = checkBomb(new Set([left, centerCoord, downLeft, down]), left);
        if (bomb !== null) {
            return bomb;
        }
    }
    if (!(onBottom || onRight)) {
        var downRight = Util.coordRight(Util.coordDown(centerCoord));
        bomb = checkBomb(new Set([centerCoord, downRight, down, right], 
                                 centerCoord));
    }
    return bomb;
}

    
