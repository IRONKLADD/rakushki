var app = Cut(function(root,container) {
    var gameScreen = Cut.create();
    var cell = Cut.image("alphabet2:letter_a").appendTo(root);
    cell.pin("align", .5);
    row1 = Cut.row().appendTo(root).pin("align", .10).spacing(1);
    var string = Cut.string("alphabet2:letter").appendTo(row1).pin("align", 0).spacing(1);
    string.value(["_a","_b","_c","_d"]);
});