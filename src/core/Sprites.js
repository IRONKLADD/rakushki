function Sprites() {};

Sprites.alphabet = [
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'],
    ['N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm'],
    ['n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '.', '?']
];

Sprites.cutoutsFromGrid = function(names, prefix,
                                   width, height, n_cols, n_rows) {
    var cutouts = [];
    var cutout_height = height / n_rows,
        cutout_width  = width  / n_cols;

    var c = 0;
    for(var i = 0; i < n_rows; ++i) {
        for(var j = 0; j < n_cols; ++j) {
            cutouts[c++] = {
                name   : prefix + names[i][j],
                x      : width  * j,
                y      : height * i,
                height : cutout_height,
                width  : cutout_width
            };
        }
    }

    return cutouts;
}

Cut({
    name       : "alphabet",
    imagePath  : "../resources/alphabet.png",
    imageRatio : 0,
    trim       : 0,
    cutouts    : Sprites.cutoutsFromGrid(Sprites.alphabet, "letter_",
                                         560, 386, 13, 5)
});
