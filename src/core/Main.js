function boardFromArray(array, height, width) {
    var board = new Board(height, width);
    for(var row = 0; row < height; row++)
        for(var col = 0; col < width; col++)
            board.set(row, col,
                      new Shell(array[row][col], null,
                                Shariki.NORMALSHELL, null));
    return board;
}

var board1 = [
    ["blue", "green", "blue"],
    ["red", "blue", "red"],
    ["blue", "yellow", "blue"]
];

var app = Cut(function(root,container) {
    var config = new Configuration();
    var player1 = new Player();

    var board = boardFromArray(board1, 3, 3);
    player1.setBoard(board);

    var players = [player1];
    var game = new SharikiGameType(players, config);
    Cut.Mouse(root, container);
    var render = new Display(root, players, config);
    game.setRender(render);
});
