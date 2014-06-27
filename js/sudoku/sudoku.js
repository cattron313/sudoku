(function(win, $) {
	$(document).ready(function() {
		win.Sudoku = function(obj) {
			//making sure input is an array of strings or a jQuery collection of inputs
			if (obj) {
				if (obj instanceof Array && allArrayElementsAreStrings(obj)) {
					this.grid = obj; 
				} else if (obj instanceof jQuery && obj.length === 81 && obj.is("input")) {
					this.grid = generateGrid(obj);
				} else { throw new Error("Wrong input given to Sudoku game."); }
			}
			
			function generateGrid($inputs) {
				//Generates sudoku grid using an array of strings.
				//Each string as 9 numbers separated by spaces.
				var result = [];
				$inputs.each(function(i){
					if (i % 9 === 0) { result.push(""); }
					if (this.value === "") {
						//fill empty inputs with 0
						result[result.length - 1] += (i % 9 === 8) ? "0" : "0 ";
					} else {
						result[result.length - 1] += (i % 9 === 8) ? this.value : this.value + " ";
					} 
				});
				return result;
			}

			function allArrayElementsAreStrings(a) {
				var result = true;
				for(var i = 0; i < a.length; i++) {
					if (typeof a[i] !== "string") {
						result = false;
						break;
					}
				}
				return result;
			}
		};

		Sudoku.prototype.isSolved = function() {
			var array = ["row", "col", "sq"];
			var result = true;
			for (var j = 0; j < array.length; j++) {
				for (var i = 1; i <= 9; i++) {
					if (!this.isValid(i, array[j])) {
						result = false;
						break;
					}
				}
				if (!result) { break; }
			}
			return result;
		};

		Sudoku.prototype.getRowColOrSquare = function(number, type) {
			switch(type) {
				case "row":
					return this.getRow(number);
				case "col":
					return this.getCol(number);
				case "sq":
					return this.getSquare(number);
				default:
					throw new Error("Type must be row, col, or sq.");
			}
		}

		Sudoku.prototype.isValid = function(number, type) {
			var digits = ["1","2","3","4","5","6","7","8","9"];
			var userGuess = this.getRowColOrSquare(number, type);
			return digits.equals(userGuess.sort());
		};

		Sudoku.prototype.findDuplicates = function(number, type) {
			 //if we count two of a digit then it's a duplicate
			var userGuess = this.getRowColOrSquare(number, type), duplicates = [], elems = {};
			for(var i = 0; i < userGuess.length; i++) {
				if (userGuess[i] !== "0") { //ignore 0
					if (elems[userGuess[i]]) {
						elems[userGuess[i]]++;
						if (elems[userGuess[i]] === 2) { duplicates.push(userGuess[i]); }
					} else {
						elems[userGuess[i]] = 1;
					}
				}
			}
			return duplicates;
		};

		Sudoku.prototype.getRow = function(rowNumber) {
			if (!this.grid) {
				throw new Error("No grid is set.");
			} else if (rowNumber < 1 || rowNumber > 9) {
				throw new Error("Invalid row number.");
			} else {
				return this.grid[rowNumber - 1].split(" ");
			}
		};

		Sudoku.prototype.getCol = function(colNumber) {
			if (!this.grid) {
				throw new Error("No grid is set.");
			} else if (colNumber < 1 || colNumber > 9) {
				throw new Error("Invalid col number.");
			} else {
				colNumber--;
				return [this.grid[0].charAt(colNumber * 2),
						this.grid[1].charAt(colNumber * 2),
						this.grid[2].charAt(colNumber * 2),
						this.grid[3].charAt(colNumber * 2),
						this.grid[4].charAt(colNumber * 2),
						this.grid[5].charAt(colNumber * 2),
						this.grid[6].charAt(colNumber * 2),
						this.grid[7].charAt(colNumber * 2),
						this.grid[8].charAt(colNumber * 2)];
			}
		};

		Sudoku.prototype.getSquare = function(sqNumber) {
			if (!this.grid) {
				throw new Error("No grid is set.");
			} else {
				var i = 0, j = 0, length = 6;
				switch(sqNumber) {
					case 1:
						break;
					case 2:
						j = 6;
						break;
					case 3:
						j = 12;
						length = 5;
						break;
					case 4:
						i = 3;
						break;
					case 5:
						i = 3;
						j = 6;
						break;
					case 6:
						i = 3;
						j = 12;
						length = 5;
						break;
					case 7:
						i = 6;
						break;
					case 8:
						i = 6;
						j = 6;
						break;
					case 9:
						i = 6;
						j = 12;
						length = 5;
						break;
					default:
						throw new Error("Invalid square number.");
				}
				return this.grid[i].substr(j, length).trim().split(" ")
						.concat(this.grid[i + 1].substr(j, length).trim().split(" "))
						.concat(this.grid[i + 2].substr(j, length).trim().split(" "));
			}
		};

		Array.prototype.equals = function(b) {
			if (this === b) { return true; }
			if (this == null || b == null || this.length != b.length) { return false; }

			for (var i = 0; i < this.length; i++) {
				if (this[i] !== b[i]) { return false; }
			}
			return true;
		};
	});
})(window, $);