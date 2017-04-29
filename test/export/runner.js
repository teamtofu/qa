var qu = require('./../../dist/questionify.min');
var fs = require('fs');

qu.addSet('fun');
qu.addQuestion('What?',['Correct','Wrong'],[0],'Because it is.','fun');
var a = qu.exportQuestions();
fs.writeFileSync('./test.json',a);
