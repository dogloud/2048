/**
 * need to review the action and check if using row and column is better.
 */
var canvas1 = document.getElementById("game1");
var ctx =canvas1.getContext("2d");
var step=0;
var gamewin = false;
var gameover = false;
var score =0;

var list = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

function ramdownum(){
    return Math.floor(Math.random() * 16)+1;
}


function setup(){
    ramdombox();
    ramdombox();
}


function checkxy(number){
    var brickx, bricky;
    switch (number){
        case 1:
            brickx=10;
            bricky=10;
            break;
        case 5:
            brickx =10;
            bricky=110;
            break;
        case 9:
            brickx=10;
            bricky=210;
            break;
        case 13:
            brickx = 10;
            bricky=310;
            break;
        case 2:
            brickx=110;
            bricky=10;
            break;
        case 6:
            brickx = 110;
            bricky=110;
            break;
        case 10:
            brickx=110;
            bricky=210;
            break;
        case 14:
            brickx = 110;
            bricky=310;
            break;
        case 3:
            brickx=210;
            bricky=10;
            break;
        case 7:
            brickx = 210;
            bricky=110;
            break;
        case 11:
            brickx=210;
            bricky=210;
            break;
        case 15:
            brickx = 210;
            bricky=310;
            break;
        case 4:
            brickx=310;
            bricky=10;
            break;
        case 8:
            brickx = 310;
            bricky=110;
            break;
        case 12:
            brickx=310;
            bricky=210;
            break;
        case 16:
            brickx = 310;
            bricky=310;
            break;

    }
    return {brickx, bricky};
}

function draw(number,designnum){
    console.log("list:"+list);
    let {brickx, bricky}=checkxy(number);
    console.log("brickx:"+brickx+" bricky:" +bricky+" number:"+number+" designum:"+designnum);
    //draw brick
    ctx.fillStyle = color(designnum);
    ctx.fillRect(brickx,bricky,95,95);
    //draw number
    ctx.font = "60px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(designnum, brickx+47, bricky+70);
}

function color(designnum){
    var colornum=(Math.log(designnum) / Math.log(2))-1;
    const ccolor = ["red","#FF00FF","purple","#8a2be2","#483d8b","#1e90ff","#800000","#f4a460","#40e0d0","#ff6347","#2e8b57","#6b8e23"];
    return ccolor[colornum];
}

function clean(number){
    let {brickx, bricky}=checkxy(number);
    ctx.clearRect(brickx,bricky,95,95);
}

function checkmulti(num1,num2){
    console.log("check 2 num:" + num1+"+ num2 "+num2);
    if (num1 == num2){
        return num1*num2;
    }
    return -1;
}

function ramdombox(){
    if(gameover!=false){return 0;}
    var ramdom = ramdownum();
    var ramdom2=(ramdownum() > 8)? 2:4;
    if (list[ramdom]!==0){
        ramdombox();
    } else{
        list[ramdom]=ramdom2;
        draw(ramdom,ramdom2);
    }
}

function moveable(){
    step++;
    ramdombox();
}
function movebox(action){
    if (gameover == true){
        return 0;
    }
    var r4=4;
    switch (action){
        case 1:
            while (r4>0){
            for (i=16; i>4; i--){
                if (list[i]>0 && i>4){
                    if (list[i-4]==0){
                        clean(i);
                        console.log("clean:"+i+" list number:"+list[i]);
                        list[i-4]=list[i];
                        draw(i-4,list[i]);
                        list[i]=0;
                    } else if (checkmulti(list[i-4],list[i]) >0){
                            score+=list[i];
                            clean(i);
                            list[i-4]+=list[i];
                            console.log("merge clean:"+i+" list number:"+list[i]);
                            draw(i-4,list[i-4]);
                            list[i]=0;
                    }
                }
            }
            r4--;
        }
            moveable();
            break;
        case 2:
            while (r4>0){
            for (i=0; i<=16; i++){
                console.log("target:"+list[i+4]);
                if (list[i]>0 && i<=13){
                    if (list[i+4] == 0){
                        clean(i);
                        console.log("clean:"+i+" list number:"+list[i]);
                        list[i+4]=list[i];
                        draw(i+4,list[i]);
                        list[i]=0;
                    }else{
                        if (checkmulti(list[i+4],list[i]) >0){
                            score+=list[i];
                            clean(i);
                            console.log("merge clean:"+i+" list number:"+list[i]);
                            list[i+4]+=list[i];
                            draw(i+4,list[i+4]);
                            list[i]=0;
                        }
                    }
                }
            }
            r4--;
        }
        moveable();
            break;
        case 3:
            while (r4>0){
                for (i=16; i>0; i--){
                    if (list[i]>0 && i!=1 && i!=5 && i!=9 &&i!=13){
                        if (list[i-1]==0){
                            clean(i);
                            console.log("clean:"+i+" list number:"+list[i]);
                            list[i-1]=list[i];
                            draw(i-1,list[i]);
                            list[i]=0;
                        }else{
                            if (checkmulti(list[i-1],list[i]) >0){
                                score+=list[i];
                                clean(i);
                                console.log("merge clean:"+i+" list number:"+list[i]);
                                list[i-1]+=list[i];
                                draw(i-1,list[i-1]);
                                list[i]=0;
                            }
                        }
                    }
                }
                r4--;
            }
            moveable();
                break;
        case 4:
            while(r4>0){
                    for (i=16; i>0; i--){
                        if (list[i]>0 && i!=4 && i!=8 && i!=12 &&i!=16){
                            if (list[i+1]==0){
                                clean(i);
                                console.log("clean:"+i+" list number:"+list[i]);
                                list[i+1]=list[i];
                                draw(i+1,list[i]);
                                list[i]=0;
                            } else {
                                if (checkmulti(list[i+1],list[i]) >0){
                                    score+=list[i];
                                    clean(i);
                                    console.log("merge clean:"+i+" list number:"+list[i]);
                                    list[i+1]+=list[i];
                                    draw(i+1,list[i+1]);
                                    list[i]=0;
                                }
                            }
                        }
                    }
                    r4--;
                }
                moveable();
                    break;
    }
    checkgameover();
    document.getElementById("score").innerHTML=score;
    document.getElementById("sstep").innerHTML=step;
}

setup();

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        console.log("up press");
        movebox(1);
    }
    else if (e.keyCode == '40') {
        console.log("down press");
        movebox(2);
    }
    else if (e.keyCode == '37') {
        console.log("left press");
        movebox(3);
    }
    else if (e.keyCode == '39') {
        console.log("right press");
        movebox(4);
    }
}

function checkgameover(){
    if (step>=16){
        var countzero=0;
        for(i=1;i<=16;i++){
            if (list[i]>=2048){
                gamewin=true;
                drawgamewin();
                gameover =true;

            }else if (list[i]>0){
                countzero++;
            }
        }
        if(countzero>=16){
            gameover =true;
            drawgameover();
        }
    }
}

function drawgameover(){
    ctx.font = "100px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("OVER", 200, 200);
}

function drawgamewin(){
    ctx.font = "100px Arial";
    ctx.fillStyle = "green";
    ctx.textAlign = "center";
    ctx.fillText("WIN", 200, 200);
}
