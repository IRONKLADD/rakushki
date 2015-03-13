this.gravity = function(board,empties) {
    //Iterate through the empties and for those that are not in the top row move things down
    for(var spot = 0; i < empties.length; ++i) {
        //Need to get the row and column of for this spot.
        spotRow = spot.row;
        spotCol = spot.col;
        if(spotRow != 0) {
            this.gravitize(board,spotRow,spotCol)
        }
    }
    this.refillBoard(board);
}

this.gravitize = function(board,row,col) {
    //Check upwards until either a piece is found or we reach the top
    for(var i = row-1; i >= 0; i--) {
        //piece found, set a reference to it and its row
        if(board.get(i,col) != null) {
            pieceRow = i;
            above = board.get(pieceRow,col);
            break;
        }
    }
    //if a piece was found above, move it to the spot being gravitized and gravitize that spot
    //as long as it's not in the top row. Otherwise the column is empty above, so do nothing.
    if(above != null) {
        board.set(row,col,above);
        board.set(pieceRow,col,null);
        if(pieceRow != 0) {
            this.gravitize(board,pieceRow,col);
        }
    }
}

this.refillBoard(board) {

}
