const Gameboard = (function () {
	let board = ["", "", "", "", "", "", "", "", ""];
	const X = "X";
	const O = "O";

	const getBoard = () => board;

	const isValidCellValue = (val) => [Gameboard.X, Gameboard.O].includes(val);

	const isValueInCells = (val, cells) => {
		for (let i = 0; i < cells.length; i++) {
			if (board[cells[i] - 1] !== val) return false;
		}

		return true;
	};

	const isFillableCell = (cellNum) => {
		if (cellNum < 0 || cellNum > 8) {
			console.warn("Cell number out of range!");
			return false;
		}

		if (board[cellNum] !== "") {
			debugger;
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
		eventHandler.emit("boardChanged", board);
	};

	const clearBoard = () => {
		if (Game.getPlaying()) {
			console.warn("Tried to clear board during a game!");
			return;
		}

		board = ["", "", "", "", "", "", "", "", ""];
		eventHandler.emit("boardChanged", board);
	};

	return {
		getBoard,
		fillCell,
		clearBoard,
		isValidCellValue,
		isFillableCell,
		isValueInCells,
		X,
		O,
	};
})();

const Game = (function () {
	const _createPlayer = function (name, value) {
		if (!Gameboard.isValidCellValue(value)) {
			console.error(
				`Tried to create a player with an invalid value ('${value}')!`
			);
			return null;
		}
		return { name, value };
	};

	let playing = false;
	const playerOne = _createPlayer("Player One", Gameboard.X);
	const playerTwo = _createPlayer("Player Two", Gameboard.O);
	let activePlayer;

	if (playerOne === null || playerTwo === null) {
		console.error("One or both of the players are null, stopping game...");
		return {};
	}

	let movesLeft = 9;

	const getPlaying = () => playing;

	const _swapActivePlayer = () => {
		activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
	};

	const _finishRoundCli = (msg = "Game is done!") => {
		playing = false;
		console.log(msg);
	};

	const _finishRound = (msg = "Game is done!") => {
		playing = false;
		alert(msg);
	};

	const _isActivePlayerWinner = () => {
		const val = activePlayer.value;

		// check all possible winning conditions (i really couldn't think of a better way on my own smh)
		if (
			Gameboard.isValueInCells(val, [1, 2, 3]) ||
			Gameboard.isValueInCells(val, [4, 5, 6]) ||
			Gameboard.isValueInCells(val, [7, 8, 9]) ||
			Gameboard.isValueInCells(val, [1, 4, 7]) ||
			Gameboard.isValueInCells(val, [2, 5, 8]) ||
			Gameboard.isValueInCells(val, [3, 6, 9]) ||
			Gameboard.isValueInCells(val, [1, 5, 9]) ||
			Gameboard.isValueInCells(val, [3, 5, 7])
		)
			return true;
		else return false;
	};

	const startRound = () => {
		console.log("Game started!");

		Gameboard.clearBoard();
		movesLeft = 9;
		playing = true;
		activePlayer = playerOne;
	};

	const playTurn = (cellNum) => {
		if (!playing) startRound();
		if (!Gameboard.isFillableCell(cellNum)) return;

		movesLeft--;

		Gameboard.fillCell(cellNum, activePlayer.value);

		if (_isActivePlayerWinner()) {
			_finishRound(`${activePlayer.name} Won!`);
			return;
		}

		if (movesLeft <= 0) {
			_finishRound("It's a tie!");
			return;
		}

		_swapActivePlayer();
	};

	const playCli = () => {
		console.log("Game started!");

		Gameboard.clearBoard();
		movesLeft = 9;
		playing = true;
		activePlayer = playerOne;

		for (let moveIdx = 1; moveIdx <= movesLeft; moveIdx++) {
			let cellNum;
			while (true) {
				cellNum = prompt(`${activePlayer.name}'s move (1-9):`);

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

			if (_isActivePlayerWinner()) {
				_finishRoundCli(`${activePlayer.name} Won!`);
				return;
			}

			_swapActivePlayer();
		}

		_finishRoundCli("It's a draw!");
	};

	return { getPlaying, playCli, playTurn };
})();

// Console Handling
(function () {
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

	eventHandler.subscribe("boardChanged", printBoard);
})();
