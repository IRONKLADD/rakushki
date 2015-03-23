var app = Cut(function(root,container) {
    var players = [new Player()];
    var config = new Configuration()
    var game = new SharikiGameType(players, config);
    Cut.Mouse(root, container);
    var render = new Display(root, players, config);


});