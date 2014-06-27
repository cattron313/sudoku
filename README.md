Sudoku Puzzle
======

I used jQuery, qUnit, Underscrore, SASS, Jade, HTML, CSS, and Javascript for this project.  My plan of attack for this task was to:

	1. Build the HTML structure for the grid based on example puzzle.
	2. Build interactivity (the ability to enter input) into the grid.
	3. Test layout on multiple devices and browsers.  Fix issues.
	4. Create javascript class for Sudoku in order to solve example puzzle.
	5. Test Sudoku class.
	6. Add bonus features (board generator, marking of duplicate digits, highlighting of row, column, or square that was completely filled).

##Why Did I Use...

**jQuery** - I needed an easy way to manipulate the DOM accross browsers.
**qUnit** - I needed unit testing for the Sudoku methods.  Never used it before.  Took it as an opportunity to learn.  I would have liked someone to look at my tests to see if they are good examples of TDD during a code review.
**Underscore** - The set fuctions for arrays made generating sudoku puzzles easier.
**SASS** - It helped me to not repeat myself for some of the grid styling. Only used LESS before.  Took it as an opportunity to learn.
**Jade** - It helped me to not repeat myself for the HTML grid structure.  Never used it before.  Took it as an opportunity to learn.

##Application Structure

I chose to structure the grid as a HTML table because I thought it was syntatically correct.  To me, a sudoku grid is a table of numbers.  I structured the SASS based on 3 different screen sizes, phone, laptop/tablet, and large monitor.  There were only a few changes that needed to be made to get the HTML to work across all of these sizes which was good.  I used two main classes Sudoku and SudokuBoardGenerator.  The Sudoku class was primarily responsible for telling me when someone had successfully solved the puzzle.  The game is played with a listener on the HTML table.  As the user enters in input, that listener determines if the input is valid and updates the user interface accordingly to give help.  It also checks calls a method on the Sudoku class to check if the puzzle has been solved.


##If I Had More Time, I Would Have...

	- Created more unit tests for the Sudoku and SudokuBoardGenerator classes and used TDD to create those classes.
	- Concentrated on JS performance.  One function, the function I used to mark duplicate numbers could have been optimized.  I believe I had some unnecessary loops.  I think a code review would have been helpful here.
	- Came up with a better look and feel design.
	- Spent more time manually testing on devices.  Particularly, testing on a Windows machine.
	- Implemented a save game feature using the browser's local storage.
	- Come up with a better random board generator.  Mines does not make sure there's exactly one solution to each puzzle.
	- Minized javascript files and/or combined each file into one long file to improve performance and reduce the number of web requests.
	- Concentrated on building this web app with the mobile first approach.  It can be hard to make a web app built for a desktop to work on mobile.
	- Refactored the Sudoku and SudokuBoardGenerator classes.  They could have been combined into one class in retrospect.

##Trade-offs

	- I chose to add complexity by introducing SASS since I have very little styling on my page. I thought the benefit of writing more flexible CSS was worth it.
	- In finding the duplicate in each row, column, or square, I chose simplicity over performance.  The method I chose clears the board everytume and finds every duplicate on every new user input instead of incrementally keeping track of what duplicates changed on each input.  I didn't notice any major performance issues so I thought the trade was worth it considering the code is easier to understand and maintain.
