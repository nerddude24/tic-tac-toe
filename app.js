const Gameboard = (function () {
	board = ["", "", "", "", "", "", "", "", ""];

	const getBoard = () => board;

	const fillCell = (cellNum, value) => {
		if (cellNum < 0 || cellNum > 8) {
			console.warn("Cell number out of range!");
			return;
		}

		if (board[cellNum] !== "") {
			console.warn("Cell not empty!");
			return;
		}

		if (!["X", "O"].includes(value)) {
			console.warn("Invalid value!");
			return;
		}

		board[cellNum] = value;
	};

	return {
		getBoard,
		fillCell,
	};
})();
