(function(win) {
	$(document).ready(function() {
		win.SudokuBoardGenerator = function() {
			var collections = [], board = [];
			initCollections(collections);

			fillEmptyBoard(collections, board);


			function initCollections(a) {
				for(var i = 0; i < 9; i++) {
					a.push({
						row: [1,2,3,4,5,6,7,8,9],
						col: [1,2,3,4,5,6,7,8,9],
						sq: [1,2,3,4,5,6,7,8,9]
					});
				}
			}

			function fillEmptyBoard(collections, board) {
				
			}
		};
	});
})(window);