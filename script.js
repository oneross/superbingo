const app = document.getElementById("app");
let currentCard = null;
let highlightedState = null;

const categories = {
    "Commercials": [
      "A commercial with a puppy, because who doesn’t like puppies?",
      "A celebrity cameo so random it feels like Mad Libs",
      "An ad that tries too hard to make you cry about toilet paper",
      "A truck commercial with dirt flying like it's auditioning for an action movie",
      "A commercial that makes you whisper, 'Wait, what was that even for?'",
      "Beer ad with a slow-motion cheers that looks suspiciously sexy",
      "Crypto ad that pretends 2022 didn’t happen",
      "An ad with a jingle so catchy you hate yourself for liking it",
      "A luxury car ad featuring people who definitely don’t drive",
      "A commercial where a famous actor tries way too hard to look relatable"
    ],
    "Owners": [
      "Owner smugly eating shrimp cocktail in slow motion",
      "Billionaire owner laughs maniacally like a cartoon villain",
      "Owner wearing a hat so ridiculous it deserves its own fashion line",
      "Announcer refers to an owner as a 'visionary' (seriously?)",
      "Owner shaking hands with a celebrity who clearly doesn’t know who they are",
      "Owner awkwardly high-fives a random fan for the camera",
      "A shot of the owner looking bored despite their team winning",
      "Owner is shown with a trophy before the game even starts",
      "Announcers talk about how much money the owner has spent on 'improvements'",
      "Owner waves like royalty to their adoring peasants"
    ],
    "Players": [
      "Quarterback’s hair is discussed like it’s a critical stat",
      "Player celebrates a 3-yard gain like they’ve won a Nobel Prize",
      "A player flexes dramatically for no reason (as if we weren’t already impressed)",
      "Slow-motion close-up of a player’s face that’s 90% sweat",
      "Player fumbles, and announcers pretend it’s the end of the world",
      "A lineman is described as having 'deceptive speed' (code for slow)",
      "Player has a touchdown dance more choreographed than a Broadway show",
      "Announcer says a player 'has ice in his veins' (like he’s a cyborg)",
      "Announcers discuss a player's obscure childhood hobby (like knitting or taxidermy)",
      "A kicker misses, and the camera cuts to someone looking disappointed"
    ],
    "Commentators": [
      "Announcers call the field 'the battlefield' like it’s *Gladiator*",
      "Commentator awkwardly tries to explain the rules to the audience",
      "Announcer says 'unbelievable!' for something totally believable",
      "Commentator references a random stat from 1982 for no reason",
      "Sideline reporter interviews a coach who clearly doesn’t want to be there",
      "Commentator yells 'What a catch!' even when it’s not",
      "Commentator makes an awkward pun that lands like a lead balloon",
      "Commentators use the word 'legacy' as if it’s a Shakespeare play",
      "Announcers hype up a player’s pre-game meal like it’s life-changing",
      "A commentator tries to sound deep and ends up just being confusing"
    ],
    "General": [
      "National anthem singer holds the final note long enough for a bathroom break",
      "A tackle so dramatic it looks like a Mortal Kombat move",
      "Half-time show looks like it was designed by a glitter-obsessed 5-year-old",
      "Fan in the stands crying, possibly because they spent $5,000 on tickets",
      "Game goes into overtime, and someone groans loudly",
      "A streaker runs onto the field and gets tackled harder than any player",
      "Camera zooms in on a coach screaming something definitely not PG",
      "The mascot does something weirdly athletic for no reason",
      "Announcer says 'this is what it’s all about' like it’s the *Hunger Games*",
      "Someone in the room says, 'Wait, what just happened?'"
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
      <h1>The Fancy Schmancy Dinner Club's Second Annual Dandy-Cup Party</h1>
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