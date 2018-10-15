var rights = 0;
var wrongs = 0;
var timeLeft = 10;
var questionIteration = 0;
var correctOption = "";
var gameInProgress;
var intervalId;

var questionsArrays = [];
var holdQuestions = [];

/* question objects set "question," answer "options," and "correct" answer keys and push object to array */
var actionLeague = {
    question: "Fill in the blank: The Flesh—he’s super strong and super _____.",
    options: ["smart", "handsome", "blonde", "naked"],
    correct: "naked"
}
holdQuestions.push(actionLeague);

var dextersLab = {
    question: "Dexter uses a hidden button to access his laboratory. What’s the title of the book?",
    options: ["The Genius of Me Vol. I", "Chemistry for Geniuses", "Quantum Physics for Lonely People", "Ridiculously Difficult Math 2nd"],
    correct: "The Genius of Me Vol. I"
}
holdQuestions.push(dextersLab);

var powerpuff1 = {
    question: "In the first short episode of The Powerpuff Girls, Fuzzy Lumpkins turns Bubbles' pigtail into a _____?",
    options: ["meatball", "pigtail", "hairball", "chicken drumstick"],
    correct: "chicken drumstick"
}
holdQuestions.push(powerpuff1);

var powerpuff2 = {
    question: "What was the original name for the show, The Powerpuff Girls?",
    options: ["Girl-Power Crime Fighters", "Kick-Ass Girls", "Whoop-Ass Girls", "Sugar, Spice, Everything Nice"],
    correct: "Whoop-Ass Girls"
}
holdQuestions.push(powerpuff2);

var justiceLeague = {
    question: "In the Justice League Unlimited episode, “This Little Piggy,” Batman sings which song?",
    options: ["A Boy Named Sue, Johnny Cash", "Am I Blue, Eddie Cochran", "Mad World, Gary Jules", "Run Pig Run, The Queens of the Stone Age"],
    correct: "Am I Blue, Eddie Cochran"
}
holdQuestions.push(justiceLeague);

var rugrats = {
    question: "What was the name of Angelica’s favorite doll?",
    options: ["Barbie", "Betsy", "Carol", "Cynthia"],
    correct: "Cynthia"
}
holdQuestions.push(rugrats);

var heyArnold = {
    question: "Which of the following did Helga not have?",
    options: ["A lock of Arnold’s hair", "A locket with Arnold’s picture", "A bust of Arnold made out of gum", "She had all of the above"],
    correct: "She had all of the above"
}
holdQuestions.push(heyArnold);

var cowardlyDog1 = {
    question: "Courage the Dog and his owners live out in the middle of  _____?",
    options: ["Florida", "Georgia", "The Saharah", "Nowhere"],
    correct: "Nowhere"
}
holdQuestions.push(cowardlyDog1);

var cowardlyDog2 = {
    question: "Fill in the blank: ____ dog! You made me look bad!",
    options: ["Cowardly", "Silly", "Stupid", "Genius"],
    correct: "Stupid"
}
holdQuestions.push(cowardlyDog2);

var cowChicken = {
    question: "What was the title of the short cartoon segment that played during episodes of Cow and Chicken?",
    options: ["I Am Man", "I Am Legend", "I Am Weasel", "I Am Batman"],
    correct: "I Am Weasel"
}
holdQuestions.push(cowChicken);

var johnnyBravo = {
    question: "What was the dance during the intro of the cartoon, Johny Bravo?",
    options: ["The Monkey", "The Cabage Patch", "The Electric Slide", "The Robocop"],
    correct: "The Monkey"
}
holdQuestions.push(johnnyBravo);

/* function uses holdQuestions as a way to push the questions to the final array in a random order so each round doesn't repeat questions in the same order each time */
function questionOrder() {
    for(i = 0; i < holdQuestions.length; i++ ) {
        do {
            let question = Math.floor(Math.random() * holdQuestions.length);
            if(!questionsArrays.includes(holdQuestions[question])) {
                questionsArrays.push(holdQuestions[question]);
            }
        } while (questionsArrays.length < holdQuestions.length)
    }
}

/* function uses holdAnswer as a way to push the possible answer options into the final answersArray in a random order */
function answerOrder(current) {
    let holdAnswer = [];
    for(i = 0; i < current.options.length; i++) {
        /* this for do while sets up the available answer options in a random order */
        do {
            let answer = Math.floor(Math.random() * current.options.length);
            if(!holdAnswer.includes(current.options[answer])) {
                holdAnswer.push(current.options[answer]);
            }
        } while (holdAnswer.length < current.options.length);
    }
    return holdAnswer;
}

/* function sets the html game text based on the current questionIteration */
function changeQuestionsText(questionIteration) {
    current = questionsArrays[questionIteration];
    $("#questionText").text(current.question);
    let answersArray = answerOrder(current);
    answersArray.forEach(function(op) {
        let aswerText = $("<li>").text(op);
        $("#answerOptions").append(aswerText);
    });
    $("#answerOptions").click(isWrongRight);
}

/* function to reset trivia game html answer text. otherwise it continues to append to previous answer options */
function resetAnswers() {
    $("nextQ").css("display", "none");
    gameInProgress = true;
    contGame();
    questionIteration++;
    console.log("On interation " + questionIteration);
    $("#answerOptions").empty();
    changeQuestionsText(questionIteration);
    correctOption = questionsArrays[questionIteration]["correct"];
    //console.log(correctOption);
}

/* function keeps the game moving forward as time left decrements by 1 each second */
function triviaGame() {
    timeLeft--;
    $("#timeLeft").text(timeLeft);
    if(timeLeft === 0) {
        timeLeft = 11;
        wrongs++;
    }
    if(timeLeft === 10){
        resetAnswers();
    }
}

/* function that determines if users choice is wrong or right. */
function isWrongRight() {
    console.log("click");
    $("#answerOptions").off("click");
    gameInProgress = false;
    pauseGame();
    $("#nextQ").css("display", "block");
    $("#nextQ").click(function() {
        timeLeft = 11;
    });
    if($(event.target).text() === correctOption) {
        console.log("right answer");
        rights++;
    }
    else {
        wrongs++;
        console.log("wrong answer");
    }
    if(questionIteration === 9) {
        gameOver();
    }
}

/* game over function */
function gameOver() {
    $("#gameElements").css("display", "none");
    $("#gameResults").css("display", "block");
    let rightsText = $("<p>").text("Right Answers: " + rights);
    let wrongsText = $("<p>").text("Wrong Answers: " + wrongs);
    $(rightsText).add(wrongsText).appendTo("#gameResults");
    $("#bonusQ").css("display", "block");
    $("#bonusQ").click(function() {
        console.log("clicked to answer bonus question.");
        questionIteration = questionIteration-1;
        resetAnswers()
        timeLeft = 10;
        $("#timeLeft").text(timeLeft);
        $("#gameElements").css("display", "block");
        $("#gameResults").css("display", "none");
    });
}

/* function to reset trivia game */
function resetGame() {
    rights = 0;
    wrongs = 0;
    timeLeft = 10;
    questionIteration = 0;
    correctOption = "";
    questionsArrays = [];
    holdQuestions = [];
}

function pauseGame() {
    if(!gameInProgress) {
        clearInterval(intervalId);
    };
}

function contGame() {
    if(gameInProgress) {
        intervalId = setInterval(triviaGame, 1000);
    };
}

$(document).ready(function() {
    $("#startGame").click(function() {
        $("#startGame").css("display", "none");
        $("#gameElements").css("display", "block");
        questionOrder();
        gameInProgress = true;
        contGame();
        changeQuestionsText(questionIteration);
        correctOption = questionsArrays[questionIteration]["correct"];
        
    });
});