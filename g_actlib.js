



  
  var vecAct = [];
  var mapAct = {};
  var curId = 1;
  var playerId = -1;
  
  var vecBull = [];
  
  //todo -- how to del from mapact safely ?
  function clearAct()
  {
    playerId = -1;
    curId = 0;
    vecAct = [];
    mapAct = {};
    //todo -- clear array
  }//resetact
  
  function getAct(id)
  {
    a = mapAct[id];
    if (a==undefined){ a = 0; }
    return a;
  }//getact 
  
  
  function getEmptAct()
  {
    var a;
        a = { cx:0, cy:0, cz:0, 
          vx:0, vy:0, vz:0,
          ang:0,
          pitch:0,
          id:-1,
          hp:10,
          team:0,
          spec:0,   //actor type 
          crad:8,  //collison rad
          size:16, //sprsize
          dmg:5,
          reload:0,
          yoff:0,
          walkFrame:0,
          sprName:"nukeball",
          //xrad:8, yrad:8, zrad:8, 
          dead:false 
        };
     return a;
  }//getemptact
  
  
  function addAct()
  {
    var a;
    a = getEmptAct();
    a.id = curId;
    curId +=1;
    mapAct[a.id] = a;    
    vecAct.push(a);    
    return a;
  }//addact
  
  
  function addBull()
  {    
    var a;
     a = getEmptAct();
     a.id = curId;
     curId +=1;
     vecBull.push(a);    
    return a;
  }//addbull
  
  
  function cleanAct(vec)
  {
   // return;
    var i; var num; var a; var k; var nk;
    num = vec.length | 0; 
    for (i=0;i<num;i+=1)
    {
      a = vec[i];
      if (a.dead)
      {
        for (k=i;k<num;k+=1)
        { vec[k] = vec[k+1]; }
        vec.pop();
        i -= 1; num -=1;   
        delete mapAct[a.id];
        continue;        
      }
    }//nexti    
   // console.log("cleanact ",gt," vec" ,vec);
   //console.log("cleanact ",gt," map " ,mapAct);
  }//cleanact 
  
  
  function updateAct(vec)
  {
    var i; var num; var a;
    var bclean = false;
    num = vec.length | 0; 
    
    for (i=0; i < num;i+=1)
    {
      a = vec[i];
      if (a.dead){ bclean=true; continue;}
      if (a.spec == 1) { upPlayer(a); continue; }
      if (a.spec == 3) { upMonst(a); continue; }
      if (a.spec == 99) { upBlock(a); continue; }
    }//nexti 
    if (bclean) { cleanAct(vec); }
  }//updateact
  

  
  function drawAct(vec)
  {
    var i; var num; var a;
    num = vec.length | 0; 
    
    setSkinClamp();
    drawTri = drawTriMask;
    for (i=0; i < num;i+=1)
    {
      a = vec[i];
       if (isVis3(a.cx, a.cz)==false) { continue; }
       
      if (a.spec == 99) //block
      {
        drawTri = drawTriSkin;
        drawBlock(1, 0, a.side, a.cx, a.cz, cw);
        continue;
      }
       
      if (a.spec == 3) //monster 
      { 

        cullTri = false;
       drawTri = drawTriMaskShad;
     //drawSprShad("mutant0", a.cx, 1, a.cz, a.size*0.5, gt*0.01);
        drawSprShad(a.sprName, a.cx, 1, a.cz, a.size*0.5, camYaw);
        
        
       drawTri = drawTriMask;
        drawSprAdv(a.sprName, a.cx, a.cy, a.cz, a.size,a.size, 0.0);

        drawSprAdv("wspark1", a.cx+Math.cos(a.ang)*15, 16, a.cz+Math.sin(a.ang)*15, 8,8, 0.0);
        
        
        continue;
      }
    }//nexti   
    drawTri = drawTriSkin;
  }//drawact
 

  function getMagx(ax,ay)
  {  if(ax<0){ax=-ax;} if (ay<0){ay=-ay;}  if (ax>ay){return ax; } return ay;  }
 
  function getMag3(ax, ay, az)
  { return Math.sqrt(ax*ax + ay*ay + az*az);  }
  
  function checkBullHit(m, vec)
  {
    var i; var num; var a;
    num = vec.length;
    for (i=0;i<num;i+=1)
    {
      a = vec[i];
      if (m == a) { continue; }
      if (a.id == m.id){continue; }
      if (a.team == m.team){continue;}     
      if (a.spec == 99) 
      {
        if ( (m.cx+m.crad<a.cx) || (m.cx-m.crad>a.cx+cw)  || (m.cz+m.crad<a.cz) || (m.cz-m.crad>a.cz+ch))
        { continue; }
        return a;
      } ///endif 
    
      if (getMagx(m.cx-a.cx, m.cz-a.cz) > a.crad+m.crad){continue; }      
      if (getMag3(m.cx-a.cx, m.cy-a.cy, m.cz-a.cz) > a.crad+m.crad){continue; }
      
      return a;
    }//nexti
    return 0;
  }//checkbullhit 
  
  
  function bullWallHit(a)
  {
    var p;   
    /*
      p = addPart();
      p.cx = a.cx; p.cy=a.cy+a.yoff; p.cz=a.cz;
      p.grow = -1.50;
      p.sprName = a.sprName;
   */
       
  
     p = addPart();
      p.cx = a.cx; p.cy=a.cy+a.yoff; p.cz=a.cz;
      
      p.size = 16;
      p.curFrame = 0.0;
      p.animName = "explo";
      p.hp=300;
      p.animSpeed = 0.25;
      
  }//wallhit 
  
  function blastBlob(blob)
  {
    var i; var p;
    
    playSnd3("deco", 1.0, blob.cx, blob.cy, blob.cz);
    
    p = addPart();
        p.cx = blob.cx;
        p.cy = 12;
        p.cz = blob.cz;
        p.vy = 0.25;
        p.size = 24;
        p.curFrame = 0.0;
        p.animName = "nuke";
        p.hp=300;
        p.animSpeed = 0.25;
 
    for (i=0;i<16;i+=1)
    {
      p = addPart();
        p.cx = blob.cx;
        p.cy = blob.cy;
        p.cz = blob.cz;
        //p.grow = -0.250;
        p.size = 7;
        p.vx = fxRand2()*2;
        p.vy = fxRand()*2;
        p.vz = fxRand2()*2; 
        p.hp = fxRand()*80 + 80; 
        p.crad = 3.0;
        p.cdot = 2.0;
        p.dec = 0.95;
        p.grav = -0.1;
    }//nexti 
    
  }//blastblob 

  
  function pickupFx(ax, ay, az)
  {
    var i; var p;
    
    p = addPart();
      p.cx = ax;
      p.cy = 12;
      p.cz = az;
      
      p.size = 24;
      p.curFrame = 0.0;
      p.animName = "wspark";
      p.hp=300;
      p.animSpeed = 0.25;
  }//pickupfx
  
  
  function blastAct(ax, ay, az)
  {
    var i; var p;
    
    playSnd3("deco", 1.0, ax,ay,az);
    
    p = addPart();
        p.cx = ax;
        p.cy = 12;
        p.cz = az;
        p.vy = 0.125;
        p.size = 24;
        p.curFrame = 0.0;
        p.animName = "nuke";
        p.hp=300;
        p.animSpeed = 0.25;
        
    for (i=0;i<32;i+=1)
    {
      p = addPart();
        p.cx = ax;
        p.cy = ay;
        p.cz = az;
        //p.grow = -0.250;
        p.size = 6;       
        p.vx = fxRand2()*6;
        p.vy = fxRand2()*2+1;
        p.vz = fxRand2()*6;
        p.spin = fxRand2()*0.1;
        p.hp = fxRand()*80 + 80;
        p.crad = 2.0;
        p.cdot = 2.0;
        p.dec = 0.95;
        p.grav = -0.1;
    }//nexti 
    
    
  }//blastact 

  
  function pushWall(ax, ay, blob)
  {
    var tx, ty;
    tx = (ax/cw)|0;
    ty = (ay/ch)|0;
    
    var a;
    a = addAct();
      a.spec = 99;
        a.size = 24;
        a.team = 3;
        a.cx = tx*cw;
        a.cz = ty*ch;
        a.cy = 16;
        a.side = getSideId(tx,ty);
        a.vx = blob.vx;
        a.vz = blob.vz;
        a.reload = blob.val;
        a.hp = 99999.0; //just in case 
    
    setTile(tx,ty, 0);
    updateFlag3(tx,ty);
    
  }//remwall
  

    //upbull  bullup
  function updateBull(vec)
  {
    var i; var num; var a; var b; var p;
    var ax, az;
    var blob;
    var bclean = false;  
    num = vec.length | 0; 
    
    for (i=0; i < num;i+=1)
    {
      a = vec[i];
       if (a.dead){ bclean=true; continue;}
      

      
      ax = a.cx + a.vx*2;
      az = a.cz + a.vz*2;
      blob = getBlob3(ax,az)
      if (blob != undefined)
      {
        if (blob.spec == 1)
        {
          bullWallHit(a); 
          blob.hp -= a.dmg;
          if (blob.hp<=0)  
          { blastBlob(blob);  
            delBlob3(ax,az);
          }//endif
          a.dead=true;
          continue;
        }//endif3      
        if (blob.spec == 15)
        {
          pushWall(ax,az, blob)  
          delBlob3(ax,az);          
        }//endif3
      }//endif
      
           
      if (isWall(a.cx+a.vx, a.cy+a.vy, a.cz+a.vz)||a.cy>28||a.cy<5)  
      { 
        bullWallHit(a); 
        a.dead=true; 
        continue; 
      }//ednfi 
      
      //second wall check (for doors)
       if ( mapMove(a, 8.0, 1.0, false) )
       { 
        bullWallHit(a); 
        a.dead=true; 
        
          if (lastBlob != 0)
          {
            blob = lastBlob;
            if (blob.glass > 0)
            {
              blob.hp -= a.dmg;
              if (blob.hp<=0)
              {
                blob.hp = 10.0; 
                blob.glass += 1;
                //blob.spr = "glass"+blob.glass;
                setBlobSpr(blob, "glass"+blob.glass);
                
                if (blob.glass >= 4) 
                { blastBlob(blob);   blob.nocol = 1; }
                //if (vecSpr[blob.spr]==undefined)
                //{ delBlob3(ax,az); }
              }
            }
            
          }//endif3
        
        continue; 
       }//endif 


 
      b = checkBullHit(a, vecAct);
      if (b!= 0)
      {
        bullWallHit(a); 
        //block hit hack
        if (b.spec == 99) { a.dead=true; continue;}
        //console.log("actor hit ", b.id);
        b.hp -= a.dmg; 
        if (b.hp<=0){ blastAct(b.cx,b.cy,b.cz); b.dead=true; }
        a.dead=true;   
        continue;
      }//endif
      
      
      a.cx += a.vx;
      a.cy += a.vy;
      a.cz += a.vz;
      
      a.yoff *= 0.9;
      
      
      /*
          p = addPart();
            p.cx = a.cx; p.cy=a.cy+a.yoff; p.cz=a.cz;
            p.grow = -1.50;
            p.sprName = a.sprName;
            */
            
       p = addPart();
        p.cx = a.cx; p.cy=a.cy+a.yoff; p.cz=a.cz;
       // p.grow = -0.250;
        p.size = 4;
        p.cx += fxRand2() * 8;
        p.cy += fxRand2() * 8;
        p.cz += fxRand2() * 8;
        p.ang = fxRand() * 6.28;
        p.hp = fxRand()*50+10;
        p.grav = -0.2;
        p.crad = 2;
      
      
      a.hp -= 1.0;
      if (a.hp <= 0) { a.dead=true;}

    }//nexti 
      if (bclean) { cleanAct(vec); }
  }//updateact
  
  
  
  function drawBull(vec)
  {
    var i; var num; var a;
    num = vec.length | 0; 
    //console.log("drawbull ", num);
    setSkinClamp();
    drawTri = drawTriMask;
    for (i=0; i < num;i+=1)
    {
      a = vec[i]; 
      drawSprAdv(a.sprName, a.cx, a.cy+a.yoff, a.cz, a.size,a.size, a.ang);
    }//nexti   
    drawTri = drawTriSkin;
  }//drawact
  
  
 
  function monstMove(m, vec, bt)
  {
    var i; var num; var a;
    var nx, nz; var d; var dot;
    var ret;
    ret = false;
    num = vec.length;
    for (i=0;i<num;i+=1)
    {
      a = vec[i];
      if (m == a) { continue; }  //self 
      if (a.spec >= 99) { continue; } //block 
      if (a.id == m.id){continue; }  //self 2x
      if (getMagx(m.cx-a.cx, m.cz-a.cz) > a.crad+m.crad){continue; }
      nx = a.cx-m.cx; nz = a.cz-m.cz;
      d = getMag(nx,nz);
      
       if (d<=0.0){d=0.01;}
       
       nx /= d;         nz /= d;
         
       dot = m.vz * nz + m.vx * nx;       
       
       if (dot > 0.0)
       {  
         dot*= bt;
         //if (bounce) { dot *= 2.0f; } 
         m.vx -=  nx * dot; 
         m.vz -=  nz * dot;       
         ret = true;
       }//endif
    }//nexti
    return ret;
  }//monstmove 
  
  
  function upBlock(a)
  {
    if (a.reload > 0)
    {
      a.reload -= 1;
      if (a.reload <= 0)
      {
        var ax, az;
        ax = a.cx+cw*0.5;
        az = a.cz+ch*0.5;
         setTile3(ax,az, 1);
         setSideId3(ax,az, a.side);
        a.dead=true;
        return;
      }
    }
    
    a.cx += a.vx;
    a.cz += a.vz;
    
    var vec; var num; var i; var b;
    var ix, iz; var nx, nz;
    vec = vecAct;
    num = vec.length;
    for (i=0;i<num;i+=1)
    {
      b = vec[i];
      if (b == a) { continue; }
      if (b.spec  > 3) { continue; }
      
       
         if (b.cx < a.cx) {ix = a.cx; }
         else if (b.cx > a.cx+cw)  { ix = a.cx + cw; }
         else {ix = b.cx;}
         
         if (b.cz < a.cz) {iz = a.cz; }
         else if (b.cz > a.cz+ch)  { iz = a.cz + ch; }
         else {iz = b.cz;}
         
       //if (b.id == playerId) { console.log("pdist1 ", gt, ix,iz); }
       
         nx = ix-b.cx; nz = iz-b.cz;
         d = getMag(nx,nz);
         //if (b.id == playerId)  { console.log("pdist ", gt, d, nx,nz, ix,iz); }
         if (d<=0.0){d=0.01;}
         if (d > b.crad) { continue; }
         nx /= d; 
         nz /= d;
         d = b.crad - d;
           b.cx -= nx * d;
           b.cz -= nz * d;
         
    }//nexti
    
  }//upmonst 
  
  function upMonst(a)
  {
    
    a.vx = Math.cos(a.ang) * 0.5;
    a.vz = Math.sin(a.ang) * 0.5;
    
    a.sprName = ("mutant"+ ((((gt+a.id)/5)|0)%3));
    //a.sprName = "cobra0";
   // console.log("a.sprname ", a.sprName, gt);
    
    //a.ang += 0.01;
    
    var wallhit = 0;
    
    if (monstMove(a, vecAct,2.0)) { wallhit = 1; }
    if (mapMove(a, 15.0,2.0,true)) { wallhit = 1; }
    
    if (wallhit > 0)
    { a.ang = Math.atan2(a.vz, a.vx);  }
    
    a.cx += a.vx;
    a.cz += a.vz;
    
  }//upmonst 
  
  
  

  var pori = {x:0, y:0, z:0, w:1};
  var aimMat =  [1, 0, 0, 0,   0, 1, 0, 0,   0, 0, 1, 0,   0, 0, 0, 1]; 
    
  function upPlayer(a)
  {
    var ms;  var ta; var ts;
    ts = 0.05;
    ms = 2.5;
    ta = a.ang;
    
    ms = 0.50;
    ms = 0.60;
    a.vx *= ms;
    a.vz *= ms;

     if (mouseLook)
     {
        a.ang   += -mvx * 0.005;
        a.pitch +=  mvy * 0.005;
        if (a.pitch<-1.5){a.pitch = -1.5; }
        if (a.pitch>1.5){a.pitch = 1.5; }
     }//endif
    
    var strafe = false;
    strafe = keyFire2;
    if (mouseLook) { strafe = true; }
    //todo -- if mouselook strafe = true 

    
      ms = 0.65;
      //ms = 0.75;
    
     ta = a.ang; ta +=  1.57;
     if ((strafe&&keyLeft) || keyStrafeLeft)   { a.vx += Math.cos(ta)*ms; a.vz+=Math.sin(ta)*ms; }
     else  if (keyLeft) { a.ang -= ts; }
     
     ta = a.ang; ta += -1.57;
     if ((strafe&&keyRight) || keyStrafeRight) { a.vx += Math.cos(ta)*ms; a.vz+=Math.sin(ta)*ms; }    
     else if (keyRight) { a.ang += ts; }

     
    ta = a.ang;
    if (keyUp)   { a.vx += Math.cos(ta)*-ms; a.vz+=Math.sin(ta)*-ms; }
    if (keyDown) { a.vx += Math.cos(ta)*ms;  a.vz+=Math.sin(ta)*ms; }

      /*
      if (debugMode)
      {
       if (isKdown(key_r)) { a.cy += 3; }
       if (isKdown(key_f)) { a.cy += -3; }
      }//endifdeb
      */
    
    a.walkFrame += getMag(a.vx, a.vz);
    
    //pickup
    var blob;
    blob = getBlob3(a.cx+a.vx, a.cz+a.vz);
    if (blob!=undefined)
    {
      if (blob.spec == 3)
      {
        playSnd("pick",1.0);
        delBlob3(a.cx+a.vx, a.cz+a.vz);
        pickupFx(blob.cx, blob.cy, blob.cz);
        //blastBlob(blob);
      }//endif3       
    }//endif 
    
    
    //firing 
    if ((keyFire || mbutton == 1) && a.reload < gt)
    {
      a.reload = gt + 8;
          
      resetQuat(pori);
          quatRotAxis(pori, -a.ang+1.57, 1);
          quatRotAxis(pori, a.pitch, 0);
          quatSetVec(pori, aimMat);
          
      playSnd("fire",1.0);
      b = addBull();
       b.cx = a.cx;
       b.cy = a.cy;
       b.cz = a.cz;
       b.team = a.team;
       
       b.yoff = -8;
       
       //b.vx = Math.cos(a.ang) * -6;
       //b.vz = Math.sin(a.ang) * -6;
       
       b.vx = aimMat[8] * -6;
       b.vy = aimMat[9] * -6;
       b.vz = aimMat[10] * -6;
       
       b.hp = 30;
       //console.log("firebull ", b.id);
    }//endif 
    
    
    
    //make player collision more accurate by checking velocity more times 
      /*
      var d;
      d = getDoor3(a.cx+Math.cos(a.ang)*19, a.cz+Math.sin(a.ang)*19);
      if (d!=0 && d != undefined)
      {
        d.state = 1;      
      }//endif
      */
    
    var i;
    for (i=0;i<8;i+=1)
    {
     monstMove(a, vecAct,1.0);
     mapMove(a, 15.0,1.0, true);
    }//nexti 
    
    
    a.cx += a.vx;
    a.cz += a.vz;
    
    
  }//upplayer
  
  
  function addEnt(tx, ty, spr, trig)
  {
    var b; var a; 
    var ax, az;
    ax = tx*cw + cw*0.5;
    az = ty*ch + ch*0.5;
    
    if (spr == "start")
    {
        a = addAct();
          a.spec = 1;
          a.cy = 16;  a.cx = ax;  a.cz = az;
          a.team = 1;
          a.hp = 100;
          playerId = a.id;
       return;
    }//endif
    
    if (spr == "monst_mutant" || spr == "monst_wasp")
    {
      a = addAct();
        a.spec = 3;
        a.size = 24;
        a.team = 3;
        a.sprName = "mutant0";
        a.cx = ax;
        a.cz = az;
        a.cy = 12;
        a.ang = getRand()*6.28;
         
      return;
    }//endif
    
    if (spr.indexOf("item") > -1) // == "item_bonus")
    {
      setTile(tx,ty, 8);
       updateFlag3(tx, ty);
       b = setBlob(tx, ty, "i_bonus");
       b.spec = 3;
       return;
    }//endif
    
    
      
    if (spr.indexOf("glass") > -1)
    {
      
      if (spr.indexOf("2") > -1) {  setTile(tx, ty, 3); }
      else {  setTile(tx, ty, 5); }
     
      updateFlag3(tx, ty);
      
      b = setBlob(tx, ty, "glass");
      b.door = 0;
      b.glass = 1;
      return;
    }//endif
    
    
     if (spr.indexOf("door") > -1)
     {
       //tood -- take sprname out of text 
       var str;
       var doorspec;
       doorspec = 1;
       str = "door";
       //str = "door_surp";
       if (spr.indexOf("longud") > -1)
       { str = "door_longud"; doorspec = 0; }
     
       if (spr.indexOf("2") > -1) 
       {  addDoor(tx, ty, true, doorspec, str); }
       else {  addDoor(tx, ty, false, doorspec, str); }
       
       return;
     }//endif 
    
    
    if (spr.indexOf("trig_push") > -1)
    {
        b = setBlob(tx, ty, "sparkw");
        b.spec = 15;
        b.trig = trig;
        b.val = 64;
        
        if (spr.indexOf("up") > -1) { b.vz = -0.5; }
        else if (spr.indexOf("down") > -1) { b.vz = 0.5; }
        else if (spr.indexOf("left") > -1) { b.vx = -0.5; }
        else if (spr.indexOf("right") > -1) { b.vx = 0.5; }
        
        if (spr.indexOf("2") > -1) { b.val = 64+64;  }
      
      return;
    }//endif
    
     setTile(tx,ty, 9);
     updateFlag3(tx, ty);
     b = setBlob(tx, ty, "d_bin");
     b.spec = 1;
     
     return;
    
  }//addent
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  