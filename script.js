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
    return shuffled.slice(0, 25); // Take the first 25 items
  };
  
  const renderCard = (card) => {
    const bingoCard = document.getElementById('bingoCard');
    bingoCard.innerHTML = ''; // Clear any existing card
    card.forEach((square, index) => {
      const div = document.createElement('div');
      div.className = 'bingo-square';
      div.textContent = square;
      div.addEventListener('click', () => toggleSquare(div, index));
      bingoCard.appendChild(div);
    });
  };
  
  const toggleSquare = (square, index) => {
    square.classList.toggle('clicked');
    saveCardState(index, square.classList.contains('clicked'));
  };
  
  const saveCardState = (index, clicked) => {
    const state = JSON.parse(localStorage.getItem('bingoState')) || {};
    state[index] = clicked;
    localStorage.setItem('bingoState', JSON.stringify(state));
  };
  
  const loadCardState = () => {
    const state = JSON.parse(localStorage.getItem('bingoState')) || {};
    const squares = document.querySelectorAll('.bingo-square');
    squares.forEach((square, index) => {
      if (state[index]) {
        square.classList.add('clicked');
      }
    });
  };
  
  // Fullscreen toggle functionality
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };
  
  document.getElementById('toggleFullscreen').addEventListener('click', toggleFullscreen);
  
  // Smooth scrolling initialization
  const scroll = new SmoothScroll('button', {
    speed: 300,
    offset: 50,
  });
  
  document.getElementById('generateCard').addEventListener('click', () => {
    const card = generateRandomCard();
    renderCard(card);
    localStorage.setItem('bingoCard', JSON.stringify(card)); // Save card for reload
    localStorage.setItem('bingoState', JSON.stringify({})); // Clear state
  });
  
  // Load card and state on page load
  window.addEventListener('load', () => {
    const savedCard = JSON.parse(localStorage.getItem('bingoCard'));
    if (savedCard) {
      renderCard(savedCard);
      loadCardState();
    } else {
      document.getElementById('generateCard').click(); // Generate a card if none exists
    }
  });