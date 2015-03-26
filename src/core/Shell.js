function Shell(color, magnitude, type, special) {
    var color = color;
    var magnitude = magnitude;
    this.type = type;
    var special = special;
    this.getColor = getColor;
    this.getMagnitude = getMagnitude;
    this.getSpecial = getSpecial;
    this.getType = getType;

    function getColor(){
        return color;
    }
    function getMagnitude(){
        return magnitude;
    }
    function getType(){
        return type;
    }
    function getSpecial(){
        return special;
    }
}
