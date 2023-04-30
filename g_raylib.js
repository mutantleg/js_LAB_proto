
  var mw = 32;
  var mh = 32;
  var cw = 32; 
  var ch = 32;
  //argh .. need an array for flags and such 
  var vecGrid = new Uint8Array(mw*mh);
  var vecFlag = new Uint8Array(mw*mh);
  var vecSide = new Uint8Array(mw*mh*6);
  var vecBlob = [];
  
  

  function getBlob(ax, ay)
  {
    ax|=0; ay|=0;
    if (ax<0||ay<0||ax>=mw||ay>=mh){return undefined;}
    return vecBlob[ax+(ay*mw)];
  }//getblob
  
  function getBlob3(wx, wz)
  {
    wx = (wx/cw)|0;
    wz = (wz/ch)|0;
    return getBlob(wx,wz);     
  }//getblob3
  
  function delBlob(ax, ay)
  {
    ax|=0; ay|=0;
    if (ax<0||ay<0||ax>=mw||ay>=mh){return;}
    vecBlob[ax+(ay*mw)] = undefined;
    setTile(ax,ay, 0);
    updateFlag3(ax, ay);
  }//delblob 
  
  function delBlob3(wx, wz)
  {
    wx = (wx/cw)|0;
    wz = (wz/ch)|0;
    delBlob(wx,wz);        
  }//delblob3 
  
  
  function setBlobSpr(blob, sprname)
  {
    var s;
    s = vecSpr[sprname];
    if (s == undefined) { return; }
    blob.u0 = s.u0;
    blob.v0 = s.v0;
    blob.u1 = s.u1;
    blob.v1 = s.v1;
  }//blobspr
  
  
  function setBlob(ax, ay, sprname)
  {
    var s;
    s = vecSpr[sprname];
    if (s == undefined) { return; }
    var blob;
    blob = {   skin:"spr21", 
               spr:sprname,
               u0:s.u0, 
               v0:s.v0,
               u1:s.u1, 
               v1:s.v1,
               nocol:0,
               hp:10,
               spec:0,
               door:0,
               cx:((ax*cw)+cw*0.5),
               cy:16.0,
               cz:((ay*ch)+ch*0.5),
               tx:ax,
               ty:ay,
               trig:0,
               vx:0,
               vz:0,
               sideDoor:0,
               val:0,
               glass:0
             };
        
    ax|=0; ay|=0;
    if (ax<0||ay<0||ax>=mw||ay>=mh){return;}
    vecBlob[ax+(ay*mw)] = blob;
    
    return blob;
  }//setblob
  
  
  
  function getTile(ax, ay)
  {
    ax|=0; ay|=0;
    if (ax<0||ay<0||ax>=mw||ay>=mh){return 1;}
    return vecGrid[ax+(ay*mw)];
  }//gettile
  
  function getSideId(ax, ay)
  {
    ax|=0; ay|=0;
    if (ax<0||ay<0||ax>=mw||ay>=mh){return 0;}
    return (ax*6)+(ay*(mw*6));
  }//getsideid 
  
  
  function setSideId(ax, ay, side)
  {
    var i; var k;
    i = getSideId(ax, ay);
    for (k=0;k<6;k+=1)
    { vecSide[i+k] = vecSide[side+k]; }
  }//setsideid
  
  function setSideId3(wx, wz, side)
  {
    
    wx = (wx/cw)|0;
    wz = (wz/ch)|0;
    setSideId(wx,wz, side);    
  }//setsideid3
  
  
  function setTile(ax,ay, t)
  {
    ax|=0; ay|=0;
    if (ax<0||ay<0||ax>=mw||ay>=mh){return;}
   vecGrid[ax+(ay*mw)] = t;    
  }//settile
  
  
  function setTile3(wx,wz, t)
  {
    wx = (wx/cw)|0;
    wz = (wz/ch)|0;
    setTile(wx,wz, t);    
  }//settile3
  
  function isWall(wx, wy, wz)
  {
    if (wy > 32) { return true; }
    if (wy < 0) { return true; }
    wx = (wx/cw)|0;
    wz = (wz/ch)|0;
    return getTile(wx,wz) == 1;    
  }//iswall
  
  
  
  function getFlag(ax, ay)
  {
    ax|=0; ay|=0;
    if (ax<0||ay<0||ax>=mw||ay>=mh){return 1;}
    return vecFlag[ax+(ay*mw)];
  }//getFlag
  
  function setFlag(ax,ay, t)
  {
    ax|=0; ay|=0;
    if (ax<0||ay<0||ax>=mw||ay>=mh){return;}
   vecFlag[ax+(ay*mw)] = t;    
  }//setFlag
  
  
  function updateFlag(ax, ay)
  {
    var f;
    f = 0;
    if (getTile(ax-1,ay)==1) { f|=1; }
    if (getTile(ax+1,ay)==1) { f|=2; }
    if (getTile(ax,ay-1)==1) { f|=4; }
    if (getTile(ax,ay+1)==1) { f|=8; }
    setFlag(ax,ay, f);
  }//updateflag 

  function updateFlag3(ax, ay)
  {
    var i, k;
    for (i=-1;i<2;i+=1)
    {
      for(k=-1;k<2;k+=1)
      {
        updateFlag(ax+k, ay+i);
      }
    }
    
  }//updateflag3
  
  function resetFlag()
  {
   var i, k;
    for (i=0;i<mh;i+=1)
    {
      for (k=0;k<mw;k+=1)
      {
        updateFlag(k,i);
      }//nextk
    }//nexti   
  }//resetflag 
  
  
  function initDebMap()
  {
    var ax, ay;
    var i;
    for (i=0;i<256;i+=1)
    {
      ax = getRand()*mw;
      ay = getRand()*mh;
      //console.log("getrand ",ax,ay);
      setTile(ax,ay,1);        
    }//nexti
      
     setTile(3,3,  1);
     setTile(6,4,  1);
     setTile(8,5,  1);     
      
      resetFlag();
  }//initDebMap
  
  initDebMap();
  
  
  function drawDebMap()
  {  
    var a;  var px, pz;
    var ax,ay;
    var aw,ah;
    ax=32;ay=32;
    aw = 4; ah = 4;

    ctx.fillStyle = "#aabbcc80";
    for (i=0;i<mh;i+=1)
    {
      for (k=0;k<mw;k+=1)
      {
        if (isVis(k,i))
        { ctx.fillRect(ax+k*aw, ay+i*ah, aw, ah); }
        
      }//nextk
    }//nexti



     ctx.fillStyle = "#000000";
     ctx.strokeStyle = "#000000";
     ctx.strokeRect(ax,ay, aw*mw, ah*mh);
    var i, k;
    
    
    for (i=0;i<mh;i+=1)
    {
      for (k=0;k<mw;k+=1)
      {
        if (getTile(k,i) == 1)
        { ctx.fillRect(ax+k*aw, ay+i*ah, aw, ah); }
        
      }//nextk
    }//nexti
    
    
    var vec; var num;
    vec = vecAct;
    num = vec.length;
     ctx.fillStyle = "#ffffff";
    for (i=0;i<num;i+=1)
    {
      a = vec[i];
      px = (a.cx / cw) * aw;
      pz = (a.cz / ch) * ah;
      ctx.fillRect(ax+px-1,ay+pz-1,3,3);      
    }//nexti 
    
    
    
  
    a = getAct(playerId);
    if (a!=0)
    {
      px = (a.cx / cw) * aw;
      pz = (a.cz / ch) * ah;
      ctx.strokeStyle = "#ffffff";
      drawLine(ax+px,ay+pz,ax+px+ Math.cos(a.ang)*-5, ay+pz+Math.sin(a.ang)*-5);
    }
  }//drawmap
  
  
   var bquad =  {x0:0,  y0:0, z0:0,   u0:1,v0:1,  
                 x1:0,  y1:0, z1:0,   u1:1,v1:0,   
                 x2:0,  y2:0, z2:0,   u2:0,v2:1,
                 //x3:0,  y3:0, z3:0,   u3:0,v3:0
                 };

  function drawBquad()
  {    
    drawCut(bquad, 0);
    //0 1 2
    //2 1 3
    bquad.u0 = bquad.u2;    bquad.v0 = bquad.v2;
    bquad.x0 = bquad.x2;    bquad.y0 = bquad.y2;  bquad.z0 = bquad.z2;

    bquad.u2 = bquad.u3;    bquad.v2 = bquad.v3;
    bquad.x2 = bquad.x3;    bquad.y2 = bquad.y3;  bquad.z2 = bquad.z3;
    drawCut(bquad, 0);
  }//drawBquad
                
   
  var bu0 = 0;  var bu1 = 1;
  var bv0 = 0;  var bv1 = 1;
   /*
  //edges are not accurate enough 
  function getSideUv(tile)
  {

    var i, k;
    i = ((tile|0) / 16)|0;
    k = ((tile|0) % 16);
    bu0 = k * 0.0625;
    bu1 = bu0 + 0.0625; //- 0.0009; //- 0.0009765625;
  //  bu0 += 0.0009765625;
    bv0 = i * 0.0625;
    bv1 = bv0 + 0.0625;// - 0.0009;// - 0.0009765625;
   // bv0 += 0.0009765625;
 
  }//getsideuv
  */
                
  function setSideSkin(id)
  {
    var i;
    i = vecSide[id];
    setSkin(i);
  }//setsideksin

  

                
  function drawBlock(wall, flag, sideid, ax, az, aw)
  {
    var x0,y0,z0;
    var x1,y1,z1;
   //var flag;
    //flag = 0;
    //flag = 1 | 2 | 4| 8;
    
    x0 = ax;    y0 = 0.0;  z0 = az;
    x1 = x0+aw; y1=y0+aw;  z1=z0+aw;
    

   // setSkin(wall);
    
    if (wall > 0)
    {
      if ((flag & 8)  == 0)
      {
        setSideSkin(sideid+1);
        bquad.u0 = bu0; bquad.v0 = bv1; 
        bquad.u1 = bu1; bquad.v1 = bv1; 
        bquad.u2 = bu0; bquad.v2 = bv0; 
        bquad.u3 = bu1; bquad.v3 = bv0; 
        bquad.x0 = x0; bquad.y0 = y0; bquad.z0 = z1;
        bquad.x1 = x1; bquad.y1 = y0; bquad.z1 = z1;
        bquad.x2 = x0; bquad.y2 = y1; bquad.z2 = z1;
        bquad.x3 = x1; bquad.y3 = y1; bquad.z3 = z1;
        
        drawBquad();
      }//endif

      
      if ((flag & 4)  == 0)
      {
        setSideSkin(sideid+0);
        bquad.u0 = bu1; bquad.v0 = bv1; 
        bquad.u1 = bu1; bquad.v1 = bv0; 
        bquad.u2 = bu0; bquad.v2 = bv1; 
        bquad.u3 = bu0; bquad.v3 = bv0; 
        bquad.x0 = x0; bquad.y0 = y0; bquad.z0 = z0;
        bquad.x1 = x0; bquad.y1 = y1; bquad.z1 = z0;
        bquad.x2 = x1; bquad.y2 = y0; bquad.z2 = z0;
        bquad.x3 = x1; bquad.y3 = y1; bquad.z3 = z0;
        
        drawBquad();
      }//endif 
      
        
     if ((flag & 2)  == 0)
      {
        setSideSkin(sideid+2);
        bquad.u0 = bu1; bquad.v0 = bv1; 
        bquad.u1 = bu1; bquad.v1 = bv0; 
        bquad.u2 = bu0; bquad.v2 = bv1; 
        bquad.u3 = bu0; bquad.v3 = bv0; 
        bquad.x0 = x1; bquad.y0 = y0; bquad.z0 = z0;
        bquad.x1 = x1; bquad.y1 = y1; bquad.z1 = z0;
        bquad.x2 = x1; bquad.y2 = y0; bquad.z2 = z1;
        bquad.x3 = x1; bquad.y3 = y1; bquad.z3 = z1;
        
        drawBquad();
      }//endif 
         
      if ((flag & 1)  == 0)
      {
        setSideSkin(sideid+3);
        bquad.u0 = bu0; bquad.v0 = bv1; 
        bquad.u1 = bu1; bquad.v1 = bv1; 
        bquad.u2 = bu0; bquad.v2 = bv0; 
        bquad.u3 = bu1; bquad.v3 = bv0; 
        bquad.x0 = x0; bquad.y0 = y0; bquad.z0 = z0;
        bquad.x1 = x0; bquad.y1 = y0; bquad.z1 = z1;
        bquad.x2 = x0; bquad.y2 = y1; bquad.z2 = z0;
        bquad.x3 = x0; bquad.y3 = y1; bquad.z3 = z1;
        
        drawBquad();
      }//endif   
      
      return;
    }//ifwall 
    
    

    //ceil 
    setSideSkin(sideid+4);
    bquad.u0 = bu1; bquad.v0 = bv0; 
    bquad.u1 = bu0; bquad.v1 = bv0; 
    bquad.u2 = bu1; bquad.v2 = bv1; 
    bquad.u3 = bu0; bquad.v3 = bv1; 
    bquad.x0 = x0; bquad.y0 = y1; bquad.z0 = z0;
    bquad.x1 = x1; bquad.y1 = y1; bquad.z1 = z0;
    bquad.x2 = x0; bquad.y2 = y1; bquad.z2 = z1;
    bquad.x3 = x1; bquad.y3 = y1; bquad.z3 = z1;    
    drawBquad();
    
    //floor
    setSideSkin(sideid+5);
    bquad.u0 = bu1; bquad.v0 = bv1; 
    bquad.u1 = bu1; bquad.v1 = bv0; 
    bquad.u2 = bu0; bquad.v2 = bv1; 
    bquad.u3 = bu0; bquad.v3 = bv0; 
    bquad.x0 = x0; bquad.y0 = y0; bquad.z0 = z0;
    bquad.x1 = x0; bquad.y1 = y0; bquad.z1 = z1;
    bquad.x2 = x1; bquad.y2 = y0; bquad.z2 = z0;
    bquad.x3 = x1; bquad.y3 = y0; bquad.z3 = z1;    
    drawBquad();
    

  }//drawblock
  
  
  function drawBlob(b, ax, az, aw)
  {
      
    var s; 
    s = vecSpr[b.spr];
    if (s==undefined) { return; }
    ax+=aw*0.5; az+=aw*0.5;
    drawTri = drawTriMask;
    cullTri = false;
      drawSprAdv(b.spr, ax, s.sh*0.25, az, s.sw*0.5, s.sh*0.5, 0);
    cullTri = true; 
    drawTri = drawTriSkin;
    
  }//drawblob
  
  function drawDoor(b, ax, az, aw)
  {
    var x0,y0,z0;
    var x1,y1,z1;
   
    x0 = ax;    y0 = 0.0;  z0 = az;
    x1 = x0+aw; y1=y0+aw;  z1=z0+aw;
    
    x0 -= aw * 0.5;
    x1 -= aw * 0.5;
    

    
    /*
    bquad.u0 = bu0; bquad.v0 = bv1; 
    bquad.u1 = bu1; bquad.v1 = bv1; 
    bquad.u2 = bu0; bquad.v2 = bv0; 
    bquad.u3 = bu1; bquad.v3 = bv0; 
    bquad.x0 = x0; bquad.y0 = y0; bquad.z0 = z1;
    bquad.x1 = x1; bquad.y1 = y0; bquad.z1 = z1;
    bquad.x2 = x0; bquad.y2 = y1; bquad.z2 = z1;
    bquad.x3 = x1; bquad.y3 = y1; bquad.z3 = z1;
    drawBquad();
    */
    
    drawTri = drawTriMask;
    cullTri = false;
    
    setSkin(b.skin);

 
    y0 = aw*0.5;
    y1 = y0 + aw*0.5;
    
    y0 += b.door;
    y1 += b.door;
    bquad.u0 = b.u1; bquad.v0 = b.v0 + (b.v1-b.v0)*0.5; 
    bquad.u1 = b.u1; bquad.v1 = b.v0; 
    bquad.u2 = b.u0; bquad.v2 = bquad.v0;
    bquad.u3 = b.u0; bquad.v3 = b.v0; 
    bquad.x0 = x1; bquad.y0 = y0; bquad.z0 = z0;
    bquad.x1 = x1; bquad.y1 = y1; bquad.z1 = z0;
    bquad.x2 = x1; bquad.y2 = y0; bquad.z2 = z1;
    bquad.x3 = x1; bquad.y3 = y1; bquad.z3 = z1;
    drawBquad();
 
    y0 = 0.0;
    y1 = y0+aw*0.5;
    y0 -= b.door;
    y1 -= b.door;
    bquad.u0 = b.u1; bquad.v0 = b.v1; 
    bquad.u1 = b.u1; bquad.v1 = b.v0 + (b.v1-b.v0)*0.5;  
    bquad.u2 = b.u0; bquad.v2 = b.v1;
    bquad.u3 = b.u0; bquad.v3 = bquad.v1; 
    bquad.x0 = x1; bquad.y0 = y0; bquad.z0 = z0;
    bquad.x1 = x1; bquad.y1 = y1; bquad.z1 = z0;
    bquad.x2 = x1; bquad.y2 = y0; bquad.z2 = z1;
    bquad.x3 = x1; bquad.y3 = y1; bquad.z3 = z1;
    drawBquad();
    
    cullTri = true; 
    drawTri = drawTriSkin;
    
  }//drawdoor 
  
  
  
  
  function drawDoor5(b, ax, az, aw)
  {
    var x0,y0,z0;
    var x1,y1,z1;
   
    x0 = ax;    y0 = 0.0;  z0 = az;
    x1 = x0+aw; y1=y0+aw;  z1=z0+aw;
    
    z0 -= aw * 0.5;
    z1 -= aw * 0.5;
    
    
    drawTri = drawTriMask;
    cullTri = false;
    
    setSkin(b.skin);

 
    y0 = aw*0.5;
    y1 = y0 + aw*0.5;
    
    y0 += b.door;
    y1 += b.door;
    bquad.u0 = b.u1; bquad.v0 = b.v0 + (b.v1-b.v0)*0.5; 
    bquad.u1 = b.u1; bquad.v1 = b.v0; 
    bquad.u2 = b.u0; bquad.v2 = bquad.v0;
    bquad.u3 = b.u0; bquad.v3 = b.v0; 
    bquad.x0 = x0; bquad.y0 = y0; bquad.z0 = z1;
    bquad.x1 = x0; bquad.y1 = y1; bquad.z1 = z1;
    bquad.x2 = x1; bquad.y2 = y0; bquad.z2 = z1;
    bquad.x3 = x1; bquad.y3 = y1; bquad.z3 = z1;
    drawBquad();
 
    y0 = 0.0;
    y1 = y0+aw*0.5;
    y0 -= b.door;
    y1 -= b.door;
    bquad.u0 = b.u1; bquad.v0 = b.v1; 
    bquad.u1 = b.u1; bquad.v1 = b.v0 + (b.v1-b.v0)*0.5;  
    bquad.u2 = b.u0; bquad.v2 = b.v1;
    bquad.u3 = b.u0; bquad.v3 = bquad.v1; 
    bquad.x0 = x0; bquad.y0 = y0; bquad.z0 = z1;
    bquad.x1 = x0; bquad.y1 = y1; bquad.z1 = z1;
    bquad.x2 = x1; bquad.y2 = y0; bquad.z2 = z1;
    bquad.x3 = x1; bquad.y3 = y1; bquad.z3 = z1;
    drawBquad();
    
    cullTri = true; 
    drawTri = drawTriSkin;
    
  }//drawdoor5
  
  
  
    
  function drawDoorSide(b, ax, az, aw)
  {
    var x0,y0,z0;
    var x1,y1,z1;
   
    x0 = ax;    y0 = 0.0;  z0 = az;
    x1 = x0+aw; y1=y0+aw;  z1=z0+aw;
    
    x0 -= aw * 0.5;
    x1 -= aw * 0.5;
    

    drawTri = drawTriMask;
    cullTri = false;
    
    setSkin(b.skin);

    z1 -= aw*0.5;
    z0 -= b.door;
    z1 -= b.door;
    bquad.u0 = b.u1;
    bquad.u1 = b.u1;
    bquad.u2 = b.u0+(b.u1-b.u0)*0.5; 
    bquad.u3 = bquad.u2;
    bquad.v0 = b.v1; bquad.v1 = b.v0;   bquad.v2 = b.v1; bquad.v3 = b.v0; 
    bquad.x0 = x1; bquad.y0 = y0; bquad.z0 = z0;
    bquad.x1 = x1; bquad.y1 = y1; bquad.z1 = z0;
    bquad.x2 = x1; bquad.y2 = y0; bquad.z2 = z1;
    bquad.x3 = x1; bquad.y3 = y1; bquad.z3 = z1;
    drawBquad();
 

    z0 = az; 
    z1 = z0+aw;
 
    z0 += aw*0.5;
    //x1 += aw*0.5;
    z0 += b.door;
    z1 += b.door;
    bquad.u0 = b.u0+(b.u1-b.u0)*0.5; 
    bquad.u1 = bquad.u0;
    bquad.u2 = b.u0;
    bquad.u3 = b.u0; 
    bquad.v0 = b.v1; bquad.v1 = b.v0;   bquad.v2 = b.v1; bquad.v3 = b.v0; 
    bquad.x0 = x1; bquad.y0 = y0; bquad.z0 = z0;
    bquad.x1 = x1; bquad.y1 = y1; bquad.z1 = z0;
    bquad.x2 = x1; bquad.y2 = y0; bquad.z2 = z1;
    bquad.x3 = x1; bquad.y3 = y1; bquad.z3 = z1;
    drawBquad();
  
 
 
    
    cullTri = true; 
    drawTri = drawTriSkin;
    
  }//drawdoorside
  
  //maybe i should had made it from 4 quads 
  //and have a seperate door amount for each ?
  
  
  function drawDoorSide5(b, ax, az, aw)
  {
    var x0,y0,z0;
    var x1,y1,z1;
   
    x0 = ax;    y0 = 0.0;  z0 = az;
    x1 = x0+aw; y1=y0+aw;  z1=z0+aw;
    
    z0 -= aw * 0.5;
    z1 -= aw * 0.5;
    

    drawTri = drawTriMask;
    cullTri = false;
    
    setSkin(b.skin);

    x1 -= aw*0.5;
    x0 -= b.door;
    x1 -= b.door;
    bquad.u0 = b.u1; 
    bquad.u1 = b.u0+(b.u1-b.u0)*0.5; 
    bquad.u2 = b.u1; 
    bquad.u3 = bquad.u1;
    bquad.v0 = b.v1;   bquad.v1 = b.v1;  bquad.v2 = b.v0; bquad.v3 = b.v0; 
    bquad.x0 = x0; bquad.y0 = y0; bquad.z0 = z1;
    bquad.x1 = x1; bquad.y1 = y0; bquad.z1 = z1;
    bquad.x2 = x0; bquad.y2 = y1; bquad.z2 = z1;
    bquad.x3 = x1; bquad.y3 = y1; bquad.z3 = z1;
    drawBquad();
 
 
    x0 = ax; 
    x1 = x0+aw;
 
    x0 += aw*0.5;
    //x1 += aw*0.5;
    x0 += b.door;
    x1 += b.door;
    bquad.u0 = b.u0+(b.u1-b.u0)*0.5; 
    bquad.u1 = b.u0;
    bquad.u2 = bquad.u0;
    bquad.u3 = b.u0;
    bquad.v0 = b.v1;   bquad.v1 = b.v1;  bquad.v2 = b.v0; bquad.v3 = b.v0; 
    bquad.x0 = x0; bquad.y0 = y0; bquad.z0 = z1;
    bquad.x1 = x1; bquad.y1 = y0; bquad.z1 = z1;
    bquad.x2 = x0; bquad.y2 = y1; bquad.z2 = z1;
    bquad.x3 = x1; bquad.y3 = y1; bquad.z3 = z1;
    drawBquad();
 
 
    
    cullTri = true; 
    drawTri = drawTriSkin;
    
  }//drawdoorside5
  
  
  
  function renderUnOpt()
  { 
    setSkinClamp();     
    setSkin("tile0");
    var i, k; var f; var t;
    var ax ,az;    var side; var blob;
    for (i=0;i<mh;i+=1)
    {
      az = i*ch;
      for (k=0;k<mw;k+=1)
      {
        ax = k*cw; 
        
        if (isVis(k,i)==false){continue;}
        //wall  flag   x  z   size
         
        side = getSideId(k,i);
        t = getTile(k,i);
        
        if (t == 1)
        {  
         f = getFlag(k,i);
         drawBlock(t, f, side,  ax, az, cw);
         continue;
        }//endif
      
         drawBlock(0, f, side,  ax, az, cw);
         
         if (t >= 2)
         { 
          
          blob = getBlob(k,i);
          if (blob == undefined) {continue;}          
          
          if (t >= 8)
          { drawBlob(blob,ax,az,cw); continue; }
        
 
          if (t == 5)
          {
            if (blob.sideDoor == 1) { drawDoorSide5(blob, ax,az,cw);  continue;  }
            drawDoor5(blob, ax,az,cw); continue; 
          }
        
         
          if (blob.sideDoor == 1)
          {  drawDoorSide(blob, ax,az,cw); continue; }
         

          drawDoor(blob, ax,az,cw);  

         }//endif
        

      }//nextk
    }//nexti
    setSkinWrap();
  }//unopt
  
  
  function getMag(ax, ay)
  { return Math.sqrt(ax*ax + ay*ay);  }
  
  var lastBlob = 0;
  
  // {cx  cz   vx vz }
  function mapMove(a, rad, bt, canop)
  {
    var tx, tz;
    var k, i; var t;
    var bx, bz;
    var ix, iz;
    var px, pz;
    var d;
    var ta;
    var nx, nz;
    var dot;
    var ret;
    var blob;
    ret = false;
    
    px = a.cx;
    pz = a.cz;
    
    lastBlob = 0;
    
    tx = (px / cw)|0;
    tz = (pz / ch)|0;
    for (i = -1; i <= 1; i += 1) 
    {
     for (k = -1; k <= 1; k += 1) 
     {
        t = getTile( tx+k, tz+i );
        if (t<=0) {continue;}
        if (t==2) { continue; } //opening door 
        if (t==8) { continue; } //pickup
        
        bx = (tx+k)*cw; bz = (tz+i)*ch;
        
      
        if (t==1)
        {
         blob = 0;
         if (px < bx) {ix = bx; }
         else if (px > bx+cw)  { ix = bx+ cw; }
         else {ix=px;}
         if (pz < bz) {iz = bz; }
         else if (pz > bz+ch)  { iz = bz+ ch; }
         else {iz=pz;}
        }
        else if (t == 3 || t == 5)
        {
          blob = getBlob(tx+k, tz+i);
          if (blob == undefined) { continue; } 
          //if (blob.nocol > 0) { continue; }
          //if (blob.door > 13) { continue; }
          
          if (t == 3)
          {
           bx += cw * 0.5;
           if (px < bx) {ix = bx; }
           else if (px > bx)  { ix = bx; }
           else {ix=px;}
           if (pz < bz) {iz = bz; }
           else if (pz > bz+ch)  { iz = bz+ ch; }
           else {iz=pz;}
          }
          else 
          {
            bz+= ch * 0.5;
             if (px < bx) {ix = bx; }
             else if (px > bx+cw)  { ix = bx+ cw; }
             else {ix=px;}
             if (pz < bz) {iz = bz; }
             else if (pz > bz)  { iz = bz; }
             else {iz=pz;}
          }//endif3
        }
        else if (t == 9)
        {
          blob = getBlob(tx+k, tz+i);
          if (blob == undefined) { continue; } 
          if (blob.nocol > 0) { continue; }

           ix = bx + cw * 0.5;
           iz = bz + ch * 0.5;          
        }//endif
        
         nx = ix-px; nz = iz-pz;
         //nx = px-ix; nz = pz-iz;
         d = getMag(nx,nz);
         if (d<=0.0){d=0.01;}
         
                    
         if ((t==3||t==5))
         {
           if ( d < 25 && canop)  { openDoor(tx+k, tz+i); }
           if (blob.nocol > 0) { continue; }
           if (blob.door > 13) { continue; }
         }//endif3
         
         
         
         if (d > rad) { continue; }
         
         nx /= d;         nz /= d;
         
       //  nx *= -1;         nz *= -1;
         
         dot = a.vz * nz + a.vx * nx;
         
         //console.log("nx nz dot ",gt, nx,nz,dot);
         
         if (dot > 0.0)
         {  
           //if (bounce) { dot *= 2.0f; } 
           dot *= bt;
           a.vx -=  nx * dot; 
           a.vz -=  nz * dot;       
           ret = true;
           
           lastBlob = blob;

         }//endif
    
     }//nextk
    }//nexti
    return ret;
  }//mapmove
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  



