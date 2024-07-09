const Gameboard = (function () {
	let board = ["", "", "", "", "", "", "", "", ""];
	const X = "X";
	const O = "O";

	const getBoard = () => board;

	const isValidCellValue = (val) => [Gameboard.X, Gameboard.O].includes(val);

	const fillCell = (cellNum, value) => {
		if (cellNum < 0 || cellNum > 8) {
			console.warn("Cell number out of range!");
			return;
		}

		if (board[cellNum] !== "") {
			console.warn("Cell not empty!");
			return;
		}

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

				if (cellNum < 1 || cellNum > 9) {
					alert("Invalid move! try again.");
				} else break;
			}

			// -1 because arrays start at 0, and because 1-9 is easier to thing about
			Gameboard.fillCell(cellNum - 1, activePlayer.value);
			swapActivePlayer();
		}

		playing = false;
		console.log("Game is done!");
	};

	return { getPlaying, playRound };
})();

const ConsoleManager = (function () {
	const printBoard = () => {
		const board = Gameboard.getBoard();
		console.log(board);
		/* let printedString = "";

		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				printedString += board[i + j] + " | ";
			}
			printedString += "\n";
			printedString += "----------";
			printedString += "\n";
		}

		console.log(printedString); */
	};

	return { printBoard };
})();

Game.playRound();
