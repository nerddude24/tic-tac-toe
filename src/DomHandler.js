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

	function updateScore(scoreOne, scoreTwo) {
		scoreOneElement.textContent = scoreOne;
		scoreTwoElement.textContent = scoreTwo;
	}

	function updateName(nameOne, nameTwo) {
		nameOneElement.textContent = nameOne;
		nameTwoElement.textContent = nameTwo;
	}
})();
