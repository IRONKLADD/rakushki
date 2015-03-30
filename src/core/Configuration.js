function Configuration(rulesFile){
    this.allowedColors   = ["red", "blue", "yellow", "green"];
    this.allowedNumbers  = [1, 2, 3, 4, 5];
    this.allowedSpecials = null;
    this.allowedTypes    = ["normal"];
    this.width  = 8;
    this.height = 8;

    this.getRandomColor = function(color) {
        return this.allowedColors[Util.randomInt(this.allowedColors.length)];
    }
}
