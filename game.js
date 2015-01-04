function Controller(board, display, p1, p2) {
	var self = this
	this.board = board
	this.display = display
	this.p1 = p1
	this.p2 = p2
	var brd = this.board
	this.turn = 0
	this.end = true

	// validMoves is a property of the controller. It is initilized as the 
	// bottom row and is updated every move.
	this.validMoves = {}
	for (var i=0; i<brd.width;i++) {
		this.validMoves[i] = 0
	}

	this.playTurn = function() {
		//A play starts by a player making a move
		curPlayer = [self.p1, self.p2][self.turn]
		console.log("It is " + curPlayer.name + "'s turn to play.")

		// Next we ask the player to play and then use a while loop to see if 
		//the input was valid.
		while (true) {
			move = parseInt(curPlayer.play())
			if (move in self.validMoves) {
				brd.changeSym(move, self.validMoves[move],["X","O"][self.turn])
				break
			} else {
				console.log("Woops! That is not a valid move.")
			}
		}

		//Next we check to see if the game is over. Either one player gets 4 in
		//a row or there are no more valid moves.
		
		var streakTable = brd.allStreaks(move, this.validMoves[move],["X","O"][self.turn])
		var maxStreak =  Math.max(streakTable[1][0] + 1 + streakTable[-1][0],
			streakTable[1][1] + 1 + streakTable[-1][-1],
			streakTable[0][1] + 1 + streakTable[0][-1],
			streakTable[-1][1] + 1 + streakTable[1][-1])
		if (maxStreak >= 4) {
			self.end = curPlayer.name + " wins!"
		}
		console.log(maxStreak)

		// then we update the valid moves
		if (self.validMoves[move] + 1 < brd.height) {
			self.validMoves[move] += 1
		} else {
			delete self.validMoves[move] 
		} 

		// and check to see if there are any moves left.
		if (Object.keys(self.validMoves).length === 0) {
			self.end = "The game is a tie!"
		}
	}

	//This will run the game
	this.playGame = function() {
		while (true) {
			self.playTurn()
			if (self.end != false) {
				console.log(self.end)
				self.board.print()
				break
			}
			self.turn = (self.turn + 1) % 2
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
