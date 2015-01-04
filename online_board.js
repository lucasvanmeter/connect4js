function Display(controller) {
	var self = this
	this.controller = controller
	this.colors = ['red','black']
	//This will make the grid for us using bootstrap

	strt = document.createElement('btn')
	$(strt)
	.addClass('btn btn-success')
	.html("Start Game")
	.click(function(e){
		self.controller.togglePlaying()
		$(strt).html("End Game")
	})
	$("#start").append(strt)

	d = document.createElement('div')
	for (var i=5;i>=0;i--) {
		r = document.createElement('div')
		$(r)
		.addClass('row')
		.attr('id','row-'+i)
		$(d).append(r)
		for (var j=0;j<9;j++) {
			var c = document.createElement('div')
			if(j < 7) {
				$(c)
				.addClass('col-xs-1 spot')
				.attr('id',j+'-'+i)
				.data('position',[j,i])
				.click(function(e){
					self.controller.getInput($(this).data('position'))
				})
			} else if (j == 7) {
				$(c)
				.addClass('col-xs-1')
				.attr('id',j+'-'+i)
			} else if (i == 1) {
				$(c)
				.addClass("col-xs-4")
				.html('Option 1')
			} else if (i == 2) {
				$(c)
				.addClass("col-xs-4")
				.html('Option 2')
			} else {
				$(c)
				.addClass('col-xs-1')
				.attr('id',j+'-'+i)
			}
			$(r).append(c)
		}
	}
	$('#board').append(d)

	this.updateBoard = function(x,y,turn) {
		$("#"+x+"-"+y).css('background-color',self.colors[turn])
	}

	//We add some messeges at the bottom

	this.messege = document.createElement('div')
	$(this.messege)
	.addClass('alert alert-info')
	.html(this.colors[0] + " plays first.")
	$('#messeges').append(this.messege)

	this.updateMessege = function(msg) {
		$(self.messege)
		.html(msg)
	}

}