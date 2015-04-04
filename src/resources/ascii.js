colors = ["black", "white", "red", "blue", "yellow", "green"];

colors.forEach(function(color) {
    Cut({
        name       : "ascii_nimbus_" + color,
        imagePath  : "src/resources/ascii_nimbus_" + color + ".png",
        imageRatio : 0,
        trim       : 0,
        cutouts    : Sprites.cutoutsFromGrid(Sprites.ascii, "",
                                             1381, 232, 32, 3)
    });


});

