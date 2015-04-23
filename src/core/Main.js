function boardFromArray(array, height, width) {
    var board = new Board(height, width);
    for(var row = 0; row < height; row++)
        for(var col = 0; col < width; col++)
            board.set(row, col,
                      new Shell(array[row][col], null,
                                Shariki.NORMALSHELL, null));
    return board;
}

function createTitleMenu() {
    var titleMenu = Cut
        .column()
        .spacing(10);
    Cut
        .image("logo:rakushki")
        .pin({
            scaleX : 0.5,
            scaleY : 0.5,
            alignX : 0.5,
            alignY : 0.5
        })
        .appendTo(titleMenu);
    var loading = Buttons
        .makeShellsButton("Loading", "red")
        .pin({
            alignX : 0.5
        })
        .appendTo(titleMenu);
    var start = Buttons
        .makeShellsButton("Start", "yellow")
        .pin({
            alignX : 0.5
        })
        .hide()
        .appendTo(titleMenu);

    function finishedLoading(mainMenu) {
        start.on(Cut.Mouse.CLICK,
                 function() {
                     titleMenu.hide();
                     mainMenu.show()
                 });
        loading.hide();
        start.show();
    }

    return [titleMenu, finishedLoading];
}    

function createMainMenu(singlePlayerFn, multiPlayerFn, settingsFn) {
    var mainMenu = Cut
        .column()
        .spacing(10);
    var buttonSinglePlayer = Buttons
        .makeShellsButton("Single Player", "red")
        .appendTo(mainMenu)
        .on(Cut.Mouse.CLICK,
            Util.partial(singlePlayerFn, mainMenu));
    var buttonMultiPlayer = Buttons
        .makeShellsButton("Multi Player", "yellow")
        .appendTo(mainMenu)
        .on(Cut.Mouse.CLICK,
            Util.partial(multiPlayerFn, mainMenu));
    var buttonSettings = Buttons
        .makeShellsButton("Settings", "blue")
        .appendTo(mainMenu)
        .on(Cut.Mouse.CLICK,
            Util.partial(settingsFn, mainMenu));
    return mainMenu;
}

function createConfigMenu(root) {
    var selectedGameType, width, height;

    var configMenu = Cut
        .column()
        .spacing(10);
    var gameTypeRow = Cut
        .row()
        .spacing(10)
        .appendTo(configMenu);
    var dimensionsRow = Cut
        .row()
        .spacing(10)
        .appendTo(configMenu);
    var sharikiButton = Cut.image("gameType_logos:shariki_small")
    var bombiButton = Cut.image("gameType_logos:bombi_small")

    var gameTypeSpinner = Buttons
        .makeSpinner(
            [[sharikiButton,
              function() { selectedGameType = SharikiGameType; }],
             [bombiButton,
              function() { selectedGameType = BombiGameType; }]],
            0,
            Cut.image("button_blue:medium"),
            Cut.image("triangle_blue:small_up")
                .pin({
                    alignY : 0
                }),
            Cut.image("triangle_blue:small_down")
                .pin({
                    alignY : 1
                }))
        .appendTo(gameTypeRow);
    var widthText = Cut
        .string("ascii_nimbus_black:")
        .value("width")
        .appendTo(dimensionsRow)
        .pin({
            scale : 0.2
        });
    var widthSpinner = Buttons
        .makeNumberSpinner(
            3, 9, 8,
            function (n) {
                width = n;
            },
            "ascii_nimbus_white",
            Cut.image("button_blue:medium"),
            Cut.image("triangle_blue:small_up")
                .pin({
                    alignY : 0
                }),
            Cut.image("triangle_blue:small_down")
                .pin({
                    alignY : 1
                }))
        .appendTo(dimensionsRow);
    var widthText = Cut
        .string("ascii_nimbus_black:")
        .value("height")
        .appendTo(dimensionsRow)
        .pin({
            scale : 0.2
        });
    var heightSpinner = Buttons
        .makeNumberSpinner(
            3, 9, 8,
            function (n) {
                height = n;
            },
            "ascii_nimbus_white",
            Cut.image("button_blue:medium"),
            Cut.image("triangle_blue:small_up")
                .pin({
                    alignY : 0
                }),
            Cut.image("triangle_blue:small_down")
                .pin({
                    alignY : 1
                }))
        .appendTo(dimensionsRow);
    var startButton = Buttons
        .makeShellsButton("Start", "blue")
        .appendTo(configMenu)
        .on(Cut.Mouse.CLICK,
            function() {
                var colors = ["red", "blue", "yellow", "green", "orange",
                              "dark"];
                var magnitudes = [/*1,2,3,4,*/5];
                var specials = [null];
                var types = [Shariki.NORMALSHELL];
                var config = new Configuration(width, height,
                                               colors, magnitudes,
                                               specials, types);
                var player1 = new Player();

                var players = [player1];
                var game = new selectedGameType(players, config);
                var render = new Display(root, players, config);
                game.setRender(render);
                configMenu.hide();
                render._createBoard(player1);
            });

    return configMenu;
}


var board1 = [
    ["blue", "green" , "blue"],
    ["red" , "blue"  , "red" ],
    ["blue", "yellow", "blue"]
];


var app = Cut(function(root,container) {
    Cut.Mouse(root, container);

    var titleMenuAndCallback = createTitleMenu();
    var titleMenu   = titleMenuAndCallback[0]
        .appendTo(root)
        .pin({
            alignX : 0.5,
            alignY : 0.5
        });
    var titleLoaded = titleMenuAndCallback[1];

    var configMenu = createConfigMenu(root)
        .appendTo(root)
        .hide()
        .pin({
            alignX : 0.5,
            alignY : 0.5
        });

    var singlePlayerFn = function(mainMenu) {
        mainMenu.hide();
        configMenu.show();
    };
    var multiPlayerFn = function(mainMenu) {};
    var settingsFn = function(mainMenu) {};

    var mainMenu = createMainMenu(singlePlayerFn,
                                  multiPlayerFn,
                                  settingsFn)
        .hide()
        .appendTo(root)
        .pin({alignX : 0.5,
              alignY : 0.5});

    titleLoaded(mainMenu);
});
