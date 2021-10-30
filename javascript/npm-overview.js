var readlineSync = require('readmline-sync');
// var userName = readlineSync.question('May I have your name?');
// console.log('Hi '+userName + ' !');

var languages = [];
var language  = readlineSync.question('What is your mother language');
languages.push(language);
console.log(language)