
const initial_R = 5;
const break_point = 10;
const edge = 5;
const colorlibrary = ["#379b54", "#d9ff51", "#006caf", "#ffb7ef", "#ffa89b"
, "#b21700", "#b3efc8", "#5f308e", "#085166"];
const size_inflation = 5;

var bigcolor = "";
var smallcolor = "";
var begin = false;
var puddles = [];
var timer = 0;
debugger

var canvas = document.createElement('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var width = canvas.width;
var height = canvas.height;
var context = canvas.getContext('2d');


window.onload = () => {
  document.body.appendChild(canvas)
  animate(step)
}



var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000/60) };


var step = () => {

    update();

    render();

    animate(step);

}





class Puddle {

  constructor(x, y){
    this.x = x;
    this.y = y;
    this.radius = initial_R;
    this.middle = false;
  }

  render() {
    context.beginPath();
    context.fillstyle = smallcolor;
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    context.fill()
    if (this.middle){
      context.fillstyle = bigcolor;
      context.arc(this.x, this.y, this.radius - edge , 0, 2 * Math.PI)
      context.fill()
    }
  }


 update(){
   if (this.radius == break_point){
     this.middle = true;
   }
   this.radius += 1;

 }
}





window.addEventListener("keydown",
  function(event){
     if (event.keyCode == 71){

       begin = true

     }

  }
);




window.addEventListener("resize",

  function(event){

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    var width = canvas.width
    var height = canvas.height

    }
);


var update = () => {
  timer += 10;
  for (i = 0; i < puddles.length; i++) {
    puddles[i].update();
  }
  if (begin) {
    puddles.push(new Puddle(Math.random()*width + 1, Math.random()*height + 1))
  }


}



var render = () => {





  if (begin == false){
    context.fillStyle = "#000000"
    context.fillRect(0,0, width, height)
    context.font = "25px Courier New";
    context.fillStyle = "orange";
    context.textAlign = "center"
    context.fillText("Press [g] // Pousser [g]", 0.5 * canvas.width, 0.5 * canvas.height);

  }


  if (begin == true){
    console.log("begin is now true!")
    bigcolor = colorlibrary[Math.floor((Math.random() * colorlibrary.length)) + 1];
    console.log(bigcolor);
    context.fillStyle = bigcolor
    context.fillRect(0,0, width, height)
    delete colorlibrary[colorlibrary.indexOf(bigcolor)];
    smallcolor = colorlibrary[Math.floor((Math.random() * colorlibrary.length)) + 1];
    if (timer%60==0){
      for (i = 0; i < puddles.length; i++) {
        puddles[i].render();
      }
    }



  }



}
