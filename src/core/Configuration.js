function Configuration(rulesFile){
    var allowedColor   = new Array();
    var allowedNumber  = new Array();
    var allowedSpecial = new Array();
    var allowedType    = new Array();
    var width;
    var height;
    this.getColor      = getColor;
    this.getNumber     = getNumber;
    this.getSpecial    = getSpecial;
    this.getType       = getType;
    this.getWidth      = getWidth;
    this.getHeight     = getHeight;

    allowedColor   = ["red","blue","yellow","green"];
    allowedNumber  = [1,2,3,4,5];
    allowedSpecial = null;
    allowedType    = null;
    width  = 3;
    height = 3;


    function getColor(){
        return allowedColor;
    }
    function getNumber(){
        return allowedNumber;
    }
    function getSpecial(){
        return allowedSpecial;
    }
    function getType(){
        return allowedType;
    }
    function getHeight(){
        return height;
    }
    function getWidth(){
        return width;
    }



}
