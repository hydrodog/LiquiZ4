Util = {
  subClass: function (sup, sub) {
    sub.prototype = Object.create(sup.prototype);
    sub.prototype.constructor = sub;
  }
};


// Display element can draw itself into a div box,
// has optional class
function Display(id, clas) {
	this.div;
	this.id = id;
	this.class = clas; // could be undefined?
}

function app(div, text) {
	div.appendChild(document.createTextNode(text));
}

// make a div under the parent. This is a utility function for display
// objects but not every display object necessarily creates a div
Display.prototype.md = function(parent) {
	this.div = document.createElement('div');
	if (this.class)
		this.div.class = this.class;
	parent.appendChild(this.div);
}


// this method should be overridden by all children
Display.prototype.disp = function(div) {
	app(div, this.constructor.name + ':');
}


function Prefs() {
	
}

Prefs.prototype.getPolicy = function(json) {
	var p = this.policies[json.policy ? json.policy : "default"];
}

function Response() {
	

}

Util.subClass(Display, Response);

function Prefs() {}

Prefs.prototype.getPolicy = function(id) {

}

Prefs.prototype.getRegex = function(id) {

}

var prefs = new Prefs();

function Answer(id) {
	
}

Util.subClass(Display, Answer);

function StringAnswer(id, s) {
	this.id = id; // do in parent
	this.s = s;
}

StringAnswer.prototype.draw = function(div) {
	app(div, this.s);
}

function Instr(id, s) {
	this.id = id;
	this.s = s;
}

Instr.prototype.draw = function(div) {
	app(div, this.s);
}

function Eqn(id, s) {
	this.id = id;
	this.s = s;
}

Eqn.prototype.draw = function(div) {
	app(div, this.s);
}

//pure audio player, no controls
function Aud(id, file) {
	this.audio = new Audio(file);
}

Aud.prototype.draw = function(div) { //do we want to display the audio?
	this.audio.play();
}

function Img(id, file) {
	this.src = file;
}

Img.prototype.draw = function() {
	
}

function Fillin(id, parent) {

}

Fillin.prototype.draw = function() { 

}

function QC(parent, json) {
	this.id = json.id;
	this.title = json.title;
	//TODO: inherit default from quiz, then from user (not 1)
	this.points = (typeof json.points === 'undefined') ? 1 : json.points;
	this.level = (typeof json.level === 'undefined') ? 1 : json.level;
	this.md(parent);
	this.comp = [];
	for (var i = 0; i < json.comp.length; ++i) {
		var comp = json.comp[i];
		var c = "new " + comp[0] + "('" + comp[2] + "' , '" + comp[1] + "')";
		console.log(c);
		this.comp.push(eval(c));
	}
}

Util.subClass(Display, QC);

QC.prototype.buildHeader = function() { //is this needed?

}

QC.prototype.draw = function() {  //need to pass in some kind of element to draw onto?
	var d = this.buildHeader();
	console.log(this);
	for (var i = 0; i < this.comp.length; ++i)
		this.comp[i].draw(this.div); //pass in div
}


function Quiz(parent, json) {
	
	for (var k in json) {
		this[k] = json[k];
	}
	this.md(parent);
	//parent.appendChild(this.div);
	this.policy = prefs.getPolicy(json);
	for (var i = 0; i < this.questions.length; ++i) {
		console.log(this.questions[i]);
		this.questions[i] = new QC(this.div, this.questions[i]);
		console.log(this.questions[i]);
	}
	console.log(this);
}
Util.subClass(Display, Quiz);

//add question container
Quiz.prototype.add = function(qc) {
	this.questions.push(qc);	
}

Quiz.prototype.drawQuiz = function() {
	console.log(this);
	console.log(this.questions.length);
	for (var i = 0; i < this.questions.length; ++i) {
		console.log(this.questions[i].draw); //this is thinking to do quiz.draw??
		this.questions[i].draw();
	}

}



function load() {
	var p = document.getElementById("content");
	console.log(p);
	var quest = [
{
	id: "qc1000",
	title: "Addition",
	comp: [
		["Instr", "What is ", "1"],
		["Eqn", "2+2", "2"],
//		["Instr", "?", "1"],
		["Aud", "great.mp3","3"],
		["Img", "cat.jpg","4"]
	]
},
{
	id: "qc1001",
	title: "Multiplication",
	comp: [
		["Instr", "What is ","5"],
		["Eqn", "3*4", "6"],
//		["Instr", "?","5"],
		["Aud", "great.mp3", "7"],
		["Img", "cat.jpg","8"],
		[ "Fillin", "q1000","9"]
	]
}

	];
	var json = {
  		title: "test",
 		class: "L-quiz",
 		questions: quest
	}
	var q = new Quiz(p, json);

	q.drawQuiz();
}