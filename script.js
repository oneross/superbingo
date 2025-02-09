const app = document.getElementById("app");
let currentCard = null;
let highlightedState = null;

// Generate random bingo card
const categories = {
  "Commercials": [
    "A commercial with a puppy",
    "A celebrity cameo nobody expected",
    "An ad so vague no one knows what it’s for",
    "A truck commercial featuring slow-motion dirt",
    "A commercial with a forced emotional appeal"
  ],
  "Owners": [
    "A billionaire is shown in a luxury box",
    "Owner smugly eating something fancy",
    "Announcer calls an owner a 'genius'",
    "A reference to how much money the owner spends",
    "Owner wears ridiculous sports team merch"
  ],
  "Players": [
    "A quarterback is called 'elite'",
    "Player celebrates a basic play like it’s groundbreaking",
    "A player flexes for no reason",
    "Overly dramatic slow-motion replay of a player's face",
    "A fumble described as a 'momentum shift'"
  ],
  "Commentators": [
    "Commentators use a war metaphor ('battle', 'troops')",
    "Commentators say 'this is what the game is all about'",
    "An announcer messes up a name or stat",
    "Commentator says 'we’ve got a ballgame!'",
    "Sideline reporter talks to an uncooperative coach"
  ],
  "General": [
    "National anthem singer holds the last note too long",
    "A super slow-motion replay of a tackle",
    "Half-time show features too much glitter",
    "Camera zooms in on a fan crying",
    "Game goes into overtime"
  ]
};

const generateRandomCard = () => {
  const allSquares = Object.values(categories).flat();
  const shuffled = allSquares.sort(() => 0.5 - Math.random());
  currentCard = shuffled.slice(0, 25);
  highlightedState = Array(25).fill(false); // Reset highlighted state
  highlightedState[12] = true; // Center square is always highlighted
  saveCardState();
  return currentCard;
};

// Save the current card and its state
const saveCardState = () => {
  localStorage.setItem("bingoCard", JSON.stringify(currentCard));
  localStorage.setItem("highlightedState", JSON.stringify(highlightedState));
};

// Load the card and its state
const loadCardState = () => {
  currentCard = JSON.parse(localStorage.getItem("bingoCard"));
  highlightedState = JSON.parse(localStorage.getItem("highlightedState"));
};

const renderHomeScreen = () => {
  app.innerHTML = `
    <div class="container">
      <img src="logo1.png" alt="Logo" class="logo">
      <h1>The Fancy Schmancy Dinner Club's First Annual Dandy-Cup Party</h1>
      <button onclick="handleGenerateNewCard()">Generate New Card</button>
      <button onclick="renderCardScreen()">Return to Card</button>
      <div class="qr-container">
        <h2>Share with Friends</h2>
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://oneross.github.io/superbingo&bgcolor=d8d8d6" alt="QR Code">
      </div>
    </div>
  `;
};

const renderCardScreen = () => {
  if (!currentCard) loadCardState(); // Load card if not already loaded
  app.innerHTML = `
    <div class="container">
      <button onclick="renderHomeScreen()">Endzone</button>
      <div id="bingoCard" class="bingo-card"></div>
    </div>
  `;
  renderBingoCard(currentCard);
};

const renderBingoCard = (card) => {
  const bingoCard = document.getElementById("bingoCard");
  bingoCard.innerHTML = ""; // Clear any existing card
  card.forEach((square, index) => {
    const div = document.createElement("div");
    div.className = "bingo-square";
    div.textContent = square;
    if (index === 12) {
      // Center square is the "Free" square
      div.textContent = "★";
      div.classList.add("clicked");
    }
    if (highlightedState[index]) {
      div.classList.add("clicked");
    }
    div.addEventListener("click", () => toggleSquare(div, index));
    bingoCard.appendChild(div);
  });
};

const toggleSquare = (square, index) => {
  if (index === 12) return; // Center square cannot be toggled
  square.classList.toggle("clicked");
  highlightedState[index] = square.classList.contains("clicked");
  saveCardState();
};

const handleGenerateNewCard = () => {
  generateRandomCard();
  renderCardScreen();
};

// Initial Render
renderHomeScreen();