function Sprites() {};

Sprites.ascii = [
    [' ', '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.',
     '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '<', '=',
     '>', '?'],
    ['@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
     'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '[', '\\', ']',
     '^', '_'],
    ['`', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
     'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '{', '|', '}',
     '~', ' ']
]

Sprites.cutoutsFromGrid = function(names, prefix,
                                   width, height, n_cols, n_rows) {
    var cutouts = [];
    var cutout_height = height / n_rows,
        cutout_width  = width  / n_cols;

    var c = 0;
    for(var i = 0; i < n_rows; ++i)
        for(var j = 0; j < n_cols; ++j)
            cutouts[c++] = {
                name   : prefix + names[i][j],
                x      : cutout_width  * j,
                y      : cutout_height * i,
                height : cutout_height,
                width  : cutout_width
            };
    return cutouts;
}

spriteColors = ["black", "white", "red", "blue", "yellow", "green"];

/* ASCII sprites */


spriteColors.forEach(function(color) {
    Cut({
        name       : "ascii_nimbus_" + color,
        imagePath  : "src/resources/fonts/ascii_nimbus_" + color + ".png",
        imageRatio : 0,
        trim       : 0,
        cutouts   : Sprites.cutoutsFromGrid(Sprites.ascii, "",
                                             1381, 232, 32, 3)
    });


});

/* button sprites */
for (var i = 0; i < spriteColors.length; ++i) {
    var color = spriteColors[i];
    var yPosition = 20*i;
    Cut({
        name       : "button_" + color,
        imagePath  : "src/resources/buttons.png",
        imageRatio : 0,
        trim       : 0,
        cutouts    : [
            {
                name   : "small",
                x      : 0,
                y      : yPosition,
                height : 15,
                width  : 15
            },
            {
                name   : "medium",
                x      : 20,
                y      : yPosition,
                height : 15,
                width  : 20
            },
            {
                name   : "large",
                x      : 45,
                y      : yPosition,
                height : 15,
                width  : 25
            },
            {
                name   : "x-large",
                x      : 75,
                y      : yPosition,
                height : 15,
                width  : 30
            }
        ]
    });
}

/* SHAPES */

/* triangles */
for (var i = 0; i < spriteColors.length; ++i) {
    var color = spriteColors[i];
    var yPosition = 14*i;
    Cut({
        name       : "triangle_" + color,
        imagePath  : "src/resources/triangles.png",
        imageRatio : 0,
        trim       : 0,
        cutouts    : [
            {
                name   : "small_up",
                x      : 0,
                y      : yPosition,
                height : 4,
                width  : 7
            },
            {
                name   : "small_down",
                x      : 0,
                y      : yPosition+6,
                height : 4,
                width  : 7
            },
            {
                name   : "large_up",
                x      : 10,
                y      : yPosition,
                height : 10,
                width  : 19
            },
            {
                name   : "large_down",
                x      : 10,
                y      : yPosition,
                height : 30,
                width  : 19
            }
        ]
    });
}
