// setTimeout
// cleartimeout

// setTimeout(fn, ms); 
// fn có thế là một hàm nặc danh hay đại loại như vậy.
// sau một khoản thời gian ms khi nào ms về tới 0 thì nó sẽ thực thi function fn
console.log('Start');
setTimeout(function done(){
    console.log('Finish');
}, 1000);
console.log('Done');
// Result
// Start
// Done
// Finish

// Clear Time Out
// Cái hàm setTimeout nó trả về một ID để ta có thể dùng nó để clear timeout.
var done = function(){
    console.log('Finish');
};
console.log('Start');
var timeoutId = setTimeout(done,1000);
console.log('Done');
clearTimeout(timeoutId);
// Result
// Start
// Done

