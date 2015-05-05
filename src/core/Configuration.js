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
                         weightedMagnitude(),
                         Util.selectRandom(types),
                         Util.selectRandom(specials));
    }
    function weightedMagnitude(){
        var weights = new Map([]);
        weights.set(1, .40);
        weights.set(2, .30);
        weights.set(3, .15);
        weights.set(4, .10);
        weights.set(5, .05);
        var p = 1 - Math.random();
        for(var i = 1; i <= 5 ; i++){
            var current = weights.get(i)
            p = p - current;
            if(p <= 0){
                return i;
            }
        }
    }
}
