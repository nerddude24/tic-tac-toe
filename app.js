const Gameboard = (function () {
	let board = ["", "", "", "", "", "", "", "", ""];
	const X = "X";
	const O = "O";

	const getBoard = () => board;

	const isValidCellValue = (val) => [Gameboard.X, Gameboard.O].includes(val);

	const isFillableCell = (cellNum) => {
		if (cellNum < 0 || cellNum > 8) {
			console.warn("Cell number out of range!");
			return false;
		}

		if (board[cellNum] !== "") {
			console.warn("Cell not empty!");
			return false;
		}

		return true;
	};

	const fillCell = (cellNum, value) => {
		if (!isFillableCell(cellNum)) return;

		if (!isValidCellValue(value)) {
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

	return {
		getBoard,
		fillCell,
		clearBoard,
		isValidCellValue,
		isFillableCell,
		X,
		O,
	};
})();

const Game = (function () {
	const createPlayer = function (name, value) {
		if (!Gameboard.isValidCellValue(value)) {
			console.error(
				`Tried to create a player with an invalid value ('${value}')!`
			);
			return null;
		}
		return { name, value };
	};

	let playing = false;
	const playerOne = createPlayer("Player One", Gameboard.X);
	const playerTwo = createPlayer("Player Two", Gameboard.O);
	let activePlayer = playerOne;

	if (playerOne === null || playerTwo === null) {
		console.error("One or both of the players are null, stopping game...");
		return;
	}

	const getPlaying = () => playing;

	const swapActivePlayer = () => {
		activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
	};

	const finishRound = () => {
		playing = false;
		console.log("Game is done!");
	};

	const hasActivePlayerWon = () => {
		return false;
	};

	const playRound = () => {
		let movesLeft = 9;
		Gameboard.clearBoard();
		playing = true;

		console.log("Game started!");

		for (let moveIdx = 1; moveIdx <= movesLeft; moveIdx++) {
			ConsoleManager.printBoard();

			let cellNum;
			while (true) {
				cellNum = prompt(
					`${activePlayer.name}'s move, where do you want to play? (1-9):`
				);

				if (isNaN(cellNum)) {
					alert("Not a number!");
					continue;
				}

				if (!Gameboard.isFillableCell(cellNum - 1)) {
					alert("Invalid move! try again.");
					continue;
				}

				break;
			}

			// -1 because arrays start at 0 and input starts from 1
			Gameboard.fillCell(cellNum - 1, activePlayer.value);
			swapActivePlayer();
		}

		finishRound();
	};

	return { getPlaying, playRound };
})();

const ConsoleManager = (function () {
	const printBoard = () => {
		const board = Gameboard.getBoard();

		let printedString = "";

		for (let i = 0; i < 3; i++) {
			// split the array into thirds (3 rows)
			for (let j = i * 3; j < i * 3 + 3; j++) {
				const char = board[j] !== "" ? board[j] : " "; // add space instead of empty string
				printedString += char;
			}
			printedString += "\n";
		}

		console.log(printedString);
	};

	return { printBoard };
})();

Game.playRound();
