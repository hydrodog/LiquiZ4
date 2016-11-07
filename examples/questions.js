/*display elements like multiple choice, fillin, etc*/
MC.prototype.draw = function(div) {
	for (var i = 0; i < this.choices.length; i++) {
		var x = document.createElement('div');
        var label = document.createElement("label");
		var xbutton = document.createElement('INPUT');
		xbutton.type = 'Radio';
		xbutton.name = "choice";
        xbutton.value = 
		xbutton.label = this.choices[i];
        label.appendChild(xbutton);
        x.appendChild(label);
		//x.appendChild(xbutton);
		x.appendChild(document.createTextNode(this.choices[i]));
		div.appendChild(x);
	}
}