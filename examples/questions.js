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