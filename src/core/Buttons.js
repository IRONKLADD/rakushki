function Buttons() {};

Buttons.makeShellsButton = function(text, color) {
    var button = Cut.row();

    for(var i = 0; i < text.length; ++i) {
        var shell = Cut.image("base:color_" + color)
            .appendTo(button);
        var c = Cut.image("ascii_nimbus_black:" + text[i])
            .appendTo(shell)
            .pin({
                scaleX: 0.2,
                scaleY: 0.2,
                align: 0.5
            });
    }

    return button;
}

/**
 * Will create a singular button using certain parameters and will return
 * the button.
 * @param  {String} text The Text that you want to appear on the button.
 * @param  {String} color the color that you want the button to be.
 * @param  {CutObject} parentNode the cut node that you want this button to be 
                                  appended to.
 * @return  {CutImage} button The button created by this method.
 */
function _createButton(text, color, parentNode){
    var button = Cut.image("base:color_" +color);
    var buttonText = Cut.string("ascii_nimbus_black:").appendTo(button);
    button.pin({
        scaleX : 1,
        scaleY : 1
    })
    buttonText.pin({
        align  : 0.5,
        scaleX : 0.5,
        scaleY : 0.5
    })
    button.appendTo(parentNode);
    buttonText.value(text);
    return button;
}
