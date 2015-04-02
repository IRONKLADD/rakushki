var app = Cut(function(root,container) {
    Cut.Mouse(root, container);
    var gameScreen = Cut.create();
    var cell = Cut.image("alphabet2:letter_a").appendTo(root);
    cell.pin("align", .5);
    row1 = Cut.row().appendTo(root).pin("align", .10).spacing(1);
    var string = Cut.string("base:d_").appendTo(row1).pin("align", 0).spacing(1);
    string.pin({
        scale : 5
    })
    var count = 0;
    string.value(count);

    cell.on(Cut.Mouse.CLICK,function(point) {
        count++;
        string.value(count);
    });
});