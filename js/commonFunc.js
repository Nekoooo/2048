/**
 * Created by Yellow on 16-4-13.
 */
function direction(beginX,beginY,endX,endY){
    var deltax = endX-beginX;
    var deltay = endY-beginY;
    if(Math.abs(deltax)>50 || Math.abs(deltay)>50){
        if(Math.abs(deltax)<=Math.abs(deltay)){
            if(deltay>0) return 40;

            else return 38;
        }else{
            if(deltax<0) return 37;
            else return 39;
        }
    }else{
        return 0;
    }

}

function getCellColor(number) {
    var r = (parseInt('0xf',16)-number).toString(16);
    var g = (parseInt('0x4',16)+number).toString(16);
    var b = (parseInt('0xb',16)-number).toString(16);
    return '#'+r+g+b;
}