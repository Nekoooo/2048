/**
 * Created by Nekoooo on 16-4-13.
 */
var cells = null;
var jq = jQuery.noConflict();
jq(document).ready(function () {
    cells = new Cell();
    var touch = {startX:0,startY:0,endX:0,endY:0};
    jq(document).keydown(function (event) {
        //event.preventDefault();
        move(event.keyCode);
    });
    document.getElementById('new-game').addEventListener('click',function(){
        if(event.currentTarget == this){
            //event.preventDefault();
            reset();
        }
    });
    document.getElementById('new-game').addEventListener('touchstart',function(){
        if(event.currentTarget == this){
            //event.preventDefault();
            this.style.backgroundColor = '#b53014';
        }
    });
    document.getElementById('new-game').addEventListener('touchend',function(){
        if(event.currentTarget == this){
            //event.preventDefault();
            this.style.backgroundColor = '#b55529';
            reset();
        }
    });
    document.addEventListener('touchstart', function (event) {
        if(event.currentTarget == this){
            //event.preventDefault();
            touch.startX = event.touches[0].pageX;
            touch.startY = event.touches[0].pageY;
        }
    });
    document.getElementById('main-content').addEventListener('touchmove', function (event) {
        //event.preventDefault();
    });
    document.getElementById('main-content').addEventListener('touchend', function (event) {
        //event.preventDefault();
        if(event.currentTarget == this){
            //event.preventDefault();
            touch.endX = event.changedTouches[0].pageX;
            touch.endY = event.changedTouches[0].pageY;
            var dirCode = direction(touch.startX,touch.startY,touch.endX,touch.endY);
            //dir 0:avoid just click
            if(dirCode!=0) move(dirCode);
        }
    });

});

function reset(){
    cells.initValue();
    cells.initCells();
}

function move(keyCode){
    var row,col;
    var nextIndex = 0;//new column index for next element
    var newValue = 0;//temp
    if(keyCode == 37){//left
        console.log('move left');
        if(cells.isOver){return false}
        //move first
        for(row=0;row<4;row++){
            nextIndex = 0;
            for(col=0;col<4;col++){
                if(!cells.cellValues[row][col]) {}//empty
                else if(col==nextIndex){//all not empty
                    if(nextIndex>=1&&
                        cells.cellValues[row][col]==cells.cellValues[row][col-1]&&
                        cells.combineFlag[row][col]==false&&
                        cells.combineFlag[row][col]==cells.combineFlag[row][col-1]){
                        cells.combineFlag[row][col-1] = true;
                        jq('#cell-'+row+'-'+col).animate({
                            left:(col)*cells.marginSpace+(col-1)*cells.gridWidth
                        },100);
                        newValue = 2*cells.cellValues[row][col];
                        cells.cellValues[row][col-1] = newValue;
                        cells.cellValues[row][col] = 0;
                        //jq('#cell-'+row+'-'+(nextIndex-1)).remove();
                        nextIndex -= 1;
                        cells.score ++;
                        cells.cellCount --;
                    }
                    nextIndex += 1;
                }
                else if(nextIndex>=1 &&
                    cells.cellValues[row][col]==cells.cellValues[row][nextIndex-1]&&
                    cells.combineFlag[row][col]==false&&
                    cells.combineFlag[row][col]==cells.combineFlag[row][nextIndex-1]){

                    cells.combineFlag[row][nextIndex-1] = true;
                    jq('#cell-'+row+'-'+col).animate({
                        left:(nextIndex)*cells.marginSpace+(nextIndex-1)*cells.gridWidth
                    },100);
                    newValue = 2*cells.cellValues[row][col];
                    cells.cellValues[row][nextIndex-1] = newValue;
                    cells.cellValues[row][col] = 0;
                    cells.score ++;
                    cells.cellCount --;
                    //console.log(row+'-'+col+'-'+(nextIndex-1));
                }else{
                    jq('#cell-'+row+'-'+col).animate({
                        left:(nextIndex+1)*cells.marginSpace+nextIndex*cells.gridWidth
                    },100);
                    cells.cellValues[row][nextIndex] = cells.cellValues[row][col];
                    cells.cellValues[row][col] = 0;
                    nextIndex += 1;
                }
            }
        }
    }else if(keyCode == 38){//top
        console.log('move up');
        if(cells.isOver){return false}
        //move first
        for(col=0;col<4;col++){
            nextIndex = 0;
            for(row=0;row<4;row++){
                if(!cells.cellValues[row][col]) {}//empty
                else if(row==nextIndex){//all not empty
                    if(nextIndex>=1&&
                        cells.cellValues[row][col]==cells.cellValues[row-1][col]&&
                        cells.combineFlag[row][col]==false&&
                        cells.combineFlag[row][col]==cells.combineFlag[row-1][col]){
                        cells.combineFlag[row-1][col] = true;
                        jq('#cell-'+row+'-'+col).animate({
                            top:(row)*cells.marginSpace+(row-1)*cells.gridWidth
                        },100);
                        newValue = 2*cells.cellValues[row][col];
                        cells.cellValues[row-1][col] = newValue;
                        cells.cellValues[row][col] = 0;
                        //jq('#cell-'+row+'-'+(nextIndex-1)).remove();
                        nextIndex -= 1;
                        cells.score ++;
                        cells.cellCount --;
                    }
                    nextIndex += 1;
                }
                else if(nextIndex>=1 &&
                    cells.cellValues[row][col]==cells.cellValues[nextIndex-1][col]&&
                    cells.combineFlag[row][col]==false&&
                    cells.combineFlag[row][col]==cells.combineFlag[nextIndex-1][col]
                ){
                    cells.combineFlag[nextIndex-1][col] = true;
                    jq('#cell-'+row+'-'+col).animate({
                        top:(nextIndex)*cells.marginSpace+(nextIndex-1)*cells.gridWidth
                    },100);
                    newValue = 2*cells.cellValues[row][col];
                    cells.cellValues[nextIndex-1][col] = newValue;
                    cells.cellValues[row][col] = 0;
                    cells.score ++;
                    cells.cellCount --;
                    //console.log(row+'-'+col+'-'+(nextIndex-1));
                }else{
                    jq('#cell-'+row+'-'+col).animate({
                        top:(nextIndex+1)*cells.marginSpace+nextIndex*cells.gridWidth
                    },100);
                    cells.cellValues[nextIndex][col] = cells.cellValues[row][col];
                    cells.cellValues[row][col] = 0;
                    nextIndex += 1;
                }
            }
        }
    }else if(keyCode == 39){//right
        console.log('move right');
        if(cells.isOver){return false}
        //move first
        for(row=0;row<4;row++){
            nextIndex = 3;
            for(col=3;col>=0;col--){
                if(!cells.cellValues[row][col]) {}//empty
                else if(col==nextIndex){//all not empty
                    if(nextIndex<=2&&
                        cells.cellValues[row][col]==cells.cellValues[row][col+1]&&
                        cells.combineFlag[row][col]==false&&
                        cells.combineFlag[row][col]==cells.combineFlag[row][col+1]){
                        cells.combineFlag[row][col+1] = true;
                        jq('#cell-'+row+'-'+col).animate({
                            left:(col+2)*cells.marginSpace+(col+1)*cells.gridWidth
                        },100);
                        newValue = 2*cells.cellValues[row][col];
                        cells.cellValues[row][col+1] = newValue;
                        cells.cellValues[row][col] = 0;
                        //jq('#cell-'+row+'-'+(nextIndex-1)).remove();
                        nextIndex += 1;
                        cells.score ++;
                        cells.cellCount --;
                    }
                    nextIndex -= 1;
                }
                else if(nextIndex<=2 &&
                    cells.cellValues[row][col]==cells.cellValues[row][nextIndex+1]&&
                    cells.combineFlag[row][col]==false&&
                    cells.combineFlag[row][col]==cells.combineFlag[row][nextIndex+1]){

                    cells.combineFlag[row][nextIndex+1] = true;
                    jq('#cell-'+row+'-'+col).animate({
                        left:(nextIndex+2)*cells.marginSpace+(nextIndex+1)*cells.gridWidth
                    },100);
                    newValue = 2*cells.cellValues[row][col];
                    cells.cellValues[row][nextIndex+1] = newValue;
                    cells.cellValues[row][col] = 0;
                    cells.score ++;
                    cells.cellCount --;
                    //console.log(row+'-'+col+'-'+(nextIndex-1));
                }else{
                    jq('#cell-'+row+'-'+col).animate({
                        left:(nextIndex+1)*cells.marginSpace+nextIndex*cells.gridWidth
                    },100);
                    cells.cellValues[row][nextIndex] = cells.cellValues[row][col];
                    cells.cellValues[row][col] = 0;
                    nextIndex -= 1;
                }
            }
        }
    }else if(keyCode == 40){//bottom
        console.log('move down');
        if(cells.isOver){return false}
        //move first
        for(col=0;col<4;col++){
            nextIndex = 3;
            for(row=3;row>=0;row--){
                if(!cells.cellValues[row][col]) {}//empty
                else if(row==nextIndex){//all not empty
                    if(nextIndex<=2&&
                        cells.cellValues[row][col]==cells.cellValues[row+1][col]&&
                        cells.combineFlag[row][col]==false&&
                        cells.combineFlag[row][col]==cells.combineFlag[row+1][col]){
                        cells.combineFlag[row+1][col] = true;
                        jq('#cell-'+row+'-'+col).animate({
                            top:(row+2)*cells.marginSpace+(row+1)*cells.gridWidth
                        },100);
                        newValue = 2*cells.cellValues[row][col];
                        cells.cellValues[row+1][col] = newValue;
                        cells.cellValues[row][col] = 0;
                        cells.score ++;
                        cells.cellCount --;
                        //jq('#cell-'+row+'-'+(nextIndex-1)).remove();
                        nextIndex += 1;
                    }
                    nextIndex -= 1;
                }
                else if(nextIndex<=2 &&
                    cells.cellValues[row][col]==cells.cellValues[nextIndex+1][col]&&
                    cells.combineFlag[row][col]==false&&
                    cells.combineFlag[row][col]==cells.combineFlag[nextIndex+1][col]
                ){
                    cells.combineFlag[nextIndex+1][col] = true;
                    jq('#cell-'+row+'-'+col).animate({
                        top:(nextIndex+2)*cells.marginSpace+(nextIndex+1)*cells.gridWidth
                    },100);
                    newValue = 2*cells.cellValues[row][col];
                    cells.cellValues[nextIndex+1][col] = newValue;
                    cells.cellValues[row][col] = 0;
                    cells.score ++;
                    cells.cellCount --;
                    //console.log(row+'-'+col+'-'+(nextIndex-1));
                }else{
                    jq('#cell-'+row+'-'+col).animate({
                        top:(nextIndex+1)*cells.marginSpace+nextIndex*cells.gridWidth
                    },100);
                    cells.cellValues[nextIndex][col] = cells.cellValues[row][col];
                    cells.cellValues[row][col] = 0;
                    nextIndex -= 1;
                }
            }
        }
    }
    //reset combine flag
    setTimeout(function () {
        cells.resetFlag();
    },150);
    //born new cell (only one)
    setTimeout(function () {
        cells.createOneCell();
    },150);
    //refresh cells
    setTimeout(function () {
        cells.updatecells();
        //console.log(cells.cellCount);
    },200);
}

