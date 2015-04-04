var app = Cut(function(root,container) {
    var gameScreen = Cut.create();
    row1 = Cut.row().appendTo(root).pin("align", .10).spacing(1);
    var string = Cut.string("ascii_nimbus:")
                    .appendTo(row1)
                    .pin("align", 0)
                    .spacing(1);
    
    string.value("abczxyz!!!");
});
