var number = 1;
var stack = [];
var cell_color = 'gray',
	cell_filled = '#34b3a0',
	cell_chosen = 'black';

var strikes = 1;

var board = new Object();

var size = $("#grids").val(),
	total_cells = size * size;

$('#grids').change(function(e) {
	console.error('changed '+ e.target.value);
	if ($("#grids").val() == 0) {
		$('.container').css('display', 'none');
	}
	else {
		$('.container').css('display', 'block');
	}
});

var right_diagonals = [];

function get_right_diagonals() {
	right_diagonals = [];
	for (var i=0; i<size; i++) {
		right_diagonals.push([i, size-1-i]);
	}
}
	
function getGridSize(grid) {
	size = grid.options[grid.selectedIndex].value;
	total_cells = size * size;
	$("div.row div").off('click');
	document.getElementById('result').textContent = '';
	displayGrid();
	resetGrid();
	showStrikes();
	console.log('Grid set');
}

function displayGrid() {
	var grid = document.getElementById('grid');
	// console.log(grid.innerHTML);
	grid.innerHTML = get_grids();
}

function get_grids() {
	// console.log('getting grid '+ size);
	var result = '';
	if (size == 3) {
		result = '<div class="table">' + 
						'<div class="row">' + 
							'<div class="cell" id="cell11"></div> <div class="cell" id="cell12"></div> <div class="cell" id="cell13"></div>' +
						'</div>' +
						'<div class="row">' + 
							'<div class="cell" id="cell21"></div> <div class="cell" id="cell22"></div> <div class="cell" id="cell23"></div>' +
						'</div>' + 
						'<div class="row">' + 
							'<div class="cell" id="cell31"></div> <div class="cell" id="cell32"></div> <div class="cell" id="cell33"></div>' + 
						'</div>' +
					'</div>';
	} 
	else if (size == 4) {
		result = '<div class="table">' + 
						'<div class="row">' + 
							'<div class="cell" id="cell11"></div> <div class="cell" id="cell12"></div> <div class="cell" id="cell13"></div> <div class="cell" id="cell14"></div>' +
						'</div>' +
						'<div class="row">' + 
							'<div class="cell" id="cell21"></div> <div class="cell" id="cell22"></div> <div class="cell" id="cell23"></div> <div class="cell" id="cell24"></div>' +
						'</div>' + 
						'<div class="row">' + 
							'<div class="cell" id="cell31"></div> <div class="cell" id="cell32"></div> <div class="cell" id="cell33"></div> <div class="cell" id="cell34"></div>' + 
						'</div>' +
						'<div class="row">' + 
							'<div class="cell" id="cell41"></div> <div class="cell" id="cell42"></div> <div class="cell" id="cell43"></div> <div class="cell" id="cell44"></div>' + 
						'</div>' +
					'</div>';
	} 
	else if (size == 5) {
		result = '<div class="table">' + 
						'<div class="row">' + 
							'<div class="cell" id="cell11"></div> <div class="cell" id="cell12"></div> <div class="cell" id="cell13"></div> <div class="cell" id="cell14"></div> <div class="cell" id="cell15"></div>' +
						'</div>' +
						'<div class="row">' + 
							'<div class="cell" id="cell21"></div> <div class="cell" id="cell22"></div> <div class="cell" id="cell23"></div> <div class="cell" id="cell24"></div> <div class="cell" id="cell25"></div>' +
						'</div>' + 
						'<div class="row">' + 
							'<div class="cell" id="cell31"></div> <div class="cell" id="cell32"></div> <div class="cell" id="cell33"></div> <div class="cell" id="cell34"></div> <div class="cell" id="cell35"></div>' + 
						'</div>' +
						'<div class="row">' + 
							'<div class="cell" id="cell41"></div> <div class="cell" id="cell42"></div> <div class="cell" id="cell43"></div> <div class="cell" id="cell44"></div> <div class="cell" id="cell45"></div>' + 
						'</div>' +
						'<div class="row">' + 
							'<div class="cell" id="cell51"></div> <div class="cell" id="cell52"></div> <div class="cell" id="cell53"></div> <div class="cell" id="cell54"></div> <div class="cell" id="cell55"></div>' + 
						'</div>' +
					'</div>';
	}
	return result;
}

function showStrikes() {
	var content = document.getElementById('content');
	if (size == 3) {
		content.innerHTML = '<div class="content">'+
								'<span class="char" id="char1"> H </span>' + 
								'<span class="char" id="char2"> I </span>' + 
								'<span class="char" id="char3"> T </span>' + 
							'</div>';
	}
	else if (size == 4) {
		content.innerHTML = '<div class="content">'+
								'<span class="char" id="char1"> B </span>' + 
								'<span class="char" id="char2"> I </span>' + 
								'<span class="char" id="char3"> N </span>' + 
								'<span class="char" id="char3"> G </span>' + 
							'</div>';
	}
	else if (size == 5) {
		content.innerHTML = '<div class="content">'+
								'<span class="char" id="char1"> B </span>' + 
								'<span class="char" id="char2"> I </span>' + 
								'<span class="char" id="char3"> N </span>' +
								'<span class="char" id="char4"> G </span>' +
								'<span class="char" id="char5"> O </span>' +
							'</div>';
	}
}

function generateNumbers() {
	resetGrid();
	document.getElementById('result').innerHTML = ''
	initializeNumbers();
}

function shuffle(array) {
  var tmp, current, top = array.length;
  if(top) while(--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }
  return array;
}

function generateRandomNumbers() {
	// console.log('Rendering ' + size);
	resetGrid();
	var a = [];
	for (var i=1; i<= total_cells; i++) { 
		a.push(i);
	}
	a = shuffle(a);
	// console.log(a);
	fill_grid(a);
}

function fill_grid(a) {
	var cells = document.querySelectorAll('.cell');
	for (var index=0; index < cells.length; index++) {
		cells[index].textContent = a[index];
		cells[index].style.background = cell_filled;
	}
	number = total_cells + 1;
}

function resetGrid() {
	document.getElementById('fillNumbers').disabled = false;
	document.getElementById('fillNumbers').style.opacity = 1;
	document.getElementById('fillNumbers').style.color = 'white';
	document.getElementById('generateRandoms').disabled = false;
	document.getElementById('generateRandoms').style.opacity = 1;
	document.getElementById('generateRandoms').style.color = 'white';
	
	number = 1;
	strikes = 1;
	var cells = document.querySelectorAll('.cell');
	cells.forEach(function(cell) {
		cell.textContent = '';
		cell.style.background = cell_color;
	});
}

function initializeNumbers() {
	$("div.row div").click(function() {
		var current = document.getElementById(this.id);
		if (current.textContent == '') {
			stack.push(this.id);
			current.style.background = cell_filled;
			current.textContent = number;
			number ++ ;
		} else {
			let x = stack.indexOf(this.id);
			number = document.getElementById(stack[x]).textContent;
			for (var i=x; i < stack.length; i++){
				var cell = document.getElementById(stack[i]);
				cell.style.background = cell_color;
				cell.textContent = '';
			}
			stack.length = x;
		}
	});
}

function setGrid() {
	// console.log('Set grid', number);
	if (number === total_cells+1) {
		$('div.row div').off('click');
		document.getElementById('fillNumbers').disabled = true;
		document.getElementById('fillNumbers').style.opacity = 0.7;
		document.getElementById('fillNumbers').style.color = 'black';
		document.getElementById('generateRandoms').disabled = true;
		document.getElementById('generateRandoms').style.opacity = 0.7;
		document.getElementById('generateRandoms').style.color = 'black';
		
		var span = '<button onclick="startGame()"> Start Game </button>';
		document.getElementById('result').innerHTML = span;
		return;
	}
	else {
		alert('Fill all the grid');
	}
}

function startGame() {
	console.log('Started');
	initializeBoard();
	get_right_diagonals();
	// console.log(board);
	// console.log(right_diagonals);
	watchWin();
}

function initializeBoard() {
	for (var i=0; i< size; i++) {
		board[i] = new Array();
		for (var j=0; j< size; j++) {
			var d = document.getElementById('cell'+(i+1)+(j+1));
			board[i][j] = {data: d.textContent,
						   color: cell_filled};
		}
	}
}

function watchWin() {
	$('div.row div').on('click', function() {
		var cell = document.getElementById(this.id);
		cell.style.background = cell_chosen;
		cell.style.color = 'white';
		row = this.id[4] - 1;
		column = this.id[5] - 1;
		board[row][column]['color'] = cell_chosen;
		isWinner(row, column);
	});
}

function isWinner(row, column) {
	if (check_row(row) === true) {
		console.warn('R: ' + row);
		checkStrikes(1);
	}

	if (strikes > size) {
		$("div.row div").off('click');
		return;
	}
	
	if (check_column(column) === true) {
		console.warn('C: ' + strikes);
		checkStrikes(1);
	}

	if (strikes > size) {
		$("div.row div").off('click');
		return;
	}
	
	var diagonal = check_diagonal(row, column);
	if (diagonal != -1) {
		console.warn('D: ' + diagonal);
		if (diagonal == 2){
			checkStrikes(2);
		}
		else {
			checkStrikes(1);
		}
	}
	
	if (strikes > size) {
		$("div.row div").off('click');
		return;
	}
}

function checkStrikes(d) {
	if (strikes + d > size) {
		document.getElementById('content').innerHTML = '<h5 style="background: blue; color: white; text-align: center; font-size: 15px;">WON</h5>';
		$("div.row div").off('click');
		return;
	}
	
	for (var i=0; i < d; i++) {
		document.getElementById('char' + strikes).style.color = 'red';
		strikes++;
	}
}

function check_row(row) {
	for (var y=0; y < size; y++) {
		if (board[row][y]['color'] != cell_chosen) {
			return false;
		}
	}
	return true;
}

function check_column(column) {
	for (var x=0; x < size; x++) {
		if (board[x][column]['color'] != cell_chosen) {
			return false;
		}
	}
	return true;
}

function check_diagonal(row, column) {
	var diagonals = [null, null];
	
	if (row === column) {
//		console.log('Diagonal left...')
		diagonals[0] = false;
		for (var x=0; x <size; x++) {
			if (board[x][x]['color'] != cell_chosen) {
				diagonals[0] = true;
				break;
			}
		}
	}
		
	for (var i=0; i < right_diagonals.length; i++) {
		if (right_diagonals[i][0] === row && right_diagonals[i][1] === column) {
			diagonals[1] = false;
			break;
		}
	}
	
	if (diagonals[1] === false) {
//		console.log('Diagonal right...')
		for (var i=0; i < right_diagonals.length; i++) {
			var n = right_diagonals[i];
			if (board[n[0]][n[1]]['color'] != cell_chosen) {
				diagonals[1] = true;
				break;
			}
		}
	}
	
	if (diagonals[0] === null && diagonals[1] === null) {
		return -1;
	}
	
	if (diagonals.indexOf(false) != -1) {
		if (diagonals[0] === false && diagonals[1] === false) {
			return 2
		}
		else {
			// return diagonals.indexOf(false);
			return 1;
		}
	} 
	
	else { 
		return -1; 
	}
}
