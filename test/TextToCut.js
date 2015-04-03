var app = Cut(function(root,container) {
    console.log(Sprites.cutoutsFromGrid(Sprites.alphabet, "letter_",
                                        560, 386, 13, 5))
    var gameScreen = Cut.create();
    var cell = Cut.image("alphabet:letter_a").appendTo(root);
    cell.pin("align", .5);
    row1 = Cut.row().appendTo(root).pin("align", .10).spacing(1);
    var string = Cut.string("alphabet:letter_").appendTo(row1).pin("align", 0).spacing(1);
    string.value(["a","b","c","d"]);
});
