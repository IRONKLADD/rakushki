function Shell(color, magnitude, type, special) {
    var color = color;
    var magnitude = magnitude;
    var type = type;
    var special = special;
    this.getColor = getColor;

    function getColor(){
        return color;
    }
}
