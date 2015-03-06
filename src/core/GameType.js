function GameType(players, config) {
    this._players = players
    this._config = config
    /**
     * Parameters:
     *   config : Configuration
     */
    this._makeBoard = function() {
        // throws not implemented exception
    }

    /**
     * Parameters:
     *   players : Player[]
     *   turnCount : int
     */
    this._turn = function(currentPlayer, turnCount) {
        // throws not implemented exception
    }

    this.getBoard = function() {
        return this._board;
    }

    this.selectShell = function(row, col) {
        // throws not implemented exception
    }

    this.run = function() {
        this._board = this._makeBoard();
        var turnCount = 0;
        for(var gameOver = false; !gameOver; ++turnCount) {
            var currentPlayer = this._players[turnCount % this._players.length];
            gameOver = this._turn(currentPlayer, turnCount);
        }
    }
}
