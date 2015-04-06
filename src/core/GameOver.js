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
        var gameOver = this._isGameOver(currentPlayer.board);
        if(gameOver)
            return true;
        while(!this._validSwap) {
            // wait T milliseconds
        }
        this._validSwap = false;
        return false;
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
