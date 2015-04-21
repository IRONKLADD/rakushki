/**
 * A Display object handles the graphics of the program. It will create/recreate
 * the board. It will handle creating the menu. Chiefly it creates listeners 
 * to collect user input and redirects that input to the correct methods.
 * @param  {CutObject}     root The all containing ParentNode in cut. Everything 
 *                              must eventually be appended to root or something
 *                              else that was appended to root.
 * @param  {Player[]}      players an array that contains all the players in 
 *                                 this current game.
 * @param  {Configuration} config The current configuration for the game. Is 
 *                                used to create the board with the current 
 *                                configuration details.
 */
function Display(root,players,config){
    this._createBoard  = _createBoard;
    this._createButton = _createButton;
    this.update        = update;
    this.updateScore   = updateScore;
    var board = players[0].getBoard();
    var gameScreen = Cut.create()
                        .appendTo(root)
                        .pin("align", .5);
    var pause = Cut.image("base:color_red")
                   .appendTo(root)
                   .pin("align", .9)
                   .on(Cut.Mouse.CLICK,function(point){
                       console.log("pause");
                   });
    var column;
    var score = Cut.string("ascii_nimbus_black:")
                   .appendTo(root)
                   .pin("align", .9)
                   .spacing(2)
                   .value(0)
                   .pin({scale : 1});
    function makeCutImage(shell, parent){
        var temp = Cut.image("base:color_" + shell.color)
                              .appendTo(parent)
                              .pin("pivot", 0.5);
        if(shell.special != null){
            Cut.image("ascii_nimbus_black:B").appendTo(temp).pin("align", 0.5);
            
        }
        return temp;
    }
    /**
     * Creates the graphical representation of the board owned by player.
     * @param  {Player} player The player whose board is currently being 
     *                         graphically built by the renderer.
     */
    function _createBoard(player) {
        var j = 0, i = 0, count = 0;
        var boardNode = Cut.create();
        boardNode.appendTo(gameScreen);
        column = Cut.column()
                    .appendTo(root)
                    .pin("align", 0.5)
                    .spacing(2);
        for (i = 0; i < config.height; ++i) {
            var row = Cut.row().appendTo(column).spacing(2);
            for (j = 0; j < config.width; ++j) {
                // colors as frames
                var temp = board.get(i, j);
                var cell = makeCutImage(temp,row);
                // var cell = Cut.image("base:color_" + temp.color)
                //               .appendTo(row)
                //               .pin("pivot", 0.5);
                cell._index = count++;
                //userInput.setInput(cell);
                cell.on(Cut.Mouse.CLICK,function(point) {
                    this.pin({
                        scaleX : 1.3,
                        scaleY : 1.3
                    });
                    var coord = Util.indexToCoord(this._index, config.height);
                    player.selectShell(coord.row, coord.col);
                    player.getBoard().printArr();
                });
            }
        }
    }
    /**
     * Graphically updates the board. First deletes the current graphical 
     * representation of the board. Then recreates it now that is has been 
     * altered by gametype.
     */
    function update() {
        column.remove();
        _createBoard(players[0]);
    }
    /**
     * Updates the the graphical representation of thescore based on what is 
     * sent from the game types Check connection.
     * @param  {number} newScore The newly calculated score from game type
     */
    function updateScore(newScore) {
        score.value(newScore);
    }
}
