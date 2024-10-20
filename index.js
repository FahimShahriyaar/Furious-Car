// App: Furious Car
// Created By: Fahim Shahriyaar
// Contact: shahriyaar.flash@gmail.com



var playing=false;
var cntrl=true;
var trials;
var action;
var score;
const currentLane=[0,0,0,0];
var step=10;
const x=$('#img0');
const y=[null,$(`#img1`),$(`#img2`),$(`#img3`)];
const z= $('#msg1');
const w=$('.window');
const audio=$('audio')[0];


$('#start').click(plaay);
$(window).keydown(function(event){

    if(x.position().left>=0 && x.position().left<100){
        currentLane[1]=1;
        currentLane[2]=0;
        currentLane[3]=0;
    }
    else if(x.position().left>=100 && x.position().left<116){
        currentLane[2]=1;
        currentLane[1]=1;
        currentLane[3]=0;
    }
    else if(x.position().left>=116 && x.position().left<202){
        currentLane[3]=0;
        currentLane[2]=1;
        currentLane[1]=0;
    }
    else if(x.position().left>=202 && x.position().left<224){
        currentLane[3]=1;
        currentLane[2]=1;
        currentLane[1]=0;
    }
    else if(x.position().left>=224 && x.position().left<=w.width()){
        currentLane[3]=1;
        currentLane[2]=0;
        currentLane[1]=0;
    }
    // z.html(`${currentLane[1]} ${currentLane[2]} ${currentLane[3]} <br> ${x.position().left}`);
    if(playing & cntrl){
        if(event.which==37 && x.position().left>Math.abs(parseInt(x.css('margin-left')))){
            x.css('left',x.position().left-step);
        }
        else if(event.which==39  && x.position().left<w.width()-Math.abs(parseInt(x.css('margin-left')))){
            x.css('left',x.position().left+step);
        }
    }
   
   

})

function plaay(){
    this.blur();
    if(!playing){
        cntrl=true;
        allclear();
        playing=true;
        trials=3;
        score=0;
        $('#start').val('end');
        displayBox();
        currentLane[2]=1;
        start();
    }
    else{
        playing=false;
        $('#start').val('Start');
        clearInterval(action);
        location.reload();
    }
}

function displayBox(){
    $('.smallbox').css('visibility','visible');
}

function start(){
    let way=Math.floor(Math.random() * 3) + 1;
    let car=Math.floor(Math.random() * 10) + 1;
    let speed=Math.floor(Math.random() * 15) + 10;
    y[way].attr('src',`assets/car${car}.png`);
    action=setInterval(()=>{
        if(y[way].position().top>w.height()){
            score++;
            $('#score span').text(score);
            clearInterval(action);
            clear();
            start();
        }
        else{
            y[way].css('top',y[way].position().top+speed);
            if(currentLane[way] && (y[way].position().top+y[way].height())>=(w.height()-x.height())){
                cntrl=false;  
                $('#imgblast').css({'left':x.position().left,'top':y[way].position().top}).show();
                audio.play();
                clearInterval(action);
                if(trials>1){
                    $('#diamond'+trials).css('visibility','hidden');
                    z.text('Crashed').show();
                    trials--;
                    setTimeout(reset,3000);
                }
                else{
                    $('#diamond'+trials).css('visibility','hidden');
                    z.text('Game Over').show();
                    playing=false;
                    $('#start').val('start');
                }
            }
        }
        
    },100);
}


function clear(){
    $('.way img').attr('src','');
    $('.way img').css('top',-70);
}

function reset(){
    cntrl=true;
    clear();
    x.css('left','50%');
    $('#imgblast').hide();
    z.hide();
    currentLane[2]=1;
    currentLane[3]=0;
    currentLane[1]=0;
    start();
}

function allclear(){
    clear();
    x.css('left','50%');
    $('#imgblast').hide();
    z.hide();
    currentLane[2]=1;
    currentLane[3]=0;
    currentLane[1]=0;
    $('#diamond1').css('visibility','visible');
    $('#diamond2').css('visibility','visible');
    $('#diamond3').css('visibility','visible');
    $('#score span').text(0);
}