colors = ["black", "white", "red", "blue", "yellow", "green"];
sizes = new Map([
    [8  , [ 162,  28, 1, 1]],
    [9  , [ 163,  34, 1, 1]],
    [10 , [ 195,  37, 1, 1]],
    [11 , [ 226,  37, 1, 1]],
    [12 , [ 227,  40, 4, 4]],
    [14 , [ 259,  49, 1, 1]],
    [18 , [ 355,  61, 1, 0]],
    [24 , [ 451,  79, 1, 1]],
    [30 , [ 579, 100, 1, 1]],
    [36 , [ 707, 118, 1, 1]],
    [48 , [ 932, 154, 1, 1]],
    [60 , [1156, 193, 1, 1]],
    [72 , [1381, 232, 1, 1]],
    [96 , [1860, 304, 1, 1]]
]);


colors.forEach(function(color) {
    sizes.forEach(function(dimensions, size) {
        console.log(color + dimensions[0] + dimensions[1] + size);
        var width      = dimensions[0],
            height     = dimensions[1],
            pad_width  = dimensions[2],
            pad_height = dimensions[3];
        Cut({
            name       : "ascii_nimbus_" + color + "_" + size,
            imagePath  : "src/resources/fonts/ascii_nimbus_" +
                         color + "_" + size + ".png",
            imageRatio : 0,
            trim       : 0,
            cutouts    : Sprites.cutoutsFromGrid(Sprites.ascii, "",
                                                 width, height, 32, 3,
                                                 pad_width, pad_height)
        });
    });
});
