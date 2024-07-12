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
		return { name, value, score: 0 };
	};

	const playerOne = _createPlayer("Player One", Gameboard.X);
	const playerTwo = _createPlayer("Player Two", Gameboard.O);

	if (playerOne === null || playerTwo === null) {
		console.error("One or both of the players are null, stopping game...");
		return {};
	}

	let firstPlayer = playerOne;
	let activePlayer;
	let playing = false;
	let movesLeft = 9;

	const getPlaying = () => playing;

	const _getPlayers = () => [playerOne, playerTwo];

	const _isPlayerOneActive = () => activePlayer === playerOne;

	const _updatePlayerName = (data) => {
		if (data.player === 1) playerOne.name = data.name;
		else playerTwo.name = data.name;
	};

	const _swapActivePlayer = () => {
		activePlayer = _isPlayerOneActive() ? playerTwo : playerOne;
		eventHandler.emit("activePlayerChanged", _isPlayerOneActive() ? 1 : 2);
	};

	const _swapFirstPlayer = () => {
		firstPlayer = firstPlayer === playerOne ? playerTwo : playerOne;

		let tmp = playerOne.value;
		playerOne.value = playerTwo.value;
		playerTwo.value = tmp;
	};

	const _restartGame = () => {
		playing = false;
		playerOne.score = 0;
		playerTwo.score = 0;
		Gameboard.clearBoard();

		eventHandler.emit("statsChanged", _getPlayers());
		eventHandler.emit("activePlayerChanged", 0);
	};

	const _finishRound = (msg = "Round is done!") => {
		playing = false;
		_swapFirstPlayer();
		eventHandler.emit("statsChanged", _getPlayers());
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
		console.log("Round started!");

		Gameboard.clearBoard();
		movesLeft = 9;
		playing = true;
		activePlayer = firstPlayer;
		eventHandler.emit("statsChanged", _getPlayers());
		eventHandler.emit("activePlayerChanged", _isPlayerOneActive() ? 1 : 2);
	};

	const playTurn = (cellNum) => {
		if (!playing) startRound();
		if (!Gameboard.isFillableCell(cellNum)) return;

		movesLeft--;

		Gameboard.fillCell(cellNum, activePlayer.value);

		if (_isActivePlayerWinner()) {
			activePlayer.score++;
			_finishRound(`${activePlayer.name} Won!`);
			return;
		}

		if (movesLeft <= 0) {
			_finishRound("It's a tie!");
			return;
		}

		_swapActivePlayer();
	};

	// event subscribing
	eventHandler.subscribe("playerNameChanged", _updatePlayerName);
	eventHandler.subscribe("restartGame", _restartGame);

	return { getPlaying, playTurn, startRound };
})();

Game.startRound();
