function boardFromArray(array, height, width) {
    var board = new Board(height, width);
    for(var row = 0; row < height; row++)
        for(var col = 0; col < width; col++)
            board.set(row, col,
                      new Shell(array[row][col], null,
                                Shariki.NORMALSHELL, null));
    return board;
}
function createMenu(root,render,player){
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
        render._createBoard(player);
    });

    var SinglePlayerMenu = Cut.column().appendTo(root).spacing(1);
    mainMenu.pin({
        alignX : 0.5,
        alignY : 0.0
    })
}

var board1 = [
    ["blue", "green", "blue"],
    ["red", "blue", "red"],
    ["blue", "yellow", "blue"]
];


var app = Cut(function(root,container) {
    var width  = 8,
        height = 8;
    var colors = ["red", "blue", "yellow", "green", "orange", "dark"];
    var magnitudes = [null];
    var specials = [null];
    var types = [Shariki.NORMALSHELL];
    var config = new Configuration(width, height,
                                   colors, magnitudes, specials, types);
    var player1 = new Player();
    console.log("MADE A MENU");

    // var board = boardFromArray(board1, 3, 3);
    // player1.setBoard(board);

    var players = [player1];
    var game = new SharikiGameType(players, config);
    Cut.Mouse(root, container);
    var render = new Display(root, players, config);
    game.setRender(render);
    createMenu(root,render,players[0]);
});
