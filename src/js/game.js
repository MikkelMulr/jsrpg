class game {
	constructor() {
		this.gameState = false;
		this.eventList = [
			'Glorb dealt 15 dmg to Anusius Lord of Sinners',
			'Glorb dealt 15 dmg to Anusius Lord of Sinners',
			'Glorb dealt 15 dmg to Anusius Lord of Sinners',
			'Glorb dealt 15 dmg to Anusius Lord of Sinners',
			'Glorb dealt 15 dmg to Anusius Lord of Sinners'
		];
	}

	init_game = () => {
		// get player information from UI and pass to player
		// player().init_player();
		this.updateEventList();
	};

	updateEventList = () => {
		this.eventList.forEach((event) => {
			setTimeout(() => {
				document.querySelector('.ui-events--list').innerHTML += `<li class="ui-events--list--item">${event}</li>`;
			}, 400);
		});
	};
}

export default game;
