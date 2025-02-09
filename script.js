const app = document.getElementById("app");
let currentCard = null;
let highlightedState = null;

// Categories for each card type
const categoriesSemiSerious = {
  "Commercials": [
    "A commercial with a puppy",
    "A celebrity cameo nobody expected",
    "An ad so vague no one knows what it’s for",
    "A truck commercial featuring slow-motion dirt",
    "A commercial with a forced emotional appeal",
    "An insurance commercial trying to be funny",
    "A beverage ad with people dancing in slow motion",
    "A tech ad pretending to save the world",
    "A car ad featuring people in suits",
    "A commercial showing a generic 'family moment'"
  ],
  "Halftime Show": [
    "Dancers wearing glitter so bright it could blind a satellite",
    "The lead performer 'accidentally' promotes their new single",
    "A surprise guest everyone predicted weeks ago",
    "Pyrotechnics so intense they scare a nearby pigeon",
    "A halftime costume change that happens in 2 seconds",
    "The crowd waves lights during a slow song",
    "A performer brings out their kid for 'family appeal'",
    "An over-the-top entrance involving wires or platforms",
    "The lead singer forgets a line but keeps dancing",
    "Everyone watching says 'This is weird' at least once"
  ],
  "Game Action": [
    "A touchdown is followed by a ridiculous celebration dance",
    "A player catches the ball in slow-motion replay",
    "A dramatic fumble makes the audience gasp",
    "The announcers argue over a penalty call",
    "A kicker scores and looks like they’ve won the lottery",
    "A ref throws a flag for something nobody understands",
    "The quarterback throws a pass so wild it goes nowhere",
    "A replay takes longer than 2 minutes",
    "The defense pulls off a surprising interception",
    "A player gets tackled and rolls on the ground dramatically"
  ]
};

const categoriesHumorMe = {
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
      "A commercial with a famous actor trying to look 'relatable' while failing",
      "An ad featuring a giant CGI mascot that terrifies children",
      "An overproduced ad for a food delivery app",
      "A tech company ad that makes no sense but looks expensive",
      "A commercial featuring an animal that is suspiciously CGI"
    ],
    "Game Action": [
      "A quarterback throws a pass so bad even the commentators laugh",
      "Player celebrates a minor play like they cured a disease",
      "A penalty gets called, and the camera cuts to a confused coach",
      "A referee struggles to turn on their microphone",
      "A kicker misses, and the crowd gasps in unison",
      "The defense intercepts the ball and everyone loses their minds",
      "A tackle so hard you feel it through the TV",
      "A long, dramatic replay for something very boring",
      "The camera catches a player arguing with a referee",
      "A touchdown celebration that takes choreography too far"
    ],
    "Commentators": [
      "Commentators make an awkward pun that nobody laughs at",
      "Someone says, 'This game is far from over!' when it’s very over",
      "A random stat from 20 years ago is mentioned like it’s important",
      "Commentator uses a war metaphor that makes you cringe",
      "Someone yells 'unbelievable!' for something entirely believable",
      "Commentator says, 'What a game!' even though it’s a blowout",
      "A commentator talks about 'heart' and 'determination' like a Disney movie",
      "Commentators argue about a penalty and get way too emotional",
      "The sideline reporter interviews a coach who clearly wants to leave"
    ]
  };


  const categoriesSillyWalks = {
    "Monty Python References": [
      "Someone yells, 'It’s just a flesh wound!' after a bad play",
      "Party guest re-enacts the Ministry of Silly Walks",
      "Guest shouts 'Spam!' every time a food commercial airs",
      "Someone quotes, 'This is an ex-parrot!' at random",
      "Guest recites the Holy Hand Grenade scene while holding a chicken wing",
      "Someone demands 'a shrubbery!' during halftime",
      "Guest mimics the Black Knight blocking a hallway",
      "Someone yells, 'We are the knights who say Ni!' at the TV",
      "Guest shouts, 'And now for something completely different!' during a time-out",
      "Guest performs the 'Fish Slapping Dance' near the snack table",
      "Someone dramatically announces, 'Bring out your dead!' after a tackle",
      "The phrase 'Blessed are the cheesemakers!' is shouted randomly",
      "A guest starts humming the 'Monty Python Flying Circus' theme song"
    ],
    "Challenges": [
      "Convince another guest to join you in a spontaneous silly walk",
      "Re-enact the 'Argument Clinic' scene with the person next to you",
      "Quote 'The Knights Who Say Ni' to the TV",
      "Sing the 'Lumberjack Song' during halftime",
      "Act out the 'Dead Parrot' sketch using nearby objects",
      "Pretend to be the French taunter during a bad call",
      "Shout 'Run away!' during an overly dramatic replay",
      "Re-enact the 'Ministry of Silly Walks' in slow motion during a commercial",
      "Perform a ridiculous touchdown dance in the middle of the living room",
      "Narrate the game using an exaggerated British accent"
    ],
    "Game Action": [
      "Someone dramatically yells 'Ni!' when the referee throws a flag",
      "Call every tackle a 'killer rabbit attack'",
      "Pretend to blow a trumpet every time a field goal is kicked",
      "Every time someone fumbles, yell, 'It’s only a model!'",
      "Declare, 'The Holy Grail must be at the 50-yard line!' during a timeout",
      "Announce, 'This is a silly place' every time the camera pans to the fans",
      "Yell, 'She turned me into a newt!' after a questionable call",
      "Every time there’s a commercial break, sing the 'Spam' song",
      "Shout 'Monty Python was better than this game!' during a dull moment"
    ]
  };


  const categoriesBeltalowda = {
    "The Expanse References": [
      "Someone yells, 'We are Beltalowda!' randomly",
      "Party guest mimics Amos by saying, 'I am that guy.'",
      "Someone tries to say 'Inyalowda' in a conversation",
      "A guest brings up 'Miller's hat' during halftime",
      "Somebody whispers, 'Remember the Cant.'",
      "Guest yells, 'This is a protomolecule play!' after a touchdown",
      "Someone starts speaking in Belter Creole",
      "A fan says, 'The Expanse should have had more seasons!'",
      "Someone claims, 'Drummer is the real MVP!'",
      "Someone quotes, 'The juice is loose!' while jumping around",
      "Someone yells, 'OPA forever!' during a dramatic moment",
      "Guest references the Nauvoo in a conversation about the halftime show",
      "Shout 'That’s a protomolecule move!' after a questionable play"
    ],
    "Challenges": [
      "Speak only in Belter Creole during halftime",
      "Refer to every quarterback as 'Captain Holden'",
      "Drink out of a thermos and call it 'The Cant’s finest brew'",
      "Announce, 'This is a Razorback kind of play!' after a long run",
      "Yell, 'Protomolecule in the end zone!' after a touchdown",
      "Point at the screen and declare, 'That’s the belt's way!' during a replay",
      "Convince another guest to join you in acting out a scene from *The Expanse*",
      "Claim, 'Amos would’ve made that tackle!' after a missed play",
      "Narrate the game like you’re Anderson Dawes"
    ],
    "Game Action": [
      "Call a fumble 'a zero-G spill!'",
      "Claim, 'That play was so fast it had Epstein drive!'",
      "Refer to any bad ref call as 'Earther bias!'",
      "Declare, 'That’s the way the belt would’ve done it!' after a trick play",
      "Yell, 'This ain’t no science station!' during a dramatic moment",
      "Point out, 'This stadium needs more ships!' during halftime",
      "Pretend you’re on Tycho Station every time the camera pans to the owners",
      "Yell, 'That’s Martian tech!' during a long pass play"
    ]
  };


// Generates a randomized 5x5 bingo card
const generateRandomCard = (categories) => {
  const allSquares = Object.values(categories).flat();
  const shuffled = allSquares.sort(() => 0.5 - Math.random());
  currentCard = shuffled.slice(0, 25); // Exactly 25 squares for the grid
  highlightedState = Array(25).fill(false); // Reset all highlighted squares
  highlightedState[12] = true; // Center square is the "Free" square
  saveCardState();
  return currentCard;
};

// Save and load card states
const saveCardState = () => {
  localStorage.setItem("bingoCard", JSON.stringify(currentCard));
  localStorage.setItem("highlightedState", JSON.stringify(highlightedState));
};

const loadCardState = () => {
  currentCard = JSON.parse(localStorage.getItem("bingoCard"));
  highlightedState = JSON.parse(localStorage.getItem("highlightedState"));
};

// Render home screen
const renderHomeScreen = () => {
  app.innerHTML = `
    <div class="container">
      <img src="logo1.png" alt="Logo" class="logo">
      <h1>The Fancy Schmancy Dinner Club's Second Annual Dandy-Cup Party</h1>
      <button onclick="handleGenerateNewCard(categoriesSemiSerious)">Generate New Card</button>
      <button onclick="handleGenerateNewCard(categoriesHumorMe)">Humor Me</button>
      <button onclick="handleGenerateNewCard(categoriesSillyWalks)">Ministry of Silly Walks</button>
      <button onclick="handleGenerateNewCard(categoriesBeltalowda)">Beltalowda</button>
      <button class="return-button" onclick="renderCardScreen()">Return to Card</button>
      <div class="qr-container">
        <h2>Share with Friends</h2>
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://oneross.github.io/superbingo&bgcolor=d8d8d6" alt="QR Code">
      </div>
    </div>
  `;
};

// Render the bingo card screen
const renderCardScreen = () => {
  if (!currentCard) loadCardState();
  app.innerHTML = `
    <div class="container">
      <button onclick="renderHomeScreen()">Endzone</button>
      <div id="bingoCard" class="bingo-card"></div>
    </div>
  `;
  renderBingoCard(currentCard);
};

// Render the bingo card grid
const renderBingoCard = (card) => {
  const bingoCard = document.getElementById("bingoCard");
  bingoCard.innerHTML = "";
  card.forEach((square, index) => {
    const div = document.createElement("div");
    div.className = "bingo-square";
    div.textContent = square;
    if (index === 12) {
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

// Toggle square highlighting
const toggleSquare = (square, index) => {
  if (index === 12) return;
  square.classList.toggle("clicked");
  highlightedState[index] = square.classList.contains("clicked");
  saveCardState();
};

// Generate card and render
const handleGenerateNewCard = (categories) => {
  generateRandomCard(categories);
  renderCardScreen();
};

// Initial render
renderHomeScreen();