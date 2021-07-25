
var buttonColor = ["red" , "blue" , "green" , "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var currentLevel = -1;
var anyKey = false;
function nextSequence(){
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random()*4);
  level++;
  var randomColorChoosen = buttonColor[randomNumber];
  gamePattern.push(randomColorChoosen);

  $("#level-title").text("level  " + level);
  $("#" + randomColorChoosen).fadeIn(100).fadeOut(100).fadeIn(100);
  randomColorChoosen = "sounds/" + randomColorChoosen + ".mp3";
  playSound(randomColorChoosen);
}


$(".btn").on("click" , function(){
  userClickedPattern.push(this.id);
  playSound("sounds/" + this.id + ".mp3");
  animatePress(this.id);
  checkSequenc(gamePattern , userClickedPattern);
});

function playSound(sound){
  var audio = new Audio(sound);
  audio.play();
}

function animatePress(currentColor){
  console.log(currentColor);

  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  } , 120);
}

$(document).on("keypress" , function(event){
  level = 0;
  anyKey = true;
  if(anyKey === true){
    nextSequence();
  }
});


function checkSequenc(gameP , userClickP){
  currentLevel++;
  console.log(currentLevel);
  console.log(gameP);
  console.log(userClickP);
  if(gameP[currentLevel] != userClickP[currentLevel]){
    playSound("sounds/wrong.mp3");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
  else if(gameP.length == userClickP.length){
    currentLevel = -1;
    setTimeout(function(){
      nextSequence();
    },1000);
  }
}

function startOver(){
  gamePattern = [];
  level = 0;
  currentLevel = 0;
  userClickedPattern = [];
  anyKey = false;
}
