const app = document.getElementById("app");
let currentCard = null;
let highlightedState = null;

// Generate random bingo card
const categoriesSemiSerious = {
  "Commercials": [
    "A commercial with a puppy",
    "A celebrity cameo nobody expected",
    "An ad so vague no one knows what it’s for",
    "A truck commercial featuring slow-motion dirt",
    "A commercial with a forced emotional appeal"
  ],
  "Halftime Show": [
    "Dancers wearing glitter so bright it could blind a satellite",
    "The lead performer 'accidentally' promotes their new single",
    "A surprise guest everyone predicted weeks ago",
    "Pyrotechnics so intense they scare a nearby pigeon",
    "A halftime costume change that happens in 2 seconds"
  ],
  "Game Action": [
    "A touchdown is followed by a ridiculous celebration dance",
    "A player catches the ball in slow-motion replay",
    "A dramatic fumble makes the audience gasp",
    "The announcers argue over a penalty call",
    "A kicker scores and looks like they’ve won the lottery"
  ],
  "Fans": [
    "Fan cries on camera after a touchdown",
    "Fan holds a sign referencing a meme",
    "A fan is wearing a bizarre homemade costume",
    "The camera catches a group of fans singing along to the halftime show",
    "A random celebrity in the crowd gets more cheers than the players"
  ]
};

const categoriesHumorMe = {
  "Commercials": [
    "A commercial with a puppy, because who doesn’t like puppies?",
    "A celebrity cameo so random it feels like Mad Libs",
    "An ad that tries too hard to make you cry about toilet paper",
    "A truck commercial with dirt flying like it's auditioning for an action movie",
    "A commercial that makes you whisper, 'Wait, what was that even for?'"
  ],
  "Owners": [
    "Owner smugly eating shrimp cocktail in slow motion",
    "Billionaire owner laughs maniacally like a cartoon villain",
    "Owner wearing a hat so ridiculous it deserves its own fashion line",
    "Announcer refers to an owner as a 'visionary' (seriously?)",
    "Owner shaking hands with a celebrity who clearly doesn’t know who they are"
  ],
  "Players": [
    "Quarterback’s hair is discussed like it’s a critical stat",
    "Player celebrates a 3-yard gain like they’ve won a Nobel Prize",
    "A player flexes dramatically for no reason (as if we weren’t already impressed)",
    "Slow-motion close-up of a player’s face that’s 90% sweat",
    "Player fumbles, and announcers pretend it’s the end of the world"
  ],
  "Commentators": [
    "Announcers call the field 'the battlefield' like it’s *Gladiator*",
    "Commentator awkwardly tries to explain the rules to the audience",
    "Announcer says 'unbelievable!' for something totally believable",
    "Commentator references a random stat from 1982 for no reason",
    "Sideline reporter interviews a coach who clearly doesn’t want to be there"
  ]
};

const categoriesSillyWalks = {
  "Monty Python References": [
    "Someone yells, 'It’s just a flesh wound!' after a bad play",
    "Party guest re-enacts the Ministry of Silly Walks",
    "Guest shouts 'Spam!' every time a food commercial airs",
    "Someone quotes, 'This is an ex-parrot!' at random",
    "Guest recites the Holy Hand Grenade scene while holding a chicken wing"
  ],
  "Challenges": [
    "Convince another guest to join you in a spontaneous silly walk",
    "Re-enact the 'Argument Clinic' scene with the person next to you",
    "Quote 'The Knights Who Say Ni' to the TV",
    "Sing the 'Lumberjack Song' during halftime",
    "Act out the 'Dead Parrot' sketch using nearby objects"
  ],
  "Game Action": [
    "Yell 'Run away!' during an overly dramatic replay",
    "Shout, 'Bring out your dead!' after a player gets tackled",
    "Yell 'Ni!' every time the announcers say 'legacy'",
    "When the ref throws a flag, shout, 'It’s only a model!'",
    "Declare, 'And now for something completely different!' during a time-out"
  ]
};

const generateRandomCard = (categories) => {
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
      <button onclick="handleGenerateNewCard(categoriesSemiSerious)">Generate New Card</button>
      <button onclick="handleGenerateNewCard(categoriesHumorMe)">Humor Me</button>
      <button onclick="handleGenerateNewCard(categoriesSillyWalks)">Ministry of Silly Walks</button>
      <button class="return-button" onclick="renderCardScreen()">Return to Card</button>
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

const handleGenerateNewCard = (categories) => {
  generateRandomCard(categories);
  renderCardScreen();
};

// Initial Render
renderHomeScreen();