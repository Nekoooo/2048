/**
 * Created by Yellow on 16-4-13.
 */
function Cell(){
    this.cellValues = [];
    this.combineFlag = [];
    this.cellCount = 0;//game over if full
    this.score = 0;
    this.isOver = false;
    
    //size parameters
    this.winWidth = 0;//screen width
    this.containerWidth = 0;
    this.gridWidth = 0;
    this.marginSpace = 0;
    
    this.initValue();
    this.initSize();
    this.createCellContainer();
    this.initCells();
}

Cell.prototype = {
    initValue: function () {
        for(var i=0;i<4;i++){
            this.cellValues[i] = [];
            this.combineFlag[i] = [];
            for(var j=0;j<4;j++){
                this.cellValues[i][j] = 0;
                this.combineFlag[i][j] = false;
            }
        }
        this.cellCount = 0;//game over if full
        this.score = 0;
        this.isOver = false;
        jq('.number-cell').remove();
        jq('#score').text('score:0');
    },
    initSize: function () {
        this.winWidth=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
        this.containerWidth = 0.92 * this.winWidth;
        this.gridWidth = 0.18 * this.winWidth;
        this.marginSpace = 0.04 * this.winWidth;
        //initial container
        jq('#main-content').css('width',this.containerWidth);
        jq('#main-content').css('height',this.containerWidth);
    },
    createCellContainer: function () {
        for(var i=0;i<4;i++) {
            for (var j = 0; j < 4; j++) {
                var newcell = document.createElement('div');
                newcell.setAttribute('id','cell-container-'+i+'-'+j);
                newcell.style.cssText = "" +
                    "position:absolute;"+
                    "display :inline-block;"+
                    "width    :"+this.gridWidth+"px;"+
                    "height   :"+this.gridWidth+"px;"+
                    "border-radius:"+0.1*this.gridWidth+"5px;"+
                    "text-align :center;"+
                    "left     :"+((j+1)*this.marginSpace+j*this.gridWidth)+"px;"+
                    "top      :"+((i+1)*this.marginSpace+i*this.gridWidth)+"px;";
                newcell.setAttribute('class','grid-cell-bg');
                jq('#main-content').append(newcell);
            }
        }
    },
    initCells:function(){
        this.createOneCell();
        this.createOneCell();
    },
    createOneCell: function () {
        if(this.cellCount==16){
            jq('#score').text('game over');
            this.score = 0;
            this.isOver = true;
            return false;
        }
        var row = Math.floor(Math.random()*4);
        var col = Math.floor(Math.random()*4);
        while(this.cellValues[row][col]){
            row = Math.floor(Math.random()*4);
            col = Math.floor(Math.random()*4);
        }
        this.cellCount++;
        var randN = Math.pow(2,Math.ceil(Math.random()*2));
        this.cellValues[row][col] = randN;
        var newcell = document.createElement('div');
        newcell.setAttribute('id','cell-'+row+'-'+col);
        var colorValue = Math.log2(this.cellValues[row][col]);
        newcell.style.cssText = "" +
            "line-height :"+ this.gridWidth +"px;"+
            "font-size:"+ (0.5*this.gridWidth) +"px;"+
            "width    :"+this.gridWidth+"px;"+
            "height    :"+this.gridWidth+"px;"+
            "border-radius:"+0.1*this.gridWidth+"5px;"+
            "background-color:"+getCellColor(colorValue)+";"+
            "left     :"+((col+1) * this.marginSpace+col * this.gridWidth)+"px;"+
            "top      :"+((row+1)* this.marginSpace+row * this.gridWidth)+"px;";
        newcell.setAttribute('class','number-cell');
        //newcell.style.backgroundColor = 'rgb(255,187,'+32*Math.log2(this.cellValues[row][col])+')';
        newcell.innerHTML = randN.toString();
        jq('#main-content').append(newcell);
    },
    resetFlag: function () {
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++)
                this.combineFlag[i][j] = false;
        }
    },
    updatecells: function () {
        if(this.isOver){
            return false;
        }
        jq('.number-cell').remove();
        this.cellCount = 0;
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                if(this.cellValues[i][j]){
                    this.cellCount++;
                    var newcell = document.createElement('div');
                    newcell.setAttribute('id','cell-'+i+'-'+j);
                    var colorValue = Math.log2(this.cellValues[i][j]);
                    newcell.style.cssText = "" +
                    "line-height :"+ this.gridWidth +"px;"+
                    "font-size:"+ (0.5*this.gridWidth) +"px;"+
                    "width    :"+this.gridWidth+"px;"+
                    "height    :"+this.gridWidth+"px;"+
                    "border-radius:"+0.1*this.gridWidth+"5px;"+
                    "background-color:"+getCellColor(colorValue)+";"+
                    "left     :"+((j+1) * this.marginSpace+j * this.gridWidth)+"px;"+
                    "top      :"+((i+1) * this.marginSpace+i * this.gridWidth)+"px;";
                    newcell.setAttribute('class','number-cell');
                    //newcell.style.backgroundColor = 'rgb(255,187,'+32*Math.log2(this.cellValues[i][j])+')';
                    newcell.innerHTML = this.cellValues[i][j];
                    jq('#main-content').append(newcell);
                }
            }
        }
        //update score
        jq('#score').text('score:'+this.score);
    }
    
};