

//https://developer.mozilla.org/en-US/docs/Web/API/ImageData
//imagedata is     width   height     data   (data is Uint8ClampedArray )

  // https://stackoverflow.com/questions/10754661/javascript-getting-imagedata-without-canvas
  //thanks to chrome we cannot do this
  function getImageAsData(img)
  {
   var canvas = document.createElement('canvas');
   var context = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0 );
    var myData = context.getImageData(0, 0, img.width, img.height);
   return myData;   
  }//getasdata
  
  
   //loading the image itself is blocked .. 
  var skinArray = [];
  function loadImageToSkin(imgName, useName)
  {
    var img= new Image();    
    img.src = imgName;
    img.crossOrigin = "Anonymous"; //doesnt work
    img.onload = function()  
    {
      skinArray[useName] = getImageAsData(this);
    }
  }//loadimagetoskin
  
  
  function setSkin(skinName)
  {
    var imgdat = skinArray[skinName];
    //console.log("imgdat ", imgdat);
    if (imgdat != undefined)
    {
     texw = imgdat.width;
     texh = imgdat.height;
     texData = imgdat.data;
    }
  }//setskin
     

   //1024x1024  64x64  tiles only 
  function loadImageAsTile(img)
  {
   var canvas = document.createElement('canvas');
   var context = canvas.getContext('2d');
    canvas.width = 64; //img.width;
    canvas.height = 64; //img.height;
    
    var k; var i; var t;
    t = 0;
    for (i=0;i<16;i+=1)
    {
     for (k=0;k<16;k+=1)
     {
       //todo -- draw without blend
       context.drawImage(img, k*64,i*64, 64,64 , 0,0, 64,64 );     
       skinArray[t] = context.getImageData(0, 0, 64, 64);
      t+= 1;
     }
    }
 
  }//loadImageAsTile
  
  function loadTileToSkin(imgName)
  {
    var img= new Image();    
    img.src = imgName;
    img.onload = function()  
    { loadImageAsTile(this); }
  }//loadTileToSkin
  
    
    