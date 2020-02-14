/*
  Game notes
  ----------
  - Events: [MOVE, ATTACK, DEFEND, HEAL, RUN]
  - MOVE - random chance to encounter a monster
  - ATTACK - small chance to miss attacks
  - DEFEND - chance to mitigate damage from next incoming attack
  - Player chance to block (attack - (def * chance to block))
*/

// Game
class game {
  constructor() {
    this.gameState = false;
  }

  init_game = () => {
    // get player information from UI and pass to player
    // player().init_player();
  }
}

// Player
class player {
  constructor() {
    this.playerName;
    this.playerJob;
    this.player_init_HP = 100;
    this.player_current_HP;
    this.player_init_MP = 100;
    this.player_current_MP;
    this.playerATTK;
    this.playerDEF;
  }

  init_player = (name, job) => {
    this.playerName = name;
    this.playerJob = job;
    if (this.playerName && this.playerJob) {
      document.querySelector('.player--stats--name').innerHTML = `Name: <span>${this.playerName}</span>`;
      document.querySelector('.player--stats--job').innerHTML = `Class: <span>${this.playerJob}</span>`;
      document.querySelector('.player--stats--HP').innerHTML = `HP: <span>${this.player_init_HP}</span>`;
      document.querySelector('.player--stats--MP').innerHTML = `MP: <span>${this.player_init_HP}</span>`;
    }

    if (job === "Assassin") {
      this.playerATTK = 15;
      this.playerDEF = 25;
      document.querySelector('.player--stats--ATTK').innerHTML = `ATK: <span>${this.playerATTK}</span>`;
      document.querySelector('.player--stats--DEF').innerHTML = `DEF: <span>${this.playerDEF}</span>`;

    }
  }

  player_attack = () => {

  }
}

// MONSTER
class monster {
  constructor() {

  }
}

let newPlayer = new player();
newPlayer.init_player('Glorb', 'Assassin');