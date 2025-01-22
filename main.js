const roles = [
  { role: 'Don', image: 'don.jpg' },
  { role: 'Sheriff', image: 'sheriff.jpg' },
  { role: 'Mafia', image: 'mafia.jpg' },
  { role: 'Mafia', image: 'mafia.jpg' },
  { role: 'Civilian', image: 'civilian.jpg' },
  { role: 'Civilian', image: 'civilian.jpg' },
  { role: 'Civilian', image: 'civilian.jpg' },
  { role: 'Civilian', image: 'civilian.jpg' },
  { role: 'Civilian', image: 'civilian.jpg' },
  { role: 'Civilian', image: 'civilian.jpg' }
];

let shuffledRoles = [];
const cardsContainer = document.getElementById('cards');
const logContainer = document.getElementById('log');
const startButton = document.getElementById('startButton');
const endButton = document.getElementById('endButton');
let currentPlayer = 1;
let sessionActive = false;

startButton.addEventListener('click', startSession);
endButton.addEventListener('click', endSession);

function startSession() {
  shuffledRoles = roles.sort(() => Math.random() - 0.5);
  cardsContainer.innerHTML = '';
  logContainer.innerHTML = '';
  currentPlayer = 1;
  sessionActive = true;
  startButton.disabled = true;
  endButton.disabled = false;
  createCards();
}

function endSession() {
  alert('Session has ended! Thank you for playing.');
  sessionActive = false;
  startButton.disabled = false;
  endButton.disabled = true;
  cardsContainer.innerHTML = '';
  logContainer.innerHTML = '';
}

function createCards() {
  shuffledRoles.forEach((_, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = 'Card ' + (index + 1);
    card.dataset.index = index;

    card.addEventListener('click', () => revealCard(card));

    cardsContainer.appendChild(card);
  });
}

function revealCard(card) {
  if (!sessionActive) {
    alert('Please start a session first.');
    return;
  }

  if (card.classList.contains('revealed')) {
    alert('This card has already been revealed!');
    return;
  }

  const index = card.dataset.index;
  const role = shuffledRoles[index];

  card.classList.add('revealed');
  card.style.backgroundImage = `url(${role.image})`;
  card.textContent = '';

  logPlayer(currentPlayer, role.role);
  currentPlayer++;

  if (currentPlayer > 10) {
    console.log('All players have chosen their roles!');
    sessionActive = false;
    startButton.disabled = false;
    endButton.disabled = true;
  }
}

function logPlayer(player, role) {
  const logEntry = document.createElement('p');
  logEntry.textContent = `Player ${player}: ${role}`;
  logContainer.appendChild(logEntry);
}
