(function () {
	const boardDom = document.querySelector("#board");
	const boardCells = Array.from(boardDom.children);
	const statsOne = document.querySelector("#stats1");
	const statsTwo = document.querySelector("#stats2");
	const getScoreElement = (stats) => stats.querySelector(".player-score");
	const getNameElement = (stats) => stats.querySelector(".player-name");

	eventHandler.subscribe("boardChanged", updateBoard);
	eventHandler.subscribe("scoreChanged", updateScore);
	eventHandler.subscribe("nameChanged", updateName);

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

	function updateScore(scores) {
		getScoreElement(statsOne).textContent = scores[0];
		getScoreElement(statsTwo).textContent = scores[1];
	}

	function updateName(names) {
		getNameElement(statsOne).textContent = names[0];
		getNameElement(statsTwo).textContent = names[1];
	}
})();
