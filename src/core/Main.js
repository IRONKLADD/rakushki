var rakushki = {};

function setViewBox(width, height, scale, root) {
    var dimension = scale*Math.max(width, height);
    root.viewbox(dimension, dimension);
}

var app = Cut(function(root, container) {
    Cut.Mouse(root, container);

    rakushki.startSharikiGame = function() {
        var width  = settingsCache.width,
            height = settingsCache.height,
            colors = settingsCache.colors;

        setViewBox(width, height, 40, root);

        var magnitudes = [[0, 1.0]];
        var specials = [null];
        var types = [Shariki.NORMALSHELL];
        var config = new Configuration(width, height,
                                       colors, magnitudes,
                                       specials, types);
        var player1 = new Player();

        var players = [player1];
        var game = new SharikiGameType(players, config);
        var render = new Display(root, players, config);
        game.setRender(render);
        render._createBoard(player1);
    };

    rakushki.startBombiGame = function() {
        var width  = settingsCache.width,
            height = settingsCache.height,
            colors = settingsCache.colors,
            allottedTurns = settingsCache.turns

        setViewBox(width, height, 40, root);

        var magnitudes = [[1, 0.40],
                          [2, 0.30],
                          [3, 0.15],
                          [4, 0.10],
                          [5, 0.05]];
        var specials = [null];
        var types = [Bombi.NORMALSHELL];
        var config = new Configuration(width, height,
                                       colors, magnitudes,
                                       specials, types, allottedTurns);
        var player1 = new Player();

        var players = [player1];
        var game = new BombiGameType(players, config);
        var render = new Display(root, players, config);
        game.setRender(render);
        render._createBoard(player1);
    };

    rakushki.setLastGameShariki = function() {
        rakushki.startLastGame = rakushki.startSharikiGame;
    };

    rakushki.setLastGameBombi = function() {
        rakushki.startLastGame = rakushki.startBombiGame;
    };

    rakushki.clearGame = function() {
        root.empty();
    }

    rakushki.restartGame = function() {
        root.empty();
        rakushki.startLastGame();
    };


    
});
