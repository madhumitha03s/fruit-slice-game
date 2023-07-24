var playing = false;
var score;
var trialsLeft;
var fruitNum;
var step;
var action;

$(function () {
  // click on the start or reset button
  $("#startreset").click(function () {
    // if user is playing
    if (playing == true) {
      location.reload(); // reload page
    } else {
      // if user is not playing

      // change mode to playing - initiate game
      playing = true;

      // hide welcome message
      $("#welcome").hide();

      // set score to 0
      score = 0;
      $("#scorevalue").html(score);

      // show trials left
      $("#trialsLeft").show();
      trialsLeft = 3;
      addHearts();

      // hide gameover box
      $("#gameOver").hide();

      // change button to reset
      $("#startreset").html("Reset Game");

      // start sending fruits
      startAction();
    }
  });
});

$("#fruit").mouseover(function () {
  score++;
  // update score
  $("#scorevalue").html(score);

  // play slice sound
  // document.getElementById("slicesound").play();
  $("#slicesound")[0].play();

  // stop fruit
  clearInterval(action);
  // hide fruit
  $("#fruit").hide("explode", 500);
  // drop new fruit
  setTimeout(startAction, 800);
});

// functions

// populate trialsLeft box
function addHearts() {
  $("#trialsLeft").empty();
  for (i = 0; i < trialsLeft; i++) {
    $("#trialsLeft").append('<img src="images/heart.png" class="life"/>');
  }
}

// start dropping fruits
function startAction() {
  // generate a fruit
  $("#fruit").show();
  // choose a random fruit
  chooseFruit();
  $("#fruit").css({ left: Math.round(550 * Math.random()), top: -50 });

  // generate a random step
  step = Math.round(5 * Math.random()) + 1;
  // move fruit down by one step every 10ms
  action = setInterval(function () {
    $("#fruit").css("top", $("#fruit").position().top + step);

    // check if fruit crossed lower limit
    if ($("#fruit").position().top > $("#fruitsContainer").height()) {
      // check if user has more trials
      if (trialsLeft > 1) {
        // generate a fruit
        $("#fruit").show();
        // choose a random fruit
        chooseFruit();
        $("#fruit").css({ left: Math.round(550 * Math.random()), top: -50 });

        // generate a random step
        step = Math.round(5 * Math.random()) + 1;

        // reduce trials by one
        trialsLeft--;
        // populate trialsLeft box
        addHearts();
      } else {
        // game over
        playing = false;
        $("#startreset").html("Start Game");
        $("#gameOver").show();
        $("#gameOver").html(
          "<p>Game Over!</p><p>Your score is " + score + ".</p>"
        );
        $("#trialsLeft").hide();
        stopAction();
      }
    }
  }, 10);
}

// choosing a random fruit to drop
function chooseFruit() {
  fruitNum = Math.round(8 * Math.random()) + 1;
  $("#fruit").attr("src", "images/fruit0" + fruitNum + ".png");
}

// stop dropping fruits
function stopAction() {
  clearInterval(action);
  $("#fruit").hide();
}
