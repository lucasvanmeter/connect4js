function Display(controller) {
	var self = this
	this.controller = controller
	this.colors = ['red','black']
	this.playing = false

	this.togglePlaying = function() {
		if (self.playing) {
			self.playing = false
			$(start).html("New Game")
		} else {
			self.playing = true
			$(start).html("End Game")
			self.controller.newGame()
			self.updateMessege("It is red's move first.")
		}
	}

	$('#start').click(function() {
		self.togglePlaying()
	})

	d = document.createElement('div')
	for (var i=5;i>=0;i--) {
		r = document.createElement('div')
		$(r)
		.addClass('row seven-cols')
		.attr('id','row-'+i)
		$(d).append(r)
		for (var j=0;j<7;j++) {
			var c = document.createElement('div')
			$(c)
			.addClass('col-xs-1 col-sm-1')
			var s = document.createElement('div')
			$(s)
			.addClass('spot')
			.attr('id',j+'-'+i)
			.data('position',[j,i])
			.click(function(e){
				self.controller.getInput($(this).data('position'))
			})
			$(c).append(s)
			$(r).append(c)
		}
	}
	$('#board').append(d)

	this.updateBoard = function(x,y,turn) {
		$("#"+x+"-"+y).css('background-color',self.colors[turn])
	}

	this.clearBoard = function() {
		for (var x=0;x<6;x++) {
			for (var y=0;y<7;y++) {
				$("#"+y+"-"+x).css('background-color','')
			}
		}
	}

	//We add some messeges at the bottom

	this.messege = document.createElement('div')
	$(this.messege)
	.addClass('alert alert-info')
	.html("Press Start to begin.")
	$('#messeges').append(this.messege)

	this.updateMessege = function(msg) {
		$(self.messege)
		.html(msg)
	}

}