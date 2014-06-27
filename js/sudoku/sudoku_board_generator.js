(function(win) {
	$(document).ready(function() {
		win.SudokuBoardGenerator = function() {
			var collections = [];
			this.solution = [];

			initCollections(collections);
			fillEmptyBoard(this.solution, collections);
			this.board = this.solution.slice(0);
			this.printBoard();
			console.log("--------");
			convertBoardToPuzzle(this.board);
			this.printBoard();

			function convertBoardToPuzzle(board) {
				//randomly remove numbers from board
				for(var i = 0; i < 54; i++) {
					var min = Math.floor(i / 6) * 9;
					var max = min + 9;					
					var rand = getRandomInt(min, max);
					while (board[rand] === null) { rand = getRandomInt(min, max); }
					board[rand] = null;
				}
			}

			function initCollections(a) {
				for(var i = 0; i < 9; i++) {
					a.push({
						row: [1,2,3,4,5,6,7,8,9],
						col: [1,2,3,4,5,6,7,8,9],
						sq: [1,2,3,4,5,6,7,8,9]
					});
				}
			}

			function fillEmptyBoard(board, collections) {
				/* Recursive psuedo code
				find possible numbers 1 - 9 to place in the board
					if no possible numbers
					return to previous space
				for each possible number
					place it in the board (recursive call)
					if it doesn't work
						add it back to the collection and remove it from board
				when no more possible numbers return 
				*/
				if (board.length === 81) { return true; }//YOU FILLED THE BOARD

				var row = getRowIndex(board.length);
				var col = getColIndex(board.length);
				var sq = getSqIndex(row, col);

				var possibleDigits = _.intersection(collections[row].row, collections[col].col, collections[sq].sq).shuffle();
				for (var j = 0; j < possibleDigits.length; j++) {
					var digit = possibleDigits[j];
					if (!digit) { return false; } //if we can't find a digit, we have chosen numbers in a way such that a sudoku grid can't be made
					else {
						board.push(digit);
						removeDigitFromCollections(collections, row, col, sq, digit);
						var validBoard = fillEmptyBoard(board, collections);
						if (validBoard) {return true;}
						else {
							board.pop();
							addDigitToCollections(collections, row, col, sq, digit);
						}
					}
				}
				//if we go through all possible digits, we need to go to the previous space and try and different number
				return false;
			}

			function getRowIndex(i) {
				return Math.floor(i / 9);
			}

			function getColIndex(i) {
				return i % 9;
			}

			function getSqIndex(row, col) {
				if (row >= 0 && row <= 2 && col >= 0 && col <= 2) { return 0;}
				else if (row >= 0 && row <= 2 && col >= 3 && col <= 5) { return 1;}
				else if (row >= 0 && row <= 2 && col >= 6 && col <= 8) { return 2;}
				else if (row >= 3 && row <= 5 && col >= 0 && col <= 2) { return 3;}
				else if (row >= 3 && row <= 5 && col >= 3 && col <= 5) { return 4;}
				else if (row >= 3 && row <= 5 && col >= 6 && col <= 8) { return 5;}
				else if (row >= 6 && row <= 8 && col >= 0 && col <= 2) { return 6;}
				else if (row >= 6 && row <= 8 && col >= 3 && col <= 5) { return 7;}
				else {return 8;}
			}

			function removeDigitFromCollections(collections, row, col, sq, digit) {
				collections[row].row.splice(collections[row].row.indexOf(digit), 1);
				collections[col].col.splice(collections[col].col.indexOf(digit), 1);
				collections[sq].sq.splice(collections[sq].sq.indexOf(digit), 1);
			}

			function addDigitToCollections(collections, row, col, sq, digit) {
				collections[row].row.push(digit);
				collections[col].col.push(digit);
				collections[sq].sq.push(digit);
			}

		};

		SudokuBoardGenerator.prototype.printBoard = function() {
			var str = null;
			for(var i = 0; i < this.board.length; i++) {
				var mod = i % 9;
				if(mod === 0) { str = ""; }
				if (mod === 8) {
					str += this.board[i];
					console.log(str);
				} else { str += this.board[i] + " "; }
			}
		}

		Array.prototype.shuffle = function() {
			for(var i = 0; i < this.length - 1; i++) {
				var j = getRandomInt(i, this.length);				
				var placeholder = this[i];
				this[i] = this[j];
				this[j] = placeholder;
			}
			return this;
		}

		function getRandomInt(min, max) {
			//not inclusive of the max value
			return Math.floor(Math.random() * (max - min)) + min;
		}
	});
})(window);