const FRONT = "card_front";
const BACK = "card_back";
let qtdMovimento = 0;
let tempoConclusao = '';

const AGENTS = [
  "astra",
  "brimstone",
  "jett",
  "killjoy",
  "omen",
  "phoenix",
  "reyna",
  "sage",
  "viper",
  "yoru"
];

let cards = null;
let lockMode = false;
let firstCard = null;
let = secondCard = null;

let tempo = 0;
let cronometro;

startGame();

function startGame() {
  cards = createCardsFromAgents(AGENTS);
  qtdMovimento = 0;
  shuffleCards(cards);

  initializeCards(cards);

  iniciarCronometro()
}

function initializeCards(cards) {
  let gameBoard = document.getElementById('game_board');
  gameBoard.innerHTML = '';
  
  for (card of cards) {
    let cardElement = document.createElement('div');
    cardElement.id = card.id;
    cardElement.classList.add('card')
    cardElement.dataset.icon = card.icon;
    
    createCardContent(card, cardElement);
 
    cardElement.addEventListener('click', flipCard);
    gameBoard.appendChild(cardElement);
  }
}

function createCardContent(card, cardElement) {
  createCardFace(FRONT, card, cardElement);
  createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, cardElement) {
  let cardElementFace = document.createElement('div');
  cardElementFace.classList.add(face);
  let iconElement = document.createElement('img');

  if (face === FRONT) {
    iconElement.classList.add('card_icon');
    iconElement.src = `./assets/images/game-${card.icon}.png`;
    cardElementFace.appendChild(iconElement);
  } else {
    iconElement.classList.add('card_logo');
    iconElement.src = './assets/images/valorant-logo.svg';
    cardElementFace.appendChild(iconElement);
  }
  cardElement.appendChild(cardElementFace);
}

function shuffleCards() {
  let currentIndex = cards.length;
  let randomIndex = 0;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]]
  }
}

function createCardsFromAgents(agents) {
  let cards = [];

  for (let agent of agents) {
    cards.push(createPairFromAgent(agent));
  }

  return cards.flatMap(pair => pair);
}

function createPairFromAgent(agent) {
  return [{
    id: createIdWithAgent(agent),
    icon: agent,
    flipped: false,
  },
  {
    id: createIdWithAgent(agent),
    icon: agent,
    flipped: false,
  }];
}

function createIdWithAgent(agent) {
  return agent + parseInt(Math.random() * 1000);
}

function flipCard() { 
  if (setCard(this.id)) {
    this.classList.add('flip');

    if (secondCard) {
      console.log(tempoConclusao);
      if (checkMatch()) {
        clearCards();
        if(checkGameOver()) {
          let gameOverLayer = document.getElementById('game_over');
          gameOverLayer.style.display = 'flex';
          pausarCronometro();
          match_time.innerHTML = `Tempo: ${tempoConclusao}`;
          publicar();
        }
      } else {
        setTimeout(() => {
          let firstCardView = document.getElementById(firstCard.id);
          let secondCardView = document.getElementById(secondCard.id);
    
          firstCardView.classList.remove('flip');
          secondCardView.classList.remove('flip');
          unflipCards();
        }, 1000);
      }
    }
  }
}

function setCard(id) {
  let card = cards.filter(card => card.id === id)[0];
  
  if (card.flipped || lockMode) {
    return false;
  }
  
  if (!firstCard) {
    firstCard = card;
    firstCard.flipped = true;
    return true;
  } else {
    secondCard = card;
    secondCard.flipped = true;
    lockMode = true;
    return true;
  }
}

function checkMatch() {
  if (!firstCard || !secondCard) {
    qtdMovimento++;
    return false;
  }

  qtdMovimento++;
  console.log(qtdMovimento);
  return firstCard.icon === secondCard.icon;
}

function clearCards() {
  firstCard = null;
  secondCard = null;
  lockMode = false;
}

function unflipCards() {
  firstCard.flipped = false;
  secondCard.flipped = false;
  clearCards();
}

function checkGameOver() {
  return cards.filter(card => !card.flipped).length == 0;
}

function restartGame() {
  clearCards();
  startGame();
  let gameOverLayer = document.getElementById('game_over');
  gameOverLayer.style.display = 'none';
}

function publicar() {
  let idUsuario = sessionStorage.ID_USUARIO;

  let partida = {
    qtdMovimento: qtdMovimento,
    tempoConclusao: tempoConclusao,
  }

  fetch(`medidas/publicar-partida/${idUsuario}`, {
      method: "post",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(partida)
  }).then(function (resposta) {

      console.log("resposta: ", resposta);

      if (resposta.ok) {
          window.alert("Partida cadastrada com sucesso pelo usuário: " + idUsuario + "!");
      } else if (resposta.status == 404) {
          window.alert("Deu 404!");
      } else {
          throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
      }
  }).catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
  });

  return false;
}

function formatarTempo(tempo) {
  let horas = Math.floor(tempo / 3600);
  let minutos = Math.floor((tempo % 3600) / 60);
  let segundos = tempo % 60;
  let tempoConclusaoHora = String(horas).padStart(2, '0');
  let tempoConclusaoMinuto = String(minutos).padStart(2, '0');
  let tempoConclusaoSegundos = String(segundos).padStart(2, '0');
  tempoConclusao = tempoConclusaoHora + ':' + tempoConclusaoMinuto + ':' + tempoConclusaoSegundos;
  
  return `${tempoConclusaoMinuto}:${tempoConclusaoSegundos}`;
}

function iniciarCronometro() {
  cronometro = setInterval(() => {
      tempo++;
      document.getElementById('cronometro').innerText = formatarTempo(tempo);
  }, 1000);
}

function pausarCronometro() {
  clearInterval(cronometro);
}