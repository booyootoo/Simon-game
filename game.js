var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0

$(document).on("keypress", function() {
    if(level === 0) {
        $("#level-title").text("Level " + level);
        nextSequence();
    }
});

$(".btn").on("click", function(userChosenColor) {
    userClickedPattern.push(this.id);
    playSound(this.id);
    animatePress(this.id);
    checkAnswer(userClickedPattern.length-1);
    // if(checkAnswer() === 1){
    //     nextSequence();
    // } else {
    //     console.log("Resetting game");
    // }
    
});

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    //Animate the button
    $("#"+randomChosenColor).fadeOut().fadeIn();
    playSound(randomChosenColor);

    $("#level-title").text("Level " + level);
    level++;
}

// function playSound(buttonID) {
//     //playing the audio part. Had to create an audio element in the html.
//     var audioToPlay = document.getElementById("audio-"+buttonID);
//     audioToPlay.play();
// }

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }
  

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(numberOfPlays) {
    if (gamePattern[numberOfPlays] === userClickedPattern[numberOfPlays]) {
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
        //console.log("fail");
        //return 0;
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}