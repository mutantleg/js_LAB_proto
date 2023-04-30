

//  var fontImage = loadImage(fontsprpng);
  var smallFont = loadImage(font8x8png);
//  var bigFont = loadImage("font10x12.png");
  var bigFont = loadImage(font10x12png);

  var btnPush = -1;
  var btnOver = -1;
  var btnFocus = -1; 
  var btnValue = 0;
  var btnDisable = -1;
  var menuState = 0;
  var optState = 0;
  var keyPrompt = 0;

 function resetBtn()
  {
   btnPush = -1;
   btnOver = -1;  
    //btnFocus = -1; 
    btnValue = 1.0;
    btnDisable = -1;
  }//resetbtn 
  
  /*
 // var firstfont = true;
  function drawFont(ax, ay, aw, ah, str)
  {
    var i, num; var a;
    //var aw, ah;    aw = 8; ah = 8;
    num = str.length;
    for (i=0;i<num;i+=1)
    {
      a = vecSpr[str[i]];
      //if (firstfont) { console.log("str i ", i, str[i], a); }
     // if ( a == undefined) { ax+=aw; continue; }
      if (str[i] == " ")  { ax+=aw; continue; }
      if ( a== undefined) { a = vecSpr["?"]; }
      ctx.drawImage(fontImage, a.x,a.y,a.sw,a.sh,     ax, ay,  aw, ah);
      ax += aw;  
    } //nexti 
   // firstfont = false;
  }//drawfont 
*/  
  function drawFont(ax, ay, sw,sh,  str)
  {
    var i, num; var a;
    var aw, ah;
    aw = 8; ah = 8;
    num = str.length;
    for (i=0;i<num;i+=1)
    {
      //a = vecSpr[str[i]];
       a = str.charCodeAt(i);
      if (str[i] == " ")  { ax+=aw; continue; }
      fx = Math.floor(((a % 16)|0) * aw);
      fy = Math.floor(((a / 16)|0) * ah);
      ctx.drawImage(smallFont, fx,fy, aw,ah,     ax, ay,  sw, sh);
      ax += aw;  
    } //nexti 
  }//drawfont3 
  
  
  function drawFont3(ax, ay,  str)
  {
    var i, num; var a;
    var aw, ah;
    aw = 10; ah = 12;
    num = str.length;
    for (i=0;i<num;i+=1)
    {
      //a = vecSpr[str[i]];
       a = str.charCodeAt(i);
      if (str[i] == " ")  { ax+=aw; continue; }
      fx = Math.floor(((a % 16)|0) * aw);
      fy = Math.floor(((a / 16)|0) * ah);
      ctx.drawImage(bigFont, fx,fy, aw,ah,     ax, ay,  aw, ah);
      ax += aw;  
    } //nexti 
  }//drawfont3 
  
  
  
  function drawLabel(ax,ay, size, str)
  {
    drawFont(ax,ay,size,size, str);
  }//drawlabel 
 
 function drawLabel3(ax,ay,  str)
  {
    drawFont3(ax,ay, str);
  }//drawlabel 
 
 
  var btnColor = "#808080";
  var btnColor3 = "#b0b0b0";
  
  function resetBtnCol()
  { btnColor = "#808080"; btnColor3 = "#b0b0b0"; }

  function setBtnColA()
  { btnColor = "#3030a0"; btnColor3 = "#6060b0"; }
  
  
  function isOver(ax, ay, aw, ah)
  {
    var over;
    over = (vmx<ax||vmx>=ax+aw||vmy<ay||vmy>=ay+ah) == false;
    if (btnDisable == 1) { over = false; }
    return over;
  }//isover 
  
  //drawbutton
  function drawBtn(id, ax, ay, aw, ah, str)
  {
    var over;
    over = (vmx<ax||vmx>=ax+aw||vmy<ay||vmy>=ay+ah) == false;
    if (btnDisable == 1) { over = false; }

    if (over && mhold == 1) { btnFocus = id; }
    if (btnFocus == id) { ax += 1; ay+= 1; }
    
    
    ctx.fillStyle = "#000000";
    ctx.fillRect(ax-1,ay-1,aw+2,ah+2);
    ctx.fillStyle = btnColor;
    if (over && btnFocus < 0) { ctx.fillStyle = btnColor3; }
    ctx.fillRect(ax,ay,aw,ah);
    
    var size;
    size = ah*0.5; //16
    var d;
    d = (str.length)* 10 * 0.5; // (size*0.5);
    //drawFont(ax+(aw*0.5)-d,ay+ah*0.5-(size*0.5),size,size, str);
    drawFont3(ax+(aw*0.5)-d, ay+ah*0.5-(size*0.5)-2, str);
    
    //todo -- make custom font writing
    /*
      ctx.fillStyle = "#ffff00";
      ctx.font = "16px Arial";
      var d;
      d = (str.length)*16*0.5*0.5;
      ctx.fillText(str, ax+(aw*0.5)-d+0.5, ay+ah*0.5+4+0.5);  
      */
    
    if (over && btnFocus == id && mpress == 1)
    { btnPush = id; }
  }//drawbtn 
  
  var sliderColor = "#30f030";
  function drawSlider(id, ax, ay, aw, ah, t)
  {
    var over;
    over = (vmx<ax||vmx>=ax+aw||vmy<ay||vmy>=ay+ah) == false;
    if (btnDisable == 1) { over = false; }

    if (over && mhold == 1)    { btnFocus = id; }
    
    var rx; var u;
    rx = vmx - ax;
    if (rx < 0) { rx = 0; }
    if (rx > aw) { rx = aw; }
    
    u = rx / aw; 

    if (btnFocus == id) { t = u; }
    btnValue = t;
     
    ctx.fillStyle = "#000000";
    ctx.fillRect(ax-1,ay-1,aw+2,ah+2);
    ctx.fillStyle = "#303030";
    ctx.fillRect(ax,ay,aw,ah);
    ctx.fillStyle = sliderColor;
    ctx.fillRect(ax,ay,aw*t,ah);
    

    if (btnFocus == id && mpress == 1) { btnPush = id;  btnValue = u; }
    

    if (btnFocus > 0 && btnFocus != id) { return; }
    if (over || btnFocus == id)
    {
     ctx.fillStyle = "#000000";
     ctx.fillRect(ax+aw*u,ay,3, ah);
    }
   
   
   //return u;
  }//drawslider 
 
 function setKey(kname, key)
  {
    if (kname == "Strafe Left")      { k_kleft = key;      }
    if (kname == "Strafe Left Alt")  { k_kleft_alt = key;  }
    if (kname == "Strafe Right")     { k_kright = key;     }
    if (kname == "Strafe Right Alt") { k_kright_alt = key; }

    if (kname == "Run Forward")      { k_kup = key;         }
    if (kname == "Run Forward Alt")  { k_kup_alt = key;     }
    if (kname == "Run Backward")     { k_kdown = key;       }
    if (kname == "Run Backward Alt") { k_kdown_alt = key;   }
      
    saveConfig();
  }//setkey 
  

 // menuState = 1; //debug 
 // optState = 1;
   
  function drawMenu()
  {
     if (paused == false) { return; }
     
     
     ctx.fillStyle = "#00000080";      
       ctx.fillRect(0, 0, 320, 240);
      
       resetBtn(); resetBtnCol();
  

       if (keyPrompt == 1)
       { btnDisable = 1; }
       
       if (mbutton == 0 && mpress == 0){btnFocus = -1; }
 
       var ax, ay;
       
     if (menuState == 0)
     {
        ax = 160 - 64; ay = 80;
       if (isOver(ax,ay, 128+16, 24)) { canLock = keyTime; }
       drawBtn(10, ax,ay, 128+16, 24, "Continue"); ay+=32;
       drawBtn(20, ax,ay, 128+16, 24, "Options"); ay+=32;
       
       if (btnPush == 10) { paused = false; }
       if (btnPush == 20) { menuState = 1; }

     }
     else if (menuState == 1)
     {
       ax = 16; ay = 16;
       
       drawBtn(10, ax,ay, 64, 16, "Back"); ax+=70;
       resetBtnCol(); if (optState == 0) { setBtnColA(); }
       drawBtn(15, ax,ay, 64, 16, "Sound"); ax+=70;
       resetBtnCol(); if (optState == 1) { setBtnColA(); }
       drawBtn(20, ax,ay, 64, 16, "Keys"); ax+=70;
       resetBtnCol(); if (optState == 2) { setBtnColA(); }
       drawBtn(25, ax,ay, 64, 16, "Video"); ax+=70;
       resetBtnCol();
       
       if (btnPush == 10) { menuState = 0; }
       if (btnPush == 15) { optState = 0;  }
       if (btnPush == 20) { optState = 1;  }
       if (btnPush == 25) { optState = 2;  }
       
       
        if (optState == 2)
        {
         ax = 160 - 64; ay = 64;
         ay+=8;
          drawLabel(ax,ay, 8, "Framerate:");

          ay+=16;   
          
          resetBtnCol(); if (frameSkip == 0) { setBtnColA(); }
          drawBtn(80, ax,ay, 128, 16, "60 FPS"); ay += 24;
          resetBtnCol(); if (frameSkip == 1) { setBtnColA(); }
          drawBtn(85, ax,ay, 128, 16, "30 FPS"); ay += 24;
          resetBtnCol(); if (frameSkip == 2) { setBtnColA(); }
          drawBtn(90, ax,ay, 128, 16, "15 FPS"); ay += 24;
          
          if (btnPush == 80)  { frameSkip = 0; }
          if (btnPush == 85)  { frameSkip = 1; }
          if (btnPush == 90)  { frameSkip = 2; }
        
          if (btnPush > 0)   { saveConfig(); }
        }//endif3 
       
        if (optState == 1)
        {
         ax = 48; ay = 48;
         ay+=8;
         sliderColor = "#3030f0";
         var ms;
         ms = mouseSpeed * 0.5;
         drawSlider(50, ax,ay, 128, 16, ms);
         drawLabel(ax,ay-8-2, 8, "Aim Speed "+((btnValue*100*2)|0)+"%" );     
         if (btnPush == 50)  { mouseSpeed = btnValue * 2.0;  }
   
         ax+=128+32;   
         drawBtn(80, ax,ay, 100, 16, "RESET AIM");
         if (btnPush == 80)  { mouseSpeed = 1.0;   }
         if (btnPush > 0)   { saveConfig(); }
          
          
          ax = 48; ay += 32;
            
            drawLabel(ax,ay+4, 8, "Run Forward");  
            drawBtn(300, ax+128, ay, 48, 16, ""+getKname(k_kup));
            drawBtn(305, ax+128+64, ay, 48, 16, ""+getKname(k_kup_alt));  ay += 20;
            if (btnPush == 300) { keyPrompt = 1; keyName = "Run Forward"; }
            if (btnPush == 305) { keyPrompt = 1; keyName = "Run Forward Alt"; }
            
            drawLabel(ax,ay+4, 8, "Run Backward");  
            drawBtn(400, ax+128, ay, 48, 16, ""+getKname(k_kdown));
            drawBtn(405, ax+128+64, ay, 48, 16, ""+getKname(k_kdown_alt));  ay += 20;
            if (btnPush == 400) { keyPrompt = 1; keyName = "Run Backward"; }
            if (btnPush == 405) { keyPrompt = 1; keyName = "Run Backward Alt"; }
                     
            drawLabel(ax,ay+4, 8, "Strafe Left");  
            drawBtn(100, ax+128, ay, 48, 16, ""+getKname(k_kleft));
            drawBtn(105, ax+128+64, ay, 48, 16, ""+getKname(k_kleft_alt));   ay += 20;
            if (btnPush == 100) { keyPrompt = 1; keyName = "Strafe Left"; }
            if (btnPush == 105) { keyPrompt = 1; keyName = "Strafe Left Alt"; }
            
            drawLabel(ax,ay+4, 8, "Strafe Right");  
            drawBtn(200, ax+128, ay, 48, 16, ""+getKname(k_kright));
            drawBtn(205, ax+128+64, ay, 48, 16, ""+getKname(k_kright_alt));  ay += 20;
            if (btnPush == 200) { keyPrompt = 1; keyName = "Strafe Right"; }
            if (btnPush == 205) { keyPrompt = 1; keyName = "Strafe Right Alt"; }
            

          
          
          
        //  ay += 32;
          drawBtn(8000, ax,ay, 96+16, 16, "RESET KEYS");
          if (btnPush == 8000) { resetKeys(); saveConfig(); }
          
          
              if (keyPrompt == 1)
              {
               btnPush = -1;
              
              ctx.fillStyle = "#000000a8";
              ctx.fillRect(0,0,320,240);
              
              ctx.fillStyle = "#000000"
              ctx.fillRect(60-2,80-2,196+4,64+4);
              
              ctx.fillStyle = "#505050"
              ctx.fillRect(60,80,196,64);
              
                btnDisable = -1;
                ax = 80; ay = 88;
                drawLabel(ax,ay, 8, "Press key for: ");  ay+=16;
                drawLabel(ax,ay, 8, keyName); ay+=16;
              
                drawBtn(300, ax, ay, 64, 16, "Cancel");
                drawBtn(310, ax+64+16, ay, 64, 16, "Unbind");
                
                if (btnPush == 300)  { keyPrompt = 0;   }
                if (btnPush == 310)  { keyPrompt = 0;  setKey(keyName, 0);   }
                //if (mouseLook == false) { keyPrompt = 0; }
                
                if (lastKey == keyTime-1 && lastKeyId == 27) { keyPrompt = 0; }
                else 
                if (lastKey == keyTime-1 && isKeyAllowed(lastKeyId) )
                { keyPrompt = 0;  setKey(keyName, lastKeyId); }
                   
              
              }//endif5
         
        
        }//endif3
       
       
        if (optState == 0)
        {
         if (muteVol > 0.1) { sliderColor = "#30f030"; }
         else { sliderColor = "#f03030";  }    

         ax = 160 - 64; ay = 64;
         ay+=8;
         drawSlider(50, ax,ay, 128, 12, mastVol);
         drawLabel(ax,ay-8-2, 8, "Master Volume "+((btnValue*100)|0)+"%" );     
         if (btnPush == 50)  { mastVol = btnValue; }
        
         ay+=32;
         drawSlider(60, ax,ay, 128, 12, musVol);
         drawLabel(ax,ay-8-2, 8, "Music Volume "+((btnValue*100)|0)+"%" );     
         if (btnPush == 60)  { musVol = btnValue; }
      
      
         ay+=32;
         drawSlider(70, ax,ay, 128, 12, sndVol);
         drawLabel(ax,ay-8-2, 8, "Sound Volume "+((btnValue*100)|0)+"%" );     
         if (btnPush == 70)  { sndVol = btnValue; }


          ay+=32;
          if (muteVol > 0.1) {  drawBtn(80, ax,ay, 64, 16, "MUTE");  }
          else {  drawBtn(80, ax,ay, 64, 16, "UNMUTE");  }
          
          drawBtn(81, ax+70,ay, 64, 16, "RESET");
          if (btnPush == 81) { resetVol(); saveConfig(); }
          
          if (btnPush == 80) 
          { if (muteVol>0){muteVol=0.0;}else{muteVol=1.0;} } 

          if (btnPush == 50 || btnPush == 60 ||btnPush==80)  { recalMusVol(); }
          
          if (btnPush > 0)   { saveConfig(); }
        }//endif3
        
     }//endif 
      
     if (mouseLook)
     {       
       //console.log("reach ", keyTime);
      //need a cursor sprite 
      ctx.fillStyle = "#000000";
      ctx.fillRect(vmx,vmy,3,3);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(vmx-1,vmy-1,3,3);
     }//endif 
      
  }//drawmenu 
   
  