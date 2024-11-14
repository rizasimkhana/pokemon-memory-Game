// with images
// Array of images (you can replace these URLs with your own image paths)
const cardImages = [
  './images/ash.png', './images/charminar.png', './images/charizad.png', './images/jiggly.png', './images/lapras.png', './images/pickachu.png'
];

// Game settings
const cards = [...cardImages, ...cardImages]; // Duplicate the images for pairs

// Game state
let flippedCards = [];
let matchedCount = 0;
let moveCount = 0;

// Shuffle function
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
  }
  return arr;
}

// Create game board
function createBoard() {
  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = ''; // Clear the board before adding new cards

  const shuffledCards = shuffleArray(cards);
  shuffledCards.forEach((image, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-id', index);
    card.setAttribute('data-image', image);
    //   card.style.backgroundImage = 'url("img/back.jpg")';
    card.style.backgroundSize = 'cover'
    // Set back of card image
    card.addEventListener('click', onCardClick);
    gameBoard.appendChild(card);
  });
}

// Card click handler
function onCardClick(event) {
  const card = event.target;

  if (card.classList.contains('flipped') || card.classList.contains('matched') || flippedCards.length === 2) {
    return; // Ignore clicks on already flipped or matched cards, or if two cards are already flipped
  }

  card.classList.add('flipped');
  card.style.backgroundImage = `url("${card.getAttribute('data-image')}")`; // Show the image
  flippedCards.push(card);



  // Check for a match
  if (flippedCards.length === 2) {
    moveCount++;
    updateMoveCounter();
    checkMatch();
  }
}

// Check if flipped cards match
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.getAttribute('data-image') === card2.getAttribute('data-image')) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    card1.style.backgroundImage = `url("${card1.getAttribute('data-image')}")`; // Reset back image
    card2.style.backgroundImage = `url("${card2.getAttribute('data-image')}")`; // Reset back image
    matchedCount++;
    flippedCards = [];

    updateGameStatus();

    // Check if game is over
    if (matchedCount === cardImages.length) {
      setTimeout(() => {
        // alert('Congratulations! You won!');
        const win = document.getElementById('over')
        win.textContent = `congralulations you won with ${moveCount} moves`
        win.style.color = "green"
        document.getElementById('restart-button').classList.remove('hidden');
        document.getElementById('over').style.display = "block"
      }, 500);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.style.backgroundImage = `url('./images/card_logo.png')`;
      card2.style.backgroundImage = `url('./images/card_logo.png')`;
      flippedCards = [];
    }, 1000);
  }
}

// Update game status
function updateGameStatus() {
  const gameStatus = document.getElementById('game-status');
  gameStatus.textContent = `Matches found: ${matchedCount} / ${cardImages.length}`;
}

// Update move counter
function updateMoveCounter() {
  const moveCounter = document.getElementById('move-counter');
  moveCounter.textContent = `Moves: ${moveCount}`;
}

// Reset the game
function resetGame() {
  matchedCount = 0;
  moveCount = 0;
  flippedCards = [];
  createBoard();
  updateGameStatus();
  updateMoveCounter();
  document.getElementById('restart-button').classList.add('hidden');
  document.getElementById('over').style.display = "none"
}

// Start the game
function startGame() {
  document.getElementById('start-button').classList.add('hidden');
  document.getElementById('restart-button').classList.remove('hidden');
  resetGame();
}

// Event listeners
document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('restart-button').addEventListener('click', resetGame);
// Initial setup
createBoard();
updateGameStatus();
updateMoveCounter();
