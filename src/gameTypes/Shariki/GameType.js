function SharikiGameType(players, config) {
    /**
     * Whether there is an active (selected) shell.
     * @type {boolean}
     */
    var _isActive = false;
    /**
     * The row of the active shell.
     * @type {number};
     */
    var _activeRow = null;
    /**
     * The column of the active shell.
     * @type {number}
     */
    var _activeCol = null;

    /**
     * Whether there is a valid swap at this moment in time.
     * @type {boolean}
     */
    var _validSwap = false;
    var _board;
    var renderer;
    this.getBoard = getBoard;
    this.selectShell = selectShell;
    this.setRender = setRender;
    init();
    function setRender(setter){
        renderer = setter;
    }
    function getBoard(){
        return _board;
    }

    function init(){
        for(var i = 0; i < players.length; ++i){
            players[i].setSelectShell(selectShell);
        }
        _makeBoard();
    }
    /**
     * Constructs a Board object using the constraints imposed by Shariki
     * and the configuration, and stores it in this._board.
     */
    function _makeBoard() {
        if (players[0].getBoard() === undefined) {
            _board = new Board(config.width, config.height);
            _fillBoard(_board);
            players[0].setBoard(_board);
        } else {
            _board = players[0].getBoard();
        }
        // display board for debug purposes
        _board.printArr();
    }

    /**
     * Generates randomly colored shells to fill the board
     * 
     * @param {Board} board the board to be filled
     */
    function _fillBoard(board) {
        for (var row = 0; row < board.rows; ++row) {
            for (var col = 0; col < board.cols; ++col) {
                board.set(row, col,
                          new Shell(config.getRandomColor(),
                                    null, "normal", null));
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
    function _turn(currentPlayer, turnCount) {
        var gameOver = _checkBoard();
        if(gameOver)
            return true;
        while(!_validSwap) {
            // wait T milliseconds
        }
        _validSwap = false;
        return false;
    }

    /**
     * This method handles the functionality of selecting a single shell.

     * @param {number} row The row of the selected shell
     * @param {number} col The column of the selected shell
     */
    function selectShell(player, row, col) {
        // no shell is active, make selected shell active
        if(!_isActive) {
            _isActive = true;
            _activeRow = row;
            _activeCol = col;
            // notify renderer here
        }
        // selected shell is adjacent to active shell, try to swap
        else if(Util.isAdjacent(_activeRow, _activeCol, row, col)) {
            _trySwap(player, _activeRow, _activeCol, row, col);
        }
        // unselect shell
        else {
            _isActive = false;
            _activeRow = null;
            _activeCol = null;
            // notify renderer here
        }
    }

    /**
     * Attempts to make a swap.
     */
    function _trySwap(player,activeRow, activeCol, selectedRow, selectedCol) {
        _swap(player.getBoard(), activeRow, activeCol, selectedRow, selectedCol);
        // notify renderer (in parallel)
        
        var swappedShells = new Set([
            JSON.stringify(new Util.Coord(activeRow, activeCol)),
            JSON.stringify(new Util.Coord(selectedRow, selectedCol))
        ]);
        var validSwap = checkConnection(player, swappedShells);

        if(!validSwap) {
            _swap(player.getBoard(),
                  activeRow, activeCol, selectedRow, selectedCol);
            // notify renderer
        }
        renderer.update();
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
    function _makeConnection(player,activeRow, activeCol,
                                                    selectedRow, selectedCol) {
        var activeShell = player.getBoard().get(activeRow, activeCol);
        var selectedShell = player.getBoard().get(selectedRow, selectedCol);
    }

//runs the checks for left, right, down, and up with respect to the shell
//and joins the sets
    function check4Way(board, row, col) {
        return Util.setUnion(checkVertical(board, row, col),
                             checkHorizontal(board, row, col)); 
    }

//checks down until the next shell is a different color or the check runs out
//of bounds of the board, then does the same for checking up.
    function checkVertical(board, row, col) {
        var centerShell = board.get(row, col); 
        var matches = new Set([JSON.stringify(new Util.Coord(row, col))]);

        for (var r = row+1;
             r < config.height && board.get(r, col).color == centerShell.color;
             r++) {
            matches.add(JSON.stringify(new Util.Coord(r, col)));
        }
        for (var r = row-1;
             r >= 0 && board.get(r, col).color == centerShell.color;
             r--) {
            matches.add(JSON.stringify(new Util.Coord(r, col)));
        }
        // match 3?
        if (matches.size >= 3){
            // matched 3 or more, return the matches
            return matches;
        }
        else{
            // did not match enough, return an empty set
            return new Set([]);
        }
    }

//checks left until the next shell is a different color or the check runs out
//of bounds of the board, then does the same for checking right.
    function checkHorizontal(board, row, col) {
        var centerShell = board.get(row, col); 
        var matches = new Set([JSON.stringify(new Util.Coord(row,col))]);

        for (var c = col+1;
             c < config.width && board.get(row, c).color == centerShell.color;
             ++c) {
            matches.add(JSON.stringify(new Util.Coord(row,c)));
        }
        for (var c = col-1;
             c >= 0 && board.get(row, c).color == centerShell.color;
             --c) {
            matches.add(JSON.stringify(new Util.Coord(row,c)));
        }
        // match 3?
        if (matches.size >= 3) {
            return matches;
        }
        else {
            // if there is no break, don't give me anything
            return new Set([]);
        }
    }

    function checkConnection(player, coords) {
        var connections = new Set([]);

        coords.forEach(function(JSONcoord) {
            var coord = JSON.parse(JSONcoord);
            var newConnections = check4Way(player.getBoard(),
                                           coord.row, coord.col);
            connections = Util.setUnion(connections, newConnections);
        });

        if(connections.size === 0) {
            return false;
        }
        else {
            _clearShells(player, connections);
            var changedCoords = _refillBoard(player.getBoard(), connections);
            checkConnection(player, changedCoords);
            return true;
        }
    }

    /**
     * Swaps two shells.
     *
     * @param  {number} activeRow Row of active shell.
     * @param  {number} activeCol Column of active shell.
     * @param  {number} selectedRow Row of selected shell.
     * @param  {number} selectedCol Column of selected shell.
     */
    function _swap(board,activeRow, activeCol, selectedRow, selectedCol) {
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
    function _checkBoard() {
        /* ... */
    }

    function _refillBoard(board, emptyShells) {
        var effectedShells = _getEffectedShells(emptyShells);

        while(emptyShells.size > 0) {
            console.log("empty in refill");
            console.log(emptyShells);
            emptyShells = _gravity(board, emptyShells);
            _refillTopLayer(board, emptyShells);
        }

        return effectedShells;
    }

    function _refillTopLayer(board, emptyShells) {
        console.log("refill top");
        emptyShells.forEach(function(JSONcoord) {
            var coord = JSON.parse(JSONcoord);
            // only affect top layer shells, which have row == 0
            if(coord.row == 0) {
                // replace the empty shell with a random shell
                var newShell = new Shell(config.getRandomColor(), null,
                                         "normal", null);
                board.set(coord.row, coord.col, newShell);
                // shell is no longer empty, so remove from set
                emptyShells.delete(JSONcoord);
            }
        });
    }
    function _getEffectedShells(emptyShells) {
        var effectedShells = new Set();
        emptyShells.forEach(function(JSONcoord) {
            var coord = JSON.parse(JSONcoord);
            for(var row = coord.row; row >= 0; --row) {
                effectedCoord = new Util.Coord(row, coord.col);
                JSONeffectedCoord = JSON.stringify(effectedCoord);
                if(effectedShells.has(JSONeffectedCoord))
                    break;
                effectedShells.add(JSONeffectedCoord);
            }
        });
        effectedShells.forEach(function(shell) { console.log("S:"+shell); });
        return effectedShells;
    }
    /**
     * Removes a shell from the board
     *
     * @param {number} row Row of the shell to be removed.
     * @param {number} col Column of the shell to be removed.
     */
    function _clearShell(board, row, col) {
        var shell  = board.get(row,col);
        shell.type = Shariki.EMPTYSHELL;
    }
    /*
     * Removes shells with given coords from player's board
     * Also awards points to the active player
     * 
     * @param {set} coords A set of JSON coordinates
     * @param {Player} player The active player
     */
    function _clearShells(player, coords) {
        coords.forEach(function(JSONcoord){
            coord = JSON.parse(JSONcoord);
            _clearShell(player.getBoard(), coord.row, coord.col);
            player.score += 1;
        });
    }
    function _gravity(board, set) {
        console.log("gravity called");
        var gravitySet = set;
        set.forEach(function(JSONcoord){
            _gravitise(board, JSONcoord,gravitySet);
        });
        return gravitySet;
    }
    function _gravitise(board, JSONcoord, gravitySet) {
        console.log(gravitySet);
        var coord = JSON.parse(JSONcoord);
        var found = false;
        var row = coord.row;
        var col = coord.col;
        var rowCount = row - 1;
        if(col = 0 || board.get(row, col).type != Shariki.EMPTYSHELL){
            return;
        }
        while(!found && rowCount >= 0){
            console.log(rowCount);
            if(board.get(rowCount, col).type != Shariki.EMPTYSHELL){
                found = true;
            }
            else{
                rowCount--;
            }
        }
        console.log("row " +rowCount);
        if(rowCount < 0){
            console.log("if");
            board.get(row, col).type = Shariki.EMPTYSHELL;
            gravitySet.add(JSON.stringify(new Util.Coord(rowCount, col)));
            return;
        }
        else{
            console.log("else");
            board.set(row,col,board.get(rowCount,col));
            gravitySet.delete(JSON.stringify(new Util.Coord(row, col)));
            gravitySet.add(JSON.stringify(new Util.Coord(row - 1, col)));
            board.get(rowCount, col).type = Shariki.EMPTYSHELL;
            _gravitise(board, JSON.stringify(new Util.Coord(row - 1,col)), gravitySet);
            return;
        }

    }
}
SharikiGameType.prototype = Object.create(GameType.prototype);
