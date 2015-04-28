var rakushki = {};

var app = Cut(function(root, container) {
    Cut.Mouse(root, container);

    rakushki.startSharikiGame = function() {
        var width  = settingsCache.width,
            height = settingsCache.height,
            colors = settingsCache.colors;
        var magnitudes = [null];
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
            colors = settingsCache.colors;
        var magnitudes = [1, 2, 3, 4, 5];
        var specials = [null];
        var types = [Bombi.NORMALSHELL];
        var config = new Configuration(width, height,
                                       colors, magnitudes,
                                       specials, types);
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
