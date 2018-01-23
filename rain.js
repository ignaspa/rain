
const initial_R = 5;
const break_point = 10;
const edge = 5;
const colorlibrary = ["#379b54", "#d9ff51", "#006caf", "#ffb7ef", "#ffa89b"
, "#b21700", "#b3efc8", "#5f308e", "#085166"];
const size_inflation = 5;





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








class Puddle {

  constructor(x, y){
    this.x = x;
    this.y = y;
    this.radius = initial_R;

  }

  render() {
    context.beginPath();
    context.fillstyle = color;
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    context.fill()
  }


 update(){



 }
}





var step = () => {

  update()

  render()
}

}

window.addEventListener("keydown",
  function(event){
     if (event.keyCode == 65){
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

  for (i = 0; i < puddles.length; i++) {
    puddles[i].update();
  }

}




var playerOne = new Paddle(canvas.width/2 - PADDLE_WIDTH/2,0, "topL", "topR")
var playerTwo = new Paddle(canvas.width/2- PADDLE_WIDTH/2, height - PADDLE_HEIGHT, "botL", "botR")
var ballOne = new Ball(0.5 * canvas.width, 0.5 * canvas.height)




var render = () => {
  context.fillStyle = "#000000"
  context.fillRect(0,0, width, height)

  if (begin == true){


  }



}
}
