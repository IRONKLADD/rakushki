function Display(root,players){
    var gameScreen = Cut.create();
    gameScreen.appendTo(root);
    var pause = Cut.image("base:color_red");
    pause.appendTo(gameScreen);
    pause.pin("align", .9);
    this._createBoard(players[0]);
    var column;

    this._createBoard = function(player){
        var j = 0, i = 0,count = 0;
        var boardNode = Cut.create();
        boardNode.appendTo(gameScreen);
        column = Cut.column().appendTo(boardNode).pin("align", .5).spacing(1);
        for (j = 0; j < config.getHeight(); j++) {
            var row = Cut.row().appendTo(column).spacing(1);
            for (i = 0; i < config.getWidth(); i++) {
            // colors as frames
                var temp = board.get(i,j);
                var cell = Cut.image("base:color_" + temp.color).appendTo(row);
                cell.pin("pivot", 0.5);
                cell._id = count;
                count++;
                userInput.setInput(cell);
                cell.on(Cut.Mouse.CLICK,function(point){
                    var coord = _arrayCoord(this._id);
                    player.selectShell(coord[0],coord[1]);
                }
            }
        }
    }
    this._arrayCoord =function(index){
        var row = math.floor(index / config.row);
        var col = (index % config.row);
        var results = [row,col];
        return results;
    }
    this.update =function(){
        column.remove();
        createBoard();
    }

}