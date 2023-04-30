
  var vecDoor = [];
  var mapDoor = {};
  
  function resetDoor()
  { vecDoor = []; mapDoor = {}; }
  
  function getDoor(ax, az)
  {
    ax|=0; az|=0;
    if (ax<0||az<0||ax>=mw||az>=mh){return 0;}
    var d;   d = mapDoor[ax+(az*mw)];
    if (d == undefined) { return 0; }
    return d;      
  }//getdoor
  
  function getDoor3(ax, az)
  {
    return getDoor((ax/cw)|0, (az/ch)|0);    
  }//getdoor
  
  function openDoor(ax, az)
  {
    var d;
    d = getDoor(ax,az);
    if (d == 0) { return; }
    d.wait = 0;
    if (d.state != 1 && d.state != 2)
    { 
      d.state = 1;
      playSnd3("door",1.0,d.tx*cw+cw*0.5,16, d.tz*ch+ch*0.5);  
      console.log("play door open ", gt, d.state, d.damount);
    } 
  }//opendoor 
  
  //longdoor -- add into all spots?
  function addDoor(ax, az, vert, sidedoor, sprname)
  {
    if (getDoor(ax,az) != 0) { return; }
    
    var i; var k;
    var d;
    d = { tx:ax,
          tz:az, 
          tw:1,
          th:1,
          wait:0,
          state:0,
          damount:0          
         };
   
    vecDoor.push(d);
   
   
     if (vert)
     {
       for (i=0;i<32;i+=1)
       { if (getTile(d.tx,d.tz-i)==1)   { d.tz = d.tz-i+1; break; }  }
       for (i=0;i<32;i+=1)
       { if (getTile(d.tx, d.tz+i)==1)       {  d.th = i; break; } }
     }
     else 
     {
       for (i=0;i<32;i+=1)
       { if (getTile(d.tx-i, d.tz)==1)   { d.tx = d.tx-i+1; break; }  }
       for (i=0;i<32;i+=1)
       { if (getTile(d.tx+i, d.tz)==1)       {  d.tw = i; break; } }
     } //endif 
     
  
 
    var blob;
    var tile;
    tile = 3;
    if (vert == false) {tile=5;}
  
 
    for (i=0;i<d.th;i+=1)
    { 
      for (k=0;k<d.tw;k+=1)
      {
        ax = d.tx+k;
        az = d.tz+i;
        mapDoor[ax + (az*mw)] = d;
        
        blob = setBlob(ax, az, sprname);
        blob.sideDoor = sidedoor;
        setTile(ax, az, tile);
        updateFlag3(ax, az);
      }//nextk
    }//nexti

    //console.log("add door ", d.tx, d.tz, d.tw, d.th);    
    
    //set for full line    
    //mapDoor[ax + (az*mw)] = d;
    
    return d;
  }//addDoor
  
  
  function cleanDoor(vec)
  {
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
        delete mapDoor[d.id];
        continue;        
      }
    }//nexti    
  }//cleanact 
  
  function updateDoor()
  {
    var i; var num; var a;
    var b; var nclean;
    var k;
    nclean = false;
    num = vecDoor.length;
    for (i=0;i<num;i+=1)
    {
      a = vecDoor[i];
      
      if (a.state <=0){continue;}
      
      //b = getBlob(a.tx, a.tz);
      //if (b==undefined){continue;}
      
      if (a.state == 1)
      {
        a.state = 2;
        a.wait = 0;
      }//endif      
     
      if (a.state == 2)
      {
         a.damount += 1;
         if (a.damount >15){a.damount=15;}
        a.wait += 1;         
        if (a.wait >= 60)
        { 
          a.wait = 0; 
          a.state = 3;
          playSnd3("door", 1.0,  a.tx*cw+cw*0.5, 16, a.tz*ch+ch*0.5);  
        }
        //b.door = a.damount;
      }
      else if (a.state == 3)
      {
        a.damount -= 1;
        if (a.damount <=0)
        { a.damount = 0; a.state=0;}
        //b.door = a.damount;      
      }//endif
      
      if (a.th > a.tw)
      {
        for (k=0;k<a.th;k+=1)
        {
          b = getBlob(a.tx, a.tz+k);
          if (b == undefined || b == 0){continue;}
          b.door = a.damount;
        }
      }
      else 
      {
        for (k=0;k<a.tw;k+=1)
        {
          b = getBlob(a.tx+k, a.tz);
          if (b == undefined || b == 0){continue;}
          b.door = a.damount;
        }
      }//endif3

    }//nexti  
   //  if (nclean) { cleanDoor(vecDoor); }
  }//updatedoor 
  
  