function Configuration(width, height, colors, magnitudes, specials, types, turns){
    this.width = width;
    this.height = height;
    this.colors = colors;
    this.magnitudes = magnitudes;
    this.specials = specials;
    this.types = types;
    this.allottedTurns = turns;

    this.getRandomShell = function() {
        return new Shell(Util.selectRandom(colors),
                         Util.selectWeightedRandom(magnitudes),
                         Util.selectRandom(types),
                         Util.selectRandom(specials));
    }
}
