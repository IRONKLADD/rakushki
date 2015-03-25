function Player(){
    this.getBoard = getBoard;
    this.setBoard = setBoard;
    this.setFunction = setFunction;
    var board;
    var score = 0;
    var parentSelectShell;
    this.selectShell = function(row, col){
        parentSelectShell(this, row, col);
    }
    function getBoard() {
        return board;
    }
    function setBoard(newBoard) {
        board = newBoard;
    }
    function setFunction(f){
        parentSelectShell = f;
    }
}