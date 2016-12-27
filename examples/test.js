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

function StringAnswer(s, id) {
	this.id = id; // do in parent
	this.s = s;
}

StringAnswer.prototype.draw = function(div) {
	app(div, this.s);
}

function Instr(s, id) {
	this.id = id;
	this.s = s;
}

Instr.prototype.draw = function(div) {
	app(div, this.s);
}

function Eqn(s, id) {
	this.id = id;
	this.s = s;
}

Eqn.prototype.draw = function(div) {
	app(div, this.s);
}

function QC(parent, json) {
	this.id = json.id;
	this.title = json.title;
	//TODO: inherit default from quiz, then from user (not 1)
	this.points = (typeof json.points === 'undefined') ? 1 : json.points;
	this.level = (typeof json.level === 'undefined') ? 1 : json.level;
	this.md(parent);
	this.div.className = 'qc';
	this.comp = [];
	for (var i = 0; i < json.comp.length; ++i) {
		var comp = json.comp[i];
		var c = "new " + comp[0] + "("; 
		for(var j = 1;  j < comp.length; j++) {
			var value = comp[j];
			console.log(value);
			if (typeof(value) === 'string')
				c += "'" + comp[j] + "'";
			else if(comp[j].constructor === Array) {
				console.log(JSON.stringify(comp[j]));
				c+= JSON.stringify(comp[j]);
			}
			else
				c += comp[j];
			if(j != comp.length-1) 
				c += ', ';
		}
		c += ')';		
		//c = "new " + comp[0] + "(";  + comp[2] + "' , '" + comp[1] + "')"; //need to loop this for more than 3 elements in array?
		console.log(c);
		this.comp.push(eval(c));
	}
}

Util.subClass(Display, QC);

QC.prototype.buildHeader = function() { //is this needed?
	var header = document.createElement('div');
	header.className = 'header';
	var headerString = this.id + ': ' + this.title;
	header.appendChild(document.createTextNode(headerString));
	return header;
}

QC.prototype.draw = function() {  //need to pass in some kind of element to draw onto?
	var d = this.buildHeader();
	this.div.appendChild(d);
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
	
	var test = [1,2,3,4];
	console.log(typeof(test));
	console.log(test);
	
	
	var quest = [
{
	id: "qc1000",
	title: "Addition",
	comp: [
		["Instr", "What is ", "1"],
		["Eqn", "2+2", "2"],
//		["Instr", "?", "1"],
		["Aud", "great.mp3","3"],
		["MC", [ {"ans":3, "resp": "res6"}, {"ans": 4, "correct": 1 },
			{"ans":5, "resp": "res6"}, {"ans": 6}], "7"]
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
		[ "Fillin", "q1000"]
	]
},

{
	id: "qc101",
	title: "Multiplication",
	comp: [
		["Instr", "What is ","5"],
		["Eqn", "3*4", "6"],
//		["Instr", "?","5"],
		["Aud", "great.mp3", "7"],
		["MC", [ {"ans":9}, {"ans": 12}]]
	]
},




{
	id: "qc1002",
	title: "Grid",
	comp: [
		["Instr", "Enter 1 through 5","5"],
		[ "Grid", 5, "q1000"]
	]
},

{
	id: "qc102",
	title: "Survey",
	comp: [
		["Instr", "Enter your honest opinions.  There are no right or wrong answers"],
		["Survey", "q104", "Likert5", [
			"I like Chinese food",
			"I like Korean food",
			"I like Indian food",
			"I got sick on sushi"
		]]
	]
},

{
	id: "qc1003",
	title: "Matrix",
	comp: [
		["Instr", "Enter any 3x3 matrix","5"],
		[ "Matrix", 3,3, "q1000"]
	]
},


{
    id: "qc1004",
	title: "Addition",
	comp: [
		["Instr", "What is ", "1"],
		["Eqn", "2+2", "2"],
//		["Instr", "?", "1"],
		["Aud", "great.mp3","3"],
		["MCSEL", [ {"ans":1, "resp": "res6"}, {"ans": 2 },
			{"ans":3, "resp": "res6"}, {"ans": 4, "correct": 1}], "7"]
	]
},
{
    id: "qc1005",
	title: "Drag and Drop",
	comp: [
		["Instr", "Locate the parts of the cat ",'4'],
		["Img", "cat.jpg","4"],
		["dragDrop", [ {"Ear": {"left":260,"top":2250}}, {"Eye": {"left":300,"top":2360}},{"Nose":{"left":330,"top":2400}},{"Tongue":{"left":330,"top":2460}}], "7"]
	]
},
	];
	var json = {
  		title: "test",
 		class: "L-quiz",
 		questions: quest
	}
	var q = new Quiz(p, json);

	q.drawQuiz();
}