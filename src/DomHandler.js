(function () {
	const boardDom = document.querySelector("#board");
	const boardCells = Array.from(boardDom.children);
	const scoreOneElement = document.querySelector("#stats1 > player-score");
	const scoreTwoElement = document.querySelector("#stats2 > player-score");
	const nameOneElement = document.querySelector("#stats1 > player-name");
	const nameTwoElement = document.querySelector("#stats2 > player-name");

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
		scoreOneElement.textContent = scores[0];
		scoreTwoElement.textContent = scores[1];
	}

	function updateName(names) {
		nameOneElement.textContent = names[0];
		nameTwoElement.textContent = names[1];
	}
})();
