function Bomb(color, blastRad, explosionTurn, shellArray, bombCoord) {
    console.log("bomber");
    this.color = color;
    this.blastRad = blastRad;
    this.explosionTurn = explosionTurn;
    this.shellArray = shellArray;
    this.bombCoord = bombCoord;
    console.log("bomberState");
    /*this.state = Bombi.ACTIVE;*/
    console.log("bombercorner");
    this.cornerShell = shellArray[0];
    console.log("bomberEND");
}