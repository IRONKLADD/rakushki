function SharikiGameType(players, config) {
    this._activeRow = null;
    this._activeCol = null;
    
    this._makeBoard = function() {
        this._board = new Board(this._config.width, this._config.height);
        this._fillBoard(this._board);
    }

    this._turn = function(currentPlayer, turnCount) {
        
    }

    this.selectShell = function(row, col) {
        // no shell is active, make selected shell active
        if(this._activeRow === null && this._activeCol === null) {
            this._activeRow = row;
            this._activeCol = col;
            // notify renderer here
        }
        // selected shell is adjacent to active shell, try to swap
        else if(Board.isAdjacent(this._activeRow, this._activeCol, row, col)) {
            this._trySwap(this._activeRow, this._activeCol, row, col);
        }
        // unselect shell
        else {
            this._activeRow = null;
            this._activeCol = null;
            // notify renderer here
        }
    }

    this._trySwap = function(activeRow, activeCol, selectedRow, selectedCol) {
        this._swap(activeRow, activeCol, selectedRow, selectedCol);
        // notify renderer (in parallel)

        var validSwap = this._makeConnection(activeRow,   activeCol,
                                             selectedRow, selectedCol);

        if(!validSwap) {
            this._swap(activeRow, activeCol, selectedRow, selectedCol);
            // notify renderer
        }
    }

    /**
     * Checks if the 2 swapped shells make a connection
     * If they do, clear the connected shells, give points, and make new
     * shells fall in.
     */
    this._makeConnection = function(activeRow, activeCol,
                                    selectedRow, selectedCol) {
        var activeShell = this._board.get(activeRow, activeCol);
        var selectedShell = this._board.get(selectedRow, selectedCol);

        // ...
    }

    this._swap = function(activeRow, activeCol, selectedRow, selectedCol) {
        var activeShell = this._board.get(activeRow, activeCol);
        var selectedShell = this._board.get(selectedRow, selectedCol);

        this._board.set(selectedRow, selectedCol, activeShell);
        this._board.set(activeRow, activeCol, selectedShell);
    }

}
// make this extend GameType
