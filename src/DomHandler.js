(function () {
	const boardDom = document.querySelector("#board");
	const restartBtn = document.querySelector("#start-btn");
	const boardCells = Array.from(boardDom.children);
	const statsOne = document.querySelector("#stats1");
	const statsTwo = document.querySelector("#stats2");
	const getScoreElement = (stats) => stats.querySelector(".player-score");
	const getNameElement = (stats) => stats.querySelector(".player-name");
	const getValueElement = (stats) => stats.querySelector(".player-value");

	// event handling
	eventHandler.subscribe("boardChanged", updateBoard);
	eventHandler.subscribe("statsChanged", updatePlayerStats);
	eventHandler.subscribe("activePlayerChanged", updateActivePlayer);

	// event listener setup
	boardCells.forEach((cell, idx) => {
		cell.addEventListener("click", () => {
			Game.playTurn(idx);
		});
	});

	getNameElement(statsOne).addEventListener("input", (e) => {
		eventHandler.emit("playerNameChanged", { name: e.target.value, player: 1 });
	});

	getNameElement(statsTwo).addEventListener("input", (e) => {
		eventHandler.emit("playerNameChanged", { name: e.target.value, player: 2 });
	});

	restartBtn.addEventListener("click", () => {
		if (
			confirm(
				"Are you sure you want to restart the game? (scores will be reset)"
			)
		)
			eventHandler.emit("restartGame");
	});

	function updateBoard(board) {
		for (let i = 0; i <= 8; i++) {
			boardCells[i].textContent = board[i];
		}
	}

	function updatePlayerStats(players) {
		const playerOne = players[0];
		const playerTwo = players[1];

		getScoreElement(statsOne).textContent = playerOne.score;
		getScoreElement(statsTwo).textContent = playerTwo.score;

		getValueElement(statsOne).textContent = playerOne.value;
		getValueElement(statsTwo).textContent = playerTwo.value;
	}

	// active is 1 for first player, 2 for second player, and 0 for none.
	function updateActivePlayer(active) {
		switch (active) {
			case 1:
				statsOne.classList.add("blue-bg");
				statsTwo.classList.remove("red-bg");
				break;
			case 2:
				statsOne.classList.remove("blue-bg");
				statsTwo.classList.add("red-bg");
				break;
			case 0:
				statsOne.classList.remove("blue-bg");
				statsTwo.classList.remove("red-bg");
				break;
			default:
				console.error(`Invalid active value! (${active})`);
				break;
		}
	}
})();
