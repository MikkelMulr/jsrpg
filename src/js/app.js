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
		this.eventList = [
			'Welcome to JSRPG.',
			'Here you face death.',
			'I wish you luck in overcoming it, not many do.',
			''
		];
	}

	init_game = () => {
		// get player information from UI and pass to player
		// player().init_player();
		this.updateEventList();
	};

	updateEventList = () => {
		document.querySelector('.ui-events--list').innerHTML = '';
		this.eventList.forEach((event) => {
			document.querySelector('.ui-events--list').innerHTML += `<li class="ui-events--list--item">${event}</li>`;
		});
	};
}

// Player
class player {
	constructor() {
		this.playerName;
		this.playerJob;
		this.player_init_HP = 100;
		this.player_HP_regen_rate = 1;
		this.player_init_MP = 100;
		this.player_MP_regen_rate = 1;
		this.player_heal_rate = 10;
		this.playerATTK;
		this.playerDEF;
		this.player_crit_chance;
	}

	updateStats = (update) => {
		if (update == 'hp') {
			document.querySelector('.player--stats--HP').innerHTML = `HP: <span>${this.player_init_HP}</span>`;
		} else if (update == 'mp') {
			document.querySelector('.player--stats--MP').innerHTML = `MP: <span>${this.player_init_HP}</span>`;
		}
	};

	init_player = (name, job) => {
		this.playerName = name;
		this.playerJob = job;
		if (this.playerName && this.playerJob) {
			document.querySelector('.player--stats--name').innerHTML = `Name: <span>${this.playerName}</span>`;
			document.querySelector('.player--stats--job').innerHTML = `Class: <span>${this.playerJob}</span>`;
			document.querySelector('.player--stats--HP').innerHTML = `HP: <span>${this.player_init_HP}</span>`;
			document.querySelector('.player--stats--MP').innerHTML = `MP: <span>${this.player_init_HP}</span>`;
		}

		if (job === 'Assassin') {
			this.playerATTK = 15;
			this.playerDEF = 25;
			this.player_crit_chance = 0.2;
			document.querySelector('.player--stats--ATTK').innerHTML = `ATK: <span>${this.playerATTK}</span>`;
			document.querySelector('.player--stats--DEF').innerHTML = `DEF: <span>${this.playerDEF}</span>`;
		}
		this.init_regens();
	};

	init_regens = () => {
		let regs = setInterval(() => {
			if (this.player_init_HP < 100) {
				this.player_init_HP += this.player_HP_regen_rate;
			}

			if (this.player_init_MP < 100) {
				this.player_init_MP += this.player_MP_regen_rate;
			}
			this.updateStats();
		}, 10000);
	};
}

// MONSTER
class monster {
	constructor() {}
}

let newGame = new game();
newGame.init_game();

let newPlayer = new player();
newPlayer.init_player('Glorb', 'Assassin');

player_heal = () => {
	if (newPlayer.player_init_HP < 100) {
		if (newPlayer.player_init_HP + newPlayer.player_heal_rate > 100) {
			newPlayer.player_init_HP = 100;
		} else {
			newPlayer.player_init_HP += newPlayer.player_heal_rate;
			newPlayer.updateStats('hp');
			newGame.eventList.push(`${newPlayer.playerName} heals for ${newPlayer.player_heal_rate} HP`);
		}
		newGame.updateEventList();
	}
};

player_attack = () => {
	let dmg = 0;
	if (Math.random() < newPlayer.player_crit_chance) {
		dmg = newPlayer.playerATTK * newPlayer.player_crit_chance + newPlayer.playerATTK;
	} else {
		dmg = newPlayer.playerATTK;
	}
	dmg > newPlayer.playerATTK ? newGame.eventList.push('CRITICAL HIT!') : null;
	newGame.eventList.push(`${newPlayer.playerName} attacks for ${dmg} dmg`);
	newPlayer.player_init_HP -= 10;
	newPlayer.updateStats('hp');
	newGame.updateEventList();
};

document.querySelector('.close').addEventListener('click', function() {
	let newGame = new game();
	newGame.init_game();
	document.querySelector('.start-menu').classList.add('close-anim');
	setTimeout(() => {
		document.querySelector('.start-menu').classList.add('close-display');
	}, 700);
});

document.querySelector('.btn-atk').addEventListener('click', function() {
	player_attack();
});

document.querySelector('.btn-heal').addEventListener('click', function() {
	player_heal();
});
