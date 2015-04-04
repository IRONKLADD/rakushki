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
        var button0 = _createButton("SinglePlayer", "red", mainMenu)
                          .appendTo(mainMenu);
        var button1 = _createButton("MultiPlayer", "yellow", mainMenu)
                          .appendTo(mainMenu);
        var button2 = _createButton("Settings", "blue", mainMenu)
                          .appendTo(mainMenu);
        button0.on(Cut.Mouse.CLICK,function(){
            mainMenu.hide();
            _createBoard(players[0]);
        });

        var SinglePlayerMenu = Cut.column().appendTo(root).spacing(1);
        mainMenu.pin({
            alignX : .5,
            alignY : 0,
        })


        /*var mainMenu  = Cut.column().appendTo(root).spacing(1);
        mainMenu.pin({
            alignX : 0,
            alignY : 0,
        })
        var topButton = Cut.image("base:color_blue").appendTo(mainMenu);
        topButton.pin({
            scaleX : 10,
            scaleY : 3.3,
            offsetX : 600,
            alpha : .6
        })
        topButton.on(Cut.Mouse.CLICK,function(){
            mainMenu.hide();
            _createBoard(players[0]);
        });
        var topButtonText = Cut.string("base:d_").appendTo(topButton);
        topButtonText.value(222222);
        topButtonText.spacing(1);
        topButtonText.pin({
            scaleX : .3,
            scaleY : .5,
            alignX : 0,
            alignY : 0  
        });*/
    }
    function _createButton(text,color,parentNode){
        var button = Cut.image("base:color_" +color);
        var buttonText = Cut.string("ascii_nimbus_black:").appendTo(button);
        button.pin({
            scaleX : 1,
            scaleY : 1
        })
        buttonText.pin({
            align : .5,
            scaleX : .5,
            scaleY : .5
        })
        button.appendTo(parentNode);
        buttonText.value(text);
        return button;
    }
    function _createBoard(player) {
        var j = 0, i = 0,count = 0;
        var boardNode = Cut.create();
        boardNode.appendTo(gameScreen);
        column = Cut.column().appendTo(root).pin("align", .5).spacing(3);
        for (i = 0; i < config.height; i++) {
            var row = Cut.row().appendTo(column).spacing(3);
            for (j = 0; j < config.width; j++) {
                // colors as frames
                var temp = board.get(i,j);
                var cell = Cut.image("base:color_" + temp.color).appendTo(row);
                cell.pin("pivot", 0.5);
                cell._index = count;
                count++;
                //userInput.setInput(cell);
                cell.on(Cut.Mouse.CLICK,function(point) {
                    this.pin({
                        scaleX : 1.3,
                        scaleY : 1.3,
                    });
                    var coord = Util.indexToCoord(this._index, config.height);
                    player.selectShell(coord.row, coord.col);
                    player.getBoard().printArr();
                });
            }
        }
    }

    function update() {
        column.remove();
        _createBoard(players[0]);
    }
    function updateScore(newScore) {
        score.value(newScore);
    }
}
