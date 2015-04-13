var grid = []
var count = 0
for(var i = 0; i < 5; ++i) {
    grid.push([]);
    for(var j = 0; j < 5; ++j) {
            grid[i].push(count);
            count++;
    }
}

printArr();
grid[2][2] = "n";
grid[3][4] = "n";
grid[0][1] = "n";
grid[3][2] = "n";
printArr();
set = new Set();
set.add([2,2]);
set.add([0,1]);
set.add([3,2]);
set.add([3,4]);
gravity(set);
printArr();

function gravity(emptyShells){
    var newEmptyShells = new Set([]);
    set.forEach(function(coord){
        gravitise(coord);
    });
    /*for(var i = 0;i < set.length ;++i){
        gravitise(set[i]);
    }*/
}
function gravitise(coord){
    var found = false;
    var row = array[0];
    var col = array[1];
    var colCount = col - 1;
    // console.log(col)
    if(col <= 0 || grid[row][col] != "n"){
        return;
    }
    while(!found){
        if(grid[row][colCount] != "n"){
            found = true;
        }
        else{
            colCount--;
        }
    }
    if(colCount < 0){
        grid[row][col] = "n";
    }
    else{
        grid[row][col] = grid[row][colCount];

        grid[row][colCount] = "n";
        gravitise([row,colCount]);
    }
    printArr();

}
function printArr(){
    var temp = "";
    for(i = 0;i<5;i++){
        for(j = 0;j<5;j++){
            temp = temp +" " + this.grid[j][i];
        }
        temp = temp + "\n";
    }
    console.log(temp);
    return temp;
  }
