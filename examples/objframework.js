function Question(className, class, id, point ) {
  mapTypes[className] = class;

}
Question.mapTypes = {
//    "Instruction": Instruction,
//    "Fillin", Fillin,
}



function Instruction( ) {

}

function Fillin(id, point, ans ) {
  
}

Fillin.prototype.draw = function() {

}

Fillin.prototype = new Question("Fillin", Fillin,)

function QuestionContainer(id, ...) {
  this.questions = [];

}

QuestionContainer.prototype.addQ = function(list) {
  var className = list[0];

//  var visComp = eval("new " + className + "(" + list.join(1) + ")");
    var visComp = factoryMap[className](list.slice(1));
  this.questions.push(visComp);
}


QuestionContainer.prototype.instructions = function(text) {
  add(new Instruction(  ) );
}

QuestionContainer.prototype.grid = function(text) {
  add(new Grid( ... ) );
}
