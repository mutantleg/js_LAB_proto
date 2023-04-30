
   
   function drawQuad(ax, az, bx, bz)
   {
    drawCut( {x0:ax,  y0:0, z0:az,   u0:0,v0:0,  
              x1:ax,  y1:0, z1:bz,   u1:0,v1:1,   
              x2:bx,  y2:0, z2:az,   u2:1,v2:0}, 0 );  
    drawCut( {x0:bx,  y0:0,  z0:az,  u0:1,v0:0,  
             x1:ax,  y1:0,  z1:bz,  u1:0,v1:1,   
             x2:bx,  y2:0,  z2:bz,   u2:1,v2:1}, 0 );    
   
   }//drawquad
   
   function drawQuad2(ax, az, aw, ah)
   {
    drawCut( {x0:ax,  y0:0, z0:az,   u0:0,v0:0,  
              x1:ax,  y1:0, z1:az+ah,   u1:0,v1:1,   
              x2:ax+aw,  y2:0, z2:az,   u2:1,v2:0}, 0 );  
    drawCut( {x0:ax+aw,  y0:0,  z0:az,  u0:1,v0:0,  
             x1:ax,  y1:0,  z1:az+ah,  u1:0,v1:1,   
             x2:ax+aw,  y2:0,  z2:az+ah,   u2:1,v2:1}, 0 );    
   
   }//drawquad2
   
   function drawQuad3(ay, ax, az, bx, bz, s0, t0, s1,t1)
   {
    drawCut( {x0:ax,  y0:ay, z0:az,   u0:s0,v0:t0,  
              x1:ax,  y1:ay, z1:bz,   u1:s0,v1:t1,   
              x2:bx,  y2:ay, z2:az,   u2:s1,v2:t0}, 0 );  
    drawCut( {x0:bx,  y0:ay,  z0:az,  u0:s1,v0:t0,  
             x1:ax,  y1:ay,  z1:bz,  u1:s0,v1:t1,   
             x2:bx,  y2:ay,  z2:bz,   u2:s1,v2:t1}, 0 );    
   
   }//drawquad
   
   
   
   
   
   
   

 // quatSetVec(cori, sprMat);
 
   var tri0 =  {x0:0,  y0:0, z0:0,   u0:0,v0:1,  
                x1:0,  y1:0, z1:0,   u1:1,v1:1,   
                x2:0,  y2:0, z2:0,   u2:0,v2:0};
                
   var tri1 =  {x0:0,  y0:0, z0:0,   u0:0,v0:0,  
                x1:0,  y1:0, z1:0,   u1:1,v1:1,   
                x2:0,  y2:0, z2:0,   u2:1,v2:0};
                

                
   function drawSprAdv(spr, cx, cy, cz, cw, ch, roll)
   {
      var s;
      s = vecSpr[spr];
      if (s == undefined) { return; }
      setSkin("spr21");
      
      tri0.u0 = s.u0;      tri0.v0 = s.v1;
      tri0.u1 = s.u1;      tri0.v1 = s.v1;
      tri0.u2 = s.u0;      tri0.v2 = s.v0;

      tri1.u0 = s.u0;      tri1.v0 = s.v0;
      tri1.u1 = s.u1;      tri1.v1 = s.v1;
      tri1.u2 = s.u1;      tri1.v2 = s.v0;
      
      
      drawCamSpr(cx,cy,cz, cw, ch, roll);
   
   }//drawspradv    
          
          
   function drawCamSpr(cx,cy,cz, cw,ch,  roll )
   {
    var raw0, raw1, raw4, raw5, raw8, raw9;
    var caxw, sayw, saxw, cayw;
    var rx, ry;
    var ca, sa;
    
    cw *= 0.5;    ch *= 0.5;
    ca = Math.cos(roll);      sa = Math.sin(roll);  
    caxw = ca*cw;        sayw = sa*ch;
    saxw = sa*cw;        cayw = ca*ch;
     raw0=sprMat[0];    raw1=sprMat[4];
     raw4=sprMat[1];    raw5=sprMat[5];
     raw8=sprMat[2];    raw9=sprMat[6];

     rx = -caxw+sayw; ry = -saxw-cayw;
      tri0.x0 = raw0*rx + raw1*ry + cx;
      tri0.y0 = raw4*rx + raw5*ry + cy;
      tri0.z0 = raw8*rx + raw9*ry + cz;
     rx = caxw +sayw;	ry = saxw-cayw; 
      tri0.x1 = raw0*rx + raw1*ry + cx;
      tri0.y1 = raw4*rx + raw5*ry + cy;
      tri0.z1 = raw8*rx + raw9*ry + cz;
    rx = -caxw-sayw;	ry = -saxw+cayw; 
      tri0.x2 = raw0*rx + raw1*ry + cx;
      tri0.y2 = raw4*rx + raw5*ry + cy;
      tri0.z2 = raw8*rx + raw9*ry + cz;
      
      drawCut(tri0, 0);
      
      //0 1 2
      //2 1 3
      //todo -- opt to use only 1 tri 
      //swap 0 and 2
      //of course that needs proper uv setup
      //and i cannot be arsed 
      
      tri1.x0 = tri0.x2;
      tri1.y0 = tri0.y2;
      tri1.z0 = tri0.z2;
         
      tri1.x1 = tri0.x1;   
      tri1.y1 = tri0.y1;   
      tri1.z1 = tri0.z1;   
      rx = caxw-sayw;		ry = saxw+cayw;    
      tri1.x2 = raw0*rx + raw1*ry + cx;
      tri1.y2 = raw4*rx + raw5*ry + cy;
      tri1.z2 = raw8*rx + raw9*ry + cz;
            
      drawCut(tri1, 0);

   }//drawspr
   
   
   
   function drawSprShad(spr, cx, cy, cz, rad, ang)
   {
      
      var s;
      s = vecSpr[spr];
      if (s == undefined) { return; }
      setSkin("spr21");
      
      /*
      tri0.u0 = s.u0;      tri0.v0 = s.v1;
      tri0.u1 = s.u1;      tri0.v1 = s.v1;
      tri0.u2 = s.u0;      tri0.v2 = s.v0;

      tri1.u0 = s.u0;      tri1.v0 = s.v0;
      tri1.u1 = s.u1;      tri1.v1 = s.v1;
      tri1.u2 = s.u1;      tri1.v2 = s.v0;
      */
      
      //mirror on vert 
      tri0.u0 = s.u0;      tri0.v0 = s.v0;
      tri0.u1 = s.u1;      tri0.v1 = s.v0;
      tri0.u2 = s.u0;      tri0.v2 = s.v1;

      tri1.u0 = s.u0;      tri1.v0 = s.v1;
      tri1.u1 = s.u1;      tri1.v1 = s.v0;
      tri1.u2 = s.u1;      tri1.v2 = s.v1;  
      
      
      
      
      var ca, sa;
      var cxw, syw;
      ca = Math.cos(ang);      sa = Math.sin(ang);  
      
      cxw = ca*rad;        syw = sa*rad;
     
     // cosx + -siny 
     // sinx +  cosy
     
      var nx, nz;
      var sx, sz;
      
      //front vector 
      nx = Math.cos(ang) * rad;
      nz = Math.sin(ang) * rad;
      
      //perpend -- side vector 
      sx = -nz;
      sz =  nx;
         
      nx *= 0.35;
      nz *= 0.35;
      
      cx += nx;
      cz += nz;
      

           
      tri0.x0 = cx + nx - sx;      tri0.y0 = cy;      tri0.z0 = cz + nz - sz; 
      tri0.x1 = cx + nx + sx;      tri0.y1 = cy;      tri0.z1 = cz + nz + sz;
      tri0.x2 = cx - nx - sx;      tri0.y2 = cy;      tri0.z2 = cz - nz - sz;
           
      tri1.x0 = tri0.x2;      tri1.y0 = tri0.y2;      tri1.z0 = tri0.z2;  
      tri1.x1 = tri0.x1;      tri1.y1 = tri0.y1;      tri1.z1 = tri0.z1;   
      tri1.x2 = cx - nx + sx;     tri1.y2 = cy;       tri1.z2 = cz - nz + sz;
      
      /*
      tri0.x0 = cx - rad;      tri0.y0 = cy;      tri0.z0 = cz - rad; 
      tri0.x1 = cx + rad;      tri0.y1 = cy;      tri0.z1 = cz - rad;
      tri0.x2 = cx - rad;      tri0.y2 = cy;      tri0.z2 = cz + rad;
           
      tri1.x0 = tri0.x2;      tri1.y0 = tri0.y2;      tri1.z0 = tri0.z2;  
      tri1.x1 = tri0.x1;      tri1.y1 = tri0.y1;      tri1.z1 = tri0.z1;   
      tri1.x2 = cx + rad;     tri1.y2 = cy;           tri1.z2 = cz + rad;
      */
      
    /*
      tri0.x0 = cx + cxw - syw;      tri0.y0 = cy;      tri0.z0 = cz + syw + cxw; 
      tri0.x1 = cx + cxw - syw;      tri0.y1 = cy;      tri0.z1 = cz + syw + cxw; 
      tri0.x2 = cx - cxw + syw;      tri0.y2 = cy;      tri0.z2 = cz + syw + cxw; 
     */
      
      
      drawCut(tri0, 0);
     drawCut(tri1, 0);
       
       
   }//drawsprshad 
   
   
   
   
   
   
   
   