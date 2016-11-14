/*display elements like multiple choice, fillin, etc*/
function MC(choices, id) {
	this.id = id;
	this.choices = choices;
}

MC.prototype.draw = function(div) {
	for (var i = 0; i < this.choices.length; i++) {
		var x = document.createElement('div');
        var label = document.createElement('label');
		var xbutton = document.createElement('INPUT');
		xbutton.type = 'Radio';
		xbutton.name = "choice";
		xbutton.label = this.choices[i];
        label.appendChild(xbutton);
		label.appendChild(document.createTextNode(this.choices[i]));
        x.appendChild(label);
		div.appendChild(x);
	}
}

function Matrix(rows, cols, id) {
	this.id = id;
	this.cols = cols;
	this.rows = rows;
}

Matrix.prototype.draw = function(div) {
	var size = '50px';
	for(var i = 0; i < this.rows; i++) {
		var row = document.createElement("div");
		for(var j = 0; j<this.cols; j++) {
			var box = document.createElement("div");
			box.style.height = size;
			box.style.width = size;
			box.style.border = "1px solid black";
			box.style.display = 'inline-block';
			var inp = document.createElement('input');
			inp.type = 'text';
			inp.style.width = size;
			inp.style.height = size;
			inp.style.textAlign = 'center';
			box.appendChild(inp);
			row.appendChild(box);
		}
		div.appendChild(row);
	}
}

function Grid(length, id) {
	this.id = id;
	this.length = length;
}

Grid.prototype.draw = function(div) {
	var size = '50px';
	for(var i = 0; i < this.length; i++) {
		var box = document.createElement("div");
		box.style.height = size;
		box.style.width = size;
		box.style.border = "1px solid black";
		box.style.display = 'inline-block';
		var inp = document.createElement('input');
		inp.type = 'text';
		inp.style.width = size;
		inp.style.height = size;
		inp.style.textAlign = 'center';
		box.appendChild(inp);
		div.appendChild(box);
	}
}

function Fillin(id) { //parent) {
	this.id = id;
	//pattern for regex
}

Fillin.prototype.draw = function(div) { 
	var inp = document.createElement("input");
	inp.type = "text";
	inp.style.textAlign = 'center';
	div.appendChild(inp);
}