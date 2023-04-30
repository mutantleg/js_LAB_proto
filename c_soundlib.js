

 //there doesnt seem to be default panning .. making 3D sounds tricky 
 //(it seems every browser has a different way to do it .. nice)

 var vecSnd = {};
  
 var curMus;
 var mastVol = 1.0;
 var sndVol = 1.0;
 var musVol = 0.25;
 var muteVol = 1.0; // 0.0 to mute 
 
 //listener pos 
 var listx = 0.0;
 var listy = 0.0;
 var listz = 0.0;
 var listDist = 512.0;
 
 function setListen(ax,ay,az)
 { listx=ax;listy=ay;listz=az; }
 
 function resetVol()
 {
   mastVol = 1.0;
   sndVol = 1.0;
   musVol = 0.25;

 }//resetvol
 
 function pauseAllSnd()
 {
  // console.log("vecsnd ", vecSnd); 
   var a;
   for (var i in vecSnd) {
    //console.log("vecsnd i ", i, vecSnd[i]);
    a = vecSnd[i];
    a.pause();
   }//nexti 
 }//pauseall 
 
 function resumeAllSnd()
 {
   /*
   for (var i in vecSnd) {
    a = vecSnd[i];
    if (a.paused) //not a good indicator 
    { a.play(); }
   }//nexti */
   if (curMus != undefined)
   { curMus.play(); }
   
 }//resumeallsnd 
 
 function loadSound(srcName, sndName, npool)
 {
  var aud =  new Audio(srcName);
   aud.autoplay = false; 
   vecSnd[sndName] = aud;   
   
   var i; var num;
   num = npool
   if (num == undefined) { return; }
   if (num > 3) { num = 3;}
   for (i=0;i<num;i+=1)
   {
    var a; a = new Audio(srcName);
    vecSnd[sndName+"_alt"+i] = a;
   }//nexti 
 }//loadsound 
 
 
 function getSnd(sndName)
 {
   var a;    var i; 
   a = vecSnd[sndName];
   if (a==undefined) { return undefined; }
   if (a.currentTime <= 0 || a.paused) { return a; }
   for (i=0;i<3;i+=1)
   {
    a = vecSnd[sndName+"_alt"+i];
      if (a == undefined) { continue; }    
     if (a.currentTime <= 0 || a.paused) { return a; }     
   }//nexti 
   a = vecSnd[sndName];
   return a;
 }//getsnd
 
 function playSnd(sndName, vol)
 {
   var a;
   //a = vecSnd[sndName];
   a = getSnd(sndName);
   if (a==undefined) { return; }
   if (muteVol < 1) { return; }
    a.loop = false;
    a.volume = vol * mastVol * sndVol * muteVol;
    if (a.paused) { a.play(); }
    else { a.currentTime = 0; }
 }//playsound
 
 
 function sndMag3(ax,ay,az)
 { return Math.sqrt(ax*ax+ay*ay+az*az); }
 
 function playSnd3(sndName, vol, ax, ay, az)
 {
   var a;
  // a = vecSnd[sndName];
   a = getSnd(sndName);
   if (a==undefined) { return; }
   if (muteVol < 1) { return; }
   
   var d;
   d = sndMag3(listx-ax, listy-ay, listz-az);
   d = 1.0 - ( d / listDist);
    if (d < 0.0) { d = 0.0; }
    if (d > 1.0) { d = 1.0; }
    if (d <= 0.0) { return; }
   
   vol *= d;
   
   
   a.loop = false;
   a.volume = vol * mastVol * sndVol * muteVol;
   if (a.paused) { a.play(); }
   else { a.currentTime = 0; }
 }//playsnd3
 
 
 function recalMusVol()
 {
   if (curMus == undefined) { return; }
   curMus.volume = 1.0 * mastVol * musVol * muteVol;
    
 }//recalmus 
 function playMus(sndName)
 {
   var a;
   a = vecSnd[sndName];
   if (a==undefined) { return; }
   
   if (curMus != undefined)
   { curMus.stop(); }
   curMus = a; 
   
   a.loop = true;
   a.volume = 1.0 * mastVol * musVol * muteVol;
   a.play();
 }//playmus 









 

