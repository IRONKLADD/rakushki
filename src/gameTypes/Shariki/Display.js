function Display(root,players,config){
    this._createBoard  = _createBoard;
    this._createButton = _createButton;
    this.update        = update;
    this.updateScore   = updateScore;
    this.createMenu    = createMenu;
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

    function createMenu(){
        var mainMenu = Cut.column().appendTo(root).spacing(50);
        mainMenu.pin({
            alignX : .5,
            alignY : 0,
        })
        var buttonSinglePlayer = Buttons.makeShellsButton("Single Player",
                                                          "red")
                                        .appendTo(mainMenu);
        var buttonMultiPlayer = Buttons.makeShellsButton("Multi Player",
                                                         "yellow")
                                       .appendTo(mainMenu);
        var buttonSettings = Buttons.makeShellsButton("Settings",
                                                      "blue")
                                    .appendTo(mainMenu);
        buttonSinglePlayer.on(Cut.Mouse.CLICK, function() {
            mainMenu.hide();
            _createBoard(players[0]);
        });

        var SinglePlayerMenu = Cut.column().appendTo(root).spacing(1);
        mainMenu.pin({
            alignX : 0.5,
            alignY : 0.0
        })
    }
    function _createButton(text, color, parentNode){
        var button = Cut.image("base:color_" +color);
        var buttonText = Cut.string("ascii_nimbus_black:").appendTo(button);
        button.pin({
            scaleX : 1,
            scaleY : 1
        })
        buttonText.pin({
            align  : 0.5,
            scaleX : 0.5,
            scaleY : 0.5
        })
        button.appendTo(parentNode);
        buttonText.value(text);
        return button;
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
                var cell = Cut.image("base:color_" + temp.color)
                              .appendTo(row)
                              .pin("pivot", 0.5);
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
