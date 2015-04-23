function BombiGameType(players, config) {
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
    var activeBombs = new Map([]);
    var turnCount = 0;
    this.getBoard = getBoard;
    this.selectShell = selectShell;
    this.setRender = setRender;
    init();
    /**
     * sets the current Renderer for this game type. Is needed for when gametype
     * updates the board and needs to tell the Renderer to update.
     * @param {Display} setter The current renderer that you want to link to 
     *                         this game type
     */
    function setRender(setter){
        renderer = setter;
    }
    /**
     * returns the current board being used by this game types.
     * @return {Board} _board the current board being used.
     */
    function getBoard(){
        return _board;
    }
    /**
     * starts the game by setting the players in this game with the correct
     * selectShell method then makes the board.
     * @return {Board} _board the current board being used.
     */
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
            _board = new Board(config.height, config.width);
            players[0].setBoard(_board);
            _fillBoard(_board);
            
        } else {
            _board = players[0].getBoard();
        }
        // display board for debug purposes
        players[0].score = 0;
    }

    /**
     * Generates randomly colored shells to fill the board
     * 
     * @param {Board} board the board to be filled
     */
    function _fillBoard(board) {
        var starterBoard = new Set([]);
        for (var row = 0; row < board.rows; ++row) {
            for (var col = 0; col < board.cols; ++col) {
                board.set(row, col,
                          new Shell("light",
                                    null, Shariki.EMPTYSHELL, null));
                starterBoard.add(JSON.stringify(new Util.Coord(row,col)));
            }
        }
        checkConnection(players[0], starterBoard);
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
    // this._turn = function(currentPlayer, turnCount) {
    //     var gameOver = this._isGameOver(currentPlayer.board);
    //     if(gameOver)
    //         return true;
    //     while(!this._validSwap) {
    //         // wait T milliseconds
    //     }
    //     this._validSwap = false;
    //     return false;
    // }  


    /**
     * This method handles the functionality of selecting a single shell.
     *
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
            _swap(player.getBoard(), _activeRow, _activeCol, row, col);
            checkForBomb(
                JSON.stringify(new Util.Coord(row,col)),
                player.getBoard()
            );
            checkForBomb(
                JSON.stringify(new Util.Coord(_activeRow, _activeCol)),
                player.getBoard()
            );
            
            _isActive = false;
            _activeRow = null;
            _activeCol = null;
            //-----Start of next turn-----//
            turnCount++;
            renderer.update(turnCount);
            var bombs = activeBombs.get(turnCount);
            activeBombs.delete(turnCount);
            detonateBombs(bombs, player)
        }
        // unselect shell
        else {
            _isActive = false;
            _activeRow = null;
            _activeCol = null;
            renderer.update(turnCount);
        }
        renderer.updateScore(player.score);
    }

    function touchShell(row, col, color, triggeredBombs, player) {
        if (row < 0 || col < 0)
            return;

        var shell = _board.get(row, col);
        if(shell.type !== Bombi.EMPTY) {
            if(shell.special !== null) {
                triggeredBombs.push(shell.special);
            }
            else if (shell.color === color) {
                shell.type = Bombi.EMPTY;
                shell.color = "trans";
                player.score++;
                renderer.explodeShell(row, col);
            }
        }
    }

    function detonatePerimeter(n, m, width, color, triggeredBombs, player) {
        var row = n-1,
            col = m-1;
        // iterate over top perimeter
        for(; col < m+width; ++col)
            touchShell(row, col, color, triggeredBombs, player);
        // iterate over right perimeter
        for(; row < n+width; ++row)
            touchShell(row, col, color, triggeredBombs, player);
        // iterate over bottom perimeter
        for(; col > m-1    ; --col)
            touchShell(row, col, color, triggeredBombs, player);
        // iterate over left perimeter
        for(; row > n-1    ; --row)
            touchShell(row, col, color, triggeredBombs, player);
    }

    function detonate(bomb, player) {
        if(bomb.isActive) {
            var triggeredBombs = [];

            var coord = bomb.bombCoord;
            for(var n = coord.row,
                    m = coord.col,
                    w = 2;
                w < 2*(bomb.blastRad+1);
                w += 2, n--, m--) {
                detonatePerimeter(n, m, w, bomb.color, triggeredBombs, player);
            }

            bomb.isActive = false;
            detonateBombs(triggeredBombs);
        }
    }

    function detonateBombs(bombs, player) {
        if(bombs !== undefined && bombs.length !== 0){
            bombs.forEach(function (bomb) {
                detonate(bomb, player);
            });
        }
    }

    function makeBomb(shellArray,topLeftCoord){
        var color = shellArray[0].color;
        var blastRad = shellArray[0].magnitude;
        var explosionTurn = 0;
        var bombCoord;
        shellArray.forEach(function(shell) {
            if(shell.magnitude < blastRad){
                blastRad = shell.magnitude;
            }
            explosionTurn = explosionTurn + shell.magnitude;
        });
        var currentBomb = new Bomb(color, blastRad, turnCount+explosionTurn+1,
                                   shellArray, topLeftCoord);
        shellArray.forEach(function(shell) {
            shell.special = currentBomb;
        });
        Util.appendValue(activeBombs, currentBomb.explosionTurn, currentBomb);

        return currentBomb;

    }
    function checkBomb(board, shellCoords, topLeftCoord) {
        shellArray = new Array();
        count = 0;
        shellCoords.forEach(function(coord) {
            var currentShell = board.get(coord.row,coord.col);
            shellArray[count] =currentShell;
            count++;
        });
        var checkColor = shellArray[0].color;
        var validBomb = true;
        shellArray.forEach(function(shell) {
            if(shell.color !== checkColor || shell.special !== null) {
                validBomb = false;
            }
        });
        if(!validBomb){
            return null;
        }
        else{
            return makeBomb(shellArray,topLeftCoord);
        }
    }
    function checkForBomb(JSONcoord, board) {
        var centerCoord = JSON.parse(JSONcoord);
        var row = centerCoord.row;
        var col = centerCoord.col;
        var bomb = null;
        var onLeft = (col === 0);
        var onRight = (col === config.width - 1);
        var onTop = (row === 0);
        var onBottom = (row === config.height - 1);
        if (!(onLeft || onTop)) {
            var upLeft = Util.coordLeft(Util.coordUp(centerCoord));
            var up = Util.coordUp(centerCoord);
            var left = Util.coordLeft(centerCoord);
            bomb = checkBomb(board,[upLeft, centerCoord, up, left], upLeft);
            if (bomb !== null) {
                return bomb;
            }
        }
        if (!(onTop || onRight)) {
            var upRight = Util.coordRight(Util.coordUp(centerCoord));
            var right = Util.coordRight(centerCoord);
            var up = Util.coordUp(centerCoord);
            bomb = checkBomb(board,[up, centerCoord, upRight, right], up)
            if (bomb !== null) {
                 return bomb;
            }
        }
        if (!(onBottom || onLeft)) {
            var left = Util.coordLeft(centerCoord);
            var downLeft = Util.coordLeft(Util.coordDown(centerCoord));
            var down = Util.coordDown(centerCoord);
            bomb = checkBomb(board,[left, centerCoord, downLeft, down], left);
            if (bomb !== null) {
                return bomb;
            }
        }
        if (!(onBottom || onRight)) {
            var down = Util.coordDown(centerCoord);
            var downRight = Util.coordRight(Util.coordDown(centerCoord));
            var right = Util.coordRight(centerCoord);
            bomb = checkBomb(board,[centerCoord, downRight, down, right], 
                             centerCoord);
        }
        return bomb;
    }

    /**
     * This method swaps the two currently selected shells then checks if it was
     * a valid swap.
     * IF(it was a valid swap) it keeps the current swap, clears out the stored
     *                         Shell, and updates the renderer.
     * ELSE(not valid swap) It swaps the two shells back to their original 
     *                      state.
     * @param {Player} player The player who currently made the swap
     * @param {number} activeCol The column of the shell that was selected 
     *                           previously
     * @param {number} activeRow The row of the shell that was selected 
     *                           previously
     * @param {number} selectedCol The column of the shell that was just 
     *                             selected
     * @param {number} selectedRow The row of the shell that was just 
     *                             selected
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
        _activeRow = null;
        _activeCol = null;
        _isActive = false;
        renderer.update();
    }

    /**
     * Checks for connections with a shell being checked, and returns a set of
     * all shells to be cleared.
     *
     * @param  {Board} board The board which is to be checked.
     * @param  {number} row Row of the shell being checked.
     * @param  {number} col Column of the shell being checked.
     * @return {Set} A Set containing all of the shells to be cleared.
     */
    function check4Way(board, row, col) {
        return Util.setUnion(checkVertical(board, row, col),
                             checkHorizontal(board, row, col)); 
    }

    /*
     * Checks down until the next shell is a different color or the check runs 
     * out of bounds of the board, then does the same check upwards.
     *
     * @param  {Board} board The board which is to be checked.
     * @param  {number} row Row of the shell being checked.
     * @param  {number} col Column of the shell being checked.
     * @return {Set} A Set containing shells to be cleared. 
     */
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

    /*
     * Checks left until the next shell is a different color or the check runs 
     * out of bounds of the board, then does the same check rightwards.
     *
     * @param  {Board} board The board which is to be checked.
     * @param  {number} row Row of the shell being checked.
     * @param  {number} col Column of the shell being checked.
     * @return {Set} A Set containing shells to be cleared. 
     */
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

    /**
     * Checks if either of the 2 swapped shells make a connection
     * If they do, clear the connected shells, give coordinates, and make new
     * shells fall in.
     *
     * @param  {Player} player The current player.
     * @param  {Set} coords A set containing the coordinates of the swapped 
     *                      shells.
     * @return {boolean} Whether or not the swap was valid.
     */
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
            // renderer.update();
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
    function _swap(board, activeRow, activeCol, selectedRow, selectedCol) {
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
    this._isGameOver = function(board) {
        var row = board.row;
        var col = board.col;
        for(var r = 0; r < row; r++) {
            for(var c = 0; c < col; c++) {

                //CHECK LEFT
                //##X#
                //##X#
                //XXOX
                //##X#
                //##X#
                if(check4Way(board, r, c-1).size >= 3) {    
                    return true;                            

                }                                           

                //CHECK UP
                //##X##
                //##X##
                //XXOXX
                //##X##
                if(check4Way(board, r-1, c).size >= 3) { 
                    return true;                         
                }                                         

                //CHECK DOWN
                //##X##
                //XXOXX
                //##X##
                //##X##
                if(check4Way(board, r+1, c).size >= 3) {  
                    return true;                            
                }                                           
                                                            
                //CHECK RIGHT
                //#X##
                //#X##
                //XOXX
                //#X##
                //#X##
                if(check4Way(board, r, c+1).size >= 3) { 
                    return true;                         
                }                                       
                                                           
                                                 
            }
        }
        return false;
    }

    /**
     * Drops existing shells down to fill in empty spots then refills the top
     * layer. This is done recursively until the board is full.
     *
     * @param  {Board} board The board which is to be checked.
     * @param  {Set} emptyShells A set of coords of empty shells
     * @return {Set} A Set of shells which changed position
     */
    function _refillBoard(board, emptyShells) {

        var effectedShells = _getEffectedShells(emptyShells);

        while(emptyShells.size > 0) {
            _gravity(board, emptyShells);
            _refillTopLayer(board, emptyShells);
            
        }
        return effectedShells;
    }

    /*
     * Replaces the empty shells in the top layer with new random shells.
     *
     * @param  {Board} board The board being acted on.
     * @param  {Set} emptyShells A Set of the coordinates of empty shells on the
     * board.
     */
    function _refillTopLayer(board, emptyShells) {
        emptyShells.forEach(function(JSONcoord) {
            var coord = JSON.parse(JSONcoord);
            // only affect top layer shells, which have row == 0
            if(coord.row == 0) {
                // replace the empty shell with a random shell
                var newShell = config.getRandomShell();
                board.set(coord.row, coord.col, newShell);
                // shell is no longer empty, so remove from set
                emptyShells.delete(JSONcoord);
            }
        });
    }
    /*
     * Finds all the shells which will be affected by gravity after the creation
     * of empty shells.
     *
     * @param  {emptyShells} emptyShells A Set of 
     * @return {Set} A Set containing shells affected by gravity 
     */
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
        shell.color = "light";
        
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

    /*
     * Moves shells above empty shells down to remove the presence of empty
     * shells.
     *
     * @param  {Board} board The board being acted on.
     * @param  {Set} emptyShells A Set of the coordinates of empty shells on the
     * board.
     */
    function _gravity(board, emptyShells) {
        var lowestEmptyShells = Util.colMax(emptyShells, config.width);
        for(var col = 0; col < config.width; ++col) {
            var row = lowestEmptyShells[col];
            if (row !== undefined) {
                var JSONcoord = JSON.stringify(new Util.Coord(row, col));
                _gravitize(board, JSONcoord, emptyShells);
            }
        }
    }

    /*
     * Finds the first non-empty shell above an empty shell. If no shell exists,     * returns null
     *
     * @param  {Board} board The board which is to be checked.
     * @param  {Coord} coord The coordinate of the shell to look above
     * @return {Coord} the coordinate of the first non-empty shell, or null if
     *                 no such shell exists.
     */
    function findShellAbove(board, coord) {
        var col = coord.col;
        for (var row = coord.row-1; row >= 0; --row) {
            var shell = board.get(row, col);
            if(shell.type != Shariki.EMPTYSHELL)
                return new Util.Coord(row, col);
        }
        return null;
    }

    /*
     * Moves all shells above an empty shell down one row.
     *
     * @param  {Board} board The board being acted on.
     * @param  {String} JSONcoord the coord corresponding to the empty shell.
     * @param  {Set} A Set of the coordinates of empty shells on the board.
     */
    function _gravitize(board, JSONcoord, emptyShells) {
        var coord = JSON.parse(JSONcoord);

        for (var lowCoord = highCoord = coord;
             highCoord = findShellAbove(board, highCoord);
             lowCoord = Util.coordUp(lowCoord)) {
            _swap(board,
                  lowCoord.row, lowCoord.col, highCoord.row, highCoord.col);
            emptyShells.delete(JSON.stringify(lowCoord));
            emptyShells.add(JSON.stringify(highCoord));
        }
    }
}
BombiGameType.prototype = Object.create(GameType.prototype);
