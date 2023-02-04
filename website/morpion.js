function resize(){
    var w = window.innerWidth;
    document.getElementById('board').style.height = Math.floor(w/3)+"px";
}
window.onload = resize;
window.onresize = resize;

var sizeChangerShown = false;
function toggleChangeSize(){
    if (sizeChangerShown){
        document.getElementById('sizeChanger').style.opacity = 0;
        sizeChangerShown = false;
        document.getElementById('changeSize').style.opacity = 0.6;
        document.getElementById('changeSize').style.paddingLeft = "25px";
        document.getElementById('changeSize').style.paddingRight = "25px";
    }else{
        document.getElementById('sizeChanger').style.opacity = 1;
        sizeChangerShown = true;
        document.getElementById('changeSize').style.opacity = 1;
        document.getElementById('changeSize').style.paddingLeft = "65px";
        document.getElementById('changeSize').style.paddingRight = "65px";
    }
}function changeSize_hover(){
    if (! (sizeChangerShown)){
        document.getElementById('changeSize').style.opacity = 0.8;
        document.getElementById('changeSize').style.paddingLeft = "45px";
        document.getElementById('changeSize').style.paddingRight = "45px";
        document.getElementById('changeSize').style.cursor = "pointer";
    }
}function changeSize_nothover(){
    if (! (sizeChangerShown)){
        document.getElementById('changeSize').style.opacity = 0.6;
        document.getElementById('changeSize').style.paddingLeft = "25px";
        document.getElementById('changeSize').style.paddingRight = "25px";
        document.getElementById('changeSize').style.cursor = "none";
    }
    
}
function img_rotate(){
    document.getElementById('reset_img').style.transform = "rotate(360deg)";
}function img_antirotate(){
    document.getElementById('reset_img').style.transform = "rotate(0deg)";
}

var board_size = 3;
function changeBoardSize(modifier) {
    if ((board_size == 3 && modifier == '-') || (board_size == 20 && modifier == '+')){
        return 0;
    }
    
    if (board_size >= 10 && !(board_size == 10 && modifier == '-')){
        board_size += modifier == '+' ? 5 : -5;
    }else{board_size += modifier == '+' ? 1 : -1;}

    document.getElementById('boardSize').innerHTML = board_size+'x'+board_size;
    document.getElementById('board').innerHTML = "";
    var k = 1;
    for (let i = 1; i < board_size+1; i++) {
        document.getElementById('board').innerHTML += "<tr id=row"+i+"></tr>";
        for (let j = 0; j < board_size; j++) {
            document.getElementById('row'+i).innerHTML += "<td id='cell"+k+"' onclick='play(this)'></td>";
            k ++;
        }
    }
    document.getElementById('alert').innerHTML = "";
    turn = 0;
    game_finished = false;
}

var game_finished = false;
function finished() {
    var full = true;
    for (let i = 1; i < board_size**2 + 1; i++) {
        if (document.getElementById('cell'+i).style.backgroundColor == ""){
            full = false;
            break;
        }
    }
    if (full){
        game_finished = true;
        return true;
    }

    for (let i = 1; i < board_size**2 + 1; i += board_size) { // horizontal
        current_i = i;
        while (document.getElementById('cell'+current_i).style.backgroundColor == document.getElementById('cell'+(current_i+1)).style.backgroundColor 
        && document.getElementById('cell'+current_i).style.backgroundColor != ""){
            current_i ++;
            if (current_i == board_size + i - 1){
                game_finished = true;
                return true;
            }
        }
    }
    for (let i = 1; i < board_size + 1; i ++) { // vertical
        current_i = i;
        while (document.getElementById('cell'+current_i).style.backgroundColor == document.getElementById('cell'+(current_i+board_size)).style.backgroundColor 
        && document.getElementById('cell'+current_i).style.backgroundColor != ""){
            current_i += board_size;
            if (current_i == board_size**2 - board_size + i){
                game_finished = true;
                return true;
            }
        }
    }
    for (let i = 1; i < board_size**2 + 1; i += board_size + 1) { // diagonale
        if (! (document.getElementById('cell'+i).style.backgroundColor == document.getElementById('cell'+(i+board_size+1)).style.backgroundColor
        && document.getElementById('cell'+i).style.backgroundColor != "")){
            break;
        }
        if (i == board_size**2 - board_size - 1){
            game_finished = true;
            return true;
        }
    }
    for (let i = board_size; i < board_size**2; i += board_size - 1) { // anti-diagonale
        if (! (document.getElementById('cell'+i).style.backgroundColor == document.getElementById('cell'+(i+board_size-1)).style.backgroundColor
        && document.getElementById('cell'+i).style.backgroundColor != "")){
            break;
        }
        if (i == board_size**2 - 2*board_size + 2){
            game_finished = true;
            return true;
        }
    }

    return false;
}

var turn = 0;
function play(cell) {
    if (game_finished){
        return 0;
    }

    if (cell.style.backgroundColor == "") {
        document.getElementById('alert').innerHTML = "";
        if (turn == 0) {
            cell.style.backgroundColor = "#fff87d";
            turn ++;
        } else {
            cell.style.backgroundColor = "#d67dff";
            turn --;
        }
    }else{
        document.getElementById('alert').innerHTML = "Case déjà jouée";
    }

    if (finished()){
        document.getElementById('alert').innerHTML = "Partie terminée";
        return 0;
    }
}

function reset() {
    for (let i = 1; i < board_size**2 + 1; i++) {
        document.getElementById('cell'+i).style.backgroundColor = "";
    }
    document.getElementById('alert').innerHTML = "";
    game_finished = false;
    turn = 0;
}