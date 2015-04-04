function Buttons() {};

Buttons.makeShellsButton = function(text, color) {
    var button = Cut.row();

    for(var i = 0; i < text.length; ++i) {
        var shell = Cut.image("base:color_" + color)
                       .appendTo(button);
        var c = Cut.image("ascii_nimbus_black:" + text[i])
                   .appendTo(shell)
            .pin({scaleX: 0.2, scaleY: 0.2, align: 0.5});
    }

    return button;
}
