function Player(){
    this.getBoard = getBoard;
    this.setBoard = setBoard;
    var board;
    var score;
    var parentSelectShell;
    this.selectShell = function(row, col){
        console.log("all good");
        console.log(parentSelectShell);
        parentSelectShell(this, row, col);
    }
    function getBoard() {
        return board;
    }
    function setBoard(newBoard) {
        board = newBoard;
    }

}