var app = Cut(function(root,container) {
    var config = new Configuration();
    var player1 = new Player();

    var board = new Board(3, 3);
    var insertShell = function(row, col, color) {
        board.set(row, col,
                  new Shell(color, null, Shariki.NORMALSHELL, null));
    };
    insertShell(0, 0, "blue");
    insertShell(0, 1, "green");
    insertShell(0, 2, "blue");
    insertShell(1, 0, "red");
    insertShell(1, 1, "blue");
    insertShell(1, 2, "red");
    insertShell(2, 0, "blue");
    insertShell(2, 1, "yellow");
    insertShell(2, 2, "blue");

    player1.setBoard(board);

    var players = [player1];
    var game = new SharikiGameType(players, config);
    Cut.Mouse(root, container);
    var render = new Display(root, players, config);
    game.setRender(render);


});
