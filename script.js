let scorelaserrun = 0;
let scorefence = 0;
let scoreswim = 0;
let scoreride = 0;
let bouts = 35;
let swimconst = 550;

function ridereverse(){
    scoreride = document.getElementById("score-ride").value*1;
    if(scoreride <= 0){
        scoreride = 0;
    }else if(scoreride >= 300){
        scoreride = 300;
    }
    var knockdown = document.getElementById("knockdown").value*7;
    var disobedience = document.getElementById("disobedience").value*10;
    var timefaults =  300 - scoreride - knockdown - disobedience;
    if(timefaults <= 0){
        timefaults = 0;
        scoreride = 300 - knockdown - disobedience;
        document.getElementById("score-ride").value = scoreride;
    }
    document.getElementById("timefaults").value = timefaults;
    calc()
}

function fencereverse(){
    //Check Number of bouts
    bouts = document.getElementById("bouts").value*1;
    //Autofill if necessary
    if(bouts<=0){
        bouts = 19;
        document.getElementById("bouts").value = bouts;
    }
    //deduct bonus points
    var bonus = document.getElementById("bonus").value*2;
    if( document.getElementById("seed").checked){
        if(bonus != 0 ){
            document.getElementById("bonus").value = 1;
        }
        bonus = document.getElementById("bonus").value*4;
    }
    //calculate ranking round hits
    var rrscore = document.getElementById("score-fence").value-bonus;
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
    var target = Math.round(bouts*0.7);
    var boutdif = Math.round((rrscore-250)/points);
    var bouttarget = target+boutdif;
    var max = (bouts-target)*points+250;
    var min = 250-(target-1)*points;
    if(rrscore <= -bonus){
        document.getElementById("score-fence").value = 0+bonus;
        document.getElementById("victories").value = 0;
        document.getElementById("defeats").value = bouts;
    }else if(rrscore <= min){
        document.getElementById("score-fence").value = min+bonus;
        document.getElementById("victories").value = 1;
        document.getElementById("defeats").value = bouts-1;
    }else if(rrscore >= max){
        document.getElementById("score-fence").value = max+bonus;
        document.getElementById("victories").value = bouts;
        document.getElementById("defeats").value = 0;
    }else{
        document.getElementById("score-fence").value = bonus+boutdif*points+250;
        document.getElementById("victories").value = bouttarget;
        document.getElementById("defeats").value = bouts-bouttarget;
    }
    var victories = document.getElementById("victories").value*1;
    var percentage = Math.round(100*victories/bouts);
    document.getElementById("percentage").textContent = "Percentage: " + percentage +"%";
    calc()
}
function reverselaserrun(){
    var goallaserrun = document.getElementById("laserrun-distance").value
    scorelaserrun = document.getElementById("score-laserrun").value*1;
    if(goallaserrun == "3000m"){
        laserrunconst = 1300;
    }else if(goallaserrun == "2400m"){
        laserrunconst = 1130;
    }else if(goallaserrun == "1800"){
        laserrunconst = 960;
    }else if(goallaserrun == "900m"){
        laserrunconst = 820;
    }else if(goallaserrun == "600m"){
        laserrunconst = 740;
    }
    var timelaserrun = -(scorelaserrun-laserrunconst);
    if(scorelaserrun >= laserrunconst){
        timelaserrun = 0;
        document.getElementById("score-laserrun").value = laserrunconst;
    }
    var mmlaserrun = Math.floor(timelaserrun/60);
    var sslaserrun = timelaserrun % 60;
    document.getElementById("mm-laserrun").value = mmlaserrun;
    document.getElementById("ss-laserrun").value = sslaserrun;
    calc()
}

function reverseswim(){
    var goalswim = document.getElementById("swim-distance").value
    scoreswim = document.getElementById("score-swim").value*1;
    if(goalswim == "200m"){
        swimconst = 550;
    }else if(goalswim == "100m"){
        swimconst = 410;
    }else if(goalswim == "50m"){
        swimconst = 340;
    }
    var timeswim = -(scoreswim-swimconst)/2;
    if(scoreswim >= swimconst){
        timeswim = 0;
        document.getElementById("score-swim").value = swimconst;
    }
    var mmswim = Math.floor(timeswim/60);
    var ssswim = timeswim % 60;
    document.getElementById("mm-swim").value = mmswim;
    document.getElementById("ss-swim").value = ssswim;
    calc()
}
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
    calc()
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
    var goalswim = document.getElementById("swim-distance").value
    if(goalswim == "200m"){
        swimconst = 550;
    }else if(goalswim == "100m"){
        swimconst = 410;
    }else if(goalswim == "50m"){
        swimconst = 340;
    }
    var mmswim = document.getElementById("mm-swim").value*1;
    var ssswim = document.getElementById("ss-swim").value*1;
    var timeswim = Math.floor((60*mmswim+ssswim)*2)/2;
    scoreswim = swimconst - 2*timeswim;
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
    if(bouts<=0){
        bouts = 19;
        document.getElementById("bouts").value = bouts;
    }
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
function ridecalc(){
    var knockdown = document.getElementById("knockdown").value*7;
    var disobedience = document.getElementById("disobedience").value*10;
    var timefaults = document.getElementById("timefaults").value;
    scoreride = 300 - knockdown - disobedience - timefaults;
    if(scoreride <= 0){
        scoreride = 0;
    }
    document.getElementById("score-ride").value = scoreride;
    calc()
}
function calc(){
    
    var penalties = document.getElementById("penalties").value*1;
    var total = scorelaserrun + scoreswim + scorefence + scoreride - penalties;
    document.getElementById("score-total").textContent = "Total Score: " + total;

}
