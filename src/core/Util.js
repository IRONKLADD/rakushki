/*
 * A class to hold static functions
 */
function Util() {

    /**
     * Checks if two Shells in the grid are adjacent.
     * @param row1 {int} The row corresponding to the first Shell.
     * @param col1 {int} The column corresponding to the first Shell.
     * @param row2 {int} The row corresponding to the second Shell.
     * @param col2 {int} The column corresponding to the second Shell.
     * @return {boolean} Returns true if the Shells are adjacent.
     *
     * This should be a static function when finished.
     */
    this.isAdjacent = function(row1, col1, row2, col2) {
        var rowDiff = row2 - row1;
        var colDiff = col2 - col1;
        if(rowDiff === 0) {
            return (colDiff === -1 || colDiff === 1);
        }
        else if(colDiff === 0) {
            return (rowDiff === -1 || colDiff === 1);
        }
            return false;
    }

    this.setUnion(setA, setB){
        var unionSet = new Set([]);
        var setIterA = setA.values();
        var setIterB = setB.values();
        for(var i = 0; i < setA.size; i++){
            unionSet.add(setIterA.next().value);
        }
        for(var i = 0; i < setB.size; i++){
            unionSet.add(setIterB.next().value);
        }


    } 
}


