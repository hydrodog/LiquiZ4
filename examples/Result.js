// this file assumes the cp function and base class Display are already defined
// include the other before this
function Result(id, json) {
	cp(this, json);
}

Result.prototype = new Display();

/*
  {
	"id": "x123",
	"results": [ list of results ]
	"prob": "dist"  // can be one of equal, exp(onential), exp2 (pair of exp)
  }
*/
function RandomResult(id, json) {
	cp(this, json);
	this.prob == RandomResult.dist[this.prob];
}

function RandomSelect(dist, list) {
	this.dist = RandomSelect.dist[dist];
	this.list = list;
}

// return a randomly selected element with the distribution selected in the constructor
RandomSelect.prototype.eval = function() {
	return this.dist(Math.random(), list)
}

RandomSelect.dist = {
	"eq" : function(r, list) {
		return list[Math.floor(r*list.length)];
	}
	"exp": function(r, list) { // 1/n^k
		var c = -Math.log(r);
		return c >= list.length ? list[list.length-1] : list[c];
	}
	"exp2": function(r, list) { // 1/n^k
		var c = -.5*Math.log(r);
		var d = Math.random() >= 0.5;
		return c >= list.length ? list[list.length-1] : list[2*c+d];
	}
};
RandomResult.prototype = new Result();
RandomResult.prototype.draw = function() {
	var r = Math.random();
	if (this.prob) {
		this.prob(r, this.results).draw();
	}
}


