

 var curVis = 0;
 var vecVis = new Int32Array(32*32);
 
 function resetVis()
 {
   curVis = 0;
   vecVis = new Int32Array(mw*mh);
   
 }//resetvis 
 
  function isVis(ax,ay)
  {
    ax|=0; ay|=0;
    if (ax<0||ay<0||ax>=mw||ay>=mh){return false ;}   
    return    vecVis[ax+(ay*mw)]  == curVis;    
  }//isvis
 
   function isVis3(wx,wz)
  {
    wx = (wx/cw)|0;
    wz = (wz/ch)|0;
    return isVis(wx,wz);
  }//isvis
 
 
  function setVis(ax,ay, t)
  {
    ax|=0; ay|=0;
    if (ax<0||ay<0||ax>=mw||ay>=mh){return;}
   vecVis[ax+(ay*mw)] = t;    
  }//setVis
  
  function getVis(ax, ay)
  {
    ax|=0; ay|=0;
    if (ax<0||ay<0||ax>=mw||ay>=mh){return 1;}
    return vecVis[ax+(ay*mw)];
  }//getVis
  
  
  function visRay(ax, az, dx, dz, num)
  {    
    var tx, tz; var i;
    for (i=0;i<num;i+=1)
    {
      ax += dx;
      az += dz; 

      tx = (ax/cw)|0;
      tz = (az/ch)|0;
      
      setVis(tx,tz,   curVis);
      if (i > 15) //made up number //~7 tiles 
      {
        setVis(tx+1,tz,   curVis); 
        setVis(tx-1,tz,   curVis);
        setVis(tx,tz+1,   curVis);
        setVis(tx,tz-1,   curVis);  
      }
      
      if (getTile(tx,tz) == 1) { return; }
      
    }//nexti 
  }//visray 
  
  function visTest(ax, az, ang)
  {
     
     curVis += 1;
     
    //classic raycast test for vis
     
    var ta; var td; var tu; var ts;
    var num;
    td = 1.57 * 0.5; //90 deg  -45 to 45 
    tu = td / 90;  //dist between angles 
    ts = -8.0;  //step 
    ts = -16.0;
    num = 80; //80*8  640   -- map is 1024x1024
    for (ta=-td; ta<=td; ta+= tu)
    {
      visRay(ax, az, Math.cos(ta+ang)*ts, Math.sin(ta+ang)*ts, num);      
    }//nextta
        
  }//vistest
  
  
  
  function visBox(ax, az, tilerad)
  {
    var i, k;
    var tx, tz;
    var tr;
    tx = (ax/cw)|0;
    tz = (az/ch)|0;
    
    //curVis += 1;
    
    tr = tilerad;
    
    for (i=-tr;i<=tr;i+=1)
    {
      for (k=-tr;k<=tr;k+=1)
      {
        setVis(tx+k, tz+i, curVis);
      }//nextk 
    }//nexti
  
  }//visbox 
  
  
  
  
  
  
  
  
  
  
  
  
  
  