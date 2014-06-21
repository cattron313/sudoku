QUnit.test( "Sudoku all rows valid", function( assert ) {
	var game = new Sudoku(["5 3 4 6 7 8 9 1 2",
						   "6 7 2 1 9 5 3 4 8",
						   "1 9 8 3 4 2 5 6 7",
						   "8 5 9 7 6 1 4 2 3",
						   "4 2 6 8 5 3 7 9 1",
						   "7 1 3 9 2 4 8 5 6",
						   "9 6 1 5 3 7 2 8 4",
						   "2 8 7 4 1 9 6 3 5",
						   "3 4 5 2 8 6 1 7 9"]);
  	assert.ok( game.allRowsAreValid() === true, "Passed!" );

  	game = new Sudoku(["5 3 4 6 7 8 9 1 1",
					   "6 7 2 1 9 5 3 4 8",
					   "1 9 8 3 4 2 5 6 7",
					   "8 5 9 7 6 1 4 2 3",
					   "4 2 6 8 5 3 7 9 1",
					   "7 1 3 9 2 4 8 5 6",
					   "9 6 1 5 3 7 2 8 4",
					   "2 8 7 4 1 9 6 3 5",
					   "3 4 5 2 8 6 1 7 9"]);

  	assert.ok( game.allRowsAreValid() === false, "Passed!" );
});

QUnit.test( "Sudoku all cols valid", function( assert ) {
	var game = new Sudoku(["5 3 4 6 7 8 9 1 2",
						   "6 7 2 1 9 5 3 4 8",
						   "1 9 8 3 4 2 5 6 7",
						   "8 5 9 7 6 1 4 2 3",
						   "4 2 6 8 5 3 7 9 1",
						   "7 1 3 9 2 4 8 5 6",
						   "9 6 1 5 3 7 2 8 4",
						   "2 8 7 4 1 9 6 3 5",
						   "3 4 5 2 8 6 1 7 9"]);
  	assert.ok( game.allColsAreValid() === true, "Passed!" );

  	game = new Sudoku(["5 3 4 6 7 8 9 1 1",
					   "6 7 2 1 9 5 3 4 8",
					   "1 9 8 3 4 2 5 6 7",
					   "8 5 9 7 6 1 4 2 3",
					   "4 2 6 8 5 3 7 9 1",
					   "7 1 3 9 2 4 8 5 6",
					   "9 6 1 5 3 7 2 8 4",
					   "2 8 7 4 1 9 6 3 5",
					   "3 4 5 2 8 6 1 7 9"]);

  	assert.ok( game.allColsAreValid() === false, "Passed!" );
});

QUnit.test( "Sudoku all squares valid", function( assert ) {
	var game = new Sudoku(["5 3 4 6 7 8 9 1 2",
						   "6 7 2 1 9 5 3 4 8",
						   "1 9 8 3 4 2 5 6 7",
						   "8 5 9 7 6 1 4 2 3",
						   "4 2 6 8 5 3 7 9 1",
						   "7 1 3 9 2 4 8 5 6",
						   "9 6 1 5 3 7 2 8 4",
						   "2 8 7 4 1 9 6 3 5",
						   "3 4 5 2 8 6 1 7 9"]);
  	assert.ok( game.allSquaresAreValid() === true, "Passed!" );

  	game = new Sudoku(["5 3 4 6 7 8 9 1 1",
					   "6 7 2 1 9 5 3 4 8",
					   "1 9 8 3 4 2 5 6 7",
					   "8 5 9 7 6 1 4 2 3",
					   "4 2 6 8 5 3 7 9 1",
					   "7 1 3 9 2 4 8 5 6",
					   "9 6 1 5 3 7 2 8 4",
					   "2 8 7 4 1 9 6 3 5",
					   "3 4 5 2 8 6 1 7 9"]);

  	assert.ok( game.allSquaresAreValid() === false, "Passed!" );
});