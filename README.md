<!---
This is an implementation of the game connect 4 that can be played online. It was written as a fun project.
The game state is controled by the Board.js file.
Online_board.js and Online_Controllor.js translate the information in Board.js into html and recive input.
Bot.js is not finished yet.
--->

<html>
<head>
	<!-- JQuery -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">

	<!-- Optional theme -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap-theme.min.css">

	<!-- Latest compiled and minified JavaScript -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>

	<link type="text/css" rel="stylesheet" href="style.css"/>

	<script src='board.js'></script>
	<script src='online_board.js'></script>
	<script src='online_controller.js'></script>

	<script>
		$(document).ready(function(){
			board = new Board(6,7)
			control = new Controller(board)
			display = new Display(control)
			control.display = display
		})
	</script>
</head>
<body>
	<div class='container'>
		<div class='jumbotron'>
			<div class='container'>		
				<h1>Lucas' Connect 4</h1>
				<div class='row'>
					<div id="board"></div>
				</div>
				<hr>
				<div class='row'>
					<div class='col-xs-12 col-sm-10'>
						<div id="messeges"></div>
					</div>
					<div class='col-xs-12 col-sm-2'>
						<button class="btn btn-success" id='start' style='height:50px;'>Start Game</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
