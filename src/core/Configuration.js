function Configuration(rulesFile){
    this.allowedColors   = ["red", "blue", "yellow", "green","orange","dark"];
    this.allowedNumbers  = [1, 2, 3, 4, 5];
    this.allowedSpecials = null;
    this.allowedTypes    = ["normal"];
    this.width  = 8;
    this.height = 8;

    this.getRandomColor = function(color) {
        return Util.selectRandom(this.allowedColors);
    }
}
