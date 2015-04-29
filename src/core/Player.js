/**
 * A Player object is the representation of the user. It keeps track of their
 * score, moves, and their board.
 */
function Player(){
    this.getBoard = getBoard;
    this.setBoard = setBoard;
    this.setSelectShell = setSelectShell;
    var board;
    this.score = 0;
    var parentSelectShell;
    /**
     * SelectShell is a called to redirect the input to the gameTypes 
     * selectShell. A gameType must define a player objects parentSelectShell
     * for this to work.
     * @param {number} row The row# of the selected shell.
     * @param {number} col The col# of the selected shell.
     */
    this.selectShell = function(row, col){
        parentSelectShell(this, row, col);
    }
    /**
     * Returns this Players board.
     * @return {Board} board This Players board object.
     */
    function getBoard() {
        return board;
    }
    /**
     * Sets this Players board. Called when the gameType creates a board for a 
     * player.
     * @param {Board} newBoard The board that is being assigned to this player.
     */
    function setBoard(newBoard) {
        board = newBoard;
    }
    /**
     * Sets this players parentSelectShell. This is set by a the gameType when
     * it initializes a game. parentSelectShell is this gameTypes specific
     * selectShell method.
     * @param {Function} f the gameTypes specific selectShell method.
     */
    function setSelectShell(f){
        parentSelectShell = f;
    }
}
