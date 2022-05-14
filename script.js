let scorelaserrun = 500;
let scorefence = 250;
let scoreswim = 250;
let scoreride = 300;
let bouts = 35;

function boutinput(){
    //bout input
    bouts = document.getElementById("bouts").value*1;
    var victories = document.getElementById("victories").value*1;
    var defeats = bouts - victories;
    if(defeats < 0 ){
        victories = victories + defeats;
        defeats = 0
    }
    document.getElementById("victories").value = victories;
    document.getElementById("defeats").value = defeats;
    fencecalc()
}

function lasercalc(){
    // laserrun
    var mmlaserrun = document.getElementById("mm-laserrun").value*1;
    var sslaserrun = document.getElementById("ss-laserrun").value*1;
    var timelaserrun = Math.floor(60*mmlaserrun+sslaserrun);
    scorelaserrun = 1300 - timelaserrun;
    if(scorelaserrun < 0){
        scorelaserrun = 0;
    }
    document.getElementById("score-laserrun").value = scorelaserrun;
    calc()
}

function swimcalc(){
    //swim
    var mmswim = document.getElementById("mm-swim").value*1;
    var ssswim = document.getElementById("ss-swim").value*1;
    var timeswim = Math.floor((60*mmswim+ssswim)*2)/2;
    scoreswim = 550 - 2*timeswim;
    if(scoreswim < 0){
        scoreswim = 0;
    }
    document.getElementById("score-swim").value = scoreswim;
    calc()
}

function fencecalc(){
    var victories = document.getElementById("victories").value*1;
    var defeats = document.getElementById("defeats").value*1;
    var bouts = victories + defeats;
    var target = Math.round(bouts*0.7);
    var percentage = Math.round(100*victories/bouts);
    // Assign points
    var points = Math.round(150/bouts);
    if(bouts <= 60 && bouts >= 48){
        points = 3;
    }else if(bouts <= 47 && bouts >= 40){
        points = 4;
    }else if(bouts <= 39 && bouts >= 34){
        points = 5;
    }else if(bouts <= 33 && bouts >= 30){
        points = 6;
    }else if(bouts <= 29 && bouts >= 23){
        points = 7;
    }else if(bouts <= 22 && bouts >= 19){
        points = 8;
    };
    //calculate ranking score
    var rrscore = 250+(victories-target)*points;
    if(victories < 1){
        rrscore = 0;
    }
    document.getElementById("bouts").value = bouts;
    document.getElementById("percentage").textContent = "Percentage: " + percentage +"%";
    //Bonus Round
    var bonus = document.getElementById("bonus").value*2;
    if( document.getElementById("seed").checked){
        if(bonus != 0 ){
            document.getElementById("bonus").value = 1;
        }
        bonus = document.getElementById("bonus").value*4;
    }
    scorefence = rrscore + bonus;
    document.getElementById("score-fence").value = scorefence;
    calc()
}

function calc(){
    scoreride = document.getElementById("score-ride").value*1;
    var penalties = document.getElementById("penalties").value*1;
    var total = scorelaserrun + scoreswim + scorefence + scoreride - penalties;
    document.getElementById("score-total").textContent = "Total Score: " + total;

}
