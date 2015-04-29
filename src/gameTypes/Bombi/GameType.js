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
    var board;
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
     * @return {Board} board the current board being used.
     */
    function getBoard(){
        return board;
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
            board = new Board(config.height, config.width);
            players[0].setBoard(board);
            fillBoard(board);
            
        } else {
            board = players[0].getBoard();
        }
        // display board for debug purposes
        players[0].score = 0;
    }

    function refillBoard() {
        for (var row = 0; row < board.rows; ++row) {
            for (var col = 0; col < board.cols; ++col) {
                if (board.get(row, col).type === Bombi.EMPTYSHELL) {
                    var shell = config.getRandomShell();
                    board.set(row, col, shell);
                    renderer.growShell(row, col, shell);
                }
            }
        }
    }

    /**
     * Generates randomly colored shells to fill the board
     * 
     * @param {Board} board the board to be filled
     */
    function fillBoard(board) {
        for (var row = 0; row < board.rows; ++row) {
            for (var col = 0; col < board.cols; ++col) {
                board.set(row, col,
                          config.getRandomShell())
            }
        }
    }

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
            detonateBombs(bombs, player);
            refillBoard();
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
        if (row <  0             || col <  0 ||
            row >= config.height || col >= config.width)
            return;

        var shell = board.get(row, col);
        if(shell.type !== Bombi.EMPTYSHELL) {
            if(shell.special !== null) {
                triggeredBombs.push(shell.special);
            }
            else if (shell.color === color) {
                shell.type = Bombi.EMPTYSHELL;
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

    function deactivate(bomb) {
        bomb.shellArray.forEach(function(shell) {
            shell.type = Bombi.EMPTYSHELL;
            shell.color = "trans"
        });
        bomb.isActive = false;
    }

    function detonate(bomb, player) {
        if(bomb.isActive) {
            var triggeredBombs = [];

            var coord = bomb.bombCoord;
            renderer.explodeBomb(coord.row,coord.col,bomb.color);
            for(var n = coord.row,
                    m = coord.col,
                    w = 2;
                w < 2*(bomb.blastRad+1);
                w += 2, n--, m--) {
                detonatePerimeter(n, m, w, bomb.color, triggeredBombs, player);
            }
            deactivate(bomb);
            detonateBombs(triggeredBombs,player);
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
}

BombiGameType.prototype = Object.create(GameType.prototype);
