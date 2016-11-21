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

//testing out new MC structure
function MCtest(choices, id) {
	this.id = id;
	this.choices = choices;
	
}

MCtest.prototype.draw = function(div) {
	for (var i = 0; i < this.choices.length; i++) {
		var x = document.createElement('div');
        var label = document.createElement('label');
		var xbutton = document.createElement('INPUT');
		xbutton.type = 'Radio';
		xbutton.name = "choice";
		xbutton.label = this.choices[i]["ans"];
        label.appendChild(xbutton);
		label.appendChild(document.createTextNode(this.choices[i]["ans"]));
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

function Survey(id, choices, terms) {
	this.id = id;
	this.terms = terms;
	if(choices == "Likert5") {
		this.choices = [
		  	"Strongly Agree",
          	"Agree",
          	"Neutral",
          	"Disagree",
          	"Strongly Disagree"]
	}
	else
		this.choices = choices;
}

Survey.prototype.draw = function(div) {
	for(var j = 0; j < this.terms.length; j++) {
		var termBox = document.createElement('div');
		//console.log(this.terms);
		termBox.appendChild(document.createTextNode(this.terms[j]));
		for (var i = 0; i < this.choices.length; i++) {
			var x = document.createElement('div');
			var label = document.createElement('label');
			var xbutton = document.createElement('INPUT');
			xbutton.type = 'Radio';
			xbutton.name = this.terms[j];
			xbutton.label = this.choices[i];
			label.appendChild(xbutton);
			label.appendChild(document.createTextNode(this.choices[i]));
			x.appendChild(label);
			x.style.display = "inline-block";
			termBox.appendChild(x);
		}
		div.appendChild(termBox);
	}
	
}

function Likert5(questions, id) {
	this.id = id;
	this.questions = questions;
}

Likert5.prototype.draw = function(div) {
	var scale = ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"];
	var question3 = document.createElement("div");
	var tbl = document.createElement("table");
	//create header with sclae
	var header = document.createElement("tr");
	var th = document.createElement("th");
	//blank space for question
	th.appendChild(document.createTextNode(""));
	header.appendChild(th);
	for (var i = 0; i < scale.length; i++){
		th = document.createElement("th");
		th.appendChild(document.createTextNode(scale[i]));
		header.appendChild(th);
	}
	tbl.appendChild(header);
	//for each question, create a new row
	for (var j = 0; j < questions.length; j++){
		var trow = document.createElement("tr");
		var td = document.createElement("td");
		td.appendChild(document.createTextNode(questions[j]));
		trow.appendChild(td);
		//for each question row, need a new td for question or button
		for (var x = 0; x < scale.length; x++){
			td = document.createElement("td");
			var checkbox = document.createElement("input");
			checkbox.type = "checkbox";
			td.appendChild(checkbox);
			trow.appendChild(td);
			tbl.appendChild(trow);
		}
	}
	question3.appendChild(tbl);
	div.appendChild(question3);
}

