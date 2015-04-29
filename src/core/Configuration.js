function Configuration(width, height, colors, magnitudes, specials, types){
    this.width = width;
    this.height = height;
    this.colors = colors;
    this.magnitudes = magnitudes;
    this.specials = specials;
    this.types = types;

    this.getRandomShell = function() {
        return new Shell(Util.selectRandom(colors),
                         Util.selectRandom(magnitudes),
                         Util.selectRandom(types),
                         Util.selectRandom(specials));
    }
}
