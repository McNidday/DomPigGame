/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, sixRoles, lastRole, input;

scores = [0, 0];
roundScore = [0, 0];
activePlayer = 0;
sixRoles = 0;
gamePlaying = true;



document.getElementById("dice-0").style.display = 'none';
document.getElementById("dice-1").style.display = 'none';

document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gamePlaying) {

        console.log('Nidday');

        input = document.querySelector('.final-score').value;

        var dice0 = Math.floor(Math.random() * 6) + 1;
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice = dice0 + dice1;

        if (lastRole !== 6 && dice !== 6) {

            document.getElementById('dice-0').style.display = 'block';
            document.getElementById('dice-1').style.display = 'block';
            document.getElementById('dice-0').src = `dice-${dice0}.png`;
            document.getElementById('dice-1').src = `dice-${dice1}.png`;

            if (dice0 !== 1 && dice1 !== 1) {
                //Add score to current player
                roundScore[activePlayer] += dice;

                document.getElementById(`current-${activePlayer}`).textContent = roundScore[activePlayer];

            } else if (dice0 === 1 && dice1 === 1) {
                // Set current Score to 0 and Switch Player
                document.getElementById(`current-${activePlayer}`).textContent = 0;

                nextPlayer();

                roundScore[activePlayer] = 0;

            } 

        }

        lastRole = dice;
    }
});
document.querySelector('.btn-new').addEventListener('click', function () {

    gamePlaying = true;

    roundScore[0] = 0;

    roundScore[1] = 0;

    document.getElementById('current-0').textContent = 0;

    document.getElementById('current-1').textContent = 0;

    document.getElementById('score-0').textContent = 0;

    document.getElementById('score-1').textContent = 0;

    document.querySelector(`.player-${activePlayer}-panel`).classList.remove('winner');

    if (activePlayer == 0) {

        document.getElementById(`name-${activePlayer}`).textContent = 'Player 1';

    } else {

        document.getElementById(`name-${activePlayer}`).textContent = 'Player 2';

    }

    scores = [0, 0];

    activePlayer = 0;

    document.querySelector(`.player-1-panel`).classList.remove('active');

    document.querySelector(`.player-${activePlayer}-panel`).classList.add('active');

});

document.querySelector('.btn-hold').addEventListener('click', function () {



    if (gamePlaying) {

        //    Add Current Score to the Global Score
        scores[activePlayer] += roundScore[activePlayer];
        //    Update the Ui
        document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

        //    Check If Player Won the Game

        if (input) {


            if (scores[activePlayer] >= input) {

                document.getElementById(`name-${activePlayer}`).textContent = 'Winner!';

                document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');

                document.getElementById('dice-0').style.display = 'none';

                document.getElementById('dice-1').style.display = 'none';

                document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');

                gamePlaying = false;

            } else {

                document.getElementById(`current-${activePlayer}`).textContent = roundScore[activePlayer];

                nextPlayer();
            }


        } else {

            input = 200;

            if (scores[activePlayer] >= input) {

                document.getElementById(`name-${activePlayer}`).textContent = 'Winner!';

                document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');

                document.getElementById('dice-0').style.display = 'none';

                document.getElementById('dice-1').style.display = 'none';

                document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');

                gamePlaying = false;

            } else {

                document.getElementById(`current-${activePlayer}`).textContent = roundScore[activePlayer];

                nextPlayer();
            }


        }

    }

});

function nextPlayer() {

    document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');

    document.getElementById('dice-0').style.display = 'none';

    document.getElementById('dice-1').style.display = 'none';

    activePlayer === 1 ? activePlayer = 0 : activePlayer = 1;

    document.querySelector(`.player-${activePlayer}-panel`).classList.add('active');


}