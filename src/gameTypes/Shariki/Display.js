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
    this.explodeShell  = explodeShell;
    this.explodeBomb   = explodeBomb;
    var _player;
    var currentTurn = 0;
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
    var _displayGrid = []
    for (var i = 0; i < config.height; ++i) {
        _displayGrid.push([]);
        for (var j = 0; j < config.width; ++j) {
            _displayGrid[i].push(null);
        }
    }
    function makeCutImage(shell, parent){
        var temp = Cut.image("base:color_" + shell.color)
                              .appendTo(parent)
                              .pin("pivot", 0.5);
        var overlay = Cut.image("dice" +shell.magnitude+":").appendTo(temp).pin("pivot",0.5)


        return temp;
    }
    /**
     * Creates the graphical representation of the board owned by player.
     * @param  {Player} player The player whose board is currently being 
     *                         graphically built by the renderer.
     */
    function _createBoard(player) {
        _player = player;
        var j = 0, i = 0, count = 0;
        var boardNode = Cut.create();
        boardNode.appendTo(gameScreen);
        column = Cut.column()
                    .appendTo(root)
                    .pin("align", 0.5)
                    .spacing(2)
                    .pin({
                        scaleX : 2,
                        scaleY : 2
                    });
        for (i = 0; i < config.height; ++i) {
            var row = Cut.row().appendTo(column).spacing(2);
            for (j = 0; j < config.width; ++j) {
                // colors as frames
                var temp = board.get(i, j);

                if(temp.special === null){
                    var cell = makeCutImage(temp,row);
                    _displayGrid[i][j] = cell;
                    // var cell = Cut.image("base:color_" + temp.color)
                    //               .appendTo(row)
                    //               .pin("pivot", 0.5);
                    cell._index = count++;
                    cell._row     = i;
                    cell._col     = j;
                    //userInput.setInput(cell);
                    cell.on(Cut.Mouse.CLICK,function(point) {
                        this.pin({
                            scaleX : 1.3,
                            scaleY : 1.3
                        });
                        var coord = new Util.Coord(this._row,this._col);
                        player.selectShell(coord.row, coord.col);
                    });
                }
                else{
                    var currentBomb = temp.special;
                    var BombColor = currentBomb.color;
                    if(currentBomb.cornerShell === temp){
                        var bombCorner = Cut.image("base:color_trans")
                            .appendTo(row)
                            .pin("align", 0);
                        _displayGrid[i][j] = bombCorner;
                        bombCorner._row     = i;
                        bombCorner._col     = j;
                        var bomb = Cut.image("base:color_"+BombColor)
                            .appendTo(bombCorner)
                            .pin("align", 0)
                            .pin({
                                scaleX : 2.10,
                                scaleY : 2.10,
                                textureAlpha : 100
                        });
                        bomb._row     = i;
                        bomb._col     = j;
                        bomb._radius  = currentBomb.blastRad;
                        bomb._color   = BombColor
                        bomb.on(Cut.Mouse.CLICK,function(point) {
                            explode(this._row,this._col,this._radius,this._color)
                        });
                        var ticker = Cut.string("ascii_nimbus_black:")
                            .appendTo(bomb)
                            .pin("align", .5)
                            .spacing(.7)
                            .value(currentBomb.explosionTurn - currentTurn)
                            .pin({
                                scale : .10
                            });

                    }
                    else{
                        var invis = Cut.image("base:color_trans")
                           .appendTo(row)
                           .pin("align", 0);
                        _displayGrid[i][j] = invis;
                    }
                }
            }
        }
    }
    /**
     * Graphically updates the board. First deletes the current graphical 
     * representation of the board. Then recreates it now that is has been 
     * altered by gametype.
     */
    function update(turnCount) {
        currentTurn = turnCount;
        column.remove();
        console.log(config.allottedTurns);
        if(turnCount <= config.allottedTurns){
            console.log(turnCount);
            _createBoard(players[0]);
        }
        else{
            _createBoard(players[0]);
            endGame()
        }
    }
    /**
     * Updates the the graphical representation of thescore based on what is 
     * sent from the game types Check connection.
     * @param  {number} newScore The newly calculated score from game type
     */
    function updateScore(newScore) {
        score.value(newScore);
    }
    /*function explode(row,col,radius){
        console.log("this col");
        console.log(col);
        var cell = _displayGrid[row-radius][col-radius];
        var explode = Cut.image("base:color_red")
            .appendTo(cell)
            .pin("align", 0)
            .pin({alpha:1,textureAlpha : 1});

        var tween = explode.tween(duration = 200, delay = 0);
        tween.pin({
            scaleX : (radius+4)+(1/radius)+.1,
            scaleY : (radius+4)+(1/radius)+.1
        })
    }*/
    function explode(row,col,radius,color){
        for(var i = row-radius;i <= row + radius+1;i++){
            for(var j = col-radius;j <= col + radius+1;j++){
                if (i <  0 || j <  0 || i >= config.height || j >= config.width){
                }
                else{
                    var cell = _displayGrid[i][j];
                    splode(cell,color);
                }
               
            }
        }
    }
    function showRadius(row,col,radius,color){
        for(var i = row-radius;i <= row + radius+1;i++){
            for(var j = col-radius;j <= col + radius+1;j++){
                var cell = _displayGrid[i][j];
                splode(cell);
               
            }
        }
    }
    function splode(cell,color){
        if(cell === undefined){return;}
        var bomb = Cut.image("base:color_"+color).appendTo(cell)
            .pin("align", .5).pin({scale:0});
            var tween = bomb.tween(duration = 400, delay = 0);
            tween.pin({
                scale: 1,
                alpha: 1
            })
            tween.then(function(){
                bomb.remove()
            });
    }
    function explodeShell(row,col){
        var cell = _displayGrid[row][col];
        var tween = cell.tween(duration = 400, delay = 0);
        tween.pin({
            scale: 0,
        })
    }
    function explodeBomb(row,col,color){
        var cell  = _displayGrid[row][col];
        var bomb  = cell.first();
        // var splosion = Cut.image("base:color_" +color).appendTo(cell)
        // .pin("pivot", .5).pin({
        //     scale:0,
        //     textureAlpha: 1

        // });
        // var tween = splosion.tween(duration = 400, delay = 0);
        // tween.pin({
        //     scale: 2,
        // })
        // tween = splosion.tween(duration = 400, delay = 400);
        // tween.pin({
        //     scale: 0,
        // })
        var tween = bomb.tween(duration = 400, delay = 0);
        tween.pin({
            scale: 0,
        })
    }
    this.growShell = function(row,col,shell){
        var cell = _displayGrid[row][col];
        var tween = cell.tween(duration = 500, delay = 0);
        tween.pin({
            textureAlpha: 0,
        })
        tween.then(function() {
            var next = cell.next(visible = false);
            var parent = cell.parent()
            cell.remove();
            if(next != null){
                var newCell = Cut.image("base:color_" +shell.color).insertBefore(next).pin("pivot", .5)
                    .pin({scale:0});
            }
            else{
                var newCell = Cut.image("base:color_" +shell.color).appendTo(parent).pin("pivot", .5)
                    .pin({scale:0});
            }

            var tween = newCell.tween(duration = 400, delay = 1000);
            tween.pin({
                scale: 1,
            })
            tween.then(function() {
                var overlay = Cut.image("dice" +shell.magnitude+":").appendTo(newCell).pin("pivot",0.5)
            });
            _displayGrid[row][col] = newCell;
            newCell.row = row;
            newCell.col = col;
            newCell.on(Cut.Mouse.CLICK,function(point) {
                this.pin({
                    scaleX : 1.3,
                    scaleY : 1.3
                });
                var coord = new Util.Coord(this.row,this.col);
                _player.selectShell(coord.row, coord.col);
            });
        });

        
    }
    function endGame(){
        console.log("ENDGAME");
    }

    
}
