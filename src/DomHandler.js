(function () {
	const boardDom = document.querySelector("#board");
	const boardCells = Array.from(boardDom.children);
	const statsOne = document.querySelector("#stats1");
	const statsTwo = document.querySelector("#stats2");
	const getScoreElement = (stats) => stats.querySelector(".player-score");
	const getNameElement = (stats) => stats.querySelector(".player-name");
	const getValueElement = (stats) => stats.querySelector(".player-value");

	eventHandler.subscribe("boardChanged", updateBoard);
	eventHandler.subscribe("statsChanged", updatePlayerStats);
	eventHandler.subscribe("activePlayerChanged", updateActivePlayer);

	boardCells.forEach((cell, idx) => {
		cell.addEventListener("click", () => {
			Game.playTurn(idx);
		});
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

		getNameElement(statsOne).textContent = playerOne.name;
		getNameElement(statsTwo).textContent = playerTwo.name;

		getValueElement(statsOne).textContent = playerOne.value;
		getValueElement(statsTwo).textContent = playerTwo.value;
	}

	// active is 1 for first player, 2 for second player.
	function updateActivePlayer(active) {
		if (active === 1) {
			statsOne.classList.add("blue-bg");
			statsTwo.classList.remove("red-bg");
		} else {
			statsOne.classList.remove("blue-bg");
			statsTwo.classList.add("red-bg");
		}
	}
})();
