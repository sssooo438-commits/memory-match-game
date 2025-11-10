const board = document.getElementById("gameBoard");
const livesDisplay = document.getElementById("lives");
const levelDisplay = document.getElementById("level");

let level = 1;
let lives = 5;

startLevel();

function startLevel() {
  board.innerHTML = ""; 

  updateHUD();

  
  let pairCount = 4 + level; 

  
  const symbols = ["🍎","🍌","🍇","🍓","🍒","🍋","🍉","🥝","🍍","🥥","🥑","🍅","🍈","🍐","🍊"];

  
  let cards = symbols.slice(0, pairCount);
  cards = [...cards, ...cards]; 

  
  cards.sort(() => Math.random() - 0.5);

  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;
  let matchedPairs = 0;

 
  cards.forEach(symbol => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerText = "?";
    card.dataset.symbol = symbol;
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });

  function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add("flipped");
    this.innerText = this.dataset.symbol;

    if (!firstCard) {
      firstCard = this;
      return;
    }

    secondCard = this;
    lockBoard = true;

    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
      matchedPairs++;
      resetPick();

      
      if (matchedPairs === pairCount) {
        setTimeout(() => {
          alert(`🎉 Level ${level} Complete!`);
          level++;
          lives = 5; 
          startLevel();
        }, 500);
      }

    } else {
      lives--;
      updateHUD();

      if (lives <= 0) {
        setTimeout(() => alert("💔 Game Over! Restarting..."), 300);
        setTimeout(() => location.reload(), 800);
        return;
      }

      setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        firstCard.innerText = "?";
        secondCard.innerText = "?";
        resetPick();
      }, 1000);
    }
  }

  function resetPick() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
  }
}

function updateHUD() {
  levelDisplay.innerText = level;
  livesDisplay.innerText = "❤️".repeat(lives);
}
