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
		this.player_init_HP;
		this.player_HP_regen_rate;
		this.player_init_MP;
		this.player_MP_regen_rate;
		this.player_heal_rate;
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
		this.jobs = {
			// job stats array = [0]HP, [1]MP, [2]HP regen, [3]MP regen,
			//                   [4]heal, [5]attk, [6]def, [7]crit
			Guardian: [ 120, 100, 2, 1, 10, 5, 20, 0.15 ],
			Mage: [ 80, 120, 2, 5, 20, 10, 5, 0.2 ],
			Warrior: [ 110, 100, 1, 1, 5, 20, 10, 0.2 ],
			Archer: [ 100, 100, 1, 2, 10, 15, 10, 0.2 ],
			Assassin: [ 100, 110, 1, 1, 5, 15, 10, 0.45 ]
		};

		if (this.playerName && this.playerJob) {
			document.querySelector('.player--stats--name').innerHTML = `Name: <span>${this.playerName}</span>`;
			document.querySelector('.player--stats--job').innerHTML = `Class: <span>${this.playerJob}</span>`;
		}

		// ******* This makes me sad to look at, fix. *******
		let img = document.querySelector('.player--stats--img');
		if (this.playerJob in this.jobs) {
			if (this.playerJob === 'Assassin') {
				this.player_init_HP = this.jobs.Assassin[0];
				this.player_init_MP = this.jobs.Assassin[1];
				this.player_HP_regen_rate = this.jobs.Assassin[2];
				this.player_MP_regen_rate = this.jobs.Assassin[3];
				this.player_heal_rate = this.jobs.Assassin[4];
				this.playerATTK = this.jobs.Assassin[5];
				this.playerDEF = this.jobs.Assassin[6];
				this.player_crit_chance = this.jobs.Assassin[7];
				// img.style.background = `url('../assets/img/icons/sacrificial-dagger.png')`;
			} else if (this.playerJob === 'Mage') {
				this.player_init_HP = this.jobs.Mage[0];
				this.player_init_MP = this.jobs.Mage[1];
				this.player_HP_regen_rate = this.jobs.Mage[2];
				this.player_MP_regen_rate = this.jobs.Mage[3];
				this.player_heal_rate = this.jobs.Mage[4];
				this.playerATTK = this.jobs.Mage[5];
				this.playerDEF = this.jobs.Mage[6];
				this.player_crit_chance = this.jobs.Mage[7];
			} else if (this.playerJob === 'Warrior') {
				this.player_init_HP = this.jobs.Warrior[0];
				this.player_init_MP = this.jobs.Warrior[1];
				this.player_HP_regen_rate = this.jobs.Warrior[2];
				this.player_MP_regen_rate = this.jobs.Warrior[3];
				this.player_heal_rate = this.jobs.Warrior[4];
				this.playerATTK = this.jobs.Warrior[5];
				this.playerDEF = this.jobs.Warrior[6];
				this.player_crit_chance = this.jobs.Warrior[7];
			} else if (this.playerJob === 'Archer') {
				this.player_init_HP = this.jobs.Archer[0];
				this.player_init_MP = this.jobs.Archer[1];
				this.player_HP_regen_rate = this.jobs.Archer[2];
				this.player_MP_regen_rate = this.jobs.Archer[3];
				this.player_heal_rate = this.jobs.Archer[4];
				this.playerATTK = this.jobs.Archer[5];
				this.playerDEF = this.jobs.Archer[6];
				this.player_crit_chance = this.jobs.Archer[7];
			} else if (this.playerJob === 'Guardian') {
				this.player_init_HP = this.jobs.Guardian[0];
				this.player_init_MP = this.jobs.Guardian[1];
				this.player_HP_regen_rate = this.jobs.Guardian[2];
				this.player_MP_regen_rate = this.jobs.Guardian[3];
				this.player_heal_rate = this.jobs.Guardian[4];
				this.playerATTK = this.jobs.Guardian[5];
				this.playerDEF = this.jobs.Guardian[6];
				this.player_crit_chance = this.jobs.Guardian[7];
			}
		}

		document.querySelector('.player--stats--HP').innerHTML = `HP: <span>${this.player_init_HP}</span>`;
		document.querySelector('.player--stats--MP').innerHTML = `MP: <span>${this.player_init_MP}</span>`;
		document.querySelector('.player--stats--ATTK').innerHTML = `ATK: <span>${this.playerATTK}</span>`;
		document.querySelector('.player--stats--DEF').innerHTML = `DEF: <span>${this.playerDEF}</span>`;
		this.init_regens();
	};

	init_regens = () => {
		let regs = setInterval(() => {
			// gets disabled on heal, causing issues with healing to full health [disabled for now]

			// if (this.player_init_HP < 100) {
			// 	this.player_init_HP += this.player_HP_regen_rate;
			// }

			if (this.player_init_MP < 100) {
				this.player_init_MP += this.player_MP_regen_rate;
			}
			this.updateStats();
		}, 10000);
	};
}

// MONSTER
class monster {
	constructor() {
		this.monster_name;
		this.monster_type;
		this.monster_HP;
		this.monster_MP;
		this.monster_ATTK;
		this.monster_DEF;
	}

	init_monster = (name, type) => {};
}

player_heal = () => {
	if (newPlayer.player_init_HP < 100) {
		if (newPlayer.player_init_HP + newPlayer.player_heal_rate >= 100) {
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

let newPlayer = new player();
let newGame = new game();
let jobChoice = '';
document.querySelectorAll('.jobPick').forEach((job) => {
	job.addEventListener('click', function() {
		jobChoice = job.dataset.job;
		job.classList.add('selected');
	});
});

document.querySelector('.startGame').addEventListener('click', function() {
	let playerName = document.querySelector('#player_name').value;
	console.log(playerName);
	console.log(jobChoice);

	newPlayer.init_player(playerName, jobChoice);
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