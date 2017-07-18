//////////HM-5 TRIVIA GAME //////////////
/////CHAMPIONS LEAGUE 2017 QUIZ/////////
////////////////////////////////////////



//////LOADING PAGE CALLING FUNCTIONS - STARTING THE GAME///////
$(document).ready(function() {
  load();
  $("#btnStart").click(start);
  $("#btnRestart").click(restart);
});

/////GLOBAL VARIABLES//////
var time;
var bollean = false;
var count = 3;
var i = 0;
var selectedObject;
var retrieve = [];
var numUnanswered = 0;
var correctAnswers = 0;
var incorrectAnswers = 0;

///////CREATING AN ARRAY WITH OBJECTS/////////////////////////
var quiz = [
           {questions: 'What is the highest scoring match so far\?',
           answer: ["Man. City vs Monaco","Barcelona vs PSG","Dortmund vs Legia","Napoli vs Benfica","Porto vs Roma"],
           correct: 2,
           image: "dortmundvslegia.jpg"},
           {questions: 'Who scored the first goal of the campaign\?',
           answer: ["Lionel Messi","Edison Cavani","Jonathan Cafu","Cristiano Ronaldo","Paul Pogba"],
           correct: 1,
           image: "cavani.gif"},
           {questions: "What was the score in both group games between Real Madrid - Dortmund\?",
           answer: ["1-0","1-1","2-1","2-2","0-0"],
           correct: 3,
           image: "rmvsdortmund.jpg"},
           {questions: "Which of these teams did not finish top of their group\?",
           answer: ["Bayern Munich","Barcelona","Monaco","Liecester","Juventus"],
           correct: 0,
           image: "bayern.gif"},
           {questions: "Who is the compatitions top scorer\?",
           answer: ["Cristiano Ronaldo","Lionel Messi","Robert Lewandowski","Pierre-Emerick Aubaeyang","Eden Hazard"],
           correct: 1,
           image: "messi.gif"},
           {questions: "Which goalkeeper saved two penalties in the round of 16\?",
           answer: ["Roman Burki","Gianlugi Buffon","Ederson","Thibaut Courtois","Kasper Schmiechel"],
           correct: 4,
           image: "kasper.gif"},
           {questions: "Which team exited in the group stage despite conceding only 2 goals\?",
           answer: ["Lyon","Sporting CP","Kobenhavn","Liverpool","Tottenham"],
           correct: 2,
           image: "Kobenhavn.png"},
           {questions: "What stadium did host the final\?",
           answer: ["Principality Stadium UK","Old Trafford UK","Alianz Arena Germany","Parc des Princes","Camp Nou"],
           correct: 0,
           image: "stadium.jpg"},
           {questions: "Which teams played the final\?",
           answer: ["Roma vs Lyon","Chelsea vs Bayern Munich","PSG vs Barcelona","Real Madrid vs Juventus","Man City vs Dortmund"],
           correct: 3,
           image: "juventus-vs-Real-Madrid.gif"},
           {questions: "Who won the CL Final\?",
           answer: ["Real Madrid","Monaco","Liverpool","Leverkusen","AC Milan"],
           correct: 0,
           image: "rm.gif"}];

       //Random Question Generator with input choices//
       //Creating forms and inputs
       function pickQuestion(){
          //controlling whether game is over or not preparing restart.
          if (bollean){
            quiz = $.merge(retrieve,quiz);
            bollean = false;
          }
              count = 7;
              var ran = Math.floor(Math.random()*quiz.length);
              var que = $("<h2>", {
                  text: quiz[ran].questions,
                  });
              $("#questions").append(que);

              var form = $("<form>");
              form.insertAfter(que);

              for (var j=0; j<5; j++){
                //generating radio type inputs with value and class
                  var input = $('<input name = "radioInputs"  class = "choices" type = "radio">'+'<span id="ans">'+quiz[ran].answer[j]+'</span></input><br>');
                  input.attr("value",quiz[ran].answer[j]);
                  form.append(input);
              }
              //deleting selected object.
              selectedObject = quiz.splice(ran,1)[0];
              //retrieving quiz object for restart
              retrieve.push(selectedObject);
              i++;
          }

      //waits for players response to start the game Loads the quiz in the background//
      function load (){
        $("#introSong").trigger("play");
        $("#start").hide();
        $("#start").fadeIn(2000);
        $("#btnStart").animate({height: "120px"},1000);
        $("#questions").hide();
        $(".time").hide();
        $("#results").hide();
        pickQuestion();
        $("#unAnswered").html(numUnanswered);
        $("#correct").html(correctAnswers);
        $("#incorrect").html(incorrectAnswers);
      }
      //Player clicks the start button and quiz starts timer ticking//
      function  start(){
        $("#start").hide();
        $(".time").show();
        $("#questions").show();
        timer();
      }
      //If player finishes quiz before time can click the done button to see results//
      function done(){
        clearTimeout(time);
        bollean = true;
        i=0;
        $("#results").show();
        $("#questions").hide();
        $("#questions").empty();
        $("#introSong").trigger("pause");
      }

      //Recursive Function TIMER - setTimeout used/////
      function timer () {

        $("#countDown").html(count);  //printing timer
        count--;

        /////5 questions has been asked end of the game///////
        if(i>5){
          done();
        }

        /////if player checkes an input/////
        else if($('.choices').is(":checked")){
          click();
        }

        ////unAnswered time is up////
        else if (count < 0){
          clearTimeout(time);
          numUnanswered++;
          $("#unAnswered").html(numUnanswered);
          $("#questions").empty();
          $("#questions").html("<h2>CORRECT ANSWER IS " + selectedObject.answer[selectedObject.correct] + "</h2>");
          $("#questions").append($("<img src = assets/images/"+selectedObject.image+">"));
          $("img").hide();
          $("img").fadeIn(3000);
          time = setTimeout(function(){
              $("#questions").empty();
              pickQuestion();
              timer();
          },4000);
        }
        ////no action timer counts down////
        else {
          time = setTimeout(timer, 1000);
        }
      }

      //Function Calculates and records the result//
      function click(){

          clearTimeout(time);
              //If the answer is correct
            if ($(".choices:checked").val() === selectedObject.answer[selectedObject.correct]) {
              correctAnswers++;
              $("#correct").html(correctAnswers);
              $("#questions").html("<h2>CORRECT!!!</h2>");
              $("#questions").append($("<img src =assets/images/"+selectedObject.image+">"));
              $("img").hide();
              $("img").fadeIn(3000);
              time = setTimeout(function(){
                $("#questions").empty();
                pickQuestion();
                timer();
              },4000);
            }

            ////If the answer is incorrect
            else {
              incorrectAnswers++;
              $("#incorrect").html(incorrectAnswers);
              $("#questions").html("<h2>INCORRECT!!! CORRECT ANSWER IS " +selectedObject.answer[selectedObject.correct]+"</h2>");
              $("#questions").append($("<img src =assets/images/"+selectedObject.image+">"));
              $("img").hide();
              $("img").fadeIn(3000);
              time = setTimeout(function(){
                $("#questions").empty();
                pickQuestion();
                timer();
              },4000);
            }
      }

      //////RESART GAME NOT REFRESHING THE PAGE//////
      function restart(){
        numUnanswered = 0;
        correctAnswers = 0;
        incorrectAnswers = 0;
        load();
        start();
      }
