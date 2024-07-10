const DomHandler = (function () {
	const boardDom = document.querySelector("#board");

	const boardCells = Array.from(boardDom.children);

	eventHandler.subscribe("boardChanged", _render);

	boardCells.forEach((cell, idx) => {
		cell.addEventListener("click", () => {
			Game.playTurn(idx);
		});
	});

	function _render(board) {
		for (let i = 0; i <= 8; i++) {
			boardCells[i].textContent = board[i];
		}
	}

	return {};
})();
