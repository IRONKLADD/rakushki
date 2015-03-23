function SharikiGameType(players, config) {
    /**
     * Whether there is an active (selected) shell.
     * @type {boolean}
     */
    this._isActive = false;
    /**
     * The row of the active shell.
     * @type {number};
     */
    this._activeRow = null;
    /**
     * The column of the active shell.
     * @type {number}
     */
    this._activeCol = null;

    /**
     * Whether there is a valid swap at this moment in time.
     * @type {boolean}
     */
    this._validSwap = false;
    
    this.init();

    this.init = function(){
        for(var i = 0; i < players.length; i++){
            players[i].parentSelectShell = this.selectShell;
        }
        _makeBoard();
    }
    /**
     * Constructs a Board object using the constraints imposed by Shariki
     * and the configuration, and stores it in this._board.
    */
    this._makeBoard = function() {
        this._board = new Board(this._config.width, this._config.height);
        this._fillBoard(this._board);
    }

    /**
     * Generates randomly colored shells to fill the board
     * 
     * @param {Board} board the board to be filled
     */
    this._fillBoard = function(board) {
        for (var row = 0; row < board.rows; ++row) {
            for (var col = 0; col < board.cols; ++col) {
                var c = Math.floor(Math.random()*3)
                board.set(row,col,new Shell(config.allowedColors[c],null,"normal",null));
            }
        }
    }

    /**
     * Executes a single turn of the game. While waiting for the user to make
     * a move, a background task is run to check if the board is in the
     * game-over state (see this._checkBoard()). Returns whether or not the
     * game is in fact over at the beginning of the turn.
     *
     * @param {Player} currentPlayer The current player (unused)
     * @param {number} turnCount The current turn number (unused)
     */
    this._turn = function(currentPlayer, turnCount) {
        var gameOver = this._checkBoard();
        if(gameOver)
            return true;
        while(!this._validSwap) {
            // wait T milliseconds
        }
        this._validSwap = false;
        return false;
    }

    /**
     * This method handles the functionality of selecting a single shell.

     * @param {number} row The row of the selected shell
     * @param {number} col The column of the selected shell
     */
    this.selectShell = function(player,row, col) {
        // no shell is active, make selected shell active
        if(!this._isActive) {
            this._isActive = true;
            this._activeRow = row;
            this._activeCol = col;
            // notify renderer here
        }
        // selected shell is adjacent to active shell, try to swap
        else if(Util.isAdjacent(this._activeRow, this._activeCol, row, col)) {
            this._trySwap(this._activeRow, this._activeCol, row, col);
        }
        // unselect shell
        else {
            this._isActive = false;
            this._activeRow = null;
            this._activeCol = null;
            // notify renderer here
        }
    }

    /**
     * Attempts to make a swap.
     */
    this._trySwap = function(player,activeRow, activeCol, selectedRow, selectedCol) {
        this._swap(player.board, activeRow, activeCol, selectedRow, selectedCol);
        // notify renderer (in parallel)

        var validSwap = this._makeConnection(player, activeRow,   activeCol,
                                             selectedRow, selectedCol);

        if(!validSwap) {
            this._swap(player.board, activeRow, activeCol, selectedRow, selectedCol);
            // notify renderer
        }
    }

    /**
     * Checks if the 2 swapped shells make a connection
     * If they do, clear the connected shells, give points, and make new
     * shells fall in.
     *
     * @param  {number} activeRow Row of active shell.
     * @param  {number} activeCol Column of active shell.
     * @param  {number} selectedRow Row of selected shell.
     * @param  {number} selectedCol Column of selected shell.
     * @return {boolean} Whether or not the swap was valid.
     */
    this._makeConnection = function(player,activeRow, activeCol,
                                    selectedRow, selectedCol) {
        var activeShell = player.board.get(activeRow, activeCol);
        var selectedShell = player.board.get(selectedRow, selectedCol);

        // ...
    }

    /**
     * Swaps two shells.
     *
     * @param  {number} activeRow Row of active shell.
     * @param  {number} activeCol Column of active shell.
     * @param  {number} selectedRow Row of selected shell.
     * @param  {number} selectedCol Column of selected shell.
     */
    this._swap = function(board,activeRow, activeCol, selectedRow, selectedCol) {
        var activeShell = board.get(activeRow, activeCol);
        var selectedShell = board.get(selectedRow, selectedCol);

        board.set(selectedRow, selectedCol, activeShell);
        board.set(activeRow, activeCol, selectedShell);
    }

    /**
     * Checks to see if the board is in the game-over position. This means that
     * there is no possible way to connect 3 or more with a single swap. If at
     * any point during execution, the user makes a swap, obviously it was
     * possible, and false is returned.
     *
     * @return {boolean} Whether or not the board is in game-over position.
     */
    this._checkBoard = function() {
        /* ... */
    }
    /**
     * Removes a shell from the board
     *
     * @param {number} row Row of the shell to be removed.
     * @param {number} col Column of the shell to be removed.
     */
    this._clearShell = function(row, col) {
         this._board.set(row,col,null)
    }
}
// make this extend GameType
