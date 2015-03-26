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

function gravity(set){
    set.forEach(gravitise);
    /*for(var i = 0;i < set.length ;++i){
        gravitise(set[i]);
    }*/
}
function gravitise(array){
    var found = false;
    var row = array[0];
    var col = array[1];
    var rowCount = row - 1;
    
    if(row <= 0 || grid[row][col] != "n"){
        return;
    }
    while(!found  && rowCount >= 0){
        if(grid[rowCount][col] != "n"){
            found = true;
        }
        else{
            rowCount--;
        }
    }
    if(rowCount < 0){
        grid[row][col] = "n";
    }
    else{
        grid[row][col] = grid[rowCount][col];
        grid[rowCount][col] = "n";
        gravitise([rowCount,col]);
    }
    printArr();

}
function printArr(){
    var temp = "";
    for(i = 0;i<5;i++){
        for(j = 0;j<5;j++){
            temp = temp +" " + this.grid[i][j];
        }
        temp = temp + "\n";
    }
    console.log(temp);
    return temp;
  }
