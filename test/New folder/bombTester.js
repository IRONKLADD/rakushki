function boardFromArray(array, height, width) {
    var board = new Board(height, width);
    for(var row = 0; row < height; row++)
        for(var col = 0; col < width; col++)
            board.set(row, col,
                      new Shell(array[row][col],Math.floor(Math.random() * (5 - 1 + 1)) + 1,
                                Shariki.NORMALSHELL, null));
    return board;
}

function checkForBomb(JSONcoord, board, width, height) {
    var centerCoord = JSON.parse(JSONcoord);
    var row = centerCoord.row;
    var col = centerCoord.col;
    console.log(row);
    console.log(col);
    var bomb = null;
    var onLeft = (col === 0);
    var onRight = (col === width - 1);
    var onTop = (row === 0);
    var onBottom = (row === height - 1);
    if (!(onLeft || onTop)) {
        console.log("entered2222");
        var upLeft = Util.coordLeft(Util.coordUp(centerCoord));
        var up = Util.coordUp(centerCoord);
        var left = Util.coordLeft(centerCoord);
        bomb = checkBomb(board,new Set([upLeft, centerCoord, up, left]), upLeft);
        if (bomb !== null) {
            return bomb;
        }
    }
    if (!(onTop || onRight)) {
        console.log("2");
        var upRight = Util.coordRight(Util.coordUp(centerCoord));
        var right = Util.coordRight(centerCoord);
        var up = Util.coordUp(centerCoord);
        bomb = checkBomb(board,new Set([up, centerCoord, upRight, right]), up)
        if (bomb !== null) {
             return bomb;
        }
    }
    if (!(onBottom || onLeft)) {
        console.log("entered");
        var left = Util.coordLeft(centerCoord);
        var downLeft = Util.coordLeft(Util.coordDown(centerCoord));
        var down = Util.coordDown(centerCoord);
        bomb = checkBomb(board,new Set([left, centerCoord, downLeft, down]), left);
        if (bomb !== null) {
            return bomb;
        }
    }
    if (!(onBottom || onRight)) {
        console.log("1");
        console.log("sdfds" +down)
        console.log(centerCoord);
        var down = Util.coordDown(centerCoord);
        var downRight = Util.coordRight(Util.coordDown(centerCoord));
        var right = Util.coordRight(centerCoord);
        console.log(centerCoord);
        bomb = checkBomb(board,new Set([centerCoord, downRight, down, right]), 
                         centerCoord);
    }
    return bomb;
}

function checkBomb(board, shellCoords, topLeftCoord) {
    shellArray = new Array();
    count = 0;
    console.log(topLeftCoord);
    console.log("left " + topLeftCoord);
    console.log(shellCoords);
    shellCoords.forEach(function(coord) {
        var currentShell = board.get(coord.row,coord.col);
        shellArray[count] =currentShell;
        count++;
    });
    var checkColor = shellArray[0].color;
    console.log("color " +checkColor);
    var validBomb = true;
    shellArray.forEach(function(shell) {
        console.log(shell.color + " spec " + shell.special);
        if(shell.color !== checkColor || shell.special !== null){
            console.log("INSIDE");
            validBomb = false;
        }
    });
    if(!validBomb){
        return null;
    }
    else{
        return makeBomb(shellArray,topLeftCoord);
    }
}

function makeBomb(shellArray,topLeftCoord){
    console.log("MAKEBOMB CALLED");
    var color = shellArray[0].color;
    var blastRad = shellArray[0].magnitude;
    var explosionTurn = 0;
    var bombCoord;
    shellArray.forEach(function(shell) {
        if(shell.magnitude < blastRad){
            blastRad = shell.magnitude;
        }
        explosionTurn = explosionTurn + shell.magnitude;
    });
    var currentBomb = new Bomb(color, blastRad, explosionTurn,
                               shellArray, topLeftCoord);
    shellArray.forEach(function(shell) {
        shell.special = currentBomb;
    });

}
function coord(row1,col1) {
    this.row = row1;
    this.col = col1;
}
var customBoard = [
    ["red","red","blue"],
    ["red","blue","red"],
    ["blue","red","red"]
]
var board = boardFromArray(customBoard,3,3);

checkForBomb(JSON.stringify(new coord(2,2)),board,3,3);
var checker = [[],[],[]];
console.log("lets look at it");
for(var i = 0; i<3 ; i++){
    for(var j = 0; j<3 ; j++){
        console.log(i +" "+ j);
        console.log(board.get(i,j).special);
    }
}





