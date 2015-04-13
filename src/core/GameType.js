function GameType(players, config) {
    this._players = players
    this._config = config
    /**
     * creates a board for this game. This is gametype specific and thus should
     * be defined by the concrete game type.
     */
    this._makeBoard = function() {
        // throws not implemented exception
    }

    /**
     * NOT WRITTEN
     * @param {Player} currentPlayer
     * @param {number} turnCount
     */
    this._turn = function(currentPlayer, turnCount) {
        // throws not implemented exception
    }
    /**
     * returns the game types current board.
     * @return {Board} _board the current Board of this game Type
     */
    this.getBoard = function() {
        return this._board;
    }
    /**
     * A sample way to take user input must be defined by the gameType
     * @param {number} row the row of the shell that was selected.
     * @param {number} col the col of the shell that was selected.
     */
    this.selectShell = function(row, col) {
        // throws not implemented exception
    }
    /**
     * NOT WRITTEN
     */
    this.run = function() {
        this._board = this._makeBoard();
        var turnCount = 0;
        for(var gameOver = false; !gameOver; ++turnCount) {
            var currentPlayer = this._players[turnCount % this._players.length];
            gameOver = this._turn(currentPlayer, turnCount);
        }
    }
}
