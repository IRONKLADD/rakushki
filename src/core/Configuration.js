function Configuration(rulesFile){
    this.allowedColors   = ["red", "blue", "yellow", "green","dark","orange","purple"];
    this.allowedNumbers  = [1, 2, 3, 4, 5];
    this.allowedSpecials = null;
    this.allowedTypes    = ["normal"];
    this.width  = 20;
    this.height = 20;

    this.getRandomColor = function(color) {
        return this.allowedColors[Util.randomInt(this.allowedColors.length)];
    }
}
