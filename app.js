const game = () => {
  let pScore = 0;
  let cScore = 0;

  //Start the Game
  const startGame = () => {
    const playBtn = document.querySelector(".intro button");
    const introScreen = document.querySelector(".intro");
    const match = document.querySelector(".match");

    playBtn.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      match.classList.add("fadeIn");
    });
  };

  //Restart the Game
  const restartGame = () => {
    const restartBtn = document.querySelector(".restart button");
    const restartScreen = document.querySelector(".restart");
    const match = document.querySelector(".match");
    const result = document.querySelector(".result");
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const winner = document.querySelector(".winner");

    match.classList.remove("fadeIn");
    restartScreen.classList.add("fadeIn");

    if (pScore == 3) {
      result.textContent = "Player wins!";
    } else {
      result.textContent = "Computer wins!";
    }

    restartBtn.addEventListener("click", () => {
      restartScreen.classList.remove("fadeIn");
      match.classList.add("fadeIn");
      pScore = 0;
      cScore = 0;
      updateScore();
      playerHand.src = `./assets/rock.png`;
      computerHand.src = `./assets/rock.png`;
      winner.textContent = "Choose an option";
    });
  }

  //Play Match
  const playMatch = () => {
    const options = document.querySelectorAll(".options button");
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const hands = document.querySelectorAll(".hands img");

    hands.forEach(hand => {
      hand.addEventListener("animationend", function() {
        this.style.animation = "";
      });
    });
    //Computer Options
    const computerOptions = ["rock", "paper", "scissor"];

    options.forEach(option => {
      option.addEventListener("click", function() {
        //Computer Choice
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];

        console.log(this.textContent);

        setTimeout(() => {
          //Here is where we call compare hands
          compareHands(this.textContent.toLowerCase(), computerChoice);
          //Update Images
          playerHand.src = `./assets/${this.textContent.toLowerCase()}.png`;
          computerHand.src = `./assets/${computerChoice}.png`;
        }, 2000);
        //Animation
        playerHand.style.animation = "shakePlayer 2s ease";
        computerHand.style.animation = "shakeComputer 2s ease";
      });
    });
  };

  const updateScore = () => {
    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;
    
    if (pScore == 3 || cScore == 3) {
      restartGame();
    }
  };

  const compareHands = (playerChoice, computerChoice) => {
    const winner = document.querySelector(".winner");
    //Checking for a tie
    if (playerChoice === computerChoice) {
      winner.textContent = "It is a tie";
      return;
    }
    //Check for Rock
    if (playerChoice === "rock") {
      if (computerChoice === "scissor") {
        winner.textContent = "Player gets a point";
        pScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Computer gets a point";
        cScore++;
        updateScore();
        return;
      }
    }
    //Check for Paper
    if (playerChoice === "paper") {
      if (computerChoice === "scissor") {
        winner.textContent = "Computer gets a point";
        cScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Player gets a point";
        pScore++;
        updateScore();
        return;
      }
    }
    //Check for Scissor
    if (playerChoice === "scissor") {
      if (computerChoice === "rock") {
        winner.textContent = "Computer gets a point";
        cScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Player gets a point";
        pScore++;
        updateScore();
        return;
      }
    }
  };

  startGame();
  playMatch();
};

game();
