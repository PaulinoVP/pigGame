/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//variables
var scores, roundScore, activePlayer, gamePlay;

init();

document.querySelector(".btn-roll").addEventListener("click", function() {

    if(gamePlay) {
        //1. número aleatorio
        var dice = Math.floor(Math.random() * 6) + 1;
        //2. desplegar el resultado
        var diceDOm = document.querySelector(".dice");
        diceDOm.style.display = "block";
        diceDOm.src = "dice-" + dice + ".png";
        //3. actualizar el resultado del round si no sacó 1 el dado
        if (dice !== 1) {
            roundScore += dice;
            document.querySelector("#current-" + activePlayer).textContent = roundScore; 
        } else {
            nextPlayer();
        };
    };
});

document.querySelector(".btn-hold").addEventListener("click", function() {
    if(gamePlay) {
        //sumar el roundscore a scores
        scores[activePlayer] += roundScore;
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
        //ver si el jugador ganó
        if (scores[activePlayer] >= 100) {
            document.querySelector("#name-" + activePlayer).textContent = "Winner";
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".player-"+ activePlayer + "-panel").classList.remove("active");
            document.querySelector(".player-"+ activePlayer + "-panel").classList.add("winner");
            gamePlay = false;
        } else {
        nextPlayer();};
    };
});

//boton de nuevo juego
document.querySelector(".btn-new").addEventListener("click", init);


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById("current-" + activePlayer).textContent = "0";
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    document.querySelector(".dice").style.display = "none";
};

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlay = true;
    //desaparece el dado al inicio del juego
    document.querySelector(".dice").style.display = "none";
    //pone los scores en cero
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    //nombres en default
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    //remover Winner class
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    //quitar y asignar clase Active
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
};




