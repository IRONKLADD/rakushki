function Buttons() {};

Buttons.makeShellsButton = function(text, color) {
    var button = Cut.row();

    for(var i = 0; i < text.length; ++i) {
        var shell = Cut
            .image("base:color_" + color)
            .appendTo(button);
        var c = Cut
            .image("ascii_nimbus_black:" + text[i])
            .appendTo(shell)
            .pin({
                scaleX: 0.2,
                scaleY: 0.2,
                align : 0.5
            });
    }

    return button;
}

/**
 *
 */
Buttons.makeSpinner = function(choices, initialIndex, background,
                               upArrow, downArrow) {
    var spinner = Cut.row();
    spinner.choiceIndex = initialIndex;
    background
        .appendTo(spinner)
        .pin({
            alignY : 0.5
        });
    for(var i = 0; i < choices.length; ++i) {
        var button = choices[i][0];
        button
            .hide()
            .appendTo(background)
            .pin({
                align : 0.5
            });
    }
    var arrows = Cut
        .column()
        .appendTo(spinner)
        .pin({
            alignY : 0.5
        });
    upArrow
        .appendTo(arrows)
        .on(Cut.Mouse.CLICK,
            function () {
                var upIndex = (spinner.choiceIndex+1) % choices.length;
                choices[spinner.choiceIndex][0].hide()
                choices[upIndex][0].show()
                choices[upIndex][1]();
                spinner.choiceIndex = upIndex;
            });
    downArrow
        .appendTo(arrows)
        .on(Cut.Mouse.CLICK,
            function () {
                var downIndex = Util.mod((spinner.choiceIndex-1),
                                         choices.length);
                choices[spinner.choiceIndex][0].hide()
                choices[downIndex][0].show()
                choices[downIndex][1]();
                spinner.choiceIndex = downIndex;
            });

    choices[initialIndex][0].show();
    choices[initialIndex][1]();

    return spinner;
}

Buttons.makeNumberSpinner = function(low, high, initial, setter,
                                     font, background,
                                     upArrow, downArrow) {
    var choices = new Array(high-low+1);
    for(var i = 0; i < choices.length; ++i) {
        choices[i] = [
            Cut.image(font + ":" + (i+low)),
            function () { setter(i+low) }
        ];
    }
    return Buttons.makeSpinner(choices, initial-low, background,
                               upArrow, downArrow);
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
    var buttonText = Cut
        .string("ascii_nimbus_black:")
        .appendTo(button);
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
