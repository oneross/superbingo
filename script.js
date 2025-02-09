const app = document.getElementById("app");
let currentCard = null;
let highlightedState = null;

// Updated categories with more options
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
  ],
  "Fans": [
    "Fan cries on camera after a touchdown",
    "Fan holds a sign referencing a meme",
    "A fan is wearing a bizarre homemade costume",
    "The camera catches a group of fans singing along to the halftime show",
    "A random celebrity in the crowd gets more cheers than the players",
    "A fan is caught chugging a drink",
    "A kid looks bored in the front row",
    "A fan waves an oversized foam finger",
    "The camera zooms in on a painted face",
    "A group of fans huddles under a blanket to stay warm"
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
  // Players and Commentators remain the same as before
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
    "Guest performs the 'Fish Slapping Dance' near the snack table"
  ],
  "Challenges": [
    "Convince another guest to join you in a spontaneous silly walk",
    "Re-enact the 'Argument Clinic' scene with the person next to you",
    "Quote 'The Knights Who Say Ni' to the TV",
    "Sing the 'Lumberjack Song' during halftime",
    "Act out the 'Dead Parrot' sketch using nearby objects",
    "Mimic the 'French taunting' scene at random",
    "Use a nearby object as a makeshift Holy Grail",
    "Challenge someone to a 'Silly Walk-Off'",
    "Declare 'I fart in your general direction' at a bad ref call",
    "Pretend to ride an imaginary horse around the room"
  ]
};

// Ensure 5x5 grid is always generated
const generateRandomCard = (categories) => {
  const allSquares = Object.values(categories).flat();
  const shuffled = allSquares.sort(() => 0.5 - Math.random());
  currentCard = shuffled.slice(0, 25); // Exactly 25 squares
  highlightedState = Array(25).fill(false); // Reset highlighted state
  highlightedState[12] = true; // Center square is always highlighted
  saveCardState();
  return currentCard;
};