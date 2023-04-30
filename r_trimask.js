
     function drawTriMask(x0, y0, z0,  u0, v0,   x1, y1, z1,  u1,v1,   x2, y2, z2,  u2,v2) 
     {  
       var sx, ex; var ax, bx; var i, k;
       var xst0, xst1, xst2;
       var dy0, dy1, dy2;
       var sz, ez; var az, bz;
       var zst0, zst1, zst2;
       
       var su, eu; var au, bu;
       var ust0, ust1, ust2;
       var sv, ev; var av, bv;
       var vst0, vst1, vst2;
       
       if (y1 < y0)	{	sx=x1;x1=x0;x0=sx; ex=y1;y1=y0;y0=ex; ex=z1;z1=z0;z0=ex; ex=u1;u1=u0;u0=ex; ex=v1;v1=v0;v0=ex;  }	
       if (y2 < y0)	{	sx=x2;x2=x0;x0=sx; ex=y2;y2=y0;y0=ex; ex=z2;z2=z0;z0=ex; ex=u2;u2=u0;u0=ex; ex=v2;v2=v0;v0=ex;  }	
       if (y2 < y1)	{	sx=x2;x2=x1;x1=sx; ex=y2;y2=y1;y1=ex; ex=z2;z2=z1;z1=ex; ex=u2;u2=u1;u1=ex; ex=v2;v2=v1;v1=ex;  }
          
          //this hack is still necessary
          y0 = (y0-0.5)|0; y2 = (y2+0.5)|0;
          
          
          
          dy0 = (y1 - y0);   dy1 = (y2 - y1);  dy2 = (y0 - y2);

          if (dy2 > -2) { return; } //hack -- dont render tris shorter than 2 pixels

          xst0 = 0; xst1 = 0; xst2 = 0;
          zst0 = 0; zst1 = 0; zst2 = 0;
          ust0 = 0; ust1 = 0; ust2 = 0;
          vst0 = 0; vst1 = 0; vst2 = 0;
          
          //perspcorrect
          u0 *= (1-z0);          v0 *= (1-z0);
          u1 *= (1-z1);          v1 *= (1-z1);
          u2 *= (1-z2);          v2 *= (1-z2);

          if (dy0!=0) { xst0 = (x1 - x0) / dy0; zst0 = (z1 - z0) / dy0; ust0 = (u1 - u0) / dy0; vst0 = (v1 - v0) / dy0; }
          if (dy1!=0) { xst1 = (x2 - x1) / dy1; zst1 = (z2 - z1) / dy1; ust1 = (u2 - u1) / dy1; vst1 = (v2 - v1) / dy1; }
          if (dy2!=0) { xst2 = (x0 - x2) / dy2;	zst2 = (z0 - z2) / dy2; ust2 = (u0 - u2) / dy2; vst2 = (v0 - v2) / dy2; }
          
      
          ax = x0; bx = x0;
          az = z0; bz = z0;
          au = u0; bu = u0;
          av = v0; bv = v0;
          
          var cu; var cv; var tx; var tz;
          var cm; 
          for (i = y0; i < y1; i+=1)
          {
            if (ax < bx) { sx = ax; ex = bx; } else { sx = bx; ex = ax; }
            if (ax < bx) { sz = az; ez = bz; } else { sz = bz; ez = az; }
            if (ax < bx) { su = au; eu = bu; } else { su = bu; eu = au; }
            if (ax < bx) { sv = av; ev = bv; } else { sv = bv; ev = av; }
            //if ((ex-sx) == 0) { ex+=1;  }
       
            cm = (ez - sz) / (ex - sx);
            cu = (eu - su) / (ex - sx);
            cv = (ev - sv) / (ex - sx);
              
              if (i > y0)
              {
                //sx = (sx - 0.5)|0;  ex = (ex - 0.5)|0;
               //sx|= 0; ex|=0;                sx-=1; ex+=1; //hack -- wider tris
               if (sx<0){sx=0;} if(ex>320){ex=320;} //fix for hack
              }
            for (k = sx; k < ex; k += 1) 
            {
              sz += cm; 
              su += cu;
              sv += cv;
              if (getDepth(k, i) < sz) { continue; }
              tx = getTexel(su/(1-sz), sv/(1-sz)); //perspcorrect 
              if (texData[reti+3]<128) { continue; }
              //setPixel(k, i, tx, tx, tx); 
              setPixel(k, i, texData[reti], texData[reti+1], texData[reti+2]); 
              
              setDepth(k, i, sz);
              
              //if (k == sx) {  setPixel(k, i, 0,0,0);  }
              //console.log("sz ", sz, k);
            }
            ax += xst0; bx += xst2;
            az += zst0; bz += zst2;
            au += ust0; bu += ust2;
            av += vst0; bv += vst2;
          }//nexti
          

          ax = x1; az = z1;
          au = u1; av = v1;
          for (i = y1; i < y2; i+=1)
          {
            if (ax < bx) { sx = ax; ex = bx; } else { sx = bx; ex = ax; }
            if (ax < bx) { sz = az; ez = bz; } else { sz = bz; ez = az; }
            if (ax < bx) { su = au; eu = bu; } else { su = bu; eu = au; }
            if (ax < bx) { sv = av; ev = bv; } else { sv = bv; ev = av; }
            
            //if ((ex-sx) == 0) { ex+=1;  }
     
            cu = (eu - su) / (ex - sx);
            cv = (ev - sv) / (ex - sx);
            cm = (ez - sz) / (ex - sx);
           
            if (i>y1)
            {
              //  sx = (sx - 0.5)|0;  ex = (ex - 0.5)|0;
              //sx|= 0; ex|=0;               sx-=1; ex+=1;
              if (sx<0){sx=0;} if(ex>320){ex=320;}
            }
            for (k = sx; k < ex; k+=1) 
            { 
              sz += cm;
              su += cu; sv += cv;
              if (getDepth(k, i) < sz) { continue; }
              //ez = 1 - sz;
              //ez = 1;
             // tx = getTexel(su, sv);
             //due to we are mostly memory speed limited 
             //correcting on every pixel doesnt seem to be a big impact
              tx = getTexel(su/(1-sz), sv/(1-sz));  //perspcorrect 
              if (texData[reti+3]<128) { continue; }

              //setPixel(k, i, tx, tx, tx); 
              setPixel(k, i, texData[reti], texData[reti+1], texData[reti+2]); 
              //setPixel(k, i, rc*ez, gc*ez, bc*ez); 
              setDepth(k, i, sz);    
             // if (k == sx) {  setPixel(k, i, 0,0,0);  }              
              //console.log("sz ", sz, k);
            }
            ax += xst1;	bx += xst2; 
            az += zst1; bz += zst2;
            au += ust1; bu += ust2;
            av += vst1; bv += vst2;
          }//nexti
          
        }//drawtriskin
        
    
    
    