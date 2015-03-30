function Player(){
    this.getBoard = getBoard;
    this.setBoard = setBoard;
    this.setSelectShell = setSelectShell;
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
    function setSelectShell(f){
        parentSelectShell = f;
    }
}
