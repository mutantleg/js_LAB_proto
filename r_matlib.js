


 var cullTri = true;
  
  var rendw = 160; var rendh = 100;
  function setMatScreen(sw, sh)
  {
     rendw = sw * 0.5;
     rendh = sh * 0.5;
  }//setmatscreen

  function drawTri(sx0, sy0, w0, u0,v0,  sx1,sy1, w1, u1,v1,  sx2, sy2, w2, u2,v2, rc,gc,bc)
  {
    //override me      
  }//drawtri 
  
  /*
    var ident = [1, 0, 0, 0,   0, 1, 0, 0,   0, 0, 1, 0,   0, 0, 0, 1]; 
    var tq = { x:0,y:0,z:0,w:1 };
    var tmat = [1, 0, 0, 0,   0, 1, 0, 0,   0, 0, 1, 0,   0, 0, 0, 1];  


    var cori = {x:0, y:0, z:0, w:1};
    var projMat = [1, 0, 0, 0,   0, 1, 0, 0,   0, 0, 1, 0,   0, 0, 0, 1]; 
    var viewMat = [1, 0, 0, 0,   0, 1, 0, 0,   0, 0, 1, 0,   0, 0, 0, 1]; 
    var temp = [1, 0, 0, 0,   0, 1, 0, 0,   0, 0, 1, 0,   0, 0, 0, 1]; 
       
    setProjMat(temp, 90, 1.33, 1, 2048);
    setViewMat(viewMat, camx, camy, camz,  cori.x, cori.y, cori.z, cori.w);
    multMatrix(temp, viewMat, projMat); 
    setFrustPlane(90, 1.33, 1, 2048, camx, camy, camz, cori);
    setFrustCutter();
            
  */



  function setProjMat(vec,
     fovdeg /*= 60.0*/, aspect/*=1.0*/, nearp/* = 1.0*/, farp/*=1000.0*/)
    {   var f;   var i;
        for (i = 0; i < 16; i+=1) { vec[i] = 0.0;  } 
        f = 1.0 / Math.tan( (fovdeg * (3.1415 / 180.0)) * 0.5 );
        if (nearp == 0) { nearp = 0.0001; }
        if (farp == 0) { farp = 0.0001; }
        vec[0] = f / aspect;          vec[5] = f;
        vec[10] = (farp + nearp) / (nearp - farp);
        vec[14] = (2.0 * farp * nearp) / (nearp - farp);
        vec[11] = -1.0;          vec[15] = 0.0;
    }//projmatrix

    function setViewMat(vec, 
    cx, cy, cz,  qx, qy, qz, qw)
    { var forwx; var forwy; var forwz;
      var sidex; var sidey; var sidez;
      var upx;   var upy;   var upz;     
      var i; for(i=0;i<16;i++){vec[i]=0.0;}vec[0]=vec[5]=vec[10]=vec[15]=1.0;
      forwx=2.0*(qx*qz+qy*qw);forwy=2.0*(qy*qz-qx*qw);forwz=1.0-2.0*(qx*qx+qy*qy);
      upx=2.0*(qx*qy-qz*qw);upy=1.0-2.0*(qx*qx+qz*qz);upz=2.0*(qy*qz+qx*qw);
      sidex=1.0-2.0*(qy*qy+qz*qz);sidey=2.0*(qx*qy+qz*qw);sidez=2.0*(qx*qz-qy*qw);
      vec[0]=sidex;vec[4]=sidey;vec[8]=sidez;
      vec[1]=upx;vec[5]=upy;vec[9]=upz;
      vec[2]=forwx;vec[6]=forwy;vec[10]=forwz;
      vec[12]=(sidex*-cx)+(sidey*-cy)+(sidez*-cz);
      vec[13]=(upx*-cx)+(upy*-cy)+(upz*-cz);
      vec[14]=(forwx*-cx)+(forwy*-cy)+(forwz*-cz);
    }//setlookat

    //only works with 4x4 matrices
    function multMatrix(a, b, r)
    {   var i;  for (i = 0; i < 16; i += 4)
        {   
            r[i] =     a[0] * b[i] + a[4] * b[i + 1] + a[8] * b[i + 2] + a[12] * b[i + 3];
            r[i + 1] = a[1] * b[i] + a[5] * b[i + 1] + a[9] * b[i + 2] + a[13] * b[i + 3];
            r[i + 2] = a[2] * b[i] + a[6] * b[i + 1] + a[10] * b[i + 2] + a[14] * b[i + 3];
            r[i + 3] = a[3] * b[i] + a[7] * b[i + 1] + a[11] * b[i + 2] + a[15] * b[i + 3];
        }//nexti
    }//multmat  
    
    
      var frustMat = [1, 0, 0, 0,   0, 1, 0, 0,   0, 0, 1, 0,   0, 0, 0, 1]; 
      var vecPlane = [ {cx:0,cy:0,cz:0, nx:0,ny:0,nz:0},
                       {cx:0,cy:0,cz:0, nx:0,ny:0,nz:0},
                       {cx:0,cy:0,cz:0, nx:0,ny:0,nz:0},
                       {cx:0,cy:0,cz:0, nx:0,ny:0,nz:0},
                       {cx:0,cy:0,cz:0, nx:0,ny:0,nz:0},
                       {cx:0,cy:0,cz:0, nx:0,ny:0,nz:0} ]; 

     function copyVec(va, vb) { va.x=vb.x; va.y=vb.y; va.z=vb.z; }                  
     function addVec(va, vb) { va.x+=vb.x; va.y+=vb.y; va.z+=vb.z;}
     function subVec(va, vb) { va.x-=vb.x; va.y-=vb.y; va.z-=vb.z;}
     
     
         //quat {x,y,z,w}
             
          function resetQuat(q)
          { q.x = 0; q.y = 0; q.z =0; q.w = 1; }          
        
          function normaliseQuat(q)
          { var mag;  mag = (q.x * q.x) + (q.y * q.y) + (q.z * q.z) + (q.w * q.w);
            if (mag == 1.0) return; //already normal
            if (mag == 0) { q.x = 0;  q.y = 0;  q.z = 0;  q.w = 1; return; }
            mag = 1.0 / Math.sqrt(mag);  q.x *= mag; q.y *= mag; q.z *= mag; q.w *= mag;
          }//norm
           
          function quatRotAxis(q, ang, xyz) //0 x  1 y  2 z
          { var ax; var ay; var az; var aw;   var tx; var ty; var tz; var tw;
            ang *= 0.5;
            ax = xyz == 0? Math.sin(ang):0; 
            ay  = xyz == 1? Math.sin(ang):0;  
            az = xyz == 2? Math.sin(ang):0; 
            aw = Math.cos(ang);
            tx = (q.w * ax + q.x * aw + q.y * az - q.z * ay);   ty = (q.w * ay + q.y * aw + q.z * ax - q.x * az);
            tz = (q.w * az + q.z * aw + q.x * ay - q.y * ax);   tw = (q.w * aw - q.x * ax - q.y * ay - q.z * az);
            q.x = tx;  q.y = ty;     q.z = tz;   q.w = tw;     
            normaliseQuat(q);        
          }//rotaxis
          
          function quatSetVec(q, vec)
          { var xx = q.x * q.x;  var xy = q.x * q.y; var xz = q.x * q.z;  var xw  = q.x* q.w;
            var yy = q.y * q.y;  var yz = q.y * q.z; var yw = q.y * q.w;
            var zz = q.z * q.z;  var zw = q.z * q.w;
            vec[3]  = vec[7] = vec[11] = vec[12] = vec[13] = vec[14] = 0.0; vec[15] = 1.0;
            vec[0]  = 1.0 - 2.0 * ( yy + zz ); vec[4]  =     2.0 * ( xy - zw );   vec[8]  =     2.0 * ( xz + yw );
            vec[1]  =  2.0 * ( xy + zw ) ;     vec[5]  = 1.0 - 2.0 * ( xx + zz ); vec[9]  =  2.0 * ( yz - xw ) ;
            vec[2]  =  2.0 * ( xz - yw );      vec[6]  =     2.0 * ( yz + xw );   vec[10] = 1.0 - 2.0 * ( xx + yy );       
         }//setvec
         
         
     
     //todo 3 verts should be enough for this 
     function calcFrustNorm(plane, c,d,e,f)
      {        
          var ax, ay, az;            var bx, by, bz;
          var cx, cy, cz;            var dist;        
          ax = c.x - d.x;            ay = c.y - d.y;            az = c.z - d.z;
          bx = e.x - f.x;            by = e.y - f.y;            bz = e.z - f.z;          
          cx = (ay * bz) - (az * by);
          cy = (az * bx) - (ax * bz);
          cz = (ax * by) - (ay * bx);
              
          dist = Math.sqrt( (cx * cx) + (cy * cy) + (cz * cz) );
          if (dist == 0) { plane.nx = 0; plane.ny = 0; plane.nz = 0; }
          else
          {   plane.nx = cx / dist;   plane.ny = cy / dist;  plane.nz = cz / dist; }  
      }//calcplane
  
  
              
       function setFrustPlane(fov, aspect, nearDist, farDist,  cx,cy,cz, ori)
       {
         var tang; var nw, nh; var fw, fh; var vec;
         
          fov *= 3.1415 / 180.0; 
          tang = Math.tan(fov * 0.5);
          nh = nearDist * tang;  nw = nh * aspect; 
          fh = farDist * tang;   fw = fh * aspect;   
  
           
         // console.log("frustMat", frustMat );
          quatSetVec(ori, frustMat);
          vec = frustMat;
          
          //near: position at cx,cy,cz + near -- front plane is ori front     
           var p;
           p = vecPlane[0];
           p.cx = cx; p.cy = cy; p.cz = cz; 
           p.nx = vec[8]; p.ny = vec[9]; p.nz = vec[10];
           //nearDist=128;
           p.cx += -p.nx * nearDist; p.cy += -p.ny * nearDist; p.cz += -p.nz * nearDist;
           //its as if not cut by near plane?
           
          //far: same with reverse normal 
           p = vecPlane[1];
           p.cx = cx; p.cy = cy; p.cz = cz; 
           p.nx = -vec[8]; p.ny = -vec[9]; p.nz = -vec[10];
           p.cx += p.nx * farDist; p.cy += p.ny * farDist; p.cz += p.nz * farDist;
           
           //http://www.lighthouse3d.com/tutorials/view-frustum-culling/geometric-approach-extracting-the-planes/
          //sides: this is where it gets .. tricky 
          
           var farUp, nearUp, fc, nc;
           nc = {x:vecPlane[0].cx, y:vecPlane[0].cy, z:vecPlane[0].cz };
           nearUp =   { x:vec[4]*nh,y:vec[5]*nh,z:vec[6]*nh  };
           nearSide = { x:vec[0]*nw,y:vec[1]*nw,z:vec[2]*nw  };
           fc = {x:vecPlane[1].cx, y:vecPlane[1].cy, z:vecPlane[1].cz };
           farUp =    { x:vec[4]*fh,y:vec[5]*fh,z:vec[6]*fh  };
           farSide =  { x:vec[0]*fw,y:vec[1]*fw,z:vec[2]*fw  };     
          
            var ftl, ftr, fbl, fbr;
            var ntl, ntr, nbl, nbr;
             ftl = {x:0, y:0, z:0}; 
             ftr = {x:0, y:0, z:0}; 
             fbl = {x:0, y:0, z:0}; 
             fbr = {x:0, y:0, z:0}; 
             ntl = {x:0, y:0, z:0}; 
             ntr = {x:0, y:0, z:0}; 
             nbl = {x:0, y:0, z:0}; 
             nbr = {x:0, y:0, z:0}; 

           copyVec(ftl, fc); addVec(ftl, farUp); subVec(ftl, farSide); 
           copyVec(ftr, fc); addVec(ftr, farUp); addVec(ftr, farSide); 
           copyVec(fbl, fc); subVec(fbl, farUp); subVec(fbl, farSide); 
           copyVec(fbr, fc); subVec(fbr, farUp); addVec(fbr, farSide); 
           
           copyVec(ntl, nc); addVec(ntl, nearUp); subVec(ntl, nearSide); 
           copyVec(ntr, nc); addVec(ntr, nearUp); addVec(ntr, nearSide); 
           copyVec(nbl, nc); subVec(nbl, nearUp); subVec(nbl, nearSide); 
           copyVec(nbr, nc); subVec(nbr, nearUp); addVec(nbr, nearSide); 

           //left
           p = vecPlane[2];
            p.cx = (ftl.x + fbl.x + ntl.x + nbl.x) / 4;
            p.cy = (ftl.y + fbl.y + ntl.y + nbl.y) / 4;
            p.cz = (ftl.z + fbl.z + ntl.z + nbl.z) / 4;
            calcFrustNorm(p, ftl, fbl, ftl, ntl);

            //right
           p = vecPlane[3];
            p.cx = (ftr.x + fbr.x + ntr.x + nbr.x) / 4;
            p.cy = (ftr.y + fbr.y + ntr.y + nbr.y) / 4;
            p.cz = (ftr.z + fbr.z + ntr.z + nbr.z) / 4;
            calcFrustNorm(p, ftr, ntr, ftr, fbr);
            
            //top
           p = vecPlane[4];
            p.cx = (ftr.x + ftl.x + ntr.x + ntl.x) / 4;
            p.cy = (ftr.y + ftl.y + ntr.y + ntl.y) / 4;
            p.cz = (ftr.z + ftl.z + ntr.z + ntl.z) / 4;
            calcFrustNorm(p, ftr, ftl, ftr, ntr);

            //bottom
           p = vecPlane[5];
            p.cx = (fbr.x + fbl.x + nbr.x + nbl.x) / 4;
            p.cy = (fbr.y + fbl.y + nbr.y + nbl.y) / 4;
            p.cz = (fbr.z + fbl.z + nbr.z + nbl.z) / 4;
            calcFrustNorm(p, fbl, nbl, fbr, fbl);
       }//setplane  
       
       
       function getCutter()
       {
        return  { 
                ret1:{ sortCode:0, x0:0, y0:0, z0:0,  x1:0, y1:0, z1:0,   x2:0, y2:0, z2:0,
                     u0:0, v0:0, u1:0, v1:0,  u2:0,  v2:0 },
                ret2:{ sortCode:0, x0:0, y0:0, z0:0,  x1:0, y1:0, z1:0,   x2:0, y2:0, z2:0,
                     u0:0, v0:0, u1:0, v1:0,  u2:0,  v2:0 },
                num:0,
                cx:0,cy:0,cz:0,
                nx:0,ny:1,nz:0
               };
       }//getcutter 
       
       var vecCutter = [ getCutter(), getCutter(),getCutter(),  getCutter(),getCutter(),getCutter() ];

       //todo -- cutter to be same as plane?
       function setFrustCutter()
       {
       
        // return;
         var i; var cut; var p;
         for (i=0;i<6;i+=1)
         {
          //if (i!=5){continue;}
          cut = vecCutter[i]; p = vecPlane[i];
          cut.cx = p.cx;  cut.cy = p.cy;  cut.cz = p.cz;
          cut.nx = -p.nx;  cut.ny = -p.ny;  cut.nz = -p.nz;     
          //console.log("cutter ",i, cut.cx, cut.cy, cut.cz, cut.nx,cut.ny, cut.nz );
         }//nexti
       }//setfrustcut 
            

      //replace me 
       function renderCutTri(tri)
       {
          //console.log("rendertri ", tri );
          drawProjTri(tri.x0,tri.y0,tri.z0, tri.u0, tri.v0, 
                     tri.x1,tri.y1,tri.z1, tri.u1, tri.v1,
                     tri.x2,tri.y2,tri.z2, tri.u2, tri.v2);
                     
       }//rendertri 
       
       

       
        function drawCut(tri, d)
        {
          var cut;
          var num;
          //if (d >= 1) { renderTri(tri); return; }  
          if (d >= 6) { renderCutTri(tri); return; }  
          cut = vecCutter[d];
          num = cutTri(cut, tri);
          if (num < 0) { return; }
          if (num == 0) { drawCut(tri, d+1); return; }
          drawCut(cut.ret1, d+1);
          if (num>1) { drawCut(cut.ret2, d+1); }
        }//drawcut 
       
        //should be 4 (more indicates bug)
        var tempOut = [{x:0,y:0,z:0,u:0,v:0},{x:0,y:0,z:0,u:0,v:0}, {x:0,y:0,z:0,u:0,v:0},{x:0,y:0,z:0,u:0,v:0}
                       /*,{x:0,y:0,z:0,u:0,v:0}, {x:0,y:0,z:0,u:0,v:0}*/];
      
        function cutTri(cut, tri)
        {
          px = cut.cx;      py = cut.cy;      pz = cut.cz; 
          nx = cut.nx;      ny = cut.ny;      nz = cut.nz;
      
          var vecOut;      var i, it;       var ad,bd,cd;
          var t;           var va,vs;       var da,ds, dw;
          var vo; 
            
          vecOut = tempOut;
          
          //good enough test, no need to predoit i guess
            ad = (tri.x0 - px) *nx +  (tri.y0 - py) *ny +(tri.z0 - pz) *nz
            bd = (tri.x1 - px) *nx +  (tri.y1 - py) *ny +(tri.z1 - pz) *nz
            cd = (tri.x2 - px) *nx +  (tri.y2 - py) *ny +(tri.z2 - pz) *nz
          
            if (ad >= 0 && bd >= 0 && cd >= 0) { return 0; } //front of plane
            if (ad < 0  && bd < 0  && cd < 0) { return -1; } //behind plane
              
          it = 0;
          
          //todo -- optimise this part
          var vert = [{x:tri.x0,y:tri.y0,z:tri.z0,u:tri.u0,v:tri.v0},
                      {x:tri.x1,y:tri.y1,z:tri.z1,u:tri.u1,v:tri.v1},
                      {x:tri.x2,y:tri.y2,z:tri.z2,u:tri.u2,v:tri.v2}];
                  
        
            for (i = 0; i < 3; i+=1)
            {
                if (i == 0)     { va = vert[0]; vs = vert[2]; da = ad; ds = cd; }
                else if (i == 1){ va = vert[1]; vs = vert[0]; da = bd; ds = ad; }
                else            { va = vert[2]; vs = vert[1]; da = cd; ds = bd; }
          
                if (da > 0 && ds > 0)
                    {  
                      vo = vecOut[it]; 
                       vo.x = va.x;  vo.y = va.y;  vo.z = va.z;
                       vo.u = va.u;  vo.v = va.v; 
                      it += 1;   
                    }
                    else if (da > 0 || ds > 0)
                    {
                      
                      t = da / (nx * (va.x - vs.x) + ny * (va.y - vs.y) +  nz * (va.z - vs.z) );

                      //console.log("it ", it);
                      vo = vecOut[it];
                      vo.x = va.x + (vs.x - va.x) * t;
                      vo.y = va.y + (vs.y - va.y) * t;
                      vo.z = va.z + (vs.z - va.z) * t;
                
                      vo.u = va.u + (vs.u - va.u) * t;
                      vo.v = va.v + (vs.v - va.v) * t;

                      it += 1; 
                               
                      if (ds < 0)
                      { 
                       vo = vecOut[it];  
                        vo.x = va.x;  vo.y = va.y;  vo.z = va.z;
                        vo.u = va.u;  vo.v = va.v; 
                       it += 1;
                      }//endif2
                    }//endif

            }//nexti

              
         if (it < 3) { return -1;}
          
          var ret1, ret2; 
          ret1 = cut.ret1;
         
            ret1.x0 = vecOut[0].x;      ret1.y0 = vecOut[0].y;      ret1.z0 = vecOut[0].z;
            ret1.u0 = vecOut[0].u;       ret1.v0 = vecOut[0].v;

            ret1.x1 = vecOut[1].x;      ret1.y1 = vecOut[1].y;      ret1.z1 = vecOut[1].z;
            ret1.u1 = vecOut[1].u;       ret1.v1 = vecOut[1].v;

            ret1.x2 = vecOut[2].x;      ret1.y2 = vecOut[2].y;      ret1.z2 = vecOut[2].z;
            ret1.u2 = vecOut[2].u;       ret1.v2 = vecOut[2].v;

           
          if (it == 3) { return 1; }
          
          ret2 = cut.ret2;
            ret2.x0 = vecOut[0].x;      ret2.y0 = vecOut[0].y;      ret2.z0 = vecOut[0].z;
            ret2.u0 = vecOut[0].u;       ret2.v0 = vecOut[0].v;

            ret2.x1 = vecOut[2].x;      ret2.y1 = vecOut[2].y;      ret2.z1 = vecOut[2].z;
            ret2.u1 = vecOut[2].u;       ret2.v1 = vecOut[2].v;

            ret2.x2 = vecOut[3].x;      ret2.y2 = vecOut[3].y;      ret2.z2 = vecOut[3].z;
            ret2.u2 = vecOut[3].u;       ret2.v2 = vecOut[3].v;
        
          return 2;

        }//cuttri        
       
       

     function drawProjTri(x0, y0, z0,  u0, v0,   
                          x1, y1, z1,  u1, v1,  
                          x2, y2, z2,  u2, v2)
    {
      var sx0, sy0, w0; 
      var sx1, sy1, w1; 
      var sx2, sy2, w2;   
      var sz0, sz1, sz2;
      var mat;
      mat = projMat;
      
      
      w0 = x0 * mat[3] + y0 * mat[7] + z0 * mat[11] + mat[15];
      w1 = x1 * mat[3] + y1 * mat[7] + z1 * mat[11] + mat[15];
      w2 = x2 * mat[3] + y2 * mat[7] + z2 * mat[11] + mat[15];    
      if (w0 <= 0 && w1 <= 0 && w2 <= 0) { return; }
    
      sx0 = x0 * mat[0] + y0 * mat[4] + z0 * mat[8] + mat[12];
      sy0 = x0 * mat[1] + y0 * mat[5] + z0 * mat[9] + mat[13];
      //sz0 = x0 * mat[2] + y0 * mat[6] + z0 * mat[10] + mat[14];
      
      sx1 = x1 * mat[0] + y1 * mat[4] + z1 * mat[8] + mat[12];
      sy1 = x1 * mat[1] + y1 * mat[5] + z1 * mat[9] + mat[13];
     // sz1 = x1 * mat[2] + y1 * mat[6] + z1 * mat[10] + mat[14];

      sx2 = x2 * mat[0] + y2 * mat[4] + z2 * mat[8] + mat[12];
      sy2 = x2 * mat[1] + y2 * mat[5] + z2 * mat[9] + mat[13];
     // sz2 = x2 * mat[2] + y2 * mat[6] + z2 * mat[10] + mat[14];

      //backface culling - check winding
     
        sx0 /= w0; sy0 /= w0; sx1 /= w1; sy1 /= w1;   sx2 /= w2; sy2 /= w2; 

        sx0 *= rendw;  sy0 *= -rendh;    sx0 += rendw;  sy0 += rendh;   
        sx1 *= rendw;  sy1 *= -rendh;    sx1 += rendw;  sy1 += rendh;
        sx2 *= rendw;  sy2 *= -rendh;    sx2 += rendw;  sy2 += rendh;
        
        if (cullTri)
        { if (((sx1 - sx0) * (sy2 - sy0) - (sx2 - sx0) * (sy1 - sy0)) > 0) { return; } }
          
  
        w0 = 1 - (1.0 / w0);      w1 = 1 - (1.0 / w1);      w2 = 1 - (1.0 / w2);
 
        //fixes holes 
        sx0 |= 0;        sy0 |= 0;
        sx1 |= 0;        sy1 |= 0;
        sx2 |= 0;        sy2 |= 0;
 

      drawTri(sx0, sy0, w0, u0,v0,  sx1,sy1, w1, u1,v1,  sx2, sy2, w2, u2,v2);
      
    }//drawProjTri
    
         
         
      //todo   -- auto call this from 
      var vecTri = 0;      
      function clearTri()
      {
       var i;
       vecTri = [];
       for (i=0;i<1024;i+=1)
       { vecTri.push( { sortCode:0, x0:0, y0:0, z0:0,  x1:0, y1:0, z1:0,   x2:0, y2:0, z2:0,
         u0:0, v0:0, u1:0, v1:0,  u2:0,  v2:0 } ); }
      }//cleartri
  
  
  //vecface vecvert vecuv  object matrix 
      function drawMesh(vf, vec, vuv, mat)
      {
        var k; var i; var num; var it; var tri;
        var rx; var ry; var rz;   var x0; var y0; var z0;
        var x1; var y1; var z1;   var x2; var y2; var z2;    
        
        if (vecTri == 0) { clearTri(); } //just call it after the function def instead?
        
        it = 0;
        num = vf.length;
        for (k=0;k<num;k+=3)
        {
          tri = vecTri[it]; it+=1; if (it>=1024) { return; } //todo -- break;

          i = vf[k] * 3;  rx = vec[i]; ry = vec[i+1]; rz = vec[i+2]; 
           tri.x0 = rx * mat[0] + ry * mat[4] + rz * mat[8] +  mat[12];
           tri.y0 = rx * mat[1] + ry * mat[5] + rz * mat[9] +  mat[13]; 
           tri.z0 = rx * mat[2] + ry * mat[6] + rz * mat[10] + mat[14]; 

          i = vf[k+1]*3;  rx = vec[i]; ry = vec[i+1]; rz = vec[i+2];       
           tri.x1 = rx * mat[0] + ry * mat[4] + rz * mat[8] +  mat[12];
           tri.y1 = rx * mat[1] + ry * mat[5] + rz * mat[9] +  mat[13]; 
           tri.z1 = rx * mat[2] + ry * mat[6] + rz * mat[10] + mat[14]; 

          i = vf[k+2]*3;  rx = vec[i]; ry = vec[i+1]; rz = vec[i+2];  
           tri.x2 = rx * mat[0] + ry * mat[4] + rz * mat[8] +  mat[12];
           tri.y2 = rx * mat[1] + ry * mat[5] + rz * mat[9] +  mat[13]; 
           tri.z2 = rx * mat[2] + ry * mat[6] + rz * mat[10] + mat[14];     
           
          i = vf[k+0] * 2;
          tri.u0 = vuv[i+0];
          tri.v0 = vuv[i+1];
          i = vf[k+1] * 2;
          tri.u1 = vuv[i+0];
          tri.v1 = vuv[i+1];
          i = vf[k+2] * 2;
          tri.u2 = vuv[i+0];
          tri.v2 = vuv[i+1];
          
           tri.sortCode =  32768+(((tri.x0 + tri.x1 + tri.x2+ tri.y0 + tri.y1 + tri.y2+tri.z0 + tri.z1 + tri.z2) * 0.33));
           
        }//nextk
        
        for (i=0;i<it;i+=1)
        {
          tri = vecTri[i];
          drawCut(tri, 0);
        }//nexti
        
      }//drawmesh
    
  

  
     
     
