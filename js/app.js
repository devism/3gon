/***********************************************
  TODO's

  5. so button will now have a sub menu of options!
     rect type - diff rect types
     random rect type - diff random rect types
     rect color - diff rect color choices, maybe split up by pallette
     Background color - same as above 

  1. so now create submenus

  6.buttons for random effects (pick best ones)
  7.color scheme templates based on color theories 
  8.optmize! svg is mega slow since its added to the dom 
  9.canvas may be the solution if optimization is not enough
  10. make a reset/clear button 
  11. save as svg
  12. randomize generator
  13.
  
  touch interactions need to be smooth, so those effects will be different from 
  buttons
  
*************************************************/

////////////////////////////////////////
///  makes window not move - ios
///////////////////////////////////////
///

function init(){


  var elems = document.querySelectorAll('ul');

  for ( var i=0, len = elems.length; i < len; i++ ){
         
          var elem = elems[i];
          var flkty =  new Flickity(elem, {
              // options
              // wrapAround: true,
              freeScroll: true,
              contain: true,
              // disable previous & next buttons and dots
              prevNextButtons: false,
              pageDots: false
          });
  } 


  rectMenu();
}


 /////////////// background color ///////////
var hueb = new Huebee( '.current-color', {
      // options
      notation: 'hex',
      saturations: 2,
    });

hueb.on( 'change', function( color ) {
      // console.log( 'color changed to: ' + color )
      document.body.style.backgroundColor = color;
    });

///////////////// shape color ////////////////////
var huebShape = new Huebee( '.current-color-shape', {
      // options
      notation: 'hex',
      saturations: 2,
    });


var shapeColor;
huebShape.on( 'change', function( color ) {
      // console.log( 'color changed to: ' + color )
      shapeColor = color;
    });


//////////////// outline Color /////////////////
var huebStroke = new Huebee( '.current-color-stroke', {
      // options
      notation: 'hex',
      saturations: 2,
    });


var strokeColor;
huebStroke.on( 'change', function( color ) {
      // console.log( 'color changed to: ' + color )
      strokeColor = color;
    });




/////////////////// lock app from moving around when touching app ////////////
var xStart, yStart = 0;

document.addEventListener('touchstart',function(e) {
  xStart = e.touches[0].screenX;
  yStart = e.touches[0].screenY;
}, {passive:false});

document.addEventListener('touchmove',function(e) {
  var xMovement = Math.abs(e.touches[0].screenX - xStart);
  var yMovement = Math.abs(e.touches[0].screenY - yStart);
  if((yMovement * 3) > xMovement) {
      e.preventDefault();
  }
}, {passive:false}); 

///////////////////////////////////////
/// create Raphael object
/// ///////////////////////////////////
var paper = Raphael("container");
paper.setViewBox(0,0,320,560,true);
paper.setSize('100%', '100%');




//////////////////////////////
/// EVENT LISTENERS 
//////////////////////////////
document.getElementById('deleteShape').addEventListener("click", deleteShape);
document.getElementById('rectMenu').addEventListener("click", rectMenu);



var rectMode = false;


var shapeBtn1 = document.createElement("li");
var shapeBtn2 = document.createElement("li");
var shapeBtn3 = document.createElement("li");
var shapeBtn4 = document.createElement("li");
var shapeBtn5 = document.createElement("li");
var shapeBtn6 = document.createElement("li");


shapeBtn1.onclick = function() {
    addRect();
  }

shapeBtn2.onclick = function() {
  addRect2();
} 

shapeBtn3.onclick = function() {
  addRect3(); 
}


shapeBtn4.onclick = function() {
  addRect4(); 
  
}

shapeBtn5.onclick = function() {
  addRect5(); 
  
}

shapeBtn6.onclick = function() {
  addCirc(); 
  
}




function rectMenu(){

  var flkty2 = new Flickity( '.menu2', {
    // options
    initialIndex: 0,
    wrapAround: true,
    freeScroll: true,
    contain: true,
    // disable previous & next buttons and dots
    prevNextButtons: false,
    pageDots: false
  });



  // what is the rectMenu
  // this.style.backgroundColor = '#635EB1';
  document.getElementById('rectMenu').style.backgroundColor = '#635EB1';

   //build the menuRect options
 
  shapeBtn1.classList.add('optionBtn');
  shapeBtn1.innerText = 'Rect 1';

  shapeBtn2.classList.add('optionBtn');
  shapeBtn2.innerText = 'Rect 2';

  shapeBtn3.classList.add('optionBtn');
  shapeBtn3.innerText = 'Rect 3';

  shapeBtn4.classList.add('optionBtn');
  shapeBtn4.innerText = 'Rect 4';

  shapeBtn5.classList.add('optionBtn');
  shapeBtn5.innerText = 'Rect 5';

  shapeBtn5.classList.add('optionBtn');
  shapeBtn5.innerText = 'Rect 5';

  shapeBtn6.classList.add('optionBtn');
  shapeBtn6.innerText = 'circ 6';

  // add the newly created element and its content into the DOM 
  // var menu = document.getElementsByClassName('flickity-slider');/
  flkty2.insert(shapeBtn1,0);
  flkty2.insert(shapeBtn2,1);
  flkty2.insert(shapeBtn3,2);
  flkty2.insert(shapeBtn4,3);
  flkty2.insert(shapeBtn5,4);
  flkty2.insert(shapeBtn6,5);



 


}




document.getElementById('shapeOutline').addEventListener("click", function(){

});




var deleteMode = false;
document.getElementById('deleteShape').style.background = 'gray';

function deleteShape(){
  
  var delColor = document.getElementById('deleteShape').style.background;
  console.log('TEST 2: ' + delColor);
  if(delColor == 'gray'){
     document.getElementById('deleteShape').style.background = '#FF7878';
     deleteMode = true;


  } else {
    document.getElementById('deleteShape').style.background = 'gray';
    deleteMode = false;
  }
}

function addCirc(){

  var wireShape = paper.set();

  var xpos = randomX();
  var ypos = randomY();

  for(var i = 0; i < 60; i++){
        
    //cnage  size of rect by passing in variable  thats
    //set from sizeUp/sizeDown
    //paper.rect(90+i,120+i++,200,20)
    
    var circle = paper.circle(xpos+i,ypos+i++,50,20);

    circle.attr("fill", shapeColor);
    circle.attr("stroke", strokeColor);
    wireShape.push(circle);
  }

  dragShape(wireShape);

}

var rectSize = 100; // Initial size for rectangles
var circleSize = 50; // Initial size for circles
var shapes = paper.set();

// Function to increase the size of the rectangle
function sizeUp(rect) {
  var currentRectSize = rect.attr("width");
  currentRectSize += 10; 
  rect.attr("width", currentRectSize); 
  rect.attr("height", currentRectSize); // Assuming you want to change both width and height
}
// Function to increase the size of the rectangle
function sizeDown(rectSet) {
  rectSet.forEach(function(rect) {
    var currentRectSize = rect.attr("width");
    if (currentRectSize > 10) {
      currentRectSize -= 10;
      rect.attr({ "width": currentRectSize, "height": currentRectSize });
    }
  });
}



var increaseSizeButton = document.getElementById('increaseSize');
var decreaseSizeButton = document.getElementById('decreaseSize');

// Update event listeners
increaseSizeButton.addEventListener('click', function() {
  if (selectedRect) {
    sizeUp(selectedRect);
  }
});
decreaseSizeButton.addEventListener('click', function() {
  if (selectedRect) {
    sizeDown(selectedRect);
  }
});

// document.body.appendChild(sizeUpButton);

function dragShape(whichShape){

   //this remembers the last drag position
  whichShape.drag(
    function(dx, dy, x, y, e) {
      
      whichShape.transform(this.data("mytransform")+'T'+dx+','+dy); 
      whichShape.rotate(dx);
      whichShape.rotate(dy);
      },
      function(x, y, e) { //dragstart
      
      whichShape.data("mytransform", this.transform()); },
      function(e) { //dragend
     
      whichShape.data("mytransform", this.transform()); }
  );

  whichShape.mouseup(function(){

    // detect if canvas has stuff too. 
    // if delete is true and canvas.length > 1 then remove....
    if(deleteMode == true){
      whichShape.remove();
    } else {
      
      document.getElementById('deleteShape').style.background = 'gray';
    }

  });


}



var selectedRect = null; 

function addRect(){
  // console.log(deleteMode); 
  var wireRectSet = paper.set();
  selectedRect = wireRectSet;

  var xpos = randomX();
  var ypos = randomY();

  for (var i = 0; i < 100; i++) {
    var rect = paper.rect(xpos + i, ypos + i++, rectSize, rectSize);
    rect.attr("fill", shapeColor);
    rect.attr("stroke", strokeColor);
    wireRectSet.push(rect);
    // shapes.push(rect);

    wireRectSet.forEach(function(rect) {
      rect.click(function () {
        console.log('Rectangle in group clicked');
        selectedRect = wireRectSet; // Referencing the entire group
        // Apply a visual cue to the whole group if needed
      });
    });
    
  }




  //this remembers the last drag position
  wireRectSet.drag(

    
    
    
    function(dx, dy, x, y, e) {
      
      wireRectSet.transform(this.data("mytransform")+'T'+dx+','+dy); 
      wireRectSet.rotate(dx);
      wireRectSet.rotate(dy);
      },
      function(x, y, e) { //dragstart
      
      wireRectSet.data("mytransform", this.transform()); 
      selectedRect = wireRectSet;
      },
      function(e) { //dragend
     
      wireRectSet.data("mytransform", this.transform()); }
  );

  wireRectSet.mouseup(function(){

    // detect if canvas has stuff too. 
    // if delete is true and canvas.length > 1 then remove....
    if(deleteMode == true){
      wireRectSet.remove();
    } else {
      
      document.getElementById('deleteShape').style.background = 'gray';
    }

  });


}

 


function addRect2(){

  /*=====================================================
  creates long flat rect obj 
  =====================================================*/



  var wireRectSet = paper.set();
  
  var xpos = randomX();
  var ypos = randomY();

  for(var i = 0; i < 40; i++){
        
    //cnage  size of rect by passing in variable  thats
    //set from sizeUp/sizeDown
    //paper.rect(90+i,120+i++,200,20)
    
    var rect = paper.rect(xpos+i,ypos+i++,50,50);

    rect.attr("fill", shapeColor);
    rect.attr("stroke", strokeColor);

    wireRectSet.push(rect);
  }

  //this remembers the last drag position
  wireRectSet.drag(
    function(dx, dy, x, y, e) {
      
      wireRectSet.transform(this.data("mytransform")+'T'+dx+','+dy); 
      wireRectSet.rotate(dx);
      wireRectSet.rotate(dy);
      },
      function(x, y, e) { //dragstart
      
      wireRectSet.data("mytransform", this.transform()); },
      function(e) { //dragend
    
      wireRectSet.data("mytransform", this.transform()); }
  );

  wireRectSet.mouseup(function(){

    // detect if canvas has stuff too. 
    // if delete is true and canvas.length > 1 then remove....
    if(deleteMode == true){
      wireRectSet.remove();
    } else {
      
      document.getElementById('deleteShape').style.background = 'gray';
    }

  });



}

function addRect3(){

  /*=====================================================
  creates long flat rect obj 
  =====================================================*/


  var wireRectSet = paper.set();
  
  var xpos = randomX();
  var ypos = randomY();

  for(var i = 0; i < 20; i++){
        
    //cnage  size of rect by passing in variable  thats
    //set from sizeUp/sizeDown? IS THIS A TODO?
    //paper.rect(90+i,120+i++,200,20)
    
    // places the object in a slightly different place
    var rect = paper.rect(xpos+i,ypos+i++,20,20);

    rect.attr("fill", shapeColor);
    rect.attr("stroke", strokeColor);

    wireRectSet.push(rect);
  }

  //this remembers the last drag position
  wireRectSet.drag(
    function(dx, dy, x, y, e) {
      
      wireRectSet.transform(this.data("mytransform")+'T'+dx+','+dy); 
      wireRectSet.rotate(dx);
      wireRectSet.rotate(dy);
      },
      function(x, y, e) { //dragstart
      
      wireRectSet.data("mytransform", this.transform()); },
      function(e) { //dragend
    
      wireRectSet.data("mytransform", this.transform()); }
  );

  wireRectSet.mouseup(function(){

    // detect if canvas has stuff too. 
    // if delete is true and canvas.length > 1 then remove....
    if(deleteMode == true){
      wireRectSet.remove();
    } else {
      
      document.getElementById('deleteShape').style.background = 'gray';
    }

  });



}

function addRect4(){

  /*=====================================================
  creates long flat rect obj 
  =====================================================*/


  var wireRectSet = paper.set();
  
  var xpos = randomX();
  var ypos = randomY();

  for(var i = 0; i < 90; i++){
        
    //cnage  size of rect by passing in variable  thats
    //set from sizeUp/sizeDown
    //paper.rect(90+i,120+i++,200,20)
    
    var rect = paper.rect(xpos+i,ypos+i++,20,20);

    rect.attr("fill", shapeColor);
    rect.attr("stroke", strokeColor);

    wireRectSet.push(rect);
  }

  //this remembers the last drag position
  wireRectSet.drag(
    function(dx, dy, x, y, e) {
      
      wireRectSet.transform(this.data("mytransform")+'T'+dx+','+dy); 
      wireRectSet.rotate(dx);
      wireRectSet.rotate(dy);
      },
      function(x, y, e) { //dragstart
      
      wireRectSet.data("mytransform", this.transform()); },
      function(e) { //dragend
    
      wireRectSet.data("mytransform", this.transform()); }
  );

  wireRectSet.mouseup(function(){

    // detect if canvas has stuff too. 
    // if delete is true and canvas.length > 1 then remove....
    if(deleteMode == true){
      wireRectSet.remove();
    } else {
      
      document.getElementById('deleteShape').style.background = 'gray';
    }

  });
}

function addRect5(){

  /*=====================================================
  creates long flat rect obj 
  =====================================================*/


  var wireRectSet = paper.set();
  
  var xpos = randomX();
  var ypos = randomY();

  for(var i = 0; i < 50; i++){
        
    //cnage  size of rect by passing in variable  thats
    //set from sizeUp/sizeDown
    //paper.rect(90+i,120+i++,200,20)
    
    //long sketch line?
    // var rect = paper.rect(xpos+i,ypos+i++,20, Math.atan(2)*10/i);

    // strange tirangle shape
    // var rect = paper.rect(xpos+i,ypos+i++,20 + i * Math.cos(2), Math.sin(9)*2*i);


    var rect = paper.rect(xpos+i,Math.atan(0.3+i)*ypos+i++, 2 + Math.random(4.5*i)+2, 20+i+1.5 );


    rect.attr("fill", shapeColor);
    rect.attr("stroke", strokeColor);

    wireRectSet.push(rect);
  }

  //this remembers the last drag position
  wireRectSet.drag(
    function(dx, dy, x, y, e) {
      
      wireRectSet.transform(this.data("mytransform")+'T'+dx+','+dy); 
      wireRectSet.rotate(dx);
      wireRectSet.rotate(dy);
      },
      function(x, y, e) { //dragstart
      
      wireRectSet.data("mytransform", this.transform()); },
      function(e) { //dragend
    
      wireRectSet.data("mytransform", this.transform()); }
  );

  wireRectSet.mouseup(function(){

    // detect if canvas has stuff too. 
    // if delete is true and canvas.length > 1 then remove....
    if(deleteMode == true){
      wireRectSet.remove();
    } else {
      
      document.getElementById('deleteShape').style.background = 'gray';
    }

  });
}


/////// INTERACTION FUNCTIONS //////////
function rotateShape(shape, startingAngle){
  
  while(startingAngle < 360){
      shape.rotate(startingAngle+=2);  
    }
}

function randomX() {
    
    // var min = 20;
    // var max = 120;
    /*=====================================================
     creates obj in slighlty diff area every function call
     make random work witin window range
     =====================================================*/
     var halfWidth = window.innerWidth/2;
     var width = window.innerWidth;
     // console.log(width);

    return Math.floor(Math.random() * (halfWidth - width + 1)) + halfWidth;
}

function randomY() {
  /*=====================================================
   creates obj in slighlty diff area every function call
   make random work witin window range
   =====================================================*/
   var halfHeight = window.innerHeight/2;
   var height = window.innerHeight;
   return Math.floor(Math.random() * (halfHeight - height + 1)) + halfHeight;
}


// function randomColor(){
//   var randColor = colors[Math.floor(colors.length * Math.random())];
//   return randColor;
// }


function interactMouseover(shape){
  
  var startingAngle = 0;
  shape.mouseover(function(e){ 
    this.rotate(startingAngle);
    rotateShape(this, startingAngle);
    startingAngle+=0.5;
  });
  
  
}

function interaction(shape){
  shape.mouseover(function(e){
    // this.attr("fill", "blue");
  });
}



function dragGroupInteraction(shapeSet, shape){
  shapeSet.push(shape);
  shapeSet.data("myset", shapeSet);
 
//   for(var i = 0, len = shapeSet.length; i < len; i++){
//         shapSet.attr("fill", randomColor());
//       }
  
  shapeSet.drag(
    function(dx, dy, x, y, e){
      var myset = this.data("myset");
      myset.transform(this.data("mytransform")+'T'+dx+','+dy);
      //myset.rotate(54);
      rotateShape(myset, 0);  
        
    }
  );
}


init();


