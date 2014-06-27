(function(win) {
	$(document).ready(function() {
		var $inputs = $(".sudoku_input");
		populateBoard(new SudokuBoardGenerator().board, $inputs);

		$('#board').on('keyup', handleSudokuUserInput);

		//prevent input number field from changing the displayed value on scroll
		$('#sudoku_input_wrap').on('focus', '.sudoku_input', function (event) {
			$(this).on('mousewheel.disableScroll', function (event) {
				event.preventDefault();
			});
		});
		$('#sudoku_input_wrap').on('blur', '.sudoku_input', function (event) {
			$(this).off('mousewheel.disableScroll');
		});

		function populateBoard(board, $inputs) {
			for(var i = 0; i < board.length; i++) {
				if (board[i]) {
					$($inputs[i]).attr("readonly", "");
					$inputs[i].value = board[i];
				}
			}
		}

		function handleSudokuUserInput(event) {
			var $input = $(event.target), input = $input.val();
			var rowNum = getNumberFromClass("row", $input);
			var colNum = getNumberFromClass("col", $input);
			var sqNum = getNumberFromClass("sq", $input);
			var $row = $(".row_" + rowNum.toString()),
				$col = $(".col_" + colNum.toString()),
				$sq = $(".sq_" + sqNum.toString());
			var game = new win.Sudoku($inputs);


			updateUI(game, rowNum, colNum, sqNum, $row, $col, $sq);

			//check if input is valid
			if (input.length === 1 && /[1-9]/.test(input)) {

				//check if user won game
				//first check if all inputs are filled in, then use isSolved method.
				if (allInputsAreFilled($inputs) && game.isSolved()) {
					$('#board').off('keyup', handleSudokuUserInput);
					alert("You won!");
				}
			} else if (!$input[0].valueAsNumber || input.length !== 1) {
				//input is not valid clear input
				$input.val("");
			}

			function allInputsAreFilled($inputs) {
				$inputs.each(function() {
					if (!this.value) { return false; }
				});
				return true;
			}

			function getNumberFromClass(labelID, $input) {
				//returns the number attached at the end of the row id or sq or col classes
				var label = null;
				if (labelID === "row") {
					label = /row_\d/.exec($input.parent()[0].className)[0];
				} else if(labelID === "col"){
					label = /col_\d/.exec($input.parent()[0].className)[0];
				} else {
					label = /sq_\d/.exec($input.parent()[0].className)[0];
				}
				return parseInt(label.charAt(label.length - 1));
			}

			function updateUI(game, rowNum, colNum, sqNum, $row, $col, $sq){
				var array = [{ name: "row", number: rowNum, collection: $row },
							 { name: "col", number: colNum, collection: $col },
							 { name: "sq", number: sqNum, collection: $sq }];

				//opting to clear all duplicates and finding them again on every input
				//rather than keeping track of whether a duplicate changes
				$inputs.parent().removeClass("duplicate_row duplicate_col duplicate_sq");

				for(var i = 0; i < 3; i++) {
					highlightValidRowsColsOrSquares(array, i);
					for(var number = 1; number <= 9; number++) {
						markDuplicateNumbers(array, i, number);
					}
				}

				function highlightValidRowsColsOrSquares(array, i) {
					//highlight row, col, or square if valid numbers are entered.
					//Valid means numbers 1-9 have all been entered once.
					if (game.isValid(array[i].number, array[i].name)) { 
						array[i]["collection"].addClass("valid_" + array[i].name);
					} else {
						array[i]["collection"].removeClass("valid_" + array[i].name);
					}
				}

				function markDuplicateNumbers(array, i, number) {
					//if number is repeated in row, col, or square, mark it as a duplicate.
					var duplicates = game.findDuplicates(number, array[i].name);
					if (duplicates.length) {
						$("." + array[i].name + "_" + number.toString()).each(function() {
							for(var k = 0; k < duplicates.length; k++) {
								if($(this).children().val() === duplicates[k]) {
									$(this).addClass("duplicate_" + array[i]["name"]);
								}
							}
						});		
					}	
				}
			}
		}
	});
})(window);