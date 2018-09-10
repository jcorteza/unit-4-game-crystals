var scoreGoal = undefined;
var userScore = 0;
var wins = 0;
var losses = 0;
var crystalsArray = [];
var crystal1 = {
    imgSrc: "./assets/images/crystal-blue.jpeg",
    identifier: "crystal1",
    altDescription: "blue crystal on a white background",
    crystalVal: undefined
};
crystalsArray[0] = crystal1;
var crystal2 = {
    imgSrc: "./assets/images/crystal-black.jpeg",
    identifier: "crystal2",
    altDescription: "black crystal on a white background",
    crystalVal: undefined
};
crystalsArray[1] = crystal2;
var crystal3 = {
    imgSrc: "./assets/images/crystal-purp.jpeg",
    identifier: "crystal3",
    altDescription: "purple crystal on a white background",
    crystalVal: undefined
};
crystalsArray[2] = crystal3;
var crystal4 = {
    imgSrc: "./assets/images/crystal-white.jpg",
    identifier: "crystal4",
    altDescription: "white crystal on a white background",
    crystalVal: undefined
};
crystalsArray[3] = crystal4;

/* function generates and array of 4 random numbers from 2 to 12 to be assigned to crystals */
function valueGenerator(crystalsArray) {
    let min = Math.ceil(2);
    let max = Math.floor(12);
    for(i = 0; i < 4; i++) {
        let value =  Math.floor(Math.random() * (max - min + 1) + min);
        crystalsArray[i]["crystalVal"] = value;
        console.log(crystalsArray[i]);
    }
}

/* function to clear crystal values */
function clearVals(crystalsArray) {
    for(i = 0; i < crystalsArray.length; i++) {
        crystalsArray[i]["crystalVal"] = undefined;
        console.log(crystalsArray[i]);
    }
}

/* function generates random number between 20 and 76*/
function scoreGenerator() {
    let score = Math.floor(Math.random() * 56 + 21);
    return score;
}

/* function sets up game */
function gameSetup(){
    reset(crystalsArray);
    scoreGoal = scoreGenerator();
    $("#scoreDiv").html("<p>Your Score: <span id='userScore'>" + userScore + "</span></p>");
    let goalText = $("<p>").text("Goal: " + scoreGoal);
    $(goalText).prependTo("#scoreDiv");
    //let scoreText = $("<p>").text("Your Score: " + <span></span>userScore);
    //$(scoreText).appendTo("#scoreDiv");
    valueGenerator(crystalsArray);
    for(i = 0; i < crystalsArray.length; i++) {
        let crystalImg = $("<img>");
        $(crystalImg).attr("src", crystalsArray[i]["imgSrc"]);
        $(crystalImg).attr("id", crystalsArray[i]["identifier"]);
        $(crystalImg).attr("alt", crystalsArray[i]["altDescription"]);
        $(crystalImg).attr("value", crystalsArray[i]["crystalVal"]);
        $(crystalImg).appendTo("#crystalsDiv");
    }
    $("#game-content").css("display", "block");
}

/* function resets game values */
function reset(crystalsArray) {
    $("#scoreDiv").empty();
    $("#results").empty();
    $("#crystalsDiv").empty();
    scoreGoal = undefined;
    userScore = 0;
    clearVals(crystalsArray);
}

$(document).ready(function() {
    $("#startGame").click(function() {
        gameSetup();
        $("#crystalsDiv").on("click", function(event) {
            let crystalClicked = $(event.target);
            let crystalClickedVal = $(crystalClicked).attr("value");
            userScore += parseInt(crystalClickedVal);
            console.log(userScore);
            $("#userScore").text(userScore);
            if(userScore === scoreGoal) {
                //alert("You won the game!");
                let resultsText =  $("<p>").text("You won the game! Click on the Start New Game button to start a new round.");
                $(resultsText).appendTo("#results");
                $("#crystalsDiv").off("click");
                wins++;
                $("#winStat").text(wins);
                $("#stats").css("display", "block");
            }
            else if (userScore > scoreGoal) {
                //alert("You lost.");
                $("#results").html("<p>You lost the game. Click on the Start New Game button to start a new round.</p>");
                $("#crystalsDiv").off("click");
                losses++;
                $("#lossStat").text(losses);
                $("#stats").css("display", "block");
            }
        });
    });
});