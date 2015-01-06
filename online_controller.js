function Controller(board, display) {
	var self = this
	this.board = board
	this.display = display
	var brd = this.board
	this.turn = 0

	// validMoves is a property of the controller. It is initilized as the 
	// bottom row and is updated every move.
	this.validMoves = {}
	for (var i=0; i<brd.width;i++) {
		this.validMoves[i] = 0
	}

	this.newGame = function() {
		self.display.clearBoard()
		self.board.newBoard()
		for (var i=0; i<brd.width;i++) {
		this.validMoves[i] = 0
		}
		self.turn=0
	}

	this.playTurn = function(input) {
		// First we make sure the move is valid
		if (input[0] in self.validMoves && input[1] == self.validMoves[input[0]]) {
			
			//First we modify both boards
			brd.changeSym(input[0], input[1],["X","O"][self.turn])
			self.display.updateBoard(input[0],input[1],self.turn)

			//Then we announce who'se turn it is next. This will be immediatly overwritten 
			//if the game is over.
			self.display.updateMessege("It is "+self.display.colors[((self.turn + 1) % 2)]+"'s turn.")

			//Next we check to see if the game is over. Either one player gets 4 in
			//a row or there are no more valid moves.
			if (brd.maxStreak(input[0],input[1],["X","O"][self.turn]) >= 4) {
				self.display.updateMessege(self.display.colors[self.turn] + " wins!")
				self.display.togglePlaying()
			}
			
			// then we update the valid moves
			if (self.validMoves[input[0]] + 1 < brd.height) {
				self.validMoves[input[0]] += 1
			} else {
				delete self.validMoves[input[0]] 
			} 

			// and check to see if there are any moves left.
			if (Object.keys(self.validMoves).length === 0) {
				self.display.updateMessege("The game is a tie!")
				self.display.togglePlaying()
			}

			//Update the turn.
			self.turn = (self.turn + 1) % 2
			//self.display.updateMessege("It is "+self.display.colors[self.turn]+"'s turn.")

			
		} else {
			self.display.updateMessege("Woops! That is not a valid move.")
		}
	}

	//Whenver someone click on the board the following code will run a turn
	this.getInput = function(input) {
		if (self.display.playing) {
			this.playTurn(input)
		} else {
			self.display.updateMessege("The game is not currently running.")
		}
	}
}

//We now do the setup and play the game

// var name1 = prompt("What is the first players name?")
// var name2 = prompt("What is the second players name?")

// p1 = new Human(name1)
// p2 = new Human(name2)
// board = new Board(6,7)
// control = new Controller(board, p1, p2)

// control.playGame()
