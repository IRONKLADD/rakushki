var tempCoord = new coord(3,2);

var myJSONText = JSON.stringify(tempCoord);
var mySet = new Set();

mySet.add(1);
mySet.add(5);
var emptyShells = new Set([]);
emptyShells.add(JSON.stringify(new coord(3,2)));
emptyShells.add(JSON.stringify(new coord(1,2)));
emptyShells.add(JSON.stringify(new coord(2,1)));
emptyShells.add(JSON.stringify(new coord(3,1)));
console.log(emptyShells);
var temp = _getEffectedShells(emptyShells);
console.log(temp);  



function _getEffectedShells(emptyShells) {
    var effectedShells = new Set();
    emptyShells.forEach(function(JSONcoord) {
        var temp = JSON.parse(JSONcoord);
        currentRow = temp.row;
        while(currentRow != -1) {
            console.log(temp.col);
            effectedShells.add(JSON.stringify(new coord(currentRow,temp.col)));
            currentRow = currentRow - 1;
        }
    });
    return effectedShells;
}

function coord(row,col) {
    this.row = row;
    this.col = col;
}