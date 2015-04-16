/* This file is to begin writing a method to check if bombs are made swaps */

/**
 * Checks to see if a bomb is formed by a given piece with the
 * pieces around it. The check is top first, so the highest (lowest
 * index) row, then the leftmost piece.
 *
 * @param {String} JSONcoord The JSON coordinate of the shell to be checked.
 * @param {Board} board The board on which the pieces being tested lie.
 * @return {unknown} Coming soon to a theater near you.
 */
function BombCheck() {}

BombCheck.checkForBomb = function(JSONcoord, board) {
    var centerCoord = JSON.parse(JSONcoord);
    var row = coord.row;
    var col = coord.col;
    var upLeft = Util.coordLeft(Util.coorUp(Centercoord));
    var up = Util.coordUp(Centercoord);
    var left = Util.coordLeft(Centercoord);
    var bomb = null;

    bomb = checkBomb(new Set([upLeft, centerCoord, up, left]), upLeft);
    if (bomb !== null) return bomb;

    var upRight = Util.coordRight(Util.coorUp(Centercoord));
    var right = Util.coordRight(centerCoord);
    bomb = checkBomb(new Set([up, centerCoord, upRight, right]), up)
    if (bomb !== null) return bomb;

    var downLeft = Util.coordLeft(Util.coorDown(Centercoord));
    var down = Util.coordDown(Centercoord);
    bomb = checkBomb(new Set([left, centerCoord, downLeft, down]), left);
    if (bomb !== null) return bomb;

    var downRight = Util.coordRight(Util.coordDown(centerCoord));
    bomb = checkBomb(new Set([centerCoord, downRight, down, right], centerCoord)
;
    return bomb;
}
