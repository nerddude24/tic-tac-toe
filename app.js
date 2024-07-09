const Gameboard = (function () {
	let board;
	const X = "X";
	const O = "O";

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

		if (![X, O].includes(value)) {
			console.warn("Invalid value!");
			return;
		}

		board[cellNum] = value;
	};

	const clearBoard = () => {
		if (Game.getPlaying) {
			console.warn("Tried to clear board during a game!");
			return;
		}
		board = ["", "", "", "", "", "", "", "", ""];
	};

	clearBoard();

	return {
		getBoard,
		fillCell,
		clearBoard,
	};
})();

const Game = (function () {
	let playing = false;
	const playerOne = createPlayer("X");
	const playerTwo = createPlayer("O");
	let activePlayer = playerOne;

	if (playerOne === null || playerTwo === null) {
		console.error("One or both of the players are null, stopping game...");
		return;
	}

	const getPlaying = () => playing;

	const createPlayer = function (value) {
		if (![Gameboard.X, Gameboard.O].includes(value)) {
			console.error(
				`Tried to create a player with an invalid value ('${value}')!`
			);
			return null;
		}
		return { value };
	};

	const swapActivePlayer = () => {
		activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
	};

	const playRound = () => {
		let movesLeft = 9;
		Gameboard.clearBoard();
		playing = true;

		console.log("Game started!");

		for (let moveIdx = 1; moveIdx <= movesLeft; moveIdx++) {
			ConsoleDisplay.printBoard();
		}

		playing = false;
	};

	return { getPlaying, playRound };
})();

const ConsoleDisplay = (function () {
	const printBoard = () => {
		const board = Gameboard.getBoard();
		let printedString = "";

		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				printedString += board[i * j] + " | ";
			}
			printedString += "\n";
			printedString += "----------";
		}

		console.log(printedString);
	};

	return { printBoard };
})();
