// We build a bot class to play against the player here
function Bot(board, botSym, otherSym) = {
	this.board = board
	this.botSym = botSym
	this.otherSym = otherSym

	//The play function will look at the board and decide where to play. 
	//The output will be in the format [x,y].
	this.chooseMove = function() {
		//First the bot will check to see if it can win.
		for (x in self.board.validMoves) {
			if (self.board.maxStreak(x,self.board.validMoves[x],self.botSym) >= 4) {
				return [x,self.board.validMoves[x]]
			}
		}

		//Next the bot will see if it can stop a win.
		for (x in self.board.validMoves) {
			if (self.board.maxStreak(x,self.board.validMoves[x],self.otherSym) >= 4) {
				return [x,self.board.validMoves[x]]
			}
		}

		//Next the bot will make a move based on some hueristic.
		//In this case the total number of "streaks".
		var scores = {}
		for (x in self.board.validMoves) {
			scores[x]= self.board.sumStreaks(x, self.board.validMoves[x], self.botSym)
		}
		var listScores = []
		for (x in scores) {
			listScores.push(scores[x])
		}
		var maxScore = Math.max(listScores)
		for (x in scores) {
			if (scores[x] == maxScore) {
				return [x,scores[x]]
			}
		} 
	}
}