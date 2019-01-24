var fs = require('fs');

//readfilesync


/*
console.log('A');
var result = fs.readFileSync('syntax/sample.txt','utf8');
console.log(result);
*/



console.log('A');
fs.readFile('syntax/sample.txt','utf8', function(err, result){
  console.log(result);
});
console.log('C');
