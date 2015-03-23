function Display(root,players,config){
    this._createBoard = _createBoard;
    this._arrayCoord  = _arrayCoord;
    this.update       = update;
    var board = players[0].getBoard();
    var gameScreen = Cut.create();
    gameScreen.appendTo(root).pin("align", .5);
    var pause = Cut.image("base:color_red");
    pause.appendTo(root);
    pause.pin("align", .9);
    pause.on(Cut.Mouse.CLICK,function(point){
        console.log("pause");
    });
    _createBoard(players[0]);
    var column;

    function _createBoard(player) {
        var j = 0, i = 0,count = 0;
        var boardNode = Cut.create();
        boardNode.appendTo(gameScreen);
        column = Cut.column().appendTo(root).pin("align", .5).spacing(1);
        for (j = 0; j < config.getHeight(); j++) {
            var row = Cut.row().appendTo(column).spacing(1);
            for (i = 0; i < config.getWidth(); i++) {
            // colors as frames
                var temp = board.get(i,j);
                var cell = Cut.image("base:color_" + temp.color).appendTo(row);
                cell.pin("pivot", 0.5);
                cell._index = count;
                count++;
                //userInput.setInput(cell);
                cell.on(Cut.Mouse.CLICK,function(point){
                    console.log(this._index);
                    var coord = _arrayCoord(this._index);
                    console.log("Player is " +player);
                    player.selectShell(coord[0],coord[1]);
                });
            }
        }
    }
    function _arrayCoord(index) {
        var row = Math.floor(index / config.row);
        var col = (index % config.row);
        var results = [row,col];
        return results;
    }
    function update() {
        column.remove();
        createBoard();
    }

}