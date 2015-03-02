function GameType(players, config) {
    /**
     * Parameters:
     *   config : Configuration
     */
    this._makeBoard = function (config) {
        // throws not implemented exception
    }

    /**
     * Parameters:
     *   players : Player[]
     *   turnCount : int
     */
    this._turn = function (players, turnCount) {
        // throws not implemented exception
    }

    this.getBoard = function () {
        return this._board;
    }

    this.run = function () {
        this._board = this._makeBoard(config);
        var turnCount = 0;
        do {
            var currentPlayer = players[turnCount % players.length];
            var gameOver = this._turn(currentPlayer, turnCount);
            ++turnCount;
        } while (!gameOver);
        
    }
}
