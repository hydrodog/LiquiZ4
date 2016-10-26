// Display element can draw itself into a div box,
// has optional class
function Display(id, clas) {
	this.id = id;
	this.class = clas; // could be undefined?
}

var base = new Display(null, 'LiquiZ');
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

Response.prototype = base;

function Prefs() {}

Prefs.prototype.getPolicy = function(id) {

}

Prefs.prototype.getRegex = function(id) {

}

var prefs = new Prefs();

function Answer(id) {
	
}

Answer.prototype = base;

function StringAnswer(id, s) {
	this.id = id; // do in parent
	this.s = s;
}

StringAnswer.draw = function(div) {
	app(this.s);
}

//pure audio player, no controls
function Audio(id, file) {
	this.audio = new Audio(file);
}

Audio.prototype.draw = function(div) {
	this.audio.play();
}

function Quiz(parent, json) {
	for (var k in json) {
		this[k] = json[k];
	}
	this.md(parent);
	this.policy = prefs.getPolicy(json);
	this.questions = [];

}
Quiz.prototype = base;

//add question container
Quiz.prototype.add = function(qc) {
	this.questions.push(qc);	
}

Quiz.prototype.draw = function() {
	this.div.innerHTML = "";
	for (var qc in this.questions) {
		qc.draw();
	}

}

function QC(parent, json) {
	this.id = json.id;
	this.title = json.title;
	//TODO: inherit default from quiz, then from user (not 1)
	this.points = (typeof json.points === 'undefined') ? 1 : json.points;
	this.level = (typeof json.level === 'undefined') ? 1 : json.level;
	this.md(parent);
}

QC.prototype.draw = function() {

}

function load() {
	var p = document.getElementById("content");
	console.log(p);
	var json = {
  		title: "test",
 		class: "L-quiz",
	}
	var q = new Quiz(p, json);
	q.draw();
}