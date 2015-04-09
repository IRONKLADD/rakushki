function Buttons() {};

/**
 * Creates a button from random shells with the text overlayed.
 *
 * @param {String} text
 * @param {String[]} colors
 *
 * @return {Cut.row} 
 */
Buttons.makeShellsButton = function(text, colors) {
    var button = Cut.row();

    for(var i = 0; i < text.length; ++i) {
        var shell = Cut.image("base:color_" + Util.selectRandom(colors))
                       .appendTo(button);
        var c = Cut.image("ascii_nimbus_black_18:" + text[i])
                   .appendTo(shell)
                   .pin({scaleX: 1.0,
                         scaleY: 1.0,
                         align : 0.5});
    }
    return button;
}
