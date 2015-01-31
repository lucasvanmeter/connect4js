//A board will be an 2D-object that contins other objects called positions. 
//The board will depend on the number of rows, cols. The first players
//symbol is always "X", the second player is "O" and an empty spot is " ".

//the board will also store a lot of information about itself that the
//controller and bots might use to play.

// We define the Position object. It knows its x and y coordinate as
// well as its current symbol.
function Position(x, y, sym) {
	this.x = x
	this.y = y
	this.sym = sym
	this.neighbors = {}
	for (var i=-1;i<2;i++) {
		this.neighbors[i] = {}
		for (var j=-1;j<2;j++) {
			this.neighbors[i][j] = null
		}
	}
}

// A Board will take in just the dimensions and then fill everything in.

function Board(height, width) {
	var self = this
	this.width = width
	this.height = height

	//We define a coordinate representation of the board as an array of 
	//empty positions. We let rep[x][y] be the coordinate with the bottom 
	//left being (0,0). i.e. each row of the array is a column of the 
	//board with the first entry on the bottom of the board.
	this.rep = new Array(this.width) 
	for (var x = 0; x < this.width; x++) {
		this.rep[x] = new Array(this.height)
		for(var y = 0; y< this.height; y++) {
			this.rep[x][y] = new Position(x,y,"*")
		}
	}

	//Next we need to update all of the positions and tell them who their 
	//neighbors are.

	for (var x=0;x < this.width; x++) {
		for (var y=0;y< this.height;y++) {
			for (var i=-1;i< 2;i++) {
				for (var j=-1;j< 2;j++) {
					if ((0 <= x + i)  && (x+i< this.width) && (0 <= y + j) && (y+j < this.height)) {
						this.rep[x][y].neighbors[i][j] = this.rep[x+i][y+j]
					} else {
						this.rep[x][y].neighbors[i][j] = "offBoard"
					}
				}
			} 
		}
	}

	//The validMoves dictionary will tell you where you can play.
	this.validMoves = {}
	for (var x=0; x<this.width;x++) {
		this.validMoves[x] = 0
	}

	//Change sym is the command that lets us update the board.
	this.changeSym = function(x, y, newSym) {
		self.rep[x][y].sym = newSym
	}

	//NewBoard will clear everything.
	this.newBoard = function() {
		for (var x=0;x < self.width; x++) {
			self.validMoves[x] = 0
			for (var y=0;y< self.height;y++) {
				self.changeSym(x,y,"*")
			}
		}
	}

	// ________________Board information section__________________
	//we use the board to store all interesting information about itself.
	//The main thing here is a streak calculator 

	this.streak = function(x,y,symb,dir) {
		var total = 0
		var xDir = dir[0]
		var yDir = dir[1]
		if (xDir == 0 && yDir == 0 && self.rep[x][y].sym === symb) {
			return 1
		} else if (xDir == 0 && yDir == 0) {
			return 0
		} else if (self.rep[x][y].neighbors[xDir][yDir].sym === symb) {
			total += 1 + self.streak(x + xDir,y+ yDir,symb,dir)
		} else {
			return 0
		}
		return total
	}

	this.allStreaks = function(x,y,symb) {
		var streakTable = {}
		for (var i=-1;i<2;i++) {
			streakTable[i] = {}
			for (var j=-1;j<2;j++) {
				streakTable[i][j] = this.streak(x,y,symb,[i,j])
			}
		}
		return streakTable
	}

	//This function gives largest streak going through a position.
	this.maxStreak = function(x,y,symb) {
		if (self.rep[x][y].sym != symb) {
			return 0
		} else {
			var as = self.allStreaks(x,y,symb)
			return Math.max(
				as[1][0] + as[0][0] + as[-1][0],
				as[1][1] + as[0][0] + as[-1][-1],
				as[0][1] + as[0][0] + as[0][-1],
				as[-1][1] + as[0][0] + as[1][-1]
			)
		}
	}

	this.sumStreaks = function(x,y,symb) {
		if (self.rep[x][y].sym != symb) {
			return 0
		}
		var sum = 0
		for (var i=-1;i<2;i++) {
			for (var j=-1;j<2;j++) {
				sum += self.allStreaks(i,j,symb)
			}
		}
		return sum
	}	
	


	// ___________VIEW___________

	//We also define a display rep that is an array with position in the way
	//we will see the board on the screen.
	this.dispRep = new Array(this.height) 
	for (var row = 0; row < this.height; row++) {
		this.dispRep[row] = new Array(this.width)
		for(var col = 0; col < this.width; col++) {
			this.dispRep[row][col] = this.rep[col][this.height - 1 - row]
		}
	}

	//Next we define the display as just the symbols

	// Old code: probably uneeded
	// this.symRep = this.rep.map(function(r) {return r.map(function(p) {return p.sym})})

	this.disp = function() {
		return self.dispRep.map(function(r) {return r.map(function(p) {return p.sym})})
	}

	//Lastly we define a print function which shows the board as the player will see it
	this.print = function() {
		d = self.disp()
		for (var i = 0; i < this.height; i++) {
			console.log(d[i].join(" "))
		}
	}		
}

//Test Code

// b = new Board(2,4)
// b.changeSym(0,0,"X")
// b.changeSym(0,1,"O")
// b.changeSym(1,0,"X")
// b.changeSym(1,1,"O")
// b.changeSym(2,0,"X")
// b.changeSym(2,1,"O")
// b.changeSym(3,0,"X")
// b.changeSym(3,1,"*")
// b.print()
// console.log(b.maxStreak(3,0,"X",[0,0]))

// p = new Position(2,3,"X")
// console.log(p.sym)
