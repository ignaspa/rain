
const initial_R = 5;
//this will be the inital radius of each puddle

const break_point = 10;
//this is the point at which the big circle will require a little middle circle

const edge = 5;
//this is the distance between the outer "edge" of the circle
//and the inner "edge" of the circle

const colorlibrary = ["#379b54", "#d9ff51", "#006caf", "#ffb7ef", "#ffa89b"
, "#b21700", "#b3efc8", "#5f308e", "#085166"];
//this is our color library, from which the "floor" and the "rain" colors will
//be selected

const size_inflation = 5;
//this is how fast the puddles expand

const end = [20,30,60,100];
//this is the list of random radii at which puddles will expand

var bigcolor = "";
//this is the initalization of the floor color so it can exist out of the
//render function as a whole and in the puddle.render() as well

var smallcolor = "";
//this is the initalization of the rain color so it can exist out of the
//render function as a whole and in the puddle.render() as well


var begin = false;
//this is the boolean that will be true when the user wants the rain to start

var puddles = [];
//this is our library of puddles on screen

var timer = 0;
//this is the timer, it will be used as a measure for when new colors should be
// created and added to puddles[]

var first = true
//this is simply the indicator for when the user first wants the rain to start,
//so the bigcolor and smallcolor get chosen and puddles begin


var canvas = document.createElement('canvas');
//creates a canvas

var width
var height
var context
//initialze the variables of width, height, context for later use


window.onload = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  width = canvas.width;
  height = canvas.height;
  context = canvas.getContext('2d');
  document.body.appendChild(canvas)
  animate(step)
}
//matches the canvas to the dimensions of the browser window
//begins the animate callback process with the step function


var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000/60) };
//tells the browser how to decide the occurence of frames

var step = () => {

    update();

    render();

    animate(step);

}
//the function that calls itself and the frame update




class Puddle {

  constructor(x, y){
    this.x = x;
    this.y = y;
    this.radius = initial_R;
    //inital radius and position

    this.middle = false;
    //this is the boolean which dictates if the middle circle of a puddle
    //gets rendered

    this.end = end[Math.floor(Math.random()*end.length)];
    //decides a random point at which the puddle should end
  }

  render() {
    context.beginPath();
    context.fillStyle = smallcolor;
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    context.fill()
    //draws the big "outer" circle

    if (this.middle){
      context.beginPath();
      context.fillStyle = bigcolor;
      context.arc(this.x, this.y, this.radius - edge , 0, 2 * Math.PI)
      //makes sure to have the difference between the outer edge and the inner
      //edge the predetermined measure
      context.fill()
      //if this.middle is true the "inner" circle will be drawn too
    }
  }


 update(){
   if (this.radius == break_point){
     this.middle = true;
     //if the puddle radius is big enough, this.middle should be true to
     //start the drawing of the middle/inner circle
   }

   this.radius += 1;
   //increments radius (causes puddle to grow)

   if (this.radius >= this.end ){
     puddles.splice(puddles.indexOf(this), 1);
     //this is where the puddle checks if it should end according to the
     //randomly predetermined end radius, and once it takes it out of
     //the library it is not referenced and eventually will not affect
     //memory
   }


 }

}





window.addEventListener("keydown",
  function(event){
     if (event.keyCode == 71){
       begin = true
       //checks if user pressed "g" and so wants the rain to begin
     }
  }
);




window.addEventListener("resize",
  function(event){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    var width = canvas.width
    var height = canvas.height
    //resizes the window as necessary
  }
);


var update = () => {
  if (begin){
    timer += 10;
    //increments the timer
  }

  for (i = 0; i < puddles.length; i++) {
    puddles[i].update();
    //updates the attributes of each puddle in the puddles[] library
  }

  if (begin && (timer >= 60)) {
    puddles.push(new Puddle(Math.random()*width + 1, Math.random()*height + 1))
    timer = 0
    //creates a new puddle
  }


}



var render = () => {





  if (begin == false){
    context.fillStyle = "#000000"
    context.fillRect(0,0, width, height)
    context.font = "25px Courier New";
    context.fillStyle = "orange";
    context.textAlign = "center"
    context.fillText("Press [g] /\\ Pousser [g]", 0.5 * canvas.width, 0.5 * canvas.height);
    //inital "start" page
  }


  if (begin == true && first == true){
    bigcolor = colorlibrary[Math.floor((Math.random() * colorlibrary.length))];
    //picks the big color from the color library randomly

    context.fillStyle = bigcolor
    context.fillRect(0,0, width, height)
    //paints the background the big color

    colorlibrary.splice(colorlibrary.indexOf(bigcolor), 1);
    smallcolor = colorlibrary[Math.floor((Math.random() * colorlibrary.length))];
    //removes the already chosen color from the library and and another
    //random one to be the "edge color"


    first = false;
    //indicates the fact that the this whole section has happened and that
    //the colors should not be chosen again
  }




  if (begin && (first == false)){
    context.fillStyle = bigcolor
    context.fillRect(0,0, width, height)
    //colors the canvas bigcolor each frame

    for (i = 0; i < puddles.length; i++) {
      puddles[i].render();
      //goes through the puddles[] library and renders all the puddles
    }
  }



}
